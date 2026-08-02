"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────
   "Perception" — Pholio's intelligence layer for talent.
   The intelligence lives inside the product. You arrive and you are seen:
   the system studies a portrait — your presence, your strongest frame —
   and composes editorial direction around you. This is the director's eye
   (perception + taste), deliberately NOT measurement/scoring (that read
   belongs to the later Scout / Reveal section). Premium through restraint.
   ────────────────────────────────────────────────────────────────────── */

const GOLD = "#C9A55A";
const CREAM = "#FAF7F2";

// ── Tunable knobs ───────────────────────────────────────────────────────
// A strong editorial portrait. Grayscale + warm grain on-brand. Swap for
// real talent imagery. crop=faces keeps the face framed, not cropped badly.
const PORTRAIT =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1000&h=1250&fit=crop&crop=faces";

// Perception notes — the discerning eye. Taste, not metrics.
//   y  = vertical anchor on the portrait (0 top → 1 bottom), desktop only
//   at = scroll-progress point (0–1) where the note resolves, in reading order
const NOTES = [
  { text: "Editorial-forward — luminous under hard light.", y: 0.18, at: 0.32 },
  { text: "Strongest on the three-quarter turn.", y: 0.48, at: 0.46 },
  { text: "Built for stillness. Let the frame hold.", y: 0.78, at: 0.6 },
];

// ── Perception note — anchored to the portrait edge, resolves on scroll ──
function PerceptionNote({
  text,
  y,
  at,
  progress,
  rm,
}: {
  text: string;
  y: number;
  at: number;
  progress: MotionValue<number>;
  rm: boolean | null;
}) {
  const opacity = useTransform(progress, [at - 0.08, at], [0, 1]);
  const x = useTransform(progress, [at - 0.08, at], [-14, 0]);
  return (
    <motion.div
      className="absolute right-full flex w-[15rem] items-center justify-end gap-3 pr-6 text-right"
      style={{ top: `${y * 100}%`, ...(rm ? {} : { opacity, x }) }}
    >
      <p
        className="font-editorial text-[15px] leading-snug"
        style={{ color: "rgba(250,247,242,0.84)" }}
      >
        {text}
      </p>
      <span
        className="h-px w-9 shrink-0"
        style={{
          background: `linear-gradient(to right, rgba(201,165,90,0), ${GOLD})`,
        }}
      />
      {/* diamond tick on the portrait edge (a mark, never a dot) */}
      <span
        className="absolute right-0 top-1/2 h-[7px] w-[7px] -translate-y-1/2 translate-x-1/2 rotate-45"
        style={{ backgroundColor: GOLD }}
      />
    </motion.div>
  );
}

export default function SceneIntelligence() {
  const ref = useRef<HTMLElement>(null);
  const rm = useReducedMotion();

  // 0 as the section enters from the bottom, 1 as it leaves the top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Arrival of the frame + the words.
  const headOpacity = useTransform(scrollYProgress, [0.04, 0.18], [0, 1]);
  const headY = useTransform(scrollYProgress, [0.04, 0.18], [26, 0]);
  const portraitOpacity = useTransform(scrollYProgress, [0.06, 0.2], [0, 1]);
  const portraitScale = useTransform(scrollYProgress, [0.06, 0.28], [1.06, 1]);

  // The reading — a focus line sweeps the frame, then yields to composition.
  const focusY = useTransform(scrollYProgress, [0.14, 0.62], ["7%", "93%"]);
  const focusOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.18, 0.62, 0.72],
    [0, 1, 1, 0],
  );

  // Taste applied — a warm grade blooms as the read resolves.
  const gradeOpacity = useTransform(scrollYProgress, [0.5, 0.78], [0, 0.16]);

  // The composed direction — the payoff.
  const composeOpacity = useTransform(scrollYProgress, [0.72, 0.86], [0, 1]);
  const composeY = useTransform(scrollYProgress, [0.72, 0.86], [22, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[160vh] items-center overflow-hidden texture-grain"
      style={{ backgroundColor: "#050505", color: CREAM }}
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-32 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* ── Words: kicker, headline, composed direction ─────────────── */}
        <motion.div
          className="lg:col-span-5"
          style={rm ? undefined : { opacity: headOpacity, y: headY }}
        >
          <span
            className="font-mono text-[10px] uppercase tracking-[0.34em]"
            style={{ color: GOLD }}
          >
            Perception
          </span>
          <h2 className="font-editorial mt-6 text-[2.7rem] leading-[1.04] sm:text-5xl md:text-6xl">
            It sees what sets you{" "}
            <span className="font-editorial-italic" style={{ color: GOLD }}>
              apart
            </span>
            .
          </h2>
          <p
            className="mt-7 max-w-sm text-[15px] leading-relaxed"
            style={{ color: "rgba(250,247,242,0.6)" }}
          >
            The moment you arrive, Pholio is studying your presence — and
            composing how the world should meet you.
          </p>

          {/* Composed direction — the intelligence's verdict */}
          <motion.div
            className="mt-12"
            style={rm ? undefined : { opacity: composeOpacity, y: composeY }}
          >
            <div
              className="h-px w-14"
              style={{
                background: `linear-gradient(to right, ${GOLD}, rgba(201,165,90,0))`,
              }}
            />
            <span
              className="mt-4 block font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: "rgba(250,247,242,0.45)" }}
            >
              The direction
            </span>
            <p className="mt-3 font-editorial text-xl leading-snug md:text-2xl">
              Lead with stillness. Shoot it close, in{" "}
              <span className="font-editorial-italic" style={{ color: GOLD }}>
                monochrome
              </span>
              .
            </p>
          </motion.div>
        </motion.div>

        {/* ── The studied portrait ────────────────────────────────────── */}
        <div className="lg:col-span-7 lg:pl-[15rem]">
          <motion.div
            className="relative mx-auto w-full max-w-[26rem]"
            style={
              rm ? undefined : { opacity: portraitOpacity, scale: portraitScale }
            }
          >
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4 / 5", boxShadow: "0 40px 120px rgba(0,0,0,0.55)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PORTRAIT}
                alt="A talent portrait being studied by the platform"
                className="h-full w-full object-cover"
                style={{ filter: "grayscale(1) contrast(1.06) brightness(0.96)" }}
                loading="lazy"
              />

              {/* warm grade — taste applied as the read resolves */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 80% at 50% 35%, rgba(201,165,90,0.5), rgba(201,165,90,0) 60%)",
                  mixBlendMode: "overlay",
                  opacity: rm ? 0.12 : gradeOpacity,
                }}
              />

              {/* grain over the portrait */}
              <div className="pointer-events-none absolute inset-0 texture-grain opacity-60" />

              {/* reading focus — sweeps the frame as you scroll */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 h-px"
                style={{
                  top: rm ? "40%" : focusY,
                  opacity: rm ? 0.55 : focusOpacity,
                  background: `linear-gradient(to right, rgba(201,165,90,0), ${GOLD} 30%, ${GOLD} 70%, rgba(201,165,90,0))`,
                  boxShadow: "0 0 22px 1px rgba(201,165,90,0.55)",
                }}
              />

              {/* frame hairline */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ border: "1px solid rgba(201,165,90,0.22)" }}
              />
            </div>

            {/* Perception notes anchored to the frame (desktop) */}
            <div className="absolute inset-0 hidden lg:block">
              {NOTES.map((n) => (
                <PerceptionNote
                  key={n.text}
                  text={n.text}
                  y={n.y}
                  at={n.at}
                  progress={scrollYProgress}
                  rm={rm}
                />
              ))}
            </div>

            {/* Perception notes — stacked beneath the frame (mobile) */}
            <div className="mt-8 flex flex-col gap-4 lg:hidden">
              {NOTES.map((n) => (
                <div key={n.text} className="flex items-baseline gap-3">
                  <span
                    className="mt-2 h-px w-8 shrink-0"
                    style={{
                      background: `linear-gradient(to right, ${GOLD}, rgba(201,165,90,0))`,
                    }}
                  />
                  <p
                    className="font-editorial text-base leading-snug"
                    style={{ color: "rgba(250,247,242,0.84)" }}
                  >
                    {n.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px divider-gold-center" />
    </section>
  );
}
