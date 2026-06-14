/* Wordmark — PHOLIO in serif, with the gold underline sweeping in after. */
import { useCurrentFrame } from "remotion";
import { FONT } from "../fonts";
import { COLOR } from "../theme";
import { arrive, liftIn } from "./anim";

export const Wordmark: React.FC<{
  start?: number;
  color?: string;
  size?: number;
  sweep?: boolean;
  align?: "left" | "center";
}> = ({ start = 0, color = COLOR.goldWarm, size = 30, sweep = true, align = "center" }) => {
  const frame = useCurrentFrame();
  const reveal = liftIn(frame, start, 30, 16);
  // the underline sweeps ~800ms (24 frames) after the wordmark settles
  const sweepScale = arrive(frame, start + 18, 24);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: size * 0.42,
      }}
    >
      <div
        style={{
          ...reveal,
          fontFamily: FONT.serif,
          fontSize: size,
          letterSpacing: `${size * 0.012}em`,
          fontWeight: 500,
          color,
        }}
      >
        PHOLIO
      </div>
      {sweep && (
        <div
          style={{
            width: size * 2.2,
            height: 1,
            transform: `scaleX(${sweepScale})`,
            transformOrigin: align === "center" ? "center" : "left center",
            background: `linear-gradient(to right, ${
              align === "center" ? "rgba(201,165,90,0)" : COLOR.gold
            }, ${COLOR.gold}, rgba(201,165,90,0))`,
          }}
        />
      )}
    </div>
  );
};
