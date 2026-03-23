"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { agency } from "@/components/agency/AgencyPrimitives";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const ease = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "140+", label: "Agency teams on network" },
  { value: "Unified", label: "Book + intake view" },
  { value: "Ranked", label: "Search & shortlist" },
  { value: "Staged", label: "Pipeline visibility" },
] as const;

export default function AgencyHero() {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92vh] flex-col overflow-hidden bg-[var(--agency-bg-0)] pb-16 pt-28 md:pt-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.12),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--agency-line)] to-transparent"
      />

      <div className={`${agency.container} relative z-10 flex flex-1 flex-col justify-center`}>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="mb-6 font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.22em] text-[var(--agency-accent)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Agencies &amp; scouting teams
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.05, ease }}
              className="font-editorial text-[clamp(2.5rem,6vw,4.25rem)] font-normal leading-[0.98] tracking-[-0.035em] text-[var(--agency-text)]"
            >
              A booking pipeline
              <br />
              <span className="text-[var(--agency-muted)]">your board can trust.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.15, ease }}
              className="mt-8 max-w-md text-[1rem] leading-[1.65] text-[var(--agency-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Search ranked talent, standardize books, and run intake with clear
              stages—so scouts move from brief to shortlist without the drag of
              fragmented DMs and files.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25, ease }}
              className="mt-10 flex flex-wrap items-center gap-4"
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
                View product overview
              </a>
            </motion.div>
          </div>

          {/* Product preview stack */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 24 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="relative lg:col-span-6"
          >
            <div className="relative rounded-2xl border border-[var(--agency-line)] bg-[var(--agency-bg-1)] p-1 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.55)]">
              <div className="rounded-[14px] bg-[var(--agency-bg-2)] p-5 md:p-6">
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-[var(--agency-line)] pb-4">
                  <div>
                    <p
                      className="text-[0.5625rem] font-semibold uppercase tracking-[0.18em] text-[var(--agency-faint)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Agency workspace
                    </p>
                    <p
                      className="mt-1 font-sans text-sm font-medium text-[var(--agency-text)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Shortlist · Spring board
                    </p>
                  </div>
                  <span
                    className="rounded-full border border-[var(--agency-line)] bg-[var(--agency-panel)] px-3 py-1 text-[0.625rem] font-medium text-[var(--agency-warm)]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Live roster
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { k: "In review", v: "12", t: "New this week" },
                    { k: "Shortlist", v: "8", t: "Board-ready" },
                    { k: "Match band", v: "90+", t: "Top quartile" },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="rounded-lg border border-[var(--agency-line)] bg-[var(--agency-bg-0)] px-3 py-3"
                    >
                      <p
                        className="text-[0.5625rem] uppercase tracking-[0.12em] text-[var(--agency-faint)]"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {row.k}
                      </p>
                      <p
                        className="mt-2 font-sans text-2xl font-semibold tabular-nums tracking-tight text-[var(--agency-text)]"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {row.v}
                      </p>
                      <p
                        className="mt-1 text-[0.6875rem] text-[var(--agency-muted)]"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {row.t}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg border border-dashed border-[var(--agency-line)] bg-[var(--agency-bg-0)]/80 px-4 py-3">
                  <p
                    className="text-[0.6875rem] leading-relaxed text-[var(--agency-muted)]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <span className="font-medium text-[var(--agency-text)]">
                      Next step:
                    </span>{" "}
                    Route shortlisted talent to board review with the same comp
                    set casting already saw in search.
                  </p>
                </div>
              </div>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-48 w-48 rounded-full bg-[var(--agency-accent-soft)] blur-3xl"
            />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.6, ease }}
          className="mt-20 grid grid-cols-2 gap-8 border-t border-[var(--agency-line)] pt-10 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <p
                className="font-sans text-[clamp(1.15rem,2.5vw,1.5rem)] font-semibold tabular-nums tracking-tight text-[var(--agency-text)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {s.value}
              </p>
              <p
                className="mt-1 text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-[var(--agency-faint)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
