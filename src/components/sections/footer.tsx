import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, MessageCircle, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="section-container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyber-600/10 border border-cyber-600/20">
                <span className="font-mono text-xs font-bold text-cyber-400">CM</span>
              </div>
              <span className="text-sm font-semibold text-white">Cornelius Maina Nyaga</span>
            </div>
            <p className="text-xs text-obsidian-600">
              &copy; {new Date().getFullYear()} Full-Stack Developer & Security Engineer. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com/PixelCode254", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/corneliusmaina", label: "LinkedIn" },
              { icon: Twitter, href: "https://twitter.com/corneliusmaina", label: "Twitter" },
              { icon: MessageCircle, href: "https://wa.me/254704440164", label: "WhatsApp" },
              { icon: Mail, href: "mailto:tixsyncsolutions@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 text-obsidian-500 transition-all hover:border-white/10 hover:text-white hover:bg-white/5">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
