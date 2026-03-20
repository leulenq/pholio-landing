// Server component — metadata requires server component
import TalentPageClient from "@/components/TalentPageClient";

export const metadata = {
  title: "For Talent — Pholio",
  description:
    "Built for talent. Trusted by agencies. Build a professional AI-curated portfolio, get discovered by 140+ agencies, and manage your career — all in one platform.",
  openGraph: {
    title: "For Talent — Pholio",
    description:
      "Built for talent. Trusted by agencies. Build a professional AI-curated portfolio and get discovered by 140+ agencies with Pholio.",
    url: "https://www.pholio.studio/talent",
    siteName: "Pholio",
    type: "website",
  },
};

export default function TalentPage() {
  return <TalentPageClient />;
}
