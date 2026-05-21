# CLAUDE.md

Guidance for Claude Code when working in this repo. Keep this file short — link out, don't duplicate.

## What this is

Adithya Anand's personal portfolio (V5). Single-page Next.js 15 App Router site
deployed on Vercel. Showcases bio, experience, projects, tech stack, blogs, and
contact links. Has a server-backed visit counter (Vercel KV / Upstash Redis REST).

Current focus reflected in the copy: backend / zero-knowledge engineering at
**Umbra Privacy** (Private Bridge for web apps, ZKP Phase 2 trusted-setup ceremony)
with Rust (Axum), Circom, Solana, and AWS.

Canonical URL: **https://glitchymoon.vercel.app** (the `adithya-anand-portfolio.vercel.app`
alias still resolves but is not canonical — see [[project-canonical-url]] in memory).

## Stack

- **Next.js** 15.5.9 (App Router, Turbopack dev), **React** 19, **TypeScript** 5.9 (strict)
- **Tailwind** 3.4 + **shadcn/ui** (`new-york` style, gray base, CSS variables) — `components.json`
- **framer-motion** for project-card transitions, **lucide-react** + **react-icons** for icons
- **sonner** for toasts, **@vercel/analytics** + **@vercel/speed-insights**
- Fonts: `JetBrains_Mono` + `Inter` via `next/font/google` (CSS vars `--font-jetbrains-mono`, `--font-inter`)
- Package manager: **pnpm 9.15.4** (Node ≥18). Always use `pnpm`, not npm/yarn.

## Commands

```bash
pnpm dev              # next dev --turbopack
pnpm build            # next build
pnpm start            # next start (after build)
pnpm lint             # next lint (eslint-config-next)
pnpm format           # prettier --write .
pnpm format:check     # CI-style check
```

## Directory map

```
src/
  app/
    layout.tsx        # root layout, metadata, fonts, dark mode forced, background FX
    page.tsx          # home — composes all section components ("use client")
    loading.tsx       # global loading spinner
    not-found.tsx     # 404 with terminal/glitch effect
    sitemap.ts        # static sitemap (home + /blog)
    robots.ts         # disallow /api/*
    globals.css       # design tokens (CSS vars), typography, animations
    blog/page.tsx     # server-rendered blog index from blog.json
    archive/
      layout.tsx      # server layout that owns the /archive metadata
      page.tsx        # client-rendered full work experience
    api/visits/route.ts  # GET/POST visit counter, hits KV REST API
  components/
    SEO.tsx           # JSON-LD structured data (Person/Website/ItemList/Breadcrumb)
    VisitorCounter.tsx# client component; uses sessionStorage to dedupe per-tab
    ui/               # shadcn primitives (button, card, sonner)
    sections/         # one component per home-page section
      Hero.tsx                # name, time clock (Asia/Kolkata), bio, highlights
      ExperienceCollapsed.tsx # USED on home — accordion experience
      Experience.tsx          # NOT mounted anywhere; older variant — see "Gotchas"
      Projects.tsx            # filter (full-stack/web3/open-source) + accordion + YouTube embed
      TechStack.tsx           # grouped icon badges
      Blogs.tsx               # highlighted blogs from blog.json
      Connect.tsx             # email/socials; `Y` keypress yanks email to clipboard
  asset/              # content lives here as JSON — edit these to update the site
    projects.json
    experience.json
    blog.json
  lib/utils.ts        # `cn()` (clsx + tailwind-merge)
public/               # profile.png, certifications/
```

Path alias: `@/*` → `src/*`.

## Content model — edit JSON, not components

All site content is data-driven from `src/asset/*.json`. To add a project, blog post,
or experience entry, edit the JSON files. Shape lives inline in the consumer
components (e.g. `Project` interface in `sections/Projects.tsx`).

- `projects.json` — `category` must be one of `"full-stack" | "web3" | "open-source"`
  (used by the filter chips). Optional `video_url` accepts a YouTube watch URL; it's
  converted to an embed URL on the fly.
- `experience.json` — `display: false` hides an entry from `ExperienceCollapsed`
  but `/archive` shows all entries regardless.
- `blog.json` — `highlight: true` surfaces it on the home page `Blogs` section;
  `/blog` lists everything. Sitemap uses `blogs[0].date` as `lastModified` for `/blog`.

## Conventions

- **Dark mode is forced.** `<html className="dark">` in `layout.tsx`, `color-scheme: dark` in `globals.css`. Don't add a theme toggle without removing those.
- **Section components are all `"use client"`** because most use `useState`/`useEffect` for accordions, timers, resize listeners. Blog index (`app/blog/page.tsx`) is the only data-driven page that stays server-rendered — keep it that way.
- **Design tokens** are CSS variables in `globals.css` (`--spacing-*`, `--text-*`, color palette). Prefer them over hardcoded values in new styles.
- **Card accent** — `.card-accent` class adds a hover-revealing blue left border. Used on Projects, Experience accordions, Blogs.
- **External links** always get `target="_blank" rel="noopener noreferrer"`. Inside accordion buttons, also `onClick={e => e.stopPropagation()}` so the link doesn't toggle the accordion.
- **`suppressHydrationWarning`** is intentionally used on date/time/timezone text in `Hero.tsx` and `page.tsx` footer because those are computed client-side.
- Prettier with `prettier-plugin-tailwindcss` sorts classes — let it.

## Environment

`.env` is committed (currently contains only `KV_REST_API_URL` / `KV_REST_API_TOKEN`
for the Upstash/Vercel KV REST endpoint). Treat these as secret in production —
rotate before publishing the repo publicly. Used only by `src/app/api/visits/route.ts`.

## Image domains

`next.config.ts` whitelists `www.ieeesoc.xyz`, `yhills.com`, `youtube.com`,
`img.youtube.com` for `next/image`. Add new external hosts there before referencing
them.

## SEO surface

Every SEO surface points at **`https://glitchymoon.vercel.app`** — keep them aligned.

- `layout.tsx` — Next Metadata API (title template, description, OG, Twitter, robots, `metadataBase`). The site URL is defined once at the top as `SITE_URL`.
- `components/SEO.tsx` — JSON-LD `@graph` (`Person`, `WebSite`, `ProfilePage`, `ItemList`, `BreadcrumbList`). Base URL declared once at the top of the file. `worksFor` is Umbra Privacy (current); `hasOccupation` lists both Umbra and the past ODPay role. `ItemList` features the strongest six projects — change those when shipping anything notable.
- `app/sitemap.ts` and `app/robots.ts` — Next file conventions. Sitemap covers `/`, `/blog`, `/archive`.
- `app/blog/page.tsx` and `app/archive/layout.tsx` — each route exports its own metadata (`title`, `description`, `alternates.canonical`, OG).
- Twitter/X handle is `@glitchy_moon_` (set on both `creator` and `site`).
- OG/Twitter image is `/profile.png` (no `.jpg` exists). Keep the asset at 1200×630-ish or add a dedicated OG image.

## Gotchas

- `sections/Experience.tsx` is **unused** — `page.tsx` mounts `ExperienceCollapsed` instead. The unused file still references `/experience` (no such route — `/archive` is the actual route) and imports a non-existent `HighlighterIcon` from lucide-react. Survives only because nothing imports it. Either delete or wire it back.
- `VisitorCounter` dedupes per-tab via `sessionStorage`, not per-IP. Refreshing in a new tab counts again. That's intentional/lightweight; don't "fix" it without checking. The `/api/visits` POST is also currently unrate-limited — see `AUDIT.md`.
- Smooth scroll + anchor section IDs (`#about`, `#experience`, `#projects`, `#stack`, `#blogs`, `#contact`) are used by the in-page nav. Preserve those IDs when renaming sections.
- `prefers-reduced-motion` is honored in `globals.css` — new animations should respect it (don't bypass with `!important`). The framer-motion calls in `Projects.tsx` are not yet gated; use `useReducedMotion` if you add more.
- `/archive` is a client component for the accordion UX; its metadata lives in the sibling `app/archive/layout.tsx` server file. Don't try to add `export const metadata` to the page itself.

## What not to do

- Don't introduce a CMS or DB for content; JSON files are the source of truth.
- Don't add per-blog routes (`/blog/[slug]`) without also updating `sitemap.ts`.
- Don't add server components inside `sections/` — they're treated as client by convention; mixing breaks layout assumptions.
- Don't bypass `next/image` with raw `<img>` for external hosts; add the host to `next.config.ts` instead.

## Audit

A periodic audit lives in `AUDIT.md` (security, perf, a11y, SEO, code-quality
findings with file:line refs and severity tags). Run the `/review` skill or regenerate
the audit when making non-trivial changes.
