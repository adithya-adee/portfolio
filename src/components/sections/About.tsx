"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutSection() {
  const highlights = [
    "Built and published 'Crab-Clean' Rust CLI (540+ downloads) with 90% faster SHA256 hashing.",
    "Top 10% nationally in IEEE Summer of Code for impactful open-source work.",
    "Led full-stack projects using MERN, Next.js, NestJS, and PostgreSQL.",
    "Improved DB query speed by 35% and reduced sync latency by 30% through system optimization.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center sm:mb-6 md:mb-10 lg:mb-12"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          About Me
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto" />
      </motion.div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-sm relative overflow-hidden hover:border-white/20 transition-all">
        <CardContent className="p-8 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-gray-300">
              I&apos;m a passionate full-stack developer specializing in modern
              JavaScript technologies. Currently exploring the exciting world of{" "}
              <span className="text-purple-400 font-semibold">Web3</span> while
              building scalable applications with React, Next.js, and Node.js.
            </p>

            {/* Key Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <Badge
                    variant="outline"
                    className="w-full justify-start p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 text-gray-300 text-base whitespace-normal break-words"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0" />
                    {highlight}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
              className="pt-6 text-center"
            >
              <p className="text-gray-400">
                🚀 Actively seeking internship opportunities to build impactful
                web experiences
              </p>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </section>
  );
}
