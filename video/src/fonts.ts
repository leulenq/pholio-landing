/* ═══════════════════════════════════════════════════════════════════
   FONTS — the three voices. Noto Serif Display speaks (with its italic
   cut as the brand's single point of theatre), Inter does clerical work,
   JetBrains Mono signs the timestamps.
   ═══════════════════════════════════════════════════════════════════ */

import { loadFont as loadSerif } from "@remotion/google-fonts/NotoSerifDisplay";
import { loadFont as loadSans } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const serifNormal = loadSerif("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });
loadSerif("italic", { weights: ["400", "500"], subsets: ["latin"] });
const sans = loadSans("normal", { weights: ["300", "400", "500"], subsets: ["latin"] });
const mono = loadMono("normal", { weights: ["400", "500"], subsets: ["latin"] });

export const FONT = {
  serif: serifNormal.fontFamily,
  sans: sans.fontFamily,
  mono: mono.fontFamily,
} as const;
