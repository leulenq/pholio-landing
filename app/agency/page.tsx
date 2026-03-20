import type { Metadata } from "next";
import AgencyPageClient from "@/components/AgencyPageClient";

export const metadata: Metadata = {
  title: "For Agencies — Pholio",
  description:
    "Scout smarter. Book faster. Discover AI-matched talent, manage your pipeline, and build your roster — all from one intelligent platform.",
  openGraph: {
    title: "For Agencies — Pholio",
    description:
      "Discover AI-matched talent, manage your pipeline, and build your roster with Pholio's agency platform.",
    url: "https://www.pholio.studio/agency",
    siteName: "Pholio",
    type: "website",
  },
};

export default function AgencyPage() {
  return <AgencyPageClient />;
}
