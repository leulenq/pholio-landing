"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const ENTRIES: { term: string; line: string }[] = [
  {
    term: "Board",
    line: "A live shortlist — not a grid of strangers — where your book already sits.",
  },
  {
    term: "Package",
    line: "Comp, digitals, measurements, and link from one profile — not five apps.",
  },
  {
    term: "Scout view",
    line: "The same glass agencies search; you get lean-in receipts, not guesswork.",
  },
  {
    term: "Match",
    line: "Archetype and stats spelled out so the room knows why you surfaced.",
  },
];

const INTERVAL_MS = 4200;

export default function TalentGlossary() {
  const [idx, setIdx] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % ENTRIES.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, [prefersReducedMotion]);

  const active = ENTRIES[prefersReducedMotion ? 0 : idx]!;

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FAF8F5", padding: "5.5rem 24px 6rem" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.025,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "150px 150px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="mb-10 flex items-center justify-center gap-3">
          <div
            style={{
              width: 24,
              height: 1,
              background: "linear-gradient(to right, transparent, #C9A55A)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "0.625rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C9A55A",
            }}
          >
            Pholio lexicon
          </span>
          <div
            style={{
              width: 24,
              height: 1,
              background: "linear-gradient(to left, transparent, #C9A55A)",
            }}
          />
        </div>

        <div style={{ minHeight: "clamp(140px, 22vw, 200px)" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.term}
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 14, filter: "blur(6px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={
                prefersReducedMotion
                  ? {}
                  : { opacity: 0, y: -10, filter: "blur(4px)" }
              }
              transition={{ duration: 0.55, ease }}
            >
              <h3
                className="font-editorial-italic m-0"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
                  color: "#C9A55A",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginBottom: "1.5rem",
                  fontWeight: 400,
                }}
              >
                {active.term}
              </h3>
              <p
                className="font-editorial m-0 mx-auto max-w-xl"
                style={{
                  fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                  color: "rgba(26,24,21,0.5)",
                  lineHeight: 1.55,
                  letterSpacing: "-0.015em",
                }}
              >
                {active.line}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {!prefersReducedMotion && (
          <div
            className="mt-10 flex justify-center gap-1.5"
            aria-hidden="true"
          >
            {ENTRIES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === idx ? 28 : 6,
                  backgroundColor:
                    i === idx ? "#C9A55A" : "rgba(26,24,21,0.12)",
                }}
                aria-label={`Show glossary entry ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
