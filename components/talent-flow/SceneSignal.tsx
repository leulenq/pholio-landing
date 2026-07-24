"use client";

/* ═══════════════════════════════════════════════════════════════════
   Scene 5 — Signal (ink).
   Honest attention analytics: a seismograph of qualified visits and
   card pulls, ranked into a descending-emphasis column the way the
   industry actually reads attention. The baseline hairline that opens
   the chart is the same gold tick the Arrival field collapsed into —
   here it strikes down once, then rises again at the exit to hand off
   to the browser frame's top rule in Address.
   ═══════════════════════════════════════════════════════════════════ */

import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  Stage,
  Caption,
  Mono,
  V,
  usePrm,
  ON_INK,
  ON_INK_SOFT,
  ON_INK_FAINT,
  HAIR_INK,
  GOLD,
  SERIF,
  SANS,
} from "./kit";

/* Hand-authored seismograph — quiet stretches, five sharp spikes. `x` is
   a 0–1 fraction of chart width; height is px above the baseline. */
const TRACE: [number, number][] = [
  [0, 4], [0.05, 5], [0.1, 6], [0.15, 5], [0.19, 32], [0.23, 7],
  [0.28, 5], [0.33, 6], [0.38, 8], [0.42, 55], [0.46, 9], [0.5, 6],
  [0.55, 5], [0.59, 7], [0.63, 42], [0.67, 10], [0.71, 6], [0.75, 5],
  [0.79, 82], [0.83, 12], [0.88, 24], [0.93, 6], [1, 4],
];
const SPIKE_X = [0.19, 0.42, 0.63, 0.79, 0.88] as const;
const SPIKE_TICK_H = [10, 16, 13, 20, 8] as const; // 8–20px
const TALLEST_X = 0.79;
const TALLEST_H = 82;

const CHART_W = 640;
const CHART_H = 200;
const BASELINE_Y = 168;
const BASELINE_FROM_BOTTOM_PCT = ((CHART_H - BASELINE_Y) / CHART_H) * 100;

function tracePath(close: boolean) {
  const pts = TRACE.map(([x, h]) => `${x * CHART_W},${BASELINE_Y - h}`);
  if (!close) return `M ${pts.join(" L ")}`;
  return `M 0,${BASELINE_Y} L ${pts.join(" L ")} L ${CHART_W},${BASELINE_Y} Z`;
}
const LINE_D = tracePath(false);
const AREA_D = tracePath(true);

type Row = {
  text: string;
  size: number;
  color: string;
  family?: string;
  mono?: boolean;
};

const ROWS: Row[] = [
  { text: "An agency reviewed your materials", size: 19, color: ON_INK, family: SERIF },
  { text: "A submission advanced", size: 17, color: "rgba(245,240,232,0.8)", family: SERIF },
  { text: "Your card was pulled · your link was opened", size: 14, color: ON_INK_SOFT, family: SANS },
  { text: "A qualified visit", size: 13, color: "rgba(245,240,232,0.55)", family: SANS },
  { text: "Raw reach", size: 10, color: ON_INK_FAINT, mono: true },
];
const ROW_THRESHOLDS = [0.4, 0.46, 0.52, 0.58, 0.64];
const ROW_GAPS = [0, 20, 18, 16, 14];

export default function SceneSignal() {
  const prm = usePrm();

  return (
    <Stage id="signal" hvh={260}>
      {(progress) => (
        <div className="relative flex h-full w-full flex-col justify-center gap-10 px-6 py-24 md:block md:px-16 md:py-0">
          <SignalCaption progress={progress} prm={prm} />
          <SignalChart progress={progress} prm={prm} />
          <SignalColumn progress={progress} prm={prm} />
        </div>
      )}
    </Stage>
  );
}

function SignalCaption({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  const opacity = useTransform(progress, [0.1, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.1, 0.2], [16, 0]);

  return (
    <motion.div
      className="md:absolute md:left-16 md:top-[14%] md:max-w-[420px]"
      style={{
        opacity: prm ? 1 : opacity,
        y: prm ? 0 : y,
        willChange: "transform, opacity",
      }}
    >
      <Caption dark headline={<>Know who leaned <V>in.</V></>}>
        Attention, ranked the way the industry ranks it. Under twenty views,
        it tells you the truth: too early to read.
      </Caption>
    </motion.div>
  );
}

function SignalChart({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  const baselineScaleX = useTransform(progress, [0.06, 0.18], [0, 1]);
  const baselineY = useTransform(progress, [0.86, 1], ["0vh", "-38vh"]);
  const baselineColor = useTransform(
    progress,
    [0.86, 0.94],
    [HAIR_INK, "rgba(245,240,232,0.35)"],
  );
  const baselineOpacity = useTransform(progress, [0.985, 1], [1, 0.4]);

  const strikeY = useTransform(progress, [0.12, 0.16], [-18, 0]);
  const strikeOpacity = useTransform(progress, [0.12, 0.16], [0, 1]);

  const drawOffset = useTransform(progress, [0.16, 0.42], [1, 0]);
  const areaClipWidth = useTransform(progress, [0.16, 0.42], [0, CHART_W]);

  const chartOpacity = useTransform(progress, [0.16, 0.22, 0.9, 1], [0, 1, 1, 0.15]);

  const diamondBottomPct = BASELINE_FROM_BOTTOM_PCT + ((TALLEST_H + 16) / CHART_H) * 100;
  const diamondOpacity = useTransform(progress, [0.42, 0.5], [0, 1]);
  const diamondScale = useTransform(progress, [0.42, 0.5], [0.6, 1]);

  return (
    <div className="w-full md:absolute md:bottom-[10%] md:left-16 md:w-[62%]">
      <motion.div style={{ opacity: prm ? 1 : chartOpacity, willChange: "opacity" }}>
        <div className="relative w-full" style={{ aspectRatio: `${CHART_W} / ${CHART_H}` }}>
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <clipPath id="signal-area-clip">
              <motion.rect
                x={0}
                y={0}
                height={CHART_H}
                width={prm ? CHART_W : areaClipWidth}
              />
            </clipPath>
            <path d={AREA_D} fill="rgba(245,240,232,0.05)" clipPath="url(#signal-area-clip)" />
            <motion.path
              d={LINE_D}
              fill="none"
              stroke="rgba(245,240,232,0.55)"
              strokeWidth={1.25}
              pathLength={1}
              strokeDasharray={1}
              style={{ strokeDashoffset: prm ? 0 : drawOffset }}
            />
          </svg>

          {/* baseline hairline — travels up to hand off to the next scene */}
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: `${BASELINE_FROM_BOTTOM_PCT}%`,
              height: 1,
              transformOrigin: "left",
              scaleX: prm ? 1 : baselineScaleX,
              y: prm ? 0 : baselineY,
              backgroundColor: prm ? HAIR_INK : baselineColor,
              opacity: prm ? 1 : baselineOpacity,
              willChange: "transform, opacity, background-color",
            }}
          />

          {/* the echoed gold strike from Arrival */}
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              bottom: `${BASELINE_FROM_BOTTOM_PCT}%`,
              width: 2,
              height: 10,
              background: GOLD,
              y: prm ? 0 : strikeY,
              opacity: prm ? 1 : strikeOpacity,
              willChange: "transform, opacity",
            }}
          />

          {SPIKE_X.map((x, i) => (
            <SpikeTick
              key={x}
              x={x}
              h={SPIKE_TICK_H[i]}
              index={i}
              progress={progress}
              prm={prm}
            />
          ))}

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${TALLEST_X * 100}%`,
              bottom: `${diamondBottomPct}%`,
              transform: "translateX(-50%)",
            }}
          >
            <motion.div
              style={{
                width: 8,
                height: 8,
                background: GOLD,
                rotate: 45,
                scale: prm ? 1 : diamondScale,
                opacity: prm ? 1 : diamondOpacity,
                willChange: "transform, opacity",
              }}
            />
          </div>
        </div>
      </motion.div>
      <span className="sr-only">
        Attention over time: qualified visits as a soft field, card pulls as
        gold strikes, an agency review marked above them.
      </span>
    </div>
  );
}

function SpikeTick({
  x,
  h,
  index,
  progress,
  prm,
}: {
  x: number;
  h: number;
  index: number;
  progress: MotionValue<number>;
  prm: boolean;
}) {
  const start = 0.3 + index * 0.0375;
  const end = start + 0.06;
  const scaleY = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: `${x * 100}%`,
        bottom: `${BASELINE_FROM_BOTTOM_PCT}%`,
        width: 1.5,
        height: h,
        background: GOLD,
        transformOrigin: "bottom",
        scaleY: prm ? 1 : scaleY,
        opacity: prm ? 1 : opacity,
        willChange: "transform, opacity",
      }}
    />
  );
}

function SignalColumn({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  return (
    <div className="w-full max-w-xs md:absolute md:right-16 md:top-[14%] md:w-[300px]">
      {ROWS.map((row, i) => (
        <SignalRow
          key={row.text}
          row={row}
          threshold={ROW_THRESHOLDS[i]}
          gap={ROW_GAPS[i]}
          hairlineBefore={i > 0}
          progress={progress}
          prm={prm}
        />
      ))}
      <SignalBodyLine progress={progress} prm={prm} />
    </div>
  );
}

function SignalRow({
  row,
  threshold,
  gap,
  hairlineBefore,
  progress,
  prm,
}: {
  row: Row;
  threshold: number;
  gap: number;
  hairlineBefore: boolean;
  progress: MotionValue<number>;
  prm: boolean;
}) {
  const end = threshold + 0.08;
  const opacity = useTransform(progress, [threshold, end, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [threshold, end], [12, 0]);

  return (
    <motion.div
      style={{
        opacity: prm ? 1 : opacity,
        y: prm ? 0 : y,
        marginTop: gap,
        paddingTop: hairlineBefore ? 14 : 0,
        borderTop: hairlineBefore ? `1px solid ${HAIR_INK}` : undefined,
        willChange: "transform, opacity",
      }}
    >
      {row.mono ? (
        <Mono color={row.color} size={row.size}>
          {row.text}
        </Mono>
      ) : (
        <p
          style={{
            margin: 0,
            fontFamily: row.family,
            fontSize: row.size,
            lineHeight: 1.3,
            color: row.color,
          }}
        >
          {row.text}
        </p>
      )}
    </motion.div>
  );
}

function SignalBodyLine({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  const opacity = useTransform(progress, [0.66, 0.78, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.66, 0.78], [10, 0]);

  return (
    <motion.p
      style={{
        marginTop: 24,
        marginBottom: 0,
        fontFamily: SANS,
        fontSize: 14,
        lineHeight: 1.7,
        color: ON_INK_SOFT,
        opacity: prm ? 1 : opacity,
        y: prm ? 0 : y,
        willChange: "transform, opacity",
      }}
    >
      A private link for every send. A re-open days later is filing behavior
      — it&rsquo;s marked.
    </motion.p>
  );
}
