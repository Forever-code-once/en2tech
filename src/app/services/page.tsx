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
        eyebrow="Services"
        title="Three ways we show up."
        lede="Every engagement starts the same way — understanding the operation before proposing the software. What changes is how deep the build goes."
        breadcrumb={[{ name: "Services", href: "/services" }]}
      />

      {services.map((service, i) => (
        <Section
          key={service.slug}
          id={service.slug}
          size="wide"
          className={
            i % 2 === 1 ? "border-y-2 border-forest-800 bg-paper-100" : ""
          }
        >
          <SectionRule name={`Service ${i + 1} of ${services.length}`} />

          <div className="mt-7 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-36 lg:self-start">
              <Reveal>
                <h2 className="text-[clamp(1.875rem,3.5vw,2.75rem)]">
                  {service.title}
                </h2>
              </Reveal>

              <Reveal delay={70}>
                <p className="measure mt-5 font-slab text-xl leading-snug font-600 text-clay-600">
                  {service.tagline}
                </p>
              </Reveal>

              <Reveal delay={130}>
                <p className="measure mt-6 text-ink-soft">{service.body}</p>
              </Reveal>

              <Reveal delay={190}>
                <ul className="mt-8 flex flex-wrap gap-1.5">
                  {service.stack.map((item) => (
                    <li
                      key={item}
                      className="label border border-paper-400 px-2.5 py-1.5 text-ink-faint"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="space-y-6">
              <Reveal delay={110}>
                <div className="plate">
                  <h3 className="plate-head label">What you get</h3>
                  <ul>
                    {service.deliverables.map((item, j) => (
                      <li
                        key={item}
                        className={`flex gap-4 px-5 py-4 sm:px-6 ${
                          j < service.deliverables.length - 1
                            ? "border-b border-paper-300"
                            : ""
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 bg-clay-600"
                        />
                        <span className="text-[0.97rem] text-ink-soft">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={170}>
                <div className="border-2 border-paper-400">
                  <h3 className="label border-b-2 border-paper-400 bg-paper-100 px-5 py-3 text-ink-faint sm:px-6">
                    This is for you if
                  </h3>
                  <ul>
                    {service.fitFor.map((item, j) => (
                      <li
                        key={item}
                        className={`flex gap-4 px-5 py-4 sm:px-6 ${
                          j < service.fitFor.length - 1
                            ? "border-b border-paper-300"
                            : ""
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="shrink-0 font-slab text-lg leading-tight font-bold text-clay-600"
                        >
                          →
                        </span>
                        <span className="text-[0.97rem] text-ink-soft">
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

      <Section size="wide" className="border-t-2 border-forest-800">
        <SectionRule name="How we work" />
        <div className="mt-7">
          <SectionHeading
            title="The same three steps, every time."
            lede="However deep the engagement goes, the shape of it does not change."
          />
        </div>
        <div className="mt-12">
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
