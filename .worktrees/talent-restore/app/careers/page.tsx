"use client";

import { CareersHero } from "@/components/CareersHero";
import { CareersContent } from "@/components/CareersContent";
import MarketingFooter from "@/components/MarketingFooter";

export default function CareersPage() {
  return (
    <main className="bg-[#050505]">
      <CareersHero />
      <CareersContent />
      <MarketingFooter />
    </main>
  );
}
