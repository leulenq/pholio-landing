"use client";

import { motion } from "framer-motion";
import { EditorialVerticalDivider } from "@/components/EditorialVerticalDivider";

export function CareersHero() {
  return (
    <section className="relative min-h-mobile-screen w-full overflow-hidden flex items-center justify-center bg-[#050505] px-6">
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(201, 165, 90, 0.3) 0%, transparent 70%)"
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A55A] mb-8 block font-semibold">Join the Pholio Collective</span>
          <h1 className="font-editorial text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] leading-[1.0] text-white">
            Build the Next<br />
            <span className="font-editorial-italic italic text-[#C9A55A]">Standard</span> of<br />
            Digital Identity.
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
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">Explore Roles</span>
          <EditorialVerticalDivider />
        </motion.div>
      </div>
    </section>
  );
}
