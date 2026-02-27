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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
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
          <p className="body-text">My professional journey and contributions</p>
        </div>

        {/* Experience List */}
        <div className="space-y-4 sm:space-y-6">
          {experience.map((exp, index) => (
            <div
              key={exp.company}
              className="card-accent group overflow-hidden rounded-lg border border-neutral-700/40 bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600/60 hover:bg-neutral-800/50 hover:shadow-xl hover:shadow-purple-500/10"
            >
              {/* Collapsed View */}
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between px-4 py-4 text-left transition-all duration-200 sm:px-6 sm:py-5"
              >
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-base font-medium tracking-wide text-white transition-colors duration-200 group-hover:text-gray-100 sm:text-lg">
                        {exp.position}
                      </h3>
                      <span className="inline-flex items-center rounded-full bg-neutral-800/60 px-2.5 py-0.5 text-xs font-medium tracking-wide text-gray-400 ring-1 ring-inset ring-neutral-700/50">
                        {exp.location}
                      </span>
                    </div>
                    <span className="whitespace-nowrap text-xs uppercase tracking-wider text-gray-500 sm:text-sm">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>

                  {exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="body-text transition-colors hover:text-purple-300 hover:underline hover:underline-offset-4"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    <p className="body-text">{exp.company}</p>
                  )}
                </div>

                <div
                  className={`ml-4 transition-all duration-300 ease-in-out sm:ml-6 ${
                    expandedIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-colors duration-200 group-hover:text-gray-300" />
                </div>
              </button>

              {/* Expanded View */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedIndex === index
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="border-t border-neutral-800/50 bg-neutral-900/20 px-4 pb-5 pt-4 sm:px-6">
                  {/* Highlights */}
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className={`flex gap-3 transition-all duration-300 ${
                          expandedIndex === index
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-4 opacity-0"
                        }`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <span className="mt-2 text-gray-600">•</span>
                        <span className="body-text">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="mt-5 space-y-3 border-t border-neutral-800/50 pt-4">
                      <p className="text-sm font-medium uppercase tracking-[0.15em] text-gray-500">
                        Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-neutral-800/50 px-3 py-1.5 text-xs tracking-wide text-gray-400 ring-1 ring-inset ring-neutral-700/40"
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
