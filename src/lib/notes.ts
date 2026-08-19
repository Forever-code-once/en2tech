import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Notes are MDX files in src/content/blog. Reading them from disk at build
 * time keeps authoring to "drop in a file, commit" — no CMS, no database, and
 * every post is statically rendered.
 */

const NOTES_DIR = path.join(process.cwd(), "src", "content", "blog");

export type NoteMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. 2026-04-19 */
  published: string;
  updated?: string;
  tags: string[];
  readingTime: number;
  draft: boolean;
};

export type Note = NoteMeta & { content: string };

/** ~200 wpm, rounded up, minimum 1. */
function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function readNote(filename: string): Note | null {
  const filePath = path.join(NOTES_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  // A note missing required frontmatter is a content bug — surface it at build
  // time rather than rendering a half-broken page.
  if (!data.title || !data.published) {
    throw new Error(
      `[notes] ${filename} is missing required frontmatter (title, published).`,
    );
  }

  return {
    slug: filename.replace(/\.mdx?$/, ""),
    title: String(data.title),
    description: String(data.description ?? ""),
    published: String(data.published),
    updated: data.updated ? String(data.updated) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: readingTime(content),
    draft: data.draft === true,
    content,
  };
}

/** All published notes, newest first. Drafts are excluded in production only. */
export function getNotes(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return [];

  const includeDrafts = process.env.NODE_ENV !== "production";

  return fs
    .readdirSync(NOTES_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map(readNote)
    .filter((note): note is Note => note !== null)
    .filter((note) => includeDrafts || !note.draft)
    .sort((a, b) => b.published.localeCompare(a.published));
}

export function getNote(slug: string): Note | undefined {
  return getNotes().find((note) => note.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
