// landing/components/talent/TalentSceneCompCard.tsx
"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  VelvetRunway,
  MaisonBlanc,
  SwissGrid,
} from "@/components/compcard";
import { FilmGrain, GhostWatermark, RuleLines, AiBadge } from "@/components/talent/shared";

const ease = [0.22, 1, 0.36, 1] as const;

const PHASES = [
  {
    key: "artifact",
    card: VelvetRunway,
    headline: ["The artifact that", "decides."],
    copy: "This is the object that survives the first impression. It has to be right.",
  },
  {
    key: "commercial",
    card: SwissGrid,
    headline: ["Your market,", "your card."],
    copy: "Editorial talent gets dark and cinematic. Commercial gets clean and direct. There\u2019s no one-size-fits-all.",
  },
  {
    key: "lifestyle",
    card: MaisonBlanc,
    headline: ["The format", "finds you."],
    copy: "You don\u2019t have to know which one you are \u2014 the platform reads your portfolio and decides.",
  },
];

export default function TalentSceneCompCard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardAreaRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // ── Mouse 3D tilt ───────────────────────────────────────────────
  const springCfg = { damping: 25, stiffness: 180 };
  const mx = useSpring(0, springCfg);
  const my = useSpring(0, springCfg);
  const rotX = useTransform(my, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [7, -7]);
  const rotY = useTransform(mx, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-7, 7]);
  const glareX = useTransform(mx, [-0.5, 0.5], ["110%", "-110%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["110%", "-110%"]);
  const glareOp = useTransform(mx, [-0.5, 0.5], [0, 0.14]);

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

  // ── Scroll ──────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= 0.66) setPhase(2);
    else if (v >= 0.33) setPhase(1);
    else setPhase(0);
  });

  const cardEntryY = useTransform(
    scrollYProgress,
    [0.08, 0.28],
    prefersReducedMotion ? ["0px", "0px"] : ["80px", "0px"]
  );
  const cardEntryOpacity = useTransform(scrollYProgress, [0.06, 0.22], [0, 1]);

  const cardRotZ = useTransform(
    scrollYProgress,
    [0.08, 0.28, 0.5, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [-1.5, 0, 0, 1.5]
  );

  // Glow
  const glowOp = useTransform(
    scrollYProgress,
    [0, 0.12, 0.5, 0.9, 1],
    [0, 0.12, 0.08, 0.02, 0]
  );

  const p = PHASES[phase];

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: prefersReducedMotion ? "auto" : "350vh" }}
    >
      <div
        className={
          prefersReducedMotion
            ? "relative py-24"
            : "sticky top-0 h-screen overflow-hidden"
        }
        style={{ backgroundColor: "#050505" }}
      >
        <FilmGrain />
        <RuleLines />
        <GhostWatermark label="03" />

        {/* Accent glow — centered */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 700,
            height: 700,
            filter: "blur(200px)",
            backgroundColor: "#C9A55A",
            opacity: glowOp,
          }}
        />

        {/* ── Split layout: text left | comp card right ── */}
        <div
          className={
            prefersReducedMotion
              ? "relative z-10 flex flex-col items-center px-6 py-16 gap-12"
              : "relative z-10 h-full flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-16 xl:px-24 gap-8 lg:gap-0"
          }
        >
          {/* ── Left column: narrative text ── */}
          <div className="flex flex-col w-full lg:w-[44%] lg:flex-shrink-0 lg:pr-12 xl:pr-16">
            <p
              style={{
                color: "#C9A55A",
                fontFamily: "var(--font-sans)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              {phase === 0 ? "Comp Card" : "Format Selection"}
            </p>

            <AnimatePresence mode="wait">
              <motion.h2
                key={p.key + "-h"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease }}
                className="font-editorial"
                style={{
                  fontSize: "clamp(3.2rem, 5.5vw, 5.5rem)",
                  color: "#FFFFFF",
                  fontWeight: 400,
                  lineHeight: 0.94,
                  letterSpacing: "-0.03em",
                  marginBottom: "2rem",
                }}
              >
                {p.headline[0]}
                <br />
                <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
                  {p.headline[1]}
                </span>
              </motion.h2>
            </AnimatePresence>

            {/* Phase copy */}
            <div style={{ minHeight: 80, marginBottom: "2rem" }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={p.key + "-c"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease }}
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    fontSize: "1rem",
                    fontFamily: "var(--font-sans)",
                    lineHeight: 1.7,
                    letterSpacing: "-0.005em",
                    maxWidth: 400,
                  }}
                >
                  {p.copy}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Phase 0 feature notes */}
            <AnimatePresence>
              {phase === 0 && (
                <motion.div
                  key="phase0-note"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35, ease }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {["Agency-ready format.", "Measurements included.", "Hero shot formatted."].map(
                    (label, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                        }}
                      >
                        <div
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            backgroundColor: "rgba(201,165,90,0.6)",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            color: "rgba(255,255,255,0.45)",
                            fontSize: "0.8125rem",
                            fontFamily: "var(--font-sans)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {label}
                        </span>
                      </div>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase progress dots */}
            <div className="flex items-center gap-2.5" style={{ marginBottom: "1.5rem" }}>
              {PHASES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    backgroundColor: i === phase ? "#C9A55A" : "rgba(255,255,255,0.18)",
                    width: i === phase ? 24 : 6,
                  }}
                  transition={{ duration: 0.4, ease }}
                  style={{ height: 2, borderRadius: 1 }}
                />
              ))}
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                  marginLeft: "0.75rem",
                }}
              >
                {phase + 1} / {PHASES.length}
              </span>
            </div>

            {/* Format Matched badge — phase 1+ */}
            <div style={{ height: 28, display: "flex", alignItems: "center" }}>
              <AnimatePresence>
                {phase >= 1 && (
                  <motion.div
                    key="format-badge"
                    initial={{ opacity: 0, y: 6, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.92 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <AiBadge label="Format Matched" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right column: comp card ── */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <motion.div
              style={{
                y: cardEntryY,
                opacity: cardEntryOpacity,
                rotateZ: cardRotZ,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                ref={cardAreaRef}
                style={{ perspective: 1200, transformStyle: "preserve-3d" }}
                onMouseMove={onMove}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={onLeave}
              >
                <motion.div
                  style={{
                    rotateX: rotX,
                    rotateY: rotY,
                    transformOrigin: "center center",
                  }}
                >
                  <div
                    className="relative rounded-[6px] overflow-hidden"
                    style={{
                      width: 360,
                      height: 540,
                      boxShadow:
                        "0 50px 120px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
                      willChange: "transform",
                    }}
                  >
                    {/* Card cross-fade between phases */}
                    {PHASES.map((phaseItem, i) => {
                      const Card = phaseItem.card;
                      const shouldMount = Math.abs(i - phase) <= 1;
                      if (!shouldMount) return <div key={i} className="absolute inset-0" />;
                      return (
                        <motion.div
                          key={i}
                          className="absolute inset-0"
                          initial={false}
                          animate={{ opacity: i === phase ? 1 : 0 }}
                          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
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
                            "radial-gradient(circle at center, rgba(255,255,255,0.55) 0%, transparent 55%)",
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
            </motion.div>
          </div>

          {/* ── Mobile: comp card below text ── */}
          <div className="flex lg:hidden justify-center w-full">
            <motion.div
              style={{
                opacity: cardEntryOpacity,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="relative rounded-[6px] overflow-hidden"
                style={{
                  width: 240,
                  height: 360,
                  boxShadow: "0 30px 80px -15px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
                }}
              >
                {PHASES.map((phaseItem, i) => {
                  const Card = phaseItem.card;
                  const shouldMount = Math.abs(i - phase) <= 1;
                  if (!shouldMount) return <div key={i} className="absolute inset-0" />;
                  return (
                    <motion.div
                      key={i}
                      className="absolute inset-0"
                      initial={false}
                      animate={{ opacity: i === phase ? 1 : 0 }}
                      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <Card />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
