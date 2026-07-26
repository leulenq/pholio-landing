import type { Metadata } from "next";

import MarketingFooter from "@/components/MarketingFooter";
import ThemeColor from "@/components/ThemeColor";
import { SubmissionProgramNoticeContent } from "@/components/SubmissionProgramNoticeContent";

export const metadata: Metadata = {
  title: "Talent Submission and Opportunity Notice | Pholio",
  description:
    "Notice covering agency representation submissions and casting, event, fashion-week, brand, client, and other opportunity submissions through Pholio.",
};

export default function SubmissionProgramNoticePage() {
  return (
    <main className="min-h-mobile-screen bg-[#FAF7F2]">
      <ThemeColor color="#FAF7F2" />
      <SubmissionProgramNoticeContent />
      <MarketingFooter />
    </main>
  );
}
