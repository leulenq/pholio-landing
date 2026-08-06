export type SourceFrame = {
  src: string;
  objectPosition: string;
  filter?: string;
};

export type CardVariant = {
  src: string;
  market: string;
};

export const SOURCE_FRAMES: SourceFrame[] = [
  {
    src: "/generated/comp-card/source/mara-voss-red-hero.jpg",
    objectPosition: "50% 43%",
  },
  {
    src: "/generated/comp-card/source/mara-voss-crossed-arm.jpg",
    objectPosition: "50% 42%",
  },
  {
    src: "/generated/comp-card/source/mara-voss-profile.jpg",
    objectPosition: "50% 38%",
  },
];

export const CARD_VARIANTS: CardVariant[] = [
  {
    src: "/generated/comp-card/elara-keats-front.png",
    market: "NEW YORK",
  },
  {
    src: "/generated/comp-card/elara-keats-gallery-mat.png",
    market: "PARIS",
  },
  {
    src: "/generated/comp-card/elara-keats-split-field.png",
    market: "MILAN",
  },
  {
    src: "/generated/comp-card/elara-keats-statement.png",
    market: "LONDON",
  },
];
