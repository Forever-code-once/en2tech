import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { CtaSection } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { mdxComponents } from "@/components/mdx-components";
import { formatDate, getNote, getNotes } from "@/lib/notes";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) return { title: "Note not found" };

  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      type: "article",
      title: `${note.title} — ${site.name}`,
      description: note.description,
      url: `/notes/${note.slug}`,
      publishedTime: note.published,
      modifiedTime: note.updated ?? note.published,
      authors: [site.founder],
      tags: note.tags,
    },
    // Drafts are visible in development but must never be indexed.
    robots: note.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) notFound();

  const others = getNotes().filter((n) => n.slug !== note.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-grid">
          <div
            aria-hidden="true"
            className="grid-field pointer-events-none absolute inset-0 opacity-40"
          />
          <Container size="narrow" className="relative">
            <div className="py-16 sm:py-20">
              <Reveal>
                <nav aria-label="Breadcrumb">
                  <ol className="label flex items-center text-fg-faint">
                    <li>
                      <Link href="/" className="hover:text-phos">
                        ~
                      </Link>
                    </li>
                    <li aria-hidden="true" className="px-1.5 text-grid-hi">
                      /
                    </li>
                    <li>
                      <Link href="/notes" className="hover:text-phos">
                        notes
                      </Link>
                    </li>
                    <li aria-hidden="true" className="px-1.5 text-grid-hi">
                      /
                    </li>
                    <li className="truncate text-phos">{note.slug}</li>
                  </ol>
                </nav>
              </Reveal>

              <Reveal delay={60}>
                <div className="label mt-9 flex flex-wrap items-center gap-3 text-fg-faint">
                  <time dateTime={note.published} className="tabular-nums">
                    {formatDate(note.published)}
                  </time>
                  <span aria-hidden="true" className="text-grid-hi">
                    {"//"}
                  </span>
                  <span>{note.readingTime} min read</span>
                  {note.draft ? (
                    <span className="border border-warn px-2 py-1 text-warn">
                      Draft
                    </span>
                  ) : null}
                </div>
              </Reveal>

              <Reveal delay={110}>
                <h1 className="mt-5 text-[clamp(1.75rem,4.5vw,3rem)] uppercase">
                  {note.title}
                </h1>
              </Reveal>

              {note.description ? (
                <Reveal delay={170}>
                  <p className="prose-body mt-6 text-fg-dim">
                    {note.description}
                  </p>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </header>

        <Container size="narrow">
          <div className="prose-en2 prose-body py-16 sm:py-20">
            <MDXRemote source={note.content} components={mdxComponents} />
          </div>

          <footer className="label border-t border-grid py-8 text-fg-faint">
            <p>
              Written by {site.founder}
              {note.updated && note.updated !== note.published ? (
                <> {"//"} updated {formatDate(note.updated)}</>
              ) : null}
            </p>
          </footer>
        </Container>
      </article>

      {others.length > 0 ? (
        <section className="border-t border-grid py-16">
          <Container size="narrow">
            <p className="label text-fg-faint">
              <span aria-hidden="true" className="text-phos">
                ${" "}
              </span>
              ls related/
            </p>
            <ul className="mt-6 border border-grid">
              {others.map((other, i) => (
                <li
                  key={other.slug}
                  className={i < others.length - 1 ? "border-b border-grid" : ""}
                >
                  <Link
                    href={`/notes/${other.slug}`}
                    className="group block px-6 py-5 transition-colors hover:bg-panel"
                  >
                    <span className="block font-mono text-base uppercase text-fg transition-colors group-hover:text-phos">
                      {other.title}
                    </span>
                    {other.description ? (
                      <span className="prose-body mt-1.5 block text-sm text-fg-dim">
                        {other.description}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaSection />

      {!note.draft ? (
        <JsonLd
          data={articleSchema({
            title: note.title,
            description: note.description,
            slug: note.slug,
            published: note.published,
            updated: note.updated,
          })}
        />
      ) : null}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Notes", href: "/notes" },
          { name: note.title, href: `/notes/${note.slug}` },
        ])}
      />
    </>
  );
}
