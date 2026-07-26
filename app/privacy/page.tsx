"use client";

import ThemeColor from "@/components/ThemeColor";
import { PrivacyContent } from "@/components/PrivacyContent";
import MarketingFooter from "@/components/MarketingFooter";

export default function PrivacyPage() {
  return (
    <main className="min-h-mobile-screen bg-[#FAF7F2]">
      <ThemeColor color="#FAF7F2" />
      <PrivacyContent />
      <MarketingFooter />
    </main>
  );
}
