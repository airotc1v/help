"use client";
import React, { useState, useRef } from "react";
import { Upload, FolderOpen, FileCode, Loader2, CheckCircle2 } from "lucide-react";
import { useScanSimulation } from "@/hooks/useDashboard";
import { AIInsightCard } from "@/components/developer/AIInsightCard";
import { cn } from "@/lib/utils";

export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { stepIndex, currentStep, done } = useScanSimulation(isScanning);

  const triggerScan = (name: string) => {
    setFile(name);
    setIsScanning(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) triggerScan(f.name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) triggerScan(f.name);
  };

  return (
    <div className="space-y-4">
      {!isScanning ? (
        <div
          className={cn(
            "am-panel p-8 flex flex-col items-center justify-center gap-4 transition-all duration-200 cursor-pointer",
            "border-dashed border-2 border-am-border hover:border-am-amber/50",
            isDragging && "border-am-amber bg-am-amber/5"
          )}
          style={{ minHeight: 220 }}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <div className={cn(
            "w-16 h-16 rounded-xl flex items-center justify-center transition-all",
            isDragging ? "bg-am-amber/20 border border-am-amber/40" : "bg-am-panel border border-am-border"
          )}>
            <Upload size={26} className={isDragging ? "text-am-amber" : "text-am-muted"} />
          </div>
          <div className="text-center">
            <p className="text-am-text font-medium">Drop your game files here</p>
            <p className="text-am-muted text-sm mt-1">
              Supports <span className="text-am-amber font-mono">.unity</span>, <span className="text-am-amber font-mono">.json</span>, <span className="text-am-amber font-mono">.zip</span> scene exports
            </p>
          </div>
          <button className="am-btn-primary pointer-events-none">
            <FolderOpen size={14} /> Browse Files
          </button>
          <input ref={inputRef} type="file" className="hidden" onChange={handleChange} />

          {/* Demo button */}
          <button
            className="am-btn-ghost mt-2 pointer-events-auto"
            onClick={(e) => { e.stopPropagation(); triggerScan("DeadzoneChronicles_v2.1.unity"); }}
          >
            <FileCode size={13} /> Load Demo Project
          </button>
        </div>
      ) : (
        <div className="am-panel p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-am-amber/10 border border-am-amber/20 flex items-center justify-center">
              <FileCode size={16} className="text-am-amber" />
            </div>
            <div>
              <p className="text-am-text text-sm font-medium">{file}</p>
              <p className="text-am-muted text-xs font-mono">
                {done ? "Scan complete — 5 placements found" : "Scanning…"}
              </p>
            </div>
            {done && <CheckCircle2 size={16} className="text-am-green ml-auto" />}
            {!done && <Loader2 size={16} className="text-am-amber ml-auto animate-spin" />}
          </div>

          {/* Scan line animation */}
          {!done && (
            <div className="relative h-1.5 bg-am-border rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-am-amber/20" />
              <div
                className="absolute left-0 top-0 h-full bg-am-amber rounded-full transition-all duration-700"
                style={{ width: `${(stepIndex / 6) * 100}%` }}
              />
            </div>
          )}
        </div>
      )}

      {isScanning && (
        <AIInsightCard stepIndex={stepIndex} currentStep={currentStep} />
      )}
    </div>
  );
}
