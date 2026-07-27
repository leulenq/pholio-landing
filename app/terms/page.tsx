"use client";

import ThemeColor from "@/components/ThemeColor";
import { TermsContent } from "@/components/TermsContent";
import MarketingFooter from "@/components/MarketingFooter";

export default function TermsPage() {
  return (
    <main className="min-h-mobile-screen bg-[#FAF7F2]">
      <ThemeColor color="#FAF7F2" />
      <TermsContent />
      <MarketingFooter />
    </main>
  );
}
