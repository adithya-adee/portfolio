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
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1
            className={`${jetbrains.className} text-4xl md:text-5xl font-bold text-white mb-4`}
          >
            Work Experience
          </h1>
          <p className={`${inter.className} text-gray-400 text-lg`}>
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
              className="border border-white/10 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all"
            >
              {/* Collapsed View */}
              <button
                onClick={() => toggleExpand(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className={`${jetbrains.className} text-xl font-bold text-white`}
                    >
                      {exp.company}
                    </h3>
                    <span className="text-gray-400 text-sm">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className={`${inter.className} text-gray-300 text-base`}>
                    {exp.position}
                  </p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
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
                    <div className="px-6 pb-6 border-t border-white/10 pt-4">
                      <h4
                        className={`${inter.className} text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider`}
                      >
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className={`${inter.className} text-gray-300 flex gap-3`}
                          >
                            <span className="text-purple-400 mt-1.5">•</span>
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
