"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import { Hero } from "@/components/Hero";
import SceneCompCard from "@/components/SceneCompCard";
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
        {/* ── HERO + "PHOLIO sees you." ─────────────────────────────── */}
        <Hero ready={preloaderDone} />

        {/* ── COMP CARD ─────────────────────────────────────────────── */}
        <SceneCompCard />

        {/* ── MARKETING FOOTER ──────────────────────────────────────── */}
        <MarketingFooter theme="dark" />
      </main>
    </SmoothScroll>
  );
}
