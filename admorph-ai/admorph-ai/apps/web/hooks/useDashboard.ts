import { useState, useEffect } from "react";
import { mockGames, mockBids, mockStats, mockSponsors } from "@/lib/mockData";
import type { Game, Bid, DashboardStats, Sponsor } from "@/packages/types";

// In production these would hit /api endpoints via SWR.
// For the hackathon golden path we return mock data with simulated latency.

export function useDeveloperStats() {
  const [data, setData] = useState<DashboardStats["developer"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setData(mockStats.developer);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  return { data, loading };
}

export function useSponsorStats() {
  const [data, setData] = useState<DashboardStats["sponsor"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setData(mockStats.sponsor);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  return { data, loading };
}

export function useGames() {
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setData(mockGames);
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return { data, loading };
}

export function useSponsors() {
  const [data, setData] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setData(mockSponsors);
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  return { data, loading };
}

export function useBids() {
  const [data, setData] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setData(mockBids);
      setLoading(false);
    }, 750);
    return () => clearTimeout(t);
  }, []);

  const approveBid = (bidId: string) => {
    setData((prev) =>
      prev.map((b) => (b.id === bidId ? { ...b, status: "accepted" as const } : b))
    );
  };

  const rejectBid = (bidId: string) => {
    setData((prev) =>
      prev.map((b) => (b.id === bidId ? { ...b, status: "rejected" as const } : b))
    );
  };

  return { data, loading, approveBid, rejectBid };
}

export function useScanSimulation(active: boolean) {
  const [step, setStep] = useState(0);
  const steps = [
    "Parsing scene graph…",
    "Detecting anchor surfaces…",
    "Analyzing scene lighting…",
    "Matching brand safety parameters…",
    "Rendering mockups via Cloudinary…",
    "Scoring revenue potential…",
    "Analysis complete.",
  ];

  useEffect(() => {
    if (!active) return;
    if (step >= steps.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), 1200);
    return () => clearTimeout(t);
  }, [active, step]);

  return { currentStep: steps[step], stepIndex: step, total: steps.length, done: step >= steps.length - 1 };
}
