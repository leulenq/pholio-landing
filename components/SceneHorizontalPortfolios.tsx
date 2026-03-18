"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Portfolio data ────────────────────────────────────────────────────────────
const PORTFOLIOS = [
  {
    name: "Elara Keats",
    location: "Los Angeles, CA",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop&crop=face",
  },
  {
    name: "Leul Enquanhone",
    location: "Dubai, UAE",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1200&fit=crop&crop=face",
  },
  {
    name: "Cruz Vega",
    location: "Mexico City, MX",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1200&fit=crop&crop=face",
  },
  {
    name: "Isabelle V.",
    location: "Paris, FR",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop&crop=face",
  },
  {
    name: "Kai Anderson",
    location: "Los Angeles, CA",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop&crop=face",
  },
  {
    name: "Sofia Rossi",
    location: "Milan, IT",
    img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=1200&fit=crop&crop=face",
  },
  {
    name: "Elena K.",
    location: "Berlin, DE",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1200&fit=crop&crop=face",
  },
  {
    name: "James H.",
    location: "Miami, FL",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1200&fit=crop&crop=face",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function SceneHorizontalPortfolios() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // ── Mobile / reduced-motion: skip GSAP, reveal all cards statically ──
      if (prefersReduced || window.innerWidth < 768) {
        gsap.set(".ph-card", { scale: 1, opacity: 1 });
        gsap.set(".ph-info", { autoAlpha: 1, yPercent: 0 });
        gsap.set(".ph-index", { autoAlpha: 1 });
        return;
      }

      const track = trackRef.current;
      // Total horizontal travel distance
      const scrollDistance = track.scrollWidth - window.innerWidth;
      if (scrollDistance <= 0) return;

      // ── Set initial states for all animated elements ──────────────────────
      // Cards start dim, small, and receded.
      // Photos start shifted right (will drift left as scrolled through).
      gsap.set(".ph-card", { scale: 0.78, opacity: 0.3 });
      gsap.set(".ph-info", { autoAlpha: 0, yPercent: 18 });
      gsap.set(".ph-index", { autoAlpha: 0 });
      gsap.set(".ph-photo", {
        scale: 1.28,
        xPercent: 8,
        transformOrigin: "center center",
      });

      // ── Master timeline — drives the horizontal scroll ────────────────────
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1.5, // intentional lag — gives weight like dragging prints
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              const parent = progressRef.current.parentElement;
              const maxTranslate = (parent?.clientWidth || 0) - 60;
              progressRef.current.style.transform = `translateY(-50%) translateX(${self.progress * maxTranslate}px)`;
            }
          },
        },
      });

      masterTl.to(track, { x: -scrollDistance, ease: "none" });

      // ── Per-card cinematic animations ─────────────────────────────────────
      track.querySelectorAll<HTMLElement>(".ph-card").forEach((card) => {
        const photo = card.querySelector<HTMLElement>(".ph-photo");
        const info = card.querySelector<HTMLElement>(".ph-info");

        // ── 1. Photo internal parallax ──────────────────────────────────────
        // Photo moves opposite to the card's direction at a slower rate —
        // creates depth, like a real photograph being carried past a window.
        // Photo also slightly zooms in as it approaches center (Ken Burns).
        if (photo) {
          gsap.fromTo(
            photo,
            { xPercent: 8, scale: 1.28 },
            {
              xPercent: -8,
              scale: 1.34,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: masterTl,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        }

        // ── 2. Scale arc — grows into center, shrinks out ───────────────────
        // Two equal-duration tweens in a single timeline so the peak (scale 1.0)
        // lands exactly when the card's center aligns with the viewport center.
        //   0 → 0.5 : card entering  → scale 0.78 → 1.0, brightness lifts
        //   0.5 → 1 : card leaving   → scale 1.0 → 0.78, brightness drops
        const arcTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: masterTl,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });

        arcTl
          .fromTo(
            card,
            { scale: 0.78, opacity: 0.3, boxShadow: "0 0 0px rgba(201,165,90,0)" },
            {
              scale: 1.0,
              opacity: 1.0,
              boxShadow: "0 0 80px rgba(201,165,90,0.3)",
              ease: "power2.out",
              duration: 0.5,
            },
          )
          .fromTo(
            card,
            { scale: 1.0, opacity: 1.0, boxShadow: "0 0 80px rgba(201,165,90,0.3)" },
            {
              scale: 0.78,
              opacity: 0.3,
              boxShadow: "0 0 0px rgba(201,165,90,0)",
              ease: "power2.in",
              duration: 0.5,
            },
          );

        // ── 3. Info reveal — rises into view as card approaches center ───────
        if (info) {
          gsap.fromTo(
            info,
            { yPercent: 18, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: masterTl,
                start: "left 68%",
                end: "left 28%",
                scrub: 0.8,
              },
            },
          );
        }

      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#040608", height: "100vh" }}
    >
      {/* ── Stage spotlight — warm radial at top center ──────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{
          height: "55%",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,169,110,0.04) 0%, transparent 100%)",
        }}
      />

      {/* ── Center focus hairline — subtle 1px vertical indicator ───── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 z-30 hidden md:block"
        style={{
          width: "1px",
          marginLeft: "-0.5px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(200,169,110,0.07) 15%, rgba(200,169,110,0.07) 85%, transparent 100%)",
        }}
      />



      {/* ── Bottom scroll progress bar ───────────────────────── */}
      <div
        className="absolute bottom-10 left-0 right-0 z-20 hidden md:block"
        style={{
          paddingLeft: "clamp(60px, 8vw, 120px)",
          paddingRight: "clamp(60px, 8vw, 120px)",
        }}
      >
        <div
          className="relative w-full"
          style={{
            height: "1px",
            backgroundColor: "#1e293b",
            marginTop: "24px",
          }}
        >
          <div
            ref={progressRef}
            className="absolute top-1/2 left-0 pointer-events-none"
            style={{
              width: "60px",
              height: "2px",
              backgroundColor: "#C9A55A",
              borderRadius: "2px",
              transform: "translateY(-50%) translateX(0px)",
              // disable transitions on transform to prevent lag during scrub
              willChange: "transform",
            }}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          DESKTOP — GSAP horizontal scroll track
          Cards are absolutely positioned side-by-side.
          GSAP pins the section and drives x translation.
          ══════════════════════════════════════════════════════════════ */}
      <div
        ref={trackRef}
        className="absolute inset-0 hidden md:flex items-center"
        style={{
          gap: "3px",
          paddingLeft: "clamp(60px, 8vw, 120px)",
          paddingRight: "clamp(60px, 8vw, 120px)",
          paddingTop: "13vh",
          paddingBottom: "13vh",
        }}
      >
        {PORTFOLIOS.map((talent, i) => (
          <div
            key={talent.name}
            className="ph-card relative flex-shrink-0 overflow-hidden cursor-pointer"
            style={{
              width: "clamp(280px, 28vw, 400px)",
              height: "100%",
              borderRadius: "12px",
              // will-change tells the browser to promote these to GPU layers
              willChange: "transform, opacity",
            }}
          >
            {/* Photo: oversized (scale 1.28+ via GSAP) and drifts horizontally */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={talent.img}
              alt={talent.name}
              className="ph-photo absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "50% 12%", willChange: "transform" }}
              loading="lazy"
            />

            {/* Cinematic gradient — subtle at bottom for text contrast */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 30%, transparent 60%)",
              }}
            />


            {/* Talent info block — GSAP-revealed */}
            <div
              className="ph-info absolute bottom-8 left-8 right-8"
              style={{ opacity: 0 /* GSAP will drive autoAlpha */ }}
            >
              {/* Talent name — large editorial serif */}
              <h3
                className="font-editorial leading-[1.1] mb-2"
                style={{
                  color: "white",
                  fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                }}
              >
                {talent.name}
              </h3>

              {/* Location label */}
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9A55A",
                }}
              >
                {talent.location}
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE — CSS scroll-snap gallery
          No JavaScript needed. Native feel, momentum scrolling.
          ══════════════════════════════════════════════════════════════ */}
      <div
        className="md:hidden absolute inset-0 flex items-center"
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          gap: "3px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "88px",
          paddingBottom: "24px",
          // Hide native scrollbar on mobile
          scrollbarWidth: "none",
        }}
      >
        {PORTFOLIOS.map((talent, i) => (
          <div
            key={talent.name}
            className="relative flex-shrink-0 overflow-hidden cursor-pointer"
            style={{
              width: "78vw",
              height: "64vh",
              borderRadius: "12px",
              scrollSnapAlign: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={talent.img}
              alt={talent.name}
              className="h-full w-full object-cover"
              style={{ objectPosition: "50% 12%" }}
              loading={i < 2 ? "eager" : "lazy"}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 30%, transparent 60%)",
              }}
            />
            <div className="absolute bottom-6 left-6 right-6">
              <h3
                className="font-editorial leading-[1.1] mb-2"
                style={{
                  color: "white",
                  fontSize: "1.75rem",
                }}
              >
                {talent.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9A55A",
                }}
              >
                {talent.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
