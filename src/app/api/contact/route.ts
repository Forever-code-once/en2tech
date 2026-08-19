import { NextResponse } from "next/server";
import { contactSchema, type ContactFieldErrors, type ContactResponse } from "@/lib/contact-schema";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/email";
import { site } from "@/lib/site";

/** Always run this on the server per-request; never cache or prerender it. */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const LIMIT = { limit: 5, windowMs: 60 * 60 * 1000 }; // 5 submissions per hour per IP
const MAX_BODY_BYTES = 32 * 1024;

function json(body: ContactResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(request: Request) {
  // ── 1. Reject oversized bodies before parsing them ──
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json(
      { success: false, message: "That message is too large to submit." },
      413,
    );
  }

  // ── 2. Rate limit per IP ──
  const ip = clientIp(request.headers);
  const limit = rateLimit(`contact:${ip}`, LIMIT);

  if (!limit.ok) {
    return json(
      {
        success: false,
        message: `Too many submissions. Please try again later, or email us directly at ${site.email}.`,
      },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  // ── 3. Parse ──
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json(
      { success: false, message: "We couldn't read that submission. Please try again." },
      400,
    );
  }

  // ── 4. Validate with the same schema the client used ──
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const errors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !(field in errors)) {
        errors[field as keyof ContactFieldErrors] = issue.message;
      }
    }

    // A filled honeypot is a bot. Return the success shape so it learns nothing,
    // but never send the email.
    if (errors.website) {
      return json(
        { success: true, message: "Thanks — we'll be in touch shortly." },
        200,
      );
    }

    return json(
      {
        success: false,
        message: "Please check the highlighted fields and try again.",
        errors,
      },
      400,
    );
  }

  // ── 5. Deliver ──
  const result = await sendContactEmail(parsed.data, {
    ip,
    userAgent: request.headers.get("user-agent") ?? "unknown",
    receivedAt: new Date(),
  });

  if (!result.delivered) {
    // Never claim delivery that did not happen. In dev (no API key) this is the
    // expected path and the submission has been logged to the server console.
    if (result.reason === "email-not-configured") {
      return json(
        {
          success: true,
          message:
            "Thanks — your message was received. (Email delivery is not configured in this environment.)",
        },
        200,
      );
    }

    return json(
      {
        success: false,
        message: `We couldn't send that right now. Please email us directly at ${site.email}.`,
      },
      502,
    );
  }

  return json(
    {
      success: true,
      message: "Thanks — your message is on its way. We'll be in touch shortly.",
    },
    200,
  );
}

/** Anything other than POST is not allowed here. */
export function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
