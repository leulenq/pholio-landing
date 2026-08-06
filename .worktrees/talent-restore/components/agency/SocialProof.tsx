"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AgencySection, agency } from "@/components/agency/AgencyPrimitives";

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedNumber({
  end,
  suffix = "",
  duration = 2,
  inView,
}: {
  end: number;
  suffix?: string;
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
      const eased = 1 - (1 - elapsed) ** 3;
      setCurrent(Math.round(eased * end));
      if (elapsed < 1) frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration, prefersReducedMotion]);
  return (
    <span>
      {current}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    number: 140,
    suffix: "+",
    label: "Agency teams in the network",
    size: "large" as const,
  },
  {
    number: 12,
    suffix: "k+",
    label: "Presentation-ready profiles",
    size: "medium" as const,
  },
  {
    number: 91,
    suffix: "%",
    label: "Illustrative avg. fit band",
    size: "medium" as const,
  },
  {
    number: 8,
    suffix: "",
    label: "Regions with active programs",
    size: "small" as const,
  },
  {
    number: 2,
    suffix: " min",
    label: "Target time to first shortlist",
    size: "small" as const,
  },
  {
    number: 500,
    suffix: "+",
    label: "Placements supported on platform",
    size: "small" as const,
  },
] as const;

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <AgencySection variant="elevated">
      <div ref={ref} className={agency.container}>
        <motion.div
          className="mb-14 max-w-2xl"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p
            className="mb-3 font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.22em] text-[var(--agency-accent)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Scale &amp; adoption
          </p>
          <h2
            className="font-sans text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[var(--agency-text)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Built for volume—without diluting book quality
          </h2>
          <p
            className="mt-4 max-w-xl text-[0.8125rem] leading-relaxed text-[var(--agency-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Figures shown are directional unless noted; your team&apos;s
            workflow and roster mix will vary.
          </p>
        </motion.div>

        <div className="mb-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease }}
              className={`relative overflow-hidden rounded-xl border border-[var(--agency-line)] bg-[var(--agency-panel)] p-6 md:p-8 ${
                stat.size === "large" ? "md:col-span-2" : ""
              }`}
            >
              {stat.size === "large" && (
                <div
                  aria-hidden
                  className="absolute left-[15%] right-[15%] top-0 h-px bg-gradient-to-r from-transparent via-[rgba(59,130,246,0.25)] to-transparent"
                />
              )}
              <div
                className={`font-sans font-semibold leading-none tracking-tight text-[var(--agency-text)] ${
                  stat.size === "large"
                    ? "text-[clamp(2.5rem,7vw,4.5rem)]"
                    : stat.size === "medium"
                      ? "text-[clamp(2rem,5vw,3rem)]"
                      : "text-[clamp(1.75rem,4vw,2.5rem)]"
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <AnimatedNumber
                  end={stat.number}
                  suffix={stat.suffix}
                  inView={inView}
                  duration={stat.size === "large" ? 2.2 : 1.6}
                />
              </div>
              <p
                className="mt-3 max-w-[220px] text-[0.8125rem] leading-snug text-[var(--agency-muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.45, ease }}
          className="border-t border-[var(--agency-line)] pt-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="font-editorial text-5xl leading-none text-[var(--agency-accent)] opacity-[0.12]"
              aria-hidden
            >
              &ldquo;
            </p>
            <blockquote
              className="font-sans text-[clamp(1.05rem,2.2vw,1.35rem)] font-normal leading-relaxed text-[var(--agency-muted)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              We needed one place where scouting and booking could agree on who
              was in play. Pholio gave us a shared pipeline and cleaner books
              going into board—less rework the night before a client meeting.
            </blockquote>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <div className="h-px w-8 bg-[var(--agency-line)]" aria-hidden />
              <span
                className="text-[0.8125rem] font-medium text-[var(--agency-text)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Director of Scouting
              </span>
              <span
                className="text-[0.75rem] text-[var(--agency-faint)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                · Major market fashion board
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AgencySection>
  );
}
