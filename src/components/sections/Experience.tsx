"use client";

import experienceData from "@/asset/experience.json";
import { MdLocationOn } from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink, HighlighterIcon } from "lucide-react";
import { useMemo } from "react";
import { ExperienceItem } from "@/app/experience/page";
import { Button } from "../ui/button";

interface ExperienceProps {
  isMobile?: boolean;
}

export default function ExperienceSection({ isMobile }: ExperienceProps) {
  const experience = useMemo(() => experienceData as unknown as ExperienceItem[], []);

  return (
    <section>
      <div className={`flex justify-between ${isMobile ? "my-4" : "sm:my-4 md:my-6 lg:mb-8"}`}>
        <div className="flex-start flex">
          <div className="relative p-2">
            <HighlighterIcon className={`${isMobile ? "h-6 w-6" : "h-8 w-8"} text-purple-400`} />
            <div
              className={`absolute inset-0 ${
                isMobile ? "h-6 w-6" : "h-8 w-8"
              } rounded-full bg-purple-400/20 blur-xl`}
            ></div>
          </div>
          <div>
            <h2
              className={`${
                isMobile ? "text-2xl" : "text-4xl"
              } bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text font-bold text-transparent`}
            >
              Experience
            </h2>
            <p className={`text-gray-400 ${isMobile ? "text-xs" : "text-sm"} mt-1`}></p>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="w-full border-purple-500/50 text-purple-300 backdrop-blur-sm transition-all duration-300 hover:bg-purple-500/10 hover:text-white"
            onClick={() => window.location.replace("/experience")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            <span className="relative flex items-center gap-2">
              Detailed View
              <ExternalLink className="h-4 w-4 transition-transform hover:-translate-y-1 hover:translate-x-1" />
            </span>
          </Button>
        </motion.div>
      </div>

      {experience.map((exp, idx) => (
        <motion.div
          key={exp.company}
          whileHover={!isMobile ? { scale: 1.03, y: -2 } : undefined}
          whileTap={!isMobile ? { scale: 0.98 } : undefined}
          initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: isMobile ? 0.4 : 0.5,
            delay: isMobile ? idx * 0.05 : idx * 0.1,
          }}
          viewport={{ once: true }}
          className={isMobile ? "my-6" : "my-10"}
        >
          <Card className="border-0 border-l-4 border-gray-400 bg-transparent shadow-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-2xl">
            <CardContent className={isMobile ? "p-4" : "p-6"}>
              <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-400 sm:mb-0">
                  <MdLocationOn className="inline-block" />
                  <span>{exp.location}</span>
                </div>
                <div className={`text-gray-400 ${isMobile ? "text-xs" : "text-md"}`}>
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              <div className={`font-bold ${isMobile ? "text-base" : "text-lg"} text-white`}>
                {exp.company}
              </div>
              <div className={`text-gray-300 ${isMobile ? "text-sm" : "text-base"} mb-2`}>
                {exp.position}
              </div>
              <ul
                className={`list-disc pl-5 space-y-${
                  isMobile ? "1" : "2"
                } text-gray-300 ${isMobile ? "text-sm" : "text-md"}`}
              >
                {exp.highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
