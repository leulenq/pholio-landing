"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { EditorialVerticalDivider } from "./EditorialVerticalDivider";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function AboutHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-mobile-screen w-full overflow-hidden bg-[#050505]">
      {/* Full-bleed editorial field */}
      <div className="absolute inset-0">
        <Image
          src="/about/hero.jpg"
          alt="Editorial portrait against a dark field"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Bottom-heavy gradient so the type sits in ink, not on skin */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.55) 45%, rgba(5,5,5,0.15) 70%, transparent 100%)",
          }}
        />
        {/* Grain texture so the image shares the site's paper quality */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            opacity: 0.03,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "150px 150px",
          }}
        />
      </div>

      {/* Content sits low and left, like a masthead */}
      <div className="relative z-10 flex min-h-mobile-screen flex-col justify-end px-6 pb-24 md:px-12">
        <div className="max-w-[1440px]">
          <motion.h1
            className="font-editorial max-w-4xl text-[#FAF7F2]"
            style={{
              fontSize: "clamp(2.75rem, 8vw, 6.5rem)",
              lineHeight: 0.95,
            }}
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            We are building the next{" "}
            <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
              standard
            </span>{" "}
            for creative discovery.
          </motion.h1>
        </div>

        {/* Scroll cue: explicit user request */}
        <motion.div
          className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1, ease: EASE }}
        >
          <span
            className="text-[8px] uppercase tracking-[0.3em]"
            style={{ color: "rgba(250,247,242,0.28)" }}
          >
            Explore our manifesto
          </span>
          <EditorialVerticalDivider height={56} />
        </motion.div>
      </div>
    </section>
  );
}
