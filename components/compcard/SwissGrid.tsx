/* ═══════════════════════════════════════════════════════════════════
   CARD 3 — SWISS GRID
   Massimo Vignelli meets Helmut Lang. International Typographic Style.
   Pure geometric precision. Monospaced data. Zero ornamentation.
   The information IS the design.
   ═══════════════════════════════════════════════════════════════════ */

import { MODEL, MEASUREMENTS, PHOTOS } from "./CardData";

export default function SwissGrid() {
  return (
    <div
      style={{
        width: 400,
        height: 600,
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Top Rule — structural element ─────────────────── */}
      <div style={{ height: 4, backgroundColor: "#0a0a0a" }} />

      {/* ── Header Row — agency + comp card label ─────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 18px",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#0a0a0a",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          {MODEL.agency}
        </span>
        <span
          style={{
            fontSize: 8,
            fontWeight: 400,
            color: "#999999",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontFamily: "'SF Mono', 'Fira Code', Consolas, monospace",
          }}
        >
          CC—{MODEL.year}
        </span>
      </div>

      {/* ── Photo Grid — 2×2 precision layout ─────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gridTemplateRows: "1fr 1fr",
          height: 300,
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        {/* Primary — spans full left column */}
        <div style={{ gridRow: "1 / 3", borderRight: "1px solid #e5e5e5", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTOS.primary}
            alt={MODEL.fullName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 15%",
              display: "block",
            }}
          />
          {/* Index number — Swiss style */}
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 10,
              fontSize: 8,
              fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'SF Mono', 'Fira Code', Consolas, monospace",
              letterSpacing: "0.05em",
            }}
          >
            01
          </div>
        </div>

        {/* Secondary photos — right column stacked */}
        {PHOTOS.secondary.slice(0, 2).map((src, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              borderBottom: i === 0 ? "1px solid #e5e5e5" : "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 10,
                fontSize: 8,
                fontWeight: 400,
                color: "rgba(255,255,255,0.7)",
                fontFamily: "'SF Mono', 'Fira Code', Consolas, monospace",
              }}
            >
              0{i + 2}
            </div>
          </div>
        ))}
      </div>

      {/* ── Third secondary photo — full width strip ───────── */}
      <div
        style={{
          height: 55,
          position: "relative",
          borderBottom: "1px solid #e5e5e5",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTOS.secondary[2]}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 10,
            fontSize: 8,
            fontWeight: 400,
            color: "rgba(255,255,255,0.7)",
            fontFamily: "'SF Mono', 'Fira Code', Consolas, monospace",
          }}
        >
          04
        </div>
      </div>

      {/* ── Data Section ───────────────────────────────────── */}
      <div style={{ padding: "12px 18px 0" }}>
        {/* Name — large, tight, black */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 2 }}>
          <span
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#0a0a0a",
              textTransform: "uppercase",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {MODEL.firstName}
          </span>
          <span
            style={{
              fontSize: 26,
              fontWeight: 300,
              color: "#0a0a0a",
              textTransform: "uppercase",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {MODEL.lastName}
          </span>
        </div>

        {/* Location + availability */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 400,
              color: "#999999",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontFamily: "'SF Mono', 'Fira Code', Consolas, monospace",
            }}
          >
            {MODEL.city}
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: "#e5e5e5", marginBottom: 10 }} />

        {/* Measurements — horizontal data row, monospaced */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "6px 0",
          }}
        >
          {MEASUREMENTS.map(([label, value]) => (
            <div key={label}>
              <div
                style={{
                  fontSize: 7.5,
                  fontWeight: 400,
                  color: "#bbbbbb",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 2,
                  fontFamily: "'SF Mono', 'Fira Code', Consolas, monospace",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#0a0a0a",
                  fontFamily: "'SF Mono', 'Fira Code', Consolas, monospace",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Rule + Footer ──────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <div style={{ height: 1, backgroundColor: "#e5e5e5" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 18px",
          }}
        >
          <span
            style={{
              fontSize: 8,
              fontWeight: 400,
              color: "#999999",
              fontFamily: "'SF Mono', 'Fira Code', Consolas, monospace",
              letterSpacing: "0.02em",
            }}
          >
            {MODEL.website}
          </span>
          <span
            style={{
              fontSize: 8,
              fontWeight: 700,
              color: "#0a0a0a",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            COMP CARD
          </span>
        </div>
        <div style={{ height: 4, backgroundColor: "#0a0a0a" }} />
      </div>
    </div>
  );
}
