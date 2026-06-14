/* ═══════════════════════════════════════════════════════════════════
   Verdict — an editorial headline that arrives word by word. Exactly one
   word may be the verdict: italic Noto Serif Display, gold. Never two.
   ═══════════════════════════════════════════════════════════════════ */

import { useCurrentFrame } from "remotion";
import { FONT } from "../fonts";
import { COLOR, TRACK } from "../theme";
import { liftIn } from "./anim";

export type Word = { text?: string; gold?: boolean; break?: boolean };

export const Verdict: React.FC<{
  words: Word[];
  start?: number;
  stagger?: number;
  size?: number;
  lineHeight?: number;
  color?: string;
  align?: "left" | "center";
  maxWidth?: number;
  style?: React.CSSProperties;
}> = ({
  words,
  start = 0,
  stagger = 4,
  size = 64,
  lineHeight = 1.08,
  color = COLOR.cream,
  align = "center",
  maxWidth,
  style,
}) => {
  const frame = useCurrentFrame();
  let wordIndex = 0;

  return (
    <div
      style={{
        fontFamily: FONT.serif,
        fontSize: size,
        lineHeight,
        letterSpacing: TRACK.display,
        color,
        textAlign: align,
        maxWidth,
        display: "flex",
        flexWrap: "wrap",
        gap: `0 ${size * 0.26}px`,
        justifyContent: align === "center" ? "center" : "flex-start",
        ...style,
      }}
    >
      {words.map((w, i) => {
        if (w.break) return <div key={`br-${i}`} style={{ flexBasis: "100%", height: 0 }} />;
        const reveal = liftIn(frame, start + wordIndex * stagger, 30, size * 0.4);
        wordIndex += 1;
        return (
          <span
            key={i}
            style={{
              ...reveal,
              display: "inline-block",
              fontStyle: w.gold ? "italic" : "normal",
              color: w.gold ? COLOR.gold : "inherit",
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
