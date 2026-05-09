"use client";
import React, { useState } from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { PlacementTable } from "@/components/developer/PlacementTable";
import { BeforeAfterSlider } from "@/components/developer/BeforeAfterSlider";
import { useGames } from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatCurrency } from "@/lib/utils";

export default function PlacementsPage() {
  const { data: games, loading } = useGames();
  const [activeGame, setActiveGame] = useState<string>("g1");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const game = games.find((g) => g.id === activeGame) ?? games[0];
  const placements = game?.placements ?? [];
  const filtered =
    activeFilter === "all" ? placements : placements.filter((p) => p.status === activeFilter);

  const totalRevenue = filtered.reduce((sum, p) => sum + p.revenuePotential, 0);

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Topbar title="PLACEMENTS" subtitle="All AI-identified sponsor slots across your games" />

      <div className="flex-1 p-6 space-y-6 animate-fade-up">
        {/* Game tabs */}
        <div className="flex items-center gap-3 flex-wrap border-b border-am-border pb-4">
          {loading
            ? [1, 2, 3].map((i) => <Skeleton key={i} className="h-9 w-36" />)
            : games.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGame(g.id)}
                className={`px-4 py-2 rounded border text-sm font-mono transition-all ${
                  activeGame === g.id
                    ? "border-am-amber text-am-amber bg-am-amber/10"
                    : "border-am-border text-am-muted hover:border-am-border-bright"
                }`}
              >
                {g.title}
                <span className="ml-2 text-xs opacity-60">({g.placements.length})</span>
              </button>
            ))}
        </div>

        {/* Filter + revenue summary */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            {["all", "pending", "approved", "live", "denied"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded text-xs font-mono border transition-all uppercase ${
                  activeFilter === f
                    ? "border-am-amber text-am-amber bg-am-amber/10"
                    : "border-am-border text-am-muted hover:border-am-border-bright"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="text-am-muted text-xs font-mono">
            Filtered revenue potential:{" "}
            <span className="text-am-amber">{formatCurrency(totalRevenue)}/mo</span>
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-14 w-full" />)}
              </div>
            ) : (
              <PlacementTable placements={filtered} />
            )}
          </div>
          <div>
            {game && (
              <BeforeAfterSlider
                gameName={game.title}
                sponsorName={game.placements[0]?.suggestedSponsor ?? "Brand"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
