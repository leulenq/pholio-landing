"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EditorialVerticalDivider } from "./EditorialVerticalDivider";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const GOLD = "#C9A55A";

export function ClosingSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-[#050505] px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          className="font-editorial mb-10 text-[#FAF7F2]"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.1,
          }}
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
        >
          If you believe creative work should speak first, you already speak our{" "}
          <span className="font-editorial-italic" style={{ color: GOLD }}>
            language
          </span>
          .
        </motion.h2>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
        >
          <a
            href="mailto:hello@pholio.studio"
            className="font-editorial inline-block transition-colors duration-300 hover:text-[#D4BC8A]"
            style={{
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              color: GOLD,
              textDecoration: "none",
            }}
          >
            hello@pholio.studio
          </a>
        </motion.div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
        >
          <EditorialVerticalDivider animation="reveal" height={80} />
        </motion.div>
      </div>
    </section>
  );
}
