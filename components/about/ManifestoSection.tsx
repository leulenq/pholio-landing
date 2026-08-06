"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const GOLD = "#C9A55A";
const INK = "#050505";

export function ManifestoSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] px-6 py-48 md:py-72">
      {/* Background ghost P — preserved from pholio-landing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden"
        style={{ opacity: 0.03 }}
      >
        <span
          className="font-editorial italic leading-none"
          style={{ fontSize: "80vw", color: GOLD }}
        >
          P
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div
            className="font-editorial font-light uppercase"
            style={{
              fontSize: "clamp(3rem, 10vw, 7rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              color: INK,
            }}
          >
            <div className="flex flex-col gap-2">
              <motion.div
                initial={reduceMotion ? false : { x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE }}
                className="mb-2"
              >
                Curation is
              </motion.div>
              <motion.div
                initial={reduceMotion ? false : { x: 40, opacity: 0 }}
                whileInView={{ x: 100, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
                className="font-editorial-italic"
                style={{ color: GOLD }}
              >
                Our Compass
              </motion.div>
              <motion.div
                initial={reduceMotion ? false : { x: -40, opacity: 0 }}
                whileInView={{ x: -60, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
              >
                Quality is
              </motion.div>
              <motion.div
                initial={reduceMotion ? false : { x: 40, opacity: 0 }}
                whileInView={{ x: 40, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
                className="font-editorial-italic"
                style={{ color: GOLD }}
              >
                Our Currency
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative rule lines — preserved from pholio-landing */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[15%] top-0 hidden w-px bg-[#C9A55A]/10 lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-[15%] top-0 hidden w-px bg-[#C9A55A]/10 lg:block"
      />
    </section>
  );
}
