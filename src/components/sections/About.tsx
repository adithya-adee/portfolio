"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">About me</h2>
      <div className="space-y-4 text-gray-300">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hello! I&apos;m Adithya A, a web developer skilled in full-stack
          JavaScript. During my 4-month MERN internship at YHills, I enhanced
          web applications, reducing page load times by 35% with SSR and
          increasing user interaction efficiency by 25% through React Context
          and Reducer.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          I&apos;m experienced in secure JWT authentication, leading code
          reviews, and using Git for version control. I specialize in building
          scalable applications with Next.js, NestJS, and Neon (PostgreSQL), and
          have implemented secure Role-Based Access Control (RBAC) with
          Passport.js, Clerk, Auth.js, and Prisma ORM.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          I am currently seeking a summer internship to further develop
          user-centric web experiences. Now delving into the world of WEB3.
        </motion.p>
      </div>
    </div>
  );
}
