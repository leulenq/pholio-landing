/* ═══════════════════════════════════════════════════════════════════
   CARD 4 — VELVET RUNWAY
   Full-bleed cinematic. Inspired by Saint Laurent campaign prints
   and Tom Ford–era Gucci lookbooks. The image IS the card.
   Data is overlaid with extreme restraint — it breathes on the photo.
   ═══════════════════════════════════════════════════════════════════ */

import { MODEL, MEASUREMENTS, PHOTOS } from "./CardData";

export default function VelvetRunway() {
  return (
    <div
      style={{
        width: 400,
        height: 600,
        backgroundColor: "#000000",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Full-bleed Primary Photo ───────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PHOTOS.primary}
        alt={MODEL.fullName}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 10%",
        }}
      />

      {/* ── Cinematic gradient — bottom heavy ──────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* ── Film grain ─────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
          pointerEvents: "none",
        }}
      />

      {/* ── TOP — Agency mark + Availability ───────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 500,
            color: "rgba(255,255,255,0.6)",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
          }}
        >
          {MODEL.agency}
        </span>
      </div>

      {/* ── Secondary Photos — vertical strip on right edge ── */}
      <div
        style={{
          position: "absolute",
          top: 45,
          right: 14,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          zIndex: 2,
        }}
      >
        {PHOTOS.secondary.map((src, i) => (
          <div
            key={i}
            style={{
              width: 52,
              height: 52,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.12)",
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
          </div>
        ))}
      </div>

      {/* ── BOTTOM — Name + Data overlay ───────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 20px 18px",
          zIndex: 2,
        }}
      >
        {/* Name — massive, editorial */}
        <div style={{ marginBottom: 4 }}>
          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 36,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginBottom: 2,
            }}
          >
            {MODEL.firstName}
          </div>
          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 36,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#C9A55A",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {MODEL.lastName}
          </div>
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: 9,
            fontWeight: 400,
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: 16,
          }}
        >
          {MODEL.city}
        </div>

        {/* Thin gold line */}
        <div
          style={{
            width: 40,
            height: 1,
            background: "linear-gradient(to right, #C9A55A, transparent)",
            marginBottom: 14,
          }}
        />

        {/* Measurements — inline horizontal flow */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0 16px",
            marginBottom: 16,
          }}
        >
          {MEASUREMENTS.map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 5,
                paddingBottom: 5,
              }}
            >
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Footer — website + comp card year */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 10,
          }}
        >
          <span
            style={{
              fontSize: 8,
              fontWeight: 400,
              color: "#C9A55A",
              letterSpacing: "0.06em",
              fontFamily: "'SF Mono', 'Fira Code', Consolas, monospace",
            }}
          >
            {MODEL.website}
          </span>
          <span
            style={{
              fontSize: 7.5,
              fontWeight: 400,
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Comp Card {MODEL.year}
          </span>
        </div>
      </div>
    </div>
  );
}
