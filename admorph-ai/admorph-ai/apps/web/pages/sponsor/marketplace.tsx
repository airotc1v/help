"use client";
import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Topbar } from "@/components/dashboard/Topbar";
import { GameCard } from "@/components/sponsor/GameCard";
import { BidModal } from "@/components/sponsor/BidModal";
import { useGames } from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/Skeleton";
import type { Game } from "@/packages/types";

const GENRES = ["All Genres", "Zombie Survival", "Street Racing", "Fantasy RPG"];
const AUDIENCES = ["All Audiences", "18–34 Male", "PC Gamers", "Casual Gamers"];

export default function MarketplacePage() {
  const { data: games, loading } = useGames();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [genre, setGenre] = useState("All Genres");

  const filtered = genre === "All Genres" ? games : games.filter((g) => g.genre === genre);

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Topbar title="MARKETPLACE" subtitle="Browse games and place bids on native placements" />

      <div className="flex-1 p-6 space-y-5 animate-fade-up">
        {/* Persistent filter bar */}
        <div className="am-panel p-4 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-48 bg-am-surface border border-am-border rounded px-3 py-2">
            <Search size={13} className="text-am-muted" />
            <input
              className="bg-transparent text-am-text text-sm flex-1 focus:outline-none placeholder:text-am-muted"
              placeholder="Search games…"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={13} className="text-am-muted" />
            <span className="text-am-muted text-xs font-mono">Genre:</span>
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={`px-3 py-1.5 rounded border text-xs font-mono transition-all ${
                  genre === g
                    ? "border-am-amber text-am-amber bg-am-amber/10"
                    : "border-am-border text-am-muted hover:border-am-border-bright"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-am-muted text-xs font-mono">
          {filtered.length} games available — {filtered.reduce((s, g) => s + g.placements.filter((p) => p.status === "pending").length, 0)} open slots
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading
            ? [1, 2, 3].map((i) => <Skeleton key={i} className="h-80 w-full rounded-lg" />)
            : filtered.map((g) => (
              <GameCard key={g.id} game={g} onBid={setSelectedGame} />
            ))
          }
        </div>
      </div>

      <BidModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </div>
  );
}
