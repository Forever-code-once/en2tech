import Link from "next/link";
import type { CaseStudy } from "@/content/work";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group h-full">
      <Link
        href={`/work/${study.slug}`}
        className="panel panel-lit flex h-full flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-hi sm:p-8"
      >
        <div className="label flex items-center gap-3 text-faint">
          <span className="truncate">{study.industry}</span>
          <span aria-hidden="true" className="h-px w-5 bg-line-hi" />
          <span className="tabular-nums">{study.year}</span>
        </div>

        <h3 className="mt-5 font-display text-2xl leading-tight font-600 text-bright transition-colors group-hover:text-volt-300">
          {study.title}
        </h3>

        <p className="mt-3 text-muted">{study.summary}</p>

        <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-line pt-6 sm:gap-6">
          {study.metrics.slice(0, 3).map((metric) => (
            <div key={metric.label} className="min-w-0">
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block font-display text-xl leading-none font-600 text-volt-400 tabular-nums">
                  {metric.value}
                </span>
                <span className="label mt-2 block truncate text-faint">
                  {metric.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Link>
    </article>
  );
}
