"use client";

import ThemeColor from "@/components/ThemeColor";
import { DmcaContent } from "@/components/DmcaContent";
import MarketingFooter from "@/components/MarketingFooter";

export default function DmcaPage() {
  return (
    <main className="min-h-mobile-screen bg-[#FAF7F2]">
      <ThemeColor color="#FAF7F2" />
      <DmcaContent />
      <MarketingFooter />
    </main>
  );
}
