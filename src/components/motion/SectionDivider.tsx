"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "./useReducedMotionSafe";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  /** Optional small label between the lines — e.g. a chapter number. */
  label?: string;
  className?: string;
}

/**
 * Editorial film-reel marker between sections — thin centered lines with a
 * small dot (or optional label). Pure CSS + a single scale-x animation on
 * scroll-into-view; ~0 JS cost. Matches the snake-rail aesthetic.
 *
 *   ──── · ◯ · ────
 *   ──── 02 ────  (with label)
 */
export function SectionDivider({ label, className }: SectionDividerProps) {
  const reduced = useReducedMotionSafe();

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn(
        "mx-auto flex max-w-3xl items-center justify-center gap-3 px-4 py-2 sm:px-6 sm:py-4",
        className
      )}
    >
      <motion.span
        initial={reduced ? { scaleX: 1, opacity: 0.35 } : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.35 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "right" }}
        className="h-px w-16 bg-tertiary sm:w-24"
      />
      {label ? (
        <span className="font-mono text-label uppercase tracking-[0.25em] text-tertiary/60">
          {label}
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <span className="text-tertiary/40">·</span>
          <span className="inline-block h-1.5 w-1.5 rounded-full border border-accent/60 bg-transparent" />
          <span className="text-tertiary/40">·</span>
        </span>
      )}
      <motion.span
        initial={reduced ? { scaleX: 1, opacity: 0.35 } : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.35 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: reduced ? 0 : 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: reduced ? 0 : 0.1,
        }}
        style={{ transformOrigin: "left" }}
        className="h-px w-16 bg-tertiary sm:w-24"
      />
    </div>
  );
}
