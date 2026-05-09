"use client";
import React, { useState } from "react";
import { DollarSign, Clock, Layers, GamepadIcon, TrendingUp } from "lucide-react";
import { Topbar } from "@/components/dashboard/Topbar";
import { StatCard } from "@/components/dashboard/StatCard";
import { UploadZone } from "@/components/developer/UploadZone";
import { BeforeAfterSlider } from "@/components/developer/BeforeAfterSlider";
import { PlacementTable } from "@/components/developer/PlacementTable";
import { useDeveloperStats, useGames } from "@/hooks/useDashboard";
import { formatCurrency, formatImpressions } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";

export default function DeveloperDashboard() {
  const { data: stats, loading: statsLoading } = useDeveloperStats();
  const { data: games, loading: gamesLoading } = useGames();
  const [selectedGameId, setSelectedGameId] = useState<string>("g1");

  const selectedGame = games.find((g) => g.id === selectedGameId) ?? games[0];
  const allPlacements = selectedGame?.placements ?? [];

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Topbar title="DEVELOPER DASHBOARD" subtitle="Game Studio · AdMorph AI" />

      <div className="flex-1 p-6 space-y-6 animate-fade-up">
        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Est. Monthly Revenue"
            value={statsLoading || !stats ? "—" : formatCurrency(stats.estimatedMonthlyRevenue)}
            delta="18.4% vs last month"
            deltaPositive
            icon={<DollarSign size={14} />}
            accent
            loading={statsLoading}
          />
          <StatCard
            label="Pending Sponsor Bids"
            value={statsLoading || !stats ? "—" : String(stats.pendingBids)}
            delta="2 new today"
            deltaPositive
            icon={<Clock size={14} />}
            loading={statsLoading}
          />
          <StatCard
            label="Active Placements"
            value={statsLoading || !stats ? "—" : String(stats.activePlacements)}
            icon={<Layers size={14} />}
            loading={statsLoading}
          />
          <StatCard
            label="Connected Games"
            value={statsLoading || !stats ? "—" : String(stats.totalGames)}
            icon={<GamepadIcon size={14} />}
            loading={statsLoading}
          />
        </div>

        {/* Game selector */}
        <div>
          <p className="am-label mb-2">Active Projects</p>
          <div className="flex gap-3 flex-wrap">
            {gamesLoading
              ? [1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-40" />)
              : games.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGameId(g.id)}
                  className={`px-4 py-2 rounded border text-sm font-mono transition-all ${
                    selectedGameId === g.id
                      ? "border-am-amber text-am-amber bg-am-amber/10"
                      : "border-am-border text-am-muted hover:border-am-border-bright hover:text-am-text"
                  }`}
                >
                  {g.title}
                  {g.status === "scanning" && (
                    <span className="ml-2 badge-blue text-xs">SCANNING</span>
                  )}
                </button>
              ))}
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload */}
          <div className="space-y-4">
            <div>
              <h2 className="text-am-text font-semibold mb-1">Upload & Scan</h2>
              <p className="text-am-muted text-xs font-mono">Drop game files to trigger the AI placement engine</p>
            </div>
            <UploadZone />
          </div>

          {/* Slider */}
          <div className="space-y-4">
            <div>
              <h2 className="text-am-text font-semibold mb-1">Before / After Visualizer</h2>
              <p className="text-am-muted text-xs font-mono">Drag the handle to preview AI-generated sponsor integrations</p>
            </div>
            {selectedGame && (
              <BeforeAfterSlider
                gameName={selectedGame.title}
                sponsorName={selectedGame.placements[0]?.suggestedSponsor ?? "Red Bull"}
              />
            )}
          </div>
        </div>

        {/* Placement table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-am-text font-semibold">Placement Opportunities</h2>
              <p className="text-am-muted text-xs font-mono">
                {selectedGame?.title} — review and approve AI-identified sponsor slots
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-am-muted">
              <TrendingUp size={12} className="text-am-amber" />
              Est. {formatCurrency((selectedGame?.estimatedRevenue ?? 0))}/mo total
            </div>
          </div>
          {gamesLoading ? (
            <div className="space-y-3">
              {[1,2,3].map((i) => <Skeleton key={i} className="h-14 w-full" />)}
            </div>
          ) : (
            <PlacementTable placements={allPlacements} />
          )}
        </div>
      </div>
    </div>
  );
}
