"use client";

/* ═══════════════════════════════════════════════════════════════════
   Scene 8 — Close (ink).
   The last frame of the take: a quiet gold field rises behind the
   final statement, three checkable facts set as a three-column ledger
   under hairlines, and one entrance. No exit — the camera comes to
   rest here.
   ═══════════════════════════════════════════════════════════════════ */

import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  Stage,
  Sweep,
  V,
  GoldCta,
  Mono,
  usePrm,
  APP_URL,
  ON_INK,
  ON_INK_SOFT,
  ON_INK_FAINT,
  HAIR_INK,
  SERIF,
  SANS,
} from "./kit";

const FACTS = [
  {
    lead: "Applying is free.",
    gloss: "No fee to submit. No paid visibility.",
  },
  {
    lead: "Agencies are vetted, and never charged.",
    gloss: "Every agency is verified before it can review talent. Pholio takes no commission.",
  },
  {
    lead: "Your work leaves with you.",
    gloss: "Export your book and your data at any time.",
  },
];
const FACT_THRESHOLDS = [0.28, 0.36, 0.44];

export default function SceneClose() {
  const prm = usePrm();

  return (
    <Stage id="close" hvh={130}>
      {(progress) => <CloseStage progress={progress} prm={prm} />}
    </Stage>
  );
}

function CloseStage({
  progress,
  prm,
}: {
  progress: MotionValue<number>;
  prm: boolean;
}) {
  const orbOpacity = useTransform(progress, [0.1, 0.5], [0, 0.5]);
  const sweepOpacity = useTransform(progress, [0.06, 0.14], [0, 1]);
  const headOpacity = useTransform(progress, [0.12, 0.24], [0, 1]);
  const headY = useTransform(progress, [0.12, 0.24], [18, 0]);
  const ctaOpacity = useTransform(progress, [0.52, 0.62], [0, 1]);
  const ctaY = useTransform(progress, [0.52, 0.62], [14, 0]);

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* ambient gold field behind the finale */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-32%",
          width: 880,
          height: 880,
          marginLeft: -440,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,165,90,0.13) 0%, transparent 62%)",
          filter: "blur(70px)",
          opacity: prm ? 0.5 : orbOpacity,
          pointerEvents: "none",
        }}
      />

      <div className="mx-auto w-full max-w-4xl px-6 text-center md:px-10">
        <motion.div style={{ opacity: prm ? 1 : sweepOpacity }}>
          <Sweep centered width={72} />
        </motion.div>

        <motion.h2
          className="font-editorial mt-7"
          style={{
            fontSize: "clamp(2.6rem, 5.4vw, 4.4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: ON_INK,
            textWrap: "balance",
            margin: "1.75rem 0 0",
            opacity: prm ? 1 : headOpacity,
            y: prm ? 0 : headY,
            willChange: "transform, opacity",
          }}
        >
          On your <V>terms.</V>
        </motion.h2>

        {/* the ledger — three facts under hairlines */}
        <div className="mt-14 grid grid-cols-1 gap-9 text-left md:mt-16 md:grid-cols-3 md:gap-10">
          {FACTS.map((fact, i) => (
            <Fact
              key={fact.lead}
              fact={fact}
              threshold={FACT_THRESHOLDS[i]}
              progress={progress}
              prm={prm}
            />
          ))}
        </div>

        <motion.div
          className="mt-14 flex flex-col items-center gap-6 md:mt-16"
          style={{
            opacity: prm ? 1 : ctaOpacity,
            y: prm ? 0 : ctaY,
            willChange: "transform, opacity",
          }}
        >
          <GoldCta href={`${APP_URL}/onboarding`}>Start your book</GoldCta>
          <Mono color={ON_INK_FAINT} size={9}>
            For models, actors, and creatives — with real agencies on the
            other side
          </Mono>
        </motion.div>
      </div>
    </div>
  );
}

function Fact({
  fact,
  threshold,
  progress,
  prm,
}: {
  fact: (typeof FACTS)[number];
  threshold: number;
  progress: MotionValue<number>;
  prm: boolean;
}) {
  const ruleScaleX = useTransform(progress, [threshold, threshold + 0.1], [0, 1]);
  const opacity = useTransform(progress, [threshold, threshold + 0.09], [0, 1]);
  const y = useTransform(progress, [threshold, threshold + 0.09], [12, 0]);

  return (
    <motion.div
      style={{
        opacity: prm ? 1 : opacity,
        y: prm ? 0 : y,
        willChange: "transform, opacity",
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{
          height: 1,
          background: HAIR_INK,
          transformOrigin: "left",
          scaleX: prm ? 1 : ruleScaleX,
        }}
      />
      <p
        style={{
          margin: "1.1rem 0 0",
          fontFamily: SERIF,
          fontSize: 18,
          lineHeight: 1.35,
          color: ON_INK,
        }}
      >
        {fact.lead}
      </p>
      <p
        style={{
          margin: "0.55rem 0 0",
          fontFamily: SANS,
          fontSize: 13,
          lineHeight: 1.65,
          color: ON_INK_SOFT,
        }}
      >
        {fact.gloss}
      </p>
    </motion.div>
  );
}
