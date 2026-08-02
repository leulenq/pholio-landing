// landing/components/ForTalentClientPage.tsx
"use client";

import SmoothScroll from "@/components/SmoothScroll";
import TalentHero from "@/components/talent/TalentHero";
import TalentSceneDiscoverability from "@/components/talent/TalentSceneDiscoverability";
import TalentScenePhotoIntelligence from "@/components/talent/TalentScenePhotoIntelligence";
import TalentSceneCompCard from "@/components/talent/TalentSceneCompCard";
import TalentSceneWallet from "@/components/talent/TalentSceneWallet";
import TalentSceneAnalytics from "@/components/talent/TalentSceneAnalytics";
import TalentCTA from "@/components/talent/TalentCTA";
import MarketingFooter from "@/components/MarketingFooter";

export default function ForTalentClientPage() {
  return (
    <SmoothScroll>
      {/*
        Cream fallback prevents paint flash when transitioning between
        the light hero/wallet/CTA sections and the dark scroll-scenes.
        Each section owns its own background colour.
      */}
      <main style={{ backgroundColor: "#FAF8F5" }}>
        {/* Ch.1 — Cream kinetic typography */}
        <TalentHero />

        {/* Ch.2 — Dark scroll-scene: agency search */}
        <TalentSceneDiscoverability />

        {/* Ch.3 — Dark scroll-scene: AI photo intelligence */}
        <TalentScenePhotoIntelligence />

        {/* Ch.4 — Dark scroll-scene: comp card object study */}
        <TalentSceneCompCard />

        {/* Ch.5 — White clinical product reveal: Pholio ID / Apple Wallet */}
        <TalentSceneWallet />

        {/* Ch.6 — Dark numbers marquee: agency proof */}
        <TalentSceneAnalytics />

        {/* Ch.7 — Cream minimal single action */}
        <TalentCTA />

        <MarketingFooter />
      </main>
    </SmoothScroll>
  );
}
