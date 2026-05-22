import { cn } from "@/lib/utils";

interface DateCapsuleProps {
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

/**
 * Two-line mono date capsule — start date above end date inside a small
 * bordered chip. Used in the top-right of every timeline card so the date
 * range doesn't compete with the company name for horizontal space.
 *
 * The end date renders in accent + semibold when it's "Present" so the
 * currently-active role's date pops without needing the larger Active badge
 * for the date itself.
 */
export function DateCapsule({ startDate, endDate, isCurrent }: DateCapsuleProps) {
  return (
    <div
      className="flex shrink-0 flex-col items-center whitespace-nowrap rounded-md border border-soft bg-surface-2 px-2.5 py-1 font-mono text-label uppercase tracking-wider"
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      <span className="text-tertiary">{startDate}</span>
      <span className={cn(isCurrent ? "font-semibold text-accent" : "text-tertiary")}>
        {endDate}
      </span>
    </div>
  );
}
