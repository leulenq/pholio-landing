"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, type MotionValue } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    title: "Upload Your Photos",
    desc: "Drop in your full library — test shots, editorial work, agency pulls.",
  },
  {
    num: "02",
    title: "Intelligent Analysis",
    desc: "Composition, lighting, expression, and market positioning scored automatically.",
  },
  {
    num: "03",
    title: "Your Best Portfolio Emerges",
    desc: "A ranked, curated selection surfaces — your strongest angles, ready to present.",
  },
];

const SCORES  = [97, 45, 94, 38, 91, 52];
const SELECTED = [true, false, true, false, true, false];
const PHOTOS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&h=300&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&h=300&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=240&h=300&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=240&h=300&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=300&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=240&h=300&fit=crop&crop=face",
];

const ease = [0.22, 1, 0.36, 1] as const;

// ─── Phase system ─────────────────────────────────────────────────────────────
// With a 350vh container and a 100vh sticky section, the section is pinned
// for scrollYProgress 0 → ~0.71. We spread 6 phases across 0 → 0.65 so all
// content is revealed comfortably before the card unpins.
//
//  Phase 0  — nothing visible
//  Phase 1  — label + headline appear          (scroll ≥ 0.06)
//  Phase 2  — portfolio analysis card appears  (scroll ≥ 0.18)
//  Phase 3  — step 01 appears                  (scroll ≥ 0.30)
//  Phase 4  — step 02 appears                  (scroll ≥ 0.42)
//  Phase 5  — step 03 + strength bar appear    (scroll ≥ 0.54)
const THRESHOLDS = [0.06, 0.18, 0.30, 0.42, 0.54];

function scrollPhase(v: number) {
  let p = 0;
  for (const t of THRESHOLDS) if (v >= t) p++;
  return p;
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface SceneAIProps {
  /** Passed from ClientPage when section lives inside a sticky 350vh container. */
  scrollYProgress?: MotionValue<number>;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SceneAI({ scrollYProgress }: SceneAIProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Fallback: if no scroll progress prop (e.g., used standalone), use inView.
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });

  // Always create a dummy MotionValue so hooks count never changes.
  const dummy = useMotionValue(0);
  const progress = scrollYProgress ?? dummy;

  // Phase state — driven by container scrollYProgress when in cinematic mode,
  // or snapped to "fully revealed" when inView fires in fallback mode.
  const [phase, setPhase] = useState(scrollYProgress ? 0 : -1);
  const phaseRef = useRef(phase);

  useMotionValueEvent(progress, "change", (latest) => {
    if (!scrollYProgress) return; // let inView handle fallback
    const next = scrollPhase(latest);
    if (next !== phaseRef.current) {
      phaseRef.current = next;
      setPhase(next);
    }
  });

  // Fallback: snap to fully revealed when element enters viewport
  useEffect(() => {
    if (!scrollYProgress && inView) {
      phaseRef.current = 99;
      setPhase(99);
    }
  }, [inView, scrollYProgress]);

  const show = (minPhase: number) => phase >= minPhase;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-full flex items-center overflow-hidden texture-grain"
      style={{ backgroundColor: "var(--color-cream-warm)" }}
    >
      <div className="w-full mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">

          {/* ── Left: headline + steps ──────────────────────────── */}
          <div>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={show(1) ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease }}
              className="mb-8"
            >
              <span className="text-label mb-5 block" style={{ color: "var(--color-gold)" }}>
                Intelligence
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl mb-5 leading-[1.05]">
                The platform{" "}
                <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>
                  works for you.
                </span>
              </h2>
              <p
                className="text-sm md:text-base leading-relaxed max-w-md"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Upload your photos. Our system analyzes composition, lighting, and
                market positioning to surface your strongest portfolio — automatically.
              </p>
            </motion.div>

            {/* Steps — each phase */}
            <div className="space-y-6">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  className="flex gap-5"
                  initial={{ opacity: 0, x: -16 }}
                  animate={
                    show(3 + i)
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -16 }
                  }
                  transition={{ duration: 0.6, ease }}
                >
                  <div
                    className="font-editorial text-2xl leading-none shrink-0 mt-0.5"
                    style={{ color: "rgba(200,169,110,0.4)" }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right: portfolio analysis card ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={show(2) ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.8, ease }}
          >
            <div
              className="rounded-2xl p-5"
              style={{
                backgroundColor: "white",
                boxShadow: "0 20px 60px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: "var(--color-text-primary)" }}>
                    Portfolio Analysis
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                    12 photos uploaded
                  </p>
                </div>
                <motion.div
                  className="flex items-center gap-1.5 rounded-full px-3 py-1"
                  style={{ backgroundColor: "rgba(200,169,110,0.1)" }}
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-gold)" }} />
                  <span className="text-[10px] font-medium" style={{ color: "var(--color-gold-dark)" }}>
                    Analyzing
                  </span>
                </motion.div>
              </div>

              {/* Photo grid — photos reveal in sequence tied to scroll */}
              <div className="grid grid-cols-3 gap-1.5 mb-4">
                {PHOTOS.map((src, i) => (
                  <motion.div
                    key={i}
                    className="relative overflow-hidden"
                    style={{ borderRadius: "4px" }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={show(2) ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease }}
                  >
                    <div style={{ aspectRatio: "4/5" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Rejected overlay */}
                    {!SELECTED[i] && (
                      <motion.div
                        className="absolute inset-0"
                        style={{ backgroundColor: "rgba(255,255,255,0.45)" }}
                        initial={{ opacity: 0 }}
                        animate={show(2) ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.5 + i * 0.06 }}
                      />
                    )}

                    {/* Score badge */}
                    <motion.div
                      className="absolute bottom-1 inset-x-1 rounded text-center py-0.5"
                      style={{ backgroundColor: SELECTED[i] ? "rgba(200,169,110,0.9)" : "rgba(0,0,0,0.45)" }}
                      initial={{ opacity: 0 }}
                      animate={show(2) ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.4 + i * 0.07 }}
                    >
                      <span
                        className="text-[9px] font-bold"
                        style={{ color: SELECTED[i] ? "var(--color-velvet)" : "rgba(255,255,255,0.7)" }}
                      >
                        {SCORES[i]}
                      </span>
                    </motion.div>

                    {/* Gold border on selected */}
                    {SELECTED[i] && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{ border: "2px solid var(--color-gold)", borderRadius: "4px" }}
                        initial={{ opacity: 0 }}
                        animate={show(2) ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.6 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Strength bar */}
              <div className="rounded-xl p-3" style={{ backgroundColor: "var(--color-cream)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold">Portfolio Strength</span>
                  <span className="text-xs font-semibold" style={{ color: "var(--color-gold-dark)" }}>
                    3 of 6 selected
                  </span>
                </div>
                <div className="h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-cream-dark)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(to right, var(--color-gold), var(--color-gold-light))" }}
                    initial={{ width: 0 }}
                    animate={show(5) ? { width: "94%" } : { width: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p className="mt-1.5 text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                  Top 3 images selected by composition + market alignment
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
