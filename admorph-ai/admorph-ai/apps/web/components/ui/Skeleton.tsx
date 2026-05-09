import React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-am-border animate-pulse rounded",
        className
      )}
    />
  );
}
