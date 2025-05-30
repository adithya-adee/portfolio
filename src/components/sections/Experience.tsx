"use client";

import experience from "@/asset/experience.json";
import { MdLocationOn } from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ExperienceSection() {
  const router = useRouter();

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-8">Experience</h2>{" "}
        <Button
          variant="outline"
          className="border-neutral-700 text-gray-300 hover:text-white"
          onClick={() => router.push("/experience")}
        >
          View all{" "}
          <span aria-hidden className="ml-1">
            ↗
          </span>
        </Button>
      </div>
      {experience.map((exp, idx) => (
        <motion.div
          key={exp.company}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <Card className="bg-transparent border-0 border-l-4 border-neutral-800 shadow-lg transition">
            <CardContent className="p-6">
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
                {exp.responsibilities.map((item, i) => (
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
