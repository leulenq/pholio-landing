// Server component — do NOT add "use client" here (metadata requires server component)
import ForTalentClientPage from "@/components/ForTalentClientPage";

export const metadata = {
  title: "For Talent — Pholio",
  description:
    "Built for talent. Trusted by agencies. Build a professional portfolio and AI-curated comp card in under an hour.",
};

export default function ForTalentPage() {
  return <ForTalentClientPage />;
}
