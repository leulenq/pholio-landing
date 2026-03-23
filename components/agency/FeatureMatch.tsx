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

const MATCHES = [
  {
    name: "Amara J.",
    type: "Editorial",
    match: 97,
    traits: ["5'10\"", "Brown", "NYC"],
  },
  {
    name: "Sofia C.",
    type: "Runway",
    match: 94,
    traits: ["5'11\"", "Black", "LA"],
  },
  {
    name: "Zara W.",
    type: "Commercial",
    match: 88,
    traits: ["5'8\"", "Blonde", "MIA"],
  },
  {
    name: "Elena M.",
    type: "Editorial",
    match: 91,
    traits: ["5'9\"", "Auburn", "NYC"],
  },
] as const;

export default function FeatureMatch() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <AgencySection variant="base">
      <div ref={ref} className={agency.container}>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease }}
          >
            <AgencyEyebrow>Fit &amp; ranking</AgencyEyebrow>
            <AgencyH2>Rank candidates to the brief—not alphabetically</AgencyH2>
            <AgencyLead>
              Multi-signal scoring across measurements, look, market, and
              availability surfaces who belongs in the first pass. Your team
              reviews a ordered list, not a random feed.
            </AgencyLead>
            <AgencyBulletList
              items={[
                "Composite scoring aligned to search criteria",
                "Archetype and market tags for quick scan",
                "Stable ordering your team can defend in meetings",
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[380px]">
              {MATCHES.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.07, ease }}
                  className={`mb-2 flex items-center gap-3 rounded-xl border px-4 py-3.5 ${
                    i === 0
                      ? "border-[rgba(59,130,246,0.22)] bg-[var(--agency-accent-soft)]"
                      : "border-[var(--agency-line)] bg-[var(--agency-panel)]"
                  }`}
                >
                  <span
                    className="w-7 text-center font-mono text-[0.625rem] font-bold text-[var(--agency-faint)]"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="h-10 w-10 shrink-0 rounded-lg border border-[var(--agency-line)] bg-[var(--agency-bg-2)]"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-[0.8125rem] font-medium text-[var(--agency-text)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {m.name}
                    </p>
                    <div className="mt-0.5 flex flex-wrap gap-1.5">
                      <span
                        className="rounded border border-[rgba(201,165,90,0.25)] bg-[rgba(201,165,90,0.06)] px-1.5 py-0.5 text-[0.625rem] text-[var(--agency-warm)]"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {m.type}
                      </span>
                      {m.traits.map((t) => (
                        <span
                          key={t}
                          className="text-[0.625rem] text-[var(--agency-faint)]"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`shrink-0 rounded-lg border px-2.5 py-1 ${
                      m.match >= 95
                        ? "border-[rgba(59,130,246,0.3)] bg-[var(--agency-bg-1)]"
                        : "border-[var(--agency-line)]"
                    }`}
                  >
                    <span
                      className={`font-sans text-[0.8125rem] font-bold tabular-nums ${
                        m.match >= 95
                          ? "text-[var(--agency-accent)]"
                          : "text-[var(--agency-faint)]"
                      }`}
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {m.match}%
                    </span>
                  </div>
                </motion.div>
              ))}
              <p
                className="mt-3 border-t border-[var(--agency-line)] pt-3 text-[0.6875rem] leading-relaxed text-[var(--agency-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Order reflects model fit to your active criteria—intended for
                triage, not a guarantee of outcome.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AgencySection>
  );
}
