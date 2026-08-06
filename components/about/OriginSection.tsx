"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function OriginSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-32 md:px-12 md:py-48">
      {/* Ghost word behind the paragraph */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 select-none md:left-12"
      >
        <span
          className="font-editorial-italic block"
          style={{
            fontSize: "clamp(7rem, 26vw, 22rem)",
            lineHeight: 0.85,
            color: "rgba(250,247,242,0.035)",
          }}
        >
          Noise
        </span>
      </div>

      {/* Floating figure: masked to read as a cutout, not a framed photo */}
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-[45vw] max-w-[560px] md:block"
        style={{
          maskImage:
            "linear-gradient(to left, black 30%, transparent 90%), linear-gradient(to top, black 40%, transparent 95%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 30%, transparent 90%), linear-gradient(to top, black 40%, transparent 95%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
        initial={reduceMotion ? false : { opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <Image
          src="/about/origin-dark.jpg"
          alt="Editorial figure in studio light"
          fill
          className="object-cover object-bottom"
          sizes="(max-width: 768px) 0vw, 45vw"
        />
      </motion.div>

      {/* Text sits in front of the ghost word */}
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <h2
            className="font-editorial mb-10 text-[#FAF7F2]"
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
              lineHeight: 1.05,
            }}
          >
            Most platforms reward the loudest profile. Pholio rewards the{" "}
            <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
              real
            </span>{" "}
            one.
          </h2>
          <p
            className="font-sans font-light leading-relaxed"
            style={{
              fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
              color: "rgba(250,247,242,0.55)",
              maxWidth: "540px",
            }}
          >
            We built a place where verified work, not self-promotion, opens doors
            to agencies, casting directors, and the people who decide whose book
            gets seen. Pholio is the credential a creative career deserves.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
