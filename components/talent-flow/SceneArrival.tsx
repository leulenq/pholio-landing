"use client";

/* ═══════════════════════════════════════════════════════════════════
   Scene 1 — Arrival (ink).
   A constellation of portraits — different faces, different divisions —
   drifts in layered depth and settles into composure as the thesis
   lands. Exit handoff: two frames draw inward toward the card scene's
   composition marks while everything else falls quiet.
   ═══════════════════════════════════════════════════════════════════ */

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Stage,
  Frame,
  Caption,
  Mono,
  Sweep,
  V,
  GoldCta,
  QuietLink,
  usePrm,
  APP_URL,
  EASE,
  FACES,
  ON_INK_FAINT,
  GOLD,
} from "./kit";

/* The constellation. x/y in % of stage, depth drives parallax + scale.
   `hand` frames perform the exit handoff toward center. */
const FIELD = [
  { src: FACES.a, alt: "Model portrait, editorial headshot", x: 66, y: 12, w: 200, depth: 1, hand: true },
  { src: FACES.m1, alt: "Model portrait, three-quarter", x: 84, y: 46, w: 150, depth: 0.7, hand: false },
  { src: FACES.c, alt: "Model portrait, natural light", x: 74, y: 66, w: 175, depth: 0.85, hand: true },
  { src: FACES.d, alt: "Model portrait, profile", x: 6, y: 56, w: 160, depth: 0.6, hand: false },
  { src: FACES.m3, alt: "Model portrait, headshot", x: 13, y: 12, w: 135, depth: 0.5, hand: false },
] as const;

function FieldFrame({
  f,
  i,
  progress,
  prm,
}: {
  f: (typeof FIELD)[number];
  i: number;
  progress: MotionValue<number>;
  prm: boolean;
}) {
  /* Parallax drift by depth; hand frames pull toward center and shrink,
     the rest sink and fade — the field going quiet as the card begins. */
  const drift = useTransform(progress, [0, 1], [0, -46 * f.depth]);
  const handX = useTransform(progress, [0.35, 1], ["0%", f.x > 50 ? "-34%" : "34%"]);
  const handScale = useTransform(progress, [0.35, 1], [1, 0.78]);
  const fade = useTransform(
    progress,
    f.hand ? [0.55, 0.98] : [0.3, 0.75],
    [1, 0],
  );

  return (
    <motion.div
      initial={prm ? false : { opacity: 0, y: 34, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.35 + i * 0.12 }}
      style={{
        position: "absolute",
        left: `${f.x}%`,
        top: `${f.y}%`,
        width: f.w,
        zIndex: Math.round(f.depth * 10),
        y: prm ? 0 : drift,
        x: prm ? 0 : f.hand ? handX : 0,
        scale: prm ? 1 : f.hand ? handScale : 1,
        opacity: prm ? 1 : fade,
        willChange: "transform, opacity",
      }}
    >
      <Frame
        src={f.src}
        alt={f.alt}
        style={{ aspectRatio: "3 / 4", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}
      />
    </motion.div>
  );
}

export default function SceneArrival() {
  const prm = usePrm();

  return (
    <Stage id="arrival" hvh={150}>
      {(progress) => {
        return (
          <div style={{ position: "relative", height: "100%" }}>
            {/* portrait constellation */}
            <div aria-hidden={false} style={{ position: "absolute", inset: 0 }}>
              {FIELD.map((f, i) => (
                <FieldFrame key={f.src} f={f} i={i} progress={progress} prm={prm} />
              ))}
            </div>

            {/* thesis */}
            <ArrivalCaption progress={progress} prm={prm} />

            {/* base line — quiet, clerical */}
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
                opacity: prm ? 1 : undefined,
              }}
            >
              <Mono color={ON_INK_FAINT} size={9}>
                For models, actors, and creatives — with real agencies on the other side
              </Mono>
            </motion.div>
          </div>
        );
      }}
    </Stage>
  );
}

function ArrivalCaption({
  progress,
  prm,
}: {
  progress: MotionValue<number>;
  prm: boolean;
}) {
  const rise = useTransform(progress, [0.3, 0.85], [0, -60]);
  const fade = useTransform(progress, [0.35, 0.8], [1, 0]);

  return (
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
          y: prm ? 0 : rise,
          opacity: prm ? 1 : fade,
          textAlign: "center",
          pointerEvents: "auto",
          maxWidth: 660,
          zIndex: 12,
          paddingTop: 40,
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
        <div
          style={{
            marginTop: "2.4rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1.4rem 2.2rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GoldCta href={`${APP_URL}/onboarding`}>Start your book</GoldCta>
          <QuietLink href={`${APP_URL}/login`} dark>
            Continue with Instagram
          </QuietLink>
        </div>
        <div style={{ marginTop: "2.6rem" }}>
          <Sweep centered width={72} />
        </div>
      </motion.div>
    </motion.div>
  );
}
