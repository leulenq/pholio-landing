"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const ease = [0.22, 1, 0.36, 1] as const;

export default function AgencyCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 24px", backgroundColor: "#07070C" }}>
      {/* Grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0.03, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      {/* Orb */}
      <div aria-hidden="true" style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, rgba(201,165,90,0.04) 40%, transparent 65%)", filter: "blur(100px)", pointerEvents: "none" }} />

      <div className="relative z-10 max-w-[680px] text-center">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, ease }} className="flex items-center gap-3 justify-center mb-8">
          <div style={{ width: 24, height: 1, background: "linear-gradient(to right, transparent, rgba(59,130,246,0.4))" }} />
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.5625rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#3b82f6" }}>Get started</span>
          <div style={{ width: 24, height: 1, background: "linear-gradient(to left, transparent, rgba(59,130,246,0.4))" }} />
        </motion.div>

        <h2 className="font-editorial" style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)", color: "white", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.03em", margin: 0 }}>
          <motion.span initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24, clipPath: "inset(0 0 100% 0)" }} animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}} transition={{ duration: 0.8, delay: 0.1, ease }} style={{ display: "block" }}>
            Ready to scout
          </motion.span>
          <motion.span initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24, clipPath: "inset(0 0 100% 0)" }} animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}} transition={{ duration: 0.8, delay: 0.2, ease }} className="font-editorial-italic" style={{ display: "block", marginTop: "0.1em", background: "linear-gradient(135deg, #3b82f6, #C9A55A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            smarter?
          </motion.span>
        </h2>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4, ease }} style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.6, margin: "2rem 0 2.5rem" }}>
          Request early access to Pholio&apos;s agency platform.<br />Limited onboarding spots available.
        </motion.p>

        <motion.a initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5, ease }} href={`${APP_URL}/agency/register`}
          className="group inline-flex items-center gap-2"
          style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", color: "white", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "17px 44px", borderRadius: 100, textDecoration: "none", transition: "transform 0.4s ease, box-shadow 0.4s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(59,130,246,0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
          Request Access
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.a>
      </div>
    </section>
  );
}
