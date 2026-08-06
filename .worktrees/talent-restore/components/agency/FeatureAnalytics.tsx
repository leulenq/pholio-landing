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

const BARS = [
  22, 30, 38, 35, 50, 58, 42, 52, 65, 50, 60, 75, 62, 80, 70, 85, 78, 92,
] as const;

export default function FeatureAnalytics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setAnimated(true), 350);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <AgencySection variant="panel">
      <div ref={ref} className={agency.container}>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.05, ease }}
          >
            <div className="mx-auto max-w-[420px] overflow-hidden rounded-xl border border-[var(--agency-line)] bg-[var(--agency-bg-0)] shadow-[0_28px_60px_-20px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between border-b border-[var(--agency-line)] px-4 py-3">
                <span
                  className="text-[0.75rem] font-semibold text-[var(--agency-muted)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Engagement
                </span>
                <div className="flex gap-4">
                  {["This week", "Last month", "All time"].map((t, i) => (
                    <span
                      key={t}
                      className={`text-[0.5625rem] font-medium uppercase tracking-[0.08em] ${
                        i === 0
                          ? "text-[var(--agency-accent)]"
                          : "text-[var(--agency-faint)]"
                      }`}
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-[var(--agency-line)] px-4 py-5">
                {[
                  { val: "312", label: "Profile views", trend: "+28%" },
                  { val: "47", label: "Applications", trend: "+12" },
                  { val: "91%", label: "Avg fit band", trend: "↑3%" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p
                      className="font-sans text-xl font-semibold tabular-nums text-[var(--agency-text)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {s.val}
                    </p>
                    <p
                      className="mt-1 text-[0.5625rem] text-[var(--agency-faint)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {s.label}
                    </p>
                    <p
                      className="mt-0.5 text-[0.625rem] font-semibold text-emerald-400/90"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {s.trend}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-4">
                <div className="flex h-20 items-end gap-0.5">
                  {BARS.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={animated ? { height: `${h}%` } : {}}
                      transition={{
                        duration: 0.55,
                        delay: i * 0.025,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className={`flex-1 rounded-sm ${
                        i >= BARS.length - 4
                          ? "bg-gradient-to-t from-[rgba(59,130,246,0.55)] to-[rgba(59,130,246,0.12)]"
                          : "bg-[var(--agency-faint)] opacity-20"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="border-t border-[var(--agency-line)] px-4 py-4">
                <p
                  className="mb-2 text-[0.5625rem] font-semibold uppercase tracking-[0.1em] text-[var(--agency-faint)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Mix by archetype
                </p>
                {[
                  { name: "Editorial", pct: 45, color: "#C9A55A" },
                  { name: "Runway", pct: 28, color: "#3b82f6" },
                  { name: "Commercial", pct: 17, color: "#8b5cf6" },
                ].map((a) => (
                  <div key={a.name} className="mb-2 last:mb-0">
                    <div className="mb-1 flex justify-between">
                      <span
                        className="text-[0.6875rem] text-[var(--agency-muted)]"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {a.name}
                      </span>
                      <span
                        className="text-[0.6875rem] font-semibold tabular-nums text-[var(--agency-text)]"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {a.pct}%
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-[var(--agency-bg-2)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={animated ? { width: `${a.pct}%` } : {}}
                        transition={{ duration: 0.75, delay: 0.2, ease }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: a.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease }}
          >
            <AgencyEyebrow>Reporting</AgencyEyebrow>
            <AgencyH2>Signals leadership can use in weekly reviews</AgencyH2>
            <AgencyLead>
              Trend engagement, watch conversion from view to application, and
              see where the roster skews—so you allocate scout time where it
              moves bookings.
            </AgencyLead>
            <AgencyBulletList
              items={[
                "Time-based trends for views and applications",
                "Archetype mix to balance board needs",
                "Export-friendly summaries for internal reporting",
              ]}
            />
          </motion.div>
        </div>
      </div>
    </AgencySection>
  );
}
