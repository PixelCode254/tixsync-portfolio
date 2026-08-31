"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    type: "work" as const,
    title: "Founder & Lead Engineer",
    company: "TIXSYNC SOLUTIONS",
    period: "2024 — Present",
    description: "Founded enterprise digital solutions company. Leading web development, cybersecurity consulting, and cloud infrastructure projects for clients across Africa.",
    tags: ["Leadership", "Full-Stack", "Cybersecurity", "Cloud"],
  },
  {
    type: "work" as const,
    title: "Full-Stack Developer",
    company: "Freelance / Contract",
    period: "2022 — 2024",
    description: "Built scalable web applications, REST APIs, and real-time dashboards for startups and SMEs. Specialized in Next.js, TypeScript, and PostgreSQL.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "React"],
  },
  {
    type: "education" as const,
    title: "BSc Computer Science",
    company: "University",
    period: "2019 — 2023",
    description: "Focused on software engineering, network security, and database systems. Graduated with distinction.",
    tags: ["Computer Science", "Networking", "Security"],
  },
  {
    type: "cert" as const,
    title: "Penetration Testing & Security",
    company: "Professional Development",
    period: "2023 — Present",
    description: "Ongoing professional development in offensive security, vulnerability assessment, and compliance frameworks (ISO 27001, PCI-DSS, NIST).",
    tags: ["Pen Testing", "ISO 27001", "PCI-DSS"],
  },
];

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
  cert: GraduationCap,
};

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding">
      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16 max-w-2xl">
          <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-cyber-500">Experience</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-gradient">My</span>{" "}
            <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-lg text-obsidian-400 leading-relaxed">
            A timeline of my professional experience, education, and continuous growth in technology and security.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-500/50 via-cyber-500/20 to-transparent" />
          
          <div className="space-y-8">
            {experiences.map((exp, i) => {
              const Icon = iconMap[exp.type];
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={exp.title} initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  
                  <div className="hidden md:block md:w-1/2" />
                  
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-obsidian-950 border-2 border-cyber-500/50 flex items-center justify-center z-10">
                    <Icon className="h-3.5 w-3.5 text-cyber-400" />
                  </div>

                  <div className="md:w-1/2 ml-12 md:ml-0">
                    <div className="card-glow p-6 hover:border-white/10 transition-all">
                      <span className="text-xs font-mono text-cyber-500 mb-2 block">{exp.period}</span>
                      <h3 className="text-lg font-semibold text-white mb-1">{exp.title}</h3>
                      <p className="text-sm text-obsidian-400 mb-3">{exp.company}</p>
                      <p className="text-sm text-obsidian-400 leading-relaxed mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map(t => (
                          <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-[10px] text-obsidian-400 font-mono">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
