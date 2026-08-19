import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./ui/container";
import { Reveal } from "./ui/reveal";

type Crumb = { name: string; href: string };

/**
 * Interior page header. Sits on the lighter paper tone with a heavy rule
 * beneath, so every page opens with the same structural cue.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumb = [],
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  breadcrumb?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="border-b-2 border-forest-800 bg-paper-100">
      <Container size="wide">
        <div className="py-14 sm:py-20">
          {breadcrumb.length > 0 ? (
            <Reveal>
              <nav aria-label="Breadcrumb">
                <ol className="label flex flex-wrap items-center text-ink-faint">
                  <li>
                    <Link href="/" className="transition-colors hover:text-clay-600">
                      Home
                    </Link>
                  </li>
                  {breadcrumb.map((crumb, i) => {
                    const isLast = i === breadcrumb.length - 1;
                    return (
                      <li key={crumb.href} className="flex items-center">
                        <span aria-hidden="true" className="px-2 text-paper-400">
                          /
                        </span>
                        {isLast ? (
                          <span aria-current="page" className="text-forest-800">
                            {crumb.name}
                          </span>
                        ) : (
                          <Link
                            href={crumb.href}
                            className="transition-colors hover:text-clay-600"
                          >
                            {crumb.name}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </Reveal>
          ) : null}

          {eyebrow ? (
            <Reveal delay={60}>
              <div className="mt-9 flex items-center gap-3.5">
                <span aria-hidden="true" className="h-0.5 w-8 bg-clay-600" />
                <span className="label text-clay-600">{eyebrow}</span>
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={110}>
            <h1 className="mt-5 max-w-4xl text-[clamp(2rem,5vw,3.75rem)]">
              {title}
            </h1>
          </Reveal>

          {lede ? (
            <Reveal delay={170}>
              <p className="measure mt-6 text-lg leading-relaxed text-ink-soft">
                {lede}
              </p>
            </Reveal>
          ) : null}

          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
