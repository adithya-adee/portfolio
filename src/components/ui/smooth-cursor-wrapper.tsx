"use client";

import { useEffect, useState } from "react";
import { SmoothCursor } from "./smooth-cursor";

export function SmoothCursorWrapper() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const checkDevice = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      const isLargeScreen = window.innerWidth > 1024;

      // Check user agent for mobile/tablet
      const isMobileUA =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      setIsDesktop(!isTouchDevice && isLargeScreen && !isMobileUA);
    };

    checkDevice();

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
