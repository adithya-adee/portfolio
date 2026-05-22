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

const MONTH_NUMERIC: Record<string, number> = {
  JAN: 1,
  FEB: 2,
  MAR: 3,
  APR: 4,
  MAY: 5,
  JUN: 6,
  JUL: 7,
  AUG: 8,
  SEP: 9,
  OCT: 10,
  NOV: 11,
  DEC: 12,
};

/**
 * Turns a "MMM YYYY" date string into a comparable integer (year*100 + month)
 * so the sort handles within-year ordering correctly. "DEC 2025" → 202512,
 * "AUG 2025" → 202508.
 */
function parseStartDateNumeric(startDate: string): number {
  const parts = startDate.split(" ");
  const month = MONTH_NUMERIC[parts[0]?.toUpperCase() ?? ""] ?? 0;
  const year = parseInt(parts[1] ?? "", 10) || 0;
  return year * 100 + month;
}

/** Extracts just the year from a "MMM YYYY" date string. */
function parseStartYear(startDate: string): number {
  const year = parseInt(startDate.split(" ").at(-1) ?? "", 10);
  return Number.isFinite(year) ? year : 0;
}

/** Newest-first chronological order, breaking year ties by month. */
export function getSortedExperiences(): ExperienceItem[] {
  return [...(experienceData as ExperienceItem[])].sort(
    (a, b) => parseStartDateNumeric(b.startDate) - parseStartDateNumeric(a.startDate)
  );
}

/**
 * Returns experiences grouped by start year, newest-first. Within a year,
 * entries are sorted by month so Dec sits above Aug above May.
 */
export function getYearGroups(): YearGroup[] {
  const sorted = getSortedExperiences();
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

/**
 * Flattened newest-first list with helper flags for rendering — the
 * alternating-sides desktop timeline uses these to decide L vs R and to
 * render a year chip before the first entry of each year.
 */
export interface FlatTimelineEntry {
  exp: ExperienceItem;
  year: number;
  isFirstOfYear: boolean;
  globalIndex: number;
}

export function getFlatTimeline(): FlatTimelineEntry[] {
  const sorted = getSortedExperiences();
  const result: FlatTimelineEntry[] = [];
  let prevYear: number | null = null;
  sorted.forEach((exp, i) => {
    const year = parseStartYear(exp.startDate);
    result.push({
      exp,
      year,
      isFirstOfYear: year !== prevYear,
      globalIndex: i,
    });
    prevYear = year;
  });
  return result;
}

export function isCurrentRole(exp: ExperienceItem): boolean {
  return exp.endDate.toLowerCase() === "present";
}
