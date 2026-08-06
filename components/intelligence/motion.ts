/**
 * The intelligence sequence.
 *
 * One message, twelve words, composed against the camera push in that
 * `components/hero/motion.ts` drives. The stage looks at the frame, pans onto
 * her as the line says it sees her, then closes for the last word.
 *
 * The unit here is the **lockup**: a block placed once on the stage, holding
 * one or more lines whose spacing is measured in ems of the type they sit
 * against. Fragments of one sentence never get positioned independently
 * (`lessons.md` §14.2). Within a lockup, every word carries its own mask and
 * its own place in the stagger, so a line is written and unwritten in reading
 * order rather than fading as a rectangle (§14.3).
 *
 * Authored in frame numbers against the extracted footage, because her
 * movement is the timeline.
 */

import { progressAtFrame } from "@/components/hero/motion";

export type Word = {
  t: string;
  /** The beat's one gold verdict. Italic, gold, never two in a beat. */
  verdict?: boolean;
};

export type Piece = {
  words: Word[];
  /**
   * The wordmark, set as a word in the sentence rather than typed out again in
   * body voice (`lessons.md` §14.1). It carries the hero's cream fill and gold
   * hairline, at a size where the hairline still reads as an edge.
   */
  mark?: boolean;
  /** Type scale: [narrow stage, wide stage]. */
  type: [string, string];
  /** Space above this line, in ems of its own type. */
  gap?: string;
  /** The quiet half of the lockup. Only the still composition reads this. */
  small?: boolean;
};

export type Lockup = {
  id: string;
  /** Placement: [narrow stage, wide stage]. */
  pos: [string, string];
  pieces: Piece[];
  /** Entrance delay for the whole lockup, as a fraction of the beat's span. */
  delay: number;
};

export type Beat = {
  key: string;
  /** in, settle, hold, out. `null` on the last beat: it does not leave. */
  frames: [number, number, number, number | null];
  lockups: Lockup[];
};

/**
 * I.   The mark signs the statement. One tight lockup, all the space around it.
 * II.  The sentence brackets her: the small half left, the verdict right, the
 *      camera centred on her in between.
 * III. A hanging indent, with the verdict carried by the small line so the
 *      beat is not one colour at one size (§14.5).
 */
export const BEATS: Beat[] = [
  {
    key: "frame",
    frames: [66, 82, 106, 126],
    lockups: [
      {
        id: "frame-lockup",
        delay: 0,
        pos: ["left-6 top-[6%]", "left-6 bottom-[21%] md:left-12"],
        pieces: [
          {
            words: [{ t: "PHOLIO" }],
            mark: true,
            type: [
              "text-[clamp(0.95rem,2.9vw,1.3rem)] tracking-[0.22em]",
              "text-[clamp(1.1rem,2.3vw,2.6rem)] tracking-[0.2em]",
            ],
          },
          {
            words: [{ t: "sees" }, { t: "the" }, { t: "frame." }],
            gap: "mt-[0.26em]",
            type: [
              "text-[clamp(2.6rem,9.6vw,4.4rem)]",
              "text-[clamp(3rem,7.6vw,9.2rem)]",
            ],
          },
        ],
      },
    ],
  },
  {
    key: "you",
    frames: [112, 130, 152, 170],
    lockups: [
      {
        id: "you-small",
        delay: 0,
        pos: ["left-6 top-[6%]", "left-6 top-[33%] md:left-12"],
        pieces: [
          {
            words: [{ t: "Then" }, { t: "it" }, { t: "sees" }],
            small: true,
            type: [
              "text-[clamp(1.2rem,3.6vw,1.7rem)] tracking-[-0.015em]",
              "text-[clamp(1.6rem,3vw,3.4rem)] tracking-[-0.015em]",
            ],
          },
        ],
      },
      {
        id: "you-verdict",
        delay: 0.36,
        pos: [
          "right-6 top-[12%] text-right",
          "right-6 top-[42%] text-right md:right-12",
        ],
        pieces: [
          {
            words: [{ t: "you.", verdict: true }],
            type: [
              "text-[clamp(3rem,11vw,5rem)]",
              "text-[clamp(3.6rem,9vw,10.8rem)]",
            ],
          },
        ],
      },
    ],
  },
  {
    key: "understood",
    frames: [158, 176, 193, null],
    lockups: [
      {
        id: "understood-large",
        delay: 0,
        pos: ["left-6 top-[6%]", "left-6 top-[41%] md:left-12"],
        pieces: [
          {
            words: [{ t: "Understood" }],
            type: [
              "text-[clamp(2.2rem,8vw,3.6rem)] tracking-[-0.045em]",
              "text-[clamp(3rem,6.8vw,8rem)] tracking-[-0.045em]",
            ],
          },
        ],
      },
      {
        id: "understood-small",
        delay: 0.38,
        pos: ["left-[16%] top-[17%]", "left-[21%] top-[57%]"],
        pieces: [
          {
            words: [{ t: "before" }, { t: "you" }, { t: "send.", verdict: true }],
            small: true,
            type: [
              "text-[clamp(1.05rem,3.2vw,1.5rem)] tracking-[-0.015em]",
              "text-[clamp(1.2rem,2.1vw,2.4rem)] tracking-[-0.015em]",
            ],
          },
        ],
      },
    ],
  },
];

/**
 * The background ribbon: the four archetypes the app scores a book against
 * (`src/domains/ai/archetypes.js`).
 *
 * It is depth, not a headline. It rides the camera's push in at a fraction of
 * the rate, it decelerates rather than travelling at one speed, and it carries
 * a real optical blur so it reads as out of focus behind her instead of merely
 * faint (`lessons.md` §14.6, §14.7). The blur is static: nothing animates a
 * filter per frame.
 */
export const RIBBON = {
  words: ["EDITORIAL", "RUNWAY", "COMMERCIAL", "LIFESTYLE"],
  /** Size in vw: [narrow stage, wide stage]. */
  size: [15, 7.5] as [number, number],
  /** Vertical centre, percent of stage: [narrow, wide]. */
  top: [30, 29] as [number, number],
  /** Blur in px: [narrow, wide]. Depth of field, not a glow. */
  blur: [1.6, 2.6] as [number, number],
  /** Eased travel: it arrives quickly and settles, like a plate coming to rest. */
  drift: {
    at: [0, 0.28, 0.62, 1],
    x: ["22vw", "3vw", "-11vw", "-19vw"],
  },
  peak: 0.055,
  fade: {
    in: progressAtFrame(66),
    settled: progressAtFrame(92),
    start: progressAtFrame(178),
    out: progressAtFrame(193),
  },
  travel: [progressAtFrame(64), progressAtFrame(193)] as [number, number],
};

// ── Word choreography ─────────────────────────────────────────────────────
//
// No opacity anywhere on display copy. A word is parked below its own mask
// before its beat and above it afterwards, so it is simply not in the frame
// until it is written and not in the frame once it is taken away (§14.3).

/** Clearance, as a percentage of the moving box (padding included). */
export const WIPE = ["112%", "0%", "0%", "-112%"] as const;

/** Per-word stagger, as a fraction of the entrance and exit spans. */
export const WORD_IN = 0.16;
export const WORD_OUT = 0.13;

export type WordTiming = { stops: number[]; wipe: string[] };

export function wordTiming(
  frames: Beat["frames"],
  lockupDelay: number,
  wordIndex: number,
): WordTiming {
  const [inF, settleF, holdF, outF] = frames;
  const start = progressAtFrame(inF);
  const settle = progressAtFrame(settleF);
  const inSpan = settle - start;
  const shift = inSpan * (lockupDelay + wordIndex * WORD_IN);

  if (outF === null) {
    return {
      stops: [start + shift, settle + shift],
      wipe: [WIPE[0], WIPE[1]],
    };
  }

  const hold = progressAtFrame(holdF);
  const out = progressAtFrame(outF);
  const outShift = (out - hold) * wordIndex * WORD_OUT;

  return {
    stops: [start + shift, settle + shift, hold + outShift, out + outShift],
    wipe: [...WIPE],
  };
}

/** The whole beat, for the lockup's own slow drift. Nothing parks. */
export function beatSpan(frames: Beat["frames"]): [number, number] {
  return [progressAtFrame(frames[0]), progressAtFrame(frames[3] ?? frames[2])];
}

export const BLOCK_DRIFT = [20, -18] as [number, number];
export const BLOCK_DOLLY = [0.99, 1.016] as [number, number];
