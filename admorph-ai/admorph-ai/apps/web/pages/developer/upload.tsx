"use client";
import React from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { UploadZone } from "@/components/developer/UploadZone";
import { FileCode, Lightbulb } from "lucide-react";

const TIPS = [
  "Export your Unity scene as a .json or zip the full Assets folder for best results.",
  "Lighting data is extracted automatically — no need to bake before uploading.",
  "The AI scores placement density: more open surfaces = higher revenue potential.",
  "Brand safety filters run before any sponsor sees your game.",
];

export default function UploadPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Topbar title="UPLOAD GAME" subtitle="Connect your project to the AI placement engine" />

      <div className="flex-1 p-6 max-w-3xl animate-fade-up space-y-6">
        <div className="am-panel p-5 flex items-start gap-3 border-am-amber/30 bg-am-amber/5">
          <FileCode size={18} className="text-am-amber mt-0.5 shrink-0" />
          <div>
            <p className="text-am-text font-semibold text-sm">Supported Formats</p>
            <p className="text-am-muted text-sm mt-0.5">
              Unity scene exports <span className="font-mono text-am-amber">.unity</span>,
              Unreal JSON scene descriptions, raw asset bundles <span className="font-mono text-am-amber">.zip</span>,
              and plain-text scene manifests <span className="font-mono text-am-amber">.txt</span>.
            </p>
          </div>
        </div>

        <UploadZone />

        <div>
          <p className="am-label mb-3 flex items-center gap-2"><Lightbulb size={12} className="text-am-amber" /> Tips for best results</p>
          <ul className="space-y-2">
            {TIPS.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-am-muted">
                <span className="text-am-amber font-mono mt-0.5">0{i + 1}.</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
