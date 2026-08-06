// landing/components/talent/TalentSceneDiscoverability.tsx
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
import { FilmGrain, GhostWatermark, RuleLines } from "@/components/talent/shared";

const ease = [0.22, 1, 0.36, 1] as const;

const PHASES = [
  {
    key: "invisible",
    copy: "Most talent aren\u2019t in the room. They\u2019re in an inbox, waiting for a reply that isn\u2019t coming.",
  },
  {
    key: "database",
    copy: "Agencies don\u2019t search inboxes. They search databases. If you\u2019re not in one, you don\u2019t exist.",
  },
  {
    key: "profile",
    copy: "A complete profile puts you in every search that matches your look, market, and measurements.",
  },
  {
    key: "selected",
    copy: "The judgment still happens in four seconds. Now it goes in your favour.",
  },
];

const FILTER_CHIPS = [
  "Height: 5\u20189\u201d \u2013 6\u20180\u201d",
  "Location: New York",
  "Category: Editorial",
];

const CARDS = [0, 1, 2, 3, 4, 5];
const SELECTED_INDEX = 4;

export default function TalentSceneDiscoverability() {
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
    else if (v >= 0.25) setPhase(1);
    else setPhase(0);
  });

  // Right column: rises into view from below
  const uiY = useTransform(
    scrollYProgress,
    [0.08, 0.28],
    prefersReducedMotion ? ["0px", "0px"] : ["80px", "0px"]
  );
  const uiOpacity = useTransform(scrollYProgress, [0.06, 0.22], [0, 1]);

  // Ambient glow tied to scroll
  const glowOp = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.22, 0.16, 0]);

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
        <GhostWatermark label="01" />

        {/* Left-leaning gold ambient glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            left: "0%",
            top: "35%",
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(201,165,90,0.2) 0%, transparent 60%)",
            filter: "blur(120px)",
            opacity: glowOp,
            transform: "translateY(-50%)",
          }}
        />

        {/* ── Split layout: text left | visual right ── */}
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
              Discoverability
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
              You were
              <br />
              <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
                invisible.
              </span>
            </h2>

            {/* Phase copy — larger, higher contrast */}
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
            <div className="flex items-center gap-2.5">
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
          </div>

          {/* ── Right column: search UI (desktop) ── */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <motion.div
              style={{
                y: uiY,
                opacity: uiOpacity,
                width: "100%",
                maxWidth: 500,
              }}
            >
              {/* Search bar */}
              <div
                style={{
                  width: "100%",
                  height: 52,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(201,165,90,0.2)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 18px",
                  gap: 12,
                  marginBottom: 12,
                  backdropFilter: "blur(8px)",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ opacity: 0.45, flexShrink: 0 }}
                >
                  <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" />
                  <path
                    d="M11 11l2.5 2.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  style={{
                    color: "rgba(255,255,255,0.32)",
                    fontSize: 14,
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "-0.005em",
                    flex: 1,
                  }}
                >
                  Search talent...
                </span>
                <div
                  style={{
                    height: 24,
                    padding: "0 10px",
                    borderRadius: 6,
                    backgroundColor: "rgba(201,165,90,0.12)",
                    border: "1px solid rgba(201,165,90,0.2)",
                    display: "flex",
                    alignItems: "center",
                    color: "#C9A55A",
                    fontSize: 11,
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  247 results
                </div>
              </div>

              {/* Filter chips */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap" as const,
                  minHeight: 36,
                  marginBottom: 16,
                }}
              >
                <AnimatePresence>
                  {phase >= 1 &&
                    FILTER_CHIPS.map((chip, i) => (
                      <motion.div
                        key={chip}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.3, delay: i * 0.08, ease }}
                        style={{
                          padding: "5px 14px",
                          borderRadius: 20,
                          backgroundColor: "rgba(201,165,90,0.1)",
                          border: "1px solid rgba(201,165,90,0.25)",
                          color: "#C9A55A",
                          fontSize: 12,
                          fontFamily: "var(--font-sans)",
                          letterSpacing: "0.05em",
                          whiteSpace: "nowrap" as const,
                        }}
                      >
                        {chip}
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {/* Results grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 10,
                }}
              >
                {CARDS.map((_, i) => {
                  const isSelected = i === SELECTED_INDEX;
                  const isVisible = phase >= 2;
                  const isDimmed = phase >= 3 && !isSelected;

                  return (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: isVisible ? (isDimmed ? 0.12 : 1) : 0,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: isVisible ? i * 0.06 : 0,
                        ease,
                      }}
                      style={{
                        height: 150,
                        borderRadius: 10,
                        backgroundColor: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        overflow: "hidden",
                        position: "relative",
                        boxShadow:
                          isSelected && phase >= 3
                            ? "0 0 0 2px rgba(201,165,90,0.85), 0 0 24px 6px rgba(201,165,90,0.2)"
                            : "none",
                        transition: "box-shadow 0.4s ease",
                      }}
                    >
                      <div
                        style={{
                          height: "66%",
                          backgroundColor: "rgba(255,255,255,0.06)",
                        }}
                      />
                      <div
                        style={{
                          padding: "8px 10px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                        }}
                      >
                        <div
                          style={{
                            height: 5,
                            width: "65%",
                            backgroundColor: "rgba(255,255,255,0.12)",
                            borderRadius: 3,
                          }}
                        />
                        <div
                          style={{
                            height: 4,
                            width: "42%",
                            backgroundColor: "rgba(255,255,255,0.07)",
                            borderRadius: 3,
                          }}
                        />
                      </div>

                      {/* Selection pulse ring */}
                      {isSelected && phase >= 3 && (
                        <motion.div
                          className="absolute inset-0 rounded-[10px]"
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{
                            border: "2px solid rgba(201,165,90,0.55)",
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Phase 3 — selected callout */}
              <AnimatePresence>
                {phase >= 3 && (
                  <motion.div
                    key="selected-note"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    style={{
                      marginTop: 14,
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
                      Profile surfaced · 1 of 247
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ── Mobile: abbreviated visual below text ── */}
          <div className="flex lg:hidden w-full max-w-[400px] mx-auto">
            <motion.div style={{ opacity: uiOpacity, width: "100%" }}>
              {/* Simplified search bar for mobile */}
              <div
                style={{
                  width: "100%",
                  height: 46,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(201,165,90,0.18)",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 16px",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.4 }}>
                  <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" />
                  <path d="M11 11l2.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, fontFamily: "var(--font-sans)" }}>
                  Search talent...
                </span>
              </div>
              {/* 2-column mini card grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                {[0, 1, 2, 3].map((i) => {
                  const isSelected = i === 3;
                  const isDimmed = phase >= 3 && !isSelected;
                  return (
                    <motion.div
                      key={i}
                      animate={{ opacity: phase >= 2 ? (isDimmed ? 0.12 : 1) : 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      style={{
                        height: 100,
                        borderRadius: 8,
                        backgroundColor: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        overflow: "hidden",
                        boxShadow: isSelected && phase >= 3 ? "0 0 0 2px rgba(201,165,90,0.85)" : "none",
                        transition: "box-shadow 0.4s ease",
                      }}
                    >
                      <div style={{ height: "65%", backgroundColor: "rgba(255,255,255,0.06)" }} />
                      <div style={{ padding: "6px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
                        <div style={{ height: 4, width: "60%", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
                        <div style={{ height: 3, width: "40%", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 2 }} />
                      </div>
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
