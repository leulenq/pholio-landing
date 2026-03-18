"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function BeliefSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[60vh] items-center justify-center px-6 py-32"
      style={{ backgroundColor: "#050505" }}
    >
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tight"
          style={{ color: "#FFFFFF" }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          We believe your career should be defined by your{" "}
          <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>
            face
          </span>
          ,
          <br className="hidden md:block" /> not your{" "}
          <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>
            formatting.
          </span>
        </motion.h2>

        <motion.div
          className="mx-auto mt-16 w-[1px]"
          style={{ backgroundColor: "var(--color-gold)", height: 100 }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </section>
  );
}
