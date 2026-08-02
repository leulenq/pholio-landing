"use client";

import { useRef, useState, useEffect } from "react";
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

const STAGES = [
  { label: "New", count: 47, color: "#3b82f6", pct: 52 },
  { label: "Review", count: 12, color: "#C9A55A", pct: 13 },
  { label: "Shortlist", count: 8, color: "#8b5cf6", pct: 9 },
  { label: "Accepted", count: 6, color: "#22c55e", pct: 7 },
  { label: "Declined", count: 17, color: "#475569", pct: 19 },
] as const;

const KANBAN = [
  {
    stage: "New",
    items: [
      { name: "Amara J.", type: "Editorial" },
      { name: "Sofia C.", type: "Runway" },
      { name: "Zara W.", type: "Commercial" },
    ],
  },
  {
    stage: "Review",
    items: [
      { name: "Elena M.", type: "Editorial" },
      { name: "Mia T.", type: "Lifestyle" },
    ],
  },
  {
    stage: "Shortlist",
    items: [{ name: "Nina R.", type: "Runway" }],
  },
] as const;

export default function FeaturePipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <AgencySection variant="base">
      <div ref={ref} className={agency.container}>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease }}
          >
            <AgencyEyebrow>Intake &amp; decisions</AgencyEyebrow>
            <AgencyH2>A pipeline the whole team can read</AgencyH2>
            <AgencyLead>
              Move submissions through defined stages—from first screen to
              shortlist—so bookers, scouts, and leadership share one system of
              record.
            </AgencyLead>
            <AgencyBulletList
              items={[
                "Kanban-style stages with clear ownership",
                "Status history for handoffs and audits",
                "Room to collaborate without losing the thread",
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[400px]">
              <div className="mb-3 flex h-2 overflow-hidden rounded-full bg-[var(--agency-bg-2)]">
                {STAGES.map((s) => (
                  <motion.div
                    key={s.label}
                    initial={{ width: 0 }}
                    animate={animated ? { width: `${s.pct}%` } : {}}
                    transition={{
                      duration: 0.85,
                      delay: 0.15,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="first:rounded-l-full last:rounded-r-full"
                    style={{ backgroundColor: s.color }}
                  />
                ))}
              </div>
              <div className="mb-6 flex flex-wrap gap-3">
                {STAGES.map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <div
                      className="h-1.5 w-1.5 rounded-sm"
                      style={{ backgroundColor: s.color }}
                    />
                    <span
                      className="text-[0.625rem] text-[var(--agency-faint)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="text-[0.625rem] font-bold text-[var(--agency-faint)] opacity-60"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {s.count}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {KANBAN.map((col) => (
                  <div
                    key={col.stage}
                    className="rounded-xl border border-[var(--agency-line)] bg-[var(--agency-panel)] p-2"
                  >
                    <p
                      className="mb-2 border-b border-[var(--agency-line)] pb-2 text-[0.5625rem] font-bold uppercase tracking-[0.1em] text-[var(--agency-faint)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {col.stage} ({col.items.length})
                    </p>
                    {col.items.map((item, j) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 6 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.35,
                          delay: 0.4 + j * 0.06,
                          ease,
                        }}
                        className="mb-1.5 rounded-lg border border-[var(--agency-line)] bg-[var(--agency-bg-0)] px-2 py-2 last:mb-0"
                      >
                        <div
                          className="mb-1.5 h-1 w-3/4 rounded bg-[var(--agency-faint)] opacity-25"
                          aria-hidden
                        />
                        <p
                          className="text-[0.625rem] text-[var(--agency-warm)] opacity-80"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {item.type}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AgencySection>
  );
}
