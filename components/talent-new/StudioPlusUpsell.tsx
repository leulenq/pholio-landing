// landing/components/talent-new/StudioPlusUpsell.tsx
"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const ease = [0.22, 1, 0.36, 1] as const;

const COMPARISON = [
  { feature: "Professional profile", free: true, studio: true },
  { feature: "AI photo curation", free: true, studio: true },
  { feature: "Comp card generation", free: true, studio: true },
  { feature: "Archetype mapping", free: true, studio: true },
  { feature: "Portfolio images", free: "Up to 10", studio: "Unlimited" },
  { feature: "Agency applications / mo", free: "3", studio: "Unlimited" },
  { feature: "Basic analytics", free: true, studio: true },
  { feature: "Advanced analytics & insights", free: false, studio: true },
  { feature: "AI profile audit", free: false, studio: true },
  { feature: "Your own .studio website", free: false, studio: true },
  { feature: "QR code comp cards", free: false, studio: true },
  { feature: "Priority placement in search", free: false, studio: true },
  { feature: "Custom portfolio URL", free: false, studio: true },
];

function FeatureValue({
  value,
  gold = false,
}: {
  value: boolean | string;
  gold?: boolean;
}) {
  if (typeof value === "string") {
    return (
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "0.8125rem",
          color: gold ? "#C9A55A" : "#1A1815",
        }}
      >
        {value}
      </span>
    );
  }
  if (value) {
    return (
      <Check
        size={15}
        strokeWidth={2}
        color={gold ? "#C9A55A" : "rgba(26,24,21,0.35)"}
      />
    );
  }
  return <X size={14} strokeWidth={1.5} color="rgba(26,24,21,0.15)" />;
}

export default function StudioPlusUpsell() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [yearly, setYearly] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const price = yearly ? 7.99 : 9.99;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#FAF8F5",
        padding: "7rem 0 8rem",
      }}
    >
      {/* Noise texture */}
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

      {/* Gold ambient */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(201,165,90,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div
                  style={{
                    width: 24,
                    height: 1,
                    background: "linear-gradient(to right, var(--color-gold), transparent)",
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
                  Pricing
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
                Go further with{" "}
                <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>
                  Studio+
                </span>
              </h2>
            </div>

            {/* Toggle */}
            <div className="flex items-center gap-3 mb-1">
              <span
                className="text-sm font-medium transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: !yearly ? "#1A1815" : "rgba(26,24,21,0.35)",
                }}
              >
                Monthly
              </span>
              <button
                onClick={() => setYearly(!yearly)}
                className="relative h-6 w-11 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: yearly
                    ? "var(--color-gold)"
                    : "rgba(26,24,21,0.12)",
                  boxShadow: yearly
                    ? "0 0 16px rgba(201,165,90,0.25)"
                    : "none",
                }}
                aria-label="Toggle yearly pricing"
              >
                <div
                  className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300"
                  style={{
                    transform: yearly
                      ? "translateX(22px)"
                      : "translateX(2px)",
                  }}
                />
              </button>
              <span
                className="text-sm font-medium transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: yearly ? "#1A1815" : "rgba(26,24,21,0.35)",
                }}
              >
                Yearly
              </span>
              <AnimatePresence>
                {yearly && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.85, x: -8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.85, x: -8 }}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      color: "var(--color-gold-dark)",
                      backgroundColor: "rgba(201,165,90,0.1)",
                      padding: "3px 10px",
                      borderRadius: 20,
                    }}
                  >
                    Save 20%
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.04)",
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          {/* Table header */}
          <div
            className="grid grid-cols-[1fr_100px_120px] md:grid-cols-[1fr_140px_160px] items-center"
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid rgba(0,0,0,0.05)",
              backgroundColor: "rgba(250,248,245,0.4)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(26,24,21,0.35)",
              }}
            >
              Feature
            </span>
            <span
              className="text-center"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(26,24,21,0.35)",
              }}
            >
              Free
            </span>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Sparkles size={11} color="#C9A55A" />
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C9A55A",
                  }}
                >
                  Studio+
                </span>
              </div>
              <div className="flex items-baseline justify-center gap-0.5 mt-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={price}
                    className="font-editorial"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25 }}
                    style={{ fontSize: "1.1rem", color: "#1A1815" }}
                  >
                    ${price}
                  </motion.span>
                </AnimatePresence>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.6875rem",
                    color: "rgba(26,24,21,0.3)",
                  }}
                >
                  /mo
                </span>
              </div>
            </div>
          </div>

          {/* Rows */}
          {COMPARISON.map((row, i) => (
            <div
              key={row.feature}
              className="grid grid-cols-[1fr_100px_120px] md:grid-cols-[1fr_140px_160px] items-center"
              style={{
                padding: "12px 24px",
                borderBottom:
                  i < COMPARISON.length - 1
                    ? "1px solid rgba(0,0,0,0.03)"
                    : "none",
                backgroundColor: !row.free && row.studio
                  ? "rgba(201,165,90,0.02)"
                  : "transparent",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "#1A1815",
                  fontWeight: !row.free && row.studio ? 500 : 400,
                }}
              >
                {row.feature}
              </span>
              <div className="flex justify-center">
                <FeatureValue value={row.free} />
              </div>
              <div className="flex justify-center">
                <FeatureValue value={row.studio} gold />
              </div>
            </div>
          ))}

          {/* CTA row */}
          <div
            className="grid grid-cols-[1fr_100px_120px] md:grid-cols-[1fr_140px_160px] items-center"
            style={{
              padding: "20px 24px",
              borderTop: "1px solid rgba(0,0,0,0.05)",
              backgroundColor: "rgba(250,248,245,0.3)",
            }}
          >
            <span />
            <div className="flex justify-center">
              <a
                href={`${APP_URL}/onboarding`}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "rgba(26,24,21,0.5)",
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(26,24,21,0.1)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                }}
              >
                Get Started
              </a>
            </div>
            <div className="flex justify-center">
              <a
                href={`${APP_URL}/signup?plan=studio`}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: "#050505",
                  background:
                    "linear-gradient(135deg, #C9A55A 0%, #A88C44 100%)",
                  padding: "8px 18px",
                  borderRadius: 8,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(201,165,90,0.2)",
                  whiteSpace: "nowrap",
                }}
              >
                Start Trial
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-center"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.8125rem",
            color: "rgba(26,24,21,0.35)",
          }}
        >
          14-day free trial · No credit card required · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
