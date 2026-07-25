"use client";

/* ═══════════════════════════════════════════════════════════════════
   Scene 1 — Arrival (ink).
   GESTURE: depth field → dolly-through.
   Portraits sit on separate depth planes and track a HEAVY sprung copy
   of scroll, so they trail the wheel and read as physical weight. The
   exit is not a fade: the camera accelerates and passes through the
   wall of faces, near planes rushing off-frame faster than far ones.
   ═══════════════════════════════════════════════════════════════════ */

import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  Stage,
  Frame,
  Mono,
  Sweep,
  V,
  GoldCta,
  usePrm,
  APP_URL,
  EASE,
  FACES,
  ON_INK_FAINT,
} from "./kit";
import { useMass, useScrub } from "./motion";

/* depth: 1 = nearest the lens (moves most), 0.4 = far back */
const FIELD = [
  { src: FACES.a, alt: "Model portrait, editorial pose", x: 66, y: 12, w: 210, depth: 1, pos: "50% 20%" },
  { src: FACES.b, alt: "Model portrait, natural light", x: 84, y: 46, w: 155, depth: 0.72, pos: "50% 25%" },
  { src: FACES.c, alt: "Model portrait, clean headshot", x: 74, y: 66, w: 185, depth: 0.88, pos: "50% 30%" },
  { src: FACES.d, alt: "Male model portrait, studio", x: 6, y: 56, w: 165, depth: 0.62, pos: "50% 25%" },
  { src: FACES.e, alt: "Male model portrait, daylight", x: 13, y: 12, w: 140, depth: 0.48, pos: "50% 20%" },
] as const;

function FieldFrame({
  f,
  i,
  heavy,
  prm,
}: {
  f: (typeof FIELD)[number];
  i: number;
  heavy: MotionValue<number>;
  prm: boolean;
}) {
  /* slow parallax rise through the hold */
  const drift = useScrub(heavy, [0, 0.55], [0, -52 * f.depth], "arrival");

  /* the dolly: near planes grow and clear the frame first. Each plane
     also pushes outward from centre so the camera reads as travelling
     between them rather than zooming a flat image. */
  const scale = useScrub(heavy, [0.5, 1], [1, 1 + 1.5 * f.depth], "depart");
  const outX = useScrub(
    heavy,
    [0.5, 1],
    ["0%", `${(f.x - 50) * 1.9 * f.depth}%`],
    "depart",
  );
  const outY = useScrub(
    heavy,
    [0.5, 1],
    ["0%", `${(f.y - 50) * 1.5 * f.depth}%`],
    "depart",
  );
  const opacity = useTransform(heavy, [0.62, 0.86, 0.97], [1, 0.55, 0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${f.x}%`,
        top: `${f.y}%`,
        width: `min(${f.w}px, 44vw)`,
        zIndex: Math.round(f.depth * 10),
        y: prm ? 0 : drift,
        x: prm ? 0 : outX,
        translateY: prm ? 0 : outY,
        scale: prm ? 1 : scale,
        opacity: prm ? 1 : opacity,
        willChange: "transform, opacity",
      }}
    >
      <motion.div
        initial={prm ? false : { opacity: 0, y: 34, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 + i * 0.12 }}
      >
        <Frame
          src={f.src}
          alt={f.alt}
          style={{ aspectRatio: "3 / 4", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}
          imgStyle={{ objectPosition: f.pos }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function SceneArrival() {
  const prm = usePrm();

  return (
    /* clip disabled: the dolly is meant to leave the frame */
    <Stage id="arrival" hvh={165} z={8} clip={false}>
      {(progress) => <ArrivalStage progress={progress} prm={prm} />}
    </Stage>
  );
}

function ArrivalStage({
  progress,
  prm,
}: {
  progress: MotionValue<number>;
  prm: boolean;
}) {
  /* portraits carry mass; type does not (a reader should never chase
     a trailing headline) */
  const heavy = useMass(progress, "heavy");

  /* the caption leads the dolly out — it recedes as the field rushes
     forward, which is what sells the camera move */
  const capScale = useScrub(progress, [0.42, 0.8], [1, 0.88], "depart");
  const capY = useScrub(progress, [0.3, 0.8], [0, -70], "depart");
  const capOpacity = useTransform(progress, [0.34, 0.62], [1, 0]);
  const baseOpacity = useTransform(progress, [0.12, 0.3], [1, 0]);

  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, perspective: 1200 }}>
        {FIELD.map((f, i) => (
          <FieldFrame key={f.src} f={f} i={i} heavy={heavy} prm={prm} />
        ))}
      </div>

      <motion.div
        initial={prm ? false : { opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 1.5rem",
          pointerEvents: "none",
        }}
      >
        <motion.div
          style={{
            y: prm ? 0 : capY,
            scale: prm ? 1 : capScale,
            opacity: prm ? 1 : capOpacity,
            textAlign: "center",
            pointerEvents: "auto",
            maxWidth: 660,
            zIndex: 12,
            paddingTop: 40,
            willChange: "transform, opacity",
          }}
        >
          <h1
            className="font-editorial"
            style={{
              fontSize: "clamp(2.8rem, 6.2vw, 5.2rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "rgba(245,240,232,0.94)",
              textWrap: "balance",
              margin: 0,
              textShadow: "0 2px 40px rgba(5,5,5,0.65)",
            }}
          >
            Being seen is a <V>craft.</V>
          </h1>
          <p
            style={{
              marginTop: "1.5rem",
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              lineHeight: 1.75,
              color: "rgba(245,240,232,0.72)",
              maxWidth: "44ch",
              marginLeft: "auto",
              marginRight: "auto",
              textShadow: "0 1px 24px rgba(5,5,5,0.8)",
            }}
          >
            Pholio presents your work to real agencies, to the industry&rsquo;s
            standard. Free to apply. Never a fee to be seen.
          </p>
          <div style={{ marginTop: "2.4rem", display: "flex", justifyContent: "center" }}>
            <GoldCta href={`${APP_URL}/onboarding`}>Start your book</GoldCta>
          </div>
          <div style={{ marginTop: "2.6rem" }}>
            <Sweep centered width={72} />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={prm ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.6 }}
        style={{
          position: "absolute",
          bottom: 28,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        <motion.span style={{ opacity: prm ? 1 : baseOpacity }}>
          <Mono color={ON_INK_FAINT} size={9}>
            For models, actors, and creatives — with real agencies on the other side
          </Mono>
        </motion.span>
      </motion.div>
    </div>
  );
}
