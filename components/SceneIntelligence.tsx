"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────
   "The Presence" — Pholio's intelligence layer for talent.
   NOT a feature tour. One message: an AI is built into Pholio — it knows
   you and works for you. Hero element is a single luminous gold thread
   (the intelligence itself) that draws with scroll. Pure atmosphere.
   ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;
const GOLD = "#C9A55A";
const CREAM = "#FAF7F2";

// ── Tunable knobs ───────────────────────────────────────────────────────
// Thread path in a 100×1000 viewBox, drawn top→bottom. Lives left-of-center,
// gentle meander, exits lower toward the CompCard section below.
const THREAD_D =
  "M 36 0 C 28 150, 56 250, 44 370 S 24 580, 52 720 S 72 900, 60 1000";

// Atmosphere lines: copy + scroll-progress point (0–1) where each arrives.
const LINES = [
  { text: "It learns how you read on camera.", at: 0.34 },
  { text: "It shapes how the world sees you.", at: 0.52 },
  { text: "It works while you rest — and it never leaves.", at: 0.70 },
];

export default function SceneIntelligence() {
  const ref = useRef<HTMLElement>(null);
  const headerInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden texture-grain"
      style={{ backgroundColor: "#050505", color: CREAM }}
    >
      <div className="absolute inset-x-0 top-0 h-px divider-gold-center" />

      {/* Thread — full-height background element (static for now). */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 h-full w-[42%] max-w-[440px]"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
      >
        <path
          d={THREAD_D}
          fill="none"
          stroke={GOLD}
          strokeWidth={1.25}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.9}
        />
      </svg>

      {/* Content — sits in the space opposite the thread (asymmetric). */}
      <div className="relative mx-auto max-w-7xl px-6 py-40 lg:px-8 lg:py-56">
        <div className="ml-auto w-full max-w-xl lg:pr-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.34em]"
              style={{ color: GOLD }}
            >
              Built in
            </span>
            <h2 className="font-editorial mt-6 text-[2.7rem] leading-[1.04] sm:text-5xl md:text-6xl">
              An intelligence that already{" "}
              <span className="font-editorial-italic" style={{ color: GOLD }}>
                knows
              </span>{" "}
              you.
            </h2>
          </motion.div>

          {/* Atmosphere lines (static stack for now) */}
          <div className="mt-24 flex flex-col gap-24">
            {LINES.map((line) => (
              <div key={line.text} className="flex items-baseline gap-5">
                <span
                  className="mt-2 h-px w-12 shrink-0"
                  style={{
                    background: `linear-gradient(to right, ${GOLD}, rgba(201,165,90,0))`,
                  }}
                />
                <p className="font-editorial text-2xl leading-snug md:text-3xl">
                  {line.text}
                </p>
              </div>
            ))}
          </div>

          {/* Closing line (static for now) */}
          <p
            className="mt-28 font-editorial-italic text-3xl md:text-4xl"
            style={{ color: GOLD }}
          >
            Always with you.
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px divider-gold-center" />
    </section>
  );
}
