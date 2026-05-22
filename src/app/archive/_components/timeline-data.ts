import experienceData from "@/asset/experience.json";

export interface ExperienceItem {
  slug: string;
  company: string;
  position: string;
  description: string;
  responsibilities: string[];
  highlights: string[];
  skills: string[];
  location: string;
  startDate: string;
  endDate: string;
  url: string;
  logo: string;
}

export interface YearGroup {
  year: number;
  entries: ExperienceItem[];
}

/** Extracts the year from a "MMM YYYY" date string like "APR 2026". */
function parseStartYear(startDate: string): number {
  const year = parseInt(startDate.split(" ").at(-1) ?? "", 10);
  return Number.isFinite(year) ? year : 0;
}

/**
 * Returns experiences grouped by their start year, newest-first. Within a
 * year the original JSON order is preserved.
 */
export function getYearGroups(): YearGroup[] {
  const experiences = experienceData as ExperienceItem[];
  const sorted = [...experiences].sort(
    (a, b) => parseStartYear(b.startDate) - parseStartYear(a.startDate)
  );
  const groups: YearGroup[] = [];
  let current: YearGroup | null = null;
  for (const exp of sorted) {
    const year = parseStartYear(exp.startDate);
    if (!current || current.year !== year) {
      current = { year, entries: [] };
      groups.push(current);
    }
    current.entries.push(exp);
  }
  return groups;
}

export function isCurrentRole(exp: ExperienceItem): boolean {
  return exp.endDate.toLowerCase() === "present";
}
