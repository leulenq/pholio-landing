import StudioPlusPageClient from "@/components/studio-plus/StudioPlusPageClient";
import type { Metadata } from "next";

const canonical = "https://www.pholio.studio/studio-plus";

export const metadata: Metadata = {
  title: "Studio+ — Pholio",
  description:
    "Elevate how you present, how you are seen, and how agencies receive your book. Studio+ is the professional layer for models and creatives who treat their career like craft.",
  openGraph: {
    title: "Studio+ — Pholio",
    description:
      "Presentation, visibility, and control—tools for talent who are serious about being board-ready.",
    url: canonical,
    siteName: "Pholio",
    type: "website",
  },
  alternates: {
    canonical,
  },
};

export default function StudioPlusPage() {
  return <StudioPlusPageClient />;
}
