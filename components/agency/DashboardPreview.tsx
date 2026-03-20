"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const KPI = [
  { label: "Applications", value: "47", change: "+12", spark: true },
  { label: "Match Score", value: "91%", change: null, ring: true },
  { label: "Shortlisted", value: "12", change: null },
  { label: "Interviews", value: "8", change: null },
];

const APPLICANTS = [
  { name: "Amara Johnson", type: "Editorial", city: "New York", match: 97, time: "2h ago" },
  { name: "Sofia Chen", type: "Runway", city: "Los Angeles", match: 94, time: "4h ago" },
  { name: "Zara Williams", type: "Commercial", city: "Miami", match: 88, time: "Yesterday" },
  { name: "Elena Marcus", type: "Editorial", city: "New York", match: 91, time: "Yesterday" },
];

export default function DashboardPreview() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0px", "0px"] : ["40px", "-40px"]);

  return (
    <section ref={ref} id="dashboard" className="relative overflow-hidden" style={{ backgroundColor: "#0D0D14", padding: "6rem 0 8rem" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0.02, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease }}>
          <div className="flex items-center gap-3 justify-center mb-5">
            <div style={{ width: 24, height: 1, background: "linear-gradient(to right, transparent, rgba(59,130,246,0.4))" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#3b82f6" }}>Your Dashboard</span>
            <div style={{ width: 24, height: 1, background: "linear-gradient(to left, transparent, rgba(59,130,246,0.4))" }} />
          </div>
          <h2 className="font-editorial" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "white", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.025em" }}>
            Everything in <span className="font-editorial-italic" style={{ background: "linear-gradient(135deg, #3b82f6, #C9A55A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>one view.</span>
          </h2>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div style={{ y }} className="relative">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.15, ease }}
            style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)", backdropFilter: "blur(12px)", boxShadow: "0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)" }}>
            {/* Browser chrome */}
            <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.015)" }}>
              <div className="flex gap-1.5">{["#ff5f57", "#febc2e", "#28c840"].map((c) => (<div key={c} style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: c, opacity: 0.6 }} />))}</div>
              <div style={{ flex: 1, height: 22, borderRadius: 6, backgroundColor: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>agency.pholio.studio/dashboard</span>
              </div>
            </div>

            {/* Dashboard body */}
            <div style={{ display: "flex", minHeight: 460 }}>
              {/* Sidebar */}
              <div className="hidden md:block" style={{ width: 180, borderRight: "1px solid rgba(255,255,255,0.04)", padding: "20px 14px", flexShrink: 0 }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "rgba(201,165,90,0.5)", marginBottom: 20 }}>PHOLIO</div>
                {["Overview", "Discover", "Applicants", "Castings", "Boards"].map((item, i) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, marginBottom: 2, backgroundColor: i === 0 ? "rgba(59,130,246,0.08)" : "transparent", cursor: "default" }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: i === 0 ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.06)" }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? "#3b82f6" : "rgba(255,255,255,0.3)" }}>{item}</span>
                    {item === "Applicants" && <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 700, color: "#22c55e", backgroundColor: "rgba(34,197,94,0.1)", padding: "1px 6px", borderRadius: 10 }}>47</span>}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div style={{ flex: 1, padding: "20px 24px", overflow: "hidden" }}>
                {/* Welcome */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 4 }}>Spring &apos;26</div>
                  <div className="font-editorial" style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}>Good evening, Sarah.</div>
                </div>

                {/* KPIs */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
                  {KPI.map((kpi) => (
                    <div key={kpi.label} style={{ padding: "14px 12px", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>{kpi.label}</div>
                      <div className="flex items-end gap-2">
                        <span className="font-editorial" style={{ fontSize: 22, color: "white", lineHeight: 1 }}>{kpi.value}</span>
                        {kpi.change && <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "#22c55e", fontWeight: 600 }}>{kpi.change}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Applicants list */}
                <div style={{ borderRadius: 10, border: "1px solid rgba(255,255,255,0.04)", overflow: "hidden" }}>
                  <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>New Applications</span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "rgba(59,130,246,0.6)" }}>View all</span>
                  </div>
                  {APPLICANTS.map((a, i) => (
                    <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: i < APPLICANTS.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                      <div style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: "rgba(255,255,255,0.04)", flexShrink: 0, border: "1px solid rgba(255,255,255,0.05)" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{a.name}</div>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>{a.type} · {a.city} · {a.time}</div>
                      </div>
                      <div style={{ padding: "2px 8px", borderRadius: 5, backgroundColor: a.match >= 90 ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${a.match >= 90 ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.04)"}` }}>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: a.match >= 90 ? "#3b82f6" : "rgba(255,255,255,0.3)" }}>{a.match}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
