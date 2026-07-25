"use client";

/* ═══════════════════════════════════════════════════════════════════
   Scene 4 — Send (ink).
   GESTURE: lateral slide + snap → launch-forward.
   The dossier arrives laterally from off-frame right, its five panels
   snapping into their stack in quick mechanical succession rather than
   settling. The status thread lights row by row with a horizontal
   wipe, never a fade-up. Exit: the dossier launches toward the viewer
   and blows past the lens; the status thread leaves by a different
   means — a wipe to the right — so the two halves of the scene depart
   differently. A small gold tick survives to seed Signal.
   ═══════════════════════════════════════════════════════════════════ */

import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  Stage,
  Frame,
  Caption,
  Mono,
  V,
  usePrm,
  FACES,
  ON_INK,
  ON_INK_SOFT,
  ON_INK_FAINT,
  HAIR_INK,
  GOLD,
  SERIF,
} from "./kit";
import { useScrub, useWipe, useDraw, useLaunchForward } from "./motion";

type PanelSpec = {
  key: string;
  label: string;
  scatter: { x: number; y: number; rot: number };
  stacked: { x: number; y: number };
  z: number;
};

/* Bottom of stack to top. "board" renders last (on top) and carries
   the only visible face content — the rest peek out as a stacked edge. */
const PANELS: PanelSpec[] = [
  { key: "note", label: "NOTE", scatter: { x: -30, y: 22, rot: -6 }, stacked: { x: 10, y: -10 }, z: 1 },
  { key: "card", label: "CARD", scatter: { x: 24, y: 26, rot: 5 }, stacked: { x: 7.5, y: -7.5 }, z: 2 },
  { key: "stats", label: "STATS", scatter: { x: -22, y: -18, rot: 4 }, stacked: { x: 5, y: -5 }, z: 3 },
  { key: "digitals", label: "DIGITALS", scatter: { x: 26, y: -22, rot: -5 }, stacked: { x: 2.5, y: -2.5 }, z: 4 },
  { key: "board", label: "BOARD", scatter: { x: 4, y: -6, rot: 2 }, stacked: { x: 0, y: 0 }, z: 5 },
];

const ROWS = [
  { label: "IN REVIEW", at: 0.5 },
  { label: "REQUESTED MORE", at: 0.58 },
  { label: "DEVELOPMENT OFFER", at: 0.66 },
  { label: "KEPT ON FILE", at: 0.74 },
];

function DossierPanel({
  p,
  i,
  progress,
  prm,
}: {
  p: PanelSpec;
  i: number;
  progress: MotionValue<number>;
  prm: boolean;
}) {
  /* the snap: a short, mechanical, decisive collapse — not a settle */
  const start = 0.18 + i * 0.03;
  const end = 0.3 + i * 0.03;
  const x = useScrub(progress, [start, end], [p.scatter.x, p.stacked.x], "drive");
  const y = useScrub(progress, [start, end], [p.scatter.y, p.stacked.y], "drive");
  const rotate = useScrub(progress, [start, end], [p.scatter.rot, 0], "drive");
  /* edge labels read while the sheaf is fanned; they retire as it squares
     up so the stacked corner never garbles five labels into one spot */
  const labelOpacity = useTransform(progress, [0.24, 0.32], [1, 0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        x: prm ? p.stacked.x : x,
        y: prm ? p.stacked.y : y,
        rotate: prm ? 0 : rotate,
        zIndex: p.z,
        background: "rgba(255,255,255,0.035)",
        border: `1px solid ${HAIR_INK}`,
        borderRadius: 4,
        willChange: "transform",
      }}
    >
      {p.key !== "board" ? (
        <motion.span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 10,
            left: 12,
            opacity: prm ? 0 : labelOpacity,
          }}
        >
          <Mono color={ON_INK_FAINT} size={9}>
            {p.label}
          </Mono>
        </motion.span>
      ) : null}
      {p.key === "board" ? (
        <div style={{ position: "absolute", inset: 0, padding: "16px" }}>
          <div style={{ marginTop: 22 }}>
            <Mono color={ON_INK_FAINT} size={9}>
              WOMEN — MAIN
            </Mono>
          </div>
          <p style={{ fontFamily: SERIF, fontSize: 15, color: ON_INK, margin: "10px 0 0" }}>
            Atelier North — New York
          </p>
          <span aria-hidden="true" style={{ position: "absolute", bottom: 12, right: 14 }}>
            <Mono color={ON_INK_FAINT} size={9}>
              MATCH — STRONG
            </Mono>
          </span>
        </div>
      ) : null}
    </motion.div>
  );
}

function DigitalThumb({
  src,
  pos,
  i,
  progress,
  prm,
}: {
  src: string;
  pos: string;
  i: number;
  progress: MotionValue<number>;
  prm: boolean;
}) {
  const start = 0.22 + i * 0.02;
  const end = 0.34 + i * 0.02;
  const scale = useScrub(progress, [start, end], [0.7, 1], "arrival");
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div
      style={{ scale: prm ? 1 : scale, opacity: prm ? 1 : opacity, willChange: "transform, opacity" }}
    >
      <Frame
        src={src}
        alt=""
        style={{ width: 40, aspectRatio: "3 / 4" }}
        imgStyle={{ objectPosition: pos, transform: "scale(1.6)", transformOrigin: pos }}
      />
    </motion.div>
  );
}

function CheckedLine({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  const clip = useWipe(progress, [0.36, 0.46], "left");

  return (
    <motion.div
      aria-hidden="true"
      style={{ clipPath: prm ? "inset(0% 0% 0% 0%)" : clip, marginTop: 14 }}
    >
      <Mono color={GOLD} size={9}>
        CHECKED{" "}
      </Mono>
      <Mono color={ON_INK_FAINT} size={9}>
        — RIGHTS · STATS CURRENT · DIGITALS CURRENT
      </Mono>
    </motion.div>
  );
}

function Dossier({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  /* entrance: the dossier arrives laterally, from off-frame right */
  const entranceX = useScrub(progress, [0.02, 0.26], ["58%", "0%"], "arrival");
  const entranceOpacity = useScrub(progress, [0.02, 0.12], [0, 1], "arrival");
  /* exit: it launches toward the viewer and blows past the lens */
  const launch = useLaunchForward(progress, [0.84, 1]);
  const opacity = useTransform(
    [entranceOpacity, launch.opacity],
    ([a, b]) => (a as number) * (b as number),
  );

  return (
    <motion.div
      style={{
        x: prm ? 0 : entranceX,
        y: prm ? 0 : launch.y,
        scale: prm ? 1 : launch.scale,
        opacity: prm ? 1 : opacity,
        transformPerspective: 1000,
        willChange: "transform, opacity",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(320px, 78vw)",
          aspectRatio: "5 / 3.5",
        }}
      >
        {PANELS.map((p, i) => (
          <DossierPanel key={p.key} p={p} i={i} progress={progress} prm={prm} />
        ))}
      </div>

      <div aria-hidden="true" style={{ display: "flex", gap: 8, marginTop: 20 }}>
        {["50% 8%", "50% 30%", "50% 70%"].map((pos, idx) => (
          <DigitalThumb
            key={idx}
            src={FACES.book}
            pos={pos}
            i={idx}
            progress={progress}
            prm={prm}
          />
        ))}
      </div>

      <CheckedLine progress={progress} prm={prm} />
    </motion.div>
  );
}

function StatusRow({
  r,
  progress,
  prm,
}: {
  r: (typeof ROWS)[number];
  progress: MotionValue<number>;
  prm: boolean;
}) {
  /* rows light in with a horizontal wipe — no y translation at all */
  const clip = useWipe(progress, [r.at, r.at + 0.07], "left");
  const tick = useDraw(progress, [r.at, r.at + 0.05], "wipe");

  return (
    <motion.div
      style={{
        clipPath: prm ? "inset(0% 0% 0% 0%)" : clip,
        display: "flex",
        alignItems: "center",
        gap: 10,
        willChange: "clip-path",
      }}
    >
      <motion.span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: 14,
          height: 1,
          background: GOLD,
          transformOrigin: "left",
          scaleX: prm ? 1 : tick,
        }}
      />
      <Mono color={ON_INK_SOFT} size={10}>
        {r.label}
      </Mono>
    </motion.div>
  );
}

function StatusThread({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  /* the status thread leaves by a different means than the dossier: a
     wipe to the right, not a launch */
  const exitClip = useTransform(
    progress,
    [0.82, 0.94],
    ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 100%)"],
  );
  const glossClip = useWipe(progress, [0.76, 0.83], "left");

  return (
    <motion.div style={{ clipPath: prm ? "inset(0% 0% 0% 0%)" : exitClip, willChange: "clip-path" }}>
      <div className="flex flex-col gap-4">
        {ROWS.map((r) => (
          <StatusRow key={r.label} r={r} progress={progress} prm={prm} />
        ))}
        <motion.p
          style={{
            clipPath: prm ? "inset(0% 0% 0% 0%)" : glossClip,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 15,
            color: ON_INK_SOFT,
            marginTop: 8,
          }}
        >
          A soft yes. It says so.
        </motion.p>
      </div>
    </motion.div>
  );
}

function SendCaption({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  const opacity = useTransform(progress, [0.12, 0.22, 0.84, 0.92], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.12, 0.22], [20, 0]);

  return (
    <motion.div
      style={{ opacity: prm ? 1 : opacity, y: prm ? 0 : y, willChange: "transform, opacity" }}
    >
      <Caption
        dark
        headline={
          <>
            Applications that arrive <V>complete.</V>
          </>
        }
      >
        Board, digitals, stats, card, note — assembled and checked before anything leaves. And
        you see where each one stands.
      </Caption>
    </motion.div>
  );
}

function SendStage({ progress, prm }: { progress: MotionValue<number>; prm: boolean }) {
  /* handoff mark: seeds the next scene, arriving late in the exit */
  const tickOpacity = useTransform(progress, [0.9, 0.97], [0, 1]);

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
          <div className="flex flex-col items-center gap-10 md:grid md:grid-cols-[380px_1fr] md:items-start md:gap-16">
            <div className="w-full md:col-span-2">
              <SendCaption progress={progress} prm={prm} />
            </div>

            {/* dossier */}
            <div className="flex w-full justify-center md:justify-start">
              <Dossier progress={progress} prm={prm} />
            </div>

            {/* status thread */}
            <div className="flex w-full justify-center md:justify-start md:pt-2">
              <StatusThread progress={progress} prm={prm} />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          bottom: "18%",
          width: 10,
          height: 3,
          background: GOLD,
          transform: "translateX(-50%)",
          opacity: prm ? 0 : tickOpacity,
          willChange: "opacity",
        }}
      />
    </div>
  );
}

export default function SceneSend() {
  const prm = usePrm();

  return (
    <Stage id="send" hvh={285} z={5} overlap={116} clip={false}>
      {(progress) => <SendStage progress={progress} prm={prm} />}
    </Stage>
  );
}
