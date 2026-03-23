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

const INCLUDED = [
  "Unlimited portfolio images",
  "Unlimited agency applications each month",
  "Advanced analytics and profile audit",
  "Your own .studio website",
  "QR comp cards & custom portfolio URL",
  "Priority placement in search",
];

export default function StudioPlusClose() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [yearly, setYearly] = useState(false);
  const price = yearly ? 7.99 : 9.99;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "140px 140px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[min(80vw,520px)] h-[min(80vw,520px)] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(201,165,90,0.07) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <div>
            <motion.div
              initial={false}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease }}
              style={{ opacity: inView ? 1 : prefersReducedMotion ? 1 : 0, y: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <div
                className="h-px w-10"
                style={{
                  background: "linear-gradient(90deg, var(--color-gold), transparent)",
                }}
              />
              <span className="text-label" style={{ color: "rgba(201,165,90,0.85)" }}>
                Enrollment
              </span>
            </motion.div>

            <motion.h2
              className="font-editorial m-0"
              initial={false}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.06, ease }}
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#F7F5F2",
                opacity: inView ? 1 : prefersReducedMotion ? 1 : 0,
                transform: inView || prefersReducedMotion ? "none" : "translateY(20px)",
              }}
            >
              Carry the{" "}
              <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>
                standard
              </span>{" "}
              with you.
            </motion.h2>

            <motion.p
              className="m-0 mt-6 max-w-[36rem]"
              initial={false}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.14, ease }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "rgba(245,243,240,0.38)",
                opacity: inView ? 1 : prefersReducedMotion ? 1 : 0,
              }}
            >
              Fourteen days on us. No card required to explore. When you are ready,
              Studio+ stays beside your craft—not in front of it.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-5"
              initial={false}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.22, ease }}
              style={{
                opacity: inView ? 1 : prefersReducedMotion ? 1 : 0,
                transform: inView || prefersReducedMotion ? "none" : "translateY(12px)",
              }}
            >
              <motion.a
                href={`${APP_URL}/signup?plan=studio`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #DFBE76 0%, #A88C44 100%)",
                  color: "#050505",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "0.625rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "16px 36px",
                  borderRadius: 100,
                  textDecoration: "none",
                  boxShadow: "0 12px 40px -8px rgba(201,165,90,0.35)",
                }}
              >
                Start 14-day trial
              </motion.a>
              <a
                href={`${APP_URL}/onboarding`}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "0.625rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(245,243,240,0.35)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(201,165,90,0.25)",
                  paddingBottom: 2,
                }}
              >
                Continue with free
              </a>
            </motion.div>

            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.625rem",
                  color: "rgba(245,243,240,0.3)",
                  letterSpacing: "0.06em",
                }}
              >
                Billing
              </span>
              <button
                type="button"
                onClick={() => setYearly(!yearly)}
                className="relative h-6 w-11 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: yearly ? "var(--color-gold)" : "rgba(255,255,255,0.1)",
                  boxShadow: yearly ? "0 0 16px rgba(201,165,90,0.2)" : "none",
                }}
                aria-label="Toggle yearly billing"
              >
                <span
                  className="absolute top-0.5 h-5 w-5 rounded-full bg-[#0a0a0f] shadow transition-transform duration-300"
                  style={{
                    transform: yearly ? "translateX(22px)" : "translateX(2px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              </button>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.625rem",
                  color: yearly ? "rgba(245,243,240,0.55)" : "rgba(245,243,240,0.28)",
                  letterSpacing: "0.06em",
                }}
              >
                Yearly saves 20%
              </span>
              <AnimatePresence mode="wait">
                {yearly && (
                  <motion.span
                    key="price"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    className="font-editorial"
                    style={{
                      fontSize: "1.25rem",
                      color: "var(--color-gold)",
                      marginLeft: 4,
                    }}
                  >
                    ${price}
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.65rem",
                        color: "rgba(245,243,240,0.35)",
                        marginLeft: 4,
                      }}
                    >
                      /mo
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
              {!yearly && (
                <span className="font-editorial" style={{ fontSize: "1.25rem", color: "#F5F3F0" }}>
                  ${price}
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.65rem",
                      color: "rgba(245,243,240,0.35)",
                      marginLeft: 4,
                    }}
                  >
                    /mo
                  </span>
                </span>
              )}
            </div>
          </div>

          <motion.div
            initial={false}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.12, ease }}
            className="rounded-sm p-8 md:p-10"
            style={{
              opacity: inView ? 1 : prefersReducedMotion ? 1 : 0,
              transform: inView || prefersReducedMotion ? "none" : "translateX(16px)",
              border: "1px solid rgba(201,165,90,0.15)",
              background:
                "linear-gradient(155deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <p className="text-label m-0 mb-6" style={{ color: "rgba(201,165,90,0.75)" }}>
              What travels with you
            </p>
            <ul className="m-0 p-0 list-none flex flex-col gap-4">
              {INCLUDED.map((line, i) => (
                <motion.li
                  key={line}
                  initial={false}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease }}
                  className="flex gap-3 items-start"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    color: "rgba(245,243,240,0.55)",
                  }}
                >
                  <span
                    className="shrink-0 mt-1.5 h-px w-6"
                    style={{ background: "rgba(201,165,90,0.45)" }}
                    aria-hidden
                  />
                  {line}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
