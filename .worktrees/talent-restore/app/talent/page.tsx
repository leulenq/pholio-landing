// Server component — metadata requires server component
import TalentPageClient from "@/components/TalentPageClient";

export const metadata = {
  title: "Talent — Pholio",
  description:
    "For models, actors, and creatives: board-ready comp and digitals in the same scout glass 140+ agencies search — match score, lean-in signal, and applications when you are ready.",
  openGraph: {
    title: "Talent — Pholio",
    description:
      "Put your book where agencies already search. One Pholio profile for comp, digitals, and discovery — casting-native, not a generic profile host.",
    url: "https://www.pholio.studio/talent",
    siteName: "Pholio",
    type: "website",
  },
};

export default function TalentPage() {
  return <TalentPageClient />;
}
