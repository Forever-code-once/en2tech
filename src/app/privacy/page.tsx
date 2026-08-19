import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.legalName} handles the information you send through this website.`,
  alternates: { canonical: "/privacy" },
};

/**
 * NOTE FOR JOHN: this reflects how the site as built actually behaves — a
 * contact form that emails you and nothing else. If you later add analytics,
 * a mailing list, or a client portal, this page must be updated to match.
 * It is a plain-language notice, not legal advice; have counsel review it if
 * you take on clients with contractual privacy requirements.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      lede="A short, honest account of what this website collects and what happens to it. There isn't much."
      updated="August 2026"
      breadcrumbName="Privacy"
      breadcrumbHref="/privacy"
      sections={[
        {
          heading: "What we collect",
          body: (
            <>
              <p>
                Only what you type into the contact form: your name, email
                address, an optional company name, and your message.
              </p>
              <p>
                When you submit that form, our server also records your IP
                address and browser user-agent alongside the message. This is
                used solely to rate-limit submissions and identify spam.
              </p>
            </>
          ),
        },
        {
          heading: "What we do with it",
          body: (
            <>
              <p>
                Your message is emailed to {site.email} so we can reply. That is
                the entire purpose.
              </p>
              <p>
                We do not add you to a mailing list, we do not run marketing
                sequences, and we do not sell, rent, or share your details with
                anyone for their own purposes.
              </p>
            </>
          ),
        },
        {
          heading: "Cookies and analytics",
          body: (
            <p>
              This site sets no cookies and runs no analytics, advertising, or
              third-party tracking scripts. There is no consent banner because
              there is nothing to consent to.
            </p>
          ),
        },
        {
          heading: "Who else touches your data",
          body: (
            <>
              <p>
                Email delivery is handled by Resend, which processes the contents
                of your message in order to deliver it. The site is hosted on
                Amazon Web Services infrastructure.
              </p>
              <p>
                Both act as processors on our behalf. Neither uses your message
                for their own purposes.
              </p>
            </>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              Enquiry emails stay in our inbox as business correspondence. If you
              would like yours deleted, email {site.email} and we will remove it.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              You can ask us what we hold about you, ask for a copy, ask for it
              to be corrected, or ask for it to be deleted. Email {site.email}{" "}
              and we will handle it directly — there is no process to navigate.
            </p>
          ),
        },
        {
          heading: "Children",
          body: (
            <p>
              This is a business-to-business site and is not directed to anyone
              under 13. We do not knowingly collect information from children.
            </p>
          ),
        },
        {
          heading: "Changes",
          body: (
            <p>
              If this notice changes we will update the date at the top of the
              page. Material changes to how we handle enquiries will be described
              here rather than made quietly.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about any of this go to {site.email}. {site.legalName} is
              based in {site.locality}, {site.regionName}.
            </p>
          ),
        },
      ]}
    />
  );
}
