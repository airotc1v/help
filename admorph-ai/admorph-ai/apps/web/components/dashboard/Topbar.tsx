"use client";
import React from "react";
import { Bell, Search, User } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="h-14 border-b border-am-border bg-am-surface/80 backdrop-blur-sm flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
      <div>
        <h1 className="font-display text-xl tracking-wide text-am-text">{title}</h1>
        {subtitle && <p className="text-am-muted text-xs font-mono">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 bg-am-panel border border-am-border rounded px-3 py-1.5 text-sm text-am-muted hover:border-am-border-bright transition-colors cursor-text w-48">
          <Search size={13} />
          <span className="text-xs">Search…</span>
          <kbd className="ml-auto text-xs bg-am-border px-1 rounded font-mono">⌘K</kbd>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded hover:bg-am-panel border border-transparent hover:border-am-border transition-all">
          <Bell size={16} className="text-am-muted" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-am-amber rounded-full animate-pulse-amber" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 pl-2 border-l border-am-border">
          <div className="w-7 h-7 rounded-full bg-am-amber/20 border border-am-amber/30 flex items-center justify-center">
            <User size={13} className="text-am-amber" />
          </div>
          <div className="text-left hidden md:block">
            <p className="text-xs text-am-text font-medium">Alex Chen</p>
            <p className="text-xs text-am-muted font-mono">Studio Dev</p>
          </div>
        </button>
      </div>
    </header>
  );
}
