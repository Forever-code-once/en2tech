import { Reveal } from "./ui/reveal";

export type Metric = { value: string; label: string };

/**
 * Operating record — a bordered plate with a titled header bar, cells divided
 * by structural rules. The reference is a spec table on equipment, not a row
 * of floating stat cards.
 */
export function MetricsBand({
  metrics,
  title = "Operating record",
}: {
  metrics: Metric[];
  title?: string;
}) {
  return (
    <div className="plate">
      <p className="plate-head label">{title}</p>
      <dl className="grid grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <Reveal
            key={metric.label}
            delay={i * 70}
            className={`border-forest-800 ${
              i % 2 === 0 ? "border-r-2" : "lg:border-r-2"
            } ${i < metrics.length - 2 ? "border-b-2 lg:border-b-0" : ""} ${
              i === metrics.length - 1 ? "lg:border-r-0" : ""
            }`}
          >
            <div className="h-full px-5 py-6 sm:px-7 sm:py-8">
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block font-slab text-[clamp(1.875rem,4vw,2.75rem)] leading-none font-bold text-forest-800 tabular-nums">
                  {metric.value}
                </span>
                <span className="label mt-3 block text-ink-faint">
                  {metric.label}
                </span>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}
