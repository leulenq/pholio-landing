"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LivingHeadlineProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  stagger?: number;
  start?: string;
}

export default function LivingHeadline({
  text,
  className = "",
  as: Tag = "h2",
  stagger = 0.03,
  start = "top 85%",
}: LivingHeadlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        gsap.set(containerRef.current.querySelectorAll(".word"), {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const words = containerRef.current.querySelectorAll(".word");

      gsap.fromTo(
        words,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const words = text.split(" ");

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {words.map((word, i) => (
          <span key={i} className="word inline-block opacity-0 mr-[0.3em]">
            {word}
          </span>
        ))}
      </Tag>
    </div>
  );
}
