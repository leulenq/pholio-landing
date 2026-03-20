"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const ease = [0.22, 1, 0.36, 1] as const;

export default function AgencyHero() {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={ref} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", backgroundColor: "#0A0A0F" }}>
      {/* Grid pattern */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0.03, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Accent orb — blue-gold gradient */}
      <div aria-hidden="true" style={{ position: "absolute", top: "20%", right: "15%", width: 500, height: 500, background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(201,165,90,0.04) 40%, transparent 70%)", filter: "blur(100px)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: "15%", left: "10%", width: 350, height: 350, background: "radial-gradient(circle, rgba(201,165,90,0.05) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

      {/* Floating dots grid */}
      {!prefersReducedMotion && Array.from({ length: 15 }).map((_, i) => (
        <motion.div key={i} aria-hidden="true" className="absolute pointer-events-none" style={{ width: 2, height: 2, borderRadius: "50%", backgroundColor: i % 3 === 0 ? "#3b82f6" : "#C9A55A", left: `${8 + (i * 5.7) % 84}%`, top: `${12 + (i * 7.3) % 76}%` }}
          animate={{ opacity: [0, 0.3, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 4 + (i % 3) * 2, repeat: Infinity, delay: (i * 0.7) % 4, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[900px] w-full text-center">
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={mounted ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1, ease }} className="flex items-center gap-3 justify-center mb-10">
            <div style={{ width: 24, height: 1, background: "linear-gradient(to right, transparent, rgba(59,130,246,0.4))" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#3b82f6" }}>For Agencies</span>
            <div style={{ width: 24, height: 1, background: "linear-gradient(to left, transparent, rgba(59,130,246,0.4))" }} />
          </motion.div>

          {/* Headline */}
          <h1 className="font-editorial" style={{ fontSize: "clamp(3rem, 7.5vw, 7rem)", color: "white", fontWeight: 400, lineHeight: 0.98, letterSpacing: "-0.035em", margin: 0 }}>
            <motion.span initial={{ opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" }} animate={mounted ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}} transition={{ duration: 0.9, delay: 0.2, ease }} style={{ display: "block" }}>
              Scout <span className="font-editorial-italic" style={{ background: "linear-gradient(135deg, #3b82f6, #C9A55A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>smarter.</span>
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" }} animate={mounted ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}} transition={{ duration: 0.9, delay: 0.35, ease }} style={{ display: "block", marginTop: "0.05em" }}>
              Book <span style={{ color: "rgba(255,255,255,0.25)" }}>faster.</span>
            </motion.span>
          </h1>

          {/* Sub */}
          <motion.p initial={{ opacity: 0 }} animate={mounted ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.55, ease }} style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 520, margin: "2rem auto 2.5rem" }}>
            Discover AI-matched talent, manage your pipeline, and build your roster — all from one intelligent platform built for how agencies actually work.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={mounted ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7, ease }} className="flex items-center gap-4 justify-center flex-wrap">
            <a href={`${APP_URL}/agency/register`} className="group inline-flex items-center gap-2"
              style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", color: "white", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "16px 36px", borderRadius: 100, textDecoration: "none", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              Request Access
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#dashboard" style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", padding: "16px 24px", textDecoration: "none", transition: "color 0.3s ease, border-color 0.3s ease", borderRadius: 100, border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#3b82f6"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
              See the platform
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom stats strip */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={mounted ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.0, duration: 0.8, ease }} className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-10">
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", display: "flex", justifyContent: "center", gap: "clamp(2rem, 6vw, 5rem)" }}>
          {[
            { value: "140+", label: "Agencies" },
            { value: "47×", label: "Faster discovery" },
            { value: "91%", label: "Avg match score" },
            { value: "<2min", label: "To shortlist" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-editorial" style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", color: "rgba(255,255,255,0.85)", fontWeight: 400, lineHeight: 1, marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.5625rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={mounted ? { opacity: 1 } : {}} transition={{ delay: 1.4, duration: 0.6 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <motion.div style={{ width: 1, height: 36, transformOrigin: "top", background: "linear-gradient(to bottom, transparent, rgba(59,130,246,0.3), transparent)" }}
          animate={prefersReducedMotion ? {} : { scaleY: [0, 1, 0], y: [0, 12, 24], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
