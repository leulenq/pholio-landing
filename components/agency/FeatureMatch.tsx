"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const MATCHES = [
  { name: "Amara J.", type: "Editorial", match: 97, traits: ["5'10\"", "Brown", "NYC"] },
  { name: "Sofia C.", type: "Runway", match: 94, traits: ["5'11\"", "Black", "LA"] },
  { name: "Zara W.", type: "Commercial", match: 88, traits: ["5'8\"", "Blonde", "MIA"] },
  { name: "Elena M.", type: "Editorial", match: 91, traits: ["5'9\"", "Auburn", "NYC"] },
];

export default function FeatureMatch() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "#0A0A0F", padding: "8rem 0" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0.02, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "30%", right: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease }}>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 24, height: 1, background: "linear-gradient(to right, #3b82f6, transparent)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#3b82f6" }}>AI Matching</span>
            </div>
            <h2 className="font-editorial" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "white", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", margin: "0 0 1.25rem" }}>
              The right face.<br /><span className="font-editorial-italic" style={{ background: "linear-gradient(135deg, #3b82f6, #C9A55A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Every time.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 420, margin: "0 0 2rem" }}>
              Our AI analyzes measurements, archetypes, market fit, and visual characteristics to surface talent that matches what you&apos;re looking for — ranked by relevance.
            </p>
            <div className="flex flex-col gap-3">
              {["Multi-signal match scoring", "Archetype & market classification", "Visual similarity search", "Real-time ranking updates"].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#3b82f6", opacity: 0.6, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)" }}>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual — match cards */}
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.15, ease }} className="flex justify-center lg:justify-end">
            <div style={{ width: 360, maxWidth: "90vw" }}>
              {MATCHES.map((m, i) => (
                <motion.div key={m.name} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 12, marginBottom: 6, backgroundColor: i === 0 ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${i === 0 ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.04)"}`, position: "relative" }}>
                  {/* Rank */}
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.15)", width: 16, textAlign: "center", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</div>
                  {/* Avatar */}
                  <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }} />
                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.65)", fontWeight: 500, marginBottom: 2 }}>{m.name}</div>
                    <div className="flex gap-1.5">
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, padding: "1px 6px", borderRadius: 4, backgroundColor: "rgba(201,165,90,0.08)", border: "1px solid rgba(201,165,90,0.12)", color: "#C9A55A" }}>{m.type}</span>
                      {m.traits.map((t) => (
                        <span key={t} style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  {/* Score */}
                  <div style={{ padding: "4px 10px", borderRadius: 8, background: m.match >= 95 ? "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(201,165,90,0.1))" : "rgba(255,255,255,0.03)", border: `1px solid ${m.match >= 95 ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.05)"}` }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, color: m.match >= 95 ? "#3b82f6" : "rgba(255,255,255,0.4)" }}>{m.match}%</span>
                  </div>
                </motion.div>
              ))}
              {/* AI note */}
              <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 0.5 }}
                style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 8, backgroundColor: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.08)" }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5L8 1z" fill="#3b82f6" opacity="0.7" /></svg>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "rgba(59,130,246,0.6)" }}>Ranked by AI match confidence</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
