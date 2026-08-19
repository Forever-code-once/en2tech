import { Reveal } from "./ui/reveal";

export type Metric = { value: string; label: string };

export function MetricsBand({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="panel panel-lit grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line lg:grid-cols-4">
      {metrics.map((metric, i) => (
        <Reveal key={metric.label} delay={i * 70}>
          <div className="h-full bg-surface/80 px-5 py-7 backdrop-blur-sm sm:px-7 sm:py-8">
            <dt className="sr-only">{metric.label}</dt>
            <dd>
              <span className="block font-display text-[clamp(1.875rem,4vw,2.75rem)] leading-none font-600 text-bright tabular-nums">
                {metric.value}
              </span>
              <span className="label mt-3.5 block text-faint">{metric.label}</span>
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}
