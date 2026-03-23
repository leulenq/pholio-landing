"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { TALENT_SHOWCASE_IMAGES } from "@/lib/talent-showcase-images";

const ease = [0.22, 1, 0.36, 1] as const;

export default function TalentFilmCorridor() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["2%", "-18%"],
  );

  const frames = TALENT_SHOWCASE_IMAGES.slice(0, 10);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-[rgba(26,24,21,0.06)]"
      style={{ backgroundColor: "#EDE8E0", padding: "3.5rem 0 4rem" }}
    >
      <div className="relative z-10 mb-8 px-6 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div
                style={{
                  width: 24,
                  height: 1,
                  background:
                    "linear-gradient(to right, #C9A55A, transparent)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "0.625rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#8B7740",
                }}
              >
                Contact sheet
              </span>
            </div>
            <h2
              className="font-editorial m-0"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                color: "#1A1815",
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                fontWeight: 400,
              }}
            >
              Frames scouts actually scroll.
            </h2>
          </div>
          <p
            className="m-0 max-w-xs"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8125rem",
              color: "rgba(26,24,21,0.45)",
              lineHeight: 1.65,
            }}
          >
            Your digitals, treated like film — numbered, ordered, alive in the
            corridor.
          </p>
        </div>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-4 px-6 md:gap-5 md:px-10"
          style={{ x }}
        >
          {frames.map((img, i) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease }}
              className="relative shrink-0"
              style={{
                width: "clamp(140px, 22vw, 200px)",
              }}
            >
              <div
                className="overflow-hidden rounded-sm bg-[#1A1815] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.25)]"
                style={{
                  border: "1px solid rgba(26,24,21,0.08)",
                }}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption
                className="mt-2 font-editorial-italic"
                style={{
                  fontSize: "0.6875rem",
                  color: "rgba(26,24,21,0.35)",
                  letterSpacing: "0.12em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
