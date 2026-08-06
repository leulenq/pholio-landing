"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const LINES = [
  { text: "You are not late.", role: "lead" as const },
  { text: "You are in the hallway.", role: "body" as const },
  { text: "The DM never opened. The PDF never landed.", role: "body" as const },
  { text: "Pholio is the door that was already ajar.", role: "gold" as const },
];

export default function TalentRoomBefore() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(168deg, #080706 0%, #12100d 38%, #0d0c0a 100%)",
        padding: "clamp(5rem, 14vw, 10rem) clamp(1.25rem, 5vw, 3rem)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.055,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[20%] top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,165,90,0.07) 0%, transparent 62%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[15%] bottom-0 h-[400px] w-[400px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,165,90,0.05) 0%, transparent 55%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-16 lg:gap-20">
        {/* Door / holding visual */}
        <motion.div
          className="relative flex w-full max-w-[300px] shrink-0 justify-center lg:max-w-[320px]"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease }}
        >
          <div
            className="relative aspect-[3/5] w-full max-w-[280px]"
            style={{ perspective: 900 }}
          >
            <motion.div
              className="absolute inset-0 rounded-sm"
              style={{
                border: "1px solid rgba(201,165,90,0.22)",
                boxShadow:
                  "inset 0 0 0 1px rgba(0,0,0,0.4), 0 24px 80px -20px rgba(0,0,0,0.65)",
                background:
                  "linear-gradient(145deg, rgba(26,24,21,0.5) 0%, rgba(8,7,6,0.92) 100%)",
              }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      boxShadow: [
                        "inset 0 0 0 1px rgba(0,0,0,0.4), 0 24px 80px -20px rgba(0,0,0,0.65)",
                        "inset 0 0 0 1px rgba(0,0,0,0.4), 0 28px 90px -18px rgba(201,165,90,0.08)",
                        "inset 0 0 0 1px rgba(0,0,0,0.4), 0 24px 80px -20px rgba(0,0,0,0.65)",
                      ],
                    }
              }
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Gold seam — door ajar */}
            <motion.div
              aria-hidden="true"
              className="absolute bottom-[12%] top-[12%] w-[3px] rounded-full"
              style={{
                right: "18%",
                background:
                  "linear-gradient(180deg, transparent, rgba(201,165,90,0.85), transparent)",
                boxShadow: "0 0 24px rgba(201,165,90,0.35)",
              }}
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={inView ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ duration: 1, delay: 0.35, ease }}
            />
            <div
              className="pointer-events-none absolute left-4 top-4 flex items-center gap-2"
              aria-hidden="true"
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.5625rem",
                  fontWeight: 600,
                  letterSpacing: "0.28em",
                  color: "rgba(201,165,90,0.45)",
                }}
              >
                HOLD
              </span>
              <span
                style={{
                  width: 32,
                  height: 1,
                  background:
                    "linear-gradient(90deg, rgba(201,165,90,0.35), transparent)",
                }}
              />
            </div>
            <span
              className="font-editorial-italic pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
              style={{
                fontSize: "0.8125rem",
                color: "rgba(250,248,245,0.22)",
                letterSpacing: "0.04em",
              }}
            >
              outside the room
            </span>
            {/* Corner ticks */}
            {[
              "left-2 top-2 border-l border-t",
              "right-2 top-2 border-r border-t",
              "left-2 bottom-2 border-l border-b",
              "right-2 bottom-2 border-r border-b",
            ].map((c) => (
              <span
                key={c}
                aria-hidden="true"
                className={`pointer-events-none absolute h-5 w-5 border-[rgba(201,165,90,0.2)] ${c}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Copy column */}
        <div className="min-w-0 flex-1">
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease }}
            className="mb-8 flex items-center gap-3"
          >
            <div
              style={{
                width: 28,
                height: 1,
                background:
                  "linear-gradient(90deg, rgba(201,165,90,0.6), transparent)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "0.625rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "rgba(201,165,90,0.5)",
              }}
            >
              Before you walk in
            </span>
          </motion.div>

          <div className="space-y-0">
            {LINES.map((line, i) => (
              <motion.div
                key={line.text}
                initial={{
                  opacity: prefersReducedMotion ? 1 : 0,
                  y: prefersReducedMotion ? 0 : 20,
                }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: prefersReducedMotion ? 0 : 0.15 + i * 0.1,
                  ease,
                }}
                className={i < LINES.length - 1 ? "border-b border-[rgba(250,248,245,0.06)]" : ""}
                style={{ paddingBottom: i < LINES.length - 1 ? "1.35rem" : 0, marginBottom: i < LINES.length - 1 ? "1.35rem" : 0 }}
              >
                <p
                  className={
                    line.role === "gold"
                      ? "font-editorial-italic m-0"
                      : line.role === "lead"
                        ? "font-editorial m-0"
                        : "font-editorial m-0"
                  }
                  style={{
                    fontSize:
                      line.role === "lead"
                        ? "clamp(2rem, 4.8vw, 3.35rem)"
                        : line.role === "gold"
                          ? "clamp(1.2rem, 2.4vw, 1.55rem)"
                          : "clamp(1.05rem, 2vw, 1.28rem)",
                    color:
                      line.role === "gold"
                        ? "#C9A55A"
                        : line.role === "lead"
                          ? "#FAF8F5"
                          : "rgba(250,248,245,0.48)",
                    lineHeight: line.role === "lead" ? 1.08 : 1.45,
                    letterSpacing: "-0.02em",
                    fontWeight: 400,
                  }}
                >
                  {line.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
