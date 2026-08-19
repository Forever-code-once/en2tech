import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * A real robots policy. The previous site served only Cloudflare's default
 * content-signal boilerplate — no User-agent, no Allow, and crucially no
 * Sitemap line, so crawlers had no pointer to the site's URL set.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
