"use client";

import MarketingFooter from "@/components/MarketingFooter";
import StudioPlusHero from "./StudioPlusHero";
import StudioPlusChapters from "./StudioPlusChapters";
import StudioPlusInterlude from "./StudioPlusInterlude";
import StudioPlusClose from "./StudioPlusClose";

export default function StudioPlusPageClient() {
  return (
    <main style={{ backgroundColor: "#050505" }}>
      <StudioPlusHero />
      <StudioPlusChapters />
      <StudioPlusInterlude />
      <StudioPlusClose />
      <MarketingFooter theme="dark" />
    </main>
  );
}
