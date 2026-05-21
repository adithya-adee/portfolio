"use client";

import { useMotionValue, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

interface CountUpProps {
  value: number;
  className?: string;
  /** Spring stiffness — higher = snappier. */
  stiffness?: number;
  /** Spring damping — higher = less overshoot. */
  damping?: number;
}

/**
 * Eased numeric counter. Replaces the linear interval that used to live in
 * VisitorCounter. Reduced-motion → snap to final value.
 */
export function CountUp({ value, className, stiffness = 60, damping = 18 }: CountUpProps) {
  const reduced = useReducedMotionSafe();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness, damping });
  const rounded = useTransform(spring, (latest) => Math.floor(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduced) {
      mv.jump(value);
      setDisplay(value);
    } else {
      mv.set(value);
    }
  }, [value, reduced, mv]);

  useMotionValueEvent(rounded, "change", (latest) => setDisplay(latest));

  return <span className={className}>{display.toLocaleString()}</span>;
}
