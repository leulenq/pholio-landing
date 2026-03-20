// landing/components/talent-new/ValueProposition.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const PILLARS = [
  {
    number: "01",
    headline: "Get discovered",
    accent: "by the right people.",
    description:
      "Your profile goes live to every agency on Pholio. When they search for your look, height, or market — you show up. No cold emails. No gatekeepers.",
    features: ["Agency-searchable profile", "Archetype matching", "Market filters"],
  },
  {
    number: "02",
    headline: "AI does",
    accent: "the heavy lifting.",
    description:
      "Smart photo curation ranks your portfolio. Archetype analysis maps your market. Match scoring tells agencies exactly why you fit. The platform works while you sleep.",
    features: ["Photo intelligence", "Archetype analysis", "Match scoring"],
  },
  {
    number: "03",
    headline: "Your career,",
    accent: "one dashboard.",
    description:
      "Comp cards, analytics, Apple Wallet pass, public portfolio, and a .studio website — all built automatically from your profile. Everything an agency needs, nothing they have to chase.",
    features: ["Auto comp card", "Analytics dashboard", "Public portfolio"],
  },
];

export default function ValueProposition() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#FAF8F5",
        padding: "7rem 0 8rem",
      }}
    >
      {/* Paper grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.025,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "150px 150px",
        }}
      />

      {/* Warm ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(201,165,90,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header row — editorial style */}
        <motion.div
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                style={{
                  width: 24,
                  height: 1,
                  background:
                    "linear-gradient(to right, var(--color-gold), transparent)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "0.625rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                }}
              >
                Why Pholio
              </span>
            </div>
            <h2
              className="font-editorial"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                color: "#1A1815",
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Everything between you
              <br />
              <span
                className="font-editorial-italic"
                style={{ color: "var(--color-gold)" }}
              >
                and your next booking.
              </span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: 320,
              margin: 0,
            }}
          >
            The tools, visibility, and intelligence that used to require an
            agency — available to every talent from day one.
          </p>
        </motion.div>

        {/* Editorial pillar cards */}
        <div className="flex flex-col gap-0">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : 30,
              }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.15,
                ease,
              }}
              style={{
                borderTop: "1px solid rgba(26,24,21,0.08)",
                padding: "3rem 0",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                {/* Number */}
                <div className="md:col-span-1">
                  <span
                    className="font-editorial-italic"
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-gold)",
                      opacity: 0.6,
                    }}
                  >
                    {pillar.number}
                  </span>
                </div>

                {/* Headline */}
                <div className="md:col-span-4">
                  <h3
                    className="font-editorial"
                    style={{
                      fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                      color: "#1A1815",
                      fontWeight: 400,
                      lineHeight: 1.15,
                      letterSpacing: "-0.02em",
                      margin: 0,
                    }}
                  >
                    {pillar.headline}
                    <br />
                    <span
                      className="font-editorial-italic"
                      style={{ color: "var(--color-gold)" }}
                    >
                      {pillar.accent}
                    </span>
                  </h3>
                </div>

                {/* Description */}
                <div className="md:col-span-4">
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9375rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>

                {/* Features */}
                <div className="md:col-span-3">
                  <div className="flex flex-col gap-2">
                    {pillar.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-2.5"
                      >
                        <div
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            backgroundColor: "var(--color-gold)",
                            opacity: 0.5,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.8125rem",
                            color: "rgba(26,24,21,0.5)",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: "1px solid rgba(26,24,21,0.08)" }} />
        </div>
      </div>
    </section>
  );
}
