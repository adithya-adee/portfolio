"use client";

import skills from "@/asset/skills.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BorderBeam } from "../magicui/border-beam";
import { FaStackExchange } from "react-icons/fa";

interface SkillJSONProps {
  name: string;
  level: "Advanced" | "Intermediate" | "Beginner";
}

interface SkillCategory {
  category: string;
  skills: SkillJSONProps[];
}

const levelColors: Record<string, string> = {
  Advanced: "bg-amber-400/20 border-amber-400/50 text-amber-300",
  Intermediate: "bg-blue-500/20 border-blue-500/50 text-blue-400",
  Beginner: "bg-orange-600/20 border-orange-600/50 text-orange-400",
};

const levelDots: Record<string, number> = {
  Advanced: 3,
  Intermediate: 2,
  Beginner: 1,
};

export default function SkillsSection() {
  return (
    <section className="py-16 px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <FaStackExchange className="w-8 h-8 text-purple-400" />
            <div className="absolute inset-0 w-8 h-8 bg-purple-400/20 rounded-full blur-xl"></div>
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Skills
            </h2>
            <p className="text-gray-400 text-sm mt-1">This is all ik</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {(skills as SkillCategory[]).map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="h-auto bg-black/40 border-neutral-800 backdrop-blur-sm relative overflow-hidden">
              <BorderBeam
                size={100}
                duration={8 + categoryIndex * 2}
                delay={categoryIndex * 0.5}
                colorFrom="#ffaa40"
                colorTo="#9c40ff"
              />

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-white">
                  {category.category}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.08,
                      },
                    },
                  }}
                >
                  {category.skills.map((skill: SkillJSONProps) => (
                    <motion.div
                      key={skill.name}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="relative group"
                    >
                      <div
                        className={`
                        px-4 py-3 rounded-xl border backdrop-blur-sm
                        transition-all duration-300 cursor-pointer
                        ${levelColors[skill.level]}
                        hover:shadow-lg hover:shadow-current/20
                        flex items-center gap-3
                      `}
                      >
                        <span className="font-medium text-sm">
                          {skill.name}
                        </span>

                        {/* Skill level dots */}
                        <div className="flex gap-1">
                          {Array.from({ length: 3 }).map(
                            (_, dotIndex: number) => (
                              <div
                                key={dotIndex}
                                className={`
                                w-1.5 h-1.5 rounded-full transition-all duration-300
                                ${
                                  dotIndex < levelDots[skill.level]
                                    ? "bg-current opacity-100"
                                    : "bg-current opacity-20"
                                }
                              `}
                              />
                            )
                          )}
                        </div>
                      </div>

                      {/* Tooltip */}
                      <div
                        className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                    bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap
                                    pointer-events-none z-10"
                      >
                        {skill.level}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-16 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="relative">
          <Card className="bg-black/20 border-neutral-800 backdrop-blur-sm">
            <BorderBeam
              size={80}
              duration={12}
              colorFrom="#60a5fa"
              colorTo="#a855f7"
            />
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-white">
                  Always Learning
                </span>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                I regularly explore new technologies and frameworks to stay
                current in the fast-evolving tech landscape. Currently exploring{" "}
                <span className="text-purple-400 font-semibold">
                  Web3 technologies
                </span>{" "}
                and{" "}
                <span className="text-blue-400 font-semibold">
                  AI/ML integration
                </span>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
