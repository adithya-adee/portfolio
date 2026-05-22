"use client";

import {
  SiTypescript,
  SiJavascript,
  SiRust,
  SiExpress,
  SiNestjs,
  SiApachekafka,
  SiSocketdotio,
  SiReact,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiDocker,
  SiGithubactions,
  SiDatadog,
  SiVercel,
  SiSolana,
  SiAmazonwebservices,
} from "react-icons/si";
import { TbMathFunction } from "react-icons/tb";
import { Reveal, SectionTitle } from "@/components/motion";

interface TechItem {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

interface Category {
  name: string;
  items: TechItem[];
}

const categories: Category[] = [
  {
    name: "Languages",
    items: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Rust", icon: SiRust, color: "#CE412B" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { name: "Axum", icon: SiRust, color: "#CE412B" },
      { name: "Kafka", icon: SiApachekafka, color: "#FFFFFF" },
      { name: "WebSocket", icon: SiSocketdotio, color: "#010101" },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    ],
  },
  {
    name: "Web3 / ZK",
    items: [
      { name: "Solana", icon: SiSolana, color: "#9945FF" },
      { name: "Anchor", icon: SiRust, color: "#CE412B" },
      { name: "Circom", icon: TbMathFunction, color: "#A78BFA" },
      { name: "snarkjs", icon: TbMathFunction, color: "#60A5FA" },
    ],
  },
  {
    name: "DBMS",
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
    ],
  },
  {
    name: "DevOps",
    items: [
      { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "CI/CD", icon: SiGithubactions, color: "#2088FF" },
      { name: "Datadog", icon: SiDatadog, color: "#632CA6" },
      { name: "Vercel", icon: SiVercel, color: "#000000" },
    ],
  },
];

export default function TechStack() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6">
      <SectionTitle>Technology &amp; Tools I Use</SectionTitle>

      <div className="space-y-4">
        {categories.map((category, categoryIndex) => (
          <Reveal
            key={category.name}
            y={12}
            delay={categoryIndex * 0.05}
            className="flex flex-col gap-3 rounded-xl border border-soft bg-surface-1 p-4 sm:flex-row sm:items-start sm:gap-6 sm:p-5"
          >
            <div className="flex items-center gap-2 sm:min-w-[120px]">
              <p className="text-label font-semibold uppercase tracking-[0.15em] text-gray-400">
                {category.name}
              </p>
            </div>

            <div className="flex flex-1 flex-wrap gap-2.5">
              {category.items.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="group/chip relative flex items-center gap-2 rounded-lg border border-soft bg-surface-2 px-3 py-2 transition-all duration-base ease-out-soft hover:-translate-y-0.5 hover:border-strong hover:shadow-[0_0_20px_2px_var(--hover-color)]"
                    style={{ "--hover-color": `${tech.color}33` } as React.CSSProperties}
                  >
                    <Icon
                      className="text-base transition-transform duration-base ease-out-soft group-hover/chip:scale-110"
                      style={{ color: tech.color }}
                    />
                    <span className="text-label font-medium tracking-wide text-gray-200 transition-colors duration-base group-hover/chip:text-white">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
