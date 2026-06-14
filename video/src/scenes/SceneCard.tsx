/* ═══════════════════════════════════════════════════════════════════
   SCENE III — THE ANSWER  (cream, 13–20s)
   Hard cut to cream — the exhale. Pholio arrives as the answer, not the
   premise: the wordmark resolves, the comp card assembles out of the
   collapse, and the brand line is finally earned. Asymmetric: card left,
   verdict right.
   ═══════════════════════════════════════════════════════════════════ */

import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLOR } from "../theme";
import { FONT } from "../fonts";
import { arrive, liftIn } from "../primitives/anim";
import { Grain } from "../primitives/Grain";
import { Wordmark } from "../primitives/Wordmark";
import { Kicker } from "../primitives/Kicker";
import { Verdict } from "../primitives/Verdict";
import { VerticalRule, GoldSweep } from "../primitives/GoldRule";
import { CompCard } from "../primitives/CompCard";

export const SceneCard: React.FC = () => {
  const frame = useCurrentFrame();

  // the card assembles out of the collapse point
  const assemble = arrive(frame, 6, 52);
  const scale = interpolate(assemble, [0, 0.8, 1], [0.46, 1.035, 1]);
  const rotY = interpolate(assemble, [0, 0.82, 1], [-26, 5, 0]);
  const rotZ = interpolate(assemble, [0, 1], [-6, 0]);
  const lift = interpolate(assemble, [0, 1], [40, 0]);

  // residual gold seed from the previous scene, fading out
  const seed = interpolate(frame, [0, 26], [0.5, 0], { extrapolateRight: "clamp" });

  const subline = liftIn(frame, 84, 28, 18);

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR.cream }}>
      {/* letterhead hairline */}
      <div style={{ position: "absolute", insetInline: 0, top: 0, height: 1, background: `linear-gradient(to right, transparent, ${COLOR.gold}, transparent)`, opacity: 0.4 }} />

      {/* fading gold seed */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 1200, height: 1200, borderRadius: "50%", opacity: seed, background: "radial-gradient(circle, rgba(201,165,90,0.4) 0%, transparent 40%)" }} />
      </AbsoluteFill>

      {/* the comp card — left */}
      <div
        style={{
          position: "absolute",
          left: "33%",
          top: "50%",
          transform: `translate(-50%, -50%) translateY(${lift}px) perspective(1600px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
          opacity: arrive(frame, 6, 16),
        }}
      >
        <CompCard width={416} />
      </div>

      {/* verdict column — right */}
      <div style={{ position: "absolute", left: "57%", top: "50%", transform: "translateY(-50%)", width: 620 }}>
        <div style={{ marginBottom: 26 }}>
          <Wordmark start={4} size={30} align="left" color={COLOR.gold} />
        </div>

        <div style={{ ...liftIn(frame, 40, 26, 14) }}>
          <Kicker size={12} color={COLOR.goldDark}>
            The comp card, reissued
          </Kicker>
        </div>

        <div style={{ marginTop: 22 }}>
          <Verdict
            words={[
              { text: "Now" },
              { text: "there's" },
              { text: "a" },
              { text: "standard", gold: true },
              { text: "." },
            ]}
            start={50}
            stagger={5}
            size={76}
            color="#161616"
            align="left"
          />
        </div>

        <div style={{ marginTop: 26 }}>
          <GoldSweep start={86} width={150} />
        </div>

        <div
          style={{
            ...subline,
            marginTop: 22,
            fontFamily: FONT.sans,
            fontWeight: 300,
            fontSize: 19,
            lineHeight: 1.5,
            color: "rgba(22,22,22,0.66)",
            maxWidth: 430,
          }}
        >
          Verified identity. Framed work. One card the industry can trust.
        </div>
      </div>

      <div style={{ position: "absolute", left: "57%", top: 150 }}>
        <VerticalRule start={36} height={90} />
      </div>

      <Grain opacity={0.05} blend="multiply" />
    </AbsoluteFill>
  );
};
