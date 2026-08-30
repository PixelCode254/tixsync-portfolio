"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Shield, Globe, Users, Lock, Loader2 } from "lucide-react";
import { ventureApi } from "@/lib/venture-client";

type VentureStats = {
  services: number;
  projects: number;
  teamMembers: number;
};

const ventures = [
  {
    name: "TIXSYNC SOLUTIONS",
    tagline: "Enterprise Digital Solutions",
    description: "A full-service enterprise technology firm specializing in cybersecurity, web development, and cloud infrastructure for businesses across Africa. I founded and built this company to deliver enterprise-grade security and digital transformation at scale.",
    role: "Founder & CEO",
    icon: Shield,
    color: "from-brand-500/20 to-brand-600/5",
    accent: "text-brand-400",
    accentBg: "bg-brand-500/10",
    accentBorder: "border-brand-500/20",
    linkLabel: "Visit TIXSYNC SOLUTIONS",
    bridgePath: "/ventures/tixsync",
    capabilities: ["Penetration Testing", "SOC Operations", "Web Development", "Cloud Migration", "Digital Transformation", "Compliance (ISO 27001)"],
  },
  {
    name: "TIXSYNC Media",
    tagline: "Creative Production Studio",
    description: "The creative arm of TIXSYNC SOLUTIONS — professional photography, videography, and visual storytelling for brands, events, and corporate campaigns across Kenya.",
    role: "Creative Director",
    icon: Globe,
    color: "from-emerald-500/20 to-emerald-600/5",
    accent: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/20",
    linkLabel: "Explore TIXSYNC Media",
    bridgePath: "/ventures/media",
    capabilities: ["Corporate Photography", "Event Videography", "Brand Identity", "Drone Cinematography", "Post-Production", "Visual Strategy"],
  },
];

export function FeaturedVentures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [liveStats, setLiveStats] = useState<VentureStats | null>(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    async function fetchLiveStats() {
      const [servicesRes, projectsRes, teamRes] = await Promise.allSettled([
        ventureApi.getServices(),
        ventureApi.getProjects(),
        ventureApi.getTeam(),
      ]);

      const services = servicesRes.status === "fulfilled" ? servicesRes.value.data?.services?.length || 0 : 0;
      const projects = projectsRes.status === "fulfilled" ? projectsRes.value.data?.projects?.length || 0 : 0;
      const teamMembers = teamRes.status === "fulfilled" ? teamRes.value.data?.members?.length || 0 : 0;

      if (services || projects || teamMembers) {
        setLiveStats({ services, projects, teamMembers });
      } else {
        setFetchError(true);
      }
    }

    fetchLiveStats();
  }, []);

  return (
    <section id="ventures" className="section-padding bg-obsidian-900/20">
      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16 max-w-2xl">
          <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-cyber-500">Featured Ventures</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Organizations</span>{" "}
            <span className="text-gradient">I&apos;ve Built</span>
          </h2>
          <p className="text-lg text-obsidian-400 leading-relaxed">
            Beyond individual projects, I&apos;ve founded and architected organizations that deliver
            technology at scale across Africa.
          </p>
        </motion.div>

        <div className="space-y-6">
          {ventures.map((v, i) => (
            <motion.div key={v.name} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="card-glow hover:border-white/10 transition-all overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left: Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${v.accentBg} border ${v.accentBorder}`}>
                        <v.icon className={`h-5 w-5 ${v.accent}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{v.name}</h3>
                        <p className="text-xs text-obsidian-500 uppercase tracking-wider">{v.tagline}</p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 mb-4">
                      <Users className="h-3 w-3 text-obsidian-500" />
                      <span className="text-xs text-obsidian-400">{v.role}</span>
                    </div>

                    <p className="text-sm text-obsidian-400 leading-relaxed mb-6">{v.description}</p>

                    {/* Live Stats from Business API */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      {liveStats ? (
                        <>
                          <div className="text-center">
                            <p className={`text-lg font-bold ${v.accent}`}>{liveStats.services}+</p>
                            <p className="text-[10px] text-obsidian-500 uppercase tracking-wider">Services</p>
                          </div>
                          <div className="text-center">
                            <p className={`text-lg font-bold ${v.accent}`}>{liveStats.projects}+</p>
                            <p className="text-[10px] text-obsidian-500 uppercase tracking-wider">Projects</p>
                          </div>
                          <div className="text-center">
                            <p className={`text-lg font-bold ${v.accent}`}>{liveStats.teamMembers}</p>
                            <p className="text-[10px] text-obsidian-500 uppercase tracking-wider">Team</p>
                          </div>
                        </>
                      ) : fetchError ? (
                        // Fallback static stats
                        <>
                          <div className="text-center">
                            <p className={`text-lg font-bold ${v.accent}`}>80+</p>
                            <p className="text-[10px] text-obsidian-500 uppercase tracking-wider">Clients</p>
                          </div>
                          <div className="text-center">
                            <p className={`text-lg font-bold ${v.accent}`}>150+</p>
                            <p className="text-[10px] text-obsidian-500 uppercase tracking-wider">Audits</p>
                          </div>
                          <div className="text-center">
                            <p className={`text-lg font-bold ${v.accent}`}>99.9%</p>
                            <p className="text-[10px] text-obsidian-500 uppercase tracking-wider">Uptime</p>
                          </div>
                        </>
                      ) : (
                        // Loading state
                        <div className="flex items-center gap-2 text-obsidian-500">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-xs">Loading live stats...</span>
                        </div>
                      )}
                    </div>

                    {/* Capabilities */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {v.capabilities.map(c => (
                        <span key={c} className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] text-obsidian-400 font-mono">{c}</span>
                      ))}
                    </div>
                  </div>

                  {/* Right: CTA Bridge */}
                  <div className="lg:w-64 shrink-0">
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center">
                      <Lock className="h-6 w-6 text-obsidian-600 mx-auto mb-3" />
                      <p className="text-sm font-medium text-white mb-1">Live Platform</p>
                      <p className="text-xs text-obsidian-500 mb-4">Secure external redirect to the TIXSYNC domain</p>
                      <Link href={v.bridgePath}
                        className={`inline-flex items-center gap-2 rounded-lg border ${v.accentBorder} ${v.accentBg} px-5 py-2.5 text-sm font-medium ${v.accent} transition-all hover:opacity-80`}>
                        {v.linkLabel}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
