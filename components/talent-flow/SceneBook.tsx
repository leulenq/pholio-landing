"use client";

/* ═══════════════════════════════════════════════════════════════════
   Scene 3 — Book (cream).
   A grid of the talent's frames assembles from a light scatter, then a
   few are quietly held back while the kept frames tighten toward the
   grid's center. Ambient mono labels name three of the kept frames.
   Exit handoff: the kept frames gather into a small stacked sheaf,
   right of center — the shape Send opens on.
   ═══════════════════════════════════════════════════════════════════ */

import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  Stage,
  Frame,
  Caption,
  Mono,
  V,
  usePrm,
  SOURCE_FRAMES,
  ON_CREAM_FAINT,
} from "./kit";

type FrameSpec = {
  src: string;
  alt: string;
  heldBack: boolean;
  label?: string;
  scatter: { x: number; y: number; rot: number };
  pos: string;
  zoom?: number;
};

/* 8 frames, 4×2 grid order (row-major). One identity — a book belongs to
   one person — built from the three source frames at different croppings,
   the way a contact sheet re-frames one sitting. Indices 6–7 hide on
   mobile, leaving a clean 3×2 of the first six. */
const FRAMES: FrameSpec[] = [
  { src: SOURCE_FRAMES.crossedArm, alt: "Book frame, crossed arms", heldBack: false, label: "¾ — BOOK", scatter: { x: -28, y: 18, rot: -2 }, pos: "50% 20%" },
  { src: SOURCE_FRAMES.redHero, alt: "Book frame, hero close crop", heldBack: true, label: "HELD BACK", scatter: { x: 22, y: -24, rot: 2 }, pos: "50% 16%", zoom: 1.45 },
  { src: SOURCE_FRAMES.profile, alt: "Book frame, profile", heldBack: false, label: "PROFILE — BOOK", scatter: { x: -18, y: -30, rot: 1 }, pos: "50% 20%" },
  { src: SOURCE_FRAMES.redHero, alt: "Book frame, hero", heldBack: false, scatter: { x: 30, y: 14, rot: -1 }, pos: "50% 30%" },
  { src: SOURCE_FRAMES.crossedArm, alt: "Book frame, close crop", heldBack: true, label: "HELD BACK", scatter: { x: -24, y: 26, rot: 2 }, pos: "50% 12%", zoom: 1.5 },
  { src: SOURCE_FRAMES.profile, alt: "Book frame, headshot crop", heldBack: false, label: "HEADSHOT — BOOK", scatter: { x: 16, y: -20, rot: -2 }, pos: "48% 10%", zoom: 1.55 },
  { src: SOURCE_FRAMES.redHero, alt: "Book frame, movement crop", heldBack: true, label: "HELD BACK", scatter: { x: -30, y: 12, rot: 1 }, pos: "50% 58%", zoom: 1.3 },
  { src: SOURCE_FRAMES.crossedArm, alt: "Book frame, mid crop", heldBack: false, scatter: { x: 20, y: 22, rot: -1 }, pos: "50% 42%", zoom: 1.25 },
];

const KEPT_ROTATIONS = [-4, -2, 0, 2, 4];

function BookFrame({
  f,
  i,
  keptIndex,
  progress,
  prm,
}: {
  f: FrameSpec;
  i: number;
  keptIndex: number;
  progress: MotionValue<number>;
  prm: boolean;
}) {
  const col = i % 4;
  const row = Math.floor(i / 4);
  /* beat 2: kept frames tighten a few px toward the grid's center */
  const toward = { x: (1.5 - col) * 4, y: (0.5 - row) * 10 };
  /* exit: kept frames converge toward a point right of center */
  const hand = { x: 90 - (col - 1.5) * 110, y: -(row - 0.5) * 160 };
  const handRot = KEPT_ROTATIONS[keptIndex % KEPT_ROTATIONS.length];
  const scatterStart = 0.06 + i * 0.015;
  const hideOnMobile = i >= 6;

  const x = useTransform(
    progress,
    f.heldBack
      ? [0, scatterStart, 0.28, 1]
      : [0, scatterStart, 0.28, 0.32, 0.55, 0.8, 0.94, 1],
    f.heldBack
      ? [f.scatter.x, f.scatter.x, 0, 0]
      : [f.scatter.x, f.scatter.x, 0, 0, toward.x, toward.x, toward.x + hand.x, toward.x + hand.x],
  );
  const y = useTransform(
    progress,
    f.heldBack
      ? [0, scatterStart, 0.28, 0.32, 0.55, 1]
      : [0, scatterStart, 0.28, 0.32, 0.55, 0.8, 0.94, 1],
    f.heldBack
      ? [f.scatter.y, f.scatter.y, 0, 0, 12, 12]
      : [f.scatter.y, f.scatter.y, 0, 0, toward.y, toward.y, toward.y + hand.y, toward.y + hand.y],
  );
  const rotate = useTransform(
    progress,
    f.heldBack ? [0, scatterStart, 0.28, 1] : [0, scatterStart, 0.28, 0.8, 0.94, 1],
    f.heldBack
      ? [f.scatter.rot, f.scatter.rot, 0, 0]
      : [f.scatter.rot, f.scatter.rot, 0, 0, handRot, handRot],
  );
  const scale = useTransform(
    progress,
    f.heldBack ? [0, 0.32, 0.55, 1] : [0, 0.8, 0.94, 1],
    f.heldBack ? [1, 1, 0.94, 0.94] : [1, 1, 0.5, 0.5],
  );
  const opacity = useTransform(
    progress,
    f.heldBack ? [0, 0.32, 0.55, 0.7, 0.8, 1] : [0, 1],
    f.heldBack ? [1, 1, 0.22, 0.22, 0, 0] : [1, 1],
  );
  const labelOpacity = useTransform(
    progress,
    f.heldBack ? [0.32, 0.55, 0.7, 0.8] : [0.55, 0.72, 0.78, 0.86],
    f.heldBack ? [0, 1, 1, 0] : [0, 1, 1, 0],
  );

  const finalX = f.heldBack ? 0 : toward.x;
  const finalY = f.heldBack ? 12 : toward.y;

  return (
    <div className={hideOnMobile ? "hidden md:block" : undefined} style={{ position: "relative" }}>
      <motion.div
        style={{
          x: prm ? finalX : x,
          y: prm ? finalY : y,
          rotate: prm ? 0 : rotate,
          scale: prm ? (f.heldBack ? 0.94 : 1) : scale,
          opacity: prm ? (f.heldBack ? 0.22 : 1) : opacity,
          zIndex: f.heldBack ? 1 : 10 + keptIndex,
          willChange: "transform, opacity",
        }}
      >
        <Frame
          src={f.src}
          alt={f.alt}
          style={{
            aspectRatio: "3 / 4",
            boxShadow: f.heldBack ? "none" : "0 18px 40px rgba(26,26,26,0.16)",
          }}
          imgStyle={{
            objectPosition: f.pos,
            transform: f.zoom ? `scale(${f.zoom})` : undefined,
            transformOrigin: f.pos,
          }}
        />
      </motion.div>
      {f.label ? (
        <motion.div
          aria-hidden="true"
          style={{ opacity: prm ? 1 : labelOpacity, marginTop: 6, textAlign: "center" }}
        >
          <Mono color={ON_CREAM_FAINT} size={9}>
            {f.label}
          </Mono>
        </motion.div>
      ) : null}
    </div>
  );
}

function BookCaption({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  const opacity = useTransform(progress, [0.1, 0.2, 0.88, 0.98], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.1, 0.2], [20, 0]);

  return (
    <motion.div
      style={{ opacity: prm ? 1 : opacity, y: prm ? 0 : y, willChange: "transform, opacity" }}
    >
      <Caption
        dark={false}
        headline={
          <>
            The booker sees what you <V>choose.</V>
          </>
        }
      >
        Hold back any frame — from everyone, from agencies, or from a single send. Your book,
        exactly as you decided it.
      </Caption>
    </motion.div>
  );
}

export default function SceneBook() {
  const prm = usePrm();

  return (
    <Stage id="book" hvh={260}>
      {(progress) => {
        const contentOpacity = useTransform(progress, [0, 1], [1, 1]);
        let keptCounter = 0;

        return (
          <motion.div
            style={{
              position: "relative",
              height: "100%",
              display: "flex",
              alignItems: "center",
              opacity: prm ? 1 : contentOpacity,
              willChange: "opacity",
            }}
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 md:flex-row md:items-center md:gap-10 md:px-12">
              <div className="w-full md:w-[38%]">
                <BookCaption progress={progress} prm={prm} />
              </div>
              <div className="w-full md:w-[55%]">
                <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-4">
                  {FRAMES.map((f, i) => {
                    const keptIndex = f.heldBack ? -1 : keptCounter++;
                    return (
                      <BookFrame
                        key={i}
                        f={f}
                        i={i}
                        keptIndex={keptIndex}
                        progress={progress}
                        prm={prm}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        );
      }}
    </Stage>
  );
}
