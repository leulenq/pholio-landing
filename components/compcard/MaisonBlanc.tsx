import { MODEL, MEASUREMENTS, PHOTOS } from "./CardData";

export default function CommercialWarm() {
  const ACCENT = "#C1580C"; // terracotta

  return (
    <div
      style={{
        width: 400,
        height: 600,
        backgroundColor: "#F5F0EA",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
        display: "flex",
      }}
    >
      {/* ── Left Accent Bar ──────────────────────────────── */}
      <div
        style={{
          width: 6,
          backgroundColor: ACCENT,
          flexShrink: 0,
        }}
      />

      {/* ── Main Content ─────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Primary Photo */}
        <div style={{ height: "54%", position: "relative" }}>
          <img
            src={PHOTOS.primary}
            alt={MODEL.fullName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 10%",
              display: "block",
            }}
          />
          {/* Agency tag overlay */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: ACCENT,
              padding: "3px 10px",
              borderRadius: 1,
            }}
          >
            <span
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {MODEL.agency}
            </span>
          </div>
        </div>

        {/* Secondary Photo Strip */}
        <div style={{ display: "flex", height: 70, gap: 3, padding: "3px 0" }}>
          {PHOTOS.secondary.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              style={{
                flex: 1,
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ))}
        </div>

        {/* Info Block */}
        <div style={{ padding: "10px 16px 0" }}>
          {/* Name */}
          <div
            style={{
              fontSize: 27,
              fontWeight: 800,
              color: "#1A1A1A",
              letterSpacing: "-0.01em",
              lineHeight: 1,
              marginBottom: 2,
            }}
          >
            {MODEL.firstName.toUpperCase()}
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: ACCENT,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            {MODEL.city}
          </div>

          {/* Stats row — horizontal */}
          <div
            style={{
              display: "flex",
              gap: 0,
              borderTop: `1.5px solid ${ACCENT}`,
              paddingTop: 8,
            }}
          >
            {MEASUREMENTS.map(([label, value], i) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  textAlign: "center",
                  borderLeft: i > 0 ? "1px solid #DDCFC4" : undefined,
                  padding: "0 4px",
                }}
              >
                <div
                  style={{
                    fontSize: 8,
                    color: "#999999",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 2,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#1A1A1A",
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom contact */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 6,
            right: 0,
            height: 30,
            backgroundColor: "#1A1A1A",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
          }}
        >
          <span style={{ fontSize: 8, color: "#888888", letterSpacing: "0.08em" }}>
            {MODEL.phone}
          </span>
          <span style={{ fontSize: 8, color: "#F5F0EA", letterSpacing: "0.12em" }}>
            {MODEL.website}
          </span>
        </div>
      </div>
    </div>
  );
}
