"use client";

import experienceData from "@/asset/experience.json";
import { MdLocationOn } from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, HighlighterIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

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

export default function ExperienceSection() {
  const experience = useMemo(
    () => experienceData as unknown as ExperienceItem[],
    []
  );

  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    window.addEventListener("resize", checkMobile);
  }, []);

  const handleDetailExperienceView = (slug: string) => {
    window.location.replace(`/experience/${slug}`);
  };

  return (
    <section
      className={`max-w-4xl mx-auto ${
        isMobile ? "px-4 py-1" : "px-6 py-2"
      } my-2`}
    >
      <div
        className={`flex justify-between ${
          isMobile ? "my-4" : "sm:my-4 md:my-6 lg:mb-8"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center gap-4 mb-8 ${isMobile ? "mb-6" : ""}`}
        >
          <Button
            variant="ghost"
            onClick={() => {
              window.location.replace("/");
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
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
          onClick={() => handleDetailExperienceView(exp.slug)}
        >
          <Card className="bg-transparent border-0 border-l-4 border-gray-400 hover:shadow-2xl hover:bg-gray-800 shadow-lg transition-all duration-200">
            <CardContent className={isMobile ? "p-4" : "p-6"}>
              <div
                className={`font-bold ${
                  isMobile ? "text-base" : "text-xl"
                } text-white`}
              >
                {exp.company}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2 sm:mb-0">
                  <MdLocationOn className="inline-block" />
                  <span>{exp.location}</span>
                </div>
                <div
                  className={`text-gray-400 ${
                    isMobile ? "text-xs" : "text-md"
                  }`}
                >
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              <div
                className={`text-gray-300 ${
                  isMobile ? "text-sm" : "text-base"
                } mb-2`}
              >
                {exp.position}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
