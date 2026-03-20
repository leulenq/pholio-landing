"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const FILTERS = ["Editorial", "5′9″–6′0″", "NYC", "Brown hair", "Available"];

export default function FeatureDiscovery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "#0D0D14", padding: "8rem 0" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0.02, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "20%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(201,165,90,0.05) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual — discovery UI */}
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1, ease }}>
            <div style={{ maxWidth: 380, borderRadius: 16, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 30px 60px -15px rgba(0,0,0,0.4)" }}>
              {/* Search */}
              <div style={{ padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.3 }}><circle cx="6.5" cy="6.5" r="4.5" stroke="white" strokeWidth="1.5" /><path d="M10 10l4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Search talent network...</span>
                </div>
                <div style={{ display: "flex", gap: 5, marginTop: 10, flexWrap: "wrap" }}>
                  {FILTERS.map((c) => (
                    <div key={c} style={{ padding: "4px 10px", borderRadius: 100, backgroundColor: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)", fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 500, color: "#3b82f6" }}>{c}</div>
                  ))}
                </div>
              </div>

              {/* Results grid */}
              <div style={{ padding: "14px 18px" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>128 results</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease }}
                      style={{ height: 100, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}>
                      <div style={{ height: "100%", background: `linear-gradient(135deg, rgba(59,130,246,${0.02 + i * 0.006}), rgba(201,165,90,${0.01 + i * 0.003}))` }} />
                      {/* Match badge */}
                      <div style={{ position: "absolute", top: 4, right: 4, padding: "1px 5px", borderRadius: 4, backgroundColor: i < 2 ? "rgba(59,130,246,0.2)" : "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }}>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: 8, fontWeight: 700, color: i < 2 ? "#93bbfc" : "rgba(255,255,255,0.4)" }}>{97 - i * 5}%</span>
                      </div>
                      {/* Name bar */}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "6px 6px 5px", background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }}>
                        <div style={{ height: 4, width: "60%", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 2 }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease }}>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 24, height: 1, background: "linear-gradient(to right, #3b82f6, transparent)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#3b82f6" }}>Discovery</span>
            </div>
            <h2 className="font-editorial" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "white", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", margin: "0 0 1.25rem" }}>
              Search by the look.<br /><span className="font-editorial-italic" style={{ background: "linear-gradient(135deg, #3b82f6, #C9A55A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Not just the name.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 420, margin: "0 0 2rem" }}>
              Filter by archetype, measurements, market, hair color, availability, and more. Our network grows daily — and your search gets smarter with every query.
            </p>
            <div className="flex flex-col gap-3">
              {["Advanced multi-filter search", "Archetype & measurement filters", "Real-time availability status", "Growing network of verified talent"].map((f) => (
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
