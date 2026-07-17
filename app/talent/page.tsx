// Server component — metadata requires server component
import TalentCinemaPage from "@/components/talent-cinema/TalentCinemaPage";

export const metadata = {
  title: "Talent — Pholio",
  description:
    "Pholio opens with a screen test, not a form. Your comp card develops in about a minute — then a book, an editions engine, honest attention analytics, and a professional application flow to real agencies. Applying is free.",
  openGraph: {
    title: "Talent — Pholio",
    description:
      "A screen test, not a form. Your card develops in about a minute — then the book, the editions, the signal, the dossier. Applying to agencies is free.",
    url: "https://www.pholio.studio/talent",
    siteName: "Pholio",
    type: "website",
  },
};

export default function TalentPage() {
  return <TalentCinemaPage />;
}
