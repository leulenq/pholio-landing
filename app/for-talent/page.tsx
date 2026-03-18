// Server component — do NOT add "use client" here (metadata requires server component)
import ForTalentClientPage from "@/components/ForTalentClientPage";

export const metadata = {
  title: "For Talent — Pholio",
  description:
    "Agencies decided in four seconds. Pholio changes what they see. Build a professional portfolio and AI-curated comp card in under an hour.",
};

export default function ForTalentPage() {
  return <ForTalentClientPage />;
}
