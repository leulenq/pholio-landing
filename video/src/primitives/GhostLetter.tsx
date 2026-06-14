/* GhostLetter — a huge faint serif letterform behind content. Margin furniture. */
import { AbsoluteFill } from "remotion";
import { FONT } from "../fonts";

export const GhostLetter: React.FC<{
  letter?: string;
  color?: string;
  opacity?: number;
  size?: string;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
}> = ({ letter = "P", color = "#FFFFFF", opacity = 0.04, size = "78vw", align = "center", style }) => (
  <AbsoluteFill
    style={{
      alignItems: align === "center" ? "center" : align === "left" ? "flex-start" : "flex-end",
      justifyContent: "center",
      pointerEvents: "none",
    }}
  >
    <span
      style={{
        fontFamily: FONT.serif,
        fontWeight: 600,
        fontSize: size,
        lineHeight: 1,
        color,
        opacity,
        userSelect: "none",
        ...style,
      }}
    >
      {letter}
    </span>
  </AbsoluteFill>
);
