"use client";
import React from "react";
import { Users, Zap, Shield, TrendingUp } from "lucide-react";
import type { Game } from "@/packages/types";
import { formatCurrency, formatImpressions, scoreBadge } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: Game;
  onBid?: (game: Game) => void;
}

const genreColors: Record<string, string> = {
  "Zombie Survival": "badge-red",
  "Street Racing": "badge-blue",
  "Fantasy RPG": "badge-green",
};

export function GameCard({ game, onBid }: GameCardProps) {
  const pendingCount = game.placements.filter((p) => p.status === "pending").length;
  const topPlacement = game.placements[0];

  return (
    <div className="am-panel flex flex-col overflow-hidden hover:border-am-border-bright transition-all duration-200 group">
      {/* Thumbnail */}
      <div className="relative h-40 bg-am-surface overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />
        {/* Fake thumbnail gradient based on genre */}
        <div
          className={cn(
            "absolute inset-0 opacity-30",
            game.genre === "Zombie Survival" && "bg-gradient-to-br from-red-900 via-gray-900 to-am-black",
            game.genre === "Street Racing" && "bg-gradient-to-br from-blue-900 via-purple-900 to-am-black",
            game.genre === "Fantasy RPG" && "bg-gradient-to-br from-green-900 via-teal-900 to-am-black",
          )}
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-am-black to-transparent">
          <h3 className="text-am-text font-display text-lg tracking-wide">{game.title}</h3>
        </div>
        <div className="absolute top-3 right-3">
          <span className={genreColors[game.genre] ?? "badge-amber"}>{game.genre}</span>
        </div>
        {/* Brand safety badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-am-black/70 border border-am-border px-2 py-1 rounded text-xs font-mono">
          <Shield size={10} className="text-am-green" />
          <span className="text-am-green">Brand Safe 97</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="am-label">Monthly Players</p>
            <p className="text-am-text font-mono font-medium">{formatImpressions(game.monthlyPlayers)}</p>
          </div>
          <div>
            <p className="am-label">Avg. Revenue</p>
            <p className="text-am-amber font-mono font-medium">{formatCurrency(game.estimatedRevenue)}</p>
          </div>
        </div>

        {/* Art style tag */}
        <div className="flex items-center gap-2">
          <span className="badge-amber">{game.artStyle}</span>
          {pendingCount > 0 && (
            <span className="badge-blue">{pendingCount} slots open</span>
          )}
        </div>

        {/* Top placement preview */}
        {topPlacement && (
          <div className="bg-am-surface rounded px-3 py-2 border border-am-border">
            <p className="am-label mb-0.5">Top Placement</p>
            <p className="text-am-text text-xs">{topPlacement.gameElement}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={scoreBadge(topPlacement.brandMatchScore)}>{topPlacement.brandMatchScore}% match</span>
              <span className="text-am-muted text-xs font-mono">{formatCurrency(topPlacement.revenuePotential)}/mo</span>
            </div>
          </div>
        )}

        <button
          onClick={() => onBid?.(game)}
          className="am-btn-primary w-full justify-center mt-auto"
        >
          <Zap size={14} />
          Place Bid
        </button>
      </div>
    </div>
  );
}
