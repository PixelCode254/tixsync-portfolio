"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Globe, ExternalLink, ArrowLeft, Lock, AlertTriangle } from "lucide-react";
import Link from "next/link";

const BUSINESS_URL = process.env.NEXT_PUBLIC_BUSINESS_API_URL || "https://tixsync-business-pixelcode254.vercel.app";

const VENTURES: Record<string, {
  name: string;
  description: string;
  url: string;
  icon: typeof Shield;
  accent: string;
  accentBg: string;
  accentBorder: string;
}> = {
  tixsync: {
    name: "TIXSYNC SOLUTIONS",
    description: "Enterprise-grade cybersecurity, web development, and cloud infrastructure.",
    url: BUSINESS_URL,
    icon: Shield,
    accent: "text-brand-400",
    accentBg: "bg-brand-500/10",
    accentBorder: "border-brand-500/20",
  },
  media: {
    name: "TIXSYNC Media",
    description: "Professional photography, videography, and visual storytelling.",
    url: BUSINESS_URL,
    icon: Globe,
    accent: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/20",
  },
};

export default function VentureBridge({ slug }: { slug: string }) {
  const [countdown, setCountdown] = useState(5);
  const [allowed, setAllowed] = useState(false);
  const venture = VENTURES[slug];

  useEffect(() => {
    if (!venture) return;
    if (countdown <= 0) {
      setAllowed(true);
      window.location.href = venture.url;
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, venture]);

  const handleProceed = () => {
    if (venture) {
      window.location.href = venture.url;
    }
  };

  if (!venture) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertTriangle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Venture Not Found</h1>
          <p className="text-obsidian-400 mb-6">This venture bridge does not exist.</p>
          <Link href="/" className="btn-primary">Return Home</Link>
        </div>
      </div>
    );
  }

  const Icon = venture.icon;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md">
        <div className="card-glow p-8 text-center">
          <div className="mb-6">
            <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${venture.accentBg} border ${venture.accentBorder}`}>
              <Icon className={`h-8 w-8 ${venture.accent}`} />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">{venture.name}</h1>
            <p className="text-sm text-obsidian-400">{venture.description}</p>
          </div>

          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="h-4 w-4 text-obsidian-500" />
              <span className="text-xs font-medium text-obsidian-400">Secure External Redirect</span>
            </div>
            <p className="text-xs text-obsidian-600">
              You are about to leave Cornelius Maina&apos;s portfolio and be redirected to an external domain.
              This redirect is secured with <span className="text-cyber-400">noopener noreferrer</span> policies.
            </p>
          </div>

          <div className="mb-6">
            <p className="text-xs text-obsidian-500 mb-2">Redirecting in {countdown} seconds...</p>
            <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full bg-cyber-500 rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={handleProceed} className="btn-primary w-full justify-center">
              <ExternalLink className="h-4 w-4" />
              Proceed to {venture.name}
            </button>
            <Link href="/" className="btn-outline w-full justify-center">
              <ArrowLeft className="h-4 w-4" />
              Stay on Portfolio
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
