/* ═══════════════════════════════════════════════════════════════════
   CARD 4 — VELVET RUNWAY (landing reference)
   Full-bleed portrait, agency strip, thumbnail stack, editorial name + stats.
   Fills parent; parent sets size (aspect 2/3).
   ═══════════════════════════════════════════════════════════════════ */

import { MODEL, MEASUREMENTS, PHOTOS } from "./CardData";

export default function VelvetRunway() {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[10px] shadow-2xl"
      style={{
        backgroundColor: "#000000",
        fontFamily: "var(--font-sans), system-ui, sans-serif",
        boxShadow:
          "0 48px 100px -24px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PHOTOS.primary}
        alt={MODEL.fullName}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center 12%" }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.45) 28%, rgba(0,0,0,0.12) 52%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      {/* Agency */}
      <div
        className="absolute left-0 right-0 top-0 z-[2] flex items-center justify-between px-5 pb-2 pt-5 md:px-6 md:pt-6"
      >
        <span
          className="text-[8px] font-medium uppercase tracking-[0.28em] text-white/55 md:text-[9px]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {MODEL.agency}
        </span>
      </div>

      {/* Thumbnail strip */}
      <div
        className="absolute right-3 top-[52px] z-[2] flex flex-col gap-1 md:right-4 md:top-14 md:gap-1.5"
      >
        {PHOTOS.secondary.map((src, i) => (
          <div
            key={i}
            className="h-11 w-11 overflow-hidden border border-white/15 md:h-[52px] md:w-[52px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      {/* Bottom overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] px-5 pb-5 pt-2 md:px-6 md:pb-6">
        <div className="mb-1 md:mb-2">
          <span
            className="font-editorial text-[clamp(1.75rem,5.5vw,2.35rem)] font-normal leading-[1.02] tracking-[-0.02em] text-white"
          >
            {MODEL.firstName}
          </span>
          <span
            className="font-editorial-italic text-[clamp(1.75rem,5.5vw,2.35rem)] leading-[1.02] tracking-[-0.02em]"
            style={{ color: "var(--color-gold)" }}
          >
            {" "}
            {MODEL.lastName}
          </span>
        </div>

        <p
          className="mb-4 text-[8px] font-normal uppercase tracking-[0.18em] text-white/45 md:mb-5 md:text-[9px] md:tracking-[0.2em]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {MODEL.city}
        </p>

        <div
          className="mb-3 h-px w-9 md:mb-4 md:w-10"
          style={{
            background: "linear-gradient(to right, var(--color-gold), transparent)",
          }}
        />

        {/* Stats — single horizontal row */}
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 md:mb-5 md:gap-x-5">
          {MEASUREMENTS.map(([label, value]) => (
            <div key={label} className="flex items-baseline gap-1.5">
              <span
                className="text-[7px] font-normal uppercase tracking-[0.1em] text-white/35 md:text-[8px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {label}
              </span>
              <span
                className="text-[9px] font-semibold text-white/90 md:text-[10px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-between border-t border-white/[0.09] pt-3 md:pt-3.5"
        >
          <span
            className="text-[7px] font-normal tracking-[0.08em] md:text-[8px]"
            style={{
              fontFamily: "var(--font-mono), monospace",
              color: "var(--color-gold)",
            }}
          >
            {MODEL.website}
          </span>
          <span
            className="text-[7px] font-normal uppercase tracking-[0.14em] text-white/30 md:text-[7.5px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Comp Card {MODEL.year}
          </span>
        </div>
      </div>
    </div>
  );
}
