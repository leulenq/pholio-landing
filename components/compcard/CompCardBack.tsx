/* ═══════════════════════════════════════════════════════════════════
   COMP CARD — BACK
   The quiet reverse side: identity, measurements, and contact details.
   No photo grid, no labels, no heavy footer block.
   ═══════════════════════════════════════════════════════════════════ */

import { MODEL, MEASUREMENTS } from "./CardData";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function CompCardBack() {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden"
      style={{
        backgroundColor: "#FAF7F2",
        fontFamily: "var(--font-sans), system-ui, sans-serif",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
        style={{ backgroundImage: GRAIN, backgroundSize: "150px 150px", mixBlendMode: "multiply" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px"
        style={{ background: "linear-gradient(to right, transparent, #C9A55A, transparent)", opacity: 0.5 }}
      />

      {/* ── Header ───────────────────────────────────────── */}
      <div className="relative z-[2] flex items-start justify-between gap-4 px-5 pt-[18px]">
        <div>
          <div
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: 10,
              letterSpacing: "0.24em",
              color: "#C9A55A",
            }}
          >
            PHOLIO
          </div>
          <span
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: 19,
              letterSpacing: "-0.01em",
              color: "#1A1A1A",
            }}
          >
            {MODEL.firstName}{" "}
            <span style={{ fontStyle: "italic", color: "#C9A55A" }}>{MODEL.lastName}</span>
          </span>
        </div>
        <div
          className="pt-1 text-right"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 6.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(26,26,26,0.42)",
          }}
        >
          {MODEL.year}
        </div>
      </div>

      {/* ── Quiet identity field ─────────────────────────── */}
      <div className="relative z-[2] flex flex-1 flex-col justify-center px-5">
        <div className="h-px w-full" style={{ backgroundColor: "rgba(26,26,26,0.10)" }} />
        <div className="py-7">
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 7,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C9A55A",
              marginBottom: 10,
            }}
          >
            {MODEL.agency}
          </div>
          <div
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: 28,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#1A1A1A",
            }}
          >
            {MODEL.city}
          </div>
        </div>
        <div className="h-px w-full" style={{ backgroundColor: "rgba(26,26,26,0.10)" }} />
      </div>

      {/* ── Full measurement block ───────────────────────── */}
      <div className="relative z-[2] px-5">
        <div className="grid grid-cols-3 gap-x-2 gap-y-3">
          {MEASUREMENTS.map(([label, value]) => (
            <div
              key={label}
              className="pb-2"
              style={{
                borderBottom: "1px solid rgba(26,26,26,0.08)",
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

      {/* ── Contact footer ───────────────────────────────── */}
      <div className="relative z-[2] px-5 pb-[18px] pt-[17px]">
        <div className="h-px w-full" style={{ backgroundColor: "rgba(26,26,26,0.10)" }} />
        <div className="flex items-center justify-between gap-4 pt-3">
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
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 8,
              letterSpacing: "0.04em",
              color: "rgba(26,26,26,0.40)",
            }}
          >
            {MODEL.phone}
          </span>
        </div>
      </div>
    </div>
  );
}
