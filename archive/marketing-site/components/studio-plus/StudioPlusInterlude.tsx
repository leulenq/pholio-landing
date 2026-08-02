"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function StudioPlusInterlude() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const frameY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["8%", "-8%"]
  );
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.04, 0.12, 0.05]);
  const borderGlow = useTransform(scrollYProgress, [0.15, 0.45, 0.75], [0.15, 0.45, 0.2]);

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "min(100vw, 900px)",
          height: "min(100vw, 900px)",
          background: "radial-gradient(circle, rgba(201,165,90,0.2) 0%, transparent 55%)",
          opacity: glowOpacity,
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-label m-0 mb-4" style={{ color: "rgba(201,165,90,0.7)" }}>
            Atelier frame
          </p>
          <h2
            className="font-editorial m-0 mx-auto max-w-[18ch]"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#F8F6F3",
            }}
          >
            One presence,{" "}
            <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>
              many rooms
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-[920px]"
          style={{ y: frameY }}
        >
          <motion.div
            className="rounded-[2px] p-[1px] relative"
            style={{
              background:
                "linear-gradient(135deg, rgba(201,165,90,0.5) 0%, rgba(201,165,90,0.08) 40%, rgba(255,255,255,0.06) 100%)",
              boxShadow: "0 50px 100px -40px rgba(0,0,0,0.9)",
            }}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 rounded-[2px] pointer-events-none"
              style={{
                boxShadow: "0 0 60px rgba(201,165,90,0.15)",
                opacity: borderGlow,
              }}
            />
            <div
              className="rounded-[1px] overflow-hidden relative"
              style={{
                background:
                  "linear-gradient(180deg, #101014 0%, #0a090c 50%, #060508 100%)",
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-3 gap-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex gap-1.5">
                  {["#4a4540", "#6b655c", "#8a8278"].map((c) => (
                    <span
                      key={c}
                      className="rounded-full shrink-0"
                      style={{ width: 7, height: 7, backgroundColor: c }}
                    />
                  ))}
                </div>
                <div
                  className="flex-1 max-w-md mx-auto h-7 rounded-full flex items-center px-4"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    className="text-micro truncate"
                    style={{ color: "rgba(245,243,240,0.25)" }}
                  >
                    yourname.studio — live
                  </span>
                </div>
                <div
                  className="w-16 h-7 rounded-full hidden sm:flex items-center justify-center text-micro"
                  style={{
                    border: "1px solid rgba(201,165,90,0.25)",
                    color: "rgba(201,165,90,0.8)",
                  }}
                >
                  LIVE
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 min-h-[280px] md:min-h-[340px]">
                <div
                  className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center"
                  style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span className="text-micro mb-3" style={{ color: "rgba(245,243,240,0.25)" }}>
                    This week
                  </span>
                  <p
                    className="font-editorial m-0"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 2.75rem)",
                      lineHeight: 1,
                      color: "#F5F3F0",
                    }}
                  >
                    2.4k
                  </p>
                  <p
                    className="m-0 mt-2"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.75rem",
                      color: "rgba(245,243,240,0.35)",
                    }}
                  >
                    qualified views
                  </p>
                </div>
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center gap-4">
                  {[72, 48, 88].map((w, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div
                        className="h-2 rounded-full overflow-hidden flex-1"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            width: `${w}%`,
                            transformOrigin: "left",
                            background:
                              "linear-gradient(90deg, rgba(201,165,90,0.9), rgba(201,165,90,0.25))",
                          }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.1,
                            delay: 0.15 + i * 0.12,
                            ease,
                          }}
                        />
                      </div>
                      <span
                        className="text-micro w-8 text-right shrink-0"
                        style={{ color: "rgba(245,243,240,0.2)" }}
                      >
                        {i + 1}
                      </span>
                    </div>
                  ))}
                  <p
                    className="m-0 mt-2 font-editorial-italic"
                    style={{
                      fontSize: "0.9375rem",
                      color: "rgba(245,243,240,0.32)",
                    }}
                  >
                    Signal you can act on—not vanity metrics.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
