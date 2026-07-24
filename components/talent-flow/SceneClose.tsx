"use client";

/* ═══════════════════════════════════════════════════════════════════
   Scene 8 — Close (ink).
   The last frame of the take: three checkable facts and the two
   entrances, settling into place with no exit — the camera simply
   comes to rest here.
   ═══════════════════════════════════════════════════════════════════ */

import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  Stage,
  Caption,
  Sweep,
  V,
  GoldCta,
  QuietLink,
  usePrm,
  APP_URL,
  ON_INK,
  HAIR_INK,
  SANS,
} from "./kit";

const FACTS = [
  "Applying is free.",
  "Agencies are vetted, and never charged.",
  "Your images and your data leave with you.",
];
const FACT_THRESHOLDS = [0.25, 0.33, 0.41];

export default function SceneClose() {
  const prm = usePrm();

  return (
    <Stage id="close" hvh={130}>
      {(progress) => (
        <div className="relative flex h-full w-full items-center justify-center px-6">
          <div className="mx-auto flex w-full max-w-[560px] flex-col items-center text-center">
            <SweepIn progress={progress} prm={prm} />
            <HeadlineIn progress={progress} prm={prm} />
            <div className="mt-10 flex w-full flex-col items-center md:mt-12">
              {FACTS.map((fact, i) => (
                <Fact
                  key={fact}
                  text={fact}
                  index={i}
                  threshold={FACT_THRESHOLDS[i]}
                  progress={progress}
                  prm={prm}
                />
              ))}
            </div>
            <CtaRow progress={progress} prm={prm} />
          </div>
        </div>
      )}
    </Stage>
  );
}

function SweepIn({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  const opacity = useTransform(progress, [0.08, 0.16], [0, 1]);

  return (
    <motion.div style={{ opacity: prm ? 1 : opacity, willChange: "opacity" }}>
      <Sweep centered width={72} />
    </motion.div>
  );
}

function HeadlineIn({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  const opacity = useTransform(progress, [0.14, 0.24], [0, 1]);
  const y = useTransform(progress, [0.14, 0.24], [16, 0]);

  return (
    <motion.div
      className="mt-6"
      style={{ opacity: prm ? 1 : opacity, y: prm ? 0 : y, willChange: "transform, opacity" }}
    >
      <Caption dark as="h2" align="center" headline={<>On your <V>terms.</V></>} />
    </motion.div>
  );
}

function Fact({
  text,
  index,
  threshold,
  progress,
  prm,
}: {
  text: string;
  index: number;
  threshold: number;
  progress: MotionValue<number>;
  prm: boolean;
}) {
  const end = threshold + 0.08;
  const opacity = useTransform(progress, [threshold, end], [0, 1]);
  const y = useTransform(progress, [threshold, end], [12, 0]);

  return (
    <motion.div
      className="flex w-full flex-col items-center"
      style={{ opacity: prm ? 1 : opacity, y: prm ? 0 : y, willChange: "transform, opacity" }}
    >
      {index > 0 ? (
        <span
          aria-hidden="true"
          style={{ display: "block", width: 24, height: 1, background: HAIR_INK, margin: "20px 0" }}
        />
      ) : null}
      <p style={{ margin: 0, fontFamily: SANS, fontSize: 15, color: ON_INK }}>{text}</p>
    </motion.div>
  );
}

function CtaRow({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  const opacity = useTransform(progress, [0.5, 0.58], [0, 1]);
  const y = useTransform(progress, [0.5, 0.58], [14, 0]);

  return (
    <motion.div
      className="mt-12 flex flex-wrap items-center justify-center gap-8 md:mt-14"
      style={{ opacity: prm ? 1 : opacity, y: prm ? 0 : y, willChange: "transform, opacity" }}
    >
      <GoldCta href={`${APP_URL}/onboarding`}>Start your book</GoldCta>
      <QuietLink href={`${APP_URL}/login`} dark>
        Continue with Instagram
      </QuietLink>
    </motion.div>
  );
}
