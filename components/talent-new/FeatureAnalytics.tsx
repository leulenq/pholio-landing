// landing/components/talent-new/FeatureAnalytics.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const BARS = [28, 35, 42, 38, 55, 62, 48, 58, 72, 55, 65, 80, 68, 85, 75, 90, 82, 95];
const EVENTS = [
  { agency: "Wilhelmina", action: "viewed your profile", time: "3h ago", dot: "#C9A55A" },
  { agency: "IMG Models", action: "saved you to a board", time: "Yesterday", dot: "#D4B96E" },
  { agency: "Elite Model", action: "viewed your comp card", time: "2d ago", dot: "#BFA258" },
];

export default function FeatureAnalytics() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [animatedBars, setAnimatedBars] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setAnimatedBars(true), 400);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "#FAF8F5", padding: "8rem 0" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0.025, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: "150px 150px" }} />
      <div aria-hidden="true" style={{ position: "absolute", left: "10%", top: "30%", width: 400, height: 400, background: "radial-gradient(circle, rgba(201,165,90,0.06) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text */}
          <motion.div initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease }}>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 24, height: 1, background: "linear-gradient(to right, #C9A55A, transparent)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A55A" }}>Analytics</span>
            </div>
            <h2 className="font-editorial" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#1A1815", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", margin: "0 0 1.25rem" }}>
              Know who&apos;s<br /><span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>looking.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--color-text-secondary)", lineHeight: 1.7, maxWidth: 420, margin: "0 0 2rem" }}>
              See every agency view, profile save, and board add in real time. Track weekly engagement trends and understand which photos drive the most interest — so you can make informed decisions.
            </p>
            <div className="flex flex-col gap-3">
              {["Real-time agency activity feed", "Profile views & save tracking", "Weekly engagement trends", "Photo performance insights"].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#C9A55A", opacity: 0.5, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — dashboard visual */}
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.15, ease }} className="flex justify-center lg:justify-end">
            <div style={{ width: 400, maxWidth: "90vw", borderRadius: 16, overflow: "hidden", backgroundColor: "#1A1815", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 30px 60px -15px rgba(0,0,0,0.12), 0 10px 30px -10px rgba(0,0,0,0.06)" }}>
              {/* Header bar */}
              <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>This Week</span>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Views", "Saves", "Boards"].map((t, i) => (
                    <span key={t} style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 500, color: i === 0 ? "#C9A55A" : "rgba(255,255,255,0.2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div style={{ padding: "18px 18px 0", display: "flex", gap: 16 }}>
                {[{ val: "142", lbl: "Views", trend: "+23%", up: true }, { val: "23", lbl: "Saves", trend: "+12%", up: true }, { val: "8", lbl: "Boards", trend: "+4", up: true }].map((s) => (
                  <div key={s.lbl} style={{ flex: 1, padding: "12px 10px", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
                    <div className="font-editorial" style={{ fontSize: 24, color: "white", lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 8, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 3 }}>{s.lbl}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "rgba(52,211,153,0.7)", fontWeight: 600, marginTop: 2 }}>{s.trend}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div style={{ padding: "20px 18px 12px" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 80 }}>
                  {BARS.map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} animate={animatedBars ? { height: `${h}%` } : {}} transition={{ duration: 0.6, delay: i * 0.03, ease: [0.34, 1.56, 0.64, 1] }} style={{ flex: 1, borderRadius: 2, background: i >= BARS.length - 4 ? "linear-gradient(to top, rgba(201,165,90,0.6), rgba(201,165,90,0.15))" : "rgba(255,255,255,0.05)" }} />
                  ))}
                </div>
              </div>

              {/* Activity feed */}
              <div style={{ padding: "0 18px 16px" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Recent Activity</div>
                {EVENTS.map((ev, i) => (
                  <motion.div key={ev.agency} initial={{ opacity: 0, x: 10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.8 + i * 0.15, ease }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, marginBottom: 3, backgroundColor: i === 0 ? "rgba(201,165,90,0.04)" : "transparent", border: i === 0 ? "1px solid rgba(201,165,90,0.06)" : "1px solid transparent" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: ev.dot, boxShadow: i === 0 ? `0 0 8px ${ev.dot}40` : "none", flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.55)", flex: 1 }}>
                      <strong style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{ev.agency}</strong> {ev.action}
                    </span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>{ev.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
