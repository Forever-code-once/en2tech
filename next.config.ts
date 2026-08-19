import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * Carries forward the strict policy the previous site already served, with two
 * changes: fonts are now self-hosted by next/font so the Google Fonts origins
 * are gone entirely, and `style-src` still needs 'unsafe-inline' because both
 * Next.js and Tailwind emit inline style attributes for critical CSS.
 *
 * `script-src` keeps 'unsafe-inline' for Next's inline bootstrap and, in dev,
 * adds 'unsafe-eval' for React Fast Refresh — never in production.
 */
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  /**
   * Emits .next/standalone with a self-contained server.js and only the
   * node_modules actually reached at runtime. This is what makes the
   * Lightsail Docker image small and lets the container run without
   * installing dependencies at boot.
   */
  output: "standalone",

  poweredByHeader: false,
  reactStrictMode: true,

  // Fail the production build on a type error rather than shipping it.
  // (Next 16 removed the 'eslint' config key; lint runs via 'npm run lint'.)
  typescript: { ignoreBuildErrors: false },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      // The old single-page site used in-page anchors. Anyone arriving on a
      // stale link should land on the real page rather than a 404.
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/blog", destination: "/notes", permanent: true },
      { source: "/blog/:slug", destination: "/notes/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
