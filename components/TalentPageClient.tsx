// landing/components/TalentPageClient.tsx
"use client";

/**
 * /talent narrative score (Pholio-only; no SaaS feature parade)
 *
 * 1 Arrival — hero + proof stack, rotating headline
 * 2 Tension — RoomBefore (hallway / inbox)
 * 3 Release — NegativeReel (friction struck through)
 * 4 Proof strip — FilmCorridor (contact sheet, scroll parallax)
 * 4b Conversion — TalentSignupStrip (dark band CTA)
 * 5 Myth — Glossary (Pholio lexicon, crossfade)
 * 6 Spine — ValueProposition (three editorial beats, marginalia not matrices)
 * 7 The edit — FeaturePhotoIntel (#the-edit)
 * 8 The floor — FeatureCompCard (#features) then FeatureExtras (comp + wallet + .studio)
 * 9 The glass — FeatureDiscovery (scout search mock)
 * 10 Signal — FeatureAnalytics (who leaned in)
 * 11 Depth — StudioPlusUpsell (editorial, not comparison-table hero)
 * 12 Proof — SocialProofSection
 * 13 Close — FinalCTA
 *
 * Motion: framer-motion + useScroll on corridor; respect prefers-reduced-motion.
 */

import HeroSection from "@/components/talent-new/HeroSection";
import TalentRoomBefore from "@/components/talent-new/TalentRoomBefore";
import TalentNegativeReel from "@/components/talent-new/TalentNegativeReel";
import TalentFilmCorridor from "@/components/talent-new/TalentFilmCorridor";
import TalentSignupStrip from "@/components/talent-new/TalentSignupStrip";
import TalentGlossary from "@/components/talent-new/TalentGlossary";
import ValueProposition from "@/components/talent-new/ValueProposition";
import FeaturePhotoIntel from "@/components/talent-new/FeaturePhotoIntel";
import FeatureCompCard from "@/components/talent-new/FeatureCompCard";
import FeatureExtras from "@/components/talent-new/FeatureExtras";
import FeatureDiscovery from "@/components/talent-new/FeatureDiscovery";
import FeatureAnalytics from "@/components/talent-new/FeatureAnalytics";
import StudioPlusUpsell from "@/components/talent-new/StudioPlusUpsell";
import SocialProofSection from "@/components/talent-new/SocialProofSection";
import FinalCTA from "@/components/talent-new/FinalCTA";
import MarketingFooter from "@/components/MarketingFooter";

export default function TalentPageClient() {
  return (
    <main style={{ backgroundColor: "#FAF8F5" }}>
      <HeroSection />
      <TalentRoomBefore />
      <TalentNegativeReel />
      <TalentFilmCorridor />
      <TalentSignupStrip />
      <TalentGlossary />
      <ValueProposition />
      <FeaturePhotoIntel />
      <FeatureCompCard />
      <FeatureExtras />
      <FeatureDiscovery />
      <FeatureAnalytics />
      <StudioPlusUpsell />
      <SocialProofSection />
      <FinalCTA />
      <MarketingFooter theme="dark" />
    </main>
  );
}
