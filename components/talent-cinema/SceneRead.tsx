"use client";

/* eslint-disable @next/next/no-img-element */

/* ─────────────────────────────────────────────────────────────────────
   ACT I — READ ("Know what they see.")
   The page opens on Pholio's sharpest differentiator: PITS, the image
   typing service. A portrait is read live on stage — reticle brackets
   draw, mono readouts tick in (typed shot, set check, digitals age), a
   verdict lands in the product's serif — and only then does the photo
   develop into color: being read is being seen. The thesis and CTA sit
   beside it, above the fold. No onboarding theater.
   ───────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  EASE,
  SPRING,
  INK,
  GOLD,
  ON_INK,
  ON_INK_SOFT,
  ON_INK_FAINT,
  HAIR_INK,
  PRODUCT_SERIF,
  Mono,
  Readout,
  Reticle,
  V,
  Orb,
  DockLink,
} from "@/components/talent-cinema/shared";
import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";

const PHOTO = "/generated/comp-card/source/mara-voss-crossed-arm.jpg";

/* the read, in order — every line is real product behavior (PITS +
   package intelligence): typing, set slots, digitals freshness */
const READOUTS: { accent: string; text: string }[] = [
  { accent: "Typed — ", text: "editorial · book work" },
  { accent: "Set check — ", text: "full length missing" },
  { accent: "Digitals — ", text: "94 days old" },
];

const T = {
  reticle: 0.5,
  readout: (i: number) => 1.0 + i * 0.75,
  verdict: 3.3,
  develop: 3.7,
};

export default function SceneRead() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = !!useReducedMotion();
  const [readDone, setReadDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setReadDone(true);
      return;
    }
    const t = setTimeout(() => setReadDone(true), T.develop * 1000);
    return () => clearTimeout(t);
  }, [inView, reduced]);

  /* scroll-out: the stage recedes as the reader leaves it */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const rise = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: inView ? { opacity: 1 } : {}, transition: { duration: 0.4 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { ...SPRING, delay },
        };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden texture-grain"
      style={{ backgroundColor: INK }}
    >
      <Orb size={640} style={{ top: "-14%", left: "-10%" }} />
      <Orb size={520} gold={false} style={{ bottom: "-16%", right: "-8%" }} />

      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 pt-28 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:pt-28"
        style={reduced ? undefined : { y: stageY, opacity: stageOpacity }}
      >
        {/* ── The thesis ─────────────────────────────────────────── */}
        <div>
          <motion.h1
            {...rise(0.15)}
            className="font-editorial"
            style={{
              fontSize: "clamp(2.7rem, 5.8vw, 4.5rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: ON_INK,
              textWrap: "balance",
              margin: 0,
            }}
          >
            Know what they <V>see</V>.
          </motion.h1>

          <motion.p
            {...rise(0.35)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              lineHeight: 1.75,
              color: ON_INK_SOFT,
              maxWidth: "46ch",
              marginTop: "1.75rem",
            }}
          >
            Agencies judge your photos silently. Pholio reads them out loud —
            every upload typed, your set checked against the slots bookers
            expect, stale digitals flagged. You hear it here first, then fix
            it before anyone else looks.
          </motion.p>

          <motion.div {...rise(0.55)} className="mt-10">
            <DockLink href={`${APP_URL}/onboarding`}>Get your first read</DockLink>
          </motion.div>

          <motion.div {...rise(0.7)} className="mt-8">
            <Mono color={ON_INK_FAINT} size={9} tracking="0.24em">
              Free to start · free to apply
            </Mono>
          </motion.div>
        </div>

        {/* ── The read, live ─────────────────────────────────────── */}
        <motion.div {...rise(0.3)} className="relative mx-auto w-full max-w-[300px]">
          {/* the frame being read */}
          <div className="relative" style={{ aspectRatio: "3 / 4" }}>
            <Reticle active={inView} inset={-8} size={18} delay={reduced ? 0 : T.reticle} />
            <motion.img
              src={PHOTO}
              alt="A talent's photo being read by Pholio — typed, set-checked, and dated"
              className="h-full w-full object-cover"
              style={{ objectPosition: "50% 15%" }}
              draggable={false}
              initial={{ filter: reduced ? "none" : "grayscale(100%) brightness(0.7)" }}
              animate={
                inView && readDone ? { filter: "grayscale(0%) brightness(1)" } : {}
              }
              transition={{ duration: 1.4, ease: EASE }}
            />
            {/* measure line — height, the first stat every agent scans */}
            <div
              aria-hidden="true"
              className="absolute left-[-14px] top-[8%] bottom-[8%] hidden sm:block"
              style={{ width: 1 }}
            >
              <div
                style={{
                  width: 1,
                  height: "100%",
                  background: HAIR_INK,
                  transform: `scaleY(${inView ? 1 : 0})`,
                  transformOrigin: "top",
                  transition: `transform 1.2s cubic-bezier(0.22,1,0.36,1) ${reduced ? 0 : T.reticle + 0.3}s`,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: -4,
                  left: -8,
                  transform: "rotate(-90deg) translateX(0)",
                  transformOrigin: "left bottom",
                  whiteSpace: "nowrap",
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.6s ease ${reduced ? 0 : T.reticle + 1.2}s`,
                }}
              >
                <Mono color={ON_INK_FAINT} size={8} tracking="0.2em">
                  178 cm · 5&apos;10&quot;
                </Mono>
              </span>
            </div>
          </div>

          {/* the wire feed */}
          <div className="mt-5 flex flex-col gap-2">
            {READOUTS.map((r, i) => (
              <div key={r.text} className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  style={{
                    width: 4,
                    height: 4,
                    flexShrink: 0,
                    background: GOLD,
                    transform: "rotate(45deg) translateY(-1px)",
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.3s ease ${reduced ? 0 : T.readout(i)}s`,
                  }}
                />
                <Readout
                  accent={r.accent}
                  text={r.text}
                  active={inView}
                  delay={reduced ? 0 : T.readout(i)}
                  instant={reduced}
                  color="rgba(245,240,232,0.6)"
                />
              </div>
            ))}
          </div>

          {/* the verdict — the product's own voice */}
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={
              reduced ? { duration: 0.4 } : { ...SPRING, delay: T.verdict }
            }
            className="mt-5"
            style={{ borderTop: `1px solid ${HAIR_INK}`, paddingTop: 14 }}
          >
            <span
              style={{
                fontFamily: PRODUCT_SERIF,
                fontStyle: "italic",
                fontSize: 16,
                lineHeight: 1.5,
                color: "rgba(201,165,90,0.9)",
              }}
            >
              &ldquo;Strong frame — but it&rsquo;s book work. Shoot clean
              digitals before you apply.&rdquo;
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        style={{
          width: 1,
          height: 44,
          background: "linear-gradient(to bottom, transparent, rgba(201,165,90,0.45))",
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: reduced ? 0.4 : 4.2 }}
      />
    </section>
  );
}
