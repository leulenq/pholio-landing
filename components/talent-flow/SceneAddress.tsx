"use client";

/* ═══════════════════════════════════════════════════════════════════
   Scene 6 — Address (cream).
   Studio+: the one-page portfolio site at your own address. Opens on
   the rising rule Signal's baseline handed off — it becomes a browser
   frame's top rule, then the whole frame assembles a page inside
   itself. At the exit the frame compresses toward the object the next
   scene (Wallet) opens on.
   ═══════════════════════════════════════════════════════════════════ */

import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  Stage,
  Caption,
  Frame,
  Mono,
  V,
  usePrm,
  FACES,
  ON_CREAM,
  ON_CREAM_SOFT,
  ON_CREAM_FAINT,
  HAIR_CREAM,
  SERIF,
  SANS,
} from "./kit";

const PORTRAITS = [
  { src: FACES.b, alt: "Portfolio portrait, editorial" },
  { src: FACES.e, alt: "Portfolio portrait, natural light" },
  { src: FACES.m2, alt: "Portfolio portrait, three-quarter" },
] as const;

export default function SceneAddress() {
  const prm = usePrm();

  return (
    <Stage id="address" hvh={230}>
      {(progress) => (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-10 px-6 py-16 md:gap-14 md:px-16">
          <BrowserFrame progress={progress} prm={prm} />
          <div className="w-full max-w-[760px]">
            <AddressCaption progress={progress} prm={prm} />
          </div>
        </div>
      )}
    </Stage>
  );
}

function BrowserFrame({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  /* entrance (0.06–0.2) then a long hold, then the exit handoff
     (0.78–0.96): compress, drift, radius eases up, border brightens,
     then the whole frame fades just before the next scene's object. */
  const scale = useTransform(progress, [0.06, 0.2, 0.78, 0.95], [0.97, 1, 1, 0.42]);
  const opacity = useTransform(progress, [0.06, 0.2, 0.94, 0.96], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.78, 0.95], [0, -32]);
  const radius = useTransform(progress, [0.78, 0.95], ["8px", "12px"]);
  const borderColor = useTransform(
    progress,
    [0.78, 0.9],
    [HAIR_CREAM, "rgba(26,26,26,0.3)"],
  );

  const ruleScaleX = useTransform(progress, [0.06, 0.2], [0.6, 1]);
  const contentOpacity = useTransform(progress, [0.78, 0.86], [1, 0]);

  return (
    <motion.div
      className="w-full max-w-[760px]"
      style={{
        scale: prm ? 1 : scale,
        y: prm ? 0 : y,
        opacity: prm ? 1 : opacity,
        willChange: "transform, opacity",
      }}
    >
      {/* the rule Signal's baseline rose into */}
      <motion.div
        aria-hidden="true"
        style={{
          height: 1,
          background: HAIR_CREAM,
          transformOrigin: "center",
          scaleX: prm ? 1 : ruleScaleX,
        }}
      />
      <motion.div
        style={{
          marginTop: -1,
          border: "1px solid",
          borderColor: prm ? HAIR_CREAM : borderColor,
          borderRadius: prm ? "8px" : radius,
          overflow: "hidden",
          background: "rgba(26,26,26,0.015)",
        }}
      >
        {/* browser chrome */}
        <div
          className="flex items-center gap-1.5 px-4 py-2.5"
          style={{ borderBottom: `1px solid ${HAIR_CREAM}`, position: "relative" }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              aria-hidden="true"
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: ON_CREAM_FAINT,
                display: "inline-block",
              }}
            />
          ))}
          <div
            className="pointer-events-none absolute inset-x-0 flex justify-center"
            aria-hidden="true"
          >
            <Mono color={ON_CREAM_SOFT} size={10}>
              pholio.studio/you
            </Mono>
          </div>
        </div>

        {/* the one-page site */}
        <motion.div
          className="px-6 py-10 md:px-12 md:py-14"
          style={{ opacity: prm ? 1 : contentOpacity }}
        >
          <PageName progress={progress} prm={prm} />
          <PagePortraits progress={progress} prm={prm} />
          <PageStats progress={progress} prm={prm} />
          <PageLine progress={progress} prm={prm} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function PageName({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  const opacity = useTransform(progress, [0.22, 0.3], [0, 1]);
  const y = useTransform(progress, [0.22, 0.3], [16, 0]);

  return (
    <motion.h3
      className="font-editorial"
      style={{
        margin: 0,
        fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
        color: ON_CREAM,
        opacity: prm ? 1 : opacity,
        y: prm ? 0 : y,
        willChange: "transform, opacity",
      }}
    >
      Amara Okafor
    </motion.h3>
  );
}

function PagePortraits({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  const opacity = useTransform(progress, [0.3, 0.4], [0, 1]);
  const y = useTransform(progress, [0.3, 0.4], [16, 0]);

  return (
    <motion.div
      className="mt-6 grid grid-cols-3 gap-2 md:mt-8 md:gap-3"
      style={{ opacity: prm ? 1 : opacity, y: prm ? 0 : y, willChange: "transform, opacity" }}
    >
      {PORTRAITS.map((p) => (
        <Frame key={p.src} src={p.src} alt={p.alt} style={{ aspectRatio: "3 / 4" }} />
      ))}
    </motion.div>
  );
}

function PageStats({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  const opacity = useTransform(progress, [0.42, 0.5], [0, 1]);
  const y = useTransform(progress, [0.42, 0.5], [12, 0]);

  return (
    <motion.div
      className="mt-6 md:mt-8"
      style={{ opacity: prm ? 1 : opacity, y: prm ? 0 : y, willChange: "transform, opacity" }}
    >
      <Mono color={ON_CREAM_FAINT} size={10}>
        {"178 CM · 5′10″ — NEW YORK"}
      </Mono>
    </motion.div>
  );
}

function PageLine({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  const opacity = useTransform(progress, [0.5, 0.6], [0, 1]);
  const y = useTransform(progress, [0.5, 0.6], [12, 0]);

  return (
    <motion.div
      className="mt-6 md:mt-8"
      style={{ opacity: prm ? 1 : opacity, y: prm ? 0 : y, willChange: "transform, opacity" }}
    >
      <div style={{ height: 1, background: HAIR_CREAM }} />
      <p
        style={{
          marginTop: 16,
          marginBottom: 0,
          fontFamily: SANS,
          fontSize: 13,
          color: ON_CREAM_SOFT,
        }}
      >
        Selected work, digitals on request.
      </p>
    </motion.div>
  );
}

function AddressCaption({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  const opacity = useTransform(progress, [0.55, 0.68, 0.82, 0.95], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.55, 0.68], [16, 0]);

  return (
    <motion.div
      style={{ opacity: prm ? 1 : opacity, y: prm ? 0 : y, willChange: "transform, opacity" }}
    >
      <Caption dark={false} headline={<>One page, at your own <V>address.</V></>}>
        Built from your profile — current whenever it is. Part of Studio+.
      </Caption>
    </motion.div>
  );
}
