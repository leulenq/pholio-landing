/* GoldRule — the gold sweep / vertical rule. Scales in from an origin, once. */
import { useCurrentFrame } from "remotion";
import { COLOR } from "../theme";
import { arrive } from "./anim";

export const GoldSweep: React.FC<{
  start?: number;
  dur?: number;
  width?: number | string;
  height?: number;
  style?: React.CSSProperties;
}> = ({ start = 0, dur = 24, width = 120, height = 1, style }) => {
  const frame = useCurrentFrame();
  const s = arrive(frame, start, dur);
  return (
    <div
      style={{
        width,
        height,
        transform: `scaleX(${s})`,
        transformOrigin: "left center",
        background: `linear-gradient(to right, ${COLOR.gold}, rgba(201,165,90,0))`,
        ...style,
      }}
    />
  );
};

export const VerticalRule: React.FC<{
  start?: number;
  dur?: number;
  height?: number;
  style?: React.CSSProperties;
}> = ({ start = 0, dur = 30, height = 110, style }) => {
  const frame = useCurrentFrame();
  const s = arrive(frame, start, dur);
  return (
    <div
      style={{
        width: 1,
        height,
        transform: `scaleY(${s})`,
        transformOrigin: "top center",
        background: `linear-gradient(to bottom, ${COLOR.gold}, rgba(201,165,90,0.1))`,
        ...style,
      }}
    />
  );
};
