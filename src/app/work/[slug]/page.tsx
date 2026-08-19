import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, SectionRule } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { MetricsBand } from "@/components/metrics-band";
import { CtaSection } from "@/components/sections/cta";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { getCaseStudy, publishedCaseStudies } from "@/content/work";
import { getService } from "@/content/services";
import { breadcrumbSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

/** Pre-render every published case study at build time. */
export function generateStaticParams() {
  return publishedCaseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return { title: "Case study not found" };

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: "article",
      title: `${study.title} — EN2 Tech`,
      description: study.summary,
      url: `/work/${study.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const related = publishedCaseStudies.filter((s) => s.slug !== study.slug);

  return (
    <>
      <PageHero
        eyebrow={`open ${study.slug}`}
        title={study.title}
        lede={study.summary}
        breadcrumb={[
          { name: "work", href: "/work" },
          { name: study.slug, href: `/work/${study.slug}` },
        ]}
      >
        <ul className="flex flex-wrap gap-1.5">
          {study.serviceSlugs.map((serviceSlug) => {
            const service = getService(serviceSlug);
            if (!service) return null;
            return (
              <li key={serviceSlug}>
                <Link
                  href={`/services#${serviceSlug}`}
                  className="label inline-block border border-grid px-3 py-2 text-fg-dim transition-colors hover:border-phos hover:text-phos"
                >
                  {service.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </PageHero>

      <Section size="wide" className="py-0">
        <div className="border-x border-b border-grid">
          <MetricsBand metrics={study.metrics} />
        </div>
      </Section>

      <Section size="wide">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <SectionRule index={1} name="Situation" />

            <Reveal delay={70}>
              <p className="prose-body mt-8 text-fg-dim">{study.challenge}</p>
            </Reveal>

            <Reveal delay={140}>
              <dl className="mt-10 border border-grid">
                <div className="flex gap-4 border-b border-grid px-5 py-4">
                  <dt className="label w-20 shrink-0 pt-0.5 text-fg-faint">
                    Client
                  </dt>
                  <dd className="font-mono text-sm text-fg">{study.client}</dd>
                </div>
                <div className="flex gap-4 border-b border-grid px-5 py-4">
                  <dt className="label w-20 shrink-0 pt-0.5 text-fg-faint">
                    Sector
                  </dt>
                  <dd className="font-mono text-sm text-fg">{study.industry}</dd>
                </div>
                <div className="flex gap-4 px-5 py-4">
                  <dt className="label w-20 shrink-0 pt-1 text-fg-faint">
                    Stack
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {study.stack.map((item) => (
                      <span
                        key={item}
                        className="label border border-grid px-2 py-1.5 text-fg-dim"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div>
            <SectionRule index={2} name="Execution" />

            <ol className="mt-8 border border-grid">
              {study.approach.map((step, i) => (
                <Reveal
                  key={step}
                  as="li"
                  delay={i * 70}
                  className={
                    i < study.approach.length - 1 ? "border-b border-grid" : ""
                  }
                >
                  <div className="flex gap-5 px-6 py-5">
                    <span
                      aria-hidden="true"
                      className="label shrink-0 pt-1 text-phos tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="prose-body text-sm text-fg-dim">{step}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={120}>
              <div className="mt-6 border border-phos-dim bg-shell">
                <h3 className="label border-b border-phos-dim px-6 py-3.5 text-phos">
                  <span aria-hidden="true">## </span>Outcome
                </h3>
                <p className="prose-body px-6 py-6 text-fg">{study.outcome}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section size="wide" className="border-t border-grid">
          <SectionRule index={3} name="More records" />
          <ul className="mt-10 border border-grid">
            {related.map((item, i) => (
              <Reveal
                key={item.slug}
                as="li"
                delay={i * 80}
                className={i < related.length - 1 ? "border-b border-grid" : ""}
              >
                <Link
                  href={`/work/${item.slug}`}
                  className="group flex flex-wrap items-center justify-between gap-4 px-6 py-6 transition-colors hover:bg-panel"
                >
                  <span className="min-w-0">
                    <span className="label block text-fg-faint">
                      {item.industry}
                    </span>
                    <span className="mt-2 block font-mono text-lg uppercase text-fg transition-colors group-hover:text-phos">
                      {item.title}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="label text-fg-faint transition-all group-hover:translate-x-1 group-hover:text-phos"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaSection />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Work", href: "/work" },
          { name: study.title, href: `/work/${study.slug}` },
        ])}
      />
    </>
  );
}
