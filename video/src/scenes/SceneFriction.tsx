/* ═══════════════════════════════════════════════════════════════════
   SCENE I+II — THE STATIC, then THE TURN  (ink, 0–13s)
   We open inside the talent's friction: a buried portrait, scattered
   debris, drifting metric-noise. The line surfaces. Then motion converts
   the chaos — debris gather inward, the noise falls silent, everything
   blooms to a seed of gold and hard-cuts to cream.
   ═══════════════════════════════════════════════════════════════════ */

import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from "remotion";
import { COLOR } from "../theme";
import { FONT } from "../fonts";
import { DEBRIS, NOISE } from "../data";
import { arrive, seeded } from "../primitives/anim";
import { Grain } from "../primitives/Grain";
import { Verdict } from "../primitives/Verdict";

const CX = 960;
const CY = 540;

// scattered debris — center coords, rotation, scale, fade-in frame
const PIECES = [
  { img: DEBRIS[0], cx: 360, cy: 326, rot: -9, scale: 1.04, in: 18 },
  { img: DEBRIS[1], cx: 1496, cy: 372, rot: 8, scale: 0.92, in: 30 },
  { img: DEBRIS[2], cx: 540, cy: 812, rot: 6, scale: 1.12, in: 42 },
  { img: DEBRIS[3], cx: 1430, cy: 770, rot: -7, scale: 0.96, in: 54 },
  { img: DEBRIS[4], cx: 1180, cy: 246, rot: 4, scale: 0.82, in: 66 },
];

const GATHER_START = 244;
const GATHER_DUR = 96;

export const SceneFriction: React.FC = () => {
  const frame = useCurrentFrame();

  // the field's restlessness, and its fall to silence
  const gather = arrive(frame, GATHER_START, GATHER_DUR); // 0→1
  const fieldOut = arrive(frame, GATHER_START - 8, 60, { from: 0, to: 1 }); // noise/line fade
  const bloom = arrive(frame, 332, 58); // gold seed bloom into the cut

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR.ink }}>
      {/* buried hero portrait — dim, desaturated, behind everything */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 560,
            height: 760,
            opacity: interpolate(gather, [0, 1], [0.16, 0]),
            filter: "grayscale(1) brightness(0.7) contrast(1.1)",
            transform: `scale(${interpolate(gather, [0, 1], [1.04, 0.86])})`,
            maskImage: "radial-gradient(ellipse at center, #000 35%, transparent 72%)",
          }}
        >
          <Img src={staticFile("portrait.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </AbsoluteFill>

      {/* scanline interference over the portrait */}
      <AbsoluteFill
        style={{
          opacity: interpolate(gather, [0, 1], [0.5, 0]),
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 2px, transparent 4px)",
          mixBlendMode: "overlay",
        }}
      />

      {/* scattered debris thumbnails */}
      {PIECES.map((p, i) => {
        const appear = arrive(frame, p.in, 34);
        // slow restless drift before the gather
        const drift = (frame - p.in) * 0.05;
        const wobble = Math.sin((frame + i * 40) / 26) * 3;
        const x = interpolate(gather, [0, 1], [p.cx + wobble, CX], { easing: undefined });
        const y = interpolate(gather, [0, 1], [p.cy + drift + wobble, CY]);
        const rot = interpolate(gather, [0, 1], [p.rot, 0]);
        const scl = interpolate(gather, [0, 1], [p.scale, 0.42]);
        const op = appear * interpolate(gather, [0.55, 1], [0.62, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 184,
              height: 222,
              transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${scl})`,
              opacity: op,
              border: "1px solid rgba(250,247,242,0.10)",
              overflow: "hidden",
              boxShadow: "0 30px 60px -30px rgba(0,0,0,0.8)",
            }}
          >
            <Img
              src={staticFile(p.img)}
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) brightness(0.82) contrast(1.05)" }}
            />
          </div>
        );
      })}

      {/* drifting metric-noise — the static the career gets reduced to */}
      <AbsoluteFill style={{ opacity: interpolate(fieldOut, [0, 1], [1, 0]) }}>
        {NOISE.map((word, i) => {
          const rx = seeded(i * 3 + 1);
          const ry = seeded(i * 7 + 2);
          const left = 7 + rx * 84;
          const top = 8 + ry * 82;
          const appear = arrive(frame, 30 + i * 5, 40);
          const fall = (frame - 30) * (0.06 + seeded(i) * 0.05);
          const dropOnGather = interpolate(gather, [0, 1], [0, 60]);
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${left}%`,
                top: `${top}%`,
                transform: `translateY(${fall + dropOnGather}px)`,
                fontFamily: FONT.mono,
                fontSize: 12 + Math.round(seeded(i * 11) * 5),
                letterSpacing: "0.12em",
                color: "rgba(250,247,242,0.30)",
                opacity: appear * (0.4 + seeded(i * 5) * 0.6),
                whiteSpace: "nowrap",
              }}
            >
              {word}
            </span>
          );
        })}
      </AbsoluteFill>

      {/* the line that surfaces through the noise */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: interpolate(fieldOut, [0, 1], [1, 0]) }}>
        <div style={{ maxWidth: 1180, padding: "0 80px" }}>
          <Verdict
            words={[
              { text: "You've" },
              { text: "done" },
              { text: "the" },
              { text: "work." },
              { break: true },
              { text: "You've" },
              { text: "just" },
              { text: "never" },
              { text: "been" },
              { text: "seen", gold: true },
              { text: "." },
            ]}
            start={120}
            stagger={5}
            size={70}
            color={COLOR.cream}
          />
        </div>
      </AbsoluteFill>

      {/* the gold seed — chaos collapses to a single point of light */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 1400,
            height: 1400,
            borderRadius: "50%",
            opacity: bloom * 0.9,
            background: `radial-gradient(circle, rgba(201,165,90,0.55) 0%, rgba(201,165,90,0.12) 18%, transparent 42%)`,
            transform: `scale(${interpolate(bloom, [0, 1], [0.2, 1.1])})`,
          }}
        />
      </AbsoluteFill>

      <Grain opacity={0.07} blend="overlay" />
      {/* vignette */}
      <AbsoluteFill
        style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }}
      />
      {/* final fade toward the cut */}
      <AbsoluteFill style={{ backgroundColor: COLOR.cream, opacity: arrive(frame, 376, 14) * 1 }} />
    </AbsoluteFill>
  );
};
