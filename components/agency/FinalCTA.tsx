"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { agency } from "@/components/agency/AgencyPrimitives";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const ease = [0.22, 1, 0.36, 1] as const;

export default function AgencyCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-[var(--agency-bg-0)] px-6 py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(59,130,246,0.08),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className={`${agency.container} relative z-10 text-center`}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease }}
          className="mb-6 font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.22em] text-[var(--agency-accent)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Next step
        </motion.p>

        <h2
          className="mx-auto max-w-[640px] font-sans text-[clamp(2rem,5.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[var(--agency-text)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <motion.span
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.05, ease }}
            className="block"
          >
            Put roster workflow
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12, ease }}
            className="mt-1 block text-[var(--agency-muted)]"
          >
            on one accountable system
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.25, ease }}
          className="mx-auto mt-8 max-w-md text-[0.9375rem] leading-relaxed text-[var(--agency-muted)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Request access for your agency. We&apos;ll follow up with onboarding
          options, security review materials, and a walkthrough tailored to your
          scouting team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.35, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href={`${APP_URL}/agency/register`} className="agency-btn-primary">
            Request access
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
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
          <a href="#dashboard" className="agency-btn-secondary">
            Back to overview
          </a>
        </motion.div>
      </div>
    </section>
  );
}
