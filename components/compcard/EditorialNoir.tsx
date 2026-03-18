import { MODEL, MEASUREMENTS, PHOTOS } from "./CardData";

const MEAS_LEFT  = [MEASUREMENTS[0], MEASUREMENTS[2], MEASUREMENTS[4]];
const MEAS_RIGHT = [MEASUREMENTS[1], MEASUREMENTS[3], MEASUREMENTS[5]];

export default function MinimalEditorial() {
  return (
    <div
      style={{
        width: 400,
        height: 600,
        backgroundColor: "#FAFAFA",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        border: "1px solid #E0E0E0",
      }}
    >
      {/* ── Primary Photo — top 58% ──────────────────────── */}
      <div style={{ height: "58%", position: "relative" }}>
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
        {/* Subtle gradient fade at bottom of photo */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 48,
            background: "linear-gradient(to bottom, transparent, #FAFAFA)",
          }}
        />
      </div>

      {/* ── Info Block ───────────────────────────────────── */}
      <div style={{ padding: "8px 24px 0" }}>
        {/* Name */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 400,
            color: "#111111",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            lineHeight: 1.1,
            marginBottom: 4,
          }}
        >
          {MODEL.firstName}{" "}
          <span style={{ fontStyle: "italic", color: "#888888" }}>
            {MODEL.lastName}
          </span>
        </div>

        {/* Agency + City */}
        <div
          style={{
            fontSize: 9,
            color: "#AAAAAA",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {MODEL.agency} · {MODEL.city}
        </div>

        {/* Thin full-width rule */}
        <div style={{ height: "0.5px", backgroundColor: "#CCCCCC", marginBottom: 12 }} />

        {/* Measurements — 2 column */}
        <div style={{ display: "flex", gap: 0 }}>
          {[MEAS_LEFT, MEAS_RIGHT].map((col, ci) => (
            <div
              key={ci}
              style={{
                flex: 1,
                borderLeft: ci === 1 ? "0.5px solid #DDDDDD" : undefined,
                paddingLeft: ci === 1 ? 16 : 0,
                paddingRight: ci === 0 ? 16 : 0,
              }}
            >
              {col.map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                  }}
                >
                  <span
                    style={{
                      fontSize: 8,
                      color: "#AAAAAA",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: "#222222",
                      fontWeight: 400,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Bar — clean black strip ───────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 32,
          backgroundColor: "#111111",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <span style={{ fontSize: 8, color: "#888888", letterSpacing: "0.1em" }}>
          {MODEL.email}
        </span>
        <span
          style={{
            fontSize: 8,
            color: "#FFFFFF",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
          }}
        >
          {MODEL.website}
        </span>
      </div>
    </div>
  );
}
