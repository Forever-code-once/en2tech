/**
 * Wordmark: a small volt-lit block beside the name, with the accent reserved
 * for the numeral so the mark has one point of colour.
 */
export function Logo() {
  return (
    <span className="group/logo inline-flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-volt-400 font-display text-sm font-bold text-void transition-shadow duration-300 group-hover/logo:volt-glow"
      >
        E
      </span>
      <span className="font-display text-lg leading-none font-600 tracking-tight text-bright">
        en<span className="text-volt-400">2</span>
        <span className="text-faint">.tech</span>
      </span>
    </span>
  );
}
