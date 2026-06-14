/* Grain — fractalNoise at low opacity. The page knows it is printed. */
import { AbsoluteFill } from "remotion";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const Grain: React.FC<{ opacity?: number; blend?: React.CSSProperties["mixBlendMode"] }> = ({
  opacity = 0.04,
  blend = "overlay",
}) => (
  <AbsoluteFill
    style={{
      backgroundImage: GRAIN,
      backgroundSize: "220px 220px",
      opacity,
      mixBlendMode: blend,
      pointerEvents: "none",
    }}
  />
);
