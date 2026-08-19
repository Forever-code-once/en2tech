import type { ReactNode } from "react";
import { Container } from "./ui/container";
import { PageHero } from "./page-hero";

export type LegalSection = { heading: string; body: ReactNode };

/**
 * Shared shell for /privacy and /terms so both stay visually consistent and
 * neither drifts into a differently-styled orphan page.
 */
export function LegalPage({
  title,
  lede,
  updated,
  breadcrumbName,
  breadcrumbHref,
  sections,
}: {
  title: string;
  lede: string;
  updated: string;
  breadcrumbName: string;
  breadcrumbHref: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        eyebrow={`last-modified ${updated}`}
        title={title}
        lede={lede}
        breadcrumb={[{ name: breadcrumbName, href: breadcrumbHref }]}
      />

      <Container size="narrow">
        <div className="py-16 sm:py-20">
          <ol className="border border-grid">
            {sections.map((section, i) => (
              <li
                key={section.heading}
                className={i < sections.length - 1 ? "border-b border-grid" : ""}
              >
                <h2 className="label flex items-baseline gap-3 border-b border-grid bg-shell px-6 py-3.5 text-fg">
                  <span aria-hidden="true" className="text-phos tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                <div className="prose-body space-y-4 px-6 py-6 text-fg-dim">
                  {section.body}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </>
  );
}
