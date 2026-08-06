"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import { Hero } from "@/components/Hero";
import BeliefSection from "@/components/BeliefSection";
import SceneIntelligence from "@/components/SceneIntelligence";
import SceneCompCard from "@/components/SceneCompCard";
import SceneHorizontalPortfolios from "@/components/SceneHorizontalPortfolios";
import SceneStudioWeb from "@/components/SceneStudioWeb";
import SceneAgencyView from "@/components/SceneAgencyView";
import SceneCurated from "@/components/SceneCurated";
import SceneNetwork from "@/components/SceneNetwork";
// Product-true sections after Studio/Website:
import SceneReveal from "@/components/SceneReveal"; // slot 4 — The Reveal / Scout AI fit-score radar (ink)
import SceneInTheOpen from "@/components/SceneInTheOpen"; // slot 5 — Smart Match + pipeline transparency (cream)
import PricingSection from "@/components/PricingSection";
import MarketingFooter from "@/components/MarketingFooter";

export default function ClientPage() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), []);

  return (
    <SmoothScroll>
      <Preloader onComplete={handlePreloaderComplete} />

      <main
        style={{
          opacity: preloaderDone ? 1 : 0,
          /* expo-out curve: fast initial reveal, gentle finish */
          transition: "opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <Hero ready={preloaderDone} />

        {/* ── BELIEF ────────────────────────────────────────────────────── */}
        <BeliefSection />

        {/* ── INTELLIGENCE — "The Presence" (AI knows you, works for you) ── */}
        <SceneIntelligence />

        {/* ── COMP CARD ─────────────────────────────────────────────────── */}
        <SceneCompCard />

        {/* ── HORIZONTAL PORTFOLIOS (owns its own GSAP pin) ──────────────── */}
        {/* <SceneHorizontalPortfolios /> */}

        {/* ── STUDIO WEB ────────────────────────────────────────────────── */}
        <SceneStudioWeb />

        {/* ── SLOT 4 — The Reveal: the platform understands you ──────────── */}
        {/* (retired: SceneAgencyView dashboard preview — repeated the device idea) */}
        <SceneReveal />

        {/* ── SLOT 5 — In the open: Smart Match + visible pipeline ────────── */}
        {/* (retired: SceneCurated "How it works" icon grid) */}
        <SceneInTheOpen />

        {/* ── PRICING ───────────────────────────────────────────────────── */}
        <PricingSection />

        {/* ── MARKETING FOOTER (CTA + Footer Cards) ─────────────── */}
        <MarketingFooter theme="dark" />
      </main>
    </SmoothScroll>
  );
}
