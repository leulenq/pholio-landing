"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";

const ease = [0.22, 1, 0.36, 1] as const;      // ease-out-quint: text elements
const easeExpo = [0.16, 1, 0.3, 1] as const;   // ease-out-expo: rule lines only

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Closure inside component body — captures prefersReducedMotion and inView
  // from enclosing scope. Does NOT call any hooks.
  const ruleLine = (position: "top" | "bottom") => {
    const posStyle = position === "top" ? { top: 0 } : { bottom: 0 };
    const baseStyle = {
      position: "absolute" as const,
      left: 0,
      right: 0,
      height: 1,
      background: "linear-gradient(to right, transparent, #C9A55A, transparent)",
      zIndex: 2,
      ...posStyle,
    };

    if (prefersReducedMotion) {
      return <div aria-hidden="true" style={baseStyle} />;
    }

    return (
      <motion.div
        aria-hidden="true"
        style={{ ...baseStyle, transformOrigin: "center" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: easeExpo }}
      />
    );
  };

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
      }}
    >
      {/* Radial glow — z:0 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 600,
          background:
            "radial-gradient(ellipse at center, rgba(201,165,90,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Grain texture — z:1 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "150px 150px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Rule lines — z:2 */}
      {ruleLine("top")}
      {ruleLine("bottom")}

      {/* Content — z:10 */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C9A55A",
            marginBottom: "1.5rem",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease, delay: 0 }}
        >
          YOUR NEXT CHAPTER
        </motion.p>

        {/* Headline */}
        <h2
          className="font-editorial"
          style={{
            fontSize: "clamp(4rem, 8vw, 7.5rem)",
            lineHeight: 1.0,
            color: "#FAF7F2",
            margin: 0,
          }}
        >
          <motion.span
            style={{ display: "block" }}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 62, damping: 20, delay: 0.08 }}
          >
            The career you want
          </motion.span>
          <motion.span
            style={{ display: "block" }}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 62, damping: 20, delay: 0.18 }}
          >
            {"starts "}
            <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
              here.
            </span>
          </motion.span>
        </h2>

        {/* Subline */}
        <motion.p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9375rem",
            fontWeight: 400,
            color: "rgba(241, 245, 249, 0.55)",
            maxWidth: 480,
            margin: "2rem auto 0",
          }}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 62, damping: 20, delay: 0.28 }}
        >
          Join the platform top agencies use to discover verified talent.
        </motion.p>

        {/* CTA */}
        <motion.a
          href={`${APP_URL}/signup`}
          className="btn-gold rounded-full"
          style={{ marginTop: "2.5rem", display: "inline-flex" }}
          initial={{
            opacity: 0,
            y: prefersReducedMotion ? 0 : 16,
            scale: prefersReducedMotion ? 1 : 0.96,
          }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 62, damping: 20, delay: 0.38 }}
        >
          Create Your Profile Free
        </motion.a>

        {/* Fine print */}
        <motion.p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.22)",
            marginTop: "1rem",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.5 }}
        >
          Free to join · No credit card · Takes under an hour
        </motion.p>
      </div>
    </section>
  );
}
