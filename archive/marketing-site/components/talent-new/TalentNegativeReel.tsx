"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const FRICTION = [
  {
    n: "01",
    text: "Ten attachments. Wrong crop.",
  },
  {
    n: "02",
    text: "Link died in someone’s inbox.",
  },
  {
    n: "03",
    text: "Your best polaroid buried under selfies.",
  },
  {
    n: "04",
    text: "They asked for stats you didn’t have in the room.",
  },
];

export default function TalentNegativeReel() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FAF8F5 0%, #F4EFE8 45%, #FAF8F5 100%)",
        padding: "clamp(5rem, 11vw, 9rem) clamp(1.25rem, 5vw, 3rem)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.04,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "160px 160px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-8 border-b border-[rgba(26,24,21,0.07)] pb-12 md:mb-14 md:flex-row md:items-end md:justify-between md:pb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease }}
              className="mb-4 flex items-center gap-3"
            >
              <div
                style={{
                  width: 24,
                  height: 1,
                  background:
                    "linear-gradient(90deg, #C9A55A, rgba(201,165,90,0.15))",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "0.625rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "#A88C44",
                }}
              >
                Cut list
              </span>
            </motion.div>
            <motion.h2
              className="font-editorial m-0"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.05, ease }}
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                color: "#1A1815",
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                fontWeight: 400,
              }}
            >
              Pholio retires
              <br />
              <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
                the noise.
              </span>
            </motion.h2>
          </div>
          <motion.p
            className="font-editorial-italic m-0 max-w-[280px] md:text-right"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            style={{
              fontSize: "0.9375rem",
              color: "rgba(26,24,21,0.38)",
              lineHeight: 1.55,
            }}
          >
            What casting teams stop tolerating when your book is already in the
            glass.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {FRICTION.map((item, i) => (
            <motion.article
              key={item.n}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: prefersReducedMotion ? 0 : 0.15 + i * 0.08,
                ease,
              }}
              className="group relative overflow-hidden rounded-2xl"
              style={{
                backgroundColor: "#1A1815",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow:
                  "0 20px 50px -18px rgba(0,0,0,0.25), 0 0 0 1px rgba(201,165,90,0.06)",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'2\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                  backgroundSize: "120px 120px",
                }}
              />
              <div
                className="absolute left-0 top-0 h-full w-[3px] rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(201,165,90,0.9), rgba(201,165,90,0.15))",
                }}
              />
              <div className="relative px-7 py-8 md:px-8 md:py-9">
                <span
                  className="font-editorial select-none"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                    lineHeight: 0.75,
                    color: "rgba(201,165,90,0.1)",
                    letterSpacing: "-0.04em",
                  }}
                  aria-hidden="true"
                >
                  {item.n}
                </span>
                <div className="relative mt-3">
                  <motion.p
                    className="relative z-[1] m-0"
                    initial={{ opacity: 1, color: "rgba(250,248,245,0.88)" }}
                    animate={
                      inView
                        ? prefersReducedMotion
                          ? {
                              opacity: 0.45,
                              color: "rgba(250,248,245,0.38)",
                              textDecoration: "line-through",
                              textDecorationColor: "rgba(201,165,90,0.4)",
                            }
                          : {
                              opacity: 0.4,
                              color: "rgba(250,248,245,0.32)",
                            }
                        : {}
                    }
                    transition={{
                      duration: 0.55,
                      delay: prefersReducedMotion ? 0 : 0.5 + i * 0.1,
                      ease,
                    }}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.55,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {item.text}
                  </motion.p>
                  {!prefersReducedMotion && (
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 origin-left rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #C9A55A, rgba(201,165,90,0.15))",
                      }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.52 + i * 0.1,
                        ease,
                      }}
                    />
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
