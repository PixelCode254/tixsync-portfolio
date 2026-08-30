"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Code, Database, Cloud, Lock, Server, Globe, Award } from "lucide-react";

const expertise = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "End-to-end application development with Next.js, TypeScript, React, Node.js, and PostgreSQL. From architecture to deployment.",
    tech: ["Next.js", "TypeScript", "React", "Node.js", "Tailwind CSS"],
  },
  {
    icon: Shield,
    title: "Cybersecurity Engineering",
    description: "Security assessments, penetration testing, vulnerability management, and compliance frameworks for enterprise environments.",
    tech: ["Pen Testing", "SOC Analysis", "ISO 27001", "PCI-DSS", "NIST"],
  },
  {
    icon: Lock,
    title: "Security Architecture",
    description: "Designing defense-in-depth systems with zero-trust principles, RBAC, encryption, and real-time threat monitoring.",
    tech: ["Zero Trust", "RBAC", "Encryption", "SIEM", "WAF"],
  },
  {
    icon: Database,
    title: "Backend & Infrastructure",
    description: "Robust API design, database optimization, cloud infrastructure, and CI/CD pipelines for scalable systems.",
    tech: ["PostgreSQL", "Prisma", "Docker", "AWS", "Redis"],
  },
];

const credentials = [
  { icon: Award, label: "KINAPSA Secretary General", desc: "Kenya National Police Service Association" },
  { icon: Award, label: "Peace Champion", desc: "Certified community peace-building advocate" },
  { icon: Server, label: "PostgreSQL & Linux", desc: "Database administration & server management" },
  { icon: Globe, label: "Public Participation", desc: "Certified by Commission on Administrative Justice" },
  { icon: Cloud, label: "Cloud & DevOps", desc: "AWS, Docker, CI/CD pipeline architecture" },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="expertise" className="section-padding">
      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16 max-w-2xl">
          <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-cyber-500">Expertise</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Technical</span>{" "}
            <span className="text-gradient">Capabilities</span>
          </h2>
          <p className="text-lg text-obsidian-400 leading-relaxed">
            Combining deep software engineering skills with offensive security expertise to build systems that are
            both powerful and resilient.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {expertise.map((e, i) => (
            <motion.div key={e.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glow p-8 hover:border-white/10 transition-all group">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyber-600/10 border border-cyber-600/10 group-hover:bg-cyber-600/20 transition-colors">
                  <e.icon className="h-5 w-5 text-cyber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{e.title}</h3>
                  <p className="text-sm text-obsidian-400 leading-relaxed">{e.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {e.tech.map(t => (
                  <span key={t} className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] text-obsidian-400 font-mono">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}>
          <h3 className="text-lg font-semibold text-white mb-6">Credentials & Leadership</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {credentials.map(c => (
              <div key={c.label} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
                <c.icon className="h-4 w-4 text-cyber-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">{c.label}</p>
                  <p className="text-xs text-obsidian-500">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
