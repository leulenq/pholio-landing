"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";
const ease = [0.22, 1, 0.36, 1] as const;

export default function TalentSignupStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FAF8F5", padding: "0 24px 4rem" }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
          className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-[rgba(26,24,21,0.07)] bg-[#1A1815] px-8 py-10 text-center md:flex-row md:text-left lg:px-12 lg:py-11"
          style={{
            boxShadow:
              "0 28px 70px -28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <div className="max-w-xl">
            <p
              className="font-editorial m-0"
              style={{
                fontSize: "clamp(1.35rem, 2.8vw, 1.85rem)",
                color: "#FAF8F5",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
                fontWeight: 400,
              }}
            >
              Put your comp and book in front of{" "}
              <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
                agencies that are already searching.
              </span>
            </p>
            <p
              className="m-0 mt-3"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                color: "rgba(250,248,245,0.42)",
                lineHeight: 1.55,
              }}
            >
              Models, actors, creatives — one profile, scout discovery, and
              agency applications when you&apos;re ready to push.
            </p>
          </div>
          <a
            href={`${APP_URL}/onboarding`}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full px-9 py-4 transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #C9A55A 0%, #A88C44 100%)",
              color: "#050505",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(201,165,90,0.35)",
            }}
          >
            Start your book
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
