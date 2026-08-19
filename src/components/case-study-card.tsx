import Link from "next/link";
import type { CaseStudy } from "@/content/work";

/**
 * A case study is presented as a filed record: header bar carrying sector and
 * year, body, then the measured results in a ruled strip at the foot.
 */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group h-full">
      <Link
        href={`/work/${study.slug}`}
        className="plate flex h-full flex-col transition-colors duration-150 hover:bg-paper-50"
      >
        <div className="plate-head label flex items-center justify-between gap-3">
          <span className="truncate">{study.industry}</span>
          <span className="tabular-nums text-paper-400">{study.year}</span>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="font-slab text-2xl leading-tight font-bold text-forest-800 transition-colors group-hover:text-clay-600">
            {study.title}
          </h3>

          <p className="mt-3 text-ink-soft">{study.summary}</p>

          <dl className="mt-auto grid grid-cols-3 gap-4 border-t-2 border-forest-800 pt-5 sm:gap-6">
            {study.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="min-w-0">
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="block font-slab text-xl leading-none font-bold text-clay-600 tabular-nums">
                    {metric.value}
                  </span>
                  <span className="label mt-2 block text-ink-faint">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="label flex items-center justify-between border-t-2 border-forest-800 bg-paper-200 px-6 py-3.5 text-ink-soft transition-colors group-hover:text-clay-600 sm:px-7">
          <span>Read the record</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-150 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </Link>
    </article>
  );
}
