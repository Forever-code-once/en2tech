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
    <section id={id} className={`relative z-1 py-20 sm:py-28 ${className}`.trim()}>
      <Container size={size}>{children}</Container>
    </section>
  );
}

/** Small volt-lit eyebrow above a section headline. */
export function SectionRule({ name }: { name: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-volt-400" />
        <span className="label text-volt-400">{name}</span>
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
        <h2 className="text-[clamp(2rem,4.5vw,3.5rem)]">{title}</h2>
      </Reveal>
      {lede ? (
        <Reveal delay={120}>
          <p className="measure mt-6 text-lg leading-relaxed text-muted">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
