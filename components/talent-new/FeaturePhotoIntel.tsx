// landing/components/talent-new/FeaturePhotoIntel.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const PHOTOS = [
  { id: 0, score: 97, tag: "Hero Shot", selected: true },
  { id: 1, score: 93, tag: "Editorial", selected: true },
  { id: 2, score: 88, tag: "Portrait", selected: true },
  { id: 3, score: 82, tag: "Lifestyle", selected: false },
  { id: 4, score: 76, tag: "Casual", selected: false },
  { id: 5, score: 71, tag: "Candid", selected: false },
  { id: 6, score: 64, tag: "Outdoors", selected: false },
  { id: 7, score: 55, tag: "Group", selected: false },
  { id: 8, score: 48, tag: "Low Light", selected: false },
];

export default function FeaturePhotoIntel() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [scanning, setScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!inView || prefersReducedMotion) { setShowResults(true); return; }
    const t1 = setTimeout(() => setScanning(true), 600);
    const t2 = setTimeout(() => { setScanning(false); setShowResults(true); }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [inView, prefersReducedMotion]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "#FAF8F5", padding: "8rem 0" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0.025, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: "150px 150px" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "20%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(201,165,90,0.06) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — photo grid visual */}
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1, ease }} className="order-2 lg:order-1">
            <div style={{ maxWidth: 420 }}>
              {/* Photo grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {PHOTOS.map((photo, i) => (
                  <motion.div key={photo.id} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease }} style={{ height: 120, borderRadius: 10, position: "relative", overflow: "hidden", backgroundColor: "#1A1815", border: photo.selected && showResults ? "1.5px solid rgba(201,165,90,0.5)" : "1px solid rgba(26,24,21,0.08)", boxShadow: photo.selected && showResults ? "0 4px 20px rgba(201,165,90,0.1)" : "0 1px 4px rgba(0,0,0,0.04)", transition: "border 0.5s ease, box-shadow 0.5s ease" }}>
                    {/* Photo placeholder gradient */}
                    <div style={{ height: "100%", background: `linear-gradient(135deg, rgba(201,165,90,${0.02 + (photo.score / 100) * 0.06}), rgba(26,24,21,${0.04 + i * 0.01}))` }} />

                    {/* AI scan line */}
                    <AnimatePresence>
                      {scanning && (
                        <motion.div initial={{ top: "0%", opacity: 0 }} animate={{ top: "100%", opacity: [0, 1, 1, 0] }} exit={{ opacity: 0 }} transition={{ duration: 1.8, delay: i * 0.15, ease: "linear" }} style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #C9A55A, transparent)", boxShadow: "0 0 12px 3px rgba(201,165,90,0.3)", pointerEvents: "none" }} />
                      )}
                    </AnimatePresence>

                    {/* Score badge */}
                    <AnimatePresence>
                      {showResults && (
                        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: i * 0.05 }} style={{ position: "absolute", top: 6, right: 6, padding: "2px 7px", borderRadius: 5, backgroundColor: photo.selected ? "rgba(201,165,90,0.85)" : "rgba(255,255,255,0.8)", backdropFilter: "blur(4px)" }}>
                          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: photo.selected ? "#050505" : "rgba(26,24,21,0.5)" }}>{photo.score}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Selected check */}
                    {showResults && photo.selected && (
                      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 + i * 0.08 }} style={{ position: "absolute", bottom: 6, left: 6, width: 18, height: 18, borderRadius: 5, backgroundColor: "rgba(201,165,90,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#050505" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </motion.div>
                    )}

                    {/* Tag */}
                    <div style={{ position: "absolute", bottom: 6, right: 6 }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: 8, color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>{photo.tag}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AI summary bar */}
              <AnimatePresence>
                {showResults && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 16px", borderRadius: 10, backgroundColor: "rgba(201,165,90,0.06)", border: "1px solid rgba(201,165,90,0.12)" }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5L8 1z" fill="#C9A55A" opacity="0.8" /></svg>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "var(--color-gold-dark, #8B7740)" }}>3 photos selected</span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(26,24,21,0.4)" }}>· 6 need improvement</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease }} className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 24, height: 1, background: "linear-gradient(to right, var(--color-gold), transparent)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-gold)" }}>Photo Intelligence</span>
            </div>
            <h2 className="font-editorial" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#1A1815", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", margin: "0 0 1.25rem" }}>
              Let AI curate<br />
              <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>your best.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--color-text-secondary)", lineHeight: 1.7, maxWidth: 420, margin: "0 0 2rem" }}>
              Upload your gallery and our AI scores every image for composition, lighting, and expression. It knows what agencies look for — and surfaces the shots that perform. No guesswork.
            </p>
            <div className="flex flex-col gap-3">
              {["AI scores every uploaded photo", "Selects your strongest images", "Identifies areas for improvement", "Agencies only see your best work"].map((f) => (
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
