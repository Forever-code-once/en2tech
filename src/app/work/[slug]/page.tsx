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
        eyebrow={`${study.industry} · ${study.year}`}
        title={study.title}
        lede={study.summary}
        breadcrumb={[
          { name: "Work", href: "/work" },
          { name: study.client, href: `/work/${study.slug}` },
        ]}
      >
        <ul className="flex flex-wrap gap-2">
          {study.serviceSlugs.map((serviceSlug) => {
            const service = getService(serviceSlug);
            if (!service) return null;
            return (
              <li key={serviceSlug}>
                <Link
                  href={`/services#${serviceSlug}`}
                  className="label inline-block border-2 border-paper-400 px-3.5 py-2 text-ink-soft transition-colors hover:border-forest-800 hover:text-forest-800"
                >
                  {service.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </PageHero>

      <Section size="wide" className="pb-0">
        <MetricsBand metrics={study.metrics} title="Measured results" />
      </Section>

      <Section size="wide">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <SectionRule name="The situation" />

            <Reveal delay={70}>
              <p className="measure mt-6 text-ink-soft">{study.challenge}</p>
            </Reveal>

            <Reveal delay={140}>
              <dl className="plate mt-9">
                <div className="flex gap-5 border-b border-paper-300 px-5 py-4">
                  <dt className="label w-20 shrink-0 pt-1 text-ink-faint">
                    Client
                  </dt>
                  <dd className="text-ink">{study.client}</dd>
                </div>
                <div className="flex gap-5 border-b border-paper-300 px-5 py-4">
                  <dt className="label w-20 shrink-0 pt-1 text-ink-faint">
                    Sector
                  </dt>
                  <dd className="text-ink">{study.industry}</dd>
                </div>
                <div className="flex gap-5 px-5 py-4">
                  <dt className="label w-20 shrink-0 pt-1.5 text-ink-faint">
                    Stack
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {study.stack.map((item) => (
                      <span
                        key={item}
                        className="label border border-paper-400 px-2 py-1.5 text-ink-soft"
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
            <SectionRule name="What we did" />

            {/* Ordered because the steps ran in this sequence and each
                depended on the one before it. */}
            <ol className="plate mt-6">
              {study.approach.map((step, i) => (
                <Reveal
                  key={step}
                  as="li"
                  delay={i * 70}
                  className={
                    i < study.approach.length - 1
                      ? "border-b border-paper-300"
                      : ""
                  }
                >
                  <div className="flex gap-5 px-5 py-5 sm:px-6">
                    <span
                      aria-hidden="true"
                      className="label shrink-0 pt-1 text-clay-600 tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[0.97rem] text-ink-soft">{step}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={120}>
              <div className="mt-6 border-2 border-clay-600">
                <h3 className="label bg-clay-600 px-5 py-3 text-paper-100 sm:px-6">
                  Where it landed
                </h3>
                <p className="px-5 py-6 text-lg leading-relaxed text-ink sm:px-6">
                  {study.outcome}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section size="wide" className="border-t-2 border-forest-800 bg-paper-100">
          <SectionRule name="More records" />
          <ul className="plate mt-8">
            {related.map((item, i) => (
              <Reveal
                key={item.slug}
                as="li"
                delay={i * 80}
                className={
                  i < related.length - 1 ? "border-b-2 border-forest-800" : ""
                }
              >
                <Link
                  href={`/work/${item.slug}`}
                  className="group flex flex-wrap items-center justify-between gap-4 px-6 py-6 transition-colors hover:bg-paper-50"
                >
                  <span className="min-w-0">
                    <span className="label block text-ink-faint">
                      {item.industry} · {item.year}
                    </span>
                    <span className="mt-2 block font-slab text-xl font-bold text-forest-800 transition-colors group-hover:text-clay-600">
                      {item.title}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="label text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-clay-600"
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
