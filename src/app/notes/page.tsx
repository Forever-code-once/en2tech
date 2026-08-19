import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { formatDate, getNotes } from "@/lib/notes";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Field notes on building software for small business — integration, operations, and the practical realities of shipping systems people depend on.",
  alternates: { canonical: "/notes" },
  openGraph: {
    title: "Notes — EN2 Tech",
    description: "Field notes on building software for small business.",
    url: "/notes",
  },
};

export default function NotesPage() {
  const notes = getNotes();

  return (
    <>
      <PageHero
        eyebrow="Notes"
        title="Field notes from the work."
        lede="Occasional writing on integration, operations, and what actually happens when software meets a business that has been running fine without it."
        breadcrumb={[{ name: "Notes", href: "/notes" }]}
      />

      <Section size="default">
        {notes.length > 0 ? (
          <ul className="border-t border-line">
            {notes.map((note, i) => (
              <Reveal
                key={note.slug}
                as="li"
                delay={i * 70}
                className="border-b border-line"
              >
                <article>
                  <Link
                    href={`/notes/${note.slug}`}
                    className="group flex flex-col gap-4 px-5 py-8 transition-colors hover:bg-surface sm:flex-row sm:gap-8"
                  >
                    <div className="label flex shrink-0 gap-3 text-faint sm:w-36 sm:flex-col sm:gap-2">
                      <time dateTime={note.published} className="tabular-nums">
                        {formatDate(note.published)}
                      </time>
                      <span aria-hidden="true" className="text-line-hi sm:hidden">
                        &bull;
                      </span>
                      <span>{note.readingTime} min</span>
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-display text-2xl leading-snug font-bold text-bright transition-colors group-hover:text-volt-400">
                        {note.title}
                        {note.draft ? (
                          <span className="label ml-3 inline-block border border-flag px-2 py-1 align-middle text-flag">
                            Draft
                          </span>
                        ) : null}
                      </h2>
                      {note.description ? (
                        <p className="measure mt-2.5 text-muted">
                          {note.description}
                        </p>
                      ) : null}
                      {note.tags.length > 0 ? (
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {note.tags.map((tag) => (
                            <li
                              key={tag}
                              className="label border border-line px-2.5 py-1.5 text-faint"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal>
            <div className="panel panel-lit rounded-2xl overflow-hidden px-8 py-20 text-center">
              <p className="label text-faint">0 entries</p>
              <h2 className="mt-5 font-display text-2xl font-bold text-bright">
                Nothing published yet
              </h2>
              <p className="mx-auto mt-3 max-w-md text-muted">
                Notes will appear here as they&apos;re written.
              </p>
            </div>
          </Reveal>
        )}
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Notes", href: "/notes" },
        ])}
      />
    </>
  );
}
