// Server component — metadata requires server component
import TalentCinemaPage from "@/components/talent-cinema/TalentCinemaPage";

export const metadata = {
  title: "Talent — Pholio",
  description:
    "Pholio reads your photos the way an agency will, builds the comp card and submission they expect, and shows you who opened your book. You never pay to apply, and your images stay yours.",
  openGraph: {
    title: "Talent — Pholio",
    description:
      "Know what they see. Pholio reads your photos the way an agency will, builds the comp card they expect, and shows you who opened your book. Applying is free.",
    url: "https://www.pholio.studio/talent",
    siteName: "Pholio",
    type: "website",
  },
};

export default function TalentPage() {
  return <TalentCinemaPage />;
}
