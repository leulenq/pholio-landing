import type { Metadata } from "next";

import AboutPageClient from "@/components/about/AboutPageClient";

/**
 * Server shell so the About page can carry real metadata — the previous page
 * was a client component and inherited the layout's sitewide title and
 * description. This is the one page on a marketing site where that matters
 * most: "about <company>" is a search people run before they trust you.
 */
export const metadata: Metadata = {
  title: "About | Pholio",
  description:
    "Pholio is a portfolio and comp-card platform for talent, and a submission and roster workspace for the agencies that receive them. What it is, what it is not, what it costs, and who builds it.",
  openGraph: {
    title: "About | Pholio",
    description:
      "What Pholio is, what it is not, what it costs, and who builds it.",
    url: "https://www.pholio.studio/about-us",
    siteName: "Pholio",
    type: "website",
  },
};

export default function AboutUsPage() {
  return <AboutPageClient />;
}
