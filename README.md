# glitchymoon · portfolio

Personal portfolio of **Adithya Anand** — Backend & Blockchain Engineer working on privacy infrastructure, zero-knowledge proofs, Rust (Axum), and Solana.

**Live:** [glitchymoon.dev](https://glitchymoon.dev)

## What this is

A single-page Next.js 15 portfolio rendered as a film-noir editorial site. The home page composes everything: hero, vertical-rail experience timeline, project dossiers, tech stack, recent writing, and contact. Subroutes carry the depth — `/archive`, `/blog`, `/uses`.

Features:

- **Letterbox Noir** (dark) and **Editorial Print** (light) palettes via `next-themes`, OS-aware with manual override
- **Project dossier overlays** — Radix Dialog with mobile bottom-sheet + drag-to-close + desktop right-rail
- **Experience rail timeline** with animated scaleY draw-in and primary/secondary dot styles
- **Snake-curve alternating timeline** on `/archive` for the full work history
- **Command palette (⌘K)** with discoverability chip, lazy-loaded on first invocation
- **Cross-page view transitions** via `next-view-transitions`
- **Scroll progress rail** + section frame-marker dividers
- **Konami-code easter egg** (`↑↑↓↓←→←→BA`) reveals `/uses`
- **Conditional CV chip** that renders only when `public/resume.pdf` exists at build time
- **Custom 404**, dynamic per-route OG images, server-backed visit counter

## Stack

Next.js 15.5 · React 19 · TypeScript 5.9 (strict) · Tailwind 3.4 · framer-motion 12 · next-themes · next-view-transitions · Lenis · cmdk · Radix Dialog · sonner · Upstash Redis REST · pnpm 9

Fonts: JetBrains Mono · Inter · Instrument Serif (via `next/font/google`).

## Run locally

```bash
pnpm install
pnpm dev
```

Requires Node ≥18 and pnpm. Opens at [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
pnpm build           # production build
pnpm start           # serve the production build
pnpm lint            # next lint (eslint-config-next)
pnpm format          # prettier --write .
pnpm format:check    # CI-style check
```

## Editing content

All site content is JSON, no CMS:

- `src/asset/projects.json` — projects + per-project case studies
- `src/asset/experience.json` — roles + highlights + skills + location + dates. Each entry takes an optional `short_summary` (the tight technical one-liner rendered on the home rail) and a `display: false` flag to hide from the home view (still shown on `/archive`).
- `src/asset/blog.json` — blog post metadata pointing at dev.to articles
- `src/app/uses/page.tsx` — daily-driver stack (edit the `SECTIONS` array)

## Resume

Drop a `public/resume.pdf` at the repo root → `pnpm build` picks it up via `next.config.ts` and the `[↓ CV]` chip appears alongside the theme toggle and ⌘K. Remove the file and the chip disappears.

## Environment

`.env` carries Upstash KV REST credentials for the visit counter (`KV_REST_API_URL`, `KV_REST_API_TOKEN`). Treat them as production secrets and rotate before publishing widely.

## SEO

Metadata, OG, Twitter, JSON-LD `@graph` (Person · WebSite · ProfilePage · ItemList · BreadcrumbList), sitemap, and robots are all wired and aligned on `https://glitchymoon.dev`. Per-route OG images exist for `/`, `/blog`, `/archive`, and `/uses`. See `src/components/SEO.tsx`, `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, and each route's `opengraph-image.tsx`.

Google Search Console verification is handled via `public/googlef8d9672eb822ee1c.html` (file-method).

## Security

`next.config.ts` ships baseline security headers across every route — `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a `Permissions-Policy` locking camera/microphone/geolocation/FLoC. Strict CSP is intentionally deferred until inline JSON-LD scripts are hashed.

`/api/visits` enforces a same-origin POST guard (allows `glitchymoon.dev`, `www.glitchymoon.dev`, `*.vercel.app`, localhost) plus a per-IP rate limit (5 POSTs / minute) backed by Upstash, with a `Retry-After` header on 429.

## License

© 2026 Adithya Anand. Code is reference, content is mine.
