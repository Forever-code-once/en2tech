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
        eyebrow="Get in touch"
        title="Let's talk about what you're building."
        lede={
          site.atCapacity
            ? "We're currently at capacity with existing clients, but we're always interested in hearing about interesting problems. Drop us a line and we'll get back to you when availability opens up."
            : "Tell us what you're working on and what isn't working today. We'll get back to you within a couple of business days."
        }
        breadcrumb={[{ name: "Contact", href: "/contact" }]}
      />

      <section className="py-16 sm:py-24">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            {/* ── Aside: details and expectations ── */}
            <div className="lg:sticky lg:top-36 lg:self-start">
              <Reveal>
                <dl className="plate">
                  <div className="border-b border-paper-300 px-6 py-5">
                    <dt className="label text-ink-faint">Email</dt>
                    <dd className="mt-2.5">
                      <a
                        href={`mailto:${site.email}`}
                        className="font-slab text-xl font-bold text-clay-600 underline decoration-2 underline-offset-4 transition-colors hover:text-clay-700"
                      >
                        {site.email}
                      </a>
                    </dd>
                  </div>
                  <div className="border-b border-paper-300 px-6 py-5">
                    <dt className="label text-ink-faint">Based in</dt>
                    <dd className="mt-2.5 text-ink">
                      {site.locality}, {site.regionName}
                    </dd>
                  </div>
                  <div className="px-6 py-5">
                    <dt className="label text-ink-faint">Serving</dt>
                    <dd className="mt-3 flex flex-wrap gap-1.5">
                      {site.areaServed.map((area) => (
                        <span
                          key={area}
                          className="label border border-paper-400 px-2.5 py-1.5 text-ink-soft"
                        >
                          {area}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={100}>
                <div className="plate mt-6">
                  <h2 className="plate-head label">What to expect</h2>
                  <ul>
                    {expectations.map((item, i) => (
                      <li
                        key={item.title}
                        className={`px-6 py-5 ${
                          i < expectations.length - 1
                            ? "border-b border-paper-300"
                            : ""
                        }`}
                      >
                        <h3 className="font-slab text-lg font-bold text-forest-800">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-ink-soft">
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
              <div className="plate">
                <h2 className="plate-head label">Send us a message</h2>
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
