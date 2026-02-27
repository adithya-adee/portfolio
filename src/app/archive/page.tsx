"use client";

import experienceData from "@/asset/experience.json";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

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

export default function ArchivePage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const experience = experienceData as ExperienceItem[];

  return (
    <div className="min-h-screen">
      <section className="mx-auto mt-8 max-w-3xl px-4 py-6 sm:mt-12 sm:px-6 sm:py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm tracking-wide text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Work Experience
          </h1>
          <p className="text-sm tracking-wide text-gray-400 sm:text-base">
            My professional journey and contributions
          </p>
        </div>

        {/* Experience List */}
        <div className="space-y-2 sm:space-y-3">
          {experience.map((exp) => (
            <div
              key={exp.company}
              className="overflow-hidden rounded-lg border border-neutral-700/40 bg-neutral-900/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-600/60 hover:bg-neutral-800/50 hover:shadow-lg"
            >
              {/* Collapsed View */}
              <button
                onClick={() =>
                  setExpandedIndex(
                    expandedIndex === experience.indexOf(exp) ? null : experience.indexOf(exp)
                  )
                }
                className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6 sm:py-5"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                    <h3 className="text-base font-medium tracking-wide text-white sm:text-lg">
                      {exp.position}
                    </h3>
                    <span className="text-sm uppercase tracking-wider text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm tracking-wide text-gray-400 sm:text-base">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <div
                  className="ml-5 transition-transform duration-200 sm:ml-6"
                  style={{
                    transform:
                      expandedIndex === experience.indexOf(exp) ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
              </button>

              {/* Expanded View */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedIndex === experience.indexOf(exp)
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="border-t border-neutral-800/50 px-5 pb-6 pt-5 sm:px-6">
                  {/* Highlights */}
                  <div className="space-y-4">
                    <p className="text-sm font-medium uppercase tracking-[0.15em] text-gray-500">
                      Highlights
                    </p>
                    <ul className="space-y-3">
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className={`flex gap-3 transition-all duration-300 ${
                            expandedIndex === experience.indexOf(exp)
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-4 opacity-0"
                          }`}
                          style={{ transitionDelay: `${i * 50}ms` }}
                        >
                          <span className="mt-2 text-gray-600">•</span>
                          <span className="text-sm leading-relaxed tracking-wide text-gray-300 sm:text-base">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <p className="text-sm tracking-wide text-gray-500">Skills</p>
                      <div className="flex flex-wrap gap-2.5">
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-neutral-800/50 px-3 py-1.5 text-sm tracking-wide text-gray-400"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
