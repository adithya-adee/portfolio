"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "next-view-transitions";
import { type ReactNode } from "react";

interface SectionNavLinkProps {
  href: string;
  children: ReactNode;
}

/**
 * Editorial nav link used in section headers — e.g. "my timeline →" on the
 * Experience section, "my articles →" on the Blogs section. Hover composes
 * three small motions: text brightens, an accent underline draws in from the
 * left, and the arrow slides 4px right. Uses `next-view-transitions` Link so
 * the route swap kicks the View Transitions API.
 */
export function SectionNavLink({ href, children }: SectionNavLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 font-mono text-label uppercase tracking-wider text-tertiary transition-colors duration-base ease-out-soft hover:text-primary"
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-base ease-out-soft group-hover:scale-x-100"
        />
      </span>
      <ArrowRight
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform duration-base ease-out-soft group-hover:translate-x-1"
      />
    </Link>
  );
}
