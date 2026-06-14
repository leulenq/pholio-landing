/* ═══════════════════════════════════════════════════════════════════
   CompCard — the printed artifact, ported from
   pholio-landing/components/compcard/CompCardFront.tsx.
   Cream paper, framed grayscale portrait, serif name with one italic-gold
   word, the gold sweep, mono measurements. 2:3. Sizes scale with `width`.
   ═══════════════════════════════════════════════════════════════════ */

import { Img, staticFile } from "remotion";
import { FONT } from "../fonts";
import { COLOR } from "../theme";
import { MODEL, MEASUREMENTS, PORTRAIT } from "../data";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const STATS = MEASUREMENTS.slice(0, 6);

export const CompCard: React.FC<{ width?: number }> = ({ width = 440 }) => {
  const r = width / 300; // original card was authored ~300px wide
  const px = 20 * r;

  return (
    <div
      style={{
        position: "relative",
        width,
        height: width * 1.5,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: COLOR.cream,
        fontFamily: FONT.sans,
        boxShadow: "0 40px 90px -30px rgba(5,5,5,0.55)",
      }}
    >
      {/* paper grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          opacity: 0.04,
          backgroundImage: GRAIN,
          backgroundSize: `${150 * r}px ${150 * r}px`,
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />
      {/* letterhead gold hairline */}
      <div
        style={{
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: 1,
          zIndex: 2,
          background: `linear-gradient(to right, transparent, ${COLOR.gold}, transparent)`,
          opacity: 0.5,
        }}
      />

      {/* Letterhead */}
      <div style={{ position: "relative", zIndex: 2, padding: `${15 * r}px ${px}px 0` }}>
        <span style={{ fontFamily: FONT.serif, fontSize: 12 * r, letterSpacing: "0.24em", color: COLOR.gold }}>
          PHOLIO
        </span>
        <div
          style={{
            height: 1,
            width: 28 * r,
            marginTop: 3 * r,
            background: `linear-gradient(to right, ${COLOR.gold}, rgba(201,165,90,0))`,
          }}
        />
      </div>

      {/* Portrait — framed, grayscale */}
      <div style={{ position: "relative", zIndex: 2, flex: 1, padding: `${12 * r}px ${px}px 0` }}>
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            overflow: "hidden",
            border: `1px solid ${COLOR.ink12}`,
            borderRadius: 2,
          }}
        >
          <Img
            src={staticFile(PORTRAIT)}
            style={{
              position: "absolute",
              inset: 0,
              height: "100%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "50% 24%",
              filter: "grayscale(1) contrast(1.04)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(201,165,90,0.05) 0%, transparent 24%, rgba(5,5,5,0.08) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.05,
              mixBlendMode: "overlay",
              backgroundImage: GRAIN,
              backgroundSize: `${160 * r}px ${160 * r}px`,
            }}
          />
        </div>
      </div>

      {/* Identity */}
      <div style={{ position: "relative", zIndex: 2, padding: `${15 * r}px ${px}px 0` }}>
        <div style={{ fontFamily: FONT.serif, fontSize: 30 * r, lineHeight: 1, letterSpacing: "-0.015em", color: "#1A1A1A" }}>
          {MODEL.firstName}{" "}
          <span style={{ fontStyle: "italic", color: COLOR.gold }}>{MODEL.lastName}</span>
        </div>
        <div
          style={{
            marginTop: 8 * r,
            fontFamily: FONT.mono,
            fontSize: 8 * r,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLOR.ink42,
          }}
        >
          {MODEL.agency} · {MODEL.city}
        </div>
        <div
          style={{
            marginTop: 12 * r,
            height: 1,
            width: 56 * r,
            background: `linear-gradient(to right, ${COLOR.gold}, rgba(201,165,90,0))`,
          }}
        />
        <div style={{ marginTop: 12 * r, display: "flex" }}>
          {STATS.map(([label, value], i) => (
            <div
              key={label}
              style={{
                flex: 1,
                borderLeft: i > 0 ? `1px solid ${COLOR.ink10}` : undefined,
                paddingLeft: i > 0 ? 8 * r : 0,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 6.5 * r,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: COLOR.gold,
                  marginBottom: 3 * r,
                }}
              >
                {label}
              </div>
              <div style={{ fontFamily: FONT.mono, fontSize: 10.5 * r, color: "#1A1A1A" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 2, marginTop: 15 * r, padding: `0 ${px}px ${16 * r}px` }}>
        <div style={{ height: 1, width: "100%", backgroundColor: COLOR.ink10 }} />
        <div style={{ paddingTop: 10 * r }}>
          <span style={{ fontFamily: FONT.mono, fontSize: 8 * r, letterSpacing: "0.04em", color: COLOR.goldDark }}>
            {MODEL.website}
          </span>
        </div>
      </div>
    </div>
  );
};
