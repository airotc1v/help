"use client";
import React from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { TrendingUp, BarChart3 } from "lucide-react";

export default function DevAnalytics() {
  const bars = [42, 65, 55, 80, 72, 91, 88, 95, 78, 84, 100, 93];
  const months = ["Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"];

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Topbar title="ANALYTICS" subtitle="Revenue and placement performance over time" />
      <div className="flex-1 p-6 space-y-6 animate-fade-up">
        <div className="am-panel p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={16} className="text-am-amber" />
            <h3 className="text-am-text font-semibold">Monthly Revenue — Last 12 Months</h3>
          </div>
          {/* Simple bar chart */}
          <div className="flex items-end gap-3 h-48">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t transition-all duration-700"
                  style={{
                    height: `${h}%`,
                    background: i === bars.length - 1
                      ? "linear-gradient(to top, #F5A623, #F5A62380)"
                      : "linear-gradient(to top, #2A3548, #1E2535)",
                  }}
                />
                <span className="text-am-muted text-xs font-mono">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Top Performing Game", value: "Neon Drift: Tokyo", sub: "$78.4K/mo" },
            { label: "Top Sponsor", value: "NVIDIA", sub: "96% match score" },
            { label: "Avg. Approval Rate", value: "84%", sub: "across all placements" },
            { label: "AI Accuracy", value: "91%", sub: "brand match vs. actual" },
          ].map((s) => (
            <div key={s.label} className="am-panel p-5">
              <p className="am-label">{s.label}</p>
              <p className="text-am-text font-display text-2xl mt-1">{s.value}</p>
              <p className="text-am-muted text-xs font-mono">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
