"use client";

/* ═══════════════════════════════════════════════════════════════════
   Scene 4 — Send (ink).
   The sheaf handed off by Book fans slightly, then squares into one
   aligned dossier — board, digitals, stats, card, note — quietly
   checked. A status thread lights in sequence beside it. Exit handoff:
   the dossier collapses into a single gold tick, the mark Signal
   opens on.
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
  progress,
  prm,
}: {
  p: PanelSpec;
  progress: MotionValue<number>;
  prm: boolean;
}) {
  const x = useTransform(progress, [0.08, 0.32], [p.scatter.x, p.stacked.x]);
  const y = useTransform(progress, [0.08, 0.32], [p.scatter.y, p.stacked.y]);
  const rotate = useTransform(progress, [0.08, 0.32], [p.scatter.rot, 0]);
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

function StatusRow({
  r,
  progress,
  prm,
}: {
  r: (typeof ROWS)[number];
  progress: MotionValue<number>;
  prm: boolean;
}) {
  const scaleX = useTransform(progress, [r.at, r.at + 0.06], [0, 1]);
  const opacity = useTransform(progress, [r.at, r.at + 0.06, 0.84, 0.92], [0.25, 1, 1, 0]);
  const y = useTransform(progress, [r.at, r.at + 0.06], [10, 0]);

  return (
    <motion.div
      style={{
        opacity: prm ? 1 : opacity,
        y: prm ? 0 : y,
        display: "flex",
        alignItems: "center",
        gap: 10,
        willChange: "transform, opacity",
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
          scaleX: prm ? 1 : scaleX,
        }}
      />
      <Mono color={ON_INK_SOFT} size={10}>
        {r.label}
      </Mono>
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

export default function SceneSend() {
  const prm = usePrm();

  return (
    <Stage id="send" hvh={280}>
      {(progress) => {
        const entryOpacity = useTransform(progress, [0, 1], [1, 1]);
        const thumbsOpacity = useTransform(progress, [0.2, 0.32], [0, 1]);
        const checkedOpacity = useTransform(progress, [0.36, 0.5], [0, 1]);
        const glossOpacity = useTransform(progress, [0.76, 0.83, 0.84, 0.92], [0, 1, 1, 0]);

        const collapseScale = useTransform(progress, [0.84, 0.95], [1, 0.06]);
        const collapseX = useTransform(progress, [0.84, 0.95], [0, 30]);
        const collapseY = useTransform(progress, [0.84, 0.95], [0, 210]);
        const collapseOpacity = useTransform(progress, [0.84, 0.9, 0.95], [1, 1, 0]);
        const tickOpacity = useTransform(progress, [0.88, 0.95], [0, 1]);

        return (
          <motion.div
            style={{
              position: "relative",
              height: "100%",
              opacity: prm ? 1 : entryOpacity,
              willChange: "opacity",
            }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
                <div className="flex flex-col items-center gap-10 md:grid md:grid-cols-[380px_1fr] md:items-start md:gap-16">
                  <div className="w-full md:col-span-2">
                    <SendCaption progress={progress} prm={prm} />
                  </div>

                  {/* dossier */}
                  <div className="flex w-full justify-center md:justify-start">
                    <motion.div
                      style={{
                        scale: prm ? 1 : collapseScale,
                        x: prm ? 0 : collapseX,
                        y: prm ? 0 : collapseY,
                        opacity: prm ? 1 : collapseOpacity,
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
                        {PANELS.map((p) => (
                          <DossierPanel key={p.key} p={p} progress={progress} prm={prm} />
                        ))}
                      </div>

                      <motion.div
                        aria-hidden="true"
                        style={{
                          opacity: prm ? 1 : thumbsOpacity,
                          display: "flex",
                          gap: 8,
                          marginTop: 20,
                        }}
                      >
                        {["50% 8%", "50% 30%", "50% 70%"].map((pos, idx) => (
                          <Frame
                            key={idx}
                            src={FACES.book}
                            alt=""
                            style={{ width: 40, aspectRatio: "3 / 4" }}
                            imgStyle={{
                              objectPosition: pos,
                              transform: "scale(1.6)",
                              transformOrigin: pos,
                            }}
                          />
                        ))}
                      </motion.div>

                      <motion.div
                        aria-hidden="true"
                        style={{ opacity: prm ? 1 : checkedOpacity, marginTop: 14 }}
                      >
                        <Mono color={GOLD} size={9}>
                          CHECKED{" "}
                        </Mono>
                        <Mono color={ON_INK_FAINT} size={9}>
                          — RIGHTS · STATS CURRENT · DIGITALS CURRENT
                        </Mono>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* status thread */}
                  <div className="flex w-full justify-center md:justify-start md:pt-2">
                    <div className="flex flex-col gap-4">
                      {ROWS.map((r) => (
                        <StatusRow key={r.label} r={r} progress={progress} prm={prm} />
                      ))}
                      <motion.p
                        style={{
                          opacity: prm ? 1 : glossOpacity,
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
                  </div>
                </div>
              </div>
            </div>

            {/* handoff mark: the dossier cross-fades into a single gold tick */}
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
          </motion.div>
        );
      }}
    </Stage>
  );
}
