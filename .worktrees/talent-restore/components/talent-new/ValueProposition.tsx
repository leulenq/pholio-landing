// landing/components/talent-new/ValueProposition.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const PILLARS = [
  {
    number: "01",
    headline: "Already in",
    accent: "the glass.",
    description:
      "Your book sits where scouts search — not in a thread they forgot to open. Archetype, measurements, market: the same language the board uses when they build a shortlist.",
    margin:
      "Agencies wish they had built this view. You walk in already legible.",
  },
  {
    number: "02",
    headline: "The edit,",
    accent: "not the dump.",
    description:
      "Digitals get scored and ranked like an editor sat with you — light, line, casting read. Weak frames stay backstage; the room sees the shots that carry.",
    margin: "Curation that reads taste, not volume.",
  },
  {
    number: "03",
    headline: "One package",
    accent: "for the floor.",
    description:
      "Comp, QR, Apple Wallet pass, and your .studio link — minted from a single profile. Hand them what casting expects without rebuilding the night before a go-see.",
    margin: "Everything they ask for, nothing they have to chase.",
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
        <motion.div
          className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
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
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                }}
              >
                Three beats
              </span>
            </div>
            <h2
              className="font-editorial"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.85rem)",
                color: "#1A1815",
                fontWeight: 400,
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              How Pholio
              <br />
              <span
                className="font-editorial-italic"
                style={{ color: "var(--color-gold)" }}
              >
                holds the room.
              </span>
            </h2>
          </div>
          <p
            className="font-editorial-italic m-0 max-w-sm"
            style={{
              fontSize: "1rem",
              color: "rgba(26,24,21,0.4)",
              lineHeight: 1.65,
            }}
          >
            Not another profile host — a casting-native book with receipts.
          </p>
        </motion.div>

        <div className="flex flex-col gap-0">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : 28,
              }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.72,
                delay: 0.18 + i * 0.14,
                ease,
              }}
              style={{
                borderTop: "1px solid rgba(26,24,21,0.08)",
                padding: "3rem 0",
              }}
            >
              <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-1">
                  <span
                    className="font-editorial-italic"
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-gold)",
                      opacity: 0.65,
                    }}
                  >
                    {pillar.number}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <h3
                    className="font-editorial"
                    style={{
                      fontSize: "clamp(1.55rem, 2.4vw, 2rem)",
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

                <div className="md:col-span-4">
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9375rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.68,
                      margin: 0,
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>

                <div className="md:col-span-3 md:border-l md:border-[rgba(26,24,21,0.06)] md:pl-8">
                  <p
                    className="font-editorial-italic m-0"
                    style={{
                      fontSize: "0.9375rem",
                      color: "rgba(201,165,90,0.85)",
                      lineHeight: 1.55,
                    }}
                  >
                    {pillar.margin}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid rgba(26,24,21,0.08)" }} />
        </div>
      </div>
    </section>
  );
}
