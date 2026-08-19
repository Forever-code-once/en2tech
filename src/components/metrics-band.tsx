import { Reveal } from "./ui/reveal";

export type Metric = { value: string; label: string };

/**
 * Data readout. Cells are divided by grid rules rather than gaps, so the band
 * reads as one instrument panel instead of four floating cards.
 */
export function MetricsBand({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid grid-cols-2 border border-grid lg:grid-cols-4">
      {metrics.map((metric, i) => (
        <Reveal key={metric.label} delay={i * 70}>
          <div
            className={`h-full border-grid px-5 py-7 sm:px-7 ${
              // Right rule on all but the last cell in each row.
              i % 2 === 0 ? "border-r" : "lg:border-r"
            } ${i < metrics.length - 2 ? "border-b lg:border-b-0" : ""} ${
              i === metrics.length - 1 ? "lg:border-r-0" : ""
            }`}
          >
            <dt className="sr-only">{metric.label}</dt>
            <dd>
              <span className="block font-mono text-[clamp(1.75rem,4vw,2.75rem)] leading-none font-medium text-phos tabular-nums">
                {metric.value}
              </span>
              <span className="label mt-3.5 block text-fg-faint">
                {metric.label}
              </span>
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}
