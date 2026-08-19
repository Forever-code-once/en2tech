/**
 * The wordmark is set as a stamped plate: forest block, bone slab type,
 * with the accent reserved for the "2".
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <span
        aria-hidden="true"
        className="grid h-8 w-8 shrink-0 place-items-center bg-forest-800 font-slab text-base leading-none font-bold text-paper-200"
      >
        E
      </span>
      <span className="font-slab text-xl leading-none font-bold tracking-tight text-forest-800">
        EN<span className="text-clay-600">2</span>
        <span className="ml-1.5 text-base font-normal text-ink-faint">Tech</span>
      </span>
    </span>
  );
}
