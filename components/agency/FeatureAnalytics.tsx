"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const BARS = [22, 30, 38, 35, 50, 58, 42, 52, 65, 50, 60, 75, 62, 80, 70, 85, 78, 92];

export default function FeatureAnalytics() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "#0D0D14", padding: "8rem 0" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0.02, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: "20%", right: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual left */}
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1, ease }}>
            <div style={{ maxWidth: 400, borderRadius: 16, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 30px 60px -15px rgba(0,0,0,0.4)" }}>
              {/* Header */}
              <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Engagement</span>
                <div className="flex gap-6">
                  {["This week", "Last month", "All time"].map((t, i) => (
                    <span key={t} style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 500, color: i === 0 ? "#3b82f6" : "rgba(255,255,255,0.2)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Big numbers */}
              <div style={{ padding: "20px 18px 0", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[{ val: "312", label: "Profiles Viewed", trend: "+28%" }, { val: "47", label: "Applications", trend: "+12" }, { val: "91%", label: "Avg Match", trend: "↑3%" }].map((s) => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div className="font-editorial" style={{ fontSize: 22, color: "white", lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 8, color: "rgba(255,255,255,0.2)", marginTop: 3 }}>{s.label}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "#22c55e", fontWeight: 600, marginTop: 1 }}>{s.trend}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div style={{ padding: "20px 18px 16px" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 80 }}>
                  {BARS.map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} animate={animated ? { height: `${h}%` } : {}} transition={{ duration: 0.6, delay: i * 0.03, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{ flex: 1, borderRadius: 2, background: i >= BARS.length - 4 ? "linear-gradient(to top, rgba(59,130,246,0.6), rgba(59,130,246,0.15))" : "rgba(255,255,255,0.05)" }}
                    />
                  ))}
                </div>
              </div>

              {/* Archetype breakdown */}
              <div style={{ padding: "0 18px 16px" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Top Archetypes</div>
                {[{ name: "Editorial", pct: 45, color: "#C9A55A" }, { name: "Runway", pct: 28, color: "#3b82f6" }, { name: "Commercial", pct: 17, color: "#8b5cf6" }].map((a) => (
                  <div key={a.name} style={{ marginBottom: 6 }}>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{a.name}</span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)" }}>{a.pct}%</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.04)" }}>
                      <motion.div initial={{ width: 0 }} animate={animated ? { width: `${a.pct}%` } : {}} transition={{ duration: 0.8, delay: 0.3, ease }} style={{ height: "100%", borderRadius: 2, backgroundColor: a.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Text right */}
          <motion.div initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease }}>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 24, height: 1, background: "linear-gradient(to right, #3b82f6, transparent)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#3b82f6" }}>Analytics</span>
            </div>
            <h2 className="font-editorial" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "white", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", margin: "0 0 1.25rem" }}>
              Data that drives<br /><span className="font-editorial-italic" style={{ background: "linear-gradient(135deg, #3b82f6, #C9A55A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>decisions.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 420, margin: "0 0 2rem" }}>
              Understand your scouting patterns. See which archetypes perform, track engagement over time, and optimize your talent pipeline with actionable insights.
            </p>
            <div className="flex flex-col gap-3">
              {["Engagement trends over time", "Archetype performance breakdown", "Application conversion rates", "Exportable reports"].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#3b82f6", opacity: 0.6, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)" }}>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
