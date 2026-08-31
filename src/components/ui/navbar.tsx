"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, Shield, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Experience", href: "/#experience" },
  { label: "Ventures", href: "/#ventures" },
  { label: "Portfolio", href: "/#projects" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn("glass-nav transition-all duration-300", isScrolled ? "py-3" : "py-5")}>
      <nav className="section-container flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyber-600/10 border border-cyber-600/20 transition-colors group-hover:bg-cyber-600/20">
            <span className="font-mono text-sm font-bold text-cyber-400">CM</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-white">Cornelius Maina</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-obsidian-500">Full-Stack & Security</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-obsidian-400 transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://wa.me/254704440164?text=Hi%20Cornelius%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20you."
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-emerald-600/20 bg-emerald-600/5 px-4 py-2 text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-600/10 hover:border-emerald-600/30">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <Link href="/#contact" className="btn-primary text-sm">Let&apos;s Talk</Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-obsidian-400 hover:text-white transition-colors" aria-label="Toggle menu">
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-obsidian-950/95 backdrop-blur-xl">
            <div className="section-container py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-obsidian-300 transition-colors hover:bg-white/5 hover:text-white">
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                <a href="https://wa.me/254704440164?text=Hi%20Cornelius%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20you."
                  target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-emerald-600/20 bg-emerald-600/5 px-4 py-3 text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-600/10">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <Link href="/#contact" onClick={() => setIsMobileOpen(false)}
                  className="btn-primary w-full justify-center">
                  Let&apos;s Talk
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
