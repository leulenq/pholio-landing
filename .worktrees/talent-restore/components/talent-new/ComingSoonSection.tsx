// landing/components/talent-new/ComingSoonSection.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MessageSquare, Video, Bell, Globe2, ScanSearch } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const UPCOMING = [
  { icon: MessageSquare, title: "Direct Messaging", description: "Chat directly with agency scouts and casting directors.", quarter: "Q3 2026" },
  { icon: Video, title: "Video Portfolios", description: "Upload walk videos, editorial reels, and behind-the-scenes content.", quarter: "Q3 2026" },
  { icon: Bell, title: "Casting Alerts", description: "Get notified when a casting matches your look.", quarter: "Q4 2026" },
  { icon: Globe2, title: "International Markets", description: "Paris, Milan, Tokyo, São Paulo — connect globally.", quarter: "2027" },
  { icon: ScanSearch, title: "Portfolio AI Audit", description: "AI feedback on lighting, composition, and agency perception.", quarter: "2027" },
];

export default function ComingSoonSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "#FAF8F5", padding: "7rem 0 8rem" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0.025, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: "150px 150px" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12">
        <motion.div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6" initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease }}>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 24, height: 1, background: "linear-gradient(to right, var(--color-gold), transparent)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-gold)" }}>Roadmap</span>
            </div>
            <h2 className="font-editorial" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: "#1A1815", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.025em", margin: 0 }}>
              What&apos;s <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>next.</span>
            </h2>
          </div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.7, maxWidth: 300, margin: 0 }}>
            We&apos;re building the most complete talent platform in the industry. Here&apos;s what&apos;s on deck.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ duration: 1.2, delay: 0.3, ease }} className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px hidden md:block" style={{ background: "linear-gradient(to bottom, transparent, rgba(201,165,90,0.15) 10%, rgba(201,165,90,0.15) 90%, transparent)", transformOrigin: "top" }} />

          {UPCOMING.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease }}
                className="flex items-start gap-5 md:gap-8" style={{ padding: "2rem 0", borderBottom: i < UPCOMING.length - 1 ? "1px solid rgba(26,24,21,0.06)" : "none" }}>
                <div className="relative flex-shrink-0 z-10" style={{ width: 40, paddingTop: 2 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "var(--color-gold)", opacity: 0.5, margin: "0 auto", position: "relative" }}>
                    {!prefersReducedMotion && (
                      <motion.div animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }} style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid var(--color-gold)" }} />
                    )}
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-10 items-start">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <Icon size={15} color="var(--color-gold)" strokeWidth={1.5} />
                      <h3 className="font-editorial" style={{ fontSize: "1.3rem", color: "#1A1815", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.015em", margin: 0 }}>{item.title}</h3>
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6, margin: 0, maxWidth: 420 }}>{item.description}</p>
                  </div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-gold)", opacity: 0.65, backgroundColor: "rgba(201,165,90,0.06)", border: "1px solid rgba(201,165,90,0.1)", padding: "4px 12px", borderRadius: 100, whiteSpace: "nowrap" }}>{item.quarter}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
