import type { Metadata } from "next";
import AgencyPageClient from "@/components/AgencyPageClient";

export const metadata: Metadata = {
  title: "For Agencies — Pholio",
  description:
    "Search ranked talent, govern intake, and run scouting pipeline with board-ready books—one workspace for agencies and scouting teams.",
  openGraph: {
    title: "For Agencies — Pholio",
    description:
      "Structured discovery, fit ranking, and pipeline visibility for modeling agencies and scouting teams.",
    url: "https://www.pholio.studio/agency",
    siteName: "Pholio",
    type: "website",
  },
};

export default function AgencyPage() {
  return <AgencyPageClient />;
}
