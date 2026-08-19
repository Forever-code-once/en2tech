import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — custom software and technology consulting in ${site.locality}, ${site.regionName}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — EN2 Tech",
    description: `Get in touch with ${site.name} in ${site.locality}, ${site.regionName}.`,
    url: "/contact",
  },
};

const expectations = [
  {
    title: "A reply from a person",
    body: "Every message goes straight to John. No intake routing, no sales sequence.",
  },
  {
    title: "An honest answer on fit",
    body: "If we're not the right people for the problem, we'll say so — and point you somewhere better if we can.",
  },
  {
    title: "No follow-up campaign",
    body: "Your details are used to reply and nothing else. We don't run a mailing list.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="contact --new"
        title="Let's talk about what you're building"
        lede={
          site.atCapacity
            ? "We're currently at capacity with existing clients, but we're always interested in hearing about interesting problems. Drop us a line and we'll get back to you when availability opens up."
            : "Tell us what you're working on and what isn't working today. We'll get back to you within a couple of business days."
        }
        breadcrumb={[{ name: "contact", href: "/contact" }]}
      />

      <section className="py-16 sm:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            {/* ── Aside: details and expectations ── */}
            <div className="lg:sticky lg:top-36 lg:self-start">
              <Reveal>
                <dl className="border border-grid">
                  <div className="border-b border-grid px-6 py-5">
                    <dt className="label text-fg-faint">Email</dt>
                    <dd className="mt-2.5">
                      <a
                        href={`mailto:${site.email}`}
                        className="font-mono text-lg text-phos transition-colors hover:text-fg"
                      >
                        {site.email}
                      </a>
                    </dd>
                  </div>
                  <div className="border-b border-grid px-6 py-5">
                    <dt className="label text-fg-faint">Based in</dt>
                    <dd className="mt-2.5 font-mono text-sm text-fg">
                      {site.locality}, {site.regionName}
                    </dd>
                  </div>
                  <div className="px-6 py-5">
                    <dt className="label text-fg-faint">Serving</dt>
                    <dd className="mt-3 flex flex-wrap gap-1.5">
                      {site.areaServed.map((area) => (
                        <span
                          key={area}
                          className="label border border-grid px-2 py-1.5 text-fg-dim"
                        >
                          {area}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={100}>
                <div className="mt-6 border border-grid bg-shell">
                  <h2 className="label border-b border-grid px-6 py-3.5 text-phos">
                    <span aria-hidden="true">## </span>What to expect
                  </h2>
                  <ul>
                    {expectations.map((item, i) => (
                      <li
                        key={item.title}
                        className={`px-6 py-5 ${
                          i < expectations.length - 1 ? "border-b border-grid" : ""
                        }`}
                      >
                        <h3 className="font-mono text-sm uppercase text-fg">
                          {item.title}
                        </h3>
                        <p className="prose-body mt-1.5 text-sm text-fg-dim">
                          {item.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* ── The form ── */}
            <Reveal delay={80}>
              <div className="brackets border border-grid bg-shell">
                <h2 className="label border-b border-grid px-6 py-3.5 text-fg-faint sm:px-8">
                  <span aria-hidden="true" className="text-phos">
                    ${" "}
                  </span>
                  compose message
                </h2>
                <div className="p-6 sm:p-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ])}
      />
    </>
  );
}
