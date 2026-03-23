"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  AgencySection,
  AgencyEyebrow,
  AgencyH2,
  AgencyLead,
  AgencyBulletList,
  agency,
} from "@/components/agency/AgencyPrimitives";

const ease = [0.22, 1, 0.36, 1] as const;

const FILTERS = [
  "Editorial",
  "5′9″–6′0″",
  "NYC",
  "Brown hair",
  "Available",
] as const;

export default function FeatureDiscovery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <AgencySection variant="elevated">
      <div ref={ref} className={agency.container}>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.05, ease }}
            className="order-2 lg:order-1"
          >
            <div className="mx-auto max-w-[400px] overflow-hidden rounded-xl border border-[var(--agency-line)] bg-[var(--agency-bg-0)] shadow-[0_28px_60px_-20px_rgba(0,0,0,0.5)]">
              <div className="border-b border-[var(--agency-line)] px-4 py-4">
                <div className="flex items-center gap-2 rounded-lg border border-[var(--agency-line)] bg-[var(--agency-bg-2)] px-3 py-2.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="shrink-0 opacity-40"
                    aria-hidden
                  >
                    <circle
                      cx="6.5"
                      cy="6.5"
                      r="4.5"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10 10l4 4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    className="text-[0.75rem] text-[var(--agency-faint)]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Search network…
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {FILTERS.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-[rgba(59,130,246,0.2)] bg-[var(--agency-accent-soft)] px-2.5 py-1 text-[0.625rem] font-medium text-[var(--agency-accent)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-4 py-4">
                <p
                  className="mb-3 text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-[var(--agency-faint)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  128 profiles
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.35,
                        delay: 0.2 + i * 0.05,
                        ease,
                      }}
                      className="relative aspect-[3/4] overflow-hidden rounded-lg border border-[var(--agency-line)] bg-[var(--agency-bg-2)]"
                    >
                      <div
                        className="absolute inset-0 opacity-90"
                        style={{
                          background: `linear-gradient(145deg, rgba(59,130,246,${0.04 + i * 0.01}), rgba(201,165,90,${0.03 + i * 0.008}))`,
                        }}
                      />
                      <div className="absolute right-1.5 top-1.5 rounded border border-[var(--agency-line)] bg-black/35 px-1 py-0.5 backdrop-blur-sm">
                        <span
                          className="text-[0.5625rem] font-bold tabular-nums text-[var(--agency-text)]"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {97 - i * 5}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease }}
            className="order-1 lg:order-2"
          >
            <AgencyEyebrow>Discovery</AgencyEyebrow>
            <AgencyH2>Structured search for how casting thinks</AgencyH2>
            <AgencyLead>
              Stack filters the way a room talks about a job—market, look,
              measurements, availability—then work the grid top-down. Less
              folder archaeology; more time on creative fit.
            </AgencyLead>
            <AgencyBulletList
              items={[
                "Multi-criteria filters with savable combinations",
                "Availability and market signals surfaced in results",
                "Growing network of presentation-ready books",
              ]}
            />
          </motion.div>
        </div>
      </div>
    </AgencySection>
  );
}
