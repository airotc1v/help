"use client";
import React, { useState } from "react";
import { Check, X, ChevronDown, ChevronRight, Info } from "lucide-react";
import type { Placement } from "@/packages/types";
import { formatCurrency, scoreBadge, statusBadge } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PlacementTableProps {
  placements: Placement[];
  onApprove?: (id: string) => void;
  onDeny?: (id: string) => void;
}

export function PlacementTable({ placements, onApprove, onDeny }: PlacementTableProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [localStatus, setLocalStatus] = useState<Record<string, string>>({});

  const getStatus = (p: Placement) => localStatus[p.id] ?? p.status;

  const handleApprove = (id: string) => {
    setLocalStatus((s) => ({ ...s, [id]: "approved" }));
    onApprove?.(id);
  };

  const handleDeny = (id: string) => {
    setLocalStatus((s) => ({ ...s, [id]: "denied" }));
    onDeny?.(id);
  };

  return (
    <div className="am-panel overflow-hidden">
      <div className="px-5 py-4 border-b border-am-border flex items-center justify-between">
        <div>
          <h3 className="text-am-text font-semibold text-sm">AI-Identified Placements</h3>
          <p className="text-am-muted text-xs font-mono">Human-in-the-loop review required</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-amber">
            {placements.filter((p) => getStatus(p) === "pending").length} PENDING
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-am-border bg-am-surface/50">
              {["Game Element", "Suggested Sponsor", "Match Score", "Revenue Est.", "Status", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left am-label whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-am-border">
            {placements.map((p) => {
              const status = getStatus(p);
              const isPending = status === "pending";
              const isExpanded = expanded === p.id;
              return (
                <React.Fragment key={p.id}>
                  <tr
                    className={cn(
                      "hover:bg-am-surface/60 transition-colors cursor-pointer",
                      isExpanded && "bg-am-surface/40"
                    )}
                    onClick={() => setExpanded(isExpanded ? null : p.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronDown size={13} className="text-am-amber shrink-0" />
                        ) : (
                          <ChevronRight size={13} className="text-am-subtle shrink-0" />
                        )}
                        <span className="text-am-text font-medium">{p.gameElement}</span>
                      </div>
                      <p className="text-am-muted text-xs pl-5">{p.location}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-am-text">{p.suggestedSponsor}</td>
                    <td className="px-4 py-3">
                      <span className={scoreBadge(p.brandMatchScore)}>{p.brandMatchScore}%</span>
                    </td>
                    <td className="px-4 py-3 text-am-amber font-mono font-medium">
                      {formatCurrency(p.revenuePotential)}/mo
                    </td>
                    <td className="px-4 py-3">
                      <span className={statusBadge(status)}>{status.toUpperCase()}</span>
                    </td>
                    <td className="px-4 py-3">
                      {isPending ? (
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleApprove(p.id)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-am-green/10 border border-am-green/30 text-am-green text-xs font-mono hover:bg-am-green/20 transition-colors"
                          >
                            <Check size={12} /> Approve
                          </button>
                          <button
                            onClick={() => handleDeny(p.id)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-am-red/10 border border-am-red/30 text-am-red text-xs font-mono hover:bg-am-red/20 transition-colors"
                          >
                            <X size={12} /> Deny
                          </button>
                        </div>
                      ) : (
                        <span className="text-am-subtle text-xs font-mono">—</span>
                      )}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-am-surface/30">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="flex items-start gap-2 text-xs text-am-muted">
                          <Info size={13} className="text-am-amber mt-0.5 shrink-0" />
                          <div>
                            <p className="text-am-text font-semibold mb-0.5">AI Reasoning</p>
                            <p>{p.aiReasoning}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination placeholder */}
      <div className="px-5 py-3 border-t border-am-border flex items-center justify-between">
        <p className="text-am-muted text-xs font-mono">Showing {placements.length} of {placements.length} placements</p>
        <div className="flex gap-1">
          {[1].map((n) => (
            <button key={n} className="w-7 h-7 rounded bg-am-amber text-am-black text-xs font-mono">{n}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
