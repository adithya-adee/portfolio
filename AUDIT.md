# Portfolio Audit

Scope: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind + shadcn at `/home/glitchy_moon/glitchy_moon/github_repo/portfolio`.

Severity legend: 🔴 critical · 🟡 medium · 🟢 nice-to-have.

---

## 1. Security

- 🟢 **.env is NOT committed.** `.gitignore:34` matches `.env*` and `git status --ignored` confirms `.env` is ignored. No `.env` blob exists in git history.
- 🔴 **Live Upstash Redis credentials sit in `.env` (lines 1–5).** `KV_REST_API_TOKEN` is a full read/write token; `KV_URL` includes the password. Even though git-ignored, the file leaks via shell history, backups, screen-shares. **Fix:** rotate the token in Upstash now, keep secrets only in Vercel project env, and commit an `.env.example` with placeholders.
- 🟡 **`src/app/api/visits/route.ts:47–60` has no rate limit or origin check.** Anyone can `curl -X POST /api/visits` in a loop to inflate the counter and burn Upstash quota. **Fix:** add `@upstash/ratelimit` (per-IP sliding window) and reject non-same-origin POSTs via `Origin`/`Referer`.
- 🟡 **Path-style Redis REST call is fragile** (`route.ts:17`): `${KV_REST_API_URL}/${command.join("/")}`. Safe today (literal args) but switch to the JSON-body form before any user-derived segment is ever added.
- 🟢 **No XSS surface.** Only `dangerouslySetInnerHTML` is `SEO.tsx:219`, fed by a hard-coded object.
- 🟢 **External `<a>`** uses `rel="noopener noreferrer"` consistently (Blogs, Projects, Connect, Archive).
- 🟡 **YouTube iframe `allow` is too broad** (`Projects.tsx:246`): drop `clipboard-write`, `accelerometer`, `gyroscope`.
- 🟢 **Dependencies look current** (Next 15.5.9, React 19, framer-motion 12). Run `pnpm audit` periodically.

## 2. Performance

- 🔴 **`src/app/page.tsx:1` is `"use client"` for the whole homepage.** Forces every section through a client boundary unnecessarily. **Fix:** remove the directive; let leaves with state keep their own. Move the footer clock (`page.tsx:53–61`) into a small client island.
- 🟡 **`TechStack.tsx:1` is `"use client"` with no state/effects.** Drop it.
- 🟡 **`Blogs.tsx:1` is `"use client"` with no state/effects.** Drop it.
- 🟡 **`framer-motion` (~40 KB gz) is used only by `Projects.tsx:114–122`** for a fade/slide. Replace with CSS transitions, or `dynamic(... { ssr: false })`.
- 🟡 **`Hero.tsx:17–33` re-renders the hero every second** because the clock state lives at section root. Extract a `<Clock>` component so the rest stays static.
- 🟡 **`isMobile` polling duplicated** in `Projects.tsx:60–65` and `ExperienceCollapsed.tsx:29–34`. Extract `useIsMobile`, or drop the JS branch entirely and rely on CSS.
- 🟢 **`next/image`** with explicit width/height (`Hero.tsx:43`). Good.
- 🟡 **Hero image lacks `priority`** (`Hero.tsx:43`). It's the LCP candidate — add `priority`.
- 🟢 **YouTube iframe uses `loading="lazy"`** (`Projects.tsx:248`).
- 🟢 **Fonts via `next/font/google`** with CSS variables (`layout.tsx:9–17`).

## 3. Accessibility

- 🟡 **Accordions collapse via `max-h` only** — content stays in the DOM and is tab-reachable (`Projects.tsx:187–197`, `ExperienceCollapsed.tsx:98–108`, `archive/page.tsx:103–107`). Add `aria-expanded`, `aria-controls`, and `hidden`/`inert` on the collapsed panel.
- 🟡 **Chevrons need `aria-hidden="true"`** (`Projects.tsx:182`, `ExperienceCollapsed.tsx:93`, `archive/page.tsx:98`); give each toggle button a real `aria-label`.
- 🟡 **Global `Y` key hijack** (`Connect.tsx:54–71`) skips inputs but not `contenteditable`. Consider `Ctrl/Cmd+Y` or scope it to the section via focus.
- 🟡 **Color contrast suspects** — `text-gray-400`/`text-gray-500` on `bg-neutral-900/50` (e.g. `Projects.tsx:147`, `Blogs.tsx:65`, `archive/page.tsx:44`) likely sit ~3:1 against the rendered background and fail WCAG AA for body copy.
- 🟢 **`<html lang="en">`** in `layout.tsx:112`. Good.
- 🟡 **No `<main>` landmark.** `page.tsx:14` wraps everything in a `<div>`. Wrap children in `<main>`.
- 🟡 **`prefers-reduced-motion`** is honored in `globals.css:320–327`, but framer-motion in `Projects.tsx` isn't gated. Use `useReducedMotion` from framer-motion.
- 🟡 **Custom toggle buttons lack visible focus rings** in `Projects.tsx:89` and `ExperienceCollapsed.tsx:51`. Add `focus-visible:ring-2 focus-visible:ring-purple-500/60 focus-visible:outline-none`.
- 🟡 **`window.history.back()` in `not-found.tsx:83`** breaks if 404 is the entry page. Fall back to `/`.

## 4. SEO

- 🔴 **Base URL mismatch.** `SEO.tsx:6` = `https://adithya-anand-portfolio.vercel.app`; `layout.tsx:68`, `sitemap.ts:4`, `robots.ts:12–13` = `https://glitchymoon.vercel.app`. JSON-LD `@id`/`url`/`sameAs` and the duplicate `<link rel="canonical">` all point at the wrong host. **Fix:** unify on `glitchymoon.vercel.app` via a shared constant.
- 🔴 **`/profile.jpg` does not exist.** Referenced by `layout.tsx:82,96` (OG/Twitter) and `SEO.tsx:18` (Person `image`). `public/` only has `profile.png`. Link previews 404. **Fix:** either rename or update all three references; recommended: add a dedicated `og-image.jpg` at 1200×630.
- 🟡 **Duplicate canonical.** `layout.tsx:69–71` and `SEO.tsx:227` both emit one. Drop the SEO.tsx one.
- 🟡 **`sitemap.ts` misses `/archive`** (the route exists at `src/app/archive/page.tsx`). External dev.to blog links shouldn't be added.
- 🟡 **`Experience.tsx:67` links to `/experience`** which doesn't exist (only `/archive` exists). Soft-404 risk if ever reached.
- 🟡 **`robots.ts:5–10`** could also disallow `/_next/`, `/_vercel/`. Minor.
- 🟢 **OG/Twitter card metadata is otherwise rich** (`layout.tsx:72–97`).
- 🟢 **JSON-LD `@graph`** (Person, WebSite, ItemList, BreadcrumbList) is well-structured.
- 🟡 **`metadataBase` has trailing slash** (`layout.tsx:68`). Cosmetic; normalize.

## 5. Code Quality

- 🔴 **Dead file: `src/components/sections/Experience.tsx`.** No grep hit for any importer. It also imports `HighlighterIcon` from `lucide-react` (`Experience.tsx:6`) — the real export is `Highlighter`. The build only survives because the file is unreachable. Delete it, or repurpose into a real `/experience` route.
- 🟡 **Duplicated resize-listener `useEffect`** in `Projects.tsx:60–65` and `ExperienceCollapsed.tsx:29–34`. Extract `useIsMobile()`.
- 🟡 **Three near-identical accordion implementations** (`Projects.tsx`, `ExperienceCollapsed.tsx`, `archive/page.tsx`). Extract a shared `<Accordion>` (shadcn already configured in `components.json`).
- 🟡 **`Blog` and `ExperienceItem` interfaces duplicated** in `sitemap.ts`, `blog/page.tsx`, `Blogs.tsx`, `archive/page.tsx`, `Experience.tsx`, `ExperienceCollapsed.tsx`. Move to `src/types/`.
- 🟡 **Site URL repeated in 5 places.** Centralize in `src/lib/constants.ts`.
- 🟢 **`tsconfig.json` has `"strict": true`.**
- 🟡 **`tsconfig.json` missing** `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` — would have caught `Experience.tsx` drift.
- 🟡 **`Projects.tsx:33`** swallows errors with `console.log(e)`. Use `console.warn` with context.
- 🟡 **No `app/error.tsx` error boundary.** Add a friendly fallback.
- 🟡 **`key={i}` index keys** in `Projects.tsx:202,225`, `ExperienceCollapsed.tsx:114,138`, `archive/page.tsx:113,138`. Acceptable (lists don't reorder) but prefer the value.
- 🟢 **`useMemo` used appropriately** (`Projects.tsx:70–73`).

## 6. Next.js Best Practices

- 🔴 **Root `page.tsx` is a client component** (as in §2). Refactor: keep `"use client"` only in `Projects.tsx`, `ExperienceCollapsed.tsx`, `VisitorCounter.tsx`, `Hero.tsx`, `Connect.tsx`, `not-found.tsx`, `archive/page.tsx`. Drop from `TechStack.tsx`, `Blogs.tsx`, `app/page.tsx`.
- 🟡 **No caching on `GET /api/visits`.** Add `Cache-Control: s-maxage=10, stale-while-revalidate=60` to avoid hitting Upstash on every load.
- 🟡 **JSON imports** (`projects.json`, `experience.json`, `blog.json`) are bundled. Fine today, but making the importing components server components (per above) keeps them out of the client bundle.
- 🟡 **`StructuredData` rendered inside `<head>`** (`layout.tsx:113–115`) is non-idiomatic for App Router. The metadata API or simply rendering JSON-LD in the body works equally well for crawlers.
- 🟢 **`outputFileTracingRoot` set** (`next.config.ts:5`).

## 7. Tailwind / UI

- 🟡 **Heavy class duplication.** `card-accent group overflow-hidden rounded-lg border border-neutral-700/40 bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600/60 hover:bg-neutral-800/50 hover:shadow-xl hover:shadow-purple-500/10` appears verbatim in `Projects.tsx:121`, `ExperienceCollapsed.tsx:48`, `archive/page.tsx:54`. Extract to a `@layer components { .surface-card { ... } }` in `globals.css`.
- 🟡 **`tailwind.config.js` doesn't expose the CSS-variable tokens** defined in `globals.css:13–58` (`--purple-500`, `--text-*`, `--spacing-*`). Bridge via `theme.extend.colors`/`spacing`.
- 🟡 **No `@layer components`** wrapper in `globals.css`. Custom classes (`section-title`, `card`, `card-accent`, `text-small`) sit at top level — fragile to purge if renamed.
- 🟡 **`darkMode: ["class"]`** declared (`tailwind.config.js:3`) but `<html className="dark">` is hard-coded (`layout.tsx:112`) with no toggle. Remove the config, or actually ship a theme switcher.
- 🟢 **`prettier-plugin-tailwindcss`** enabled.
- 🟡 **Arbitrary `min-w-[100px]`** (`TechStack.tsx:84`) signals a missing token.

## 8. Build / Tooling

- 🟡 **ESLint config is bare** (`.eslintrc.json`): only `next/core-web-vitals` + `next/typescript`. Add `react/jsx-no-target-blank`, `@typescript-eslint/no-unused-vars: error`, `react-hooks/exhaustive-deps: error`. Consider migrating to flat `eslint.config.mjs` (Next 15 supports it).
- 🟡 **`package.json` has no `typecheck` script.** Add `"typecheck": "tsc --noEmit"`.
- 🟢 **`packageManager` pinned to `pnpm@9.15.4`.**
- 🟢 **Prettier config consistent.**
- 🟡 **`next.config.ts:18` allows `youtube.com` as an image source** — dead config; YouTube OG images are served from `i.ytimg.com`/`img.youtube.com`. Remove.
- 🟢 **`next-env.d.ts`** correctly git-ignored (`.gitignore:41`).
- 🟢 **`TODO.md`** present at repo root — clean up before public release.

---

## Top fix order

1. Rotate the Upstash token; move secrets to Vercel env only and commit `.env.example` (Security 🔴).
2. Fix base URL mismatch (`SEO.tsx:6`) and missing `/profile.jpg` (SEO 🔴).
3. Drop `"use client"` from `app/page.tsx`, `TechStack.tsx`, `Blogs.tsx` (Perf 🔴/🟡).
4. Delete or wire up `Experience.tsx` (Code quality 🔴) and add `app/error.tsx`.
5. Add rate limit + Origin check to `/api/visits` (Security 🟡).
6. Add `aria-expanded`/`aria-controls` and visible focus rings to all accordion buttons (A11y 🟡).
7. Extract shared `<Accordion>`, `useIsMobile`, types, and a constants module (Code quality 🟡).
