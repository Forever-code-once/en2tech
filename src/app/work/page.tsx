import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CaseStudyCard } from "@/components/case-study-card";
import { CtaSection } from "@/components/sections/cta";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { publishedCaseStudies } from "@/content/work";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from EN2 Tech — dispatch platforms, accounting integrations and custom business systems built for companies in Middle Tennessee.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work — EN2 Tech",
    description:
      "Case studies: dispatch platforms, accounting integrations and custom business systems in daily use.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="work --list --anonymized"
        title="Systems people use every day"
        lede="We build software that becomes part of an operation's daily routine. Client names are withheld — these are systems still running production work."
        breadcrumb={[{ name: "work", href: "/work" }]}
      />

      <Section size="wide">
        {publishedCaseStudies.length > 0 ? (
          <>
            <Reveal>
              <p className="label mb-8 text-fg-faint">
                {publishedCaseStudies.length} record
                {publishedCaseStudies.length === 1 ? "" : "s"} found
              </p>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2">
              {publishedCaseStudies.map((study, i) => (
                <Reveal key={study.slug} delay={i * 90}>
                  <CaseStudyCard study={study} />
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <Reveal>
            <div className="border border-grid bg-shell px-8 py-20 text-center">
              <p className="label text-fg-faint">0 records found</p>
              <h2 className="mt-5 font-mono text-xl uppercase text-fg">
                Case studies coming soon
              </h2>
              <p className="prose-body mx-auto mt-3 max-w-md text-fg-dim">
                We are writing up current engagements. In the meantime, ask us
                directly about work relevant to your industry.
              </p>
            </div>
          </Reveal>
        )}
      </Section>

      <CtaSection
        title="Want the details we can't publish?"
        body="Some of the most useful work sits under agreements we won't break in public. Ask, and we'll tell you what we can."
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Work", href: "/work" },
        ])}
      />
    </>
  );
}
