"use client";

/* ═══════════════════════════════════════════════════════════════════
   Scene 4 — "Editions" (comp-card engine, scrollytelling setpiece)
   Re-stages the product's comp-card composition engine using the REAL
   renders it produced for one talent (already in /public/generated).
   Full-bleed poster theater: the card sits dead-center on the sticky
   stage, ghost architectural type ("Nine" / "editions.") reads as
   depth behind it, and the nine real edition names live as a clerical
   progress rail pinned to the stage's bottom edge — no side-by-side
   caption/image split. The four renders are only ever labeled "takes";
   the nine real edition names are listed as clerical fact, never
   mapped to the take on screen.
   Mobile / reduced-motion: a tap-driven "New direction" card, centered.
   ═══════════════════════════════════════════════════════════════════ */

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  CREAM_WARM,
  EASE,
  GOLD,
  ON_CREAM,
  ON_CREAM_SOFT,
  ON_CREAM_FAINT,
  HAIR_CREAM,
  PRODUCT_SERIF,
  Mono,
  V,
} from "@/components/talent-cinema/shared";

const TAKES = [
  { src: "/generated/comp-card/elara-keats-front.png", alt: "Comp card — the standard take" },
  { src: "/generated/comp-card/elara-keats-gallery-mat.png", alt: "Comp card — gallery mat take" },
  { src: "/generated/comp-card/elara-keats-split-field.png", alt: "Comp card — split field take" },
  { src: "/generated/comp-card/elara-keats-statement.png", alt: "Comp card — statement take" },
];

const EDITIONS = [
  "THE STANDARD",
  "THE STRIP",
  "THE MONOGRAPH",
  "THE MASTHEAD",
  "THE GRID",
  "THE COVER STORY",
  "THE NIGHT EDITION",
  "THE DIPTYCH",
  "THE CUTOUT",
];

const CARD_SHADOW = "0 34px 80px -38px rgba(26,26,26,0.55), 0 0 0 1px rgba(26,26,26,0.08)";

function RedoGlyph() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 1 1 2.64 6.36" />
      <path d="M3 16v-4h4" />
    </svg>
  );
}

function HeadlineBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="mx-auto text-center" style={{ maxWidth: 620 }}>
      <h2
        className="font-editorial"
        style={{
          fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)",
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          color: ON_CREAM,
          textWrap: "balance",
          margin: 0,
        }}
      >
        {"Nine editions. Made to "}
        <V>standard</V>
        {"."}
      </h2>
      {!compact ? (
        <p
          style={{
            marginTop: 12,
            fontFamily: "var(--font-sans)",
            fontSize: 13.5,
            lineHeight: 1.75,
            color: ON_CREAM_SOFT,
            maxWidth: "60ch",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Each edition is a full art direction composed from your own photos —
          the crop, the palette, the type all read off your pixels. Your face is
          never covered, and your name never ships unless it stays legible over
          the image. Re-roll for a genuinely different direction, not the same
          card in a new color.
        </p>
      ) : null}
    </div>
  );
}

/* Flip machinery shared by both modes: half-turn to 90°, swap the render
   while the card is edge-on, return to rest. */
function useFlipDeck() {
  const [index, setIndex] = useState(0);
  const rotateY = useMotionValue(0);
  const busyRef = useRef(false);
  const targetRef = useRef(0);
  const indexRef = useRef(0);

  const flipTo = (next: number) => {
    targetRef.current = next;
    if (busyRef.current || next === indexRef.current) return;
    busyRef.current = true;
    animate(rotateY, 90, {
      duration: 0.32,
      ease: EASE,
      onComplete: () => {
        indexRef.current = targetRef.current;
        setIndex(targetRef.current);
        animate(rotateY, 0, {
          duration: 0.36,
          ease: EASE,
          onComplete: () => {
            busyRef.current = false;
            // catch up if scroll outran the flip
            if (targetRef.current !== indexRef.current) flipTo(targetRef.current);
          },
        });
      },
    });
  };

  return { index, rotateY, flipTo, busyRef };
}

function CardFace({ index, rotateY }: { index: number; rotateY: ReturnType<typeof useMotionValue<number>> }) {
  const take = TAKES[index];
  return (
    <div
      style={{
        height: "100%",
        aspectRatio: "5.5 / 8.5",
        borderRadius: 3,
        boxShadow: CARD_SHADOW,
        overflow: "hidden",
        perspective: 1600,
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          rotateY,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      >
        <img src={take.src} alt={take.alt} draggable={false} className="h-full w-full object-cover" />
      </motion.div>
    </div>
  );
}

/* Ghost architectural type behind the card — depth, not headline. */
function GhostType({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const nineY = useTransform(progress, [0, 1], [0, -40]);
  const editionsY = useTransform(progress, [0, 1], [0, 40]);
  const ghostStyle: React.CSSProperties = {
    color: "rgba(26,26,26,0.07)",
    whiteSpace: "nowrap",
    fontSize: "clamp(4rem, 13vw, 12rem)",
    margin: 0,
    lineHeight: 1,
  };
  return (
    <>
      <motion.p
        aria-hidden="true"
        className="font-editorial absolute select-none"
        style={{ ...ghostStyle, left: "4vw", top: "12vh", y: nineY }}
      >
        Nine
      </motion.p>
      <motion.p
        aria-hidden="true"
        className="font-editorial absolute select-none"
        style={{ ...ghostStyle, right: "4vw", bottom: "18vh", y: editionsY }}
      >
        editions.
      </motion.p>
    </>
  );
}

/* Bottom edge rail — the nine edition names double as the act's progress
   indicator, lighting gold as scroll advances. */
function EditionsRail({ progress }: { progress: number }) {
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-10"
      style={{ borderTop: `1px solid ${HAIR_CREAM}` }}
    >
      <div className="px-6 pt-3 text-center">
        <Mono color={ON_CREAM_FAINT} size={8} tracking="0.2em">
          5.5 × 8.5 IN · TWO-SIDED · PRINT-READY
        </Mono>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-4 lg:flex-nowrap lg:justify-between">
        {EDITIONS.map((name, i) => (
          <Mono
            key={name}
            color={progress > i / EDITIONS.length ? GOLD : ON_CREAM_FAINT}
            size={9}
            tracking="0.18em"
            style={{
              whiteSpace: "nowrap",
              transition: "color 0.45s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {name}
          </Mono>
        ))}
      </div>
    </div>
  );
}

/* ── Desktop: scroll asks for the next take, centered poster stage ──── */
function EditionsScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const deck = useFlipDeck();
  const [beat, setBeat] = useState(0);
  const [railProgress, setRailProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setRailProgress(v);
    const b = Math.max(0, Math.min(TAKES.length - 1, Math.floor(v * 4.4)));
    if (b !== beat) {
      setBeat(b);
      deck.flipTo(b);
    }
  });

  return (
    <div ref={wrapRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-mobile-screen overflow-hidden">
        <GhostType progress={scrollYProgress} />

        <div className="mx-auto flex h-full max-w-[1600px] flex-col items-center px-6 pb-24 pt-16 lg:px-10">
          <div className="z-10">
            <HeadlineBlock />
          </div>

          <div className="relative z-10 mt-8 flex flex-1 items-center justify-center">
            <div className="relative" style={{ height: "min(64vh, 78vw)" }}>
              <CardFace index={deck.index} rotateY={deck.rotateY} />
            </div>
          </div>

          <div className="z-10 mb-2 flex items-center gap-4">
            <Mono color={ON_CREAM_FAINT}>{`DIRECTION 0${deck.index + 1} / 04`}</Mono>
            <div className="flex items-center gap-2" aria-hidden="true">
              {TAKES.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 26,
                    height: 1,
                    backgroundColor: i <= beat ? GOLD : "rgba(26,26,26,0.16)",
                    transition: "background-color 0.45s cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
              ))}
            </div>
            <Mono color={ON_CREAM_FAINT} size={9} tracking="0.18em">
              Keep scrolling
            </Mono>
          </div>
        </div>

        <EditionsRail progress={railProgress} />
      </div>
    </div>
  );
}

/* ── Mobile / reduced-motion: tap-driven takes, centered single column ─ */
function EditionsStatic({ reduced }: { reduced: boolean }) {
  const deck = useFlipDeck();
  const [fadeIndex, setFadeIndex] = useState(0);

  const advance = () => {
    if (reduced) {
      setFadeIndex((i) => (i + 1) % TAKES.length);
      return;
    }
    if (deck.busyRef.current) return;
    deck.flipTo((deck.index + 1) % TAKES.length);
  };

  const shown = reduced ? fadeIndex : deck.index;

  const entrance = (delay = 0) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" } as const,
    transition: { duration: reduced ? 0.4 : 0.8, ease: EASE, delay: reduced ? 0 : delay },
  });

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-10 px-6 py-24 text-center lg:px-8">
      <motion.div {...entrance()}>
        <HeadlineBlock />
      </motion.div>

      <motion.div className="w-full" {...entrance(0.1)}>
        <div className="mx-auto w-full max-w-[320px]">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Mono color={ON_CREAM_FAINT}>{`DIRECTION 0${shown + 1} / 04`}</Mono>
          </div>

          {reduced ? (
            <div
              style={{
                aspectRatio: "5.5 / 8.5",
                borderRadius: 3,
                boxShadow: CARD_SHADOW,
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={TAKES[shown].src}
                  src={TAKES[shown].src}
                  alt={TAKES[shown].alt}
                  draggable={false}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
            </div>
          ) : (
            <CardFace index={deck.index} rotateY={deck.rotateY} />
          )}

          <button
            type="button"
            onClick={advance}
            aria-label="Show the next take of this comp card"
            className="mt-5 inline-flex cursor-pointer items-baseline gap-2 border-none bg-transparent p-0 outline-none focus-visible:[outline:1px_solid_#C9A55A] focus-visible:[outline-offset:4px]"
            style={{ fontFamily: PRODUCT_SERIF, fontSize: "1.1rem", color: GOLD }}
          >
            New direction
            <RedoGlyph />
          </button>
        </div>
      </motion.div>

      <motion.div className="w-full max-w-[420px]" {...entrance(0.18)}>
        <Mono
          color={ON_CREAM_FAINT}
          size={10}
          tracking="0.2em"
          style={{ display: "block", lineHeight: 2.2 }}
        >
          {EDITIONS.join(" · ")}
        </Mono>
        <Mono color={ON_CREAM_FAINT} size={9} style={{ display: "block", marginTop: 6 }}>
          5.5 × 8.5 IN · TWO-SIDED · PRINT-READY
        </Mono>
      </motion.div>
    </div>
  );
}

export default function SceneEditions() {
  const reduced = !!useReducedMotion();
  const [narrow, setNarrow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const scrollMode = mounted && !reduced && !narrow;

  return (
    <section className="relative texture-grain" style={{ backgroundColor: CREAM_WARM }}>
      <div className="absolute inset-x-0 top-0 h-px divider-gold-center" />
      {scrollMode ? <EditionsScroll /> : <EditionsStatic reduced={reduced} />}
    </section>
  );
}
