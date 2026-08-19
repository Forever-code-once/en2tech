import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading, SectionRule } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { MetricsBand } from "@/components/metrics-band";
import { ServiceRow } from "@/components/service-row";
import { CaseStudyCard } from "@/components/case-study-card";
import { ProcessSteps } from "@/components/sections/process";
import { CtaSection } from "@/components/sections/cta";
import { Photo } from "@/components/photo";
import { services } from "@/content/services";
import { publishedCaseStudies } from "@/content/work";
import { timeline } from "@/content/timeline";
import { site } from "@/lib/site";
import teamWorkspace from "@/images/team-workspace.jpg";
import planningSession from "@/images/planning-session.jpg";
import discoveryMeeting from "@/images/discovery-meeting.jpg";

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
      <section className="relative z-1 overflow-hidden">
        <Container size="wide">
          <div className="pt-16 pb-14 sm:pt-24 sm:pb-20">
            <Reveal>
              <p className="label inline-flex items-center gap-2.5 rounded-full border border-line bg-raised/60 px-4 py-2 text-muted backdrop-blur-sm">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-volt-400" />
                {site.locality}, {site.regionName}
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-8 max-w-[18ch] text-[clamp(2.75rem,7.5vw,6rem)]">
                We build the tech that{" "}
                <span className="text-volt-glow">small business</span>{" "}
                runs&nbsp;on.
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="measure mt-8 text-lg leading-relaxed text-muted sm:text-xl">
                Bridging the analog and the digital — custom software, systems
                integration, and strategic technology consulting for growing
                companies in rural Middle Tennessee.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg">
                  Start a conversation
                </ButtonLink>
                <ButtonLink href="/services" variant="secondary" size="lg">
                  What we do
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* Full-bleed hero photograph, graded into black at the foot so the
            metrics band below emerges from it rather than sitting on a seam. */}
        <Reveal delay={140}>
          <div className="relative mx-auto w-full max-w-[110rem] px-4 sm:px-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line sm:aspect-[21/9]">
              <Image
                src={teamWorkspace}
                alt="Five developers working around a long wooden table, laptops open with code on screen, mid-discussion"
                fill
                priority
                sizes="100vw"
                placeholder="blur"
                className="photo-bright object-cover"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"
              />
            </div>
          </div>
        </Reveal>

        <Container size="wide">
          <div className="-mt-12 sm:-mt-16">
            <MetricsBand metrics={heroMetrics} />
          </div>
        </Container>
      </section>

      {/* ══════════════════════ SERVICES ══════════════════════ */}
      <Section id="services" size="wide">
        <SectionRule name="What we build" />

        <div className="mt-8">
          <SectionHeading
            title="Software that fits your business."
            lede="No off-the-shelf compromises. We design, build, and maintain the systems your team actually uses — from dispatch floors to front offices."
          />
        </div>

        <div className="mt-14 border-t border-line">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 80}>
              <ServiceRow service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══════════════════ DIFFERENTIATOR ══════════════════ */}
      <Section size="wide" className="border-t border-line">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionRule name="Why we're different" />

            <div className="mt-8">
              <SectionHeading title="Bridging the analog and the digital." />
            </div>

            <Reveal delay={140}>
              <div className="measure mt-8 space-y-5 text-muted">
                <p>
                  There&apos;s a gap in small-town America between the businesses
                  that grew up on paper, phone calls, and handshake deals — and
                  the digital tools that could transform them. Most technology
                  consultants have only ever lived on one side of that divide.
                </p>
                <p className="text-bright">
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
                className="group mt-9 inline-flex items-center gap-2 text-sm font-600 text-volt-400"
              >
                Read the full history
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>

            <Reveal delay={260}>
              <Photo
                src={discoveryMeeting}
                alt="Hands and notebooks around a wooden meeting table in warm afternoon light"
                aspect="aspect-[16/10]"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="mt-12"
              />
            </Reveal>
          </div>

          {/* Era log — chronological, so the ordering is information. */}
          <ol className="space-y-4">
            {timeline.map((era, i) => (
              <Reveal key={era.title} as="li" delay={i * 80}>
                <div className="panel panel-lit rounded-2xl p-6 sm:p-7">
                  <p className="label text-volt-400 tabular-nums">{era.period}</p>
                  <h3 className="mt-4 font-display text-xl leading-tight font-600 text-bright">
                    {era.title}
                  </h3>
                  <p className="mt-3 text-muted">{era.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ══════════════════ SELECTED WORK ══════════════════ */}
      {publishedCaseStudies.length > 0 ? (
        <Section size="wide" className="border-t border-line">
          <SectionRule name="Selected work" />

          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              title="Systems in daily use."
              lede="Real operations, running on software we built and still maintain."
            />
            <Reveal delay={120}>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 text-sm font-600 text-volt-400"
              >
                All work
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
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
      <Section size="wide" className="border-t border-line">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal>
            <Photo
              src={planningSession}
              alt="A team planning session at a whiteboard covered in coloured sticky notes, colleagues watching from a table of laptops"
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Reveal>

          <div>
            <SectionRule name="How we work" />
            <div className="mt-8">
              <SectionHeading
                title="Long-term partners, not vendors."
                lede="We embed with your team. We learn your business. Then we build the tools that make your best people even better."
              />
            </div>
          </div>
        </div>

        <div className="mt-14">
          <ProcessSteps />
        </div>

        <Reveal delay={120}>
          <figure className="panel panel-lit mt-14 rounded-2xl p-8 sm:p-12">
            <blockquote>
              <p className="measure font-display text-2xl leading-[1.35] font-500 text-bright sm:text-3xl">
                &ldquo;I&apos;ve watched technology go from something you dialed
                into, to something that runs every business on earth. The
                companies that win in small-town America are the ones with
                someone who&apos;s been on both sides of that line.&rdquo;
              </p>
            </blockquote>
            <figcaption className="label mt-7 text-faint">
              {site.founder} · Founder, {site.name}
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      <CtaSection />
    </>
  );
}
