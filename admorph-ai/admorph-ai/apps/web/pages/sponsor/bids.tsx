"use client";
import React from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { useBids } from "@/hooks/useDashboard";
import { statusBadge, formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";
import { Zap } from "lucide-react";

export default function SponsorBids() {
  const { data: bids, loading, approveBid, rejectBid } = useBids();

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Topbar title="ACTIVE BIDS" subtitle="Track and manage your in-flight sponsorship bids" />
      <div className="flex-1 p-6 space-y-5 animate-fade-up">
        <div className="am-panel overflow-hidden">
          <div className="px-5 py-4 border-b border-am-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={15} className="text-am-amber" />
              <h3 className="text-am-text font-semibold text-sm">All Bids</h3>
            </div>
            <span className="badge-amber">{bids.filter(b => b.status === "pending").length} PENDING</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-am-border bg-am-surface/50">
                  {["Game", "Placement", "Your Bid", "Status", "Placed", "Action"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left am-label">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-am-border">
                {loading
                  ? [1,2,3,4].map((i) => (
                    <tr key={i}>
                      <td colSpan={6} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td>
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
                      <td className="px-4 py-3 text-am-subtle text-xs font-mono">—</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
