"use client";
import React, { useState } from "react";
import { X, Send, Zap, Shield, Users, TrendingUp, CheckCircle2 } from "lucide-react";
import type { Game } from "@/packages/types";
import { formatCurrency, formatImpressions, scoreBadge } from "@/lib/utils";

interface BidModalProps {
  game: Game | null;
  onClose: () => void;
}

export function BidModal({ game, onClose }: BidModalProps) {
  const [bidAmount, setBidAmount] = useState(5000);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const topPlacement = game?.placements[0];

  if (!game) return null;

  const handleBid = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-am-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg am-panel overflow-hidden animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-am-border flex items-center justify-between">
          <div>
            <h2 className="text-am-text font-display text-xl">{game.title}</h2>
            <p className="text-am-muted text-xs font-mono">{game.genre} · {game.artStyle}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-am-panel text-am-muted hover:text-am-text transition-colors">
            <X size={16} />
          </button>
        </div>

        {sent ? (
          <div className="px-6 py-12 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-am-green/10 border border-am-green/30 flex items-center justify-center">
              <CheckCircle2 size={28} className="text-am-green" />
            </div>
            <div>
              <h3 className="text-am-text font-semibold text-lg">Bid Placed Successfully</h3>
              <p className="text-am-muted text-sm mt-1">
                The developer has been notified via Pingram SMS & Email.
              </p>
              <p className="text-am-muted text-sm mt-0.5">
                You'll be notified when they respond.
              </p>
            </div>
            <div className="w-full bg-am-surface rounded border border-am-border px-4 py-3 text-sm font-mono text-am-amber">
              📱 SMS sent: "{game.title}" has a new bid of {formatCurrency(bidAmount)} from your brand.
            </div>
            <button onClick={onClose} className="am-btn-ghost">Close</button>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-5">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="am-panel p-3">
                <p className="am-label">Players</p>
                <p className="text-am-text font-mono font-medium mt-0.5">{formatImpressions(game.monthlyPlayers)}</p>
              </div>
              <div className="am-panel p-3">
                <p className="am-label">Brand Safe</p>
                <p className="text-am-green font-mono font-medium mt-0.5 flex items-center gap-1">
                  <Shield size={11} /> 97/100
                </p>
              </div>
              <div className="am-panel p-3">
                <p className="am-label">Open Slots</p>
                <p className="text-am-amber font-mono font-medium mt-0.5">
                  {game.placements.filter((p) => p.status === "pending").length} avail.
                </p>
              </div>
            </div>

            {/* Placement selection */}
            {topPlacement && (
              <div>
                <p className="am-label mb-2">Placement Opportunity</p>
                <div className="am-panel p-3 border-am-amber/30 bg-am-amber/5">
                  <p className="text-am-text font-medium text-sm">{topPlacement.gameElement}</p>
                  <p className="text-am-muted text-xs mt-0.5">{topPlacement.location}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={scoreBadge(topPlacement.brandMatchScore)}>{topPlacement.brandMatchScore}% match</span>
                    <span className="text-am-amber text-xs font-mono">Est. {formatCurrency(topPlacement.revenuePotential)}/mo value</span>
                  </div>
                  <p className="text-am-muted text-xs mt-2 italic">{topPlacement.aiReasoning}</p>
                </div>
              </div>
            )}

            {/* Bid amount */}
            <div>
              <p className="am-label mb-2">Your Bid Amount</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 am-panel border-am-border-bright px-3 py-2.5 flex items-center gap-2">
                  <span className="text-am-amber font-mono text-lg">$</span>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    className="bg-transparent text-am-text font-mono text-lg w-full focus:outline-none"
                    min={500}
                    step={500}
                  />
                  <span className="text-am-muted text-xs font-mono">/mo</span>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                {[2500, 5000, 10000, 25000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setBidAmount(amt)}
                    className={`text-xs font-mono px-2 py-1 rounded border transition-colors ${
                      bidAmount === amt
                        ? "border-am-amber text-am-amber bg-am-amber/10"
                        : "border-am-border text-am-muted hover:border-am-border-bright"
                    }`}
                  >
                    {formatCurrency(amt)}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <p className="text-am-muted text-xs font-mono border border-am-border rounded p-2 bg-am-surface/50">
              ⚡ Pingram will notify the developer instantly via SMS + Email. Their response triggers AI asset generation.
            </p>

            <button
              onClick={handleBid}
              disabled={sending}
              className="am-btn-primary w-full justify-center py-3 text-base"
            >
              {sending ? (
                <>
                  <span className="w-4 h-4 border-2 border-am-black/40 border-t-am-black rounded-full animate-spin" />
                  Sending via Pingram…
                </>
              ) : (
                <>
                  <Send size={15} />
                  Place Bid — {formatCurrency(bidAmount)}/mo
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
