import Link from "next/link";
import type { CaseStudy } from "@/content/work";

/**
 * A case study reads as a framed record: bracketed panel, a header line of
 * metadata, then the metrics as a small readout at the foot.
 */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group h-full">
      <Link
        href={`/work/${study.slug}`}
        className="brackets flex h-full flex-col border border-grid bg-shell transition-colors duration-150 hover:border-grid-hi hover:bg-panel"
      >
        <div className="label flex items-center justify-between gap-3 border-b border-grid px-6 py-3.5 text-fg-faint">
          <span className="truncate">{study.industry}</span>
          <span className="text-phos tabular-nums">{study.year}</span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-mono text-xl uppercase leading-tight text-fg transition-colors group-hover:text-phos">
            {study.title}
          </h3>

          <p className="prose-body mt-3 text-fg-dim">{study.summary}</p>

          <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-grid pt-5 sm:gap-6">
            {study.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="min-w-0">
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="block font-mono text-lg leading-none text-phos tabular-nums">
                    {metric.value}
                  </span>
                  <span className="label mt-2 block truncate text-fg-faint">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="label flex items-center justify-between border-t border-grid px-6 py-3.5 text-fg-faint transition-colors group-hover:text-phos">
          <span>Open record</span>
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
