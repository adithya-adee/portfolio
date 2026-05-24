"use client";

import { Command } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CommandPaletteHintProps {
  /**
   * "fixed" pins the hint top-right on subpages (mirrors ThemeToggle's pattern,
   * offset to the left of it). "inline" leaves positioning to the parent —
   * Hero uses this so it sits next to the REC clock + theme toggle group.
   */
  placement?: "fixed" | "inline";
}

/**
 * Editorial discoverability chip for the command palette. Click → opens the
 * palette via the `portfolio:open-palette` custom event (CommandPaletteMount
 * lazy-imports on the first event the same way it does on first ⌘K press).
 *
 * Desktop-only by design: touch users can't see kbd shortcuts, and the chip
 * is purely a "hey, this exists" affordance.
 *
 * OS detection picks the right glyph — `⌘K` on Mac, `Ctrl K` everywhere else.
 * Runs in an effect to avoid SSR/hydration mismatch.
 */
export function CommandPaletteHint({ placement = "fixed" }: CommandPaletteHintProps = {}) {
  const [isMac, setIsMac] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Hero owns the inline pair on home — drop the fixed instance there to
  // avoid two visible chips. Mirrors ThemeToggle.
  const shouldHide = placement === "fixed" && pathname === "/";

  useEffect(() => {
    setMounted(true);
    if (typeof navigator === "undefined") return;
    const platform =
      // @ts-expect-error — userAgentData is recent but graceful-falls-back
      navigator.userAgentData?.platform ?? navigator.platform ?? "";
    setIsMac(/mac|iPhone|iPad|iPod/i.test(platform));
  }, []);

  if (shouldHide) return null;

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("portfolio:open-palette"));
  };

  const positionClasses =
    placement === "fixed"
      ? // Sits to the left of ThemeToggle (which is at right-4 top-4 / sm:right-6 sm:top-6).
        // Theme toggle is ~124px wide on sm+; this offset clears it + a small gap.
        "fixed right-[140px] top-4 z-50 sm:right-[160px] sm:top-6"
      : "";

  // SSR placeholder — hide until mounted so we don't flash the wrong glyph.
  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          positionClasses,
          "hidden h-[34px] w-[80px] rounded-sm border border-soft bg-surface-1 shadow-elev-1 backdrop-blur-sm sm:block"
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={openPalette}
      aria-label="Open command palette"
      title={isMac ? "Cmd + K" : "Ctrl + K"}
      className={cn(
        positionClasses,
        "group hidden h-[34px] items-center gap-2 rounded-sm border border-soft bg-surface-1 px-3 shadow-elev-1 backdrop-blur-sm",
        "transition-colors duration-base ease-out-soft hover:border-strong hover:bg-surface-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0",
        "sm:inline-flex"
      )}
    >
      {isMac ? (
        <Command aria-hidden="true" size={12} className="text-accent" />
      ) : (
        <span
          aria-hidden="true"
          className="font-mono text-label font-medium uppercase tracking-wider text-accent"
        >
          Ctrl
        </span>
      )}
      <span
        aria-hidden="true"
        className="font-mono text-label font-medium uppercase tracking-[0.15em] text-primary"
      >
        K
      </span>
    </button>
  );
}
