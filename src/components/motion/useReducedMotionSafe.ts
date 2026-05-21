"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Boolean wrapper around framer-motion's `useReducedMotion` which can return
 * `null` during SSR / before the media query has been read. We treat unknown
 * as "respect motion" (false) since SSR output is static anyway.
 */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() === true;
}
