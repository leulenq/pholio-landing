"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const UNSPLASH_IMAGE = "https://images.unsplash.com/photo-1449156001437-333e45370f29?q=80&w=2670&auto=format&fit=crop";

export default function SceneCurated() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] flex items-center justify-center py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* ── Left Column: Content ─────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-12"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <span className="text-micro text-white/40 tracking-[0.2em]">THE ENGINE</span>
              <h2 className="font-editorial text-7xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tight">
                Curated
                <br />
                <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>by Intelligence.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-sm font-semibold text-white tracking-wide">AI Curated Selections</h3>
                <div className="w-12 h-[1px] bg-gold-dark/30" />
                <p className="text-sm text-white/50 leading-relaxed font-sans">
                  Your 10 strongest shots, chosen by an engine trained on what agencies actually book.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-sm font-semibold text-white tracking-wide">Real-time Analytics</h3>
                <div className="w-12 h-[1px] bg-gold-dark/30" />
                <p className="text-sm text-white/50 leading-relaxed font-sans">
                  Know when an agency views your card. Track interest before they reach out.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right Column: Image + Quote Overlay ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl">
              <img
                src={UNSPLASH_IMAGE}
                alt="Foggy city editorial"
                className="w-full h-full object-cover grayscale brightness-75 hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Quote Overlay Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
              className="absolute -bottom-8 -left-8 md:-left-12 max-w-[320px] bg-[#0A0A0A]/95 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-3xl"
            >
              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-bold tracking-[0.2em] text-gold/80 uppercase italic">
                  LIVE PERFORMANCE
                </span>
                <p className="font-editorial text-xl md:text-2xl text-white/90 leading-tight">
                  &ldquo;Pholio optimized my portfolio in seconds. The decision was immediate.&rdquo;
                </p>
                <div className="flex flex-col gap-1">
                  <div className="w-8 h-[1px] bg-gold mb-2" />
                  <span className="text-[10px] font-bold tracking-[0.1em] text-white/60 uppercase">
                    Marcello Russo
                  </span>
                  <span className="text-[9px] font-medium tracking-[0.05em] text-white/30 uppercase">
                    Head of Casting, Elite Milan
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
