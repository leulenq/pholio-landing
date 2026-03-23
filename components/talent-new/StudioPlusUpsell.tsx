// landing/components/talent-new/StudioPlusUpsell.tsx
"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";
const ease = [0.22, 1, 0.36, 1] as const;

const WALKS_IN = [
  "Your book already lives in agency search — comp, digitals, and stats synced from one profile.",
  "Pholio ranks your frames like an editor: the board sees the cut, not the camera roll.",
  "Wallet pass, PDF comp, and a .studio link — what you hand over at the go-see stays on-brand.",
];

const STUDIO_DEPTH = [
  {
    title: "Unlimited film",
    body: "No cap on digitals — the contact sheet grows with every shoot.",
  },
  {
    title: "Priority in the corridor",
    body: "Your row surfaces earlier when scouts filter — still you, just harder to scroll past.",
  },
  {
    title: "Your URL on the call sheet",
    body: "Custom .studio domain and QR comps — the packaging agencies expect from a signed face.",
  },
  {
    title: "Deeper signal",
    body: "Advanced lean-in analytics and a profile audit — know what moved before the callback.",
  },
];

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
        backgroundColor: "#F3EFE8",
        padding: "7rem 0 8rem",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.03,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "150px 150px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <motion.div
          className="mb-16 grid gap-10 lg:grid-cols-12 lg:gap-12"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease }}
        >
          <div className="lg:col-span-5">
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
                Depth
              </span>
            </div>
            <h2
              className="font-editorial"
              style={{
                fontSize: "clamp(2.1rem, 4vw, 3.5rem)",
                color: "#1A1815",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                margin: "0 0 1.5rem",
              }}
            >
              Studio+
              <span
                className="font-editorial-italic"
                style={{ color: "var(--color-gold)" }}
              >
                {" "}
                when the floor gets loud.
              </span>
            </h2>
            <p
              className="font-editorial-italic m-0"
              style={{
                fontSize: "1rem",
                color: "rgba(26,24,21,0.42)",
                lineHeight: 1.65,
                maxWidth: 340,
              }}
            >
              Free Pholio already puts you in the glass. Studio+ is for the
              season when every frame, application, and lean-in matters.
            </p>
          </div>

          <div className="space-y-6 lg:col-span-7">
            {WALKS_IN.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.12 + i * 0.1,
                  ease,
                }}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9375rem",
                  color: "rgba(26,24,21,0.55)",
                  lineHeight: 1.75,
                  margin: 0,
                  paddingBottom: "1.25rem",
                  borderBottom: "1px solid rgba(26,24,21,0.07)",
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <p
          className="mb-6 text-center font-editorial-italic md:text-left"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(201,165,90,0.55)",
            margin: "0 0 1.5rem",
          }}
        >
          Studio+ depth
        </p>
        <div className="mb-14 grid gap-6 md:grid-cols-2">
          {STUDIO_DEPTH.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.2 + i * 0.08,
                ease,
              }}
              style={{
                padding: "1.75rem 1.5rem 1.75rem 1.25rem",
                borderRadius: 12,
                backgroundColor: "#1A1815",
                border: "1px solid rgba(255,255,255,0.04)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <h3
                className="font-editorial m-0"
                style={{
                  fontSize: "1.35rem",
                  color: "#FAF8F5",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.65rem",
                }}
              >
                {card.title}
              </h3>
              <p
                className="m-0"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8125rem",
                  color: "rgba(250,248,245,0.45)",
                  lineHeight: 1.65,
                }}
              >
                {card.body}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.7, ease }}
          className="flex flex-col items-center border-t border-[rgba(26,24,21,0.08)] pt-12 text-center"
        >
          <p
            className="font-editorial m-0 mb-6"
            style={{
              fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
              color: "#1A1815",
              letterSpacing: "-0.02em",
            }}
          >
            <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
              Studio+
            </span>
            <span style={{ color: "rgba(26,24,21,0.35)" }}> · </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={price}
                className="font-editorial"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
              >
                ${price}
              </motion.span>
            </AnimatePresence>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                color: "rgba(26,24,21,0.35)",
              }}
            >
              {" "}
              / month
            </span>
          </p>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8125rem",
                color: !yearly ? "#1A1815" : "rgba(26,24,21,0.35)",
                fontWeight: 500,
              }}
            >
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setYearly(!yearly)}
              className="relative h-6 w-11 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: yearly
                  ? "var(--color-gold)"
                  : "rgba(26,24,21,0.12)",
              }}
              aria-label="Toggle yearly Studio+ pricing"
            >
              <span
                className="absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform duration-300"
                style={{
                  transform: yearly ? "translateX(22px)" : "translateX(2px)",
                }}
              />
            </button>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8125rem",
                color: yearly ? "#1A1815" : "rgba(26,24,21,0.35)",
                fontWeight: 500,
              }}
            >
              Yearly
            </span>
            <AnimatePresence>
              {yearly && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#8B7740",
                    backgroundColor: "rgba(201,165,90,0.12)",
                    padding: "4px 10px",
                    borderRadius: 20,
                  }}
                >
                  Save 20%
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`${APP_URL}/onboarding`}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(26,24,21,0.12)] px-7 py-3.5"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(26,24,21,0.55)",
                textDecoration: "none",
              }}
            >
              Start with Pholio
            </a>
            <a
              href={`${APP_URL}/signup?plan=studio`}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5"
              style={{
                background: "linear-gradient(135deg, #C9A55A 0%, #A88C44 100%)",
                color: "#050505",
                fontFamily: "var(--font-sans)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: "0 4px 24px rgba(201,165,90,0.25)",
              }}
            >
              Add Studio+
            </a>
          </div>

          <p
            className="mt-8 max-w-md"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              color: "rgba(26,24,21,0.32)",
              lineHeight: 1.6,
            }}
          >
            14-day trial on Studio+ · cancel when the season ends
          </p>
        </motion.div>
      </div>
    </section>
  );
}
