/* ═══════════════════════════════════════════════════════════════════
   SCENE IV — THE PROOF  (cream, 20–27s)
   The comp card hands off to the studio. The talent in command: the same
   person who was buried in static is now measured, verified, watched on
   her own terms. KPIs count up; agencies lean in. A slow camera settle.
   ═══════════════════════════════════════════════════════════════════ */

import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLOR } from "../theme";
import { arrive } from "../primitives/anim";
import { Grain } from "../primitives/Grain";
import { Kicker } from "../primitives/Kicker";
import { Verdict } from "../primitives/Verdict";
import { DashboardStill } from "../primitives/DashboardStill";

export const SceneStudio: React.FC = () => {
  const frame = useCurrentFrame();

  // the window arrives, then the camera settles (push-in eases to rest)
  const enter = arrive(frame, 0, 40);
  const scale = interpolate(enter, [0, 1], [0.965, 1]) * interpolate(frame, [40, 210], [1, 1.012]);
  const lift = interpolate(enter, [0, 1], [40, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR.creamWarm }}>
      {/* warm-cream surround furniture */}
      <div style={{ position: "absolute", top: 46, left: 64 }}>
        <Kicker size={12} color={COLOR.goldDark} style={{ opacity: arrive(frame, 8, 24) }}>
          The studio · Est. 2026
        </Kicker>
      </div>

      {/* the dashboard window */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 1648,
            height: 902,
            transform: `translateY(${lift}px) scale(${scale})`,
            opacity: enter,
            border: `1px solid ${COLOR.ink12}`,
            boxShadow: "0 60px 120px -40px rgba(5,5,5,0.40)",
            overflow: "hidden",
            background: COLOR.creamApp,
          }}
        >
          <DashboardStill />
        </div>
      </AbsoluteFill>

      {/* caption */}
      <div style={{ position: "absolute", bottom: 44, left: 64 }}>
        <Verdict
          words={[{ text: "See" }, { text: "who's" }, { text: "looking", gold: true }, { text: "." }]}
          start={150}
          stagger={5}
          size={40}
          color="#161616"
          align="left"
        />
      </div>

      <Grain opacity={0.04} blend="multiply" />
    </AbsoluteFill>
  );
};
