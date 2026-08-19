import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading, SectionRule } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProcessSteps } from "@/components/sections/process";
import { CtaSection } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { services } from "@/content/services";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom business applications, systems integration, and fractional CTO services for small businesses in Middle Tennessee. Built around how your team actually works.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — EN2 Tech",
    description:
      "Custom business applications, systems integration, and fractional CTO services for small businesses in Middle Tennessee.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="services --list"
        title="Three ways we show up"
        lede="Every engagement starts the same way — understanding the operation before proposing the software. What changes is how deep the build goes."
        breadcrumb={[{ name: "services", href: "/services" }]}
      />

      {services.map((service, i) => (
        <Section
          key={service.slug}
          id={service.slug}
          size="wide"
          className={i > 0 ? "border-t border-grid" : ""}
        >
          <SectionRule index={i + 1} name={service.slug} />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-36 lg:self-start">
              <Reveal>
                <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] uppercase leading-tight">
                  {service.title}
                </h2>
              </Reveal>

              <Reveal delay={70}>
                <p className="label mt-6 text-phos">{service.tagline}</p>
              </Reveal>

              <Reveal delay={130}>
                <p className="prose-body mt-6 text-fg-dim">{service.body}</p>
              </Reveal>

              <Reveal delay={190}>
                <ul className="mt-8 flex flex-wrap gap-1.5">
                  {service.stack.map((item) => (
                    <li
                      key={item}
                      className="label border border-grid px-2.5 py-1.5 text-fg-faint"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="space-y-5">
              <Reveal delay={110}>
                <div className="border border-grid bg-shell">
                  <h3 className="label border-b border-grid px-6 py-3.5 text-phos">
                    <span aria-hidden="true">## </span>What you get
                  </h3>
                  <ul>
                    {service.deliverables.map((item, j) => (
                      <li
                        key={item}
                        className={`flex gap-4 px-6 py-4 ${
                          j < service.deliverables.length - 1
                            ? "border-b border-grid"
                            : ""
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="label shrink-0 pt-1 text-phos tabular-nums"
                        >
                          {String(j + 1).padStart(2, "0")}
                        </span>
                        <span className="prose-body text-sm text-fg-dim">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={170}>
                <div className="border border-grid bg-shell">
                  <h3 className="label border-b border-grid px-6 py-3.5 text-fg-faint">
                    <span aria-hidden="true">## </span>This is for you if
                  </h3>
                  <ul>
                    {service.fitFor.map((item, j) => (
                      <li
                        key={item}
                        className={`flex gap-4 px-6 py-4 ${
                          j < service.fitFor.length - 1
                            ? "border-b border-grid"
                            : ""
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="shrink-0 pt-0.5 font-mono text-sm text-phos"
                        >
                          ›
                        </span>
                        <span className="prose-body text-sm text-fg-dim">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>
      ))}

      <Section size="wide" className="border-t border-grid bg-shell">
        <SectionRule index={4} name="How we work" />
        <div className="mt-12">
          <SectionHeading
            title="The same three steps, every time"
            lede="However deep the engagement goes, the shape of it does not change."
          />
        </div>
        <div className="mt-14">
          <ProcessSteps />
        </div>
      </Section>

      <CtaSection
        title="Not sure which one you need?"
        body="Most engagements start as one and become another. Tell us what is not working and we will tell you honestly whether we are the right fit."
      />

      <Container>
        {services.map((service) => (
          <JsonLd
            key={service.slug}
            data={serviceSchema({
              name: service.title,
              description: service.tagline,
              slug: service.slug,
            })}
          />
        ))}
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
          ])}
        />
      </Container>
    </>
  );
}
