import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for the ${site.domain} website.`,
  alternates: { canonical: "/terms" },
};

/**
 * NOTE FOR JOHN: these are website terms of use only — they say nothing about
 * client engagements, which are governed by whatever contract you sign. Have
 * counsel review before relying on them for anything consequential.
 */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      lede={`The ground rules for using ${site.domain}. These cover the website itself — client work is governed by the agreement we sign with you.`}
      updated="August 2026"
      breadcrumbName="Terms"
      breadcrumbHref="/terms"
      sections={[
        {
          heading: "About this site",
          body: (
            <p>
              {site.domain} is operated by {site.legalName}, a company based in{" "}
              {site.locality}, {site.regionName}. By using the site you agree to
              these terms.
            </p>
          ),
        },
        {
          heading: "The content here is informational",
          body: (
            <>
              <p>
                Everything on this site describes services we offer and work we
                have done. It is not technical, legal, or financial advice, and
                it is not an offer or a binding commitment.
              </p>
              <p>
                Nothing here creates a client relationship. That begins only when
                we both sign an engagement agreement.
              </p>
            </>
          ),
        },
        {
          heading: "Case studies and figures",
          body: (
            <p>
              Case studies describe real engagements with client identities
              withheld under confidentiality. Figures reflect specific
              situations and are not a prediction of what any other business
              will experience.
            </p>
          ),
        },
        {
          heading: "Using the contact form",
          body: (
            <>
              <p>
                Please send genuine enquiries only. Do not use the form for
                unsolicited marketing, automated submissions, or anything
                unlawful.
              </p>
              <p>
                Do not send confidential or sensitive material through it — it
                is an unencrypted email pipeline. Wait until we have an
                agreement and a proper channel in place.
              </p>
            </>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <p>
              The design, code, text, and branding of this site belong to{" "}
              {site.legalName}. You are welcome to read, quote with attribution,
              and link to it. You may not republish it wholesale or present it
              as your own.
            </p>
          ),
        },
        {
          heading: "Availability",
          body: (
            <p>
              We aim to keep the site up and accurate, but we do not guarantee
              uninterrupted availability or that every detail is current. We may
              change or remove content at any time.
            </p>
          ),
        },
        {
          heading: "Liability",
          body: (
            <p>
              To the fullest extent the law allows, {site.legalName} is not
              liable for any loss arising from your use of this website or
              reliance on its contents. Nothing here limits liability that
              cannot lawfully be limited.
            </p>
          ),
        },
        {
          heading: "External links",
          body: (
            <p>
              Where we link out, we do not control those sites and are not
              responsible for their content or practices.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of the State of Tennessee,
              United States.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: <p>Questions about these terms go to {site.email}.</p>,
        },
      ]}
    />
  );
}
