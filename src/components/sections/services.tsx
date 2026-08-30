"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Code, Shield, Terminal, Server } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Full-Stack Web Development",
    description: "Custom web applications built with modern frameworks, optimized for performance, security, and scalability.",
    features: ["Next.js & React Applications", "REST & GraphQL APIs", "E-Commerce Platforms", "Real-time Dashboards"],
    price: "From KES 80,000",
  },
  {
    icon: Shield,
    title: "Cybersecurity Assessments",
    description: "Comprehensive security audits, penetration testing, and vulnerability assessments for enterprise environments.",
    features: ["Penetration Testing", "Vulnerability Assessment", "Security Audits", "Compliance Reporting"],
    price: "From KES 50,000",
  },
  {
    icon: Terminal,
    title: "Security Architecture",
    description: "Design and implementation of secure infrastructure with zero-trust principles and defense-in-depth strategies.",
    features: ["Zero-Trust Design", "RBAC Implementation", "Encryption & Key Management", "SOC Setup"],
    price: "From KES 100,000",
  },
  {
    icon: Server,
    title: "DevOps & Cloud Infrastructure",
    description: "Cloud migration, containerization, CI/CD pipelines, and managed infrastructure with 99.9% uptime guarantees.",
    features: ["AWS & GCP Architecture", "Docker & Kubernetes", "CI/CD Pipelines", "Infrastructure as Code"],
    price: "From KES 60,000",
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16 max-w-2xl">
          <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-cyber-500">Services</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-gradient">What I</span>{" "}
            <span className="text-gradient">Deliver</span>
          </h2>
          <p className="text-lg text-obsidian-400 leading-relaxed">
            End-to-end technical services from concept to deployment — built with security at every layer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-glow p-8 hover:border-white/10 transition-all group">
                <div className="flex items-start gap-5 mb-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyber-600/10 border border-cyber-600/10 group-hover:bg-cyber-600/20 transition-colors">
                    <Icon className="h-5 w-5 text-cyber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{s.title}</h3>
                    <p className="text-sm text-obsidian-400 leading-relaxed">{s.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-obsidian-300">
                      <div className="h-1 w-1 rounded-full bg-cyber-500 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-sm font-semibold text-cyber-400">{s.price}</span>
                  <Link href="/#contact" className="flex items-center gap-1 text-sm text-obsidian-400 hover:text-white transition-colors group/l">
                    Request quote <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/l:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
