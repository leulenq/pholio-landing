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

const ease = [0.22, 1, 0.36, 1] as const;

/* ═══════════════════════════════════════════════════════════════════
   NARRATIVE PHASES — Editorial lookbook chapters
   ═══════════════════════════════════════════════════════════════════ */

const PHASES = [
  {
    key: "editorial-noir",
    chapter: "I",
    eyebrow: "Comp Card",
    headline: "One card. Every room.",
    caption: "Your measurements, your best angles, your story — built into a single document that casting directors actually keep.",
    accent: "#C9A55A",
  },
  {
    key: "photo-intelligence",
    chapter: "II",
    eyebrow: "Photo Curation",
    headline: "The right photo changes everything.",
    caption: "Pholio reads composition, lighting, and posture — then selects the four shots a casting director would choose.",
    accent: "#8b7355",
  },
  {
    key: "design-curation",
    chapter: "III",
    eyebrow: "Card Design",
    headline: "A card that looks like you.",
    caption: "Editorial talent gets dark and cinematic. Commercial gets clean and open. The format matches your market.",
    accent: "#0a0a0a",
  },
  {
    key: "agency-ready",
    chapter: "IV",
    eyebrow: "Share & Export",
    headline: "Send it today. Book it tomorrow.",
    caption: "PDF, shareable link, or a live card inside the Pholio network. Everything they need — nothing they have to chase down.",
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
  const glareOp = useTransform(mx, [-0.5, 0.5], [0, 0.12]);
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
  const cardY = useTransform(
    scrollYProgress,
    [0, 0.06, 0.9, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [80, 0, 0, 80]
  );
  const cardRotZ = useTransform(
    scrollYProgress,
    [0, 0.06, 0.35, 0.55, 0.75, 1],
    prefersReducedMotion ? [0, 0, 0, 0, 0, 0] : [2, 0.8, -0.5, 0.4, -0.3, 2]
  );
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1],
    [0.88, 1, 1, 0.88]
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.92, 1],
    [0, 1, 1, 0]
  );

  // ── Atmosphere ────────────────────────────────────────────────
  const glowOp = useTransform(scrollYProgress, [0, 0.12, 0.5, 0.85, 1], [0.01, 0.06, 0.1, 0.06, 0.01]);
  const glowSc = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.3, 0.7]);

  const p = PHASES[phase];

  return (
    <section ref={sectionRef} id="features" className="relative" style={{ height: "400vh" }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: "#050505" }}>

        {/* ── ATMOSPHERE ──────────────────────────────────────── */}

        {/* Accent glow — follows card */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            left: "50%",
            top: "45%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            filter: "blur(180px)",
            backgroundColor: p.accent,
            opacity: glowOp,
            scale: glowSc,
          }}
        />

        {/* Warm depth glow — offset */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            right: "-5%",
            bottom: "20%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            filter: "blur(200px)",
            backgroundColor: "rgba(201,165,90,0.025)",
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

        {/* ── GHOST CHAPTER NUMERAL — massive editorial depth ── */}
        <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={p.chapter}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.03, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease }}
              className="font-editorial-italic select-none"
              style={{
                fontSize: "clamp(20rem, 45vw, 40rem)",
                lineHeight: 0.8,
                color: "#C9A55A",
              }}
            >
              {p.chapter}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* ── CENTER-STAGE CARD ──────────────────────────────── */}
        <div className="relative z-10 h-full flex items-center justify-center">

          {/* Card with 3D tilt */}
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
              <div
                className="relative rounded-[6px] overflow-hidden"
                style={{
                  width: 400,
                  height: 600,
                  boxShadow:
                    "0 60px 140px -30px rgba(0,0,0,0.7), 0 25px 60px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), 0 0 120px -30px rgba(201,165,90,0.06)",
                  maxWidth: "80vw",
                  willChange: "transform, opacity",
                }}
              >
                {/* Card cross-fade */}
                {CARD_COMPONENTS.map((Card, i) => {
                  const shouldMount =
                    Math.abs(i - phase) <= 1 ||
                    (phase === 0 && i === CARD_COMPONENTS.length - 1) ||
                    (phase === CARD_COMPONENTS.length - 1 && i === 0);
                  if (!shouldMount) return <div key={i} className="absolute inset-0" />;
                  return (
                    <motion.div
                      key={i}
                      className="absolute inset-0"
                      initial={false}
                      animate={{ opacity: i === phase ? 1 : 0 }}
                      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                      style={{ pointerEvents: i === phase ? "auto" : "none" }}
                    >
                      <Card />
                    </motion.div>
                  );
                })}

                {/* Hover glare */}
                {hovered && !prefersReducedMotion && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-40 rounded-[6px]"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(255,255,255,0.5) 0%, transparent 55%)",
                      x: glareX,
                      y: glareY,
                      opacity: glareOp,
                      mixBlendMode: "overlay",
                    }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── EDITORIAL CAPTIONS — asymmetric frame ──────────── */}

        {/* Top-left: Chapter + Eyebrow */}
        <div className="absolute top-0 left-0 z-20 pt-10 md:pt-16 pl-8 md:pl-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.key + "-eye"}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-4"
            >
              <span
                className="font-editorial-italic text-2xl md:text-3xl"
                style={{ color: "var(--color-gold)", opacity: 0.5 }}
              >
                {p.chapter}
              </span>
              <div
                style={{
                  width: 24,
                  height: 1,
                  background: "linear-gradient(to right, rgba(201,165,90,0.4), transparent)",
                }}
              />
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {p.eyebrow}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom-left: Headline */}
        <div className="absolute bottom-0 left-0 z-20 pb-10 md:pb-16 pl-8 md:pl-16 max-w-[500px]">
          <AnimatePresence mode="wait">
            <motion.h2
              key={p.key + "-h"}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease }}
              className="font-editorial text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-tight"
              style={{ color: "#ffffff" }}
            >
              {p.headline}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Bottom-right: Caption */}
        <div className="absolute bottom-0 right-0 z-20 pb-10 md:pb-16 pr-8 md:pr-16 max-w-[320px] hidden md:block">
          <AnimatePresence mode="wait">
            <motion.p
              key={p.key + "-c"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="text-[13px] leading-[1.7] text-right"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {p.caption}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ── LEFT EDGE TICKER — minimal phase indicator ──────── */}
        <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 hidden md:flex">
          {PHASES.map((item, i) => (
            <button
              key={item.key}
              onClick={() => {
                if (sectionRef.current) {
                  const top = sectionRef.current.offsetTop;
                  const h = sectionRef.current.offsetHeight;
                  window.scrollTo({
                    top: top + h * (i * 0.25 + 0.05),
                    behavior: "smooth",
                  });
                }
              }}
              style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
            >
              <motion.div
                animate={{
                  width: i === phase ? 32 : 12,
                  backgroundColor: i === phase
                    ? "rgba(201,165,90,0.7)"
                    : i < phase
                      ? "rgba(201,165,90,0.2)"
                      : "rgba(255,255,255,0.08)",
                }}
                transition={{ duration: 0.5, ease }}
                style={{ height: 2, borderRadius: 1 }}
              />
            </button>
          ))}
        </div>

        {/* ── SCROLL CUE — editorial ─────────────────────────── */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
          animate={{ opacity: phase === 0 ? 0.35 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="w-[1px] h-10"
            style={{
              background: "linear-gradient(to bottom, transparent, #C9A55A, transparent)",
              transformOrigin: "top",
            }}
            animate={{ scaleY: [0, 1, 0], y: [0, 12, 24], opacity: [0, 0.8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
