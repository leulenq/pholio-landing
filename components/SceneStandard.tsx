"use client";

import { useRef } from "react";
import LivingHeadline from "./LivingHeadline";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SceneStandard() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) return;

      // Gold glow pulse
      gsap.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.15,
          scale: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Label line animation
      gsap.fromTo(
        labelRef.current?.querySelectorAll(".accent-line") || [],
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: "var(--color-ink)" }}
    >
      {/* Gold radial glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,110,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Label with gold accent lines */}
        <div
          ref={labelRef}
          className="mb-12 flex items-center justify-center gap-6"
        >
          <div
            className="accent-line h-[1px] w-16 origin-right"
            style={{ backgroundColor: "var(--color-gold)" }}
          />
          <span className="text-label" style={{ color: "var(--color-gold)" }}>
            The New Paradigm
          </span>
          <div
            className="accent-line h-[1px] w-16 origin-left"
            style={{ backgroundColor: "var(--color-gold)" }}
          />
        </div>

        <div style={{ color: "var(--color-cream)" }}>
          <LivingHeadline
            text="Pholio is the industry standard."
            className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8"
            as="h2"
          />
        </div>

        <p
          className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed"
          style={{ color: "var(--color-text-on-dark-muted)" }}
        >
          The era of PDF attachments and lost DMs is over. Pholio gives talent
          the tools to present themselves like the professionals they are — and
          gives agencies the confidence to book them.
        </p>
      </div>

      {/* Gradient transition to cream */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-cream))",
        }}
      />
    </section>
  );
}
