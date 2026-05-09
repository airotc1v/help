"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Shield, TrendingUp, ChevronRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const TAGLINE_WORDS = ["one", "infinite"];

export default function Home() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % TAGLINE_WORDS.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-am-black flex flex-col overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-am-amber/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-am-border/50">
        <Logo size="md" />
        <div className="flex items-center gap-4">
          <Link href="/developer" className="am-btn-ghost">
            Developer Portal <ChevronRight size={14} />
          </Link>
          <Link href="/sponsor" className="am-btn-primary">
            Sponsor Portal <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center py-24 gap-8">
        {/* Badge */}
        <div className="flex items-center gap-2 bg-am-amber/10 border border-am-amber/30 rounded-full px-4 py-1.5 text-am-amber text-sm font-mono">
          <span className="w-2 h-2 rounded-full bg-am-amber animate-pulse" />
          $205B Gaming Market — Now Unlocked
        </div>

        {/* Headline */}
        <div className="max-w-4xl">
          <h1 className="font-display text-7xl md:text-8xl text-am-text leading-none tracking-wide">
            ONE GAME WORLD
          </h1>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-am-border" />
            <h1 className="font-display text-7xl md:text-8xl text-am-amber leading-none tracking-wide">
              INFINITE
            </h1>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-am-border" />
          </div>
          <h1 className="font-display text-7xl md:text-8xl text-am-text leading-none tracking-wide">
            SPONSOR WORLDS
          </h1>
        </div>

        {/* Subhead */}
        <p className="max-w-xl text-am-muted text-lg leading-relaxed">
          AI-powered native ad placement that{" "}
          <span className="text-am-text font-medium">morphs game assets</span> to match sponsor brand identity —
          no pop-ups, no disruption, just immersive revenue.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link href="/developer" className="am-btn-primary text-base px-6 py-3">
            I&apos;m a Developer <ArrowRight size={16} />
          </Link>
          <Link href="/sponsor" className="am-btn-ghost text-base px-6 py-3">
            I&apos;m a Sponsor <ArrowRight size={16} />
          </Link>
        </div>

        {/* Sponsor logos bar */}
        <div className="mt-6 flex items-center gap-6 text-am-subtle text-sm font-mono">
          <span>Built with</span>
          {["Cloudinary", "Pingram", "Composio", "Cystack", "Polarity"].map((s) => (
            <span key={s} className="text-am-muted hover:text-am-text transition-colors cursor-default">{s}</span>
          ))}
        </div>
      </main>

      {/* Feature strip */}
      <div className="relative z-10 border-t border-am-border grid grid-cols-3 divide-x divide-am-border">
        {[
          {
            icon: <Zap size={18} className="text-am-amber" />,
            title: "AI Matchmaking",
            desc: "Vision models scan your game and match placements to sponsors by vibe, audience, and art style.",
          },
          {
            icon: <Shield size={18} className="text-am-green" />,
            title: "Brand Safety Score",
            desc: "Every integration is scored and verified before it ever reaches a developer's inbox.",
          },
          {
            icon: <TrendingUp size={18} className="text-am-blue" />,
            title: "Human-in-the-Loop",
            desc: "Developers approve every placement. Sponsors bid competitively. Nobody loses creative control.",
          },
        ].map((f) => (
          <div key={f.title} className="px-8 py-6 hover:bg-am-surface/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              {f.icon}
              <h3 className="text-am-text font-semibold text-sm">{f.title}</h3>
            </div>
            <p className="text-am-muted text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
