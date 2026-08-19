import Link from "next/link";
import type { Service } from "@/content/services";

/**
 * Services render as full-width ruled rows rather than cards — a directory
 * listing, not a brochure. Hover floods the row with panel fill and pushes
 * the index into phosphor.
 */
export function ServiceRow({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group grid items-start gap-x-8 gap-y-4 border-b border-grid px-4 py-8 transition-colors duration-150 hover:bg-panel sm:px-6 md:grid-cols-[4rem_1fr_auto] md:py-10"
    >
      <span
        aria-hidden="true"
        className="label text-fg-faint transition-colors group-hover:text-phos md:pt-1.5"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="min-w-0">
        <span className="block font-mono text-xl uppercase leading-tight text-fg transition-colors group-hover:text-phos sm:text-2xl">
          {service.title}
        </span>
        <span className="prose-body mt-2.5 block max-w-xl text-fg-dim">
          {service.tagline}
        </span>
        <span className="mt-5 flex flex-wrap gap-1.5">
          {service.stack.slice(0, 5).map((item) => (
            <span
              key={item}
              className="label border border-grid px-2.5 py-1.5 text-fg-faint transition-colors group-hover:border-grid-hi"
            >
              {item}
            </span>
          ))}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="label hidden items-center gap-2 self-center text-fg-faint transition-all duration-150 group-hover:text-phos md:flex"
      >
        Detail
        <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
