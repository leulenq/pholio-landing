// landing/components/talent-new/SocialProofSection.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedNumber({ end, suffix = "", prefix = "", duration = 2, inView }: { end: number; suffix?: string; prefix?: string; duration?: number; inView: boolean }) {
  const [current, setCurrent] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) { setCurrent(end); return; }
    let frame: number;
    const start = performance.now();
    function animate(now: number) {
      const elapsed = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setCurrent(Math.round(eased * end));
      if (elapsed < 1) frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration, prefersReducedMotion]);
  return <span>{prefix}{current}{suffix}</span>;
}

const STATS = [
  { number: 140, suffix: "+", prefix: "", label: "Agencies actively scouting", size: "large" as const },
  { number: 78, suffix: "%", prefix: "", label: "Of viewed profiles get saved to boards", size: "medium" as const },
  { number: 3, suffix: "×", prefix: "", label: "More callbacks with a comp card", size: "medium" as const },
  { number: 4, suffix: ".2s", prefix: "", label: "Avg agency time on a profile", size: "small" as const },
  { number: 23, suffix: "", prefix: "", label: "Scouts searching this week", size: "small" as const },
  { number: 1, suffix: "hr", prefix: "<", label: "To build your full profile", size: "small" as const },
];

export default function SocialProofSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "#FAF8F5", padding: "7rem 0 8rem" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0.025, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: "150px 150px" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(201,165,90,0.06) 0%, transparent 60%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease }}>
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: 24, height: 1, background: "linear-gradient(to right, #C9A55A, transparent)" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A55A" }}>The numbers</span>
          </div>
          <h2 className="font-editorial" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: "#1A1815", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.025em", margin: 0 }}>
            Agencies are searching.<br />
            <span style={{ color: "rgba(26,24,21,0.3)" }}>The question is whether they find <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>you.</span></span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-14">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease }}
              style={{ padding: stat.size === "large" ? "2.5rem 2rem" : "2rem 1.5rem", borderRadius: 14, backgroundColor: "white", border: "1px solid rgba(26,24,21,0.04)", boxShadow: "0 2px 12px rgba(0,0,0,0.02)", gridColumn: stat.size === "large" ? "span 2" : undefined, position: "relative", overflow: "hidden" }}>
              {stat.size === "large" && <div aria-hidden="true" style={{ position: "absolute", top: -1, left: "20%", right: "20%", height: 1, background: "linear-gradient(to right, transparent, rgba(201,165,90,0.2), transparent)" }} />}
              <div className="font-editorial" style={{ fontSize: stat.size === "large" ? "clamp(3.5rem, 8vw, 6rem)" : stat.size === "medium" ? "clamp(2.5rem, 5vw, 4rem)" : "clamp(2rem, 4vw, 3rem)", color: "#C9A55A", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                <AnimatedNumber end={stat.number} suffix={stat.suffix} prefix={stat.prefix} inView={inView} duration={stat.size === "large" ? 2.5 : 1.8} />
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "rgba(26,24,21,0.4)", lineHeight: 1.5, margin: 0, maxWidth: 200 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6, ease }} style={{ borderTop: "1px solid rgba(26,24,21,0.06)", paddingTop: "3rem" }}>
          <div className="max-w-3xl mx-auto">
            <div className="font-editorial" style={{ fontSize: "5rem", color: "rgba(201,165,90,0.15)", lineHeight: 0.6, marginBottom: "0.5rem" }}>&ldquo;</div>
            <blockquote className="font-editorial-italic" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)", color: "rgba(26,24,21,0.6)", lineHeight: 1.5, letterSpacing: "-0.01em", margin: "0 0 1.5rem" }}>
              I uploaded my photos on a Sunday night and had three agency callbacks by Wednesday. Pholio did in days what my old portfolio couldn&apos;t do in months.
            </blockquote>
            <div className="flex items-center gap-3">
              <div style={{ width: 24, height: 1, backgroundColor: "rgba(201,165,90,0.3)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "0.8125rem", color: "rgba(26,24,21,0.5)" }}>Sarah Mitchell</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "rgba(26,24,21,0.25)" }}>Editorial · New York</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
