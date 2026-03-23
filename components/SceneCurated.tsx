"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";

const ease = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    number: "01",
    label: "Create",
    headline: "Build your card.",
    body: "Upload your photos. Pholio's AI selects your strongest shots, maps your archetype, and generates a comp card that speaks the industry's language.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 15l5-5c.6-.6 1.4-.6 2 0l5 5" />
        <path d="M14 13l2-2c.6-.6 1.4-.6 2 0l4 4" />
        <circle cx="8.5" cy="8.5" r="1.5" />
      </svg>
    ),
  },
  {
    number: "02",
    label: "Curate",
    headline: "Own your presence.",
    body: "Your verified profile goes live on a personal .studio domain — discoverable by every agency on the platform, optimized for the way casting directors actually search.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    number: "03",
    label: "Connect",
    headline: "Get discovered.",
    body: "Agencies browse, filter, and shortlist. When someone pulls your card, you know instantly — complete with who, when, and what they're casting for.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

export default function SceneCurated() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden texture-grain"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px divider-gold-center" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Header ───────────────────────────────────────────── */}
        <motion.div
          className="mb-20 md:mb-28 text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <span
            className="text-label mb-6 block"
            style={{ color: "var(--color-gold)" }}
          >
            How it Works
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl mb-7 leading-[1.05]">
            Three steps to{" "}
            <span
              className="font-editorial-italic"
              style={{ color: "var(--color-gold)" }}
            >
              your next booking.
            </span>
          </h2>
          <p
            className="text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Pholio handles the portfolio, the presentation, and the placement.
            You focus on the work.
          </p>
        </motion.div>

        {/* ── Steps Grid ───────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative flex flex-col"
            >
              {/* Connecting line between steps (desktop only) */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden md:block absolute top-10 -right-4 lg:-right-8 h-px"
                  style={{
                    width: "calc(100% - 60px)",
                    left: "calc(50% + 30px)",
                    background:
                      "linear-gradient(to right, var(--color-gold), transparent)",
                    opacity: 0.2,
                  }}
                />
              )}

              {/* Number + Icon row */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    border: "1.5px solid var(--color-gold)",
                    backgroundColor: "rgba(201, 165, 90, 0.04)",
                  }}
                >
                  <span
                    className="font-editorial-italic text-lg"
                    style={{ color: "var(--color-gold)" }}
                  >
                    {step.number}
                  </span>
                </div>
                <div style={{ opacity: 0.4 }}>{step.icon}</div>
              </div>

              {/* Label */}
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
                style={{ color: "var(--color-gold)" }}
              >
                {step.label}
              </span>

              {/* Divider */}
              <div
                className="mb-5"
                style={{
                  width: 32,
                  height: 1,
                  backgroundColor: "var(--color-gold)",
                  opacity: 0.3,
                }}
              />

              {/* Headline */}
              <h3
                className="font-editorial text-2xl sm:text-3xl mb-4 leading-[1.15]"
                style={{ color: "var(--color-ink)" }}
              >
                {step.headline}
              </h3>

              {/* Body */}
              <p
                className="text-sm leading-[1.7] flex-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom CTA ───────────────────────────────────────── */}
        <motion.div
          className="mt-20 md:mt-28 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8, ease }}
        >
          <a
            href={`${APP_URL}/casting`}
            className="btn-gold rounded-[8px]"
            style={{ padding: "0.85rem 2rem", fontSize: "13px" }}
          >
            <span>Get Started Free</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
