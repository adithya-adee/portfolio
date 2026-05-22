"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay applied via `delay` (ms-as-seconds). Use for ordered reveals. */
  delay?: number;
  /** Initial Y-offset in px; negative reveals from above. */
  y?: number;
  /** Once-only by default — reveals don't replay on scroll-out. */
  once?: boolean;
  /** Use `inline` for inline elements so we keep their default flow. */
  as?: "div" | "span" | "li";
}

// Dropped the `filter: blur()` step — forcing repaints on every reveal was
// the biggest jank source on low-end mobile GPUs. Opacity + transform stays.
const variants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const reducedVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  once = true,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotionSafe();
  const MotionTag = (motion[as] ?? motion.div) as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: "0px 0px -10% 0px" }}
      variants={reduced ? reducedVariants : { ...variants, hidden: { ...variants.hidden, y } }}
      transition={{
        duration: reduced ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </MotionTag>
  );
}
