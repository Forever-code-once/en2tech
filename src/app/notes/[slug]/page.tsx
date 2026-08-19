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
        <header className="border-b-2 border-forest-800 bg-paper-100">
          <Container size="narrow">
            <div className="py-14 sm:py-18">
              <Reveal>
                <nav aria-label="Breadcrumb">
                  <ol className="label flex items-center text-ink-faint">
                    <li>
                      <Link href="/" className="hover:text-clay-600">
                        Home
                      </Link>
                    </li>
                    <li aria-hidden="true" className="px-2 text-paper-400">
                      /
                    </li>
                    <li>
                      <Link href="/notes" className="hover:text-clay-600">
                        Notes
                      </Link>
                    </li>
                  </ol>
                </nav>
              </Reveal>

              <Reveal delay={60}>
                <div className="label mt-8 flex flex-wrap items-center gap-3 text-ink-faint">
                  <time dateTime={note.published} className="tabular-nums">
                    {formatDate(note.published)}
                  </time>
                  <span aria-hidden="true" className="text-paper-400">
                    &bull;
                  </span>
                  <span>{note.readingTime} min read</span>
                  {note.draft ? (
                    <span className="border-2 border-flag px-2 py-1 text-flag">
                      Draft
                    </span>
                  ) : null}
                </div>
              </Reveal>

              <Reveal delay={110}>
                <h1 className="mt-5 text-[clamp(1.875rem,4.5vw,3rem)]">
                  {note.title}
                </h1>
              </Reveal>

              {note.description ? (
                <Reveal delay={170}>
                  <p className="measure mt-6 text-lg leading-relaxed text-ink-soft">
                    {note.description}
                  </p>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </header>

        <Container size="narrow">
          <div className="prose-en2 py-14 sm:py-18">
            <MDXRemote source={note.content} components={mdxComponents} />
          </div>

          <footer className="label border-t-2 border-forest-800 py-7 text-ink-faint">
            <p>
              Written by {site.founder}
              {note.updated && note.updated !== note.published ? (
                <> &bull; Updated {formatDate(note.updated)}</>
              ) : null}
            </p>
          </footer>
        </Container>
      </article>

      {others.length > 0 ? (
        <section className="border-t-2 border-forest-800 bg-paper-100 py-14">
          <Container size="narrow">
            <div className="flex items-center gap-3.5">
              <span aria-hidden="true" className="h-0.5 w-8 bg-clay-600" />
              <span className="label text-clay-600">Keep reading</span>
            </div>
            <ul className="plate mt-6">
              {others.map((other, i) => (
                <li
                  key={other.slug}
                  className={
                    i < others.length - 1 ? "border-b-2 border-forest-800" : ""
                  }
                >
                  <Link
                    href={`/notes/${other.slug}`}
                    className="group block px-6 py-5 transition-colors hover:bg-paper-50"
                  >
                    <span className="block font-slab text-lg font-bold text-forest-800 transition-colors group-hover:text-clay-600">
                      {other.title}
                    </span>
                    {other.description ? (
                      <span className="mt-1.5 block text-sm text-ink-soft">
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
