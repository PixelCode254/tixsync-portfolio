"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin, MessageCircle, Loader2 } from "lucide-react";
import type { ContactFormData } from "@/lib/validations";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 8000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputClass = "w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-obsidian-600 outline-none transition-colors focus:border-cyber-500/50 focus:ring-1 focus:ring-cyber-500/20";

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-cyber-500">Contact</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="text-gradient">Let&apos;s Build</span>{" "}
              <span className="text-gradient">Something Secure</span>
            </h2>
            <p className="text-lg text-obsidian-400 leading-relaxed mb-10">
              Have a project that needs both engineering excellence and security rigor?
              Let&apos;s discuss how I can help.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: Mail, label: "Email", value: "tixsyncsolutions@gmail.com", href: "mailto:tixsyncsolutions@gmail.com" },
                { icon: Phone, label: "Phone", value: "+254 704 440 164", href: "tel:+254704440164" },
                { icon: MapPin, label: "Location", value: "Nairobi, Kenya", href: null },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyber-600/10 border border-cyber-600/10">
                    <item.icon className="h-4 w-4 text-cyber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-obsidian-500 mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-obsidian-200 hover:text-cyber-400 transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-sm text-obsidian-200">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-obsidian-500">Quick Connect</p>
              <div className="flex gap-3">
                <a href="https://wa.me/254704440164" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-emerald-600/10 border border-emerald-600/20 px-4 py-2.5 text-sm font-medium text-emerald-400 hover:bg-emerald-600/20 transition-all">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a href="mailto:tixsyncsolutions@gmail.com"
                  className="flex items-center gap-2 rounded-lg bg-cyber-600/10 border border-cyber-600/20 px-4 py-2.5 text-sm font-medium text-cyber-400 hover:bg-cyber-600/20 transition-all">
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-obsidian-400">Full Name *</label>
                <input {...register("name", { required: "Required", minLength: { value: 2, message: "Too short" } })}
                  className={inputClass} placeholder="Your name" />
                {errors.name && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.name.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-obsidian-400">Email *</label>
                <input type="email" {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid" } })}
                  className={inputClass} placeholder="your@email.com" />
                {errors.email && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-obsidian-400">Subject</label>
                <input {...register("subject")} className={inputClass} placeholder="Project inquiry" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-obsidian-400">Message *</label>
                <textarea {...register("message", { required: "Required", minLength: { value: 10, message: "At least 10 characters" } })}
                  rows={5} className={`${inputClass} resize-none`} placeholder="Tell me about your project..." />
                {errors.message && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.message.message}</p>}
              </div>

              <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-50">
                {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send Message</>}
              </button>

              {status === "success" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm text-emerald-400">
                  <CheckCircle className="h-4 w-4" /> Message sent! I&apos;ll respond within 24 hours.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" /> Failed to send. Try WhatsApp instead.
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
