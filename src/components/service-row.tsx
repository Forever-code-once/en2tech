import Link from "next/link";
import type { Service } from "@/content/services";

export function ServiceRow({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative grid items-start gap-x-8 gap-y-4 border-b border-line px-4 py-9 transition-colors duration-300 hover:bg-raised/50 md:grid-cols-[1fr_auto] md:py-11"
    >
      {/* Volt line that draws in from the left on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-volt-400 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <span className="min-w-0">
        <span className="block font-display text-2xl leading-tight font-600 text-bright transition-colors group-hover:text-volt-300 sm:text-3xl">
          {service.title}
        </span>
        <span className="measure mt-3 block text-muted">{service.tagline}</span>
        <span className="mt-5 flex flex-wrap gap-2">
          {service.stack.slice(0, 5).map((item) => (
            <span
              key={item}
              className="label rounded-full border border-line px-3 py-1.5 text-faint transition-colors group-hover:border-line-hi"
            >
              {item}
            </span>
          ))}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="hidden shrink-0 self-center rounded-full border border-line p-3 text-muted transition-all duration-300 group-hover:border-volt-400 group-hover:bg-volt-400 group-hover:text-void md:block"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12h14m0 0-6-6m6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
