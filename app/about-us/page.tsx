"use client";

import { AboutHero } from "@/components/AboutHero";
import { AboutContent } from "@/components/AboutContent";
import MarketingFooter from "@/components/MarketingFooter";
import ThemeColor from "@/components/ThemeColor";

export default function AboutUsPage() {
  return (
    <main className="min-h-mobile-screen bg-[#050505]">
      <ThemeColor color="#050505" />
      <AboutHero />
      <AboutContent />
      <MarketingFooter />
    </main>
  );
}
