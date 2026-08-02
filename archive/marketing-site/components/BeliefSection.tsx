"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { EditorialVerticalDivider } from "@/components/EditorialVerticalDivider";

export default function BeliefSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 72%", "start 22%"],
  });
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 1],
    [0, 0, 1]
  );
  const headingY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[60vh] items-center justify-center px-6 py-32"
      style={{ backgroundColor: "#050505" }}
    >
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tight"
          style={{
            color: "#FFFFFF",
            opacity: prefersReducedMotion ? 1 : headingOpacity,
            y: prefersReducedMotion ? 0 : headingY,
          }}
          initial={false}
        >
          We believe your career should be defined by your{" "}
          <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>
            face
          </span>
          ,
          <br className="hidden md:block" /> not your{" "}
          <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>
            formatting.
          </span>
        </motion.h2>

        <EditorialVerticalDivider
          animation={prefersReducedMotion ? "none" : "reveal"}
          className="mx-auto mt-16"
          height={100}
          revealed={Boolean(prefersReducedMotion || inView)}
        />
      </div>
    </section>
  );
}
