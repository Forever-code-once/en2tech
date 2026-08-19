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
                  className="label inline-block rounded-full border border-line px-3.5 py-2 text-muted transition-colors hover:border-volt-500 hover:text-volt-300"
                >
                  {service.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </PageHero>

      <Section size="wide" className="pb-0">
        <MetricsBand metrics={study.metrics} />
      </Section>

      <Section size="wide">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <SectionRule name="The situation" />

            <Reveal delay={70}>
              <p className="measure mt-6 text-muted">{study.challenge}</p>
            </Reveal>

            <Reveal delay={140}>
              <dl className="panel panel-lit rounded-2xl overflow-hidden mt-9">
                <div className="flex gap-5 border-b border-line px-5 py-4">
                  <dt className="label w-20 shrink-0 pt-1 text-faint">
                    Client
                  </dt>
                  <dd className="text-bright">{study.client}</dd>
                </div>
                <div className="flex gap-5 border-b border-line px-5 py-4">
                  <dt className="label w-20 shrink-0 pt-1 text-faint">
                    Sector
                  </dt>
                  <dd className="text-bright">{study.industry}</dd>
                </div>
                <div className="flex gap-5 px-5 py-4">
                  <dt className="label w-20 shrink-0 pt-1.5 text-faint">
                    Stack
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {study.stack.map((item) => (
                      <span
                        key={item}
                        className="label border border-line px-2 py-1.5 text-muted"
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
            <ol className="panel panel-lit rounded-2xl overflow-hidden mt-6">
              {study.approach.map((step, i) => (
                <Reveal
                  key={step}
                  as="li"
                  delay={i * 70}
                  className={
                    i < study.approach.length - 1
                      ? "border-b border-line"
                      : ""
                  }
                >
                  <div className="flex gap-5 px-5 py-5 sm:px-6">
                    <span
                      aria-hidden="true"
                      className="label shrink-0 pt-1 text-volt-400 tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[0.97rem] text-muted">{step}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={120}>
              <div className="mt-6 overflow-hidden rounded-2xl border border-volt-500/50">
                <h3 className="label bg-volt-400 px-5 py-3 text-void sm:px-6">
                  Where it landed
                </h3>
                <p className="px-5 py-6 text-lg leading-relaxed text-bright sm:px-6">
                  {study.outcome}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section size="wide" className="border-t border-line bg-surface">
          <SectionRule name="More records" />
          <ul className="panel panel-lit rounded-2xl overflow-hidden mt-8">
            {related.map((item, i) => (
              <Reveal
                key={item.slug}
                as="li"
                delay={i * 80}
                className={
                  i < related.length - 1 ? "border-b border-line" : ""
                }
              >
                <Link
                  href={`/work/${item.slug}`}
                  className="group flex flex-wrap items-center justify-between gap-4 px-6 py-6 transition-colors hover:bg-raised/60"
                >
                  <span className="min-w-0">
                    <span className="label block text-faint">
                      {item.industry} · {item.year}
                    </span>
                    <span className="mt-2 block font-display text-xl font-bold text-bright transition-colors group-hover:text-volt-400">
                      {item.title}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="label text-faint transition-all group-hover:translate-x-1 group-hover:text-volt-400"
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
