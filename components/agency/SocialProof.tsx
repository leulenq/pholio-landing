"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedNumber({ end, suffix = "", duration = 2, inView }: { end: number; suffix?: string; duration?: number; inView: boolean }) {
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
  return <span>{current}{suffix}</span>;
}

const STATS = [
  { number: 140, suffix: "+", label: "Agencies using the platform", size: "large" as const },
  { number: 12, suffix: "k+", label: "Talent profiles analyzed", size: "medium" as const },
  { number: 91, suffix: "%", label: "Average match accuracy", size: "medium" as const },
  { number: 47, suffix: "×", label: "Faster than manual scouting", size: "small" as const },
  { number: 2, suffix: "min", label: "Average time to shortlist", size: "small" as const },
  { number: 500, suffix: "+", label: "Successful placements", size: "small" as const },
];

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "#0A0A0F", padding: "7rem 0 8rem" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0.02, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, background: "radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 60%)", filter: "blur(100px)", pointerEvents: "none" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease }}>
          <div className="flex items-center gap-3 justify-center mb-5">
            <div style={{ width: 24, height: 1, background: "linear-gradient(to right, transparent, rgba(59,130,246,0.4))" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#3b82f6" }}>By the numbers</span>
            <div style={{ width: 24, height: 1, background: "linear-gradient(to left, transparent, rgba(59,130,246,0.4))" }} />
          </div>
          <h2 className="font-editorial" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: "white", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.025em" }}>
            Trusted by <span className="font-editorial-italic" style={{ background: "linear-gradient(135deg, #3b82f6, #C9A55A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>the industry.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-14">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease }}
              style={{ padding: stat.size === "large" ? "2.5rem 2rem" : "2rem 1.5rem", borderRadius: 14, backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", gridColumn: stat.size === "large" ? "span 2" : undefined, position: "relative", overflow: "hidden" }}>
              {stat.size === "large" && <div aria-hidden="true" style={{ position: "absolute", top: -1, left: "20%", right: "20%", height: 1, background: "linear-gradient(to right, transparent, rgba(59,130,246,0.2), transparent)" }} />}
              <div className="font-editorial" style={{ fontSize: stat.size === "large" ? "clamp(3.5rem, 8vw, 6rem)" : stat.size === "medium" ? "clamp(2.5rem, 5vw, 4rem)" : "clamp(2rem, 4vw, 3rem)", background: "linear-gradient(135deg, #3b82f6, #C9A55A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                <AnimatedNumber end={stat.number} suffix={stat.suffix} inView={inView} duration={stat.size === "large" ? 2.5 : 1.8} />
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5, margin: 0, maxWidth: 200 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6, ease }} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "3rem" }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-editorial" style={{ fontSize: "5rem", color: "rgba(59,130,246,0.1)", lineHeight: 0.6, marginBottom: "0.5rem" }}>&ldquo;</div>
            <blockquote className="font-editorial-italic" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, letterSpacing: "-0.01em", margin: "0 0 1.5rem" }}>
              Pholio cut our scouting time by 80%. The AI matching is uncanny — it surfaces talent we&apos;d never have found manually.
            </blockquote>
            <div className="flex items-center gap-3 justify-center">
              <div style={{ width: 24, height: 1, backgroundColor: "rgba(59,130,246,0.2)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)" }}>Sarah O.</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>Head of Scouting · Elite NYC</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
