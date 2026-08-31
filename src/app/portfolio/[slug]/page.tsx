"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Code, Shield, Cloud, CheckCircle, Target, Lightbulb, BarChart3 } from "lucide-react";

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string | null;
  category: string;
  techStack: string[];
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  published: boolean;
};

const catLabels: Record<string, string> = {
  FULL_STACK: "Full-Stack",
  CYBERSECURITY: "Security",
  WEB_DEVELOPMENT: "Web Dev",
  SECURITY_OPERATION: "SOC/Operations",
  DEVOPS: "DevOps",
};

const catColors: Record<string, string> = {
  FULL_STACK: "from-cyber-500/30 to-cyber-600/10",
  CYBERSECURITY: "from-emerald-500/30 to-emerald-600/10",
  WEB_DEVELOPMENT: "from-blue-500/30 to-blue-600/10",
  SECURITY_OPERATION: "from-amber-500/30 to-amber-600/10",
  DEVOPS: "from-violet-500/30 to-violet-600/10",
};

const catIcons: Record<string, React.ElementType> = {
  FULL_STACK: Code,
  CYBERSECURITY: Shield,
  WEB_DEVELOPMENT: Code,
  SECURITY_OPERATION: Shield,
  DEVOPS: Cloud,
};

const techDescriptions: Record<string, string> = {
  "Next.js": "React framework for production-grade applications",
  TypeScript: "Type-safe JavaScript for reliable code",
  PostgreSQL: "Advanced open-source relational database",
  Prisma: "Next-generation ORM for Node.js & TypeScript",
  "NextAuth.js": "Authentication for Next.js applications",
  Python: "Versatile programming language for automation & backend",
  Nmap: "Network discovery and security auditing tool",
  Docker: "Containerization platform for consistent deployments",
  "REST API": "Architectural style for distributed systems",
  Stripe: "Payment processing infrastructure",
  Redis: "In-memory data structure store",
  "Tailwind CSS": "Utility-first CSS framework",
  SIEM: "Security Information and Event Management",
  Splunk: "Data analytics and monitoring platform",
  "MITRE ATT&CK": "Knowledge base of adversary tactics",
  AWS: "Amazon Web Services cloud platform",
  Terraform: "Infrastructure as Code tool",
  "GitHub Actions": "CI/CD automation platform",
};

export default function PortfolioDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/projects?slug=${encodeURIComponent(slug)}&all=true`)
      .then((r) => r.json())
      .then((data) => {
        if (data.project) {
          setProject(data.project);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center">
        <div className="text-obsidian-400 text-sm">Loading project...</div>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-obsidian-400 mb-6">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/#projects" className="inline-flex items-center gap-2 text-cyber-400 hover:text-cyber-300 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const Icon = catIcons[project.category] || Code;

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-obsidian-950">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[50vh] min-h-[400px] overflow-hidden"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${catColors[project.category] || "from-obsidian-700/50 to-obsidian-800/50"}`}>
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-transparent" />
        </div>
        <div className="relative h-full section-container flex flex-col justify-end pb-12">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-obsidian-400 hover:text-white transition-colors mb-6 w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="rounded-md bg-white/5 px-3 py-1 text-xs font-medium text-obsidian-300 border border-white/10">
              {catLabels[project.category]}
            </span>
            {project.featured && (
              <span className="rounded-md bg-cyber-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                Featured
              </span>
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 max-w-3xl">{project.title}</h1>
          <p className="text-obsidian-300 text-lg max-w-2xl">{project.description}</p>
        </div>
      </motion.div>

      <div className="section-container max-w-5xl mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Challenge Section */}
            <motion.div {...fadeInUp}>
              <div className="card-glow p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg bg-cyber-600/10 border border-cyber-600/20 p-2">
                    <Target className="h-5 w-5 text-cyber-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Challenge</h2>
                </div>
                <p className="text-obsidian-300 leading-relaxed">
                  {project.content
                    ? project.content.split("\n")[0] || project.description
                    : `The client needed a comprehensive solution for their ${catLabels[project.category]?.toLowerCase() || "technology"} requirements, facing complex challenges that demanded expertise in modern architecture and security best practices.`}
                </p>
              </div>
            </motion.div>

            {/* Solution Section */}
            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="card-glow p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg bg-cyber-600/10 border border-cyber-600/20 p-2">
                    <Lightbulb className="h-5 w-5 text-cyber-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Solution</h2>
                </div>
                {project.content ? (
                  <div className="text-obsidian-300 leading-relaxed whitespace-pre-wrap">
                    {project.content}
                  </div>
                ) : (
                  <p className="text-obsidian-300 leading-relaxed">
                    We designed and implemented a tailored solution leveraging industry-leading technologies. The approach
                    focused on scalability, security, and maintainability — ensuring long-term value for the client&apos;s
                    investment.
                  </p>
                )}
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="card-glow p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg bg-cyber-600/10 border border-cyber-600/20 p-2">
                    <BarChart3 className="h-5 w-5 text-cyber-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Results</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-lg bg-obsidian-800/50 border border-white/5 p-4 text-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">Delivered</p>
                    <p className="text-obsidian-400 text-sm">On schedule</p>
                  </div>
                  <div className="rounded-lg bg-obsidian-800/50 border border-white/5 p-4 text-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">Secure</p>
                    <p className="text-obsidian-400 text-sm">Zero incidents</p>
                  </div>
                  <div className="rounded-lg bg-obsidian-800/50 border border-white/5 p-4 text-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">Scalable</p>
                    <p className="text-obsidian-400 text-sm">Future-proof</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="card-glow p-6">
                <h3 className="text-sm font-semibold text-obsidian-400 uppercase tracking-wider mb-4">Tech Stack</h3>
                <div className="space-y-3">
                  {project.techStack.map((tech) => (
                    <div key={tech} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-cyber-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white font-mono">{tech}</p>
                        {techDescriptions[tech] && (
                          <p className="text-xs text-obsidian-500 mt-0.5">{techDescriptions[tech]}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.25 }}>
              <div className="card-glow p-6 space-y-3">
                <h3 className="text-sm font-semibold text-obsidian-400 uppercase tracking-wider mb-4">Links</h3>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm w-full justify-center"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm w-full justify-center"
                  >
                    <Github className="h-4 w-4" />
                    Source Code
                  </a>
                )}
                {!project.liveUrl && !project.githubUrl && (
                  <p className="text-obsidian-500 text-sm">No external links available</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
