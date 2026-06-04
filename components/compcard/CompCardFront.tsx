/* ═══════════════════════════════════════════════════════════════════
   COMP CARD — FRONT (canonical)
   The printed artifact. Cream paper, framed grayscale portrait, serif
   name with one italic-gold word, the gold sweep, mono measurements.
   Fills its parent; parent sets the 2:3 frame.
   ═══════════════════════════════════════════════════════════════════ */

import { MODEL, MEASUREMENTS, PORTRAIT } from "./CardData";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const FRONT_STATS = MEASUREMENTS.slice(0, 6);

export default function CompCardFront() {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden"
      style={{
        backgroundColor: "#FAF7F2",
        fontFamily: "var(--font-sans), system-ui, sans-serif",
      }}
    >
      {/* paper grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
        style={{ backgroundImage: GRAIN, backgroundSize: "150px 150px", mixBlendMode: "multiply" }}
      />
      {/* letterhead gold hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px"
        style={{ background: "linear-gradient(to right, transparent, #C9A55A, transparent)", opacity: 0.5 }}
      />

      {/* ── Letterhead ───────────────────────────────────── */}
      <div className="relative z-[2] flex flex-col gap-[3px] px-5 pt-[15px]">
        <span
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: 12,
            letterSpacing: "0.24em",
            color: "#C9A55A",
          }}
        >
          PHOLIO
        </span>
        <span
          className="h-px w-7"
          style={{ background: "linear-gradient(to right, #C9A55A, rgba(201,165,90,0))" }}
        />
      </div>

      {/* ── Portrait (framed, grayscale) ─────────────────── */}
      <div className="relative z-[2] flex-1 px-5 pt-3">
        <div
          className="relative h-full w-full overflow-hidden"
          style={{ border: "1px solid rgba(26,26,26,0.12)", borderRadius: 2 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PORTRAIT}
            alt={MODEL.fullName}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 24%", filter: "grayscale(1) contrast(1.04)" }}
          />
          {/* warm tone + grain over the photo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(201,165,90,0.05) 0%, transparent 24%, rgba(5,5,5,0.08) 100%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
            style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px" }}
          />
        </div>
      </div>

      {/* ── Identity ─────────────────────────────────────── */}
      <div className="relative z-[2] px-5 pt-[15px]">
        <div
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: 30,
            lineHeight: 1.0,
            letterSpacing: "-0.015em",
            color: "#1A1A1A",
          }}
        >
          {MODEL.firstName}{" "}
          <span style={{ fontStyle: "italic", color: "#C9A55A" }}>{MODEL.lastName}</span>
        </div>

        <div
          className="mt-2"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 8,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(26,26,26,0.42)",
          }}
        >
          {MODEL.agency} · {MODEL.city}
        </div>

        {/* the gold sweep */}
        <div
          className="mt-3 h-px w-14"
          style={{ background: "linear-gradient(to right, #C9A55A, rgba(201,165,90,0))" }}
        />

        {/* measurements */}
        <div className="mt-3 flex">
          {FRONT_STATS.map(([label, value], i) => (
            <div
              key={label}
              className="flex-1"
              style={{
                borderLeft: i > 0 ? "1px solid rgba(26,26,26,0.10)" : undefined,
                paddingLeft: i > 0 ? 8 : 0,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 6.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#C9A55A",
                  marginBottom: 3,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 10.5,
                  color: "#1A1A1A",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────── */}
      <div className="relative z-[2] mt-[15px] px-5 pb-[16px]">
        <div className="h-px w-full" style={{ backgroundColor: "rgba(26,26,26,0.10)" }} />
        <div className="pt-2.5">
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 8,
              letterSpacing: "0.04em",
              color: "#A8894E",
            }}
          >
            {MODEL.website}
          </span>
        </div>
      </div>
    </div>
  );
}
