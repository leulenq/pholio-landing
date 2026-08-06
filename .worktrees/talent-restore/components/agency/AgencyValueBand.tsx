"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { AgencySection, agency } from "@/components/agency/AgencyPrimitives";

const PILLARS = [
  {
    title: "Brief alignment",
    body:
      "Filter and rank against the brief—measurements, market, look, availability—so scouts spend time on fits, not noise.",
  },
  {
    title: "Book quality",
    body:
      "Comp, digitals, and profile signals in one place. Fewer back-and-forth emails; faster decisions on who goes to the board.",
  },
  {
    title: "Pipeline control",
    body:
      "Stages, ownership, and history from inquiry to shortlist. Your team sees the same truth—no parallel spreadsheets.",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export default function AgencyValueBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <AgencySection variant="elevated">
      <div ref={ref} className={agency.container}>
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-14 max-w-2xl"
        >
          <p
            className="mb-3 font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.22em] text-[var(--agency-accent)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Operating model
          </p>
          <h2
            className="font-sans text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.03em] text-[var(--agency-text)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            From brief to booking—without losing the thread
          </h2>
          <p
            className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-[var(--agency-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Pholio is built for how agencies actually staff jobs: align to the
            creative ask, protect book standards, and keep intake moving.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 + i * 0.08, ease }}
              className="flex flex-col rounded-xl border border-[var(--agency-line)] bg-[var(--agency-panel)] p-7"
            >
              <div
                className="mb-4 h-px w-8 bg-gradient-to-r from-[var(--agency-accent)] to-transparent"
                aria-hidden
              />
              <h3
                className="font-sans text-base font-semibold tracking-tight text-[var(--agency-text)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {p.title}
              </h3>
              <p
                className="mt-3 text-[0.875rem] leading-relaxed text-[var(--agency-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {p.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </AgencySection>
  );
}
