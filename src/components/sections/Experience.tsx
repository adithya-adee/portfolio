"use client";

import experienceData from "@/asset/experience.json";
import { MdLocationOn } from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, HighlighterIcon } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../ui/button";

const SKILL_COLOR = "bg-violet-500/10 text-violet-300 ring-violet-500/20";

export interface ExperienceItem {
  slug: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  highlights: string[];
  url: string;
  logo: string;
}

interface ExperienceProps {
  isMobile?: boolean;
}

export default function ExperienceSection({ isMobile }: ExperienceProps) {
  const experience = useMemo(() => experienceData as unknown as ExperienceItem[], []);

  return (
    <section>
      <div
        className={`flex flex-col justify-between gap-3 sm:flex-row sm:gap-0 ${isMobile ? "my-4" : "sm:my-4 md:my-6 lg:mb-8"}`}
      >
        <div className="flex-start flex">
          <div className="relative p-2">
            <HighlighterIcon
              className={`${isMobile ? "h-5 w-5" : "h-6 w-6 sm:h-8 sm:w-8"} text-purple-400`}
            />
            <div
              className={`absolute inset-0 ${
                isMobile ? "h-5 w-5" : "h-6 w-6 sm:h-8 sm:w-8"
              } rounded-full bg-purple-400/20 blur-xl`}
            ></div>
          </div>
          <div>
            <h2
              className={`${
                isMobile ? "text-xl" : "text-2xl sm:text-3xl md:text-4xl"
              } bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text font-bold text-transparent`}
            >
              Experience
            </h2>
            <p className={`text-gray-400 ${isMobile ? "text-xs" : "text-sm"} mt-1`}></p>
          </div>
        </div>

        <div>
          <Button
            variant="outline"
            className="w-full border-purple-500/50 text-purple-300 backdrop-blur-sm transition-all duration-300 hover:bg-purple-500/10 hover:text-white sm:w-auto"
            onClick={() => window.location.replace("/experience")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            <span className="relative flex items-center gap-2">
              Detailed View
              <ExternalLink className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </div>

      {experience.map((exp) => (
        <div key={exp.company} className={isMobile ? "my-4 sm:my-6" : "my-6 sm:my-8 md:my-10"}>
          <Card className="group relative border-0 border-l-4 border-l-transparent bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-rose-500/20 bg-clip-padding shadow-lg transition-all duration-300 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-purple-500 before:via-pink-500 before:to-rose-500 hover:shadow-2xl hover:shadow-purple-500/20">
            <CardContent className={isMobile ? "p-3 sm:p-4" : "p-4 sm:p-6"}>
              <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400 sm:text-sm">
                  <MdLocationOn className="inline-block" />
                  <span>{exp.location}</span>
                </div>
                <div className={`text-gray-400 ${isMobile ? "text-xs" : "text-sm sm:text-base"}`}>
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              <div
                className={`font-bold ${isMobile ? "text-sm" : "text-base sm:text-lg"} bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent`}
              >
                {exp.company}
              </div>
              <div
                className={`text-gray-300 ${isMobile ? "text-xs" : "text-sm sm:text-base"} mb-2`}
              >
                {exp.position}
              </div>
              <ul
                className={`list-disc pl-5 space-y-${
                  isMobile ? "1" : "2"
                } text-gray-300 marker:text-purple-500 ${isMobile ? "text-xs" : "text-sm sm:text-base"}`}
              >
                {exp.highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              {/* Skills */}
              {exp.skills && exp.skills.length > 0 && (
                <div
                  className={`mt-4 flex flex-wrap gap-2 ${isMobile ? "pt-2" : "pt-4"} border-t border-neutral-800/50`}
                >
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className={`rounded-md px-2.5 py-1 text-xs tracking-wide ring-1 ring-inset ${SKILL_COLOR}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </section>
  );
}
