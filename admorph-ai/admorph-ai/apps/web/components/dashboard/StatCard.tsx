import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  icon?: React.ReactNode;
  accent?: boolean;
  loading?: boolean;
}

export function StatCard({ label, value, delta, deltaPositive = true, icon, accent, loading }: StatCardProps) {
  return (
    <div
      className={cn(
        "am-stat-card relative overflow-hidden",
        accent && "border-am-amber/40 bg-am-amber/5"
      )}
    >
      {accent && (
        <div className="absolute inset-0 bg-amber-glow pointer-events-none opacity-30" />
      )}
      <div className="flex items-start justify-between">
        <span className="am-label">{label}</span>
        {icon && (
          <span className={cn("p-1.5 rounded", accent ? "bg-am-amber/20 text-am-amber" : "bg-am-border text-am-muted")}>
            {icon}
          </span>
        )}
      </div>
      {loading ? (
        <Skeleton className="h-8 w-32 mt-2" />
      ) : (
        <span className={cn("am-value mt-1", accent ? "text-am-amber" : "")}>{value}</span>
      )}
      {delta && !loading && (
        <span className={cn("text-xs font-mono", deltaPositive ? "text-am-green" : "text-am-red")}>
          {deltaPositive ? "▲" : "▼"} {delta}
        </span>
      )}
    </div>
  );
}
