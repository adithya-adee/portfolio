"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { type ReactNode, useRef } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** Strength of pull, 0..1. Default 0.35. */
  strength?: number;
  /** Render through Radix Slot so the magnetic wrapper can compose with an existing button/anchor. */
  asChild?: boolean;
}

/**
 * Element translates toward the pointer when within its bounding rect.
 * Springs back to 0,0 on leave. Disabled under reduced-motion / touch.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
  asChild = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotionSafe();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduced) {
    const Comp = (asChild ? Slot : "div") as typeof Slot;
    return <Comp className={className}>{children}</Comp>;
  }

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((event.clientX - cx) * strength);
    y.set((event.clientY - cy) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {asChild ? <Slot>{children}</Slot> : children}
    </motion.div>
  );
}
