// landing/components/talent-new/FeatureDiscovery.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const RESULTS = [
  { name: "You", match: 97, highlight: true },
  { name: "", match: 89, highlight: false },
  { name: "", match: 84, highlight: false },
  { name: "", match: 78, highlight: false },
  { name: "", match: 72, highlight: false },
  { name: "", match: 65, highlight: false },
];

export default function FeatureDiscovery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "#FAF8F5", padding: "8rem 0" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0.025, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: "150px 150px" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "25%", right: "8%", width: 400, height: 400, background: "radial-gradient(circle, rgba(201,165,90,0.06) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — discovery visual */}
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1, ease }}>
            <div style={{ maxWidth: 380, borderRadius: 16, overflow: "hidden", backgroundColor: "#1A1815", border: "1px solid rgba(26,24,21,0.15)", boxShadow: "0 30px 60px -15px rgba(0,0,0,0.15)" }}>
              {/* Search bar */}
              <div style={{ padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
                    <circle cx="6.5" cy="6.5" r="4.5" stroke="white" strokeWidth="1.5" />
                    <path d="M10 10l4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Search talent...</span>
                </div>
                {/* Filter chips */}
                <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                  {["Editorial", "5′9″ – 6′0″", "NYC", "Brown hair"].map((c) => (
                    <div key={c} style={{ padding: "4px 12px", borderRadius: 100, backgroundColor: "rgba(201,165,90,0.08)", border: "1px solid rgba(201,165,90,0.15)", fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 500, color: "#C9A55A" }}>{c}</div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div style={{ padding: "8px 10px 12px" }}>
                {RESULTS.map((r, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease }}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 10px", borderRadius: 10, marginBottom: 3, backgroundColor: r.highlight ? "rgba(201,165,90,0.06)" : "transparent", border: r.highlight ? "1px solid rgba(201,165,90,0.15)" : "1px solid transparent", position: "relative" }}>
                    {/* Avatar */}
                    <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: `rgba(255,255,255,${0.03 + i * 0.005})`, border: r.highlight ? "1.5px solid rgba(201,165,90,0.3)" : "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }} />
                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ height: r.highlight ? 6 : 5, width: r.highlight ? "50%" : `${40 - i * 3}%`, backgroundColor: r.highlight ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)", borderRadius: 3, marginBottom: 4 }} />
                      <div style={{ height: 4, width: `${30 - i * 2}%`, backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 2 }} />
                    </div>
                    {/* Match score */}
                    <div style={{ padding: "3px 8px", borderRadius: 6, backgroundColor: r.highlight ? "rgba(201,165,90,0.15)" : "rgba(255,255,255,0.03)", border: `1px solid ${r.highlight ? "rgba(201,165,90,0.25)" : "rgba(255,255,255,0.04)"}` }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: r.highlight ? "#C9A55A" : "rgba(255,255,255,0.3)" }}>{r.match}%</span>
                    </div>
                    {/* You badge */}
                    {r.highlight && (
                      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3, delay: 0.9, type: "spring", stiffness: 300 }}
                        style={{ position: "absolute", top: -8, right: 10, padding: "2px 10px", borderRadius: 100, backgroundColor: "#C9A55A", boxShadow: "0 2px 8px rgba(201,165,90,0.3)" }}>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#050505" }}>You</span>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease }}>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 24, height: 1, background: "linear-gradient(to right, var(--color-gold), transparent)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-gold)" }}>Discovery</span>
            </div>
            <h2 className="font-editorial" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#1A1815", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", margin: "0 0 1.25rem" }}>
              Be found by<br /><span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>the right people.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--color-text-secondary)", lineHeight: 1.7, maxWidth: 420, margin: "0 0 2rem" }}>
              Your profile is surfaced in agency searches matching your look, measurements, and market. When agencies search for your archetype, you show up — with a match score that tells them exactly why you fit.
            </p>
            <div className="flex flex-col gap-3">
              {["Searchable by 140+ agencies", "AI match scoring", "Archetype & market filters", "Zero cold emails needed"].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "var(--color-gold)", opacity: 0.5, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
