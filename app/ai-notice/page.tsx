"use client";

import ThemeColor from "@/components/ThemeColor";
import { AiNoticeContent } from "@/components/AiNoticeContent";
import MarketingFooter from "@/components/MarketingFooter";

export default function AiNoticePage() {
  return (
    <main className="min-h-mobile-screen bg-[#FAF7F2]">
      <ThemeColor color="#FAF7F2" />
      <AiNoticeContent />
      <MarketingFooter />
    </main>
  );
}
