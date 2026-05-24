"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

/**
 * Premium-feel scroll progress indicator — a thin vertical line pinned to the
 * left edge of the viewport that fills with accent as the user scrolls.
 *
 * Bail conditions:
 *   - prefers-reduced-motion (the bar still works, just no spring lag)
 *   - viewport is below md (left margin is too tight to be useful on mobile)
 */
export function ScrollProgressRail() {
  const reduced = useReducedMotionSafe();
  const [show, setShow] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    setShow(mq.matches);
    const listener = (event: MediaQueryListEvent) => setShow(event.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 bottom-0 z-30 w-[2px]"
    >
      <motion.div
        style={{
          scaleY: reduced ? scrollYProgress : scaleY,
          transformOrigin: "top",
        }}
        className="h-full w-full bg-accent/65"
      />
    </div>
  );
}
