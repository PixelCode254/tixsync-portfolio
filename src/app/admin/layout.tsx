"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, MessageSquare, LogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderOpen,
  },
  {
    label: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-white/5 bg-obsidian-950/80 backdrop-blur-xl z-40">
        <div className="flex h-full flex-col">
          <div className="p-6 border-b border-white/5">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyber-600/10 border border-cyber-600/20">
                <span className="font-mono text-xs font-bold text-cyber-400">
                  T
                </span>
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">
                  TIXSYNC
                </span>
                <span className="text-[10px] text-obsidian-600 uppercase tracking-wider">
                  Admin Panel
                </span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/admin" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-cyber-600/10 text-cyber-400 border border-cyber-600/20"
                      : "text-obsidian-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5">
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-obsidian-400 transition-all hover:text-red-400 hover:bg-red-500/5"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
