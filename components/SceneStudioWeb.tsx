"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const THEMES = [
  { name: "Editorial Noir", active: true },
  { name: "Maison Blanc", active: false },
  { name: "Velvet Runway", active: false },
  { name: "Swiss Grid", active: false },
];

const FEATURE_CHIPS = [
  {
    label: ".studio Domain",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    label: "Verified Badge",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    label: "SEO-Optimized",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    label: "Mobile Responsive",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    label: "Analytics Dashboard",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    label: "Direct Booking",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
];

const STATS = [
  { value: "340+", label: "Agencies" },
  { value: "12k+", label: "Profiles" },
  { value: "4", label: "Themes" },
];

export default function SceneStudioWeb() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const mockupY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0px", "0px"] : ["80px", "-80px"]
  );

  const glowScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1.2, 0.8]
  );

  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.02, 0.08, 0.02]
  );

  const borderGlowOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.7],
    [0, 0.12, 0]
  );

  return (
    <section
      id="studio-plus"
      ref={sectionRef}
      className="relative pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* ── ATMOSPHERE ──────────────────────────────────────── */}

      {/* Primary ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: 1600,
            height: 1000,
            background: "radial-gradient(circle, rgba(201,165,90,0.25) 0%, transparent 55%)",
            scale: glowScale,
            opacity: glowOpacity,
          }}
        />
      </div>

      {/* Secondary warm depth glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: "-6%",
          bottom: "15%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          filter: "blur(200px)",
          backgroundColor: "rgba(201,165,90,0.03)",
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
        style={{ right: "4%", top: "50%", transform: "translateY(-50%)", opacity: 0.015 }}
      >
        <span className="font-editorial" style={{ fontSize: "clamp(16rem, 24vw, 28rem)", lineHeight: 0.8, color: "#C9A55A" }}>
          S+
        </span>
      </div>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease }}
        >
          <span
            className="text-xs uppercase tracking-[0.2em] font-bold mb-6 block"
            style={{ color: "var(--color-gold)" }}
          >
            Studio+
          </span>
          <h2
            className="font-editorial text-5xl sm:text-6xl md:text-7xl mb-8 leading-[1.0] tracking-tight"
            style={{ color: "var(--color-cream)" }}
          >
            Your own corner of{" "}
            <br className="hidden sm:block" />
            <span
              className="font-editorial-italic font-light opacity-90"
              style={{ color: "var(--color-gold)" }}
            >
              the industry.
            </span>
          </h2>
          <p
            className="mx-auto max-w-2xl text-lg md:text-xl font-light leading-relaxed tracking-wide"
            style={{ color: "var(--color-text-on-dark-muted)" }}
          >
            A verified digital identity on your own{" "}
            <span style={{ color: "var(--color-gold)", fontWeight: 500 }}>
              talent.pholio.studio
            </span>{" "}
            domain — the address agencies actually remember.
          </p>
        </motion.div>

        {/* Browser mockup — parallax outer, reveal inner */}
        <motion.div className="mx-auto max-w-5xl" style={{ y: mockupY }}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease,
            }}
            className="relative rounded-[24px] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
            }}
          >
            {/* Animated gold border glow */}
            <motion.div
              className="absolute -inset-[1px] rounded-[25px] pointer-events-none z-20"
              style={{
                background: "linear-gradient(135deg, rgba(201,165,90,0.4), transparent 40%, transparent 60%, rgba(201,165,90,0.25))",
                opacity: borderGlowOpacity,
              }}
            />
            {/* Static frame shadow */}
            <div
              className="absolute -inset-[1px] rounded-[25px] pointer-events-none"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1), 0 30px 60px -10px rgba(0,0,0,0.8), 0 0 100px rgba(201, 165, 90, 0.05)",
              }}
            />

            {/* Glassmorphic Browser Chrome */}
            <div
              className="relative z-10 flex items-center gap-4 px-6 py-4 border-b border-white/[0.04]"
              style={{ background: "rgba(5, 5, 5, 0.6)", backdropFilter: "blur(12px)" }}
            >
              {/* Traffic lights — colored tints */}
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border border-white/[0.06]" style={{ backgroundColor: "rgba(239, 68, 68, 0.45)" }} />
                <div className="h-3 w-3 rounded-full border border-white/[0.06]" style={{ backgroundColor: "rgba(245, 158, 11, 0.45)" }} />
                <div className="h-3 w-3 rounded-full border border-white/[0.06]" style={{ backgroundColor: "rgba(34, 197, 94, 0.45)" }} />
              </div>

              <div className="flex-1 flex justify-center">
                <div
                  className="flex items-center gap-3 rounded-full px-6 py-2 text-sm backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.04]"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
                  }}
                >
                  <svg
                    className="h-3.5 w-3.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="var(--color-gold)"
                    strokeWidth={1.5}
                    style={{ opacity: 0.7 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="font-mono tracking-wide" style={{ color: "rgba(240, 240, 240, 0.8)" }}>
                    elara.pholio.studio
                  </span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ml-2"
                    style={{
                      backgroundColor: "rgba(201, 165, 90, 0.15)",
                      color: "var(--color-gold)",
                      boxShadow: "inset 0 0 0 1px rgba(201, 165, 90, 0.3)",
                    }}
                  >
                    Verified
                  </span>
                </div>
              </div>
              <div className="w-[72px]" />
            </div>

            {/* Top reflection highlight */}
            <div
              className="absolute top-0 inset-x-0 h-px z-30 pointer-events-none"
              style={{
                background: "linear-gradient(to right, transparent 10%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.12) 70%, transparent 90%)",
              }}
            />

            {/* Portfolio content */}
            <div className="relative z-10" style={{ backgroundColor: "#0a0a0a", height: "700px" }}>
              <iframe
                src="/studio-website/index.html?autoscroll=true"
                title="Studio+ Website Preview"
                width="100%"
                height="100%"
                frameBorder="0"
                loading="lazy"
                style={{
                  border: "none",
                  display: "block",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#0a0a0a",
                }}
              />
              {/* Deep gradient fade masking the iframe hard cutoff */}
              <div
                className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.8) 40%, transparent 100%)",
                }}
              />
            </div>
          </motion.div>

          {/* ── Theme Selector ──────────────────────────────────── */}
          <motion.div
            className="mt-12 flex flex-col items-center justify-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease }}
          >
            <div
              className="text-[10px] tracking-[0.3em] uppercase font-bold"
              style={{ color: "var(--color-gold)", opacity: 0.6 }}
            >
              Themes
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {THEMES.map((theme) => (
                <div
                  key={theme.name}
                  className="rounded-full px-4 py-1.5 text-[11px] font-medium tracking-wide transition-all duration-300"
                  style={{
                    color: theme.active ? "var(--color-gold)" : "rgba(240, 240, 240, 0.4)",
                    backgroundColor: theme.active ? "rgba(201, 165, 90, 0.1)" : "rgba(255, 255, 255, 0.03)",
                    boxShadow: theme.active
                      ? "inset 0 0 0 1px rgba(201, 165, 90, 0.35)"
                      : "inset 0 0 0 1px rgba(255, 255, 255, 0.06)",
                    cursor: "default",
                  }}
                >
                  {theme.name}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Feature Chips ────────────────────────────────────── */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.5 },
            },
          }}
        >
          {FEATURE_CHIPS.map((chip) => (
            <motion.div
              key={chip.label}
              className="rounded-full px-5 py-2.5 text-[12px] font-medium tracking-wide backdrop-blur-md transition-all duration-300 hover:scale-105 flex items-center gap-2.5"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { ease, duration: 0.6 },
                },
              }}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                color: "rgba(240, 240, 240, 0.85)",
                boxShadow:
                  "inset 0 0 0 1px rgba(201, 165, 90, 0.15), 0 4px 16px rgba(0,0,0,0.15)",
              }}
            >
              <span style={{ color: "var(--color-gold)", opacity: 0.7, display: "flex", alignItems: "center" }}>
                {chip.icon}
              </span>
              {chip.label}
            </motion.div>
          ))}
        </motion.div>

        {/* ── Stats Proof Bar ──────────────────────────────────── */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-8 sm:gap-12"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9, ease }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8 sm:gap-12">
              <div className="flex flex-col items-center gap-1">
                <span
                  className="font-editorial-italic text-xl sm:text-2xl"
                  style={{ color: "var(--color-gold)" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[9px] tracking-[0.15em] uppercase"
                  style={{ color: "rgba(240, 240, 240, 0.35)", fontFamily: "var(--font-mono)" }}
                >
                  {stat.label}
                </span>
              </div>
              {i < STATS.length - 1 && (
                <div
                  style={{
                    width: 1,
                    height: 28,
                    background: "linear-gradient(to bottom, transparent, rgba(201,165,90,0.2), transparent)",
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
