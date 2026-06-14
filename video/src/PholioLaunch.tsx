/* ═══════════════════════════════════════════════════════════════════
   PholioLaunch — the film. A <Series> of scenes with hard cuts between
   each (a section break is a stage direction). Friction → Answer → Proof
   → (Close, coming). Ink/cream alternation carries the emotional register.
   ═══════════════════════════════════════════════════════════════════ */

import { Series } from "remotion";
import { SceneFriction } from "./scenes/SceneFriction";
import { SceneCard } from "./scenes/SceneCard";
import { SceneStudio } from "./scenes/SceneStudio";

export const PREVIEW_FRAMES = 390 + 210 + 210; // Friction + Card + Studio

export const PholioLaunch: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={390}>
        <SceneFriction />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210}>
        <SceneCard />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210}>
        <SceneStudio />
      </Series.Sequence>
    </Series>
  );
};
