# EN2 Tech

Marketing site for [EN2 Tech LLC](https://en2.tech) — custom software and
technology consulting in Murfreesboro, Tennessee.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · MDX

**Design language: midnight.** True black ground, bright saturated
photography, one electric-cyan accent, with a slow animated aurora field
behind everything. The rules are documented in `src/app/globals.css` — read
them before adding a component.

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
`src/app/globals.css`: the ground is black and surfaces lift with *light*
(`.panel` + `.panel-lit`), never with heavy grey borders; photography stays
bright and saturated via `.photo-bright` and is never muted into the
background; one accent (electric cyan) on UI, with violet appearing only
inside the animated field; and radii stay soft. `.label` is the uppercase
eyebrow/caption utility, `.measure` holds body copy near 64 characters.

**Two typefaces.** Sora carries the display voice — a geometric grotesk that
holds up at very large sizes on black without the optical bloat a softer face
shows. Manrope handles running text; its open apertures stay legible as
light-on-dark, where tighter faces close up.

**The background is a canvas, not CSS.** `AnimatedField` composites four large
radial gradients on Lissajous paths with `globalCompositeOperation = "lighter"`,
so overlaps brighten into cyan-white like real light rather than muddying. It
caps DPR at 1.5, throttles to 30fps, and stops entirely when the tab is hidden.
Under `prefers-reduced-motion` it paints a single static frame and never starts
the loop — the composition survives, the movement does not.

**Numbering means something.** The process steps and the era log are numbered
because they genuinely run in order. Nothing else is.

**Fonts are self-hosted.** `next/font` fetches both at build time. There is no
request to Google at runtime — the page makes zero external requests.

**One validation schema.** `src/lib/contact-schema.ts` is imported by both the
form and the API route. Client-side validation is convenience; the server
re-validates the same rules because client checks are never a control.

**Rate limiting is in-process.** A `Map` with a fixed window, which is correct
and free for one instance. If the site ever runs behind a load balancer, swap
the Map in `src/lib/rate-limit.ts` for Redis — the `rateLimit()` signature is
designed not to change.

**Motion is opt-out aware.** `Reveal` does a rise and fade. It renders content
visible on the server and never applies the hidden state when
`prefers-reduced-motion` is set, so content cannot be stranded at `opacity: 0`.

**Images are static imports.** Files in `src/images/` are imported directly, so
Next derives intrinsic dimensions and generates the blur placeholder at build
time — no CLS and no hand-maintained width/height pairs. `sharp` is a
dependency because production image optimization requires it in the standalone
Docker build.

**Security headers ship with the app**, not the proxy — see the CSP in
`next.config.ts`. Caddy only strips its own `Server` banner.

---

## Before launch

- [ ] **Verify every figure in `src/content/work.ts`** — the case studies are
      anonymized scaffolds built from claims the old site already made publicly.
      No client names or quotes were invented, but the metrics need confirming.
- [ ] **Decide on the photography** — see [IMAGE-CREDITS.md](./IMAGE-CREDITS.md).
      The current images are licensed stock of people who don't work here, which
      cuts against the "we're real and local" pitch.
- [ ] Add `public/images/og-image.jpg` (1200×630) and favicons
- [ ] Confirm `site.email` in `src/lib/site.ts` is the right inbox
- [ ] Set the real postal code / coordinates in `site.ts` if the LocalBusiness
      listing should be precise
- [ ] Have counsel review `/privacy` and `/terms`

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) — Docker + Caddy on AWS Lightsail.
