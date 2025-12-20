"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import experienceData from "@/asset/experience.json";
import { MdLocationOn } from "react-icons/md";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface ExperienceItem {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export default function ArchivePage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const experience = experienceData as unknown as ExperienceItem[];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black px-4 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="mb-4 inline-block text-gray-400 transition-colors hover:text-white"
          >
            ← Back to Home
          </Link>
          <h1 className={`${jetbrains.className} mb-4 text-4xl font-bold text-white md:text-5xl`}>
            Work Experience
          </h1>
          <p className={`${inter.className} text-lg text-gray-400`}>
            My professional journey and achievements
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-white/20"
            >
              {/* Collapsed View */}
              <button
                onClick={() => toggleExpand(index)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-white/5"
              >
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className={`${jetbrains.className} text-xl font-bold text-white`}>
                      {exp.company}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className={`${inter.className} text-base text-gray-300`}>{exp.position}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                    <MdLocationOn />
                    <span>{exp.location}</span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {expandedIndex === index ? (
                    <ChevronUp className="text-gray-400" />
                  ) : (
                    <ChevronDown className="text-gray-400" />
                  )}
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
                    <div className="border-t border-white/10 px-6 pt-4 pb-6">
                      <h4
                        className={`${inter.className} mb-3 text-sm font-semibold tracking-wider text-gray-400 uppercase`}
                      >
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className={`${inter.className} flex gap-3 text-gray-300`}>
                            <span className="mt-1.5 text-purple-400">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
