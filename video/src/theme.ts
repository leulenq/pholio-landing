/* ═══════════════════════════════════════════════════════════════════
   THEME — the Pholio brand system, ported for motion.
   Three colours only (ink / cream / gold). One easing. Arrival, never loop.
   Canonical authority: pholio-app/Design Philosophy.html.
   ═══════════════════════════════════════════════════════════════════ */

import { Easing } from "remotion";

export const COLOR = {
  ink: "#050505",
  inkSlate: "#0F172A",
  cream: "#FAF7F2",
  creamWarm: "#F5F0E8",
  creamApp: "#FAF9F7", // the dashboard ground
  gold: "#C9A55A",
  goldWarm: "#C8A96E", // wordmark-under-glow
  goldLight: "#D4BC8A",
  goldDark: "#A8894E",
  ink70: "rgba(5,5,5,0.70)",
  ink42: "rgba(26,26,26,0.42)",
  ink12: "rgba(26,26,26,0.12)",
  ink10: "rgba(26,26,26,0.10)",
} as const;

/* The single permitted easing — out-quint, cubic-bezier(0.22,1,0.36,1). */
export const EASE = Easing.bezier(0.22, 1, 0.36, 1);

/* A slightly firmer cut for friction motion that should feel less graceful. */
export const EASE_LINEAR_OUT = Easing.bezier(0.33, 0, 0.2, 1);

export const FPS = 30;

/* The score, in seconds → frames. Hard cuts at every boundary. */
export const ACT = {
  static: { from: 0, durSec: 8 }, // I — the static (ink)
  turn: { from: 240, durSec: 5 }, // II — friction gathers (ink)
  card: { from: 390, durSec: 7 }, // III — Pholio arrives, the card forms (cream)
  studio: { from: 600, durSec: 7 }, // IV — proof, the dashboard (cream)
  close: { from: 810, durSec: 3 }, // V — the payoff (ink)
} as const;

export const TOTAL_FRAMES = 900; // 30s @ 30fps

export const sec = (s: number) => Math.round(s * FPS);

/* Editorial type stack. Families are resolved at runtime in fonts.ts. */
export const TRACK = {
  kicker: "0.32em",
  micro: "0.2em",
  display: "-0.02em",
} as const;
