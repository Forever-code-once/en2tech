import type { MetadataRoute } from "next";
import { publishedCaseStudies } from "@/content/work";
import { getNotes } from "@/lib/notes";
import { site } from "@/lib/site";

/**
 * Generated at build time from the same content the pages render, so the
 * sitemap can never drift out of sync with what actually exists — the
 * failure mode of a hand-maintained sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/notes`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const workRoutes: MetadataRoute.Sitemap = publishedCaseStudies.map((study) => ({
    url: `${site.url}/work/${study.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const noteRoutes: MetadataRoute.Sitemap = getNotes()
    .filter((note) => !note.draft)
    .map((note) => ({
      url: `${site.url}/notes/${note.slug}`,
      lastModified: new Date(`${note.updated ?? note.published}T00:00:00Z`),
      changeFrequency: "yearly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...workRoutes, ...noteRoutes];
}
