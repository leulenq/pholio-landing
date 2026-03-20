// landing/components/talent-new/FeatureCompCard.tsx
"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useInView, useReducedMotion, useSpring, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FeatureCompCard() {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  // Mouse tilt
  const cfg = { damping: 25, stiffness: 180 };
  const mx = useSpring(0, cfg);
  const my = useSpring(0, cfg);
  const rotX = useTransform(my, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [6, -6]);
  const rotY = useTransform(mx, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-6, 6]);
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my, prefersReducedMotion]);

  const onLeave = useCallback(() => {
    setHovered(false);
    mx.set(0); my.set(0);
  }, [mx, my]);

  return (
    <section ref={ref} id="features" className="relative overflow-hidden" style={{ backgroundColor: "#FAF8F5", padding: "8rem 0" }}>
      {/* Noise */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ opacity: 0.025, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: "150px 150px" }} />
      {/* Glow */}
      <div aria-hidden="true" style={{ position: "absolute", right: "10%", top: "20%", width: 500, height: 500, background: "radial-gradient(circle, rgba(201,165,90,0.06) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text */}
          <motion.div initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease }}>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 24, height: 1, background: "linear-gradient(to right, #C9A55A, transparent)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A55A" }}>Comp Card</span>
            </div>
            <h2 className="font-editorial" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#1A1815", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", margin: "0 0 1.25rem" }}>
              One card.<br />
              <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>Every room.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--color-text-secondary)", lineHeight: 1.7, maxWidth: 420, margin: "0 0 2rem" }}>
              Pholio generates a professional comp card from your profile — your best photos, measurements, and contact — formatted the way casting directors expect. Ready to download, print, or share via QR code.
            </p>
            {/* Feature bullets */}
            <div className="flex flex-col gap-3">
              {["Auto-generated from your profile", "Print-ready PDF download", "QR code for instant sharing", "Multiple layout styles"].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#C9A55A", opacity: 0.5, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — comp card visual with 3D tilt */}
          <motion.div initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.15, ease }} className="flex justify-center lg:justify-end">
            <div ref={cardRef} style={{ perspective: 1000, transformStyle: "preserve-3d" }} onMouseMove={onMove} onMouseEnter={() => setHovered(true)} onMouseLeave={onLeave}>
              <motion.div style={{ rotateX: rotX, rotateY: rotY, transformOrigin: "center center" }}>
                <div style={{ width: 340, maxWidth: "85vw", borderRadius: 12, overflow: "hidden", backgroundColor: "#0E0E0C", border: "1px solid rgba(0,0,0,0.08)", boxShadow: hovered ? "0 50px 120px -20px rgba(201,165,90,0.15), 0 20px 50px -15px rgba(0,0,0,0.2)" : "0 30px 80px -15px rgba(0,0,0,0.15), 0 10px 30px -10px rgba(0,0,0,0.08)", transition: "box-shadow 0.5s ease", position: "relative" }}>
                  {/* Sheen overlay on hover */}
                  <motion.div className="pointer-events-none absolute inset-0 z-30" style={{ background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)", opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease" }} />

                  {/* Main photo area */}
                  <div style={{ height: 280, background: "linear-gradient(135deg, rgba(201,165,90,0.08), rgba(255,255,255,0.02))", position: "relative" }}>
                    {/* Silhouette placeholder */}
                    <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 140, height: 240, borderRadius: "70px 70px 0 0", background: "linear-gradient(180deg, rgba(201,165,90,0.06), rgba(201,165,90,0.02))", border: "1px solid rgba(201,165,90,0.06)", borderBottom: "none" }} />
                    {/* Photo thumbnails */}
                    <div style={{ position: "absolute", bottom: 12, right: 12, display: "flex", gap: 4 }}>
                      {[0.06, 0.04, 0.03, 0.02].map((o, i) => (
                        <div key={i} style={{ width: 32, height: 40, borderRadius: 4, backgroundColor: `rgba(255,255,255,${o})`, border: i === 0 ? "1px solid rgba(201,165,90,0.2)" : "1px solid rgba(255,255,255,0.04)" }} />
                      ))}
                    </div>
                    {/* Pholio badge */}
                    <div style={{ position: "absolute", top: 14, left: 14, display: "flex", alignItems: "center", gap: 5 }}>
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5L8 1z" fill="#C9A55A" opacity="0.6" /></svg>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: 8, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(201,165,90,0.5)" }}>Pholio</span>
                    </div>
                  </div>

                  {/* Info section */}
                  <div style={{ padding: "18px 20px" }}>
                    {/* Name */}
                    <div style={{ height: 8, width: "55%", backgroundColor: "rgba(255,255,255,0.16)", borderRadius: 4, marginBottom: 6 }} />
                    <div style={{ height: 5, width: "35%", backgroundColor: "rgba(201,165,90,0.2)", borderRadius: 3, marginBottom: 18 }} />
                    {/* Measurements grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                      {[{ label: "Height", val: "5'10\"" }, { label: "Bust", val: "34\"" }, { label: "Waist", val: "24\"" }, { label: "Hips", val: "35\"" }, { label: "Shoe", val: "8.5" }, { label: "Hair", val: "Brown" }].map((m) => (
                        <div key={m.label}>
                          <div style={{ fontFamily: "var(--font-sans)", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(201,165,90,0.4)", marginBottom: 3 }}>{m.label}</div>
                          <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{m.val}</div>
                        </div>
                      ))}
                    </div>
                    {/* Bottom row */}
                    <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        {["PDF", "Share"].map((a) => (
                          <div key={a} style={{ padding: "4px 10px", borderRadius: 6, backgroundColor: "rgba(201,165,90,0.06)", border: "1px solid rgba(201,165,90,0.1)", fontSize: 9, fontFamily: "var(--font-sans)", fontWeight: 600, color: "rgba(201,165,90,0.5)", letterSpacing: "0.06em" }}>{a}</div>
                        ))}
                      </div>
                      {/* Mini QR */}
                      <div style={{ width: 28, height: 28, borderRadius: 5, border: "1px solid rgba(201,165,90,0.12)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, padding: 4 }}>
                        {Array.from({ length: 16 }).map((_, j) => (
                          <div key={j} style={{ borderRadius: 0.5, backgroundColor: j % 3 === 0 ? "rgba(201,165,90,0.25)" : "rgba(255,255,255,0.04)" }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
