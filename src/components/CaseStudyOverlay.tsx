"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/components/motion";
import { cn } from "@/lib/utils";

const DRAG_CLOSE_OFFSET = 120;
const DRAG_CLOSE_VELOCITY = 500;

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudyData {
  summary: string;
  problem: string[];
  approach: string[];
  result: string[];
  metrics?: CaseStudyMetric[];
}

export interface CaseStudyProject {
  name: string;
  timeline: string;
  category: string;
  short_description?: string;
  detailed_description?: string[];
  live_url?: string;
  github_url?: string;
  skills?: string[];
  case_study?: CaseStudyData;
}

interface CaseStudyOverlayProps {
  project: CaseStudyProject | null;
  onClose: () => void;
}

/**
 * The dossier overlay — Radix Dialog wrapping a noir-styled case study panel.
 *
 * Mirrors ExperienceSidebar: desktop right rail (slightly wider for denser
 * content), mobile bottom sheet, content cross-fade keyed by project.name so
 * opening a different project from inside the overlay swaps smoothly without
 * close+reopen.
 */
export function CaseStudyOverlay({ project, onClose }: CaseStudyOverlayProps) {
  const reduced = useReducedMotionSafe();
  const isDesktop = useIsDesktopUp();
  const dragControls = useDragControls();
  const open = project !== null;

  const closedTransform = isDesktop ? { x: "100%" } : { y: "100%" };
  const openTransform = isDesktop ? { x: 0 } : { y: 0 };
  // Drag-to-close is mobile-only (bottom sheet); desktop right-rail uses click-outside / Esc / X.
  const dragEnabled = !isDesktop && !reduced;

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && project ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
                className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.aside
                initial={reduced ? openTransform : closedTransform}
                animate={openTransform}
                exit={closedTransform}
                transition={{ duration: reduced ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                drag={dragEnabled ? "y" : false}
                dragControls={dragControls}
                dragListener={false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (
                    info.offset.y > DRAG_CLOSE_OFFSET ||
                    info.velocity.y > DRAG_CLOSE_VELOCITY
                  ) {
                    onClose();
                  }
                }}
                className={cn(
                  "fixed z-50 flex flex-col border-soft bg-surface-1 shadow-elev-3 backdrop-blur-md",
                  // Mobile bottom sheet
                  "bottom-0 left-0 right-0 max-h-[90vh] rounded-t-2xl border-t",
                  // Desktop right rail — wider than the experience sidebar to
                  // fit case-study chapters comfortably on large viewports.
                  "md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-screen md:w-full md:max-w-[75vw] md:rounded-t-none md:border-l md:border-t-0 lg:max-w-[68vw] xl:max-w-[960px] 2xl:max-w-[1080px]"
                )}
              >
                <Dialog.Title className="sr-only">Case study: {project.name}</Dialog.Title>
                <Dialog.Description className="sr-only">
                  {project.case_study?.summary ?? project.short_description ?? project.name}
                </Dialog.Description>

                {/* Mobile drag handle — initiates the sheet's drag-to-close */}
                <div
                  className="flex cursor-grab justify-center pt-3 active:cursor-grabbing md:hidden"
                  aria-hidden="true"
                  onPointerDown={(event) => {
                    if (dragEnabled) dragControls.start(event);
                  }}
                  style={{ touchAction: "none" }}
                >
                  <span className="h-1 w-10 rounded-full bg-strong" />
                </div>

                {/* Close button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study"
                  className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md border border-soft bg-surface-2 text-secondary transition-colors duration-base ease-out-soft hover:border-strong hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
                >
                  <X aria-hidden="true" size={16} />
                </button>

                <div
                  data-lenis-prevent
                  className="relative flex-1 overflow-y-auto overscroll-contain px-6 pb-10 pt-12 md:px-8 md:pt-14"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={project.name}
                      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                      transition={{ duration: reduced ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-9"
                    >
                      <CaseStudyBody project={project} />
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

function CaseStudyBody({ project }: { project: CaseStudyProject }) {
  const cs = project.case_study;
  const summaryLine = cs?.summary ?? project.short_description;

  return (
    <>
      {/* Title card */}
      <header className="space-y-4">
        <p className="font-mono text-label uppercase tracking-[0.25em] text-tertiary">
          Case study · {project.timeline}
        </p>
        <h2 className="font-serif text-display-2 font-normal italic leading-[1.05] tracking-tight text-primary">
          {project.name}
        </h2>
        {summaryLine ? (
          <p className="text-body-1 leading-relaxed text-primary/80">{summaryLine}</p>
        ) : null}
      </header>

      <div className="h-px bg-accent/30" />

      {cs ? (
        <>
          <Chapter index="01" title="Problem" body={cs.problem} />
          <Chapter index="02" title="Approach" body={cs.approach} />
          <Chapter index="03" title="Result" body={cs.result} />
        </>
      ) : project.detailed_description?.length ? (
        <section className="space-y-3">
          <h3 className="font-mono text-label font-semibold uppercase tracking-[0.2em] text-tertiary">
            Highlights
          </h3>
          <ul className="space-y-2.5">
            {project.detailed_description.map((point, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 shrink-0 text-accent/70">
                  ▸
                </span>
                <span className="text-body-2 leading-relaxed text-primary/85">{point}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {cs?.metrics?.length ? (
        <section className="space-y-3">
          <h3 className="font-mono text-label font-semibold uppercase tracking-[0.2em] text-tertiary">
            Highlights
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {cs.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-soft bg-surface-2/60 px-4 py-3"
              >
                <p className="font-serif text-h2 italic leading-tight text-accent">{m.value}</p>
                <p className="mt-1 font-mono text-label uppercase tracking-wider text-tertiary">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {project.skills?.length ? (
        <section className="space-y-3">
          <h3 className="font-mono text-label font-semibold uppercase tracking-[0.2em] text-tertiary">
            Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-accent-soft px-3 py-1 text-label tracking-wide text-accent ring-1 ring-inset ring-accent/25"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {project.live_url || project.github_url ? (
        <section className="flex flex-wrap gap-3 border-t border-soft pt-6">
          {project.live_url ? (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-soft bg-surface-2 px-4 py-2 text-label font-medium tracking-wide text-secondary transition-colors hover:border-strong hover:text-primary"
            >
              Visit <ExternalLink aria-hidden="true" size={14} />
            </a>
          ) : null}
          {project.github_url ? (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-soft bg-surface-2 px-4 py-2 text-label font-medium tracking-wide text-secondary transition-colors hover:border-strong hover:text-primary"
            >
              GitHub <SiGithub aria-hidden="true" size={14} />
            </a>
          ) : null}
        </section>
      ) : null}
    </>
  );
}

function Chapter({ index, title, body }: { index: string; title: string; body: string[] }) {
  return (
    <section className="space-y-3">
      <h3 className="flex items-baseline gap-3">
        <span className="font-mono text-label font-semibold uppercase tracking-[0.2em] text-accent">
          {index}
        </span>
        <span aria-hidden="true" className="font-mono text-label text-tertiary">
          —
        </span>
        <span className="font-serif text-h2 font-normal italic text-primary">{title}</span>
      </h3>
      <ul className="space-y-2.5">
        {body.map((point, i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden="true" className="mt-2 shrink-0 text-accent/70">
              ▸
            </span>
            <span className="text-body-2 leading-relaxed text-primary/85">{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

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
