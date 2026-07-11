import type { Metadata } from "next";

import MarketingFooter from "@/components/MarketingFooter";
import { SubmissionProgramNoticeContent } from "@/components/SubmissionProgramNoticeContent";

export const metadata: Metadata = {
  title: "Submission Program Notice | Pholio",
  description:
    "Notice concerning the collection, use, disclosure, retention, and deletion of personal data and materials submitted to agencies through Pholio.",
};

export default function SubmissionProgramNoticePage() {
  return (
    <main className="bg-[#FAF7F2]">
      <SubmissionProgramNoticeContent />
      <MarketingFooter />
    </main>
  );
}
