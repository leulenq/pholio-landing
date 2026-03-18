// landing/components/talent/TalentHero.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RuleLines } from "@/components/talent/shared";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const ease = [0.22, 1, 0.36, 1] as const;
// Explicit delays per line
const DELAYS = [0, 0.12, 0.35, 0.55];

const PROOF = [
  { value: "140+", label: "Agencies searching" },
  { value: "4s", label: "Decision window" },
  { value: "Free", label: "To start" },
];

export default function TalentHero() {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: DELAYS[i], ease },
    }),
  };

  return (
    <section
      style={{
        height: "100vh",
        backgroundColor: "#FAF8F5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Warm ambient glows — subtle golden light on cream */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(201,165,90,0.14) 0%, transparent 65%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "15%",
          right: "8%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(201,165,90,0.09) 0%, transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Editorial rule lines */}
      <RuleLines />

      {/* Paper grain texture */}
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

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0, ease }}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "0.6875rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C9A55A",
            marginBottom: "1.75rem",
          }}
        >
          For Talent
        </motion.p>

        {/* Headline — single h1 for correct screen reader semantics */}
        <h1
          className="font-editorial"
          style={{
            fontSize: "clamp(3.8rem, 10vw, 9rem)",
            color: "#1A1815",
            fontWeight: 400,
            lineHeight: 0.94,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          {/* Line 1 */}
          <motion.span
            custom={0}
            variants={itemVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            style={{ display: "block" }}
          >
            They decided
          </motion.span>

          {/* Line 2 */}
          <motion.span
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            style={{ display: "block", marginBottom: "1.75rem" }}
          >
            in four seconds.
          </motion.span>
        </h1>

        {/* Sub-headline */}
        <motion.p
          custom={2}
          variants={itemVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          className="font-editorial-italic"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
            color: "#C9A55A",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 2.5rem 0",
          }}
        >
          Make those seconds count.
        </motion.p>

        {/* CTA */}
        <motion.a
          custom={3}
          variants={itemVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          href={`${APP_URL}/signup`}
          className="transition-transform duration-300 hover:scale-[1.02]"
          style={{
            backgroundColor: "#1A1815",
            color: "#FAF8F5",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "0.8125rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            borderRadius: "100px",
            padding: "14px 36px",
            display: "inline-block",
            textDecoration: "none",
          }}
        >
          Build your profile — free
        </motion.a>
      </div>

      {/* Proof strip — 3 numbers above scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.85 }}
        style={{
          position: "absolute",
          bottom: "6.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "3rem",
          zIndex: 1,
          whiteSpace: "nowrap",
        }}
      >
        {PROOF.map((item, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div
              className="font-editorial"
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                color: "#1A1815",
                fontWeight: 400,
                lineHeight: 1,
                marginBottom: "0.3rem",
              }}
            >
              {item.value}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.625rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(26,24,21,0.4)",
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 1,
        }}
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 32,
            backgroundColor: "#C9A55A",
            opacity: 0.4,
            borderRadius: 1,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.625rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C9A55A",
            opacity: 0.4,
          }}
        >
          scroll
        </span>
      </div>
    </section>
  );
}
