"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

interface SectionTitleProps {
  children: ReactNode;
  /** Optional kicker / count rendered to the right (e.g. "8 projects"). */
  meta?: ReactNode;
  /** Tailwind class for the accent bar color when it's not aurora. */
  accentClassName?: string;
  className?: string;
}

/**
 * The shared heading used by every section on the home page. Renders an
 * aurora-gradient left-accent stroke that grows in on scroll-into-view,
 * the title text, and an optional meta slot on the right.
 *
 * Visual rhythm is what ties the redesigned page together — every section
 * uses this so the design system reads as one piece.
 */
export function SectionTitle({
  children,
  meta,
  accentClassName,
  className,
}: SectionTitleProps) {
  const reduced = useReducedMotionSafe();

  return (
    <div className={cn("mb-6 flex items-end justify-between gap-4", className)}>
      <div className="flex items-stretch gap-3">
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "block w-[2px] origin-top rounded-full",
            accentClassName ?? "bg-aurora"
          )}
        />
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="text-h1 font-medium tracking-tight text-gray-100"
        >
          {children}
        </motion.h2>
      </div>
      {meta ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: 0.15 }}
          className="text-label uppercase tracking-wider text-gray-500"
        >
          {meta}
        </motion.div>
      ) : null}
    </div>
  );
}
