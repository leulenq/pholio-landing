"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { motion, useReducedMotion } from "framer-motion";

import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";
const ease = [0.22, 1, 0.36, 1] as const;

const noiseBg = {
  opacity: 0.035,
  backgroundImage:
    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
  backgroundSize: "150px 150px",
} as const;

export default function StudioPlusHero() {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useLayoutEffect(() => {
    if (!mounted || prefersReducedMotion || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sp-hero-line",
        { yPercent: 110, opacity: 0, rotateX: -12 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.05,
          stagger: 0.14,
          ease: "power4.out",
        }
      );
      gsap.fromTo(
        ".sp-hero-eyebrow, .sp-hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, delay: 0.45, stagger: 0.08, ease: "power3.out" }
      );
      gsap.fromTo(
        ".sp-hero-cta",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.75, ease: "power3.out" }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [mounted, prefersReducedMotion]);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      style={{
        backgroundColor: "#060508",
        perspective: 1200,
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={noiseBg} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(201,165,90,0.14) 0%, transparent 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(140%,900px)] h-[45%]"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(201,165,90,0.06) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      {!prefersReducedMotion &&
        Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 1 + (i % 2),
              height: 1 + (i % 2),
              left: `${6 + (i * 4.7) % 88}%`,
              top: `${10 + (i * 6.1) % 78}%`,
              backgroundColor: "rgba(201,165,90,0.45)",
              boxShadow: "0 0 12px rgba(201,165,90,0.2)",
            }}
            animate={{
              y: [0, -18 - (i % 5) * 6, 0],
              opacity: [0, 0.35, 0],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              delay: (i * 0.31) % 3.5,
              ease: "easeInOut",
            }}
          />
        ))}

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16 pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          <div className="lg:col-span-7" style={{ transformStyle: "preserve-3d" }}>
            <div
              className="sp-hero-eyebrow flex items-center gap-4 mb-8 md:mb-10"
              style={{
                opacity: prefersReducedMotion ? 1 : 0,
              }}
            >
              <div
                className="h-px w-12 shrink-0"
                style={{
                  background: "linear-gradient(90deg, var(--color-gold), transparent)",
                }}
              />
              <span className="text-label" style={{ color: "rgba(201,165,90,0.9)" }}>
                Career atelier
              </span>
            </div>

            <h1
              className="font-editorial m-0"
              style={{
                fontSize: "clamp(2.75rem, 8.5vw, 6.25rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                color: "#FAFAF8",
              }}
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <span
                  className="sp-hero-line block"
                  style={{
                    opacity: prefersReducedMotion ? 1 : 0,
                    transformOrigin: "50% 100%",
                  }}
                >
                  The room where
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span
                  className="sp-hero-line block font-editorial-italic"
                  style={{
                    color: "var(--color-gold)",
                    opacity: prefersReducedMotion ? 1 : 0,
                    transformOrigin: "50% 100%",
                  }}
                >
                  your career speaks first.
                </span>
              </span>
            </h1>

            <p
              className="sp-hero-sub mt-8 md:mt-10 max-w-[34rem]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.9375rem, 1.35vw, 1.0625rem)",
                lineHeight: 1.75,
                color: "rgba(245,243,240,0.42)",
                opacity: prefersReducedMotion ? 1 : 0,
              }}
            >
              Studio+ is not a louder subscription—it is a quieter standard. More
              considered presentation, clearer visibility with agencies, and the
              control to package your book the way casting rooms expect.
            </p>

            <div
              className="sp-hero-cta mt-10 md:mt-12 flex flex-wrap items-center gap-4"
              style={{ opacity: prefersReducedMotion ? 1 : 0 }}
            >
              <motion.a
                href={`${APP_URL}/signup?plan=studio`}
                className="inline-flex items-center gap-2"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: "linear-gradient(135deg, #DFBE76 0%, #A88C44 100%)",
                  color: "#050505",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "0.625rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "16px 32px",
                  borderRadius: 100,
                  textDecoration: "none",
                  boxShadow: "0 12px 40px -8px rgba(201,165,90,0.35)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                Begin Studio+
              </motion.a>
              <a
                href={`${APP_URL}/onboarding`}
                className="inline-flex items-center"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "0.625rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(245,243,240,0.35)",
                  padding: "14px 24px",
                  textDecoration: "none",
                  borderRadius: 100,
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "color 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(245,243,240,0.75)";
                  e.currentTarget.style.borderColor = "rgba(201,165,90,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(245,243,240,0.35)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                Start free
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-4">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease }}
              className="relative"
            >
              <div
                className="relative overflow-hidden rounded-sm"
                style={{
                  border: "1px solid rgba(201,165,90,0.22)",
                  boxShadow:
                    "0 0 0 1px rgba(0,0,0,0.4), 0 40px 80px -24px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.04)",
                  background:
                    "linear-gradient(165deg, rgba(18,16,14,0.95) 0%, rgba(8,7,9,0.98) 100%)",
                }}
              >
                <div
                  className="flex items-center gap-2 px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="flex gap-1.5">
                    {["#3d3a36", "#5c564e", "#7a7268"].map((c) => (
                      <span
                        key={c}
                        className="rounded-full"
                        style={{ width: 6, height: 6, backgroundColor: c }}
                      />
                    ))}
                  </span>
                  <span
                    className="text-micro flex-1 text-center"
                    style={{ color: "rgba(245,243,240,0.2)" }}
                  >
                    pholio.studio / you
                  </span>
                </div>
                <div className="p-6 md:p-8 min-h-[220px] md:min-h-[280px] flex flex-col justify-between">
                  <p
                    className="font-editorial-italic m-0"
                    style={{
                      fontSize: "clamp(1.25rem, 2.2vw, 1.65rem)",
                      lineHeight: 1.35,
                      color: "rgba(245,243,240,0.88)",
                    }}
                  >
                    &ldquo;Board-ready is not a filter—it is a decision.&rdquo;
                  </p>
                  <div
                    className="flex justify-between items-end gap-4 mt-8"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.625rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(201,165,90,0.55)",
                    }}
                  >
                    <span>Presentation</span>
                    <span>Readiness</span>
                    <span>Agency view</span>
                  </div>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(201,165,90,0.12) 0%, transparent 70%)",
                  filter: "blur(24px)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        aria-hidden="true"
      >
        {!prefersReducedMotion && (
          <motion.div
            style={{
              width: 1,
              height: 48,
              background: "linear-gradient(to bottom, transparent, rgba(201,165,90,0.35), transparent)",
            }}
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    </section>
  );
}
