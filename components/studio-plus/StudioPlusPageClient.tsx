"use client";

import MarketingFooter from "@/components/MarketingFooter";
import ThemeColor from "@/components/ThemeColor";
import StudioPlusHero from "./StudioPlusHero";
import StudioPlusChapters from "./StudioPlusChapters";
import StudioPlusInterlude from "./StudioPlusInterlude";
import StudioPlusClose from "./StudioPlusClose";

export default function StudioPlusPageClient() {
  return (
    <main className="min-h-mobile-screen" style={{ backgroundColor: "#050505" }}>
      <ThemeColor color="#050505" />
      <StudioPlusHero />
      <StudioPlusChapters />
      <StudioPlusInterlude />
      <StudioPlusClose />
      <MarketingFooter theme="dark" />
    </main>
  );
}
