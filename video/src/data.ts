/* ═══════════════════════════════════════════════════════════════════
   DATA — ported from pholio-landing/components/compcard/CardData.ts.
   One model, one shoot. The comp card and the studio show the same person.
   ═══════════════════════════════════════════════════════════════════ */

export const MODEL = {
  firstName: "Alessandra",
  lastName: "Voss",
  fullName: "Alessandra Voss",
  city: "New York, NY",
  agency: "Metro Models",
  website: "pholio.studio/alessandrav",
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

/* Hero portrait — downloaded to /public so renders never wait on the network. */
export const PORTRAIT = "portrait.jpg";

/* Scattered "debris" thumbnails for the static field (also local). */
export const DEBRIS = ["d1.jpg", "d2.jpg", "d3.jpg", "d4.jpg", "d5.jpg"] as const;

/* The friction lexicon — the noise a talent's career gets reduced to.
   Drifts like interference in Act I, then falls silent. */
export const NOISE = [
  "12.4k followers",
  "0.8% engagement",
  "seen by 3",
  "left on read",
  "pending review",
  "unverified",
  "@ the link in bio",
  "DM for rates",
  "reach -34%",
  "last active 6d",
  "no callback",
  "resend portfolio",
  "which folder?",
  "shadowbanned",
  "2.1% reply rate",
  "follow to apply",
] as const;
