"use client";

import ThemeColor from "@/components/ThemeColor";
import { CommunityGuidelinesContent } from "@/components/CommunityGuidelinesContent";
import MarketingFooter from "@/components/MarketingFooter";

export default function CommunityGuidelinesPage() {
  return (
    <main className="min-h-mobile-screen bg-[#FAF7F2]">
      <ThemeColor color="#FAF7F2" />
      <CommunityGuidelinesContent />
      <MarketingFooter />
    </main>
  );
}
