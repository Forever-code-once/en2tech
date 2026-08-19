import Link from "next/link";
import type { Service } from "@/content/services";

/**
 * Services are listed as ruled entries in a register rather than as cards.
 * Hover lifts the paper tone and pushes the title to the accent.
 */
export function ServiceRow({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group grid items-start gap-x-8 gap-y-4 border-b-2 border-forest-800 px-5 py-8 transition-colors duration-150 hover:bg-paper-100 md:grid-cols-[1fr_auto] md:py-9"
    >
      <span className="min-w-0">
        <span className="block font-slab text-2xl leading-tight font-bold text-forest-800 transition-colors group-hover:text-clay-600 sm:text-3xl">
          {service.title}
        </span>
        <span className="measure mt-2.5 block text-ink-soft">
          {service.tagline}
        </span>
        <span className="mt-5 flex flex-wrap gap-1.5">
          {service.stack.slice(0, 5).map((item) => (
            <span
              key={item}
              className="label border border-paper-400 px-2.5 py-1.5 text-ink-faint"
            >
              {item}
            </span>
          ))}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="label hidden items-center gap-2 self-center whitespace-nowrap text-ink-faint transition-colors group-hover:text-clay-600 md:flex"
      >
        Details
        <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
