"use client";

import { Download } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ResumeLinkProps {
  /**
   * "fixed" pins the chip top-right on subpages alongside CommandPaletteHint
   * and ThemeToggle. "inline" leaves positioning to the parent — Hero uses
   * this so it joins the inline control group on home.
   */
  placement?: "fixed" | "inline";
}

/**
 * Conditional CV download chip. Renders only when next.config.ts detected a
 * public/resume.pdf at build time (via NEXT_PUBLIC_HAS_RESUME). Add the file
 * and rebuild → chip appears. Remove the file and rebuild → chip disappears.
 */
export function ResumeLink({ placement = "fixed" }: ResumeLinkProps = {}) {
  const hasResume = process.env.NEXT_PUBLIC_HAS_RESUME === "1";
  const pathname = usePathname();

  // Hero owns the inline control group on home — drop the fixed instance.
  const shouldHide = placement === "fixed" && pathname === "/";

  if (!hasResume) return null;
  if (shouldHide) return null;

  // Position: sits to the LEFT of CommandPaletteHint (which sits left of ThemeToggle).
  // ThemeToggle ~124px @ sm:right-6 → left edge near W-148. CommandPaletteHint
  // sits at sm:right-[160px] (~12px clearance from ThemeToggle's left). ResumeLink
  // lands at sm:right-[252px] keeping the same clearance from CmdK's left edge.
  const positionClasses =
    placement === "fixed"
      ? "fixed right-[228px] top-4 z-50 sm:right-[252px] sm:top-6"
      : "";

  return (
    <a
      href="/resume.pdf"
      download
      aria-label="Download resume"
      className={cn(
        positionClasses,
        "group hidden h-[34px] items-center gap-2 rounded-sm border border-soft bg-surface-1 px-3 shadow-elev-1 backdrop-blur-sm",
        "transition-colors duration-base ease-out-soft hover:border-strong hover:bg-surface-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0",
        "sm:inline-flex"
      )}
    >
      <Download
        aria-hidden="true"
        size={12}
        className="text-accent transition-transform duration-base group-hover:translate-y-0.5"
      />
      <span className="font-mono text-label font-medium uppercase tracking-[0.15em] text-primary">
        CV
      </span>
    </a>
  );
}
