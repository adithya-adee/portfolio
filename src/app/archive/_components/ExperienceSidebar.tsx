"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/components/motion";
import { cn } from "@/lib/utils";
import { DateCapsule } from "./DateCapsule";
import { isCurrentRole, isPrimaryRole, type ExperienceItem } from "./timeline-data";

interface ExperienceSidebarProps {
  entry: ExperienceItem | null;
  onClose: () => void;
}

/**
 * Slide-in sidebar that shows full experience details. Driven by Radix Dialog
 * for focus trap, Esc, ARIA, and body-scroll lock; animation via framer-motion.
 *
 * Three flavors of animation orchestrated together:
 *   1. Shell entrance: slide from right (desktop) or bottom (mobile sheet)
 *   2. Shell exit: reverse direction
 *   3. Content cross-fade when the user clicks a *different* entry while the
 *      sidebar is already open. AnimatePresence mode="wait" keyed by entry.slug
 *      runs the old content's exit first, then the new content's entrance,
 *      while the shell stays mounted — total ~440ms morph.
 */
export function ExperienceSidebar({ entry, onClose }: ExperienceSidebarProps) {
  const reduced = useReducedMotionSafe();
  const isDesktop = useIsDesktopUp();
  const open = entry !== null;

  // Slide axis depends on layout: right panel on desktop, bottom sheet on mobile.
  const closedTransform = isDesktop ? { x: "100%" } : { y: "100%" };
  const openTransform = isDesktop ? { x: 0 } : { y: 0 };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && entry ? (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
                className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            {/* Sidebar shell */}
            <Dialog.Content asChild forceMount>
              <motion.aside
                initial={reduced ? openTransform : closedTransform}
                animate={openTransform}
                exit={closedTransform}
                transition={{
                  duration: reduced ? 0 : 0.34,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "fixed z-50 flex flex-col border-soft bg-surface-1 shadow-elev-3 backdrop-blur-md",
                  // Mobile bottom sheet
                  "bottom-0 left-0 right-0 max-h-[90vh] rounded-t-2xl border-t",
                  // Desktop right panel — wider on bigger viewports so the
                  // rail no longer feels constrained on 1920px+ screens.
                  "md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-screen md:w-full md:max-w-[70vw] md:rounded-t-none md:border-l md:border-t-0 lg:max-w-[62vw] xl:max-w-[880px] 2xl:max-w-[960px]"
                )}
              >
                {/* A11y — required by Radix even if not visible */}
                <Dialog.Title className="sr-only">{entry.company}</Dialog.Title>
                <Dialog.Description className="sr-only">
                  {entry.position} at {entry.company}, {entry.startDate} — {entry.endDate}
                </Dialog.Description>

                {/* Mobile drag handle (visual only — for v1 we don't wire drag-to-close) */}
                <div className="flex justify-center pt-3 md:hidden" aria-hidden="true">
                  <span className="h-1 w-10 rounded-full bg-strong" />
                </div>

                {/* Close button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close sidebar"
                  className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md border border-soft bg-surface-2 text-secondary transition-colors duration-base ease-out-soft hover:border-strong hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
                >
                  <X aria-hidden="true" size={16} />
                </button>

                {/* Content cross-fade — keyed by slug so clicking a different
                    entry while the sidebar is open swaps content smoothly
                    without closing+reopening the shell.
                    `data-lenis-prevent` opts this element out of the global
                    Lenis smooth-scroll so wheel events scroll the sidebar
                    natively instead of being captured by the page. */}
                <div
                  data-lenis-prevent
                  className="relative flex-1 overflow-y-auto overscroll-contain px-6 pb-10 pt-12 md:px-8 md:pt-14"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={entry.slug}
                      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                      transition={{
                        duration: reduced ? 0 : 0.22,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="space-y-7"
                    >
                      <SidebarBody entry={entry} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}

/* ─── Internal content ────────────────────────────────────────────── */

function SidebarBody({ entry }: { entry: ExperienceItem }) {
  const isCurrent = isCurrentRole(entry);
  const isPrimary = isPrimaryRole(entry);

  return (
    <>
      {/* Header — dates, company, role, badges */}
      <header className="space-y-4">
        <DateCapsule
          startDate={entry.startDate}
          endDate={entry.endDate}
          isCurrent={isCurrent}
        />

        <div className="space-y-1">
          {entry.url ? (
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/title inline-flex items-baseline gap-2 transition-opacity hover:opacity-80"
            >
              <h2 className="font-serif text-h1 font-normal italic tracking-tight text-primary">
                {entry.company}
              </h2>
              <ExternalLink
                aria-hidden="true"
                className="h-4 w-4 text-tertiary transition-transform duration-base group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5"
              />
            </a>
          ) : (
            <h2 className="font-serif text-h1 font-normal italic tracking-tight text-primary">
              {entry.company}
            </h2>
          )}
          <p className="text-h3 font-medium tracking-wide text-secondary">{entry.position}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-surface-2 px-2.5 py-0.5 text-label font-medium text-secondary ring-1 ring-inset ring-soft">
            {entry.location}
          </span>
          {!isPrimary ? (
            <span className="inline-flex items-center rounded-full bg-surface-2 px-2.5 py-0.5 font-mono text-label font-semibold uppercase tracking-wider text-tertiary ring-1 ring-inset ring-soft">
              {entry.type}
            </span>
          ) : null}
          {isCurrent ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-label font-medium text-accent ring-1 ring-inset ring-accent/30">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Active
            </span>
          ) : null}
        </div>
      </header>

      <div className="h-px bg-accent/30" />

      {/* Description */}
      {entry.description ? (
        <p className="text-body-2 leading-relaxed text-primary/80">{entry.description}</p>
      ) : null}

      {/* Highlights */}
      {entry.highlights?.length ? (
        <section className="space-y-3">
          <h3 className="font-mono text-label font-semibold uppercase tracking-[0.2em] text-tertiary">
            Highlights
          </h3>
          <ul className="space-y-2.5">
            {entry.highlights.map((highlight, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 shrink-0 text-accent/70">
                  ▸
                </span>
                <span className="text-body-2 leading-relaxed text-primary/85">{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Skills */}
      {entry.skills?.length ? (
        <section className="space-y-3">
          <h3 className="font-mono text-label font-semibold uppercase tracking-[0.2em] text-tertiary">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {entry.skills.map((skill, i) => (
              <span
                key={i}
                className="rounded-md bg-surface-2 px-3 py-1 text-label tracking-wide text-primary/80 ring-1 ring-inset ring-soft"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

/* ─── Hook ────────────────────────────────────────────────────────── */

/**
 * Tracks the (min-width: 768px) media query so the sidebar knows which axis
 * to slide on. Defaults to false during SSR — fine because the sidebar is
 * never open on first render (selectedEntry starts null).
 */
function useIsDesktopUp(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const listener = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return isDesktop;
}
