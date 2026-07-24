"use client";

/* ═══════════════════════════════════════════════════════════════════
   Scene 2 — The card (cream). The scene the page is remembered by.
   The model's real source frames and her stats line converge and SET
   into the finished comp card — a real render from the composition
   engine — then the same card re-composes into two further art
   directions. One quiet NFC beat closes it. Exit handoff: the card
   tilts back and drifts right, taking its place in the book grid.
   ═══════════════════════════════════════════════════════════════════ */

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Stage,
  Caption,
  Mono,
  V,
  usePrm,
  EASE,
  RENDERS,
  SOURCE_FRAMES,
  GOLD,
  ON_CREAM_FAINT,
  ON_CREAM_SOFT,
  HAIR_CREAM,
} from "./kit";

/* the converging raw material — her actual source frames */
const SOURCES = [
  { src: SOURCE_FRAMES.crossedArm, alt: "Source frame, three-quarter", from: { x: -320, y: -140, r: -9 } },
  { src: SOURCE_FRAMES.profile, alt: "Source frame, profile", from: { x: 300, y: -190, r: 7 } },
  { src: SOURCE_FRAMES.redHero, alt: "Source frame, hero", from: { x: -260, y: 210, r: 5 } },
] as const;

/* the same card, three art directions — real engine renders */
const EDITIONS = [RENDERS.front, RENDERS.galleryMat, RENDERS.splitField];

const CARD_AR = "1056 / 1632";

function ConvergingFrame({
  s,
  i,
  progress,
  prm,
}: {
  s: (typeof SOURCES)[number];
  i: number;
  progress: MotionValue<number>;
  prm: boolean;
}) {
  const t0 = 0.04 + i * 0.02;
  const t1 = 0.26 + i * 0.02;
  const x = useTransform(progress, [t0, t1], [s.from.x, 0]);
  const y = useTransform(progress, [t0, t1], [s.from.y, 0]);
  const rotate = useTransform(progress, [t0, t1], [s.from.r, 0]);
  const scale = useTransform(progress, [t0, t1], [0.55, 1]);
  const opacity = useTransform(progress, [0.28, 0.34], [1, 0]);

  if (prm) return null; // reduced motion shows the finished card only

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        x,
        y,
        rotate,
        scale,
        willChange: "transform",
      }}
    >
      <motion.div style={{ opacity, height: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.src}
          alt={s.alt}
          draggable={false}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(1)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function SceneCard() {
  const prm = usePrm();

  return (
    <Stage id="card" hvh={330}>
      {(progress) => (
        <SceneCardStage progress={progress} prm={prm} />
      )}
    </Stage>
  );
}

function SceneCardStage({
  progress,
  prm,
}: {
  progress: MotionValue<number>;
  prm: boolean;
}) {
  /* content stays visible through entry and exit travel — the field
     morphs behind persistent objects, never over an empty stage */
  const sceneFade = useTransform(progress, [0, 1], [1, 1]);

  /* the card body: settles with a breath of overshoot, tilts slightly at
     each edition change, tips back for the NFC beat, then drifts right
     into the book grid as its exit handoff */
  const cardScale = useTransform(
    progress,
    [0.08, 0.28, 0.33, 0.86, 0.95],
    [0.9, 1.025, 1, 1, 0.82],
  );
  const cardRotY = useTransform(
    progress,
    [0.36, 0.4, 0.44, 0.5, 0.54, 0.58, 0.66, 0.72, 0.86, 0.95],
    [0, -7, 0, 0, 7, 0, 0, -16, -16, 0],
  );
  const cardX = useTransform(progress, [0.86, 0.96], ["0%", "26%"]);
  const cardOpacity = useTransform(progress, [0.08, 0.14], [0, 1]);
  const shadow = useTransform(
    progress,
    [0.1, 0.3],
    [
      "0 12px 30px rgba(26,26,26,0.08)",
      "0 34px 90px rgba(26,26,26,0.2)",
    ],
  );

  /* edition crossfades — front → gallery mat → split field */
  const ed0 = useTransform(progress, [0.36, 0.42], [1, 0]);
  const ed1 = useTransform(progress, [0.36, 0.42, 0.5, 0.56], [0, 1, 1, 0]);
  const ed2 = useTransform(progress, [0.5, 0.56], [0, 1]);
  const editionOpacities = [ed0, ed1, ed2];

  /* the stats line converges with the frames, then hands to the card */
  const statsY = useTransform(progress, [0.07, 0.27], [170, 0]);
  const statsOpacity = useTransform(progress, [0.07, 0.12, 0.27, 0.33], [0, 1, 1, 0]);

  /* NFC beat */
  const nfcOpacity = useTransform(progress, [0.68, 0.73, 0.82, 0.86], [0, 1, 1, 0]);

  /* caption */
  const capOpacity = useTransform(progress, [0.12, 0.2, 0.88, 0.94], [0, 1, 1, 0]);
  const capY = useTransform(progress, [0.12, 0.2], [24, 0]);

  /* spec hairline under the card */
  const ruleScaleX = useTransform(progress, [0.3, 0.42], [0, 1]);
  const ruleOpacity = useTransform(progress, [0.3, 0.36, 0.88, 0.93], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{
        position: "relative",
        height: "100%",
        opacity: prm ? 1 : sceneFade,
      }}
    >
      <div
        className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-10 px-6 md:flex-row md:justify-between md:gap-16 lg:px-10"
        style={{ paddingTop: 64, paddingBottom: 40 }}
      >
        {/* caption — left on md+, above on mobile */}
        <motion.div
          style={{
            opacity: prm ? 1 : capOpacity,
            y: prm ? 0 : capY,
            flexShrink: 0,
          }}
          className="order-1 md:order-none md:max-w-[400px]"
        >
          <Caption
            dark={false}
            headline={
              <>
                A card that composes <V>itself.</V>
              </>
            }
          >
            Generated from your book and your stats — current whenever they
            are. No two cards alike.
          </Caption>
        </motion.div>

        {/* the card */}
        <div
          className="order-2 w-[min(62vw,240px)] md:w-[min(30vw,340px)]"
          style={{ perspective: 1400, position: "relative" }}
        >
          {/* converging source frames — siblings of the card body so they
              are visible while the card itself is still gathering */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
            {SOURCES.map((s, i) => (
              <ConvergingFrame key={s.src} s={s} i={i} progress={progress} prm={prm} />
            ))}
          </div>

          <motion.div
            style={{
              position: "relative",
              aspectRatio: CARD_AR,
              scale: prm ? 1 : cardScale,
              rotateY: prm ? 0 : cardRotY,
              x: prm ? "0%" : cardX,
              opacity: prm ? 1 : cardOpacity,
              boxShadow: prm ? "0 34px 90px rgba(26,26,26,0.2)" : shadow,
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
              background: "#fff",
            }}
          >
            {/* edition renders, stacked */}
            {EDITIONS.map((src, i) => (
              <motion.div
                key={src}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: prm ? (i === 0 ? 1 : 0) : editionOpacities[i],
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={
                    i === 0
                      ? "Comp card, composed front"
                      : "The same comp card in another art direction"
                  }
                  draggable={false}
                  style={{ display: "block", width: "100%", height: "100%" }}
                />
              </motion.div>
            ))}

            {/* NFC arcs off the card's right edge */}
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 48 96"
              style={{
                position: "absolute",
                right: -58,
                top: "50%",
                width: 44,
                height: 88,
                marginTop: -44,
                opacity: prm ? 0 : nfcOpacity,
              }}
            >
              {[14, 26, 38].map((r, i) => (
                <path
                  key={r}
                  d={`M 4 ${48 - r} A ${r} ${r} 0 0 1 4 ${48 + r}`}
                  fill="none"
                  stroke={GOLD}
                  strokeWidth={1.25}
                  opacity={0.9 - i * 0.28}
                />
              ))}
            </motion.svg>
          </motion.div>

          {/* converging stats line */}
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              bottom: -34,
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              y: prm ? 0 : statsY,
              opacity: prm ? 0 : statsOpacity,
            }}
          >
            <Mono color={ON_CREAM_FAINT} size={9}>
              180 CM · 5′11″ — 81 · 64 · 89
            </Mono>
          </motion.div>

          {/* NFC caption under the card */}
          <motion.div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: -38,
              textAlign: "center",
              opacity: prm ? 1 : nfcOpacity,
            }}
          >
            <Mono color={ON_CREAM_FAINT} size={9}>
              NFC — in design · <span style={{ color: ON_CREAM_SOFT }}>hold near reader</span>
            </Mono>
          </motion.div>

          {/* spec hairline */}
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: -14,
              height: 1,
              background: HAIR_CREAM,
              transformOrigin: "left",
              scaleX: prm ? 1 : ruleScaleX,
              opacity: prm ? 1 : ruleOpacity,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
