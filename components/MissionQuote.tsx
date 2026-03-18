"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function MissionQuote() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[50vh] items-center justify-center px-6 py-24"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.blockquote
          className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.3]"
          style={{ color: "var(--color-text-primary)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          &ldquo;The industry has always had talent.
          <br />
          Now it has a{" "}
          <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>
            standard.
          </span>
          &rdquo;
        </motion.blockquote>

        <motion.div
          className="mx-auto mt-10 w-[1px] bg-current"
          style={{ backgroundColor: "var(--color-gold)", height: 80 }}
          initial={{ scaleY: 0, originY: 0, transformOrigin: "top" }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </section>
  );
}
