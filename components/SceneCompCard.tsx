"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  cubicBezier,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { CompCardBack, CompCardFront } from "./compcard";

const ease = [0.22, 1, 0.36, 1] as const;
// Ease-in-out for every scroll segment: the card accelerates out of a pose
// and decelerates into the next, so each beat reads as an arrival, not a slide.
const GLIDE = cubicBezier(0.65, 0, 0.35, 1);

/* One headline + one sentence per beat. Nothing else. */
const SCENES = [
  {
    key: "front",
    side: "center" as const,
    head: ["Four frames. One ", "read", "."],
    sub: "The card an agency forwards without fixing it first.",
  },
  {
    key: "angle",
    side: "left" as const,
    head: ["Made to be ", "held", "."],
    sub: "A real object — not another attachment.",
  },
  {
    key: "back",
    side: "right" as const,
    head: ["The whole ", "sitting", "."],
    sub: "Front and back. Every look from one shoot.",
  },
  {
    key: "detail",
    side: "left" as const,
    head: ["Finished to the ", "millimeter", "."],
    sub: "Down to the last measurement.",
  },
] as const;

/* Caption placement — centered on mobile, composed left/right on md+. */
function captionClass(side: "center" | "left" | "right") {
  const base =
    "pointer-events-none absolute z-20 flex flex-col px-6 bottom-[11vh] left-1/2 -translate-x-1/2 items-center text-center max-w-[34rem]";
  if (side === "left")
    return `${base} md:bottom-auto md:top-1/2 md:left-[7%] lg:left-[9%] md:translate-x-0 md:-translate-y-1/2 md:items-start md:text-left md:max-w-[20rem]`;
  if (side === "right")
    return `${base} md:bottom-auto md:top-1/2 md:left-auto md:right-[7%] lg:right-[9%] md:translate-x-0 md:-translate-y-1/2 md:items-end md:text-right md:max-w-[20rem]`;
  return base; // center
}

export default function SceneCompCard() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  const { scrollYProgress: rawProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // All beats complete by 0.78, then the final frame HOLDS — that tail
  // gives the Studio+ section a full-screen window to rise up and take
  // over without disturbing any beat's timing. Section height is sized
  // (440vh) so the hold is a real on-screen pause.
  const scrollYProgress = useTransform(rawProgress, [0, 0.78], [0, 1], { clamp: true });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= 0.84) setPhase(3);
    else if (v >= 0.58) setPhase(2);
    else if (v >= 0.28) setPhase(1);
    else setPhase(0);
  });

  // ── The choreography ─────────────────────────────────────────────
  // ONE physical card, driven directly off (Lenis-smoothed) scroll, through a
  // single continuous turn: front → angled front → contact-sheet back → and
  // back to front for the detail zoom. Each property is a clean hold → single
  // eased move → hold, so nothing stops-and-starts mid-motion.
  //   front 0–.18 · tilt → angle .18–.30 · flip → back .48–.64
  //   back hold .64–.78 · turn back to front .78–.92 · detail hold .92–1
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.3, 0.48, 0.64, 0.78, 0.92, 1],
    [0, 0, -18, -18, -180, -180, -360, -360],
    { ease: GLIDE }
  );
  // A subtle nod during the angle beat — one rise, one return.
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4, 0.48, 1],
    [0, 0, 3, 0, 0],
    { ease: GLIDE }
  );
  // A whisper of lean during the angle beat — kept tiny so it never wobbles.
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 0.3, 0.42, 0.48, 1],
    [0, 0, -1, 0, 0],
    { ease: GLIDE }
  );
  // Depth: leans toward the viewer at the rest poses, recedes through the flip,
  // then comes well forward for the detail beat as it turns back to front.
  const z = useTransform(
    scrollYProgress,
    [0, 0.18, 0.48, 0.56, 0.64, 0.78, 0.92, 1],
    [0, 14, 14, -18, 8, 8, 36, 36],
    { ease: GLIDE }
  );
  // Restrained breathing — settle, a dip through the flip, then the detail zoom
  // (capped ~1.28× so it stays clear of the header and caption band).
  const scale = useTransform(
    scrollYProgress,
    [0, 0.18, 0.48, 0.56, 0.64, 0.78, 0.92, 1],
    [0.94, 1, 1, 0.96, 0.98, 0.98, 1.28, 1.28],
    { ease: GLIDE }
  );
  // Lateral composition: drifts right for the left-side angle caption, left for
  // the right-side back caption, then re-centers for the detail zoom.
  const x = useTransform(
    scrollYProgress,
    [0, 0.18, 0.36, 0.48, 0.62, 0.78, 0.92, 1],
    ["0%", "0%", "12%", "12%", "-10%", "-10%", "0%", "0%"],
    { ease: GLIDE }
  );
  // State 1 sits high to clear the bottom-center caption; settles to neutral,
  // then a hair lower for the zoom so the enlarged card stays under the header.
  const y = useTransform(
    scrollYProgress,
    [0, 0.18, 0.32, 0.78, 0.92, 1],
    ["-6%", "-6%", "-2%", "-2%", "2%", "2%"],
    { ease: GLIDE }
  );

  // ── State 1: the four-frame fan that gathers into one ─────────
  const gather = useTransform(scrollYProgress, [0, 0.16], [1, 0], { ease: GLIDE });
  const fanOpacity = useTransform(gather, [0, 1], [0, 0.42]);
  // wide, balanced spread; the third card lifts up + back (not a centered overlap)
  const fan = [
    { x: -38, y: 6, r: -9, s: 0.96 },
    { x: 38, y: 6, r: 9, s: 0.96 },
    { x: 0, y: -18, r: 0, s: 0.9 },
  ];
  const fanX0 = useTransform(gather, (g) => `${g * fan[0].x}%`);
  const fanY0 = useTransform(gather, (g) => `${g * fan[0].y}%`);
  const fanR0 = useTransform(gather, (g) => g * fan[0].r);
  const fanS0 = useTransform(gather, (g) => 1 - g * (1 - fan[0].s));
  const fanX1 = useTransform(gather, (g) => `${g * fan[1].x}%`);
  const fanY1 = useTransform(gather, (g) => `${g * fan[1].y}%`);
  const fanR1 = useTransform(gather, (g) => g * fan[1].r);
  const fanS1 = useTransform(gather, (g) => 1 - g * (1 - fan[1].s));
  const fanX2 = useTransform(gather, (g) => `${g * fan[2].x}%`);
  const fanY2 = useTransform(gather, (g) => `${g * fan[2].y}%`);
  const fanR2 = useTransform(gather, (g) => g * fan[2].r);
  const fanS2 = useTransform(gather, (g) => 1 - g * (1 - fan[2].s));
  const fanTransforms = [
    { x: fanX0, y: fanY0, rotateZ: fanR0, scale: fanS0 },
    { x: fanX1, y: fanY1, rotateZ: fanR1, scale: fanS1 },
    { x: fanX2, y: fanY2, rotateZ: fanR2, scale: fanS2 },
  ];

  // The card stays present the whole way through — including the detail zoom,
  // which is now the same card turned back to front (no overlay double). The
  // front/back faces swap automatically via backfaceVisibility as it turns.

  // ── Progress (minimal: four slim ticks) ───────────────────────
  const seg0 = useTransform(scrollYProgress, [0, 0.22], [0, 1]);
  const seg1 = useTransform(scrollYProgress, [0.22, 0.46], [0, 1]);
  const seg2 = useTransform(scrollYProgress, [0.46, 0.72], [0, 1]);
  const seg3 = useTransform(scrollYProgress, [0.72, 1], [0, 1]);
  const segs = [seg0, seg1, seg2, seg3];
  const progressOpacity = useTransform(scrollYProgress, [0, 0.7, 0.76], [1, 1, 0]);

  const rm = prefersReducedMotion;
  const cardStyle = {
    rotateY: rm ? 0 : rotateY,
    rotateX: rm ? 0 : rotateX,
    rotateZ: rm ? 0 : rotateZ,
    z: rm ? 0 : z,
    scale: rm ? 1 : scale,
    x: rm ? 0 : x,
    y: rm ? 0 : y,
    transformStyle: "preserve-3d" as const,
  };

  const faceShadow =
    "0 50px 110px -30px rgba(0,0,0,0.82), 0 18px 50px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)";

  const scene = SCENES[phase];

  return (
    <section
      ref={sectionRef}
      data-header-switch="comp-card"
      className="relative"
      style={{ height: "440vh", backgroundColor: "#050505" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: "#050505" }}>
        {/* stage */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundColor: "#050505" }}
        />

        {/* the card, in 3D space — sits high, clear of the caption */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center px-6 pt-12 pb-36"
        >
          <div
            className="relative w-[14.25rem] sm:w-[15.25rem] md:w-[16.25rem] lg:w-[17.5rem]"
            style={{ aspectRatio: "2 / 3", perspective: 1400, perspectiveOrigin: "50% 45%" }}
          >
            {/* four-frame fan — gathers into one (state 1) */}
            {!rm &&
              fanTransforms.map((t, i) => (
                <motion.div
                  key={`fan-${i}`}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-[0.55rem]"
                  style={{ ...t, opacity: fanOpacity, boxShadow: faceShadow }}
                >
                  <CompCardFront />
                </motion.div>
              ))}

            {/* the card — front + back faces */}
            <motion.div className="absolute inset-0" style={cardStyle}>
              <div
                aria-hidden
                className="absolute inset-y-1 left-0 w-[8px] rounded-l-[0.45rem]"
                style={{
                  background: "linear-gradient(90deg, rgba(180,170,150,0.65), rgba(250,247,242,0.92))",
                  transform: "rotateY(90deg) translateX(-4px)",
                  transformOrigin: "left center",
                }}
              />
              <div
                className="absolute inset-0 overflow-hidden rounded-[0.55rem]"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  boxShadow: faceShadow,
                  transform: "translateZ(1px)",
                }}
              >
                <CompCardFront />
              </div>
              <div
                className="absolute inset-0 overflow-hidden rounded-[0.55rem]"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg) translateZ(1px)",
                  boxShadow: faceShadow,
                }}
              >
                <CompCardBack />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* caption — one headline, one line, composed per scene */}
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.key}
            initial={{ opacity: 0, y: rm ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: rm ? 0 : -10 }}
            transition={{ duration: 0.6, ease }}
            className={captionClass(scene.side)}
          >
            <div
              className="mb-5 h-px w-10"
              style={{ background: "linear-gradient(to right, transparent, #C9A55A, transparent)" }}
            />
            <h2 className="font-editorial text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.02] text-[#FAF7F2]">
              {scene.head[0]}
              <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
                {scene.head[1]}
              </span>
              {scene.head[2]}
            </h2>
            <p className="mt-4 max-w-[30rem] text-sm leading-relaxed text-white/45">{scene.sub}</p>
          </motion.div>
        </AnimatePresence>

        {/* progress — four slim ticks */}
        <motion.div
          className="absolute bottom-[5vh] left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
          style={{ opacity: rm ? 1 : progressOpacity }}
        >
          {segs.map((segFill, i) => (
            <div key={i} className="h-px w-7 overflow-hidden bg-white/15">
              <motion.div
                className="h-full w-full origin-left"
                style={{ scaleX: rm ? (i === 0 ? 1 : 0) : segFill, backgroundColor: "#C9A55A" }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
