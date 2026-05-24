# CLAUDE.md

Guidance for Claude Code when working in this repo. Keep this file short — link out, don't duplicate.

## What this is

Adithya Anand's personal portfolio (V6 — Letterbox Noir). Single-page Next.js 15 App Router site
deployed on Vercel. Showcases bio, experience, projects, tech stack, blogs, contact, and a
`/uses` daily-driver page. Has a server-backed visit counter (Upstash Redis REST).

Current focus reflected in the copy: backend / zero-knowledge engineering at **Umbra Privacy** with
Rust (Axum), Circom, Solana, and AWS — but Hero copy and metadata avoid product-specific names per
user preference.

Canonical URL: **https://glitchymoon.dev** (the `glitchymoon.vercel.app` deployment alias still resolves but is not canonical).

## Stack

- **Next.js** 15.5.9 (App Router, Turbopack dev), **React** 19, **TypeScript** 5.9 (strict)
- **Tailwind** 3.4 with semantic CSS-variable tokens (`--text-primary`, `--accent`, `--surface-*`,
  etc.). Tailwind `darkMode: ["selector", '[data-theme="dark"]']` matches the attribute
  `next-themes` writes.
- **next-themes** for the SSR-safe theme system; **next-view-transitions** for the cross-page
  fade. Both are wired in `src/app/layout.tsx`.
- **framer-motion** 12 for orchestrated motion (rail draw-in, dossier slide, drag-to-close,
  scroll progress, etc.); **Lenis** 1.3 for smooth scroll (desktop, fine-pointer, non-reduced
  motion only).
- **Radix UI** Dialog + Accordion primitives; **cmdk** for the command palette.
- **sonner** for toasts, **@vercel/analytics** + **@vercel/speed-insights**.
- Fonts: `JetBrains_Mono`, `Inter`, `Instrument_Serif` via `next/font/google` (CSS vars
  `--font-jetbrains-mono`, `--font-inter`, `--font-instrument-serif`).
- Package manager: **pnpm 9** (Node ≥18). Always use `pnpm`, never npm/yarn.

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
    layout.tsx        # root layout, metadata, fonts, theme provider, fixed chrome
    page.tsx          # home — composes all section components with SectionDivider markers
    loading.tsx       # global loading spinner
    not-found.tsx     # 404 with terminal/glitch effect
    sitemap.ts        # static sitemap (home + /blog + /archive + /uses)
    robots.ts         # disallow /api/*
    globals.css       # design tokens (CSS vars), typography, animations, view-transition gate
    opengraph-image.tsx          # default /og image
    blog/
      page.tsx        # server-rendered blog index with noir card layout
      opengraph-image.tsx        # per-route OG
    archive/
      layout.tsx      # server layout that owns the /archive metadata
      page.tsx        # full work timeline (client)
      _components/    # ArchiveTimeline + Snake/List timeline + ExperienceSidebar + DateCapsule
      opengraph-image.tsx
    uses/
      page.tsx        # daily-driver stack — server-rendered, edit the SECTIONS array
    api/visits/route.ts          # GET/POST visit counter, hits Upstash REST API
    _og/              # OG image utilities
  components/
    SEO.tsx           # JSON-LD structured data (Person/WebSite/ProfilePage/ItemList/Breadcrumb)
    VisitorCounter.tsx# client component; sessionStorage to dedupe per-tab
    CaseStudyOverlay.tsx         # Radix-Dialog "dossier" for project deep-dives (shared)
    ui/               # shadcn primitives (button, card, sonner)
    providers/
      ThemeProvider.tsx          # next-themes wrapper
    sections/         # one component per home-page section
      Hero.tsx                   # name, clock island, scramble text, highlights, inline chrome
      ExperienceCollapsed.tsx    # vertical rail timeline → opens ExperienceSidebar
      Projects.tsx               # filter + cards → opens CaseStudyOverlay (dossier)
      TechStack.tsx              # grouped icon badges
      Blogs.tsx                  # noir card list (server) pointing at external articles
      Connect.tsx                # email + socials; `Y` keypress yanks email
    motion/           # animation/chrome primitives, all re-exported from index.ts
      Reveal.tsx                 # whileInView fade-up wrapper
      TiltCard.tsx               # 3D tilt (fine-pointer only, bypassed on touch/reduced)
      MagneticButton.tsx         # cursor-pull on hover
      ScrambleText.tsx           # phrase scramble cycle
      AuroraBackdrop.tsx         # theme-aware spotlight + grid + grain + vignettes
      SmoothScroll.tsx           # Lenis mounting (desktop + non-reduced only)
      ThemeToggle.tsx            # editorial mono chip; placement="fixed" | "inline"
      CommandPalette.tsx         # cmdk + Radix Dialog
      CommandPaletteMount.tsx    # lazy-load on ⌘K / portfolio:open-palette event
      CommandPaletteHint.tsx     # ⌘K discoverability chip
      ResumeLink.tsx             # CV chip — renders only when public/resume.pdf exists
      ScrollProgressRail.tsx     # 2px left-edge fill driven by useScroll().scrollYProgress
      SectionDivider.tsx         # ── · ◯ · ── film-reel marker between sections
      SectionTitle.tsx           # chapter-numbered section heading
      SectionNavLink.tsx         # "→ my timeline / my articles" links to sub-routes
      KonamiCode.tsx             # ↑↑↓↓←→←→BA listener → router.push("/uses") + toast
      CountUp.tsx                # number tween for the visit counter
      SoftCursor.tsx             # NOT mounted; kept for revert
      useReducedMotionSafe.ts    # SSR-safe wrapper around framer-motion's useReducedMotion
  asset/              # content lives here as JSON — edit these to update the site
    projects.json
    experience.json
    blog.json
  styles/tokens.css   # CSS-variable design tokens for both themes
  lib/utils.ts        # `cn()` (clsx + tailwind-merge)
public/               # profile.png, profile.webp, certifications/, optionally resume.pdf
```

Path alias: `@/*` → `src/*`.

## Content model — edit JSON, not components

All site content is data-driven from `src/asset/*.json`. To add a project, blog post, or
experience entry, edit the JSON files. Shape lives inline in the consumer components.

- `projects.json` — `category` must be one of `"full-stack" | "web3" | "open-source"` (used by
  the filter chips). Optional `case_study` block (summary + problem[] + approach[] + result[] +
  metrics[]) drives the dossier overlay; falls back to `detailed_description` bullets when
  absent. `video_url` field exists in schema but is currently unused (no inline embeds).
- `experience.json` — `display: false` hides an entry from the home rail timeline but
  `/archive` shows everything. `type` controls dot style (Full-time/Internship → solid;
  Freelance/Open Source/Mentorship → hollow ring).
- `blog.json` — `highlight: true` surfaces it on the home page `Blogs` section; `/blog` lists
  everything. Sitemap uses `blogs[0].date` as `lastModified` for `/blog`.

## Conventions

- **Theme system is `data-theme="dark"|"light"` on `<html>`** via `next-themes`. Don't hardcode
  `className="dark"` and don't reach for `dark:` Tailwind variants without making sure the
  config selector matches the `data-theme` attribute (it does — `tailwind.config.js:3`).
- **Section components are `"use client"`** when they need state/effects (Hero clock island,
  Projects filter, Connect Y-yank, Experience rail). `Blogs.tsx` is now a **server component**.
- **Design tokens** are CSS variables in `src/styles/tokens.css`. Prefer them over hardcoded
  values in new styles.
- **External links** always get `target="_blank" rel="noopener noreferrer"`.
- **Internal navigation** uses `Link` from `next-view-transitions`, not `next/link` — so the
  cross-fade fires. Programmatic nav uses `useTransitionRouter`.
- **`suppressHydrationWarning`** is used on date/time/timezone text where it's computed
  client-side.
- Prettier with `prettier-plugin-tailwindcss` sorts classes — let it.

## Resume PDF — conditional chip

`next.config.ts` does a build-time `fs.existsSync('public/resume.pdf')` and sets
`NEXT_PUBLIC_HAS_RESUME`. The `ResumeLink` component reads the flag and renders the `[↓ CV]`
chip alongside the theme toggle and ⌘K only when the file is present. Drop the file in →
restart dev / rebuild → chip appears. Remove → chip disappears.

## Environment

`.env` carries Upstash KV REST credentials (`KV_REST_API_URL`, `KV_REST_API_TOKEN`). Used only
by `src/app/api/visits/route.ts`. Treat as production secrets — rotate before publishing the
repo widely.

## Image domains

`next.config.ts` whitelists `www.ieeesoc.xyz`, `yhills.com`, `youtube.com`, `img.youtube.com`
for `next/image`. Add new external hosts there before referencing them.

## SEO surface

Every SEO surface points at **`https://glitchymoon.dev`** — keep them aligned.

- `layout.tsx` — Next Metadata API (title template, description, OG, Twitter, robots,
  `metadataBase`). `SITE_URL` is defined once at the top.
- `components/SEO.tsx` — JSON-LD `@graph` (Person, WebSite, ProfilePage, ItemList,
  BreadcrumbList). `givenName`/`familyName` set; `sameAs` covers GitHub, LinkedIn, X, Peerlist,
  Reddit. `worksFor` is Umbra Privacy; `hasOccupation` lists Umbra + ODPay.
- `app/sitemap.ts` and `app/robots.ts` — covers `/`, `/blog`, `/archive`, `/uses`.
- `app/blog/page.tsx`, `app/archive/layout.tsx`, `app/uses/page.tsx` — each route exports its
  own metadata (`title`, `description`, `alternates.canonical`, OG).
- Twitter/X handle: `@glitchy_moon_` (set on `creator` and `site`).
- OG/Twitter image is generated dynamically per route via the `opengraph-image.tsx` file
  convention.

## Gotchas

- **`page.tsx` is still `"use client"`** for now (legacy — the section components themselves are
  client). Don't pass server-only data through it.
- **Programmatic nav must use `useTransitionRouter`** from `next-view-transitions`, not
  `useRouter` from `next/navigation`, or view transitions won't fire on those navigations.
  See `CommandPalette.tsx` for the canonical example.
- **`VisitorCounter` dedupes per-tab via `sessionStorage`**, not per-IP. Refreshing in a new tab
  counts again. Intentional, lightweight; don't "fix" without checking. POST is rate-limited
  (5/min/IP) and origin-checked.
- **Smooth scroll opt-out**: any element with `data-lenis-prevent` is skipped by Lenis. Both
  `ExperienceSidebar` and `CaseStudyOverlay` content containers use this so wheel/touch scrolls
  the panel, not the page underneath.
- **Mobile sheets drag to close** via `useDragControls`; the visible handle pill is the drag
  initiator (`dragListener={false}` on the shell so body scroll keeps working).
- **`section { scroll-margin-top }`** in `globals.css` exists for anchor-jumps. New sections
  should preserve the anchor IDs (`#about`, `#experience`, `#projects`, `#stack`, `#blogs`,
  `#contact`).
- **`prefers-reduced-motion` is honored** site-wide via `useReducedMotionSafe` + a CSS gate that
  also cancels `::view-transition-*` animations. Respect it in new motion code.
- **`/archive` is a client component** for the snake-timeline interactivity; its metadata lives
  in the sibling `app/archive/layout.tsx` server file.
- **Konami code** ignores keypresses while focus is on inputs / textareas / contenteditable so
  it doesn't trigger inside forms.

## What not to do

- Don't introduce a CMS or DB for content — JSON files are the source of truth.
- Don't add per-blog routes (`/blog/[slug]`) without also updating `sitemap.ts`.
- Don't bypass `next/image` with raw `<img>` for external hosts — add the host to
  `next.config.ts` instead.
- Don't reach for `dark:` Tailwind variants and `[data-theme="light"]:` selectors at the same
  time. Pick one (we use the `darkMode` selector, which maps `dark:` to
  `[data-theme="dark"]`).

## Audit

A periodic audit lives in `AUDIT.md` (security, perf, a11y, SEO, code-quality findings with
file:line refs and severity tags). Regenerate when making non-trivial changes.
