/* ═══════════════════════════════════════════════════════════════════
   DashboardStill — a faithful recreation of pholio-app's talent studio
   overview (TalentLayout top bar + OverviewPage hero). Cream ground,
   PHOLIO lockup, top nav, greeting, KPI tiles that count up, the
   agency-interest list ("who's looking"), and the portfolio book strip.
   Built to the brand system — not a screenshot.
   ═══════════════════════════════════════════════════════════════════ */

import { Img, staticFile, useCurrentFrame, interpolate } from "remotion";
import { FONT } from "../fonts";
import { COLOR } from "../theme";
import { MODEL } from "../data";
import { arrive } from "./anim";

const NAV = ["Overview", "Analytics", "Applications", "Media", "Profile", "Settings"];

const KPIS = [
  { label: "Profile Views", target: 12480, delta: "+18%", fmt: (n: number) => Math.round(n).toLocaleString() },
  { label: "Readiness", target: 96, delta: "Complete", fmt: (n: number) => `${Math.round(n)}%` },
  { label: "Applications", target: 7, delta: "3 active", fmt: (n: number) => `${Math.round(n)}` },
];

const INTEREST = [
  { name: "Metro Models", action: "Viewed your card", time: "2h" },
  { name: "Elite London", action: "Saved your profile", time: "1d" },
  { name: "IMG Worldwide", action: "Viewed your card", time: "2d" },
  { name: "Storm Mgmt", action: "Requested rates", time: "4d" },
];

const BARS = [42, 55, 38, 61, 70, 58, 84];
const BOOK = ["50% 22%", "50% 30%", "50% 16%", "50% 38%", "50% 26%"];

const CountUp: React.FC<{ kpi: (typeof KPIS)[number]; start: number }> = ({ kpi, start }) => {
  const frame = useCurrentFrame();
  const p = arrive(frame, start, 44);
  return <>{kpi.fmt(kpi.target * p)}</>;
};

export const DashboardStill: React.FC = () => {
  const frame = useCurrentFrame();
  const hairline = (extra?: React.CSSProperties) => ({ height: 1, background: COLOR.ink10, ...extra });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOR.creamApp,
        display: "flex",
        flexDirection: "column",
        fontFamily: FONT.sans,
        color: "#161616",
        overflow: "hidden",
      }}
    >
      {/* ── Top bar ───────────────────────────────────────── */}
      <div
        style={{
          height: 76,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 40px",
          borderBottom: `1px solid ${COLOR.ink10}`,
          gap: 40,
        }}
      >
        <span style={{ fontFamily: FONT.serif, fontSize: 22, fontWeight: 600, letterSpacing: "0.22em", color: "#161616" }}>
          PHOLIO
        </span>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {NAV.map((item, i) => (
            <div key={item} style={{ position: "relative" }}>
              <span
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 14,
                  fontWeight: i === 0 ? 500 : 400,
                  color: i === 0 ? "#161616" : "rgba(22,22,22,0.42)",
                }}
              >
                {item}
              </span>
              {i === 0 && (
                <div style={{ position: "absolute", left: 0, right: 0, bottom: -27, height: 2, background: COLOR.gold }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 22 }}>
          <span style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: COLOR.goldDark }}>
            Upgrade
          </span>
          <div style={{ position: "relative", width: 20, height: 20 }}>
            <div style={{ position: "absolute", inset: 0, border: `1.5px solid rgba(22,22,22,0.4)`, borderRadius: 4 }} />
            <div style={{ position: "absolute", top: -2, right: -2, width: 7, height: 7, borderRadius: "50%", background: COLOR.gold }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: COLOR.ink,
                color: COLOR.cream,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT.mono,
                fontSize: 12,
                letterSpacing: "0.05em",
              }}
            >
              AV
            </div>
            <span style={{ fontSize: 13, color: "rgba(22,22,22,0.7)" }}>{MODEL.fullName}</span>
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", padding: "44px 48px", gap: 48 }}>
        {/* main column */}
        <div style={{ flex: 1.55, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: COLOR.goldDark }}>
            Monday · 09:24 · New York
          </div>
          <div style={{ marginTop: 12, fontFamily: FONT.serif, fontSize: 46, letterSpacing: "-0.02em", color: "#161616" }}>
            Good morning,{" "}
            <span style={{ fontStyle: "italic", color: COLOR.gold }}>{MODEL.firstName}</span>
          </div>

          {/* KPI tiles */}
          <div style={{ marginTop: 34, display: "flex", gap: 20 }}>
            {KPIS.map((kpi, i) => {
              const appear = arrive(frame, 8 + i * 4, 26);
              return (
                <div
                  key={kpi.label}
                  style={{
                    flex: 1,
                    opacity: appear,
                    transform: `translateY(${interpolate(appear, [0, 1], [14, 0])}px)`,
                    border: `1px solid ${COLOR.ink10}`,
                    padding: "22px 22px 24px",
                    background: "#FFFFFFAA",
                  }}
                >
                  <div style={{ fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: COLOR.ink42 }}>
                    {kpi.label}
                  </div>
                  <div style={{ marginTop: 14, fontFamily: FONT.serif, fontSize: 44, letterSpacing: "-0.02em", color: "#161616", lineHeight: 1 }}>
                    <CountUp kpi={kpi} start={10 + i * 4} />
                  </div>
                  <div style={{ marginTop: 12, fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.04em", color: COLOR.goldDark }}>
                    {kpi.delta}
                  </div>
                </div>
              );
            })}
          </div>

          {/* portfolio book */}
          <div style={{ marginTop: 36, opacity: arrive(frame, 26, 30) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: COLOR.ink42 }}>
                Portfolio
              </span>
              <div style={{ flex: 1, ...hairline() }} />
            </div>
            <div style={{ marginTop: 18, display: "flex", gap: 14 }}>
              {BOOK.map((pos, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    aspectRatio: "4 / 5",
                    border: `1px solid ${COLOR.ink12}`,
                    overflow: "hidden",
                    opacity: arrive(frame, 30 + i * 3, 24),
                  }}
                >
                  <Img
                    src={staticFile("portrait.jpg")}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, filter: "grayscale(1) contrast(1.04)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* sidebar — agency interest + momentum */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 30, opacity: arrive(frame, 20, 30) }}>
          <div style={{ border: `1px solid ${COLOR.ink10}`, padding: "22px 24px" }}>
            <div style={{ fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: COLOR.goldDark }}>
              Agency interest
            </div>
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column" }}>
              {INTEREST.map((row, i) => {
                const appear = arrive(frame, 30 + i * 6, 22);
                return (
                  <div
                    key={row.name}
                    style={{
                      opacity: appear,
                      transform: `translateX(${interpolate(appear, [0, 1], [12, 0])}px)`,
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      padding: "13px 0",
                      borderTop: i > 0 ? `1px solid ${COLOR.ink10}` : undefined,
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: FONT.serif, fontSize: 19, color: "#161616" }}>{row.name}</div>
                      <div style={{ fontSize: 12.5, color: "rgba(22,22,22,0.5)", marginTop: 3 }}>{row.action}</div>
                    </div>
                    <span style={{ fontFamily: FONT.mono, fontSize: 11, color: COLOR.ink42 }}>{row.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* momentum */}
          <div style={{ border: `1px solid ${COLOR.ink10}`, padding: "22px 24px", flex: 1 }}>
            <div style={{ fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: COLOR.ink42 }}>
              Momentum · 7d
            </div>
            <div style={{ marginTop: 26, display: "flex", alignItems: "flex-end", gap: 12, height: 92 }}>
              {BARS.map((h, i) => {
                const grow = arrive(frame, 34 + i * 3, 26);
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                    <div
                      style={{
                        height: `${h * grow}%`,
                        background: i === BARS.length - 1 ? COLOR.gold : "rgba(22,22,22,0.18)",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
