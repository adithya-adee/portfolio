"use client";

import { motion } from "framer-motion";

const techStack = [
  { name: "JavaScript", color: "#F7DF1E", bg: "#33320" },
  { name: "TypeScript", color: "#3178C6", bg: "#2D4257" },
  { name: "React", color: "#61DAFB", bg: "#282C34" },
  { name: "Next.js", color: "#FFFFFF", bg: "#000000" },
  { name: "Node.js", color: "#339933", bg: "#1B3A1F" },
  { name: "NestJS", color: "#E0234E", bg: "#2C1B20" },
  { name: "PostgreSQL", color: "#4169E1", bg: "#1E2A3C" },
  { name: "MongoDB", color: "#47A248", bg: "#1C2E1F" },
  { name: "Rust", color: "#CE412B", bg: "#2E1D1A" },
  { name: "Solana", color: "#9945FF", bg: "#1E1533" },
  { name: "Prisma", color: "#2D3748", bg: "#1A202C" },
  { name: "Redis", color: "#DC382D", bg: "#2C1C1A" },
  { name: "Convex", color: "#FFA500", bg: "#332818" },
  { name: "tRPC", color: "#2596BE", bg: "#1A2F38" },
];

export default function TechStack() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h2 className="mb-6 text-sm font-medium text-gray-400">Technology & Tools I Use</h2>

      <div className="flex flex-wrap gap-2">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="cursor-pointer rounded-md border border-neutral-800/50 bg-neutral-900/30 px-3 py-1.5 transition-all hover:border-neutral-700"
            style={{
              boxShadow: "0 0 0 0 transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 8px 0 ${tech.color}40`;
              e.currentTarget.style.borderColor = `${tech.color}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 0 transparent";
              e.currentTarget.style.borderColor = "rgba(38, 38, 38, 0.5)";
            }}
          >
            <span className="text-sm font-medium text-gray-300">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
