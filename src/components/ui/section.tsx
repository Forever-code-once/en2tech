import type { ReactNode } from "react";
import { Container } from "./container";
import { Reveal } from "./reveal";

export function Section({
  children,
  id,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  size?: "narrow" | "default" | "wide";
}) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`.trim()}>
      <Container size={size}>{children}</Container>
    </section>
  );
}

/**
 * Section marker: a numbered rule that spans the column with the section name
 * flush right, like a delimiter printed between blocks of output.
 *
 *   ── 02 ─────────────────────────────────── SERVICES ──
 */
export function SectionRule({
  index,
  name,
}: {
  index: number;
  name: string;
}) {
  return (
    <Reveal>
      <div className="label flex items-center gap-4 text-fg-faint">
        <span className="text-phos">{String(index).padStart(2, "0")}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-grid" />
        <span>{name}</span>
      </div>
    </Reveal>
  );
}

/**
 * Headline block. The lede switches to the sans companion because mono at
 * paragraph length is hostile to read.
 */
export function SectionHeading({
  title,
  lede,
  prompt,
}: {
  title: ReactNode;
  lede?: ReactNode;
  /** Optional shell-prompt line rendered above the headline. */
  prompt?: string;
}) {
  return (
    <div className="max-w-3xl">
      {prompt ? (
        <Reveal>
          <p className="label mb-5 text-fg-faint">
            <span aria-hidden="true" className="text-phos">
              ${" "}
            </span>
            {prompt}
          </p>
        </Reveal>
      ) : null}
      <Reveal delay={60}>
        <h2 className="text-[clamp(1.875rem,4vw,3rem)] uppercase">{title}</h2>
      </Reveal>
      {lede ? (
        <Reveal delay={120}>
          <p className="prose-body mt-6 text-fg-dim">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
