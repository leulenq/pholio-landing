/* ═══════════════════════════════════════════════════════════════════
   ANIM — arrival helpers. Motion is the act of arriving into place, once.
   Every value rides the single brand easing unless told otherwise.
   ═══════════════════════════════════════════════════════════════════ */

import { interpolate, type EasingFunction } from "remotion";
import { EASE } from "../theme";

type Opts = {
  easing?: EasingFunction;
  from?: number;
  to?: number;
};

/** Eased progress 0→1 across [start, start+dur], clamped at both ends. */
export const arrive = (
  frame: number,
  start: number,
  dur: number,
  { easing = EASE, from = 0, to = 1 }: Opts = {}
) =>
  interpolate(frame, [start, start + dur], [from, to], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** A reveal that lifts and fades in (the canonical Pholio arrival). */
export const liftIn = (frame: number, start: number, dur = 26, lift = 26) => ({
  opacity: arrive(frame, start, dur),
  transform: `translateY(${arrive(frame, start, dur, { from: lift, to: 0 })}px)`,
});

/** Deterministic pseudo-random in [0,1) from an integer seed. */
export const seeded = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
