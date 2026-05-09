"use client";
import React, { useState, useRef, useCallback } from "react";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
  gameName?: string;
  sponsorName?: string;
}

const BEFORE_COLOR = "#1E2535";
const AFTER_COLOR = "#F5A623";

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Original Asset",
  afterLabel = "Sponsored Asset",
  gameName = "Deadzone Chronicles",
  sponsorName = "Red Bull",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) handleMove(e.clientX); };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => { handleMove(e.touches[0].clientX); };

  return (
    <div className="am-panel overflow-hidden">
      <div className="px-5 pt-4 pb-3 border-b border-am-border flex items-center justify-between">
        <div>
          <h3 className="text-am-text font-semibold text-sm">Before / After Visualizer</h3>
          <p className="text-am-muted text-xs font-mono">{gameName} × {sponsorName}</p>
        </div>
        <span className="badge-green">LIVE PREVIEW</span>
      </div>

      <div
        ref={containerRef}
        className="relative select-none cursor-col-resize overflow-hidden"
        style={{ height: "320px" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
      >
        {/* BEFORE panel */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#0D1017" }}>
          {beforeSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={beforeSrc} alt="Before" className="w-full h-full object-cover" />
          ) : (
            <BeforePlaceholder />
          )}
          <div className="absolute top-3 left-3 bg-am-black/80 border border-am-border px-2 py-1 rounded text-xs font-mono text-am-muted">
            {beforeLabel}
          </div>
        </div>

        {/* AFTER panel — clipped */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#0D1017" }}>
            {afterSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={afterSrc} alt="After" className="w-full h-full object-cover" />
            ) : (
              <AfterPlaceholder />
            )}
          </div>
          <div className="absolute top-3 right-3 bg-am-amber/90 border border-am-amber px-2 py-1 rounded text-xs font-mono text-am-black font-bold">
            {afterLabel}
          </div>
        </div>

        {/* Divider handle */}
        <div
          className="absolute top-0 bottom-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-0.5 h-full bg-am-amber opacity-80" />
          <div className="absolute w-9 h-9 rounded-full bg-am-amber border-2 border-am-black flex items-center justify-center shadow-lg">
            <ArrowLeftRight size={14} className="text-am-black" />
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-am-surface/50 flex items-center gap-2 text-xs text-am-muted font-mono">
        <span className="text-am-amber">◆</span> Drag to compare — AI-generated mockup rendered via Cloudinary
      </div>
    </div>
  );
}

function BeforePlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-grid-pattern bg-grid relative">
      <div className="w-24 h-36 bg-am-panel border-2 border-am-border rounded flex flex-col items-center justify-center gap-2">
        <div className="w-12 h-16 bg-am-border rounded" />
        <div className="w-10 h-2 bg-am-subtle rounded" />
        <div className="w-8 h-1 bg-am-subtle/50 rounded" />
      </div>
      <p className="mt-3 text-am-subtle text-xs font-mono">Generic Asset</p>
    </div>
  );
}

function AfterPlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Amber glow bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-am-amber/10 via-transparent to-am-surface" />
      <div className="relative w-24 h-36 bg-am-panel border-2 border-am-amber/50 rounded flex flex-col items-center justify-center gap-2 shadow-lg"
        style={{ boxShadow: "0 0 30px rgba(245,166,35,0.25)" }}>
        {/* Simulated Red Bull logo area */}
        <div className="w-12 h-16 rounded bg-gradient-to-b from-am-amber/80 to-am-amber/40 flex items-center justify-center">
          <div className="text-am-black font-display text-lg">RB</div>
        </div>
        <div className="w-10 h-2 bg-am-amber/60 rounded" />
        <div className="w-8 h-1 bg-am-amber/30 rounded" />
      </div>
      <p className="mt-3 text-am-amber text-xs font-mono">Red Bull — Brand Asset</p>
    </div>
  );
}
