"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import { Hero } from "@/components/Hero";
import BeliefSection from "@/components/BeliefSection";
import SceneCompCard from "@/components/SceneCompCard";
import SceneHorizontalPortfolios from "@/components/SceneHorizontalPortfolios";
import SceneStudioWeb from "@/components/SceneStudioWeb";
import SceneAgencyView from "@/components/SceneAgencyView";
import SceneCurated from "@/components/SceneCurated";
import SceneNetwork from "@/components/SceneNetwork";
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

        {/* ── COMP CARD ─────────────────────────────────────────────────── */}
        <SceneCompCard />

        {/* ── HORIZONTAL PORTFOLIOS (owns its own GSAP pin) ──────────────── */}
        {/* <SceneHorizontalPortfolios /> */}

        {/* ── STUDIO WEB ────────────────────────────────────────────────── */}
        <SceneStudioWeb />

        {/* ── AGENCY VIEW ───────────────────────────────────────────────── */}
        <SceneAgencyView />

        {/* ── CURATED ────────────────────────────────────────────────────── */}
        <SceneCurated />

        {/* ── PRICING ───────────────────────────────────────────────────── */}
        <PricingSection />

        {/* ── MARKETING FOOTER (CTA + Footer Cards) ─────────────── */}
        <MarketingFooter />
      </main>
    </SmoothScroll>
  );
}
