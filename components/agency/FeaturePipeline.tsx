"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const STAGES = [
  { label: "New", count: 47, color: "#3b82f6", pct: 52 },
  { label: "Review", count: 12, color: "#C9A55A", pct: 13 },
  { label: "Shortlist", count: 8, color: "#8b5cf6", pct: 9 },
  { label: "Accepted", count: 6, color: "#22c55e", pct: 7 },
  { label: "Declined", count: 17, color: "#475569", pct: 19 },
];

const KANBAN = [
  { stage: "New", items: [{ name: "Amara J.", type: "Editorial" }, { name: "Sofia C.", type: "Runway" }, { name: "Zara W.", type: "Commercial" }] },
  { stage: "Review", items: [{ name: "Elena M.", type: "Editorial" }, { name: "Mia T.", type: "Lifestyle" }] },
  { stage: "Shortlist", items: [{ name: "Nina R.", type: "Runway" }] },
];

export default function FeaturePipeline() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "#0A0A0F", padding: "8rem 0" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0.02, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease }}>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 24, height: 1, background: "linear-gradient(to right, #3b82f6, transparent)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#3b82f6" }}>Pipeline</span>
            </div>
            <h2 className="font-editorial" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "white", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", margin: "0 0 1.25rem" }}>
              Never lose<br /><span className="font-editorial-italic" style={{ background: "linear-gradient(135deg, #3b82f6, #C9A55A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>track.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 420, margin: "0 0 2rem" }}>
              Organize every applicant through a clear pipeline — from new submission to final decision. No spreadsheets. No missed talent. Just a clean, visual workflow.
            </p>
            <div className="flex flex-col gap-3">
              {["Visual Kanban board", "Drag-and-drop management", "Automated status tracking", "Team collaboration tools"].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#3b82f6", opacity: 0.6, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)" }}>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual — pipeline */}
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.15, ease }} className="flex justify-center lg:justify-end">
            <div style={{ width: 400, maxWidth: "90vw" }}>
              {/* Pipeline bar */}
              <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", height: 8, marginBottom: 12 }}>
                {STAGES.map((s) => (
                  <motion.div key={s.label} initial={{ width: 0 }} animate={animated ? { width: `${s.pct}%` } : {}} transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }} style={{ backgroundColor: s.color }} />
                ))}
              </div>
              {/* Legend */}
              <div className="flex gap-4 mb-6 flex-wrap">
                {STAGES.map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <div style={{ width: 6, height: 6, borderRadius: 2, backgroundColor: s.color }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "rgba(255,255,255,0.3)" }}>{s.label}</span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.15)" }}>{s.count}</span>
                  </div>
                ))}
              </div>

              {/* Kanban columns */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {KANBAN.map((col) => (
                  <div key={col.stage} style={{ borderRadius: 10, backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: 8 }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{col.stage} ({col.items.length})</div>
                    {col.items.map((item, j) => (
                      <motion.div key={item.name} initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.5 + j * 0.1, ease }}
                        style={{ padding: "8px 8px", borderRadius: 6, backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", marginBottom: 4 }}>
                        <div style={{ height: 4, width: "70%", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2, marginBottom: 4 }} />
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: 8, color: "rgba(201,165,90,0.4)" }}>{item.type}</div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
