"use client";

/* ═══════════════════════════════════════════════════════════════════
   /talent — "The Read"
   Not a product tour. One argument, four acts, in the machine's voice:
   your work is judged silently in this industry — Pholio does the
   judging in front of you, before any agency sees a thing.

   I   READ — PITS types your photos, checks your set (ink, hero)
   II  MADE — a computational art director composes your card (cream)
   III SENT — the 7-page dossier + the package audit (ink)
   IV  SEEN — tracked links, honest attention (cream)
   ∎   Close — one action + three checkable promises (ink)

   Direction: components/talent-cinema/DIRECTION.md
   ═══════════════════════════════════════════════════════════════════ */

import SceneRead from "@/components/talent-cinema/SceneRead";
import SceneEditions from "@/components/talent-cinema/SceneEditions";
import SceneDossier from "@/components/talent-cinema/SceneDossier";
import SceneSignal from "@/components/talent-cinema/SceneSignal";
import SceneDock from "@/components/talent-cinema/SceneDock";
import MarketingFooter from "@/components/MarketingFooter";

export default function TalentCinemaPage() {
  return (
    /* overflow-x clip (not hidden): kills ambient-orb horizontal overflow
       without creating a scroll container, so sticky stages keep working */
    <main style={{ backgroundColor: "#050505", overflowX: "clip" }}>
      <SceneRead />
      <SceneEditions />
      <SceneDossier />
      <SceneSignal />
      <SceneDock />
      <MarketingFooter theme="dark" />
    </main>
  );
}
