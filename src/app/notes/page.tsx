import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { getNotes } from "@/lib/notes";
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
        eyebrow="ls -la notes/"
        title="Field notes from the work"
        lede="Occasional writing on integration, operations, and what actually happens when software meets a business that has been running fine without it."
        breadcrumb={[{ name: "notes", href: "/notes" }]}
      />

      <Section size="default">
        {notes.length > 0 ? (
          <ul className="border-y border-grid">
            {notes.map((note, i) => (
              <Reveal
                key={note.slug}
                as="li"
                delay={i * 70}
                className={i < notes.length - 1 ? "border-b border-grid" : ""}
              >
                <article>
                  <Link
                    href={`/notes/${note.slug}`}
                    className="group flex flex-col gap-4 px-4 py-8 transition-colors hover:bg-panel sm:flex-row sm:gap-8 sm:px-6"
                  >
                    <div className="label flex shrink-0 gap-3 text-fg-faint sm:w-32 sm:flex-col sm:gap-2">
                      <time dateTime={note.published} className="tabular-nums">
                        {note.published}
                      </time>
                      <span
                        aria-hidden="true"
                        className="text-grid-hi sm:hidden"
                      >
                        {"//"}
                      </span>
                      <span>{note.readingTime} min</span>
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-mono text-lg uppercase leading-snug text-fg transition-colors group-hover:text-phos sm:text-xl">
                        {note.title}
                        {note.draft ? (
                          <span className="label ml-3 inline-block border border-warn px-2 py-1 align-middle text-warn">
                            Draft
                          </span>
                        ) : null}
                      </h2>
                      {note.description ? (
                        <p className="prose-body mt-2.5 text-fg-dim">
                          {note.description}
                        </p>
                      ) : null}
                      {note.tags.length > 0 ? (
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {note.tags.map((tag) => (
                            <li
                              key={tag}
                              className="label border border-grid px-2 py-1.5 text-fg-faint"
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
            <div className="border border-grid bg-shell px-8 py-20 text-center">
              <p className="label text-fg-faint">0 entries</p>
              <h2 className="mt-5 font-mono text-xl uppercase text-fg">
                Nothing published yet
              </h2>
              <p className="prose-body mx-auto mt-3 max-w-md text-fg-dim">
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
