import React from "react";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-4xl" };
  return (
    <div className={`font-display tracking-wider ${sizes[size]} flex items-center gap-2`}>
      <span className="text-am-amber">AD</span>
      <span className="text-am-text">MORPH</span>
      <span className="text-am-muted font-mono text-xs align-top mt-1 tracking-widest">AI</span>
    </div>
  );
}
