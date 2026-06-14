"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────
   SLOT 4 — "The Reveal" (Scout AI)
   Pholio's signature talent moment. Upload photos → Scout analyzes your
   look and scores your fit across categories (the real fit_score_* fields:
   runway / editorial / commercial / lifestyle / swim-fitness), returns a
   verdict (image_analysis.castingNotes), measurement estimates, and market
   signals. Here that reading FORMS on scroll as a fit-score radar — the
   page's proof that the platform actually understands you, in the
   industry's own language. Visual mechanic: data-as-editorial (a drawn
   radar), unlike any other section. Swap placeholders for live Scout data.
   ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

const CATEGORIES = [
  { label: "Editorial", score: 95 },
  { label: "Runway", score: 88 },
  { label: "Commercial", score: 82 },
  { label: "Lifestyle", score: 76 },
  { label: "Swim / Fitness", score: 70 },
];
const OVERALL = 90;

const SIGNALS = [
  { k: "Archetype", v: "Editorial-forward" },
  { k: "Est. height", v: "178 cm" },
  { k: "Booking strength", v: "Versatile range" },
];

// Radar geometry — viewBox 320×320, center (160,160), radius 120.
const CX = 160, CY = 160, R = 120;
const pt = (i: number, f: number): [number, number] => {
  const a = ((-90 + i * (360 / CATEGORIES.length)) * Math.PI) / 180;
  return [CX + R * f * Math.cos(a), CY + R * f * Math.sin(a)];
};
const poly = (f: number) => CATEGORIES.map((_, i) => pt(i, f).join(",")).join(" ");
const dataPoly = CATEGORIES.map((c, i) => pt(i, c.score / 100).join(",")).join(" ");

function OverallCounter({ go }: { go: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    const c = animate(0, OVERALL, { duration: 1.5, ease, onUpdate: (v) => setN(v) });
    return () => c.stop();
  }, [go]);
  return <>{Math.round(n)}</>;
}

export default function SceneReveal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden texture-grain"
      style={{ backgroundColor: "#0B0F18", color: "#FAF7F2" }}
    >
      <div className="absolute inset-x-0 top-0 h-px divider-gold-center" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-36">
        {/* ── Left: the claim + Scout's read ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.34em]" style={{ color: "#C9A55A" }}>
            The Reveal · Scout AI
          </span>
          <h2 className="font-editorial mt-6 text-[2.7rem] leading-[1.04] sm:text-5xl md:text-6xl">
            It reads you in{" "}
            <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
              seconds
            </span>
            .
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed" style={{ color: "rgba(250,247,242,0.62)" }}>
            Upload your photos. Scout maps your archetype, estimates your
            measurements, and scores your fit across every category — the way a
            casting director would, the moment you arrive.
          </p>

          {/* verdict */}
          <div className="mt-10">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, #C9A55A, rgba(201,165,90,0))" }} />
            <p className="mt-4 font-editorial text-xl md:text-2xl" style={{ color: "#FAF7F2" }}>
              &ldquo;Editorial-forward, with genuine{" "}
              <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
                runway
              </span>{" "}
              range.&rdquo;
            </p>
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: "rgba(250,247,242,0.4)" }}>
              Scout&rsquo;s read
            </span>
          </div>

          {/* signals */}
          <div className="mt-9 flex flex-col gap-3">
            {SIGNALS.map((s, i) => (
              <motion.div
                key={s.k}
                className="flex items-baseline gap-4"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease, delay: 0.5 + i * 0.12 }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "#C9A55A", minWidth: 132 }}>
                  {s.k}
                </span>
                <span className="h-px flex-1" style={{ backgroundColor: "rgba(250,247,242,0.12)" }} />
                <span className="font-editorial text-[15px]">{s.v}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: the fit-score radar ─────────────────────────── */}
        <div className="relative mx-auto w-full max-w-[440px]">
          <svg viewBox="0 0 320 320" className="w-full" style={{ overflow: "visible" }}>
            {/* concentric rings */}
            {[0.25, 0.5, 0.75, 1].map((f) => (
              <polygon
                key={f}
                points={poly(f)}
                fill="none"
                stroke="rgba(201,165,90,0.16)"
                strokeWidth={1}
              />
            ))}
            {/* axes */}
            {CATEGORIES.map((_, i) => {
              const [x, y] = pt(i, 1);
              return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="rgba(201,165,90,0.16)" strokeWidth={1} />;
            })}
            {/* data polygon — grows from center as the reading forms */}
            <motion.polygon
              points={dataPoly}
              fill="rgba(201,165,90,0.14)"
              stroke="#C9A55A"
              strokeWidth={1.5}
              strokeLinejoin="round"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.4, ease }}
              style={{ transformOrigin: "160px 160px", transformBox: "view-box" } as React.CSSProperties}
            />
            {/* vertex ticks (not dots — short radial marks) */}
            {CATEGORIES.map((c, i) => {
              const [x, y] = pt(i, c.score / 100);
              return (
                <motion.rect
                  key={i}
                  x={x - 2}
                  y={y - 2}
                  width={4}
                  height={4}
                  fill="#C9A55A"
                  transform={`rotate(45 ${x} ${y})`}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, ease, delay: 1 + i * 0.08 }}
                />
              );
            })}
          </svg>

          {/* axis labels + scores */}
          {CATEGORIES.map((c, i) => {
            const [x, y] = pt(i, 1.16);
            return (
              <motion.div
                key={c.label}
                className="absolute flex flex-col items-center text-center"
                style={{ left: `${(x / 320) * 100}%`, top: `${(y / 320) * 100}%`, transform: "translate(-50%,-50%)", width: 110 }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, ease, delay: 0.7 + i * 0.1 }}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: "rgba(250,247,242,0.55)" }}>
                  {c.label}
                </span>
                <span className="font-editorial-italic text-lg" style={{ color: "#C9A55A" }}>
                  {c.score}
                </span>
              </motion.div>
            );
          })}

          {/* overall */}
          <motion.div
            className="mt-10 flex items-baseline justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.9 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: "rgba(250,247,242,0.5)" }}>
              Overall fit
            </span>
            <span className="font-editorial text-4xl" style={{ color: "#FAF7F2" }}>
              <OverallCounter go={inView} />
            </span>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px divider-gold-center" />
    </section>
  );
}
