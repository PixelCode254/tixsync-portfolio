"use client";

import { useEffect, useState } from "react";
import { FolderOpen, MessageSquare, Users, TrendingUp, BookOpen } from "lucide-react";
import Link from "next/link";

type Stats = {
  projects: number;
  messages: number;
  unread: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, messages: 0, unread: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/projects?all=true").then((r) => r.json()),
      fetch("/api/contact").then((r) => r.json()),
    ]).then(([projectsData, messagesData]) => {
      setStats({
        projects: projectsData.projects?.length || 0,
        messages: messagesData.pagination?.total || 0,
        unread: messagesData.messages?.filter((m: any) => !m.read).length || 0,
      });
    });
  }, []);

  const cards = [
    {
      label: "Total Projects",
      value: stats.projects,
      icon: FolderOpen,
      href: "/admin/projects",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Messages",
      value: stats.messages,
      icon: MessageSquare,
      href: "/admin/messages",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Unread Messages",
      value: stats.unread,
      icon: MessageSquare,
      href: "/admin/messages?filter=unread",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Blog Posts",
      value: "—",
      icon: BookOpen,
      href: "/admin/blog",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-obsidian-500 mt-1">
          Welcome back, Cornelius. Here&apos;s your portfolio overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="card-glow group p-6 transition-all hover:border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.bg}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <TrendingUp className="h-4 w-4 text-obsidian-600 group-hover:text-obsidian-400 transition-colors" />
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
            <p className="text-sm text-obsidian-500">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="card-glow p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/projects" className="btn-primary text-sm">
            <FolderOpen className="h-4 w-4" />
            Manage Projects
          </Link>
          <Link href="/admin/messages" className="btn-outline text-sm">
            <MessageSquare className="h-4 w-4" />
            View Messages
          </Link>
          <Link href="/admin/blog" className="btn-primary text-sm">
            <BookOpen className="h-4 w-4" />
            Manage Blog
          </Link>
          <Link href="/" className="btn-outline text-sm">
            View Live Site
          </Link>
        </div>
      </div>
    </div>
  );
}
