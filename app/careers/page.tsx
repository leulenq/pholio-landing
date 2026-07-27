"use client";

import { CareersHero } from "@/components/CareersHero";
import { CareersContent } from "@/components/CareersContent";
import MarketingFooter from "@/components/MarketingFooter";
import ThemeColor from "@/components/ThemeColor";

export default function CareersPage() {
  return (
    <main className="min-h-mobile-screen bg-[#050505]">
      <ThemeColor color="#050505" />
      <CareersHero />
      <CareersContent />
      <MarketingFooter />
    </main>
  );
}
