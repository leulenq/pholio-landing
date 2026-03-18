"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";

const FEATURE_CHIPS = [
  " .studio Domain",
  "Verified Identity Badge",
  "SEO-Optimized",
  "Mobile Responsive",
  "Analytics Dashboard",
  "Direct Booking Link",
];

export default function SceneStudioWeb() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const mockupY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0px", "0px"] : ["80px", "-80px"]
  );

  const glowScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1.2, 0.8]
  );
  
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.02, 0.08, 0.02]
  );

  return (
    <section
      id="studio-plus"
      ref={sectionRef}
      className="relative pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Interactive Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 rounded-full"
          style={{ 
            width: 1600,
            height: 1000,
            background: "radial-gradient(circle, rgba(201,165,90,0.25) 0%, transparent 55%)",
            scale: glowScale,
            opacity: glowOpacity
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="text-xs uppercase tracking-[0.2em] font-bold mb-6 block"
            style={{ color: "var(--color-gold)" }}
          >
            Studio+
          </span>
          <h2
            className="font-editorial text-5xl sm:text-6xl md:text-7xl mb-8 leading-[1.0] tracking-tight"
            style={{ color: "var(--color-cream)" }}
          >
            Your own corner of{" "}
            <br className="hidden sm:block" />
            <span
              className="font-editorial-italic font-light opacity-90"
              style={{ color: "var(--color-gold)" }}
            >
              the industry.
            </span>
          </h2>
          <p
            className="mx-auto max-w-2xl text-lg md:text-xl font-light leading-relaxed tracking-wide"
            style={{ color: "var(--color-text-on-dark-muted)" }}
          >
            A verified digital identity on your own{" "}
            <span style={{ color: "var(--color-gold)", fontWeight: 500 }}>
              talent.pholio.studio
            </span>{" "}
            domain — the address agencies actually remember.
          </p>
        </motion.div>

        {/* Browser mockup — parallax outer, reveal inner */}
        <motion.div className="mx-auto max-w-5xl" style={{ y: mockupY }}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 1.2,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative rounded-[24px] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1), 0 30px 60px -10px rgba(0,0,0,0.8), 0 0 100px rgba(201, 165, 90, 0.05)",
          }}
        >
          {/* Glassmorphic Browser Chrome */}
          <div
            className="flex items-center gap-4 px-6 py-4 border-b border-white/[0.04]"
            style={{ background: "rgba(5, 5, 5, 0.4)" }}
          >
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-white/[0.15] border border-white/[0.05]" />
              <div className="h-3 w-3 rounded-full bg-white/[0.15] border border-white/[0.05]" />
              <div className="h-3 w-3 rounded-full bg-white/[0.15] border border-white/[0.05]" />
            </div>
            
            <div className="flex-1 flex justify-center">
              <div
                className="flex items-center gap-3 rounded-full px-6 py-2 text-sm backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.04]"
                style={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)"
                }}
              >
                <svg
                  className="h-3.5 w-3.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="var(--color-gold)"
                  strokeWidth={1.5}
                  style={{ opacity: 0.7 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="font-mono tracking-wide" style={{ color: "rgba(240, 240, 240, 0.8)" }}>
                  elara.pholio.studio
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ml-2"
                  style={{
                    backgroundColor: "rgba(201, 165, 90, 0.15)",
                    color: "var(--color-gold)",
                    boxShadow: "inset 0 0 0 1px rgba(201, 165, 90, 0.3)"
                  }}
                >
                  Verified
                </span>
              </div>
            </div>
            <div className="w-[72px]" />
          </div>

          {/* Portfolio content */}
          <div className="relative" style={{ backgroundColor: "#0a0a0a", height: "700px" }}>
            <iframe
              src="/studio-website/index.html?autoscroll=true"
              title="Studio+ Website Preview"
              width="100%"
              height="100%"
              frameBorder="0"
              loading="lazy"
              style={{
                border: "none",
                display: "block",
                width: "100%",
                height: "100%",
                backgroundColor: "#0a0a0a",
              }}
            />
            {/* Deep gradient fade masking the iframe hard cutoff */}
            <div 
              className="absolute inset-x-0 bottom-0 h-48 pointer-events-none" 
              style={{
                background: "linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.8) 40%, transparent 100%)"
              }}
            />
          </div>
        </motion.div>
        
        {/* Explore Themes Hint */}
        <motion.div
           className="mt-12 flex flex-col items-center justify-center gap-4"
           initial={{ opacity: 0, scale: 0.9 }}
           animate={inView ? { opacity: 1, scale: 1 } : {}}
           transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div 
            className="text-[10px] tracking-[0.3em] uppercase font-bold"
            style={{ color: "var(--color-gold)", opacity: 0.8 }}
          >
            Explore themes
          </div>
          <div className="flex gap-3">
            <div className="w-2 h-2 rounded-full border border-white/20" style={{ background: "var(--color-gold)" }} />
            <div className="w-2 h-2 rounded-full border border-white/20 bg-white/10 transition-colors duration-300 hover:bg-white/30 cursor-pointer" />
            <div className="w-2 h-2 rounded-full border border-white/20 bg-white/10 transition-colors duration-300 hover:bg-white/30 cursor-pointer" />
          </div>
        </motion.div>
        </motion.div>

        {/* Feature chips */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.4 }
            }
          }}
        >
          {FEATURE_CHIPS.map((f) => (
            <motion.div
              key={f}
              className="rounded-full px-5 py-2.5 text-[12px] font-medium tracking-wide backdrop-blur-md transition-all duration-300 hover:scale-105"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6 } }
              }}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.0) 100%)",
                color: "rgba(240, 240, 240, 0.9)",
                boxShadow: "inset 0 0 0 1px rgba(201, 165, 90, 0.15), 0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              {f}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
