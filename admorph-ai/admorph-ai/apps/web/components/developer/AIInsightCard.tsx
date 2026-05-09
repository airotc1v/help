"use client";
import React from "react";
import { CheckCircle2, Loader2, Circle } from "lucide-react";
import { aiScanSteps } from "@/lib/mockData";

interface AIInsightCardProps {
  title?: string;
  stepIndex: number;
  currentStep: string;
}

export function AIInsightCard({ title = "AI Analysis Engine", stepIndex, currentStep }: AIInsightCardProps) {
  return (
    <div className="am-panel p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-am-amber animate-pulse" />
        <h3 className="text-am-text text-sm font-semibold">{title}</h3>
        <span className="ml-auto badge-amber">{stepIndex < aiScanSteps.length - 1 ? "SCANNING" : "COMPLETE"}</span>
      </div>

      <div className="space-y-3">
        {aiScanSteps.map((s, i) => {
          const done = i < stepIndex;
          const active = i === stepIndex;
          return (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {done ? (
                  <CheckCircle2 size={14} className="text-am-green" />
                ) : active ? (
                  <Loader2 size={14} className="text-am-amber animate-spin" />
                ) : (
                  <Circle size={14} className="text-am-subtle" />
                )}
              </div>
              <div>
                <p className={`text-xs font-mono ${done ? "text-am-muted line-through" : active ? "text-am-text" : "text-am-subtle"}`}>
                  {s.step}
                </p>
                {active && (
                  <p className="text-xs text-am-muted mt-0.5">{s.detail}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1 bg-am-border rounded-full overflow-hidden">
        <div
          className="h-full bg-am-amber transition-all duration-700 rounded-full"
          style={{ width: `${(stepIndex / (aiScanSteps.length - 1)) * 100}%` }}
        />
      </div>
      <p className="text-am-muted text-xs font-mono mt-1">{stepIndex} / {aiScanSteps.length} steps</p>
    </div>
  );
}
