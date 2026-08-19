import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./ui/container";
import { Reveal } from "./ui/reveal";

type Crumb = { name: string; href: string };

/**
 * Interior page header. The breadcrumb is rendered as a filesystem path, which
 * is both the visual language of the system and a genuinely clearer way to
 * show depth than chevrons.
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
    <section className="relative overflow-hidden border-b border-grid">
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 opacity-40"
      />
      <Container size="wide" className="relative">
        <div className="border-x border-grid px-6 py-16 sm:py-20">
          {breadcrumb.length > 0 ? (
            <Reveal>
              <nav aria-label="Breadcrumb">
                <ol className="label flex flex-wrap items-center text-fg-faint">
                  <li>
                    <Link href="/" className="transition-colors hover:text-phos">
                      ~
                    </Link>
                  </li>
                  {breadcrumb.map((crumb, i) => {
                    const isLast = i === breadcrumb.length - 1;
                    return (
                      <li key={crumb.href} className="flex items-center">
                        <span aria-hidden="true" className="px-1.5 text-grid-hi">
                          /
                        </span>
                        {isLast ? (
                          <span aria-current="page" className="text-phos">
                            {crumb.name}
                          </span>
                        ) : (
                          <Link
                            href={crumb.href}
                            className="transition-colors hover:text-phos"
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
              <p className="label mt-10 text-fg-faint">
                <span aria-hidden="true" className="text-phos">
                  ${" "}
                </span>
                {eyebrow}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={110}>
            <h1 className="mt-5 max-w-4xl text-[clamp(2rem,5.5vw,4rem)] uppercase">
              {title}
            </h1>
          </Reveal>

          {lede ? (
            <Reveal delay={170}>
              <p className="prose-body mt-7 max-w-2xl text-fg-dim">{lede}</p>
            </Reveal>
          ) : null}

          {children ? <div className="mt-9">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
