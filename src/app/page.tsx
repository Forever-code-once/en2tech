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
      <section className="border-b-2 border-forest-800 bg-paper-100">
        <Container size="wide">
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:py-24">
            <div>
              <Reveal>
                <div className="flex items-center gap-3.5">
                  <span aria-hidden="true" className="h-0.5 w-8 bg-clay-600" />
                  <span className="label text-clay-600">
                    Murfreesboro, Tennessee
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-7 max-w-[16ch] text-[clamp(2.5rem,6.5vw,5rem)] leading-[0.98]">
                  We build the tech that{" "}
                  <span className="text-clay-600">small business</span>{" "}
                  runs&nbsp;on.
                </h1>
              </Reveal>

              <Reveal delay={150}>
                <p className="measure mt-7 text-lg leading-relaxed text-ink-soft">
                  Bridging the analog and the digital — custom software, systems
                  integration, and strategic technology consulting for growing
                  companies in rural Middle Tennessee.
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/contact" size="lg">
                    Start a conversation
                  </ButtonLink>
                  <ButtonLink href="/services" variant="secondary" size="lg">
                    What we do
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={140} className="lg:self-end">
              <MetricsBand metrics={heroMetrics} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ══════════════════════ SERVICES ══════════════════════ */}
      <Section id="services" size="wide">
        <SectionRule name="What we build" />

        <div className="mt-7">
          <SectionHeading
            title="Software that fits your business."
            lede="No off-the-shelf compromises. We design, build, and maintain the systems your team actually uses — from dispatch floors to front offices."
          />
        </div>

        <div className="mt-12 border-t-2 border-forest-800">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 80}>
              <ServiceRow service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══════════════════ DIFFERENTIATOR ══════════════════ */}
      <Section
        size="wide"
        className="border-y-2 border-forest-800 bg-paper-100"
      >
        <SectionRule name="Why we're different" />

        <div className="mt-7 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading title="Bridging the analog and the digital." />

            <Reveal delay={140}>
              <div className="measure mt-7 space-y-4 text-ink-soft">
                <p>
                  There&apos;s a gap in small-town America between the businesses
                  that grew up on paper, phone calls, and handshake deals — and
                  the digital tools that could transform them. Most technology
                  consultants have only ever lived on one side of that divide.
                </p>
                <p className="font-slab text-xl leading-snug font-600 text-forest-800">
                  We&apos;ve lived through every era of it.
                </p>
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
                className="label group mt-8 inline-flex items-center gap-2 text-clay-600 underline decoration-2 underline-offset-4"
              >
                Read the full history
                <span
                  aria-hidden="true"
                  className="no-underline transition-transform duration-150 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          {/* Era log — a dated register. The periods carry real chronological
              information, so the ordering is content rather than decoration. */}
          <div className="plate">
            <p className="plate-head label">Four decades on record</p>
            <ol>
              {timeline.map((era, i) => (
                <Reveal
                  key={era.title}
                  as="li"
                  delay={i * 80}
                  className={
                    i < timeline.length - 1
                      ? "border-b-2 border-forest-800"
                      : ""
                  }
                >
                  <div className="grid gap-1.5 p-5 sm:grid-cols-[7.5rem_1fr] sm:gap-5 sm:p-6">
                    <p className="label pt-1 text-clay-600 tabular-nums">
                      {era.period}
                    </p>
                    <div>
                      <h3 className="font-slab text-lg leading-snug font-bold text-forest-800">
                        {era.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-ink-soft">{era.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ══════════════════ SELECTED WORK ══════════════════ */}
      {publishedCaseStudies.length > 0 ? (
        <Section size="wide">
          <SectionRule name="Selected work" />

          <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              title="Systems in daily use."
              lede="Real operations, running on software we built and still maintain."
            />
            <Reveal delay={120}>
              <Link
                href="/work"
                className="label group inline-flex items-center gap-2 text-clay-600 underline decoration-2 underline-offset-4"
              >
                All records
                <span
                  aria-hidden="true"
                  className="no-underline transition-transform duration-150 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {publishedCaseStudies.slice(0, 2).map((study, i) => (
              <Reveal key={study.slug} delay={i * 90}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ══════════════════════ PROCESS ══════════════════════ */}
      <Section size="wide" className="border-t-2 border-forest-800 bg-paper-100">
        <SectionRule name="How we work" />

        <div className="mt-7">
          <SectionHeading
            title="Long-term partners, not vendors."
            lede="We embed with your team. We learn your business. Then we build the tools that make your best people even better."
          />
        </div>

        <div className="mt-12">
          <ProcessSteps />
        </div>

        <Reveal delay={120}>
          <figure className="plate mt-10">
            <p className="plate-head label">From the founder</p>
            <blockquote className="ledger px-6 py-9 sm:px-10">
              <p className="measure font-slab text-xl leading-relaxed text-forest-800 sm:text-2xl">
                &ldquo;I&apos;ve watched technology go from something you dialed
                into, to something that runs every business on earth. The
                companies that win in small-town America are the ones with
                someone who&apos;s been on both sides of that line.&rdquo;
              </p>
            </blockquote>
            <figcaption className="label border-t-2 border-forest-800 px-6 py-4 text-ink-faint sm:px-10">
              {site.founder} · Founder, {site.name}
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      <CtaSection />
    </>
  );
}
