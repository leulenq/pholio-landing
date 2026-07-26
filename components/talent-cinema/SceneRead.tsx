"use client";

/* eslint-disable @next/next/no-img-element */

/* ─────────────────────────────────────────────────────────────────────
   ACT I — READ. Poster hero, not a split layout.
   Architectural type spans the full viewport in two staggered lines;
   the portrait frame stands INSIDE the typography — occluding the tail
   of line one, occluded by line two — so image and headline share one
   composition. The read happens on the photograph itself: reticle
   draws, readouts tick over the image, the verdict stamps, the photo
   develops into color. A single rail carries the sentence and the CTA.
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
  HAIR_INK,
  PRODUCT_SERIF,
  Readout,
  Reticle,
  V,
  Orb,
  DockLink,
} from "@/components/talent-cinema/shared";
import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";

const PHOTO = "/generated/comp-card/source/mara-voss-crossed-arm.jpg";

const READOUTS: { accent: string; text: string }[] = [
  { accent: "Shot 01 — ", text: "headshot · book, not a digital" },
  { accent: "Set — ", text: "no full-length on file" },
  { accent: "Digitals — ", text: "94 days old" },
];

const T = {
  reticle: 0.9,
  readout: (i: number) => 1.5 + i * 0.7,
  verdict: 3.6,
  develop: 4.0,
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

  /* scroll-out on two depths: type leaves faster than the photograph */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const lineReveal = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: inView ? { opacity: 1 } : {}, transition: { duration: 0.4 } }
      : {
          initial: { opacity: 0, y: "0.35em", clipPath: "inset(0 0 100% 0)" },
          animate: inView
            ? { opacity: 1, y: "0em", clipPath: "inset(0 0 -10% 0)" }
            : {},
          transition: { duration: 1.0, delay, ease: EASE },
        };

  const typeStyle: React.CSSProperties = {
    fontSize: "clamp(3.2rem, 10.5vw, 10rem)",
    lineHeight: 0.98,
    letterSpacing: "-0.03em",
    color: ON_INK,
    whiteSpace: "nowrap",
    margin: 0,
  };

  return (
    <section
      ref={ref}
      className="relative min-h-mobile-screen overflow-hidden texture-grain"
      style={{ backgroundColor: INK }}
    >
      <Orb size={700} style={{ top: "-16%", right: "-12%" }} />
      <Orb size={520} gold={false} style={{ bottom: "-14%", left: "-10%" }} />

      {/* ── the stage ──────────────────────────────────────────────── */}
      <div className="relative mx-auto h-mobile-screen w-full max-w-[1600px]">
        {/* line one — passes BEHIND the photograph */}
        <motion.h1
          aria-label="Know what they see."
          className="font-editorial absolute z-10 select-none"
          style={{
            ...typeStyle,
            left: "5vw",
            top: "16vh",
            y: reduced ? undefined : typeY,
            opacity: reduced ? undefined : fade,
          }}
          {...lineReveal(0.15)}
        >
          Know what
        </motion.h1>

        {/* the photograph — the thing being read */}
        <motion.div
          className="absolute z-20"
          style={{
            left: "50%",
            top: "51%",
            height: "min(60vh, 70vw)",
            aspectRatio: "3 / 4",
            translateX: "-16%",
            translateY: "-50%",
            y: reduced ? undefined : photoY,
            opacity: reduced ? undefined : fade,
          }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={reduced ? { duration: 0.4 } : { duration: 1.2, delay: 0.5, ease: EASE }}
        >
          <Reticle active={inView} inset={-11} size={20} delay={reduced ? 0 : T.reticle} />
          <motion.img
            src={PHOTO}
            alt="A talent's photo being read by Pholio — typed, set-checked, and dated"
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 12%" }}
            draggable={false}
            initial={{ filter: reduced ? "none" : "grayscale(100%) brightness(0.78)" }}
            animate={inView && readDone ? { filter: "grayscale(0%) brightness(1)" } : {}}
            transition={{ duration: 1.6, ease: EASE }}
          />
          {/* legibility scrim for the on-image readouts */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: "46%",
              background: "linear-gradient(to top, rgba(5,5,5,0.72), transparent)",
            }}
          />
          {/* the read, on the image itself */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
            {READOUTS.map((r, i) => (
              <div key={r.text} className="flex items-baseline gap-2.5">
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
                  size={9}
                  color="rgba(245,240,232,0.78)"
                />
              </div>
            ))}
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={reduced ? { duration: 0.4 } : { ...SPRING, delay: T.verdict }}
              style={{
                marginTop: 8,
                borderTop: "1px solid rgba(245,240,232,0.18)",
                paddingTop: 10,
              }}
            >
              <span
                style={{
                  fontFamily: PRODUCT_SERIF,
                  fontStyle: "italic",
                  fontSize: "clamp(13px, 1.2vw, 16px)",
                  lineHeight: 1.45,
                  color: "rgba(201,165,90,0.95)",
                }}
              >
                An agency decides in seconds, and never tells you from what.
                This does.
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* line two — passes IN FRONT of the photograph */}
        <motion.h1
          aria-hidden="true"
          className="font-editorial absolute z-30 select-none text-right"
          style={{
            ...typeStyle,
            right: "5vw",
            top: "calc(16vh + clamp(3.2rem, 10.5vw, 10rem) * 1.02)",
            y: reduced ? undefined : typeY,
            opacity: reduced ? undefined : fade,
          }}
          {...lineReveal(0.35)}
        >
          they <V>see</V>.
        </motion.h1>

        {/* ── the rail ───────────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-40"
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: reduced ? 0.2 : 0.9, ease: EASE }}
        >
          <div
            className="mx-auto flex max-w-[1600px] flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-10"
            style={{ borderTop: `1px solid ${HAIR_INK}` }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13.5,
                lineHeight: 1.65,
                color: ON_INK_SOFT,
                maxWidth: "44ch",
                margin: 0,
              }}
            >
              Pholio types every shot the way a booker does — digital or book
              work, what the set is missing, what&rsquo;s gone stale — and
              tells you first.
            </p>
            <DockLink href={`${APP_URL}/onboarding`}>Get your first read</DockLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
