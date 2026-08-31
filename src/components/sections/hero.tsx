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
          <motion.div variants={item} className="relative shrink-0 -mt-16 lg:-mt-20">
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

            <motion.div variants={item} className="flex gap-3 mt-6 justify-center lg:justify-start">
              <a href="https://github.com/PixelCode254" target="_blank" rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 text-obsidian-500 hover:border-obsidian-400/30 hover:text-white transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com/in/corneliusmaina" target="_blank" rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 text-obsidian-500 hover:border-[#0077b5]/30 hover:text-[#0077b5] transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://wa.me/254704440164?text=Hi%20Cornelius%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank" rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 text-obsidian-500 hover:border-[#25D366]/30 hover:text-[#25D366] transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
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
