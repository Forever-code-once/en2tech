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
    <section id={id} className={`relative py-20 sm:py-24 ${className}`.trim()}>
      <Container size={size}>{children}</Container>
    </section>
  );
}

/**
 * Section marker — a short accent rule above an uppercase spec label. Reads as
 * the tab on a divider in a binder.
 */
export function SectionRule({ name }: { name: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-3.5">
        <span aria-hidden="true" className="h-0.5 w-8 bg-clay-600" />
        <span className="label text-clay-600">{name}</span>
      </div>
    </Reveal>
  );
}

export function SectionHeading({
  title,
  lede,
}: {
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal delay={60}>
        <h2 className="text-[clamp(1.875rem,4vw,3rem)]">{title}</h2>
      </Reveal>
      {lede ? (
        <Reveal delay={120}>
          <p className="measure mt-5 text-lg leading-relaxed text-ink-soft">
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
