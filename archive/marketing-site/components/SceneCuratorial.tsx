"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHOTOS = [
  { id: 1, selected: true, url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop" },
  { id: 2, selected: false, url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop" },
  { id: 3, selected: true, url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=400&fit=crop" },
  { id: 4, selected: false, url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop" },
  { id: 5, selected: true, url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop" },
];

const FEATURES = [
  { label: "Image Analysis", desc: "Composition, lighting, and expression scoring" },
  { label: "Market Matching", desc: "Aligned to current industry demand" },
  { label: "Portfolio Optimization", desc: "Automatic best-angle selection" },
];

export default function SceneCuratorial() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !gridRef.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) return;

      const photos = gridRef.current.querySelectorAll(".photo-card");
      const selected = gridRef.current.querySelectorAll(".photo-card.selected");
      const unselected = gridRef.current.querySelectorAll(".photo-card:not(.selected)");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1,
        },
      });

      // Phase 1: All photos visible (chaotic)
      tl.fromTo(
        photos,
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.05, duration: 0.3 }
      );

      // Phase 2: Unselected fade/blur out
      tl.to(
        unselected,
        { opacity: 0.15, filter: "blur(4px) grayscale(100%)", scale: 0.9, duration: 0.3 },
        "+=0.2"
      );

      // Phase 3: Selected get gold border + scale
      tl.to(
        selected,
        { scale: 1.05, duration: 0.3 },
        "-=0.1"
      );

      // Phase 4: Score card appears
      tl.fromTo(
        scoreRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3 },
        "-=0.1"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-cream-warm)" }}
    >
      <div className="mx-auto flex h-screen max-w-7xl items-center px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center w-full">
          {/* Left: Narrative */}
          <div>
            <span className="text-label mb-4 block" style={{ color: "var(--color-gold)" }}>
              AI Curation
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl mb-6">
              Your portfolio,{" "}
              <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>
                curated.
              </span>
            </h2>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Our AI analyzes composition, lighting, and market fit to ensure
              every angle is your best angle. No more guesswork — just a
              portfolio that gets you noticed.
            </p>

            <div className="space-y-4">
              {FEATURES.map((f) => (
                <div key={f.label} className="flex items-start gap-3">
                  <div
                    className="mt-1.5 h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: "var(--color-gold)" }}
                  />
                  <div>
                    <p className="font-medium text-sm">{f.label}</p>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Photo Grid */}
          <div className="relative">
            <div
              ref={gridRef}
              className="grid grid-cols-3 gap-3 md:gap-4"
            >
              {PHOTOS.map((photo) => (
                <div
                  key={photo.id}
                  className={`photo-card relative aspect-[3/4] overflow-hidden rounded-lg ${
                    photo.selected ? "selected" : ""
                  }`}
                  style={{
                    border: photo.selected
                      ? "2px solid var(--color-gold)"
                      : "2px solid transparent",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt="Portfolio sample"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {photo.selected && (
                    <div
                      className="absolute top-2 right-2 h-5 w-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--color-gold)" }}
                    >
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="var(--color-velvet)"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Score Card */}
            <div
              ref={scoreRef}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 rounded-xl p-5 opacity-0 shadow-xl"
              style={{ backgroundColor: "white" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-label text-xs" style={{ color: "var(--color-text-muted)" }}>
                  Curation Score
                </span>
                <span
                  className="text-xl font-semibold"
                  style={{ color: "var(--color-gold-dark)" }}
                >
                  98/100
                </span>
              </div>
              <div
                className="h-1.5 w-full rounded-full"
                style={{ backgroundColor: "var(--color-cream-dark)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "98%",
                    background:
                      "linear-gradient(to right, var(--color-gold), var(--color-gold-light))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
