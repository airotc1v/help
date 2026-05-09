import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-am-black flex flex-col items-center justify-center gap-6 text-center px-8">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10 pointer-events-none" />
      <Logo size="lg" />
      <div>
        <h1 className="font-display text-8xl text-am-amber">404</h1>
        <p className="text-am-muted text-lg mt-2">This asset doesn't exist in the scene graph.</p>
      </div>
      <Link href="/" className="am-btn-ghost">
        <ArrowLeft size={14} /> Back to Home
      </Link>
    </div>
  );
}
