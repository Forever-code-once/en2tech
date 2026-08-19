import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading, SectionRule } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { MetricsBand } from "@/components/metrics-band";
import { ServiceRow } from "@/components/service-row";
import { CaseStudyCard } from "@/components/case-study-card";
import { ProcessSteps } from "@/components/sections/process";
import { CtaSection } from "@/components/sections/cta";
import { services } from "@/content/services";
import { publishedCaseStudies } from "@/content/work";
import { timeline } from "@/content/timeline";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Custom Software for Middle Tennessee Business`,
  description: site.description,
  alternates: { canonical: "/" },
};

const heroMetrics = [
  { value: "12+", label: "Years building systems" },
  { value: "4", label: "Active client partners" },
  { value: "50+", label: "Trucks dispatched daily" },
  { value: "100%", label: "Custom built" },
];

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="grid-field pointer-events-none absolute inset-0"
        />
        <Container size="wide" className="relative">
          <div className="border-x border-grid">
            <div className="px-6 py-20 sm:py-28 lg:py-36">
              <Reveal>
                <p className="label text-fg-dim">
                  <span aria-hidden="true" className="text-phos">
                    ${" "}
                  </span>
                  en2 --describe
                </p>
              </Reveal>

              <Reveal delay={90}>
                <h1 className="mt-8 max-w-[22ch] text-[clamp(2.25rem,7.5vw,6rem)] uppercase">
                  We build the tech that{" "}
                  <span className="phos-glow">small business</span> runs on
                  <span className="caret" aria-hidden="true" />
                </h1>
              </Reveal>

              <Reveal delay={170}>
                <p className="prose-body mt-9 max-w-2xl text-fg-dim">
                  Bridging the analog and the digital — custom software, systems
                  integration, and strategic technology consulting for growing
                  companies in rural Middle Tennessee.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-11 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/contact" size="lg">
                    Start a conversation
                  </ButtonLink>
                  <ButtonLink href="/services" variant="secondary" size="lg">
                    What we do
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <div className="border-t border-grid">
              <MetricsBand metrics={heroMetrics} />
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════ SERVICES ══════════════════════ */}
      <Section id="services" size="wide" className="border-t border-grid">
        <SectionRule index={1} name="What we build" />

        <div className="mt-12">
          <SectionHeading
            title="Software that fits your business"
            lede="No off-the-shelf compromises. We design, build, and maintain the systems your team actually uses — from dispatch floors to front offices."
          />
        </div>

        <div className="mt-14 border-t border-grid">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 80}>
              <ServiceRow service={service} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══════════════════ DIFFERENTIATOR ══════════════════ */}
      <Section size="wide" className="border-t border-grid bg-shell">
        <SectionRule index={2} name="Why we're different" />

        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading title="Bridging the analog and the digital" />

            <Reveal delay={140}>
              <div className="prose-body mt-8 space-y-5 text-fg-dim">
                <p>
                  There&apos;s a gap in small-town America between the businesses
                  that grew up on paper, phone calls, and handshake deals — and
                  the digital tools that could transform them. Most technology
                  consultants have only ever lived on one side of that divide.
                </p>
                <p className="text-fg">We&apos;ve lived through every era of it.</p>
                <p>
                  From dialing into text-based bulletin board systems over a
                  2400-baud modem to hand-coded HTML, to enterprise systems
                  managing fleets of fifty trucks across three states. We
                  didn&apos;t learn technology in a classroom — we grew up inside
                  the machine as it was being built.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <Link
                href="/about"
                className="label group mt-9 inline-flex items-center gap-2 text-phos"
              >
                Read the full log
                <span
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          {/* Era log — rendered as changelog entries rather than a timeline. */}
          <ol className="border border-grid">
            {timeline.map((era, i) => (
              <Reveal
                key={era.title}
                as="li"
                delay={i * 80}
                className={i < timeline.length - 1 ? "border-b border-grid" : ""}
              >
                <div className="p-6 sm:p-7">
                  <div className="label flex items-center gap-3 text-fg-faint">
                    <span className="text-phos">[{era.period}]</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-grid" />
                  </div>
                  <h3 className="mt-4 font-mono text-base uppercase text-fg">
                    {era.title}
                  </h3>
                  <p className="prose-body mt-2 text-sm text-fg-dim">
                    {era.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ══════════════════ SELECTED WORK ══════════════════ */}
      {publishedCaseStudies.length > 0 ? (
        <Section size="wide" className="border-t border-grid">
          <SectionRule index={3} name="Selected work" />

          <div className="mt-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              title="Systems in daily use"
              lede="Real operations, running on software we built and still maintain."
            />
            <Reveal delay={120}>
              <Link
                href="/work"
                className="label group inline-flex items-center gap-2 text-phos"
              >
                All records
                <span
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {publishedCaseStudies.slice(0, 2).map((study, i) => (
              <Reveal key={study.slug} delay={i * 90}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ══════════════════════ PROCESS ══════════════════════ */}
      <Section size="wide" className="border-t border-grid">
        <SectionRule index={4} name="How we work" />

        <div className="mt-12">
          <SectionHeading
            title="Long-term partners, not vendors"
            lede="We embed with your team. We learn your business. Then we build the tools that make your best people even better."
          />
        </div>

        <div className="mt-14">
          <ProcessSteps />
        </div>

        {/* Quote rendered as terminal output. */}
        <Reveal delay={120}>
          <figure className="mt-14 border border-grid bg-shell">
            <div className="label border-b border-grid px-6 py-3 text-fg-faint">
              <span aria-hidden="true" className="text-phos">
                ${" "}
              </span>
              cat founder.txt
            </div>
            <blockquote className="px-6 py-9 sm:px-9">
              <p className="prose-body max-w-3xl text-lg leading-relaxed text-fg sm:text-xl">
                &ldquo;I&apos;ve watched technology go from something you dialed
                into, to something that runs every business on earth. The
                companies that win in small-town America are the ones with
                someone who&apos;s been on both sides of that line.&rdquo;
              </p>
            </blockquote>
            <figcaption className="label border-t border-grid px-6 py-3.5 text-fg-faint sm:px-9">
              — {site.founder}, {site.name}
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      <CtaSection />
    </>
  );
}
