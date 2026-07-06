"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
  { href: "/community-guidelines", label: "Community Guidelines" },
  { href: "/dmca", label: "DMCA" },
  { href: "/ai-notice", label: "AI Notice" },
];

export default function TemporaryLanding() {
  return (
    <main className="fixed inset-0 flex h-dvh items-center justify-center overflow-hidden bg-[#050505] px-6 text-[#FAF7F2]">
      <div
        aria-hidden="true"
        className="absolute rounded-full opacity-[0.04]"
        style={{
          width: 1000,
          height: 1000,
          background: "radial-gradient(circle, #C8A96E 0%, transparent 55%)",
        }}
      />

      <section className="relative flex flex-col items-center text-center">
        <div className="flex items-center overflow-hidden">
          {"PHOLIO".split("").map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              className="text-4xl sm:text-5xl md:text-6xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                letterSpacing: "0.2em",
                color: "#C8A96E",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + index * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.div
          aria-hidden="true"
          className="mt-4 h-px rounded-full"
          style={{
            background: "linear-gradient(to right, transparent, #C8A96E, transparent)",
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 120, opacity: 1 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <motion.p
          className="mt-10 font-editorial text-3xl tracking-[-0.03em] text-[#FAF7F2] sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.15,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Launching soon.
        </motion.p>

        <motion.nav
          aria-label="Legal pages"
          className="mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.35,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#FAF7F2]/42 transition-colors duration-300 hover:text-[#C8A96E] focus:outline-none focus-visible:text-[#C8A96E]"
            >
              {link.label}
            </Link>
          ))}
        </motion.nav>
      </section>
    </main>
  );
}
