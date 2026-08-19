/**
 * The wordmark reads as a shell prompt. The bracketed square is the "cursor",
 * which fills with phosphor on hover of the parent link.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`group/logo flex items-baseline gap-2 ${className}`.trim()}>
      <span
        aria-hidden="true"
        className="relative top-px inline-block h-3 w-3 shrink-0 border border-phos transition-colors duration-150 group-hover/logo:bg-phos"
      />
      <span className="font-mono text-base leading-none font-medium tracking-tight text-fg">
        en2
        <span className="text-fg-faint">.</span>
        <span className="text-phos">tech</span>
      </span>
    </span>
  );
}
