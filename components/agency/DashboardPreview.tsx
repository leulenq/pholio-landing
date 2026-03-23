"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { AgencySection, agency } from "@/components/agency/AgencyPrimitives";

const ease = [0.22, 1, 0.36, 1] as const;

const KPI = [
  { label: "Intake", value: "47", note: "+12 w/w" },
  { label: "Fit score", value: "91%", note: "Rolling avg." },
  { label: "Shortlist", value: "12", note: "Active" },
  { label: "Go-sees", value: "8", note: "Scheduled" },
] as const;

const APPLICANTS = [
  {
    name: "Amara Johnson",
    type: "Editorial",
    city: "New York",
    match: 97,
    time: "2h ago",
  },
  {
    name: "Sofia Chen",
    type: "Runway",
    city: "Los Angeles",
    match: 94,
    time: "4h ago",
  },
  {
    name: "Zara Williams",
    type: "Commercial",
    city: "Miami",
    match: 88,
    time: "Yesterday",
  },
  {
    name: "Elena Marcus",
    type: "Editorial",
    city: "New York",
    match: 91,
    time: "Yesterday",
  },
] as const;

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0px", "0px"] : ["28px", "-28px"],
  );

  return (
    <div ref={ref} className="relative">
      <AgencySection variant="panel" id="dashboard">
        <div className={agency.container}>
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p
            className="mb-3 font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.22em] text-[var(--agency-accent)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Command center
          </p>
          <h2
            className="font-sans text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[var(--agency-text)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            One surface for intake, fit, and next actions
          </h2>
          <p
            className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-[var(--agency-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            See new submissions, fit scores, and who needs a decision—without
            tab-hopping across inboxes and drives.
          </p>
        </motion.div>

        <motion.div style={{ y }} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            className="overflow-hidden rounded-xl border border-[var(--agency-line)] bg-[var(--agency-bg-0)] shadow-[0_40px_100px_-32px_rgba(0,0,0,0.65)]"
          >
            <div className="flex items-center gap-2 border-b border-[var(--agency-line)] bg-[var(--agency-bg-1)] px-4 py-2.5">
              <div className="flex gap-1.5">
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div
                    key={c}
                    className="h-2 w-2 rounded-full opacity-70"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div className="mx-auto flex h-7 max-w-md flex-1 items-center justify-center rounded-md bg-[var(--agency-bg-2)] px-3">
                <span
                  className="truncate text-[0.625rem] text-[var(--agency-faint)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  agency.pholio.studio/dashboard
                </span>
              </div>
            </div>

            <div className="flex min-h-[420px] flex-col md:flex-row">
              <aside className="hidden w-[200px] shrink-0 border-r border-[var(--agency-line)] bg-[var(--agency-bg-1)] p-4 md:block">
                <p
                  className="mb-4 text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-[var(--agency-warm)] opacity-80"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Pholio
                </p>
                {["Overview", "Discover", "Applicants", "Castings", "Boards"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`mb-0.5 flex items-center gap-2 rounded-lg px-2.5 py-2 ${
                        i === 0
                          ? "bg-[var(--agency-accent-soft)] text-[var(--agency-accent)]"
                          : "text-[var(--agency-faint)]"
                      }`}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded bg-current opacity-50"
                        aria-hidden
                      />
                      <span
                        className="text-[0.6875rem] font-medium"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {item}
                      </span>
                      {item === "Applicants" && (
                        <span
                          className="ml-auto rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[0.5625rem] font-bold text-emerald-400"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          47
                        </span>
                      )}
                    </div>
                  ),
                )}
              </aside>

              <div className="min-w-0 flex-1 p-5 md:p-6">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p
                      className="text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-[var(--agency-faint)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Spring &apos;26 board cycle
                    </p>
                    <p
                      className="mt-1 font-sans text-lg font-medium text-[var(--agency-text)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Good evening, Sarah.
                    </p>
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {KPI.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-lg border border-[var(--agency-line)] bg-[var(--agency-panel)] px-3 py-3"
                    >
                      <p
                        className="text-[0.5625rem] uppercase tracking-[0.1em] text-[var(--agency-faint)]"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {kpi.label}
                      </p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span
                          className="font-sans text-xl font-semibold tabular-nums text-[var(--agency-text)]"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {kpi.value}
                        </span>
                        <span
                          className="text-[0.625rem] font-medium text-emerald-400/90"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {kpi.note}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden rounded-lg border border-[var(--agency-line)]">
                  <div className="flex items-center justify-between border-b border-[var(--agency-line)] bg-[var(--agency-bg-1)] px-4 py-2.5">
                    <span
                      className="text-[0.75rem] font-semibold text-[var(--agency-muted)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      New applications
                    </span>
                    <span
                      className="text-[0.625rem] font-medium text-[var(--agency-accent)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      View all
                    </span>
                  </div>
                  {APPLICANTS.map((a, i) => (
                    <div
                      key={a.name}
                      className={`flex items-center gap-3 px-4 py-3 ${
                        i < APPLICANTS.length - 1
                          ? "border-b border-[var(--agency-line)]"
                          : ""
                      }`}
                    >
                      <div
                        className="h-8 w-8 shrink-0 rounded-md border border-[var(--agency-line)] bg-[var(--agency-bg-2)]"
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className="truncate text-[0.8125rem] font-medium text-[var(--agency-text)]"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {a.name}
                        </p>
                        <p
                          className="truncate text-[0.6875rem] text-[var(--agency-faint)]"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {a.type} · {a.city} · {a.time}
                        </p>
                      </div>
                      <div
                        className={`shrink-0 rounded-md border px-2 py-0.5 ${
                          a.match >= 90
                            ? "border-[rgba(59,130,246,0.25)] bg-[var(--agency-accent-soft)]"
                            : "border-[var(--agency-line)] bg-transparent"
                        }`}
                      >
                        <span
                          className={`text-[0.6875rem] font-bold tabular-nums ${
                            a.match >= 90
                              ? "text-[var(--agency-accent)]"
                              : "text-[var(--agency-faint)]"
                          }`}
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {a.match}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        </div>
      </AgencySection>
    </div>
  );
}
