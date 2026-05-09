"use client";
import React, { useState } from "react";
import { Eye, Puzzle, Users, Zap } from "lucide-react";
import { Topbar } from "@/components/dashboard/Topbar";
import { StatCard } from "@/components/dashboard/StatCard";
import { GameCard } from "@/components/sponsor/GameCard";
import { BidModal } from "@/components/sponsor/BidModal";
import { useSponsorStats, useGames, useBids } from "@/hooks/useDashboard";
import { formatImpressions, statusBadge, formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";
import type { Game } from "@/packages/types";

export default function SponsorDashboard() {
  const { data: stats, loading: statsLoading } = useSponsorStats();
  const { data: games, loading: gamesLoading } = useGames();
  const { data: bids, loading: bidsLoading } = useBids();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Topbar title="SPONSOR DASHBOARD" subtitle="Brand Portal · AdMorph AI" />

      <div className="flex-1 p-6 space-y-6 animate-fade-up">
        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Player Impressions"
            value={statsLoading || !stats ? "—" : formatImpressions(stats.totalImpressions)}
            delta="24.1% vs last month"
            deltaPositive
            icon={<Eye size={14} />}
            accent
            loading={statsLoading}
          />
          <StatCard
            label="Active Game Integrations"
            value={statsLoading || !stats ? "—" : String(stats.activeIntegrations)}
            icon={<Puzzle size={14} />}
            loading={statsLoading}
          />
          <StatCard
            label="Audience Match"
            value={statsLoading || !stats ? "—" : `${stats.audienceDemographicMatch}%`}
            delta="3% improvement"
            deltaPositive
            icon={<Users size={14} />}
            loading={statsLoading}
          />
          <StatCard
            label="Active Bids"
            value={statsLoading || !stats ? "—" : String(stats.activeBids)}
            icon={<Zap size={14} />}
            loading={statsLoading}
          />
        </div>

        {/* Active bids table */}
        <div className="am-panel overflow-hidden">
          <div className="px-5 py-4 border-b border-am-border">
            <h3 className="text-am-text font-semibold text-sm">Recent Bids</h3>
            <p className="text-am-muted text-xs font-mono">Live status of your active placements</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-am-border bg-am-surface/50">
                  {["Game", "Placement", "Bid Amount", "Status", "Placed"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left am-label">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-am-border">
                {bidsLoading
                  ? [1,2,3].map((i) => (
                    <tr key={i}>
                      <td colSpan={5} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td>
                    </tr>
                  ))
                  : bids.map((b) => (
                    <tr key={b.id} className="hover:bg-am-surface/60 transition-colors">
                      <td className="px-4 py-3 text-am-text font-medium">{b.gameName}</td>
                      <td className="px-4 py-3 text-am-muted font-mono text-xs">{b.placementId}</td>
                      <td className="px-4 py-3 text-am-amber font-mono font-medium">{formatCurrency(b.amount)}/mo</td>
                      <td className="px-4 py-3">
                        <span className={statusBadge(b.status)}>{b.status.toUpperCase()}</span>
                      </td>
                      <td className="px-4 py-3 text-am-muted text-xs font-mono">
                        {new Date(b.placedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>

        {/* Game Marketplace Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-am-text font-semibold">Game Marketplace</h2>
              <p className="text-am-muted text-xs font-mono">Browse and bid on placements across available games</p>
            </div>
            <div className="flex gap-2">
              {["All", "Zombie", "Racing", "RPG"].map((f) => (
                <button key={f} className="am-btn-ghost text-xs px-3 py-1.5">{f}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {gamesLoading
              ? [1, 2, 3].map((i) => <Skeleton key={i} className="h-72 w-full" />)
              : games.map((g) => (
                <GameCard key={g.id} game={g} onBid={setSelectedGame} />
              ))
            }
          </div>
        </div>
      </div>

      {/* Bid modal */}
      <BidModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </div>
  );
}
