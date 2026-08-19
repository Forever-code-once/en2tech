/**
 * Single source of truth for site-wide identity, contact details and nav.
 * Anything that appears in more than one place lives here.
 */

const FALLBACK_URL = "https://en2.tech";

/**
 * Resolve the canonical site origin.
 *
 * Deliberately not `process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_URL`: build
 * platforms hand an env var that exists-but-is-blank through as `""`, which
 * `??` happily passes along, and `new URL("")` then throws ERR_INVALID_URL
 * during page-data collection. Anything blank or unparseable falls back
 * instead, and says so in the build log rather than failing cryptically.
 *
 * Returns `.origin`, so a trailing slash or stray path in the env var can't
 * produce doubled slashes in canonicals and the sitemap.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) return FALLBACK_URL;

  try {
    return new URL(raw).origin;
  } catch {
    console.warn(
      `[site] NEXT_PUBLIC_SITE_URL is set but not a valid URL (${JSON.stringify(raw)}). ` +
        `Falling back to ${FALLBACK_URL}.`,
    );
    return FALLBACK_URL;
  }
}

export const site = {
  name: "EN2 Tech",
  legalName: "EN2 Tech LLC",
  domain: "en2.tech",
  url: resolveSiteUrl(),
  tagline: "Building the future of small business.",
  description:
    "Custom software development, systems integration and fractional CTO services for small businesses in rural Middle Tennessee.",
  founder: "John Grathwohl",
  email: "john@en2.tech",
  locality: "Murfreesboro",
  region: "TN",
  regionName: "Tennessee",
  country: "US",
  postalCode: "37130",
  /** Approximate coordinates for Murfreesboro, TN — used for LocalBusiness schema. */
  geo: { latitude: 35.8456, longitude: -86.3903 },
  founded: "2013",
  /** Set false when EN2 reopens for new engagements. */
  atCapacity: true,
  areaServed: [
    "Murfreesboro, TN",
    "Rutherford County, TN",
    "Nashville, TN",
    "Middle Tennessee",
  ],
} as const;

export type NavLink = { href: string; label: string };

export const primaryNav: NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/notes", label: "Notes" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/work", label: "Work" },
      { href: "/notes", label: "Notes" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services#applications", label: "Custom Applications" },
      { href: "/services#integration", label: "Systems Integration" },
      { href: "/services#strategy", label: "Technology Strategy" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];
