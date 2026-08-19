import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StatusBar } from "@/components/status-bar";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * IBM Plex Mono carries the entire display and UI voice; Plex Sans handles
 * long-form reading only. They share a skeleton, so the pairing reads as one
 * family rather than two typefaces bolted together.
 *
 * Both are self-hosted by next/font at build time — no runtime request to
 * Google, and no layout shift.
 */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-mono",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Custom Software for Middle Tennessee Business`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder }],
  creator: site.founder,
  publisher: site.legalName,
  keywords: [
    "custom software development",
    "systems integration",
    "fractional CTO",
    "Murfreesboro Tennessee",
    "Middle Tennessee software",
    "transportation management system",
    "QuickBooks integration",
    "small business technology consulting",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Custom Software for Middle Tennessee Business`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Custom Software for Middle Tennessee Business`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plexMono.variable} ${plexSans.variable}`}>
      <body className="scanlines min-h-dvh antialiased">
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-phos focus:px-4 focus:py-3 focus:text-void"
        >
          Skip to content
        </a>

        <StatusBar />
        <SiteHeader />

        <main id="main" className="relative z-1 pt-19 sm:pt-23">
          {children}
        </main>

        <SiteFooter />

        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
