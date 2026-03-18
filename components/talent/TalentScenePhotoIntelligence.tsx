// landing/components/talent/TalentScenePhotoIntelligence.tsx
"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { FilmGrain, GhostWatermark, RuleLines, AiBadge } from "@/components/talent/shared";

const ease = [0.22, 1, 0.36, 1] as const;

const PHASES = [
  {
    key: "good-photos",
    copy: "You have good photos. That\u2019s not the problem.",
  },
  {
    key: "casting-read",
    copy: "Casting directors read photos differently \u2014 composition, negative space, eye line, market fit.",
  },
  {
    key: "ai-selects",
    copy: "Pholio reads your gallery the way a casting director does. Every image is scored and ranked.",
  },
  {
    key: "four-that-work",
    copy: "Not the four you\u2019d choose. The four that work.",
  },
];

const PHOTO_IDS = [
  "1529898329022-1b60a77f8f26",
  "1515886657613-9f3515b0c78f",
  "1488426862026-3ee34a7d66df",
  "1534528741775-53994a69daeb",
  "1485875437342-9b39470b3d95",
  "1509631179647-0177331693ae",
  "1524504388940-b1c1722653e1",
  "1463453091185-61582044d556",
  "1496440788671-ee1e8b25e368",
  "1500648767791-00dcc994a43e",
  "1507003211169-0a1dd7228f2d",
  "1438761681033-6461ffad8d80",
  "1494790108377-be9c29b29330",
  "1552058544-f2b08422138a",
  "1542596768-5d1d21f1cf98",
  "1506794778202-cad84cf45f1d",
];

const SELECTED_INDICES = new Set([0, 5, 10, 15]);

export default function TalentScenePhotoIntelligence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const prefersReducedMotion = useReducedMotion();

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

  // Right column grid animation
  const gridY = useTransform(
    scrollYProgress,
    [0.08, 0.28],
    prefersReducedMotion ? ["0px", "0px"] : ["80px", "0px"]
  );
  const gridOpacity = useTransform(scrollYProgress, [0.06, 0.22], [0, 1]);

  // AI scan line across the grid
  const scanTop = useTransform(scrollYProgress, [0.22, 0.50], ["0%", "100%"]);
  const scanOpacity = useTransform(
    scrollYProgress,
    [0.20, 0.24, 0.46, 0.50],
    [0, 1, 1, 0]
  );

  // Ambient glow
  const glowOp = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.2, 0.14, 0]);

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
        <GhostWatermark label="02" />

        {/* Right-leaning ambient glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            right: "0%",
            top: "35%",
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(201,165,90,0.18) 0%, transparent 60%)",
            filter: "blur(130px)",
            opacity: glowOp,
            transform: "translateY(-50%)",
          }}
        />

        {/* ── Split layout: text left | photo grid right ── */}
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
              Photo Intelligence
            </p>

            <h2
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
              The wrong photo
              <br />
              <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
                killed the pitch.
              </span>
            </h2>

            {/* Phase copy */}
            <div style={{ minHeight: 72, marginBottom: "2rem" }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={PHASES[phase].key}
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
                  {PHASES[phase].copy}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Phase progress dots */}
            <div className="flex items-center gap-2.5" style={{ marginBottom: "1.75rem" }}>
              {PHASES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    backgroundColor:
                      i === phase ? "#C9A55A" : "rgba(255,255,255,0.18)",
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

            {/* AI badge — phase 3 */}
            <div style={{ height: 28, display: "flex", alignItems: "center" }}>
              <AnimatePresence>
                {phase >= 3 && (
                  <motion.div
                    key="ai-badge"
                    initial={{ opacity: 0, y: 6, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.92 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <AiBadge label="AI Selected \u00b7 4 of 16" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right column: photo grid (desktop) ── */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <motion.div
              style={{
                y: gridY,
                opacity: gridOpacity,
                width: "100%",
                maxWidth: 520,
                position: "relative",
              }}
            >
              {/* 4×4 grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 6,
                }}
              >
                {PHOTO_IDS.map((id, i) => {
                  const isSelected = SELECTED_INDICES.has(i);
                  const isDimmed = phase >= 3 && !isSelected;

                  return (
                    <motion.div
                      key={id}
                      animate={{ opacity: isDimmed ? 0.07 : 1 }}
                      transition={{
                        duration: 0.5,
                        delay: isDimmed ? i * 0.02 : 0,
                        ease,
                      }}
                      style={{
                        aspectRatio: "3/4",
                        borderRadius: 5,
                        overflow: "hidden",
                        position: "relative",
                        backgroundColor: "rgba(255,255,255,0.06)",
                        boxShadow:
                          isSelected && phase >= 3
                            ? "0 0 0 2px rgba(201,165,90,0.85)"
                            : "none",
                        transition: "box-shadow 0.4s ease",
                      }}
                    >
                      <img
                        src={`https://images.unsplash.com/photo-${id}?w=200&h=267&fit=crop&crop=faces,center&auto=format&q=60`}
                        alt=""
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* AI scan line */}
              {!prefersReducedMotion && (
                <motion.div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 2,
                    top: scanTop,
                    opacity: scanOpacity,
                    background:
                      "linear-gradient(90deg, transparent 0%, #C9A55A 20%, #C9A55A 80%, transparent 100%)",
                    boxShadow:
                      "0 0 20px 4px rgba(201,165,90,0.3), 0 0 60px 8px rgba(201,165,90,0.1)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />
              )}

              {/* Phase 3: selected photo count label */}
              <AnimatePresence>
                {phase >= 3 && (
                  <motion.div
                    key="ai-label"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    style={{
                      marginTop: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "#C9A55A",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.6875rem",
                        color: "rgba(201,165,90,0.85)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      4 images selected · agency-ready
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ── Mobile: simplified photo grid ── */}
          <div className="flex lg:hidden w-full max-w-[380px] mx-auto">
            <motion.div
              style={{ opacity: gridOpacity, width: "100%", position: "relative" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 5,
                }}
              >
                {PHOTO_IDS.slice(0, 8).map((id, i) => {
                  const isSelected = SELECTED_INDICES.has(i);
                  const isDimmed = phase >= 3 && !isSelected;
                  return (
                    <motion.div
                      key={id}
                      animate={{ opacity: isDimmed ? 0.07 : 1 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        aspectRatio: "3/4",
                        borderRadius: 4,
                        overflow: "hidden",
                        backgroundColor: "rgba(255,255,255,0.06)",
                        boxShadow: isSelected && phase >= 3 ? "0 0 0 2px rgba(201,165,90,0.85)" : "none",
                        transition: "box-shadow 0.4s ease",
                      }}
                    >
                      <img
                        src={`https://images.unsplash.com/photo-${id}?w=120&h=160&fit=crop&crop=faces,center&auto=format&q=50`}
                        alt=""
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
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
