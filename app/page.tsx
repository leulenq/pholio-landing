import type { Metadata } from "next";

import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "Pholio — Verified talent portfolios",
  description:
    "Pholio is a verified-talent portfolio platform. Talent build a professional book; agencies discover and shortlist real people.",
};

export default function HomePage() {
  return <HomePageClient />;
}
