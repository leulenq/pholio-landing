"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden flex items-center justify-center bg-[#050505] px-6">
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(201, 165, 90, 0.4) 0%, transparent 70%)"
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-micro text-gold mb-8 block font-medium">ESTABLISHED 2024</span>
          <h1 className="font-editorial text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] leading-[1.05] text-white">
            Redefining the<br />
            <span className="font-editorial-italic text-gold">Architecture</span> of<br />
            Human Connection.
          </h1>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">Discover our vision</span>
          <div 
            className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent origin-top"
            style={{ transformOrigin: "top" }}
          >
            <motion.div 
              className="w-full bg-gold"
              animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
