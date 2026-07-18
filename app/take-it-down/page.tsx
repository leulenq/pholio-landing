import type { Metadata } from "next";

import MarketingFooter from "@/components/MarketingFooter";
import { TakeItDownContent } from "@/components/TakeItDownContent";

export const metadata: Metadata = {
  title: "Intimate Image Removal | Pholio",
  description:
    "Public request process for removal of real or digitally created or altered intimate images shared without consent.",
};

export default function TakeItDownPage() {
  return (
    <main className="bg-[#FAF7F2]">
      <TakeItDownContent />
      <MarketingFooter />
    </main>
  );
}
