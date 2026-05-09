// packages/types/index.ts

export type UserRole = "developer" | "sponsor";

export interface Placement {
  id: string;
  gameElement: string;
  location: string;
  suggestedSponsor: string;
  sponsorLogo?: string;
  brandMatchScore: number;
  revenuePotential: number;
  status: "pending" | "approved" | "denied" | "live";
  aiReasoning: string;
  beforeImage?: string;
  afterImage?: string;
  createdAt: string;
}

export interface Game {
  id: string;
  title: string;
  genre: string;
  artStyle: string;
  monthlyPlayers: number;
  estimatedRevenue: number;
  status: "scanning" | "ready" | "live" | "pending_approval";
  placements: Placement[];
  thumbnail?: string;
  uploadedAt: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  targetAudience: string[];
  monthlyBudget: number;
  activeBids: number;
  totalImpressions: number;
  brandSafetyScore: number;
}

export interface Bid {
  id: string;
  sponsorId: string;
  sponsorName: string;
  gameId: string;
  gameName: string;
  placementId: string;
  amount: number;
  status: "pending" | "accepted" | "rejected" | "outbid";
  placedAt: string;
}

export interface AIInsight {
  step: string;
  detail: string;
  status: "done" | "active" | "pending";
  duration?: number;
}

export interface DashboardStats {
  developer: {
    estimatedMonthlyRevenue: number;
    pendingBids: number;
    activePlacements: number;
    totalGames: number;
  };
  sponsor: {
    totalImpressions: number;
    activeIntegrations: number;
    audienceDemographicMatch: number;
    activeBids: number;
  };
}
