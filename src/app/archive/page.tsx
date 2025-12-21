"use client";

import experienceData from "@/asset/experience.json";
import { motion, AnimatePresence } from "framer-motion";
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
      <section className="mx-auto mt-20 max-w-2xl px-4 py-8 sm:px-6">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-white">Work Experience</h1>
          <p className="text-sm text-gray-400">My professional journey and contributions</p>
        </div>

        {/* Experience List */}
        <div className="space-y-3">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-lg border border-neutral-800/50 bg-neutral-900/30 transition-colors hover:border-neutral-700/50"
            >
              {/* Collapsed View */}
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-base font-medium text-white">{exp.position}</h3>
                    <span className="text-xs text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4"
                >
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </motion.div>
              </button>

              {/* Expanded View */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-neutral-800/50 px-4 pb-4">
                      {/* Highlights */}
                      <div className="mt-3">
                        <p className="mb-2 text-xs uppercase tracking-wider text-gray-500">
                          Highlights
                        </p>
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className="flex gap-2 text-sm text-gray-300">
                              <span className="mt-1.5 text-gray-600">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="mt-4">
                          <p className="mb-2 text-xs text-gray-500">Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="rounded bg-neutral-800/50 px-2 py-0.5 text-xs text-gray-400"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
