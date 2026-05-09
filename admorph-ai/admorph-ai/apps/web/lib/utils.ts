import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n}`;
}

export function formatImpressions(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function scoreColor(score: number): string {
  if (score >= 90) return "text-am-green";
  if (score >= 75) return "text-am-amber";
  return "text-am-red";
}

export function scoreBadge(score: number): string {
  if (score >= 90) return "badge-green";
  if (score >= 75) return "badge-amber";
  return "badge-red";
}

export function statusBadge(status: string): string {
  switch (status) {
    case "live":
    case "approved":
    case "accepted":
      return "badge-green";
    case "pending":
      return "badge-amber";
    case "denied":
    case "rejected":
      return "badge-red";
    case "scanning":
      return "badge-blue";
    default:
      return "badge-amber";
  }
}
