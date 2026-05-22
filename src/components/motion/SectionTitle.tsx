"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

interface SectionTitleProps {
  children: ReactNode;
  /** Optional kicker / count rendered to the right (e.g. "8 projects"). */
  meta?: ReactNode;
  /** Optional 1-based chapter index. Rendered as `01 —` prefix in mono accent. */
  index?: number;
  className?: string;
}

/**
 * The shared heading used by every section + subpage. Italic serif title,
 * accent left-accent stroke that grows in on scroll-into-view, optional
 * chapter-index prefix in mono uppercase, and an optional meta slot.
 *
 * Visual rhythm is what ties the redesigned site together — every section
 * uses this so the design system reads as one piece.
 */
export function SectionTitle({ children, meta, index, className }: SectionTitleProps) {
  const reduced = useReducedMotionSafe();
  const indexLabel = typeof index === "number" ? String(index).padStart(2, "0") : null;

  return (
    <div className={cn("mb-6 flex items-end justify-between gap-4", className)}>
      <div className="flex items-stretch gap-3">
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="block w-[2px] origin-top rounded-full bg-accent"
        />
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="flex items-baseline gap-3 text-h1 font-normal tracking-tight text-primary"
        >
          {indexLabel ? (
            <span className="font-mono text-label font-semibold uppercase not-italic tracking-[0.2em] text-accent">
              {indexLabel}
              <span className="mx-2 text-muted">—</span>
            </span>
          ) : null}
          <span className="font-serif italic">{children}</span>
        </motion.h2>
      </div>
      {meta ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: 0.15 }}
          className="font-mono text-label uppercase tracking-wider text-tertiary"
        >
          {meta}
        </motion.div>
      ) : null}
    </div>
  );
}
