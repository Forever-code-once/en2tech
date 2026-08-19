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
        eyebrow={`Last updated ${updated}`}
        title={title}
        lede={lede}
        breadcrumb={[{ name: breadcrumbName, href: breadcrumbHref }]}
      />

      <Container size="narrow">
        <div className="py-14 sm:py-18">
          <ol className="panel panel-lit rounded-2xl overflow-hidden">
            {sections.map((section, i) => (
              <li
                key={section.heading}
                className={
                  i < sections.length - 1 ? "border-b border-line" : ""
                }
              >
                <h2 className="label flex items-baseline gap-3 border-b border-line bg-raised px-6 py-3.5 text-bright">
                  <span aria-hidden="true" className="text-volt-400 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                <div className="measure space-y-4 px-6 py-6 text-muted">
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
