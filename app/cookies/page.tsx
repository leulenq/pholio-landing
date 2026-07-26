"use client";

import ThemeColor from "@/components/ThemeColor";
import { CookiesContent } from "@/components/CookiesContent";
import MarketingFooter from "@/components/MarketingFooter";

export default function CookiesPage() {
  return (
    <main className="min-h-mobile-screen bg-[#FAF7F2]">
      <ThemeColor color="#FAF7F2" />
      <CookiesContent />
      <MarketingFooter />
    </main>
  );
}
