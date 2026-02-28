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
    <section className="mx-auto max-w-3xl px-4 sm:px-6">
      <h2 className="mb-4 border-l-2 border-emerald-500/50 pl-3 text-xl font-medium tracking-wide text-gray-300 sm:text-2xl">
        Technology & Tools I Use
      </h2>

      <div className="space-y-3 sm:space-y-4">
        {categories.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6"
          >
            {/* Category Label */}
            <p className="min-w-[100px] text-sm font-medium uppercase tracking-[0.15em] text-gray-500">
              {category.name}
            </p>

            {/* Tech Items */}
            <div className="flex flex-1 flex-wrap gap-3">
              {category.items.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="group relative flex items-center gap-2.5 rounded-md border border-neutral-700/40 bg-neutral-800/50 px-3 py-2.5 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-neutral-600/60 hover:shadow-[0_0_20px_2px_var(--hover-color)] sm:px-4"
                    style={{ "--hover-color": `${tech.color}40` } as React.CSSProperties}
                  >
                    <Icon
                      className="text-base transition-all duration-300 group-hover:scale-110"
                      style={{ color: tech.color }}
                    />
                    <span className="text-sm font-medium tracking-wide text-gray-300 transition-colors duration-300 group-hover:text-white">
                      {tech.name}
                    </span>
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
