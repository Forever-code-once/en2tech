import { Resend } from "resend";
import type { ContactInput } from "./contact-schema";
import { site } from "./site";

/**
 * Email delivery.
 *
 * Sends over Resend's HTTPS API rather than SMTP on purpose: AWS blocks
 * outbound port 25 on Lightsail instances by default, and a fresh Lightsail
 * IP has no sending reputation, so self-hosted SMTP would land in spam even
 * once the block is lifted. An HTTP API sidesteps both problems.
 *
 * With no RESEND_API_KEY configured the submission is logged instead of sent,
 * so local development works with zero setup and never silently claims to
 * have delivered mail it did not.
 */

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

/** Must be a domain verified in Resend, otherwise delivery is rejected. */
const from = process.env.CONTACT_FROM_EMAIL ?? `EN2 Tech <noreply@${site.domain}>`;
const to = process.env.CONTACT_TO_EMAIL ?? site.email;

export type SendResult = { delivered: boolean; reason?: string };

/** Escape user input before it goes anywhere near an HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(
  input: ContactInput,
  meta: { ip: string; userAgent: string; receivedAt: Date },
): Promise<SendResult> {
  const company = input.company?.trim() || "—";

  const text = [
    `New enquiry from ${site.domain}`,
    "",
    `Name:    ${input.name}`,
    `Email:   ${input.email}`,
    `Company: ${company}`,
    "",
    "Message:",
    input.message,
    "",
    "—",
    `Received: ${meta.receivedAt.toISOString()}`,
    `IP:       ${meta.ip}`,
    `Agent:    ${meta.userAgent}`,
  ].join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px">
      <h2 style="margin:0 0 20px;font-size:18px">New enquiry from ${site.domain}</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        <tr><td style="padding:6px 12px 6px 0;color:#666">Name</td><td style="padding:6px 0"><strong>${escapeHtml(input.name)}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(input.email)}">${escapeHtml(input.email)}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666">Company</td><td style="padding:6px 0">${escapeHtml(company)}</td></tr>
      </table>
      <h3 style="margin:24px 0 8px;font-size:14px;color:#666">Message</h3>
      <div style="white-space:pre-wrap;line-height:1.6;font-size:14px;border-left:3px solid #f9a542;padding-left:16px">${escapeHtml(input.message)}</div>
      <hr style="margin:28px 0;border:none;border-top:1px solid #eee">
      <p style="font-size:12px;color:#999;margin:0">
        Received ${meta.receivedAt.toISOString()}<br>
        IP ${escapeHtml(meta.ip)}<br>
        ${escapeHtml(meta.userAgent)}
      </p>
    </div>
  `;

  if (!resend) {
    console.warn(
      "[contact] RESEND_API_KEY is not set — logging submission instead of sending.\n" +
        text,
    );
    return { delivered: false, reason: "email-not-configured" };
  }

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `[${site.name}] ${input.name}${company !== "—" ? ` · ${company}` : ""}`,
      replyTo: input.email,
      text,
      html,
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return { delivered: false, reason: "provider-error" };
    }

    return { delivered: true };
  } catch (error) {
    console.error("[contact] Failed to reach the email provider:", error);
    return { delivered: false, reason: "network-error" };
  }
}
