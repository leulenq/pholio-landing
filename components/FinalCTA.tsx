"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* CTA Section */}
      <section
        ref={ref}
        className="relative py-32 md:py-48 overflow-hidden"
        style={{ backgroundColor: "var(--color-ink)" }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[250px] opacity-[0.04]"
          aria-hidden="true"
          style={{ backgroundColor: "var(--color-gold)" }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <motion.span
            className="text-label mb-8 block"
            style={{ color: "var(--color-gold)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            Your Next Move
          </motion.span>

          <motion.h2
            className="font-editorial text-5xl sm:text-6xl md:text-7xl mb-7 leading-[1.05]"
            style={{ color: "var(--color-cream)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease }}
          >
            Ready to be{" "}
            <span
              className="font-editorial-italic"
              style={{ color: "var(--color-gold)" }}
            >
              seen?
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto mb-12 max-w-md text-base md:text-lg leading-relaxed"
            style={{ color: "var(--color-text-on-dark-muted)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease }}
          >
            Join the platform that top agencies use to scout verified talent.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.24, ease }}
          >
            <a
              href={`${APP_URL}/signup`}
              className="btn-gold rounded-full"
              style={{
                boxShadow:
                  "0 0 40px rgba(200,169,110,0.15), 0 0 80px rgba(200,169,110,0.06)",
              }}
            >
              Start Casting
            </a>
            <a href={`${APP_URL}/login`} className="btn-outline rounded-full">
              Agency Login
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
