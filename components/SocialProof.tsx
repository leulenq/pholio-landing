"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
}

function AnimatedStat({ value, suffix, label, active }: StatProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setDisplay(start);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [active, value]);

  return (
    <div className="text-center">
      <div className="flex items-baseline justify-center gap-1">
        <span className="font-editorial text-5xl sm:text-6xl md:text-7xl">
          {display.toLocaleString()}
        </span>
        <span
          className="font-editorial text-3xl sm:text-4xl"
          style={{ color: "var(--color-gold)" }}
        >
          {suffix}
        </span>
      </div>
      <p className="mt-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
        {label}
      </p>
    </div>
  );
}

const STATS = [
  { value: 1200, suffix: "+", label: "Active Portfolios" },
  { value: 89, suffix: "%", label: "Agency Response Rate" },
  { value: 340, suffix: "+", label: "Partner Agencies" },
];

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="relative">
              <AnimatedStat
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                active={inView}
              />
              {/* Gold accent dot */}
              <div
                className="mx-auto mt-4 h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-gold)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
