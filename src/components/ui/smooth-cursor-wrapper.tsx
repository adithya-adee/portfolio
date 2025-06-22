"use client";

import { useEffect, useState } from "react";
import { SmoothCursor } from "./smooth-cursor";

export function SmoothCursorWrapper() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const checkDevice = () => {
      // Check if it's a touch device
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // Check screen size (desktop is typically > 1024px)
      const isLargeScreen = window.innerWidth > 1024;

      // Check user agent for mobile/tablet
      const isMobileUA =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      // Only show cursor on desktop (non-touch, large screen, not mobile UA)
      setIsDesktop(!isTouchDevice && isLargeScreen && !isMobileUA);
    };

    checkDevice();

    // Re-check on resize
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!isMounted) {
    return null;
  }

  // Only render SmoothCursor on desktop
  return isDesktop ? <SmoothCursor /> : null;
}
