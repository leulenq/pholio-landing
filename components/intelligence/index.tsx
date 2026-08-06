"use client";

import type { MotionValue } from "framer-motion";
import { motion, useTransform } from "framer-motion";

import StaticIntelligence from "./StaticIntelligence";
import {
  BEATS,
  BLOCK_DOLLY,
  BLOCK_DRIFT,
  beatSpan,
  wordTiming,
  type Beat,
  type Lockup,
  type Piece,
  type Word,
} from "./motion";

/**
 * The intelligence sequence's copy.
 *
 * Every word rides in and out behind its own mask, staggered in reading order,
 * with no opacity animation anywhere: before its beat the word is parked below
 * the mask, afterwards it is parked above it. A line is written and unwritten
 * rather than faded (`lessons.md` §14.3).
 *
 * The clearance padding sits on the moving span, not on the mask, so the wipe
 * distance is a percentage of a box that already contains the italic descender
 * on `you.` (§14.4).
 *
 * Nothing here ever covers her. The second beat brackets her instead: the small
 * half on the left, the verdict on the right, and the camera pans onto her in
 * between so she stands inside her own sentence.
 */

const MARK_STYLE = {
  WebkitTextStroke: "0.6px rgba(201, 165, 90, 0.62)",
} as const;

function MaskedWord({
  word,
  beat,
  lockup,
  index,
  progress,
  mark,
}: {
  word: Word;
  beat: Beat;
  lockup: Lockup;
  index: number;
  progress: MotionValue<number>;
  mark?: boolean;
}) {
  const timing = wordTiming(beat.frames, lockup.delay, index);
  const y = useTransform(progress, timing.stops, timing.wipe);

  const tone = word.verdict
    ? "font-editorial-italic text-[#C9A55A]"
    : "font-editorial text-[#FAF7F2]";

  return (
    <span className="block overflow-hidden">
      <motion.span
        // Clearance for ascenders, the italic descender, and the italic
        // overhang. On the moving box, so `112%` always clears the mask.
        className={`block whitespace-pre pb-[0.3em] pr-[0.1em] pt-[0.2em] ${tone}`}
        style={{ y, ...(mark ? MARK_STYLE : null) }}
      >
        {word.t}
      </motion.span>
    </span>
  );
}

function PieceLine({
  piece,
  beat,
  lockup,
  offset,
  progress,
  compact,
}: {
  piece: Piece;
  beat: Beat;
  lockup: Lockup;
  offset: number;
  progress: MotionValue<number>;
  compact: boolean;
}) {
  const align = lockup.pos[compact ? 0 : 1].includes("text-right")
    ? "justify-end"
    : "justify-start";

  return (
    <span
      className={`flex flex-nowrap leading-[0.92] tracking-[-0.035em] ${align} ${
        piece.gap ?? ""
      } ${piece.type[compact ? 0 : 1]}`}
      style={{ columnGap: "0.26em" }}
    >
      {piece.words.map((word, index) => (
        <MaskedWord
          key={`${word.t}-${index}`}
          word={word}
          beat={beat}
          lockup={lockup}
          index={offset + index}
          progress={progress}
          mark={piece.mark}
        />
      ))}
    </span>
  );
}

function LockupBlock({
  lockup,
  beat,
  progress,
  compact,
}: {
  lockup: Lockup;
  beat: Beat;
  progress: MotionValue<number>;
  compact: boolean;
}) {
  const span = beatSpan(beat.frames);
  const y = useTransform(progress, span, [...BLOCK_DRIFT]);
  const scale = useTransform(progress, span, [...BLOCK_DOLLY]);

  const pos = lockup.pos[compact ? 0 : 1];
  const origin = pos.includes("text-right") ? "origin-right" : "origin-left";

  // Word index runs across the whole lockup, so a two-line block is written in
  // one continuous stagger instead of restarting on the second line.
  let cursor = 0;

  return (
    <motion.div
      className={`absolute ${pos} ${origin}`}
      style={{ y, scale, willChange: "transform" }}
    >
      {lockup.pieces.map((piece, index) => {
        const offset = cursor;
        cursor += piece.words.length;
        return (
          <PieceLine
            key={index}
            piece={piece}
            beat={beat}
            lockup={lockup}
            offset={offset}
            progress={progress}
            compact={compact}
          />
        );
      })}
    </motion.div>
  );
}

interface IntelligenceProps {
  progress?: MotionValue<number>;
  isMobile?: boolean;
}

export default function Intelligence({ progress, isMobile }: IntelligenceProps) {
  // The hero owns the reduced-motion decision and withholds `progress` there.
  // Asking framer's `useReducedMotion()` here as well hydrated as a mismatch.
  if (!progress) {
    return <StaticIntelligence />;
  }

  return (
    <div className="relative mx-auto h-full w-full max-w-[1600px]">
      {BEATS.map((beat) =>
        beat.lockups.map((lockup) => (
          <LockupBlock
            key={lockup.id}
            lockup={lockup}
            beat={beat}
            progress={progress}
            compact={Boolean(isMobile)}
          />
        )),
      )}
    </div>
  );
}
