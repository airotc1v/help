"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  Upload,
  Layers,
  ShoppingBag,
  BarChart3,
  Settings,
  Bell,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const devNav: NavItem[] = [
  { label: "Dashboard", href: "/developer", icon: <LayoutDashboard size={16} /> },
  { label: "Upload Game", href: "/developer/upload", icon: <Upload size={16} /> },
  { label: "Placements", href: "/developer/placements", icon: <Layers size={16} />, badge: 3 },
  { label: "Analytics", href: "/developer/analytics", icon: <BarChart3 size={16} /> },
];

const sponsorNav: NavItem[] = [
  { label: "Dashboard", href: "/sponsor", icon: <LayoutDashboard size={16} /> },
  { label: "Marketplace", href: "/sponsor/marketplace", icon: <ShoppingBag size={16} /> },
  { label: "Active Bids", href: "/sponsor/bids", icon: <Zap size={16} />, badge: 4 },
  { label: "Analytics", href: "/sponsor/analytics", icon: <BarChart3 size={16} /> },
];

interface SidebarProps {
  role: "developer" | "sponsor";
  onRoleToggle: () => void;
}

export function Sidebar({ role, onRoleToggle }: SidebarProps) {
  const router = useRouter();
  const nav = role === "developer" ? devNav : sponsorNav;
  const roleLabel = role === "developer" ? "Game Studio" : "Brand / Sponsor";

  return (
    <aside className="w-60 min-h-screen bg-am-surface border-r border-am-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-am-border">
        <Logo />
        <p className="text-am-muted text-xs font-mono mt-1">Native Ad Exchange</p>
      </div>

      {/* Role toggle */}
      <div className="px-4 py-3 border-b border-am-border">
        <button
          onClick={onRoleToggle}
          className="w-full flex items-center justify-between px-3 py-2 rounded bg-am-panel border border-am-border hover:border-am-amber/50 transition-all text-sm group"
        >
          <div className="text-left">
            <p className="text-am-muted text-xs font-mono">Viewing as</p>
            <p className="text-am-text font-medium">{roleLabel}</p>
          </div>
          <ChevronRight size={14} className="text-am-muted group-hover:text-am-amber transition-colors" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded text-sm transition-all duration-150 group",
                isActive
                  ? "bg-am-amber/10 text-am-amber border border-am-amber/20"
                  : "text-am-muted hover:text-am-text hover:bg-am-panel"
              )}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? "text-am-amber" : "text-am-subtle group-hover:text-am-muted"}>
                  {item.icon}
                </span>
                {item.label}
              </div>
              {item.badge != null && (
                <span className="bg-am-amber text-am-black text-xs font-mono font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-1 border-t border-am-border pt-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-am-muted hover:text-am-text hover:bg-am-panel transition-all"
        >
          <Settings size={16} />
          Settings
        </Link>

        {/* Integration status */}
        <div className="mt-3 px-3 py-3 rounded bg-am-panel border border-am-border">
          <p className="text-am-muted text-xs font-mono mb-2 uppercase tracking-wider">Integrations</p>
          <div className="space-y-1.5">
            {[
              { name: "Cloudinary", ok: true },
              { name: "Pingram", ok: true },
              { name: "Composio", ok: false },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="text-xs text-am-muted">{s.name}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${s.ok ? "bg-am-green" : "bg-am-red"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
