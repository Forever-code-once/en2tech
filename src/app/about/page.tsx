import type { Metadata } from "next";
import { Section, SectionHeading, SectionRule } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CtaSection } from "@/components/sections/cta";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { timeline } from "@/content/timeline";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "EN2 Tech is a Murfreesboro, Tennessee software consultancy. Four decades of hands-on technology, from dial-up bulletin boards to AI-augmented development.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — EN2 Tech",
    description:
      "A Murfreesboro, Tennessee software consultancy bridging the analog and the digital.",
    url: "/about",
  },
};

const principles = [
  {
    title: "We build for the people doing the work",
    body: "The dispatcher, the bookkeeper, the crew lead. If the software makes their day worse, it does not matter how elegant the architecture is.",
  },
  {
    title: "We say no to work that isn't a fit",
    body: "We take a small number of clients and stay with them for years. That only works if we're honest up front about what we should and shouldn't take on.",
  },
  {
    title: "We don't disappear after launch",
    body: "A system that isn't maintained starts decaying the day it ships. We stay on to extend and modernize, because businesses don't stop changing.",
  },
  {
    title: "We own the whole stack",
    body: "Design, build, deploy, and keep it running. No hand-off to a team that wasn't in the room when the decisions were made.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Four decades inside the machine."
        lede={`${site.name} is a ${site.locality}, ${site.regionName} software consultancy. We build and maintain the systems that small businesses in Middle Tennessee actually run on.`}
        breadcrumb={[{ name: "About", href: "/about" }]}
      />

      <Section size="wide">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <div className="measure space-y-4 text-ink-soft">
              <p className="font-slab text-2xl leading-snug font-600 text-forest-800">
                There&apos;s a gap in small-town America between the businesses
                that grew up on paper, phone calls, and handshake deals — and the
                digital tools that could transform them.
              </p>
              <p>
                Most technology consultants have only ever lived on one side of
                that divide. They either speak fluent enterprise and have never
                stood on a dispatch floor at 5 a.m., or they know the industry
                cold and outsource anything technical.
              </p>
              <p className="font-slab text-lg leading-snug font-600 text-forest-800">
                We&apos;ve lived through every era of it.
              </p>
              <p>
                From dialing into text-based bulletin board systems over a
                2400-baud modem to the first wave of AOL bringing the internet
                into living rooms. From hand-coded HTML on GeoCities to
                enterprise systems managing fleets of fifty trucks across three
                states. We didn&apos;t learn technology in a classroom — we grew
                up inside the machine as it was being built, one generation at a
                time.
              </p>
              <p>
                Today we orchestrate code alongside advanced AI tools the same
                way we once wrote ANSI art for bulletin boards. The tools change.
                The instinct for making technology work for real people
                doesn&apos;t.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <figure className="plate lg:sticky lg:top-36">
              <p className="plate-head label">From the founder</p>
              <blockquote className="ledger px-6 py-8">
                <p className="font-slab text-xl leading-relaxed text-forest-800">
                  &ldquo;I&apos;ve watched technology go from something you
                  dialed into, to something that runs every business on earth.
                  The companies that win in small-town America are the ones with
                  someone who&apos;s been on both sides of that line.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-4 border-t-2 border-forest-800 px-6 py-5">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center bg-forest-800 font-slab text-sm font-bold text-paper-200"
                >
                  JG
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-slab text-base font-bold text-forest-800">
                    {site.founder}
                  </span>
                  <span className="label mt-1 block text-ink-faint">
                    Founder, {site.name}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* ── Era log ── */}
      <Section size="wide" className="border-y-2 border-forest-800 bg-paper-100">
        <SectionRule name="The long version" />

        <div className="mt-7">
          <SectionHeading
            title="Every era, first-hand."
            lede="Not a résumé — a record of which technology shifts we were present for, and what each one taught us about building things people rely on."
          />
        </div>

        {/* Chronological, so the dated ordering carries real information. */}
        <ol className="plate mt-12 grid md:grid-cols-2">
          {timeline.map((era, i) => (
            <Reveal
              key={era.title}
              as="li"
              delay={i * 80}
              className={`border-forest-800 ${
                i % 2 === 0 ? "md:border-r-2" : ""
              } ${i < timeline.length - 2 ? "border-b-2" : "max-md:border-b-2"} ${
                i === timeline.length - 1 ? "max-md:border-b-0" : ""
              }`}
            >
              <div className="h-full p-6 sm:p-8">
                <p className="label inline-block bg-clay-600 px-2.5 py-1.5 text-paper-100 tabular-nums">
                  {era.period}
                </p>
                <h3 className="mt-4 font-slab text-xl leading-tight font-bold text-forest-800">
                  {era.title}
                </h3>
                <p className="mt-3 text-ink-soft">{era.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── Principles ── */}
      <Section size="wide">
        <SectionRule name="How we operate" />

        <div className="mt-7">
          <SectionHeading title="Four things we don't compromise on." />
        </div>

        <ul className="plate mt-12 grid md:grid-cols-2">
          {principles.map((principle, i) => (
            <Reveal
              key={principle.title}
              as="li"
              delay={i * 80}
              className={`border-forest-800 ${
                i % 2 === 0 ? "md:border-r-2" : ""
              } ${i < principles.length - 2 ? "border-b-2" : "max-md:border-b-2"} ${
                i === principles.length - 1 ? "max-md:border-b-0" : ""
              }`}
            >
              <div className="h-full p-6 sm:p-8">
                <h3 className="font-slab text-xl leading-tight font-bold text-forest-800">
                  {principle.title}
                </h3>
                <p className="mt-3 text-ink-soft">{principle.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaSection />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ])}
      />
    </>
  );
}
