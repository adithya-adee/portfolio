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
} from "react-icons/si";

export default function TechStack() {
  const categories = [
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
        // { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
        { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
        { name: "Kafka", icon: SiApachekafka, color: "#231F20" },
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
        { name: "Redis", icon: SiRedis, color: "#DC382D" },
        { name: "Docker", icon: SiDocker, color: "#2496ED" },
        { name: "CI/CD", icon: SiGithubactions, color: "#2088FF" },
        { name: "Datadog", icon: SiDatadog, color: "#632CA6" },
        { name: "Vercel", icon: SiVercel, color: "#000000" },
      ],
    },
  ];

  return (
    <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h2 className="mb-4 text-sm font-medium text-gray-400">Technology & Tools I Use</h2>

      <div className="space-y-4">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="flex items-start gap-4">
            {/* Category Label */}
            <p className="min-w-[80px] pt-2 text-xs uppercase tracking-wider text-gray-500">
              {category.name}
            </p>

            {/* Tech Items */}
            <div className="flex flex-1 flex-wrap gap-2">
              {category.items.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 rounded-md border border-neutral-800/50 bg-neutral-900/30 px-3 py-2"
                  >
                    <Icon className="text-base" style={{ color: tech.color }} />
                    <span className="text-sm font-medium text-gray-300">{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
