/* Kicker — uppercase tracked mono eyebrow. Gold by default. */
import { FONT } from "../fonts";
import { COLOR, TRACK } from "../theme";

export const Kicker: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, color = COLOR.gold, size = 13, style }) => (
  <div
    style={{
      fontFamily: FONT.mono,
      fontSize: size,
      letterSpacing: TRACK.kicker,
      textTransform: "uppercase",
      color,
      ...style,
    }}
  >
    {children}
  </div>
);
