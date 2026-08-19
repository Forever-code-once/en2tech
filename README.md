# EN2 Tech

Marketing site for [EN2 Tech LLC](https://en2.tech) — custom software and
technology consulting in Murfreesboro, Tennessee.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · MDX

**Design language: terminal.** Monospace-forward, grid-ruled, zero border-radius,
a single phosphor accent on deep charcoal. The rules are documented in
`src/app/globals.css` — read them before adding a component.

---

## Getting started

```bash
npm install
npm run dev            # http://localhost:3000
```

No environment variables are needed for local development. The contact form
works immediately — submissions are logged to the terminal instead of emailed,
and the UI says so rather than pretending mail went out.

```bash
npm run build          # production build (type-checks; fails on any error)
npm run start          # serve the production build
npm run lint
```

---

## Structure

```
src/
├── app/
│   ├── layout.tsx              root shell — fonts, metadata, org JSON-LD
│   ├── page.tsx                home
│   ├── services/               the three service offerings
│   ├── work/                   case study index + [slug] detail
│   ├── about/                  the BBS-to-AI story
│   ├── notes/                  MDX writing, index + [slug]
│   ├── contact/                form page
│   ├── privacy/  terms/        legal
│   ├── api/contact/route.ts    form handler — validate, rate limit, send
│   ├── sitemap.ts              generated from real content
│   ├── robots.ts
│   └── globals.css             design tokens + terminal utilities
├── components/
│   ├── ui/                     container, section, button, reveal
│   └── …                       status bar, header, footer, rows, form
├── content/
│   ├── services.ts             ← edit services here
│   ├── work.ts                 ← edit case studies here
│   ├── timeline.ts             ← edit the era narrative here
│   └── blog/*.mdx              ← add a file to publish a note
└── lib/
    ├── site.ts                 ← name, email, location, nav
    ├── schema.ts               JSON-LD builders
    ├── notes.ts                MDX loading
    ├── contact-schema.ts       one Zod schema, used by client AND server
    ├── rate-limit.ts
    └── email.ts
```

---

## Editing content

Nothing requires touching a component.

**Company details, email, nav** → `src/lib/site.ts`
Setting `atCapacity: false` removes the "Currently booked full" badge and
switches the contact page's lede to an open-for-work message.

**Services** → `src/content/services.ts`

**Case studies** → `src/content/work.ts`
Set `draft: true` to hide one from the site and the sitemap.

**Notes** → drop an `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Post title"
description: "One-line summary for the index and social cards."
published: "2026-08-18"
tags: ["integration"]
draft: false
---

Body in Markdown.
```

Drafts render in development and are excluded from production builds,
the sitemap, and search indexing.

---

## Notes on the build

**The design system has rules.** Four, enforced by convention in
`src/app/globals.css`: no rounded corners anywhere (every radius token is
`0px`); one accent colour, with emphasis coming from rules and space; hover
inverts foreground/background rather than tinting; every panel is bounded by a
visible 1px rule. The `.label` utility — uppercase mono, `0.18em` tracking — is
the workhorse and should be reached for before any custom type styling.

**Two typefaces, one family.** IBM Plex Mono carries all display, UI and label
text. IBM Plex Sans handles long-form reading only, via the `.prose-body`
class — mono at paragraph length is punishing. They share a skeleton, so the
pairing reads as one voice.

**Fonts are self-hosted.** `next/font` fetches both at build time. There is no
request to Google at runtime — the page makes zero external requests.

**One validation schema.** `src/lib/contact-schema.ts` is imported by both the
form and the API route. Client-side validation is convenience; the server
re-validates the same rules because client checks are never a control.

**Rate limiting is in-process.** A `Map` with a fixed window, which is correct
and free for one instance. If the site ever runs behind a load balancer, swap
the Map in `src/lib/rate-limit.ts` for Redis — the `rateLimit()` signature is
designed not to change.

**Motion is opt-out aware.** `Reveal` wipes content in left-to-right with
`clip-path`, like text printing to a terminal. It renders content visible on the
server and never applies the hidden state when `prefers-reduced-motion` is set,
so content cannot be stranded at `opacity: 0`. The blinking `.caret` stops under
the same query.

**Security headers ship with the app**, not the proxy — see the CSP in
`next.config.ts`. Caddy only strips its own `Server` banner.

---

## Before launch

- [ ] **Verify every figure in `src/content/work.ts`** — the case studies are
      anonymized scaffolds built from claims the old site already made publicly.
      No client names or quotes were invented, but the metrics need confirming.
- [ ] Add `public/images/og-image.jpg` (1200×630) and favicons
- [ ] Confirm `site.email` in `src/lib/site.ts` is the right inbox
- [ ] Set the real postal code / coordinates in `site.ts` if the LocalBusiness
      listing should be precise
- [ ] Have counsel review `/privacy` and `/terms`

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) — Docker + Caddy on AWS Lightsail.
