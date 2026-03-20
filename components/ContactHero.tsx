"use client";

import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden flex items-center justify-center bg-[#050505] px-6">
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(201, 165, 90, 0.3) 0%, transparent 70%)"
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A55A] mb-8 block font-semibold">Connect with us</span>
          <h1 className="font-editorial text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] leading-[1.0] text-white">
            Start a<br />
            <span className="font-editorial-italic italic text-[#C9A55A]">Conversation</span> with<br />
            Pholio Studio.
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
