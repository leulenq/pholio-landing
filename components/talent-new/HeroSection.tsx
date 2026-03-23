// landing/components/talent-new/HeroSection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";
const ease = [0.22, 1, 0.36, 1] as const;

const ROTATING_WORDS = ["Discovered", "Represented", "Booked", "Seen"];
const WORD_INTERVAL = 2800;

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setWordIdx((i) => (i + 1) % ROTATING_WORDS.length);
    }, WORD_INTERVAL);
    return () => clearInterval(timer);
  }, [mounted]);

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#FAF8F5",
      }}
    >
      {/* Paper texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.03,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "200px 200px",
        }}
      />

      {/* Warm ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(201,165,90,0.08) 0%, transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle floating gold particles */}
      {!prefersReducedMotion &&
        Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              borderRadius: "50%",
              backgroundColor: "#C9A55A",
              left: `${10 + (i * 5.5) % 80}%`,
              top: `${15 + (i * 8.2) % 70}%`,
            }}
            animate={{
              y: [0, -25 - (i % 4) * 8, 0],
              opacity: [0, 0.15 + (i % 3) * 0.05, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 7 + (i % 4) * 2,
              repeat: Infinity,
              delay: (i * 0.9) % 5,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Side chapter indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-3"
      >
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, rgba(201,165,90,0.25))" }} />
        <span className="font-editorial-italic" style={{ writingMode: "vertical-lr", fontSize: "0.6875rem", color: "rgba(201,165,90,0.35)", letterSpacing: "0.15em" }}>For Talent</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to top, transparent, rgba(201,165,90,0.25))" }} />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[840px] w-full">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="flex items-center gap-4 mb-10"
          >
            <div style={{ width: 32, height: 1, background: "linear-gradient(to right, #C9A55A, rgba(201,165,90,0.1))" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.625rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A55A" }}>Agency-side discovery</span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-editorial" style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", color: "#1A1815", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.03em", margin: 0 }}>
            <motion.span
              initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
              animate={mounted ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              style={{ display: "block" }}
            >
              Be{" "}
              <span style={{ display: "inline-block", position: "relative", minWidth: "clamp(180px, 30vw, 400px)" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_WORDS[wordIdx]}
                    className="font-editorial-italic"
                    initial={{ opacity: 0, y: 30, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -25, rotateX: 30 }}
                    transition={{ duration: 0.5, ease }}
                    style={{ display: "inline-block", color: "#C9A55A", position: "absolute", left: 0, transformOrigin: "left center" }}
                  >
                    {ROTATING_WORDS[wordIdx]}
                  </motion.span>
                </AnimatePresence>
                <span style={{ visibility: "hidden" }}>Represented</span>
              </span>
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
              animate={mounted ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              style={{ display: "block", marginTop: "0.1em" }}
            >
              before they{" "}
              <span style={{ color: "rgba(26,24,21,0.3)" }}>even ask.</span>
            </motion.span>
          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55, ease }}
            style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)", color: "rgba(26,24,21,0.45)", lineHeight: 1.7, letterSpacing: "-0.005em", maxWidth: 480, marginTop: "2rem", marginBottom: "2.5rem" }}
          >
            Comp, digitals, and stats in one book — searchable by 140+ agencies. When scouts pull you up, you see the lean-in. Apply when the invite path opens.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7, ease }}
            className="flex items-center gap-4 flex-wrap"
          >
            <a
              href={`${APP_URL}/onboarding`}
              className="group relative inline-flex items-center gap-2 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #C9A55A 0%, #A88C44 100%)", color: "#050505", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "16px 36px", borderRadius: 100, textDecoration: "none", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(201,165,90,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Start your book
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1" style={{ transition: "transform 0.3s ease" }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#features"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(26,24,21,0.35)", padding: "16px 24px", textDecoration: "none", transition: "color 0.3s ease, border-color 0.3s ease", borderRadius: 100, border: "1px solid rgba(26,24,21,0.1)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#C9A55A"; e.currentTarget.style.borderColor = "rgba(201,165,90,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(26,24,21,0.35)"; e.currentTarget.style.borderColor = "rgba(26,24,21,0.1)"; }}
            >
              See comp &amp; book
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.0, duration: 0.8, ease }}
        className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-10"
      >
        <div style={{ borderTop: "1px solid rgba(26,24,21,0.06)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", maxWidth: 840 }}>
          {[
            { value: "140+", label: "Agency desks" },
            { value: "<1 hr", label: "Book goes live" },
            { value: "Match", label: "Why you surface" },
            { value: "Apply", label: "When you're ready" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="font-editorial" style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", color: "#1A1815", fontWeight: 400, lineHeight: 1, marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.5625rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,24,21,0.25)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          style={{ width: 1, height: 36, transformOrigin: "top", background: "linear-gradient(to bottom, transparent, rgba(201,165,90,0.3), transparent)" }}
          animate={prefersReducedMotion ? {} : { scaleY: [0, 1, 0], y: [0, 12, 24], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
