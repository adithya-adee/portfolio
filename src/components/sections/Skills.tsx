"use client";

import Image from "next/image";

import skills from "@/asset/skills.json";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const groupedSkills = [
  {
    level: "Advanced",
    color: "bg-green-600",
    skills: skills.filter((s) => s.level === "Advanced"),
    label: "Core Strengths",
    description:
      "Technologies I use daily and can architect, debug, and scale in production.",
  },
  {
    level: "Intermediate",
    color: "bg-blue-600",
    skills: skills.filter((s) => s.level === "Intermediate"),
    label: "Proficient",
    description:
      "Confidently build, integrate, and optimize using these tools.",
  },
];

export default function SkillsSection() {
  return (
    <section>
      <motion.h2
        className="text-2xl font-semibold mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        My Tech Stack & Skills
      </motion.h2>
      <motion.p
        className="text-gray-400 mb-8 max-w-2xl"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        viewport={{ once: true }}
      >
        I believe in mastering fundamentals and building with the right tools.
        Here’s a snapshot of my strongest technologies and the tools I use to
        ship robust, scalable products.
      </motion.p>
      <div className="flex flex-col gap-8">
        {groupedSkills.map((group, i) => (
          <motion.div
            key={group.level}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-neutral-900 border-neutral-800 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`w-3 h-3 rounded-full ${group.color}`}
                  ></span>
                  <span className="font-semibold text-lg text-white">
                    {group.label}
                  </span>
                  <Badge
                    variant="outline"
                    className="ml-2 border-gray-700 text-xs text-gray-400"
                  >
                    {group.level}
                  </Badge>
                </div>
                <div className="text-gray-400 text-sm mb-4">
                  {group.description}
                </div>
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.07,
                      },
                    },
                  }}
                >
                  {group.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="flex flex-col items-center group"
                      whileHover={{ scale: 1.08, y: -4 }}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <div className="relative mb-2">
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          width={48}
                          height={48}
                          className="rounded-full bg-neutral-800 border border-neutral-700 p-2 group-hover:shadow-lg transition"
                        />
                        {/* Animated ring for advanced skills */}
                        {group.level === "Advanced" && (
                          <motion.span
                            className="absolute -inset-1 rounded-full border-2 border-green-600 opacity-40"
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.4, 0.7, 0.4],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 2,
                              ease: "easeInOut",
                            }}
                          />
                        )}
                      </div>
                      <div className="text-white font-medium text-sm text-center">
                        {skill.name}
                      </div>
                      <div className="text-xs text-gray-400">{skill.level}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-10 text-center text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        viewport={{ once: true }}
      >
        <span className="inline-block bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700">
          <span className="font-semibold text-white">Always learning:</span> I
          regularly explore new frameworks, libraries, and best practices to
          stay ahead in the fast-evolving tech landscape.
        </span>
      </motion.div>
    </section>
  );
}
