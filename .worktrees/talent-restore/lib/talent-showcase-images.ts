/** Curated photography for /talent — Unsplash (see next.config remotePatterns). */

export type ShowcaseImage = { src: string; alt: string };

const u = (id: string, alt: string): ShowcaseImage => ({
  src: `https://images.unsplash.com/${id}?w=800&h=1200&fit=crop&crop=face`,
  alt,
});

export const TALENT_SHOWCASE_IMAGES: ShowcaseImage[] = [
  u("photo-1534528741775-53994a69daeb", "Editorial portrait, warm light"),
  u("photo-1506794778202-cad84cf45f1d", "Portrait in natural light"),
  u("photo-1531746020798-e6953c6e8e04", "Fashion-forward portrait"),
  u("photo-1524504388940-b1c1722653e1", "Studio-style portrait"),
  u("photo-1507003211169-0a1dd7228f2d", "Headshot, neutral background"),
  u("photo-1488426862026-3ee34a7d66df", "Editorial beauty portrait"),
  u("photo-1529626455594-4ff0802cfb7e", "Outdoor portrait"),
  u("photo-1500648767791-00dcc994a43e", "Portrait, soft contrast"),
  u("photo-1544005313-94ddf0286df2", "Black and white portrait"),
  u("photo-1494790108377-be9c29b29330", "Close portrait, natural"),
  u("photo-1438761681033-6461ffad8d80", "Portrait with wind in hair"),
  u("photo-1502823403499-6ccfcf4fb453", "Full-length fashion stance"),
];

export function showcaseImageAt(i: number): ShowcaseImage {
  return TALENT_SHOWCASE_IMAGES[i % TALENT_SHOWCASE_IMAGES.length]!;
}
