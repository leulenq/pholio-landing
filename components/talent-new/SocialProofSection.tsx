// landing/components/talent-new/SocialProofSection.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedNumber({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  inView,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  inView: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setCurrent(end);
      return;
    }
    let frame: number;
    const start = performance.now();
    function animate(now: number) {
      const elapsed = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setCurrent(Math.round(eased * end));
      if (elapsed < 1) frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration, prefersReducedMotion]);
  return (
    <span>
      {prefix}
      {current}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    number: 140,
    suffix: "+",
    prefix: "",
    label: "Agencies scouting the network",
  },
  {
    number: 78,
    suffix: "%",
    prefix: "",
    label: "Of opened books land on a board",
  },
  {
    number: 3,
    suffix: "×",
    prefix: "",
    label: "More callbacks with a tight comp",
  },
  {
    number: 23,
    suffix: "",
    prefix: "",
    label: "Scouts active this week",
  },
];

export default function SocialProofSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FAF8F5", padding: "7rem 0 8rem" }}
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
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 640,
          height: 420,
          background:
            "radial-gradient(ellipse, rgba(201,165,90,0.07) 0%, transparent 58%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scaleX: prefersReducedMotion ? 1 : 0.2 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.1, ease }}
          style={{
            height: 2,
            maxWidth: 560,
            margin: "0 auto 2.5rem",
            borderRadius: 2,
            background:
              "linear-gradient(90deg, transparent, rgba(201,165,90,0.5), rgba(201,165,90,0.15), transparent)",
            transformOrigin: "center",
          }}
        />

        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <p
            className="font-editorial-italic m-0 mb-4"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(201,165,90,0.55)",
            }}
          >
            Agency-side activity
          </p>
          <h2
            className="font-editorial m-0"
            style={{
              fontSize: "clamp(2.1rem, 4.5vw, 3.6rem)",
              color: "#1A1815",
              fontWeight: 400,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
            }}
          >
            Desks are searching.
            <br />
            <span style={{ color: "rgba(26,24,21,0.28)" }}>
              Whether you get pulled up is{" "}
              <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
                your book.
              </span>
            </span>
          </h2>
        </motion.div>

        <div className="mb-16 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.07,
                ease,
              }}
              className="border-l border-[rgba(201,165,90,0.22)] pl-4"
            >
              <div
                className="font-editorial"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                  color: "#C9A55A",
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  marginBottom: "0.65rem",
                }}
              >
                <AnimatedNumber
                  end={stat.number}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  inView={inView}
                  duration={1.9}
                />
              </div>
              <p
                className="m-0"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.78rem",
                  color: "rgba(26,24,21,0.42)",
                  lineHeight: 1.45,
                  maxWidth: 160,
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.45, ease }}
          className="grid grid-cols-1 gap-10 border-t border-[rgba(26,24,21,0.07)] pt-12 lg:grid-cols-12"
        >
          <div className="font-editorial lg:col-span-1" style={{ fontSize: "4rem", color: "rgba(201,165,90,0.14)", lineHeight: 0.5 }}>
            &ldquo;
          </div>
          <div className="lg:col-span-11">
            <blockquote
              className="font-editorial m-0"
              style={{
                fontSize: "clamp(1.35rem, 2.8vw, 2rem)",
                color: "rgba(26,24,21,0.58)",
                lineHeight: 1.45,
                letterSpacing: "-0.02em",
                marginBottom: "1.75rem",
              }}
            >
              Sunday upload. Wednesday callbacks. Pholio did in days what my old
              book couldn&apos;t do in months — and I could see who actually
              opened it.
            </blockquote>
            <div className="flex flex-wrap items-center gap-3">
              <div
                style={{
                  width: 28,
                  height: 1,
                  backgroundColor: "rgba(201,165,90,0.35)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  color: "rgba(26,24,21,0.5)",
                }}
              >
                Sarah Mitchell
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  color: "rgba(26,24,21,0.22)",
                }}
              >
                Editorial · New York
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
