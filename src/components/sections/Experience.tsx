"use client";

import experience from "@/asset/experience.json";
import { MdLocationOn } from "react-icons/md";

export default function ExperienceSection() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-8">Experience</h2>
      {experience.map((exp) => (
        <div
          key={exp.company}
          className="bg-transparent border-l-2 border-neutral-700 pl-6 mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2 sm:mb-0">
              <MdLocationOn className="inline-block" />
              <span>{exp.location}</span>
            </div>
            <div className="text-gray-400 text-sm">
              {exp.startDate} - {exp.endDate}
            </div>
          </div>
          <div className="font-bold text-lg text-white">{exp.company}</div>
          <div className="text-gray-300 text-base mb-2">{exp.position}</div>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            {exp.responsibilities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
