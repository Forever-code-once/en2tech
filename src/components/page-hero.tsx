import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./ui/container";
import { Reveal } from "./ui/reveal";

type Crumb = { name: string; href: string };

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
    <section className="relative z-1 border-b border-line">
      <Container size="wide">
        <div className="py-16 sm:py-24">
          {breadcrumb.length > 0 ? (
            <Reveal>
              <nav aria-label="Breadcrumb">
                <ol className="label flex flex-wrap items-center text-faint">
                  <li>
                    <Link href="/" className="transition-colors hover:text-volt-300">
                      Home
                    </Link>
                  </li>
                  {breadcrumb.map((crumb, i) => {
                    const isLast = i === breadcrumb.length - 1;
                    return (
                      <li key={crumb.href} className="flex items-center">
                        <span aria-hidden="true" className="px-2.5 text-line-hi">
                          /
                        </span>
                        {isLast ? (
                          <span aria-current="page" className="text-muted">
                            {crumb.name}
                          </span>
                        ) : (
                          <Link
                            href={crumb.href}
                            className="transition-colors hover:text-volt-300"
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
              <div className="mt-10 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-volt-400"
                />
                <span className="label text-volt-400">{eyebrow}</span>
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={110}>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,5.5vw,4.25rem)]">
              {title}
            </h1>
          </Reveal>

          {lede ? (
            <Reveal delay={170}>
              <p className="measure mt-7 text-lg leading-relaxed text-muted">
                {lede}
              </p>
            </Reveal>
          ) : null}

          {children ? <div className="mt-9">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
