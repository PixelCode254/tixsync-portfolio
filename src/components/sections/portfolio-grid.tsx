"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Shield, Code, Cloud, Lock, Briefcase } from "lucide-react";

type Project = {
  id: string; title: string; slug: string; description: string;
  category: string; techStack: string[]; imageUrl: string | null;
  liveUrl: string | null; githubUrl: string | null; featured: boolean;
};

const catIcons: Record<string, React.ElementType> = {
  FULL_STACK: Code, CYBERSECURITY: Shield, WEB_DEVELOPMENT: Code,
  SECURITY_OPERATION: Shield, DEVOPS: Cloud,
};
const catLabels: Record<string, string> = {
  FULL_STACK: "Full-Stack", CYBERSECURITY: "Security",
  WEB_DEVELOPMENT: "Web Dev", SECURITY_OPERATION: "SOC/Operations", DEVOPS: "DevOps",
};
const catColors: Record<string, string> = {
  FULL_STACK: "from-cyber-500/20 to-cyber-600/5",
  CYBERSECURITY: "from-emerald-500/20 to-emerald-600/5",
  WEB_DEVELOPMENT: "from-blue-500/20 to-blue-600/5",
  SECURITY_OPERATION: "from-amber-500/20 to-amber-600/5",
  DEVOPS: "from-violet-500/20 to-violet-600/5",
};

const allCategories = ["All", "Full-Stack", "Security", "Web Dev", "SOC/Operations", "DevOps"];

const fallback: Project[] = [
  { id: "1", title: "TIXSYNC Secure Portal", slug: "tixsync-secure-portal", description: "Enterprise-grade secure web application featuring end-to-end encryption, role-based access control, and real-time threat monitoring dashboard.", category: "FULL_STACK", techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth.js"], imageUrl: null, liveUrl: null, githubUrl: null, featured: true },
  { id: "2", title: "CyberShield Vulnerability Scanner", slug: "cybershield-scanner", description: "Automated security assessment tool for identifying and reporting vulnerabilities in web applications and network infrastructure.", category: "CYBERSECURITY", techStack: ["Python", "Nmap", "Docker", "REST API"], imageUrl: null, liveUrl: null, githubUrl: null, featured: true },
  { id: "3", title: "SecureE-Com Platform", slug: "secure-ecommerce", description: "Full-stack e-commerce platform with PCI-DSS compliant payment processing, automated inventory management, and fraud detection.", category: "WEB_DEVELOPMENT", techStack: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Tailwind CSS"], imageUrl: null, liveUrl: null, githubUrl: null, featured: true },
];

export function PortfolioGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [projects, setProjects] = useState<Project[]>(fallback);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/projects").then(r => r.json()).then(d => {
      if (d.projects?.length) setProjects(d.projects);
    }).catch(() => {});
  }, []);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter(p => catLabels[p.category] === activeCategory);

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16 flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-cyber-500">Portfolio</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-gradient">Featured</span>{" "}
              <span className="text-gradient">Projects</span>
            </h2>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          {allCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-cyber-600/10 text-cyber-400 border border-cyber-600/20"
                  : "text-obsidian-400 hover:text-white border border-white/5 hover:border-white/10"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => {
            const Icon = catIcons[p.category] || Code;
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }} className="group">
                <Link href={`/portfolio/${p.slug}`} className="block h-full">
                  <div className="card-glow h-full hover:border-white/10 transition-all">
                    <div className={`relative h-48 rounded-t-xl bg-gradient-to-br ${catColors[p.category] || "from-obsidian-700/50 to-obsidian-800/50"} flex items-center justify-center`}>
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.title} className="absolute inset-0 w-full h-full object-cover rounded-t-xl" />
                      ) : (
                        <Icon className="h-10 w-10 text-white/30" />
                      )}
                      {p.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="rounded-md bg-cyber-600/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">Featured</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="rounded-md bg-cyber-600/10 border border-cyber-600/20 px-2.5 py-0.5 text-[11px] font-medium text-cyber-400">{catLabels[p.category]}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyber-300 transition-colors">{p.title}</h3>
                      <p className="text-sm text-obsidian-400 leading-relaxed mb-3">{p.description.slice(0, 100)}{p.description.length > 100 ? "..." : ""}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.techStack.slice(0, 4).map(t => (
                          <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-obsidian-400 font-mono">{t}</span>
                        ))}
                        {p.techStack.length > 4 && (
                          <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-obsidian-500">+{p.techStack.length - 4}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {p.liveUrl && (
                          <span className="flex items-center gap-1 text-sm text-cyber-400 hover:text-cyber-300 transition-colors">
                            <ExternalLink className="h-3.5 w-3.5" /> Live
                          </span>
                        )}
                        {p.githubUrl && (
                          <span className="flex items-center gap-1 text-sm text-obsidian-400 hover:text-white transition-colors">
                            Source
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
