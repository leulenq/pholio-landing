// landing/components/talent/TalentSceneAnalytics.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Eye } from "lucide-react";
import { GhostWatermark, RuleLines, FilmGrain } from "@/components/talent/shared";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { number: "23", label: "Agency scouts searched this week" },
  { number: "4.2s", label: "Avg time casting directors spend on a profile" },
  { number: "78%", label: "Of viewed profiles get saved to boards" },
  { number: "3×", label: "More callbacks with a complete comp card" },
  { number: "<1hr", label: "Time to build your full Pholio profile" },
  { number: "140+", label: "Agencies actively searching on Pholio" },
];

function StatBlock({ number, label }: { number: string; label: string }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 260,
        padding: "0 36px",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="font-editorial"
        style={{
          fontSize: "clamp(3rem, 6vw, 5.5rem)",
          color: "#C9A55A",
          fontWeight: 400,
          lineHeight: 1,
          marginBottom: 12,
          letterSpacing: "-0.02em",
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 400,
          fontSize: "0.8125rem",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.55,
          maxWidth: 188,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function TalentSceneAnalytics() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        backgroundColor: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "6rem 0",
      }}
    >
      <FilmGrain />
      <RuleLines />
      {/* Scene index watermark */}
      <GhostWatermark label="04" />

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 800,
          height: 500,
          background:
            "radial-gradient(ellipse, rgba(201,165,90,0.08) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
        transition={{ duration: 0.5, ease }}
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "0.6875rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#C9A55A",
          marginBottom: "1.5rem",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        Who&apos;s Looking
      </motion.p>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="font-editorial"
        style={{
          fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
          color: "white",
          fontWeight: 400,
          lineHeight: 1.08,
          letterSpacing: "-0.025em",
          textAlign: "center",
          marginBottom: "3.5rem",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        Agencies are searching.
        <br />
        <span style={{ color: "rgba(255,255,255,0.45)" }}>
          The question is whether they find you.
        </span>
      </motion.h2>

      {/* Marquee — outer clips overflow, inner animates */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          width: "100%",
          overflow: "hidden",
          marginBottom: "3.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Fade masks at edges */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: "linear-gradient(to right, #050505, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: "linear-gradient(to left, #050505, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          className="talent-analytics-marquee"
          style={{
            display: "flex",
            width: "max-content",
            animationPlayState: prefersReducedMotion ? "paused" : "running",
          }}
        >
          {/* Copy 1 */}
          {STATS.map((stat) => (
            <StatBlock key={`a-${stat.number}`} {...stat} />
          ))}
          {/* Copy 2 — enables seamless loop */}
          {STATS.map((stat) => (
            <StatBlock key={`b-${stat.number}`} {...stat} />
          ))}
        </div>
      </motion.div>

      {/* Notification card */}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
        transition={{ duration: 0.5, delay: 0.3, ease }}
        style={{
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 14,
          padding: "16px 24px",
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: "rgba(201,165,90,0.1)",
            border: "1px solid rgba(201,165,90,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Eye size={16} color="#C9A55A" />
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.82)",
              marginBottom: 2,
            }}
          >
            Wilhelmina Models viewed your profile
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            3 hours ago · New York, NY
          </div>
        </div>
      </motion.div>

      {/* Marquee keyframe */}
      <style>{`
        @keyframes talent-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .talent-analytics-marquee {
          animation: talent-marquee 32s linear infinite;
        }
      `}</style>
    </section>
  );
}
