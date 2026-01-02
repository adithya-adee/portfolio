"use client";

import experienceData from "@/asset/experience.json";
import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  display: boolean;
  location: string;
  startDate: string;
  endDate: string;
  url: string;
}

export default function ExperienceCollapsed() {
  const experience = useMemo(() => experienceData as unknown as ExperienceItem[], []);

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6">
      <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <h2 className="text-xl font-medium tracking-wide text-gray-400 sm:text-2xl">
          Where I&apos;ve Worked
        </h2>
        <a
          href="/archive"
          className="flex items-center gap-2 text-sm tracking-wide text-gray-400 transition-colors hover:text-gray-200"
        >
          View All
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {experience
          .filter((exp) => exp.display === true)
          .map((exp) => (
            <div
              key={exp.company}
              className="group flex flex-col justify-between gap-3 rounded-lg border-2 border-dashed border-zinc-600/60 bg-neutral-900/40 px-4 py-4 transition-all duration-300 hover:border-solid hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/20 sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-5"
            >
              <div className="space-y-1">
                <a
                  href={exp.url}
                  target="_blank"
                  className="text-base font-medium tracking-wide text-white transition-colors hover:text-purple-300 sm:text-lg"
                >
                  {exp.company}
                </a>
                <p className="text-sm tracking-wide text-gray-500">{exp.position}</p>
              </div>
              <span className="whitespace-nowrap text-sm tracking-wider text-gray-500">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
          ))}
      </div>
    </section>
  );
}
