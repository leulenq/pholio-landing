"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { EditorialNoir, MaisonBlanc, SwissGrid, VelvetRunway } from "./compcard";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const ease = [0.22, 1, 0.36, 1] as const;

/* ═══════════════════════════════════════════════════════════════════
   NARRATIVE PHASES
   ═══════════════════════════════════════════════════════════════════ */

const PHASES = [
  {
    key: "editorial-noir",
    eyebrow: "COMP CARD",
    label: "I",
    headline: ["One card.", "Every room."],
    body: "Your measurements, your best angles, your story — built into a single document that casting directors actually keep.",
    accent: "#C9A55A",
  },
  {
    key: "photo-intelligence",
    eyebrow: "PHOTO CURATION",
    label: "II",
    headline: ["The right photo", "changes everything."],
    body: "Upload your gallery. Pholio reads composition, lighting, and posture — then selects the four shots a casting director would choose.",
    accent: "#8b7355",
  },
  {
    key: "design-curation",
    eyebrow: "CARD DESIGN",
    label: "III",
    headline: ["A card that looks", "like you."],
    body: "Editorial talent gets dark and cinematic. Commercial gets clean and open. Lifestyle gets warm. The format matches your market.",
    accent: "#0a0a0a",
  },
  {
    key: "agency-ready",
    eyebrow: "SHARE & EXPORT",
    label: "IV",
    headline: ["Send it today.", "Book it tomorrow."],
    body: "PDF, shareable link, or a live card inside the Pholio network. Everything they need — nothing they have to chase down.",
    accent: "#C9A55A",
  },
];

const CARD_COMPONENTS = [EditorialNoir, MaisonBlanc, SwissGrid, VelvetRunway];

/* ═══════════════════════════════════════════════════════════════════ */

export default function SceneCompCard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardAreaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  // ── Mouse tracking for 3D tilt ────────────────────────────────
  const springCfg = { damping: 25, stiffness: 180 };
  const mx = useSpring(0, springCfg);
  const my = useSpring(0, springCfg);
  const rotX = useTransform(my, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [8, -8]);
  const rotY = useTransform(mx, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-8, 8]);
  const glareX = useTransform(mx, [-0.5, 0.5], ["110%", "-110%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["110%", "-110%"]);
  const glareOp = useTransform(mx, [-0.5, 0.5], [0, 0.15]);
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardAreaRef.current || prefersReducedMotion) return;
      const r = cardAreaRef.current.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mx, my, prefersReducedMotion]
  );
  const onLeave = useCallback(() => {
    setHovered(false);
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  // ── Scroll ────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= 0.75) setPhase(3);
    else if (v >= 0.5) setPhase(2);
    else if (v >= 0.22) setPhase(1);
    else setPhase(0);
  });

  // ── Card kinematics ───────────────────────────────────────────
  /*
   * Tighter entry range: card is visible within the first ~20vh of the
   * 400vh section instead of the first ~40vh. Eliminates the empty dark
   * void users see before the card appears.
   */
  const cardY = useTransform(
    scrollYProgress,
    [0, 0.06, 0.9, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [60, 0, 0, 80]
  );
  const cardRotZ = useTransform(
    scrollYProgress,
    [0, 0.06, 0.35, 0.55, 0.75, 1],
    prefersReducedMotion ? [0, 0, 0, 0, 0, 0] : [3, 1.5, -1, 0.8, -0.5, 3]
  );
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1],
    [0.84, 1, 1, 0.85]
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.92, 1],
    [0, 1, 1, 0]
  );

  // ── Atmosphere ────────────────────────────────────────────────
  const glowOp = useTransform(scrollYProgress, [0, 0.12, 0.5, 0.85, 1], [0.01, 0.06, 0.1, 0.06, 0.01]);
  const glowSc = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.3, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [20, -20]);

  // ── Scan line (phase 1) ───────────────────────────────────────
  const scanTop = useTransform(scrollYProgress, [0.22, 0.45], ["0%", "100%"]);
  const scanOp = useTransform(scrollYProgress, [0.2, 0.24, 0.42, 0.48], [0, 1, 1, 0]);

  // ── Floating particles ────────────────────────────────────────
  const [particles] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 1.5,
      delay: Math.random() * 8,
      dur: 8 + Math.random() * 12,
    }))
  );

  const p = PHASES[phase];

  return (
    <section ref={sectionRef} id="features" className="relative" style={{ height: "400vh" }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: "#050505" }}>

        {/* ── ATMOSPHERE ──────────────────────────────────────── */}

        {/* Accent glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            right: "5%",
            top: "38%",
            width: 550,
            height: 550,
            borderRadius: "50%",
            filter: "blur(180px)",
            backgroundColor: p.accent,
            opacity: glowOp,
            scale: glowSc,
          }}
        />

        {/* Warm depth glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            left: "-6%",
            bottom: "18%",
            width: 350,
            height: 350,
            borderRadius: "50%",
            filter: "blur(200px)",
            backgroundColor: "rgba(201,165,90,0.02)",
          }}
        />

        {/* Film grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light"
          style={{
            opacity: 0.02,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "150px 150px",
          }}
        />

        {/* Editorial rule lines */}
        {!prefersReducedMotion && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
            <div style={{ position: "absolute", left: "8%", top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(201,165,90,0.06) 30%, rgba(201,165,90,0.06) 70%, transparent)" }} />
            <div style={{ position: "absolute", right: "8%", top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(201,165,90,0.04) 40%, rgba(201,165,90,0.04) 60%, transparent)" }} />
          </div>
        )}

        {/* Ghost watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-[1] select-none"
          style={{ right: "6%", top: "50%", transform: "translateY(-50%)", opacity: 0.018 }}
        >
          <span className="font-editorial" style={{ fontSize: "clamp(18rem, 28vw, 32rem)", lineHeight: 0.8, color: "#C9A55A" }}>
            CC
          </span>
        </div>

        {/* ── CONTENT ────────────────────────────────────────── */}
        <div className="relative z-10 h-full flex items-center">
          <div className="mx-auto max-w-[1240px] w-full px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:gap-16 lg:grid-cols-[36fr_64fr] items-center">

              {/* ═══ LEFT — Narrative ═══════════════════════════ */}
              <motion.div className="flex flex-col items-start" style={{ y: textY }}>

                {/* Eyebrow — editorial label */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={p.key + "-e"}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease }}
                    className="mb-3 flex items-center gap-3"
                  >
                    <div className="divider-gold" style={{ width: 24 }} />
                    <span className="text-label" style={{ color: "var(--color-gold)", fontSize: "0.6875rem" }}>
                      {p.eyebrow}
                    </span>
                    <motion.span
                      key={p.label}
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-editorial-italic"
                      style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", letterSpacing: "0.02em" }}
                    >
                      {p.label}
                    </motion.span>
                  </motion.div>
                </AnimatePresence>

                {/* Headline */}
                <div className="mb-4 min-h-[90px] sm:min-h-[105px]">
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={p.key + "-h"}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -22 }}
                      transition={{ duration: 0.5, ease }}
                      className="font-editorial text-[2.1rem] sm:text-[3.1rem] md:text-[3.2rem] leading-[1.04] tracking-tight"
                      style={{ color: "#ffffff", fontWeight: 400 }}
                    >
                      {p.headline[0]}
                      <br />
                      <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>
                        {p.headline[1]}
                      </span>
                    </motion.h2>
                  </AnimatePresence>
                </div>

                {/* Body */}
                <div className="mb-8 max-w-[370px] min-h-[60px]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={p.key + "-p"}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, delay: 0.06, ease }}
                      className="text-[14px] leading-[1.65]"
                      style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "-0.005em" }}
                    >
                      {p.body}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Phase progress — editorial section markers */}
                <div className="mb-8 flex items-center gap-1">
                  {PHASES.map((item, i) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        // Scroll to approximate phase position
                        if (sectionRef.current) {
                          const top = sectionRef.current.offsetTop;
                          const h = sectionRef.current.offsetHeight;
                          window.scrollTo({ top: top + h * (i * 0.25 + 0.05), behavior: "smooth" });
                        }
                      }}
                      className="group flex items-center"
                      style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
                    >
                      <motion.div
                        className="flex items-center justify-center"
                        style={{ width: 28, height: 28 }}
                        animate={{
                          opacity: i === phase ? 1 : 0.25,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <span
                          className="font-editorial-italic"
                          style={{ fontSize: "0.8125rem", color: i === phase ? "var(--color-gold)" : "rgba(255,255,255,0.4)" }}
                        >
                          {item.label}
                        </span>
                      </motion.div>
                      {i < PHASES.length - 1 && (
                        <motion.div
                          style={{ width: 20, height: 1, flexShrink: 0 }}
                          animate={{
                            backgroundColor: i < phase ? "rgba(201,165,90,0.35)" : "rgba(255,255,255,0.08)",
                          }}
                          transition={{ duration: 0.4 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={`${APP_URL}/casting`}
                  className="btn-gold rounded-[8px]"
                  style={{ padding: "0.8rem 1.8rem", fontSize: "13px" }}
                >
                  <span>Begin Your Card</span>
                </a>
              </motion.div>

              {/* ═══ RIGHT — Card Showcase ══════════════════════ */}
              <div className="relative flex justify-center lg:justify-end">
                <div
                  ref={cardAreaRef}
                  style={{ perspective: 1200, transformStyle: "preserve-3d" }}
                  onMouseMove={onMove}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={onLeave}
                >
                  <motion.div
                    style={{
                      y: cardY,
                      rotateZ: cardRotZ,
                      rotateX: rotX,
                      rotateY: rotY,
                      scale: cardScale,
                      opacity: cardOpacity,
                      transformOrigin: "center center",
                    }}
                  >
                    {/* Card container with cross-fade */}
                    <div
                      className="relative rounded-[6px] overflow-hidden"
                      style={{
                        width: 400,
                        height: 600,
                        boxShadow:
                          "0 40px 100px -15px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
                        maxWidth: "85vw",
                        willChange: "transform, opacity",
                      }}
                    >
                      {/* Only render active + adjacent cards for performance */}
                      {CARD_COMPONENTS.map((Card, i) => {
                        // Only mount active card and the previous/next for smooth transition
                        const shouldMount = Math.abs(i - phase) <= 1 || (phase === 0 && i === CARD_COMPONENTS.length - 1) || (phase === CARD_COMPONENTS.length - 1 && i === 0);
                        if (!shouldMount) return <div key={i} className="absolute inset-0" />;
                        return (
                          <motion.div
                            key={i}
                            className="absolute inset-0"
                            initial={false}
                            animate={{ opacity: i === phase ? 1 : 0 }}
                            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            style={{ pointerEvents: i === phase ? "auto" : "none" }}
                          >
                            <Card />
                          </motion.div>
                        );
                      })}

                      {/* AI scan line — visible during phase 1 */}
                      <motion.div
                        className="absolute inset-x-0 z-30 pointer-events-none"
                        style={{
                          height: 2,
                          top: scanTop,
                          opacity: scanOp,
                          background: "linear-gradient(90deg, transparent 0%, #C9A55A 25%, #C9A55A 75%, transparent 100%)",
                          boxShadow: "0 0 20px 4px rgba(201,165,90,0.3), 0 0 60px 8px rgba(201,165,90,0.1)",
                        }}
                      />

                      {/* Hover glare */}
                      {hovered && !prefersReducedMotion && (
                        <motion.div
                          className="pointer-events-none absolute inset-0 z-40 rounded-[6px]"
                          style={{
                            background: "radial-gradient(circle at center, rgba(255,255,255,0.6) 0%, transparent 55%)",
                            x: glareX,
                            y: glareY,
                            opacity: glareOp,
                            mixBlendMode: "overlay",
                          }}
                        />
                      )}
                    </div>

                    {/* Floating AI badge */}
                    <AnimatePresence>
                      {phase >= 1 && (
                        <motion.div
                          key={`badge-${phase}`}
                          initial={{ opacity: 0, y: 8, scale: 0.92 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.92 }}
                          transition={{ duration: 0.35, ease }}
                          className="absolute -top-8 right-0 flex items-center gap-2 pointer-events-none"
                        >
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5L8 1z" fill="#C9A55A" opacity="0.8" />
                          </svg>
                          <span
                            className="text-[9px] uppercase tracking-[0.08em] font-semibold px-2 py-1 rounded-full"
                            style={{
                              color: "#C9A55A",
                              backgroundColor: "rgba(201,165,90,0.08)",
                              border: "1px solid rgba(201,165,90,0.15)",
                              backdropFilter: "blur(8px)",
                            }}
                          >
                            {phase === 1 ? "AI Analyzing" : phase === 2 ? "AI Curated" : "Ready to Export"}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* SVG annotations — phases 0 & 3 */}
                    <AnimatePresence>
                      {(phase === 0 || phase === 3) && (
                        <>
                          <motion.div
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="absolute top-[22%] -right-3 sm:-right-6 hidden sm:flex items-center gap-2 pointer-events-none"
                          >
                            <svg width="28" height="1" className="opacity-35"><line x1="0" y1="0.5" x2="28" y2="0.5" stroke="#C9A55A" strokeWidth="1" strokeDasharray="3 2" /></svg>
                            <span className="text-[8px] uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.3)" }}>
                              {phase === 0 ? "Hero shot" : "Export PDF"}
                            </span>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, x: 6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 6 }}
                            transition={{ duration: 0.4, delay: 0.45 }}
                            className="absolute top-[58%] -left-3 sm:-left-6 hidden sm:flex items-center gap-2 pointer-events-none flex-row-reverse"
                          >
                            <svg width="28" height="1" className="opacity-35"><line x1="28" y1="0.5" x2="0" y2="0.5" stroke="#C9A55A" strokeWidth="1" strokeDasharray="3 2" /></svg>
                            <span className="text-[8px] uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.3)" }}>
                              {phase === 0 ? "Measurements" : "Share link"}
                            </span>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ opacity: phase === 0 ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[9px] uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.2)" }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes cc-ping {
          75%, 100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
