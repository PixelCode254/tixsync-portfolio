"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Code, Terminal, Lock } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-cyber-600/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-cyber-800/5 blur-[120px]" />
      </div>

      <div className="section-container relative z-10 pt-32 pb-20">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Photo */}
          <motion.div variants={item} className="relative shrink-0 -mt-8">
            <div className="relative w-72 h-80 sm:w-80 sm:h-[22rem] lg:w-96 lg:h-[26rem] rounded-2xl overflow-hidden border-2 border-cyber-500/30 shadow-2xl shadow-cyber-500/10">
              <Image
                src="/images/Profile.jpg"
                alt="Cornelius Maina Nyaga"
                fill
                className="object-top"
                priority
              />
            </div>
            <div className="absolute -bottom-3 -right-3 rounded-xl border border-white/10 bg-obsidian-900/90 backdrop-blur-sm px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyber-500" />
                </span>
                <span className="text-xs font-medium text-cyber-400">Available for Projects</span>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="max-w-2xl text-center lg:text-left">
            <motion.div variants={item} className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyber-600/20 bg-cyber-600/5 px-4 py-1.5">
                <span className="text-xs font-medium text-cyber-400">Full-Stack Developer & Cybersecurity Expert</span>
              </div>
            </motion.div>

            <motion.h1 variants={item} className="mb-6">
              <span className="block font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                <span className="text-gradient">Building Secure,</span>
                <br />
                <span className="text-gradient">Scalable Systems</span>
              </span>
            </motion.h1>

            <motion.p variants={item} className="mb-4 max-w-2xl text-lg sm:text-xl text-obsidian-400 leading-relaxed">
              I&apos;m <span className="text-white font-medium">Cornelius Maina Nyaga</span> — a{" "}
              <span className="text-cyber-400 font-medium">Full-Stack Developer</span> &{" "}
              <span className="text-cyber-400 font-medium">Security Engineer</span>{" "}
              building enterprise-grade applications and defending digital infrastructure for clients worldwide.
            </motion.p>

            <motion.p variants={item} className="mb-10 max-w-2xl text-sm text-obsidian-500 leading-relaxed">
              Founder of <span className="text-obsidian-300 font-medium">TIXSYNC SOLUTIONS</span> and{" "}
              <span className="text-obsidian-300 font-medium">TIXSYNC Media</span>. Based in Kenya, serving clients globally.
              Specializing in React, Next.js, Node.js, Python, Cybersecurity, Cloud Architecture, and DevOps.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 mb-16 justify-center lg:justify-start">
              <Link href="/#projects" className="btn-primary group">
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/#contact" className="btn-outline">
                Get in Touch
              </Link>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {[
                { icon: Code, label: "Full-Stack Development" },
                { icon: Shield, label: "Cybersecurity" },
                { icon: Terminal, label: "Penetration Testing" },
                { icon: Lock, label: "Security Architecture" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2.5">
                  <Icon className="h-4 w-4 text-obsidian-500" />
                  <span className="text-sm text-obsidian-300">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-obsidian-600">Scroll</span>
            <div className="h-10 w-px bg-gradient-to-b from-obsidian-600 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
