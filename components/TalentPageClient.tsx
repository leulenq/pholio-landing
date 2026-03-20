// landing/components/TalentPageClient.tsx
"use client";

import HeroSection from "@/components/talent-new/HeroSection";
import ValueProposition from "@/components/talent-new/ValueProposition";
import FeatureCompCard from "@/components/talent-new/FeatureCompCard";
import FeaturePhotoIntel from "@/components/talent-new/FeaturePhotoIntel";
import FeatureAnalytics from "@/components/talent-new/FeatureAnalytics";
import FeatureDiscovery from "@/components/talent-new/FeatureDiscovery";
import FeatureExtras from "@/components/talent-new/FeatureExtras";
import StudioPlusUpsell from "@/components/talent-new/StudioPlusUpsell";
import SocialProofSection from "@/components/talent-new/SocialProofSection";
import FinalCTA from "@/components/talent-new/FinalCTA";
import MarketingFooter from "@/components/MarketingFooter";

export default function TalentPageClient() {
  return (
    <main style={{ backgroundColor: "#FAF8F5" }}>
      {/* 1 — Hero */}
      <HeroSection />

      {/* 2 — Value proposition */}
      <ValueProposition />

      {/* 3–6 — Individual feature scenes */}
      <FeatureCompCard />
      <FeaturePhotoIntel />
      <FeatureAnalytics />
      <FeatureDiscovery />

      {/* 7 — Apple Wallet + Public Portfolio */}
      <FeatureExtras />

      {/* 8 — Studio+ upsell */}
      <StudioPlusUpsell />

      {/* 9 — Social proof */}
      <SocialProofSection />

      {/* 10 — Final CTA */}
      <FinalCTA />

      <MarketingFooter theme="dark" />
    </main>
  );
}
