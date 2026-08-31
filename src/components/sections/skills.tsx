"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "Next.js / React", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML/CSS/JS", level: 95 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js / Express", level: 90 },
      { name: "Python", level: 82 },
      { name: "PostgreSQL", level: 88 },
      { name: "Prisma ORM", level: 85 },
      { name: "REST / GraphQL", level: 88 },
    ],
  },
  {
    name: "Security",
    skills: [
      { name: "Penetration Testing", level: 85 },
      { name: "Vulnerability Assessment", level: 88 },
      { name: "Network Security", level: 82 },
      { name: "SOC Analysis", level: 78 },
      { name: "Compliance (ISO/NIST)", level: 75 },
    ],
  },
  {
    name: "DevOps & Cloud",
    skills: [
      { name: "AWS", level: 80 },
      { name: "Docker", level: 85 },
      { name: "CI/CD Pipelines", level: 82 },
      { name: "Linux Admin", level: 80 },
      { name: "Git / GitHub", level: 92 },
    ],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-obsidian-900/20">
      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16 max-w-2xl">
          <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-cyber-500">Skills</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Technical</span>{" "}
            <span className="text-gradient">Proficiency</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, ci) => (
            <motion.div key={cat.name} initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="card-glow p-6">
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">{cat.name}</h3>
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-obsidian-300">{skill.name}</span>
                      <span className="text-xs font-mono text-cyber-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: ci * 0.1 + si * 0.05, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-cyber-500 to-cyber-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
