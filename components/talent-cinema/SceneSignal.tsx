"use client";

/* ═══════════════════════════════════════════════════════════════════
   /talent — Scene 5: "Signal"
   Re-stages Intel's seismograph: attention plotted day by day, with a
   named link's opens traced across the same spikes so surges have
   causes — and an honest floor under small samples.
   ═══════════════════════════════════════════════════════════════════ */

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import {
  EASE,
  CREAM,
  GOLD,
  ON_CREAM,
  ON_CREAM_FAINT,
  HAIR_CREAM,
  PRODUCT_SERIF,
  V,
  Mono,
  Caption,
} from "./shared";

/* 28 days of activity — two clear surges at indices 9 and 21. */
const BAR_HEIGHTS = [
  14, 22, 8, 30, 18, 12, 26, 20, 15, 118, 34, 19, 10, 24, 16, 28, 12, 20, 9,
  32, 18, 112, 40, 14, 22, 10, 26, 16,
];
/* card pulls on the same days — correlated, same two spikes. */
const PULLS = [
  1, 2, 0, 3, 2, 1, 3, 2, 1, 12, 4, 2, 1, 3, 2, 3, 1, 2, 1, 4, 2, 11, 5, 2, 3,
  1, 3, 2,
];

const ANNOTATIONS = [
  { index: 9, label: "NEW DIGITALS", align: "center" as const },
  { index: 21, label: "APPLIED — METRO MODELS", align: "right" as const },
];

const LEDGER = [
  { label: "Reviews", value: "3", gold: false },
  { label: "Advances", value: "1", gold: false },
  { label: "Card pulls", value: "12", gold: true },
  { label: "Link opens", value: "48", gold: false },
];

const BASELINE_Y = 200;
const CHART_W = 560;
const CHART_H = 240;
const X_START = 12;
const X_SPACING = (CHART_W - X_START * 2) / (BAR_HEIGHTS.length - 1);
const PULL_MAX = 14;
const PULL_SPAN = 150;

const xAt = (i: number) => X_START + i * X_SPACING;
const pullY = (v: number) => BASELINE_Y - (v / PULL_MAX) * PULL_SPAN;

export default function SceneSignal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;

  const polylinePoints = BAR_HEIGHTS.map((_, i) => `${xAt(i)},${pullY(PULLS[i])}`).join(" ");

  /* Scrollytelling: the gold attention line draws with the scrollbar, and
     each annotation surfaces as the line reaches its day. Quantized state
     (not raw style bindings) keeps the draw robust across hydration. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center 0.32"],
  });
  const [drawn, setDrawn] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const q = Math.round(Math.max(0, Math.min(1, v)) * 50) / 50;
    if (q !== drawn) setDrawn(q);
  });
  const annVisible = [drawn >= 9 / 27 + 0.04, drawn >= 21 / 27 + 0.04];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden texture-grain py-24 lg:py-36"
      style={{ backgroundColor: CREAM }}
    >
      <div className="absolute inset-x-0 top-0 h-px divider-gold-center" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left — caption */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0.4 : 0.8, ease: EASE }}
          className="flex flex-col justify-center"
        >
          <Caption dark={false} headline={<>{"See who "}<V>leaned in</V>{"."}</>}>
            Send a named, revocable link to one booker — and know when it was
            opened. Reviews, advances, card pulls: measured day by day, your
            own moves annotated on the spikes so surges have causes. And when
            a sample is too small to mean anything, Pholio says so — it never
            invents a number.
          </Caption>
        </motion.div>

        {/* Right — the chart */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0.4 : 0.9, ease: EASE, delay: reduced ? 0 : 0.15 }}
          className="flex flex-col justify-center"
        >
          <div className="relative">
            <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="w-full" style={{ overflow: "visible" }}>
              {/* baseline */}
              <line
                x1={0}
                y1={BASELINE_Y}
                x2={CHART_W}
                y2={BASELINE_Y}
                stroke="rgba(26,26,26,0.14)"
                strokeWidth={1}
              />

              {/* day bars */}
              {BAR_HEIGHTS.map((h, i) => {
                const x = xAt(i);
                const y = BASELINE_Y - h;
                return (
                  <motion.rect
                    key={i}
                    x={x}
                    y={y}
                    width={2}
                    height={h}
                    fill="rgba(26,26,26,0.16)"
                    style={{ transformBox: "fill-box", transformOrigin: "center bottom" } as React.CSSProperties}
                    initial={reduced ? { opacity: 0 } : { scaleY: 0, opacity: 1 }}
                    animate={
                      inView
                        ? reduced
                          ? { opacity: 1 }
                          : { scaleY: 1, opacity: 1 }
                        : {}
                    }
                    transition={
                      reduced
                        ? { duration: 0.4, ease: EASE }
                        : { duration: 0.5, ease: EASE, delay: i * 0.02 }
                    }
                  />
                );
              })}

              {/* card-pulls polyline — drawn by the scrollbar */}
              {reduced ? (
                <motion.polyline
                  points={polylinePoints}
                  fill="none"
                  stroke={GOLD}
                  strokeWidth={1.5}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              ) : (
                <polyline
                  points={polylinePoints}
                  fill="none"
                  stroke={GOLD}
                  strokeWidth={1.5}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - drawn}
                  style={{ transition: "stroke-dashoffset 0.25s linear" }}
                />
              )}

              {/* annotation ticks + leaders */}
              {ANNOTATIONS.map((a, i) => {
                const x = xAt(a.index);
                const y = pullY(PULLS[a.index]);
                const leaderTopY = y - 4 - 28;
                const visible = reduced ? inView : annVisible[i];
                return (
                  <g
                    key={a.index}
                    style={{
                      opacity: visible ? 1 : 0,
                      transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <line x1={x} y1={y - 4} x2={x} y2={leaderTopY} stroke="rgba(201,165,90,0.4)" strokeWidth={1} />
                    <rect
                      x={x - 2}
                      y={y - 2}
                      width={4}
                      height={4}
                      fill={GOLD}
                      transform={`rotate(45 ${x} ${y})`}
                    />
                  </g>
                );
              })}
            </svg>

            {/* annotation labels — desktop/tablet only */}
            {ANNOTATIONS.map((a, i) => {
              const x = xAt(a.index);
              const y = pullY(PULLS[a.index]);
              const leaderTopY = y - 4 - 28;
              const visible = reduced ? inView : annVisible[i];
              return (
                <div
                  key={a.index}
                  className="pointer-events-none absolute hidden sm:block"
                  style={{
                    left: `${(x / CHART_W) * 100}%`,
                    top: `${(leaderTopY / CHART_H) * 100}%`,
                    transform:
                      a.align === "center" ? "translate(-50%, -100%)" : "translate(-85%, -100%)",
                    whiteSpace: "nowrap",
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <Mono color={ON_CREAM_FAINT} size={9} tracking="0.18em">
                    {a.label}
                  </Mono>
                </div>
              );
            })}
          </div>

          {/* mobile legend fallback */}
          <div className="mt-4 flex flex-col gap-2 sm:hidden">
            {ANNOTATIONS.map((a) => (
              <div key={a.index} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  style={{
                    width: 4,
                    height: 4,
                    background: GOLD,
                    display: "inline-block",
                    transform: "rotate(45deg)",
                  }}
                />
                <Mono color={ON_CREAM_FAINT} size={9} tracking="0.18em">
                  {a.label}
                </Mono>
              </div>
            ))}
          </div>

          {/* attention ledger */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4">
            {LEDGER.map((item, i) => (
              <div
                key={item.label}
                style={{
                  borderRight: i < LEDGER.length - 1 ? `1px solid ${HAIR_CREAM}` : "none",
                  paddingLeft: i === 0 ? 0 : 20,
                  paddingRight: 20,
                  paddingBottom: 12,
                }}
              >
                <Mono color={ON_CREAM_FAINT} size={10} tracking="0.2em">
                  {item.label}
                </Mono>
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: PRODUCT_SERIF,
                    fontSize: 22,
                    color: item.gold ? GOLD : ON_CREAM,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* footnote */}
          <div className="mt-6">
            <Mono color={ON_CREAM_FAINT} size={9} tracking="0.16em">
              Under 20 views, Intel says: too early to read
            </Mono>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
