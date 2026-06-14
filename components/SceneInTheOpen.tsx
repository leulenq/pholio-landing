"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────
   SLOT 5 — "In the open"
   The two pillars talent never gets to see elsewhere, fused:
   · Smart Match — your profile + every casting BRIEF are embedded (pgvector)
     and matched semantically; you surface ranked by fit, not buried.
   · Transparency — boards / applications / analytics mean you watch yourself
     move through the agency pipeline (discovered → shortlisted → booked),
     knowing who, when, and what they're casting for.
   Visual mechanic: an editorial brief→match resolve, then a revealed
   pipeline timeline. No device preview. Swap placeholders for live data.
   ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

const CRITERIA = ["Editorial archetype", "175 cm and above", "Milan · available March"];

const STAGES = [
  { stage: "Discovered", signal: "Ford Models opened your card", meta: "editorial · Milan · 2m ago" },
  { stage: "Shortlisted", signal: "Added to board — “SS26 Womenswear”", meta: "1 hr ago" },
  { stage: "In motion", signal: "Availability requested", meta: "Mar 3–9 · today" },
  { stage: "Booked", signal: "First option confirmed", meta: "just now", done: true },
];

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A55A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function SceneInTheOpen() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden texture-grain py-28 md:py-40"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="absolute inset-x-0 top-0 h-px divider-gold-center" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ── Header ──────────────────────────────────────────── */}
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <span className="text-label block" style={{ color: "var(--color-gold)" }}>
            Discovery &amp; beyond
          </span>
          <h2 className="font-editorial mt-5 text-4xl leading-[1.05] sm:text-5xl md:text-6xl" style={{ color: "var(--color-ink)" }}>
            Matched, then in the{" "}
            <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>
              open
            </span>
            .
          </h2>
          <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            Pholio reads every casting brief and matches you by fit — so you
            surface in the right searches instead of shouting into the void. Then
            you watch it happen: who opened your card, who shortlisted you, what
            they&rsquo;re casting for. The pipeline, finally visible.
          </p>
        </motion.div>

        {/* ── Smart Match: brief → you ────────────────────────── */}
        <div className="mt-16 grid grid-cols-1 items-center gap-8 md:mt-20 md:grid-cols-[1fr_auto_1fr]">
          {/* the brief */}
          <motion.div
            className="relative p-7"
            style={{ border: "1px solid rgba(15,23,42,0.12)", backgroundColor: "rgba(255,255,255,0.4)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: "var(--color-gold-dark)" }}>
              Live casting brief
            </span>
            <h3 className="font-editorial mt-3 text-2xl" style={{ color: "var(--color-ink)" }}>
              Editorial — Spring Campaign
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              {CRITERIA.map((c) => (
                <div key={c} className="flex items-center gap-3">
                  <span className="h-px w-4 shrink-0" style={{ backgroundColor: "var(--color-gold)" }} />
                  <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* connector */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            <span className="hidden h-px w-10 md:block" style={{ background: "linear-gradient(to right, rgba(201,165,90,0), #C9A55A)" }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: "var(--color-gold)" }}>
              matches
            </span>
            <span className="hidden h-px w-10 md:block" style={{ background: "linear-gradient(to left, rgba(201,165,90,0), #C9A55A)" }} />
          </motion.div>

          {/* the match */}
          <motion.div
            className="relative p-7"
            style={{ border: "1px solid rgba(201,165,90,0.4)", backgroundColor: "rgba(201,165,90,0.05)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.35 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: "var(--color-gold-dark)" }}>
              Your fit
            </span>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-editorial text-6xl" style={{ color: "var(--color-ink)" }}>
                94
              </span>
              <span className="font-editorial-italic text-2xl" style={{ color: "var(--color-gold)" }}>
                %
              </span>
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--color-gold-dark)" }}>
              You surface #3 of 1,240
            </p>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Matched on archetype, height, and location — before you applied to
              anything.
            </p>
          </motion.div>
        </div>

        {/* ── The pipeline, in the open ───────────────────────── */}
        <div className="relative mt-24 md:mt-28">
          {/* connecting hairline (desktop) */}
          <div className="absolute left-0 right-0 top-[7px] hidden h-px md:block" style={{ background: "linear-gradient(to right, var(--color-gold), rgba(201,165,90,0.25))" }} />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.stage}
                className="relative flex flex-col"
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease, delay: 0.6 + i * 0.18 }}
              >
                {/* node marker — a gold tick on the line, not a dot */}
                <div className="mb-5 flex h-[15px] items-center">
                  {s.done ? (
                    <Check />
                  ) : (
                    <span className="block h-[14px] w-px" style={{ backgroundColor: "var(--color-gold)" }} />
                  )}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: "var(--color-gold)" }}>
                  {s.stage}
                </span>
                <p className="mt-3 font-editorial text-lg leading-snug" style={{ color: "var(--color-ink)" }}>
                  {s.signal}
                </p>
                <span className="mt-2 font-mono text-[11px] tracking-[0.1em]" style={{ color: "var(--color-text-secondary)" }}>
                  {s.meta}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
