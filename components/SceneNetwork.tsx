"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LivingHeadline from "./LivingHeadline";
import { WorldMapSvg } from "./WorldMapSvg";

gsap.registerPlugin(ScrollTrigger);

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

/*
 * City coordinates in equirectangular 1000×500 space (matching WorldMapSvg viewBox).
 * Formula: x = (lon + 180) / 360 × 1000, y = (90 − lat) / 180 × 500
 */
interface CityDef {
  id: string;
  name: string;
  agencies: string;
  x: number;
  y: number;
}

const CITIES: CityDef[] = [
  { id: "ny",        name: "New York",    agencies: "180+", x: 294, y: 137 },
  { id: "la",        name: "Los Angeles", agencies: "95+",  x: 172, y: 155 },
  { id: "london",    name: "London",      agencies: "110+", x: 500, y: 107 },
  { id: "paris",     name: "Paris",       agencies: "88+",  x: 506, y: 114 },
  { id: "milan",     name: "Milan",       agencies: "72+",  x: 526, y: 124 },
  { id: "tokyo",     name: "Tokyo",       agencies: "65+",  x: 888, y: 151 },
  { id: "sydney",    name: "Sydney",      agencies: "40+",  x: 920, y: 344 },
  { id: "sao_paulo", name: "São Paulo",   agencies: "35+",  x: 371, y: 315 },
];

/* Long-distance connections only — short European links would be invisible at this scale */
const CONNECTIONS: Array<[string, string]> = [
  ["ny",     "london"   ],
  ["ny",     "la"       ],
  ["ny",     "sao_paulo"],
  ["london", "tokyo"    ],
  ["milan",  "tokyo"    ],
  ["tokyo",  "sydney"   ],
];

/* Quadratic bezier control points — arch toward lower y (visually above) */
const ARC_CP: Record<string, [number, number]> = {
  "ny-london":       [397,  65],
  "ny-la":           [233, 108],
  "ny-sao_paulo":    [325, 228],
  "london-tokyo":    [694,  42],
  "milan-tokyo":     [707,  75],
  "tokyo-sydney":    [920, 248],
};

export default function SceneNetwork() {
  const sectionRef    = useRef<HTMLElement>(null);
  const svgOverlayRef = useRef<SVGSVGElement>(null);
  const statsRef      = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !svgOverlayRef.current) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const arcs      = gsap.utils.toArray<SVGPathElement>(".arc-path",      svgOverlayRef.current);
      const dots      = gsap.utils.toArray<SVGCircleElement>(".city-dot",    svgOverlayRef.current);
      const rings     = gsap.utils.toArray<SVGCircleElement>(".city-ring",   svgOverlayRef.current);
      const statItems = gsap.utils.toArray<HTMLElement>(".city-stat-item",   statsRef.current ?? undefined);

      const st = {
        trigger: sectionRef.current,
        start: "top 65%",
        toggleActions: "play none none none",
      };

      if (prefersReduced) {
        gsap.set(arcs,      { strokeDashoffset: 0, opacity: 0.4 });
        gsap.set(dots,      { opacity: 1, scale: 1 });
        gsap.set(statItems, { opacity: 1 });
        return;
      }

      /* ── Arcs: measure then draw ─────────────────────────────── */
      arcs.forEach((arc) => {
        const len = arc.getTotalLength();
        gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      });

      gsap.to(arcs, {
        strokeDashoffset: 0,
        opacity: 0.45,
        duration: 2.4,
        stagger: 0.22,
        ease: "power2.inOut",
        delay: 0.3,
        scrollTrigger: st,
      });

      /* ── City dots ───────────────────────────────────────────── */
      gsap.fromTo(
        dots,
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.4)",
          delay: 1.1,
          scrollTrigger: st,
        }
      );

      /* ── Pulse rings: continuous ─────────────────────────────── */
      rings.forEach((ring, i) => {
        gsap.fromTo(
          ring,
          { scale: 0.6, opacity: 0.7, transformOrigin: "center center" },
          {
            scale: 3,
            opacity: 0,
            duration: 3,
            delay: 2.2 + i * 0.28,
            ease: "circ.out",
            repeat: -1,
          }
        );
      });

      /* ── Stats row ───────────────────────────────────────────── */
      gsap.fromTo(
        statItems,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          delay: 1.6,
          scrollTrigger: st,
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36"
      style={{ backgroundColor: "var(--color-ink)" }}
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Central ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
        aria-hidden="true"
        style={{
          width: 1400,
          height: 1000,
          background: "radial-gradient(circle, rgba(201,165,90,0.3) 0%, transparent 50%)",
        }}
      />

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center pb-14">
        <span
          className="mb-5 block text-xs tracking-[0.25em] uppercase font-semibold"
          style={{ color: "var(--color-gold)", fontFamily: "var(--font-mono)" }}
        >
          Global Network
        </span>
        <div style={{ color: "var(--color-cream)" }}>
          <LivingHeadline
            text="Direct Access."
            className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-5 tracking-tight"
            as="h2"
          />
        </div>
        <p
          className="mx-auto max-w-lg text-base md:text-lg leading-relaxed"
          style={{ color: "var(--color-cream)", opacity: 0.6 }}
        >
          Bypass cold emails and lost DMs. Connect directly with
          decision-makers across every major fashion market.
        </p>
      </div>

      {/* ── World Map ───────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-8">
        <div className="relative w-full" style={{ aspectRatio: "2 / 1" }}>

          {/* Continent base — WorldMapSvg in subtle gold tint */}
          <div
            className="absolute inset-0"
            style={{ color: "rgba(201, 165, 90, 0.09)" }}
          >
            <WorldMapSvg className="w-full h-full" />
          </div>

          {/* GSAP-animated overlay: arcs + city nodes, aligned to WorldMapSvg viewBox */}
          <svg
            ref={svgOverlayRef}
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {/* Connection arcs */}
            <g
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="1.2"
              strokeLinecap="round"
            >
              {CONNECTIONS.map(([fromId, toId], idx) => {
                const from = CITIES.find((c) => c.id === fromId);
                const to   = CITIES.find((c) => c.id === toId);
                if (!from || !to) return null;
                const key = `${fromId}-${toId}`;
                const cp  = ARC_CP[key] ?? [
                  (from.x + to.x) / 2,
                  (from.y + to.y) / 2 - 30,
                ];
                return (
                  <path
                    key={`arc-${idx}`}
                    className="arc-path"
                    d={`M${from.x},${from.y} Q${cp[0]},${cp[1]} ${to.x},${to.y}`}
                    opacity={0}
                  />
                );
              })}
            </g>

            {/* City nodes — dots and pulse rings only, no text */}
            {CITIES.map((city) => (
              <g key={city.id} transform={`translate(${city.x}, ${city.y})`}>
                <circle
                  className="city-ring"
                  cx="0" cy="0" r="7"
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth="0.7"
                  opacity="0"
                  style={{ willChange: "transform, opacity" }}
                />
                <circle
                  className="city-dot"
                  cx="0" cy="0" r="3"
                  fill="var(--color-gold)"
                  opacity="0"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* ── City Stats ──────────────────────────────────────────── */}
      <div
        ref={statsRef}
        className="relative z-10 mx-auto max-w-5xl px-6 md:px-8 mt-8"
      >
        <div
          className="grid grid-cols-4 md:grid-cols-8"
          style={{
            borderTop: "1px solid rgba(201, 165, 90, 0.12)",
          }}
        >
          {CITIES.map((city, i) => (
            <div
              key={city.id}
              className="city-stat-item flex flex-col items-center py-5 px-2 text-center opacity-0"
              style={{
                borderRight: i < CITIES.length - 1
                  ? "1px solid rgba(201, 165, 90, 0.12)"
                  : "none",
              }}
            >
              <span
                className="text-base md:text-lg mb-1"
                style={{
                  color: "var(--color-gold)",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                {city.agencies}
              </span>
              <span
                className="text-[0.58rem] tracking-[0.14em] uppercase leading-tight"
                style={{
                  color: "var(--color-cream)",
                  opacity: 0.45,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {city.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <div className="relative z-20 flex justify-center mt-14 md:mt-16">
        <a
          href={`${APP_URL}/signup`}
          className="group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 overflow-hidden transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #C9A55A 0%, #D4BC8A 100%)",
            color: "#050505",
            fontSize: "0.75rem",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            boxShadow: "0 8px 24px -8px rgba(201, 165, 90, 0.4)",
          }}
        >
          <span className="relative z-10">Join the Network</span>
          <span
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
          <div
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(135deg, #D4BC8A 0%, #E6D2A3 100%)",
            }}
          />
        </a>
      </div>
    </section>
  );
}
