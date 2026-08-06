/* ═══════════════════════════════════════════════════════════════════
   COMP CARD — shared identity
   One model, one shoot. Every frame in the landing showcase is the same
   card, the same person — only the camera angle changes. Imagery renders
   grayscale with warm grain (Design Philosophy: "grayscale, framed,
   the image is the subject"). Swap these for real talent photos later.
   ═══════════════════════════════════════════════════════════════════ */

export const MODEL = {
  firstName: "Alessandra",
  lastName: "Voss",
  fullName: "Alessandra Voss",
  city: "New York, NY",
  agency: "Metro Models",
  website: "pholio.studio/alessandrav",
  email: "alessandra@pholio.co",
  phone: "+1 (212) 000 0000",
  year: "2026",
} as const;

export const MEASUREMENTS: [string, string][] = [
  ["Height", "5'10\""],
  ["Bust", "34\""],
  ["Waist", "25\""],
  ["Hips", "36\""],
  ["Shoe", "9 US"],
  ["Eyes", "Brown"],
];

/* Single source portrait. The contact sheet reuses this same frame at
   different crops — so the back of the card is unmistakably the same
   person photographed across one sitting. */
const SRC = "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e";

/* crop=faces lets Unsplash center the face; we fine-tune with object-position. */
export const PORTRAIT = `${SRC}?w=1000&h=1400&fit=crop&crop=faces&q=85`;

/* Contact-sheet "looks" — same sitting, re-framed via object-position + zoom.
   All keep the face in frame. */
export const SHEET: { pos: string; scale: number }[] = [
  { pos: "50% 28%", scale: 1.0 },
  { pos: "50% 20%", scale: 1.22 },
  { pos: "40% 30%", scale: 1.1 },
  { pos: "60% 26%", scale: 1.12 },
];

/* Legacy imagery — consumed by the /talent template cards
   (EditorialNoir, MaisonBlanc, SwissGrid, VelvetRunway). */
export const PHOTOS = {
  primary:
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1200&fit=crop&crop=face",
  secondary: [
    "https://i.pravatar.cc/300?img=47",
    "https://i.pravatar.cc/300?img=44",
    "https://i.pravatar.cc/300?img=25",
  ],
} as const;
