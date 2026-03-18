// landing/components/talent/TalentCTA.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { RuleLines } from "@/components/talent/shared";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const ease = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  "Professional comp card included",
  "AI photo curation",
  "Agency-searchable profile",
];

export default function TalentCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  const lineVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: i * 0.1, ease },
    }),
  };

  return (
    <section
      ref={ref}
      style={{
        height: "100vh",
        backgroundColor: "#FAF8F5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Warm glow blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 440,
          height: 440,
          background: "radial-gradient(circle, rgba(201,165,90,0.12) 0%, transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "20%",
          left: "8%",
          width: 360,
          height: 360,
          background: "radial-gradient(circle, rgba(201,165,90,0.08) 0%, transparent 65%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      {/* Paper texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.025,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "150px 150px",
        }}
      />

      <RuleLines />

      {/* Eyebrow */}
      <motion.p
        custom={0}
        variants={lineVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "0.6875rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#C9A55A",
          marginBottom: "1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        Your Next Chapter
      </motion.p>

      {/* Headline */}
      <h2
        className="font-editorial"
        style={{
          fontSize: "clamp(3rem, 7vw, 6.5rem)",
          color: "#1A1815",
          fontWeight: 400,
          lineHeight: 0.96,
          letterSpacing: "-0.03em",
          margin: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.span
          custom={1}
          variants={lineVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ display: "block" }}
        >
          Start for free.
        </motion.span>
        <motion.span
          custom={2}
          variants={lineVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ display: "block", marginBottom: "2.5rem" }}
        >
          No agency required.
        </motion.span>
      </h2>

      {/* Feature list */}
      <motion.div
        custom={3}
        variants={lineVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          marginBottom: "2.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {FEATURES.map((f, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="#C9A55A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8125rem",
                color: "rgba(26,24,21,0.55)",
                letterSpacing: "0.01em",
              }}
            >
              {f}
            </span>
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.a
        custom={4}
        variants={lineVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        href={`${APP_URL}/signup`}
        className="transition-transform duration-300 hover:scale-[1.02]"
        style={{
          backgroundColor: "#1A1815",
          color: "#FAF8F5",
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "0.8125rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          borderRadius: "100px",
          padding: "16px 44px",
          display: "inline-block",
          textDecoration: "none",
          marginBottom: "1.25rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        Build Your Profile
      </motion.a>

      {/* Fine print */}
      <motion.p
        custom={5}
        variants={lineVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 400,
          fontSize: "0.75rem",
          color: "rgba(26,24,21,0.35)",
          margin: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        Takes less than an hour. No credit card required.
      </motion.p>
    </section>
  );
}
