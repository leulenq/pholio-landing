// landing/components/talent-new/FinalCTA.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";
const ease = [0.22, 1, 0.36, 1] as const;

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        minHeight: "78vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 24px",
        position: "relative",
      }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        animate={
          prefersReducedMotion
            ? {}
            : {
                background: [
                  "linear-gradient(160deg,#0c0b09 0%,#12100c 40%,#0a0908 100%)",
                  "linear-gradient(160deg,#0a0908 0%,#0c0b09 45%,#12100c 100%)",
                  "linear-gradient(160deg,#0c0b09 0%,#12100c 40%,#0a0908 100%)",
                ],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "linear-gradient(160deg,#0c0b09 0%,#12100c 40%,#0a0908 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.03,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "32%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 720,
          height: 480,
          background:
            "radial-gradient(ellipse, rgba(201,165,90,0.11) 0%, transparent 58%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {!prefersReducedMotion &&
        Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              width: 2,
              height: 2,
              borderRadius: "50%",
              backgroundColor: "#C9A55A",
              left: `${10 + (i * 7.1) % 80}%`,
              top: `${14 + (i * 8.1) % 68}%`,
            }}
            animate={{
              y: [0, -18 - (i % 4) * 6, 0],
              opacity: [0, 0.18, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4.5 + (i % 3) * 2,
              repeat: Infinity,
              delay: (i * 0.55) % 4,
              ease: "easeInOut",
            }}
          />
        ))}

      <div className="relative z-10 max-w-[640px] text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <div
            style={{
              width: 24,
              height: 1,
              background:
                "linear-gradient(to right, transparent, rgba(201,165,90,0.45))",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "0.625rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "#C9A55A",
            }}
          >
            Last look
          </span>
          <div
            style={{
              width: 24,
              height: 1,
              background:
                "linear-gradient(to left, transparent, rgba(201,165,90,0.45))",
            }}
          />
        </motion.div>

        <h2
          className="font-editorial"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "#FFFFFF",
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            margin: 0,
          }}
        >
          <motion.span
            initial={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 22,
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={
              inView
                ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }
                : {}
            }
            transition={{ duration: 0.82, delay: 0.08, ease }}
            style={{ display: "block" }}
          >
            They are already
          </motion.span>
          <motion.span
            initial={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 22,
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={
              inView
                ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }
                : {}
            }
            transition={{ duration: 0.82, delay: 0.18, ease }}
            style={{ display: "block" }}
          >
            flipping your row.
          </motion.span>
          <motion.span
            initial={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 22,
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={
              inView
                ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }
                : {}
            }
            transition={{ duration: 0.82, delay: 0.28, ease }}
            className="font-editorial-italic"
            style={{
              display: "block",
              color: "#C9A55A",
              marginTop: "0.12em",
            }}
          >
            Make sure it is yours.
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.48, ease }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9375rem",
            color: "rgba(255,255,255,0.36)",
            lineHeight: 1.65,
            margin: "2rem 0 2.35rem",
          }}
        >
          Under an hour to a board-ready book agencies can search — comp,
          digitals, and match in one corridor. Studio+ is there when you want
          the full package and priority in the glass.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.58, ease }}
          href={`${APP_URL}/onboarding`}
          className="group relative inline-flex items-center gap-2 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #C9A55A 0%, #A88C44 100%)",
            color: "#050505",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "17px 44px",
            borderRadius: 100,
            textDecoration: "none",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 12px 40px rgba(201,165,90,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Ship my book
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform group-hover:translate-x-1"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </div>
    </section>
  );
}
