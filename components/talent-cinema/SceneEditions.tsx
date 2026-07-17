"use client";

/* ═══════════════════════════════════════════════════════════════════
   Scene 4 — "Editions" (comp-card engine, scrollytelling setpiece)
   Re-stages the product's comp-card composition engine using the REAL
   renders it produced for one talent (already in /public/generated).
   Desktop: a sticky stage where SCROLL asks for the next take — each
   beat half-flips the card to a new art direction, with four slim gold
   progress ticks (the house progress idiom). The four renders are only
   ever labeled "takes"; the nine real edition names are listed as
   clerical fact, never mapped to the take on screen.
   Mobile / reduced-motion: a tap-driven "New direction" card instead.
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
} from "framer-motion";
import {
  CREAM_WARM,
  EASE,
  GOLD,
  ON_CREAM_FAINT,
  PRODUCT_SERIF,
  Caption,
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

function CaptionBlock() {
  return (
    <>
      <Caption
        dark={false}
        headline={
          <>
            Nine editions. One <V>you</V>.
          </>
        }
      >
        The comp-card engine art-directs like a studio: nine named editions,
        eight typographic voices, printed to a two-sided 5.5 × 8.5 PDF. An
        edition only unlocks when your photos genuinely support it — pin your
        hero frame, or ask for a new direction and let the house take another
        pass.
      </Caption>

      <div className="mt-7 max-w-[460px]">
        <Mono
          color={ON_CREAM_FAINT}
          size={10}
          tracking="0.2em"
          style={{ display: "block", lineHeight: 2.2 }}
        >
          {EDITIONS.join(" · ")}
        </Mono>
      </div>

      <div className="mt-2 max-w-[460px]">
        <Mono color={ON_CREAM_FAINT} size={9} style={{ display: "block" }}>
          SAVED CARDS — UP TO 40, TAGGED BY BOARD AND MARKET · NYC LA MIAMI LONDON PARIS MILAN TOKYO
        </Mono>
      </div>
    </>
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

/* ── Desktop: scroll asks for the next take ─────────────────────────── */
function EditionsScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const deck = useFlipDeck();
  const [beat, setBeat] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const b = Math.max(0, Math.min(TAKES.length - 1, Math.floor(v * 4.4)));
    if (b !== beat) {
      setBeat(b);
      deck.flipTo(b);
    }
  });

  return (
    <div ref={wrapRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-20 px-8">
          <div className="mx-auto w-full max-w-[400px]">
            <div className="mb-4 flex items-center justify-between">
              <Mono color={ON_CREAM_FAINT}>{`TAKE 0${deck.index + 1} / 04`}</Mono>
              {/* the house progress idiom: four slim gold ticks */}
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
            </div>

            <CardFace index={deck.index} rotateY={deck.rotateY} />

            <div
              className="mt-5 inline-flex items-baseline gap-2"
              style={{ fontFamily: PRODUCT_SERIF, fontSize: "1.05rem", color: GOLD }}
            >
              New direction
              <RedoGlyph />
              <Mono color={ON_CREAM_FAINT} size={9} tracking="0.18em" style={{ marginLeft: 10 }}>
                Keep scrolling
              </Mono>
            </div>
          </div>

          <div>
            <CaptionBlock />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile / reduced-motion: tap-driven takes ──────────────────────── */
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
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-8">
      <motion.div className="order-2 lg:order-1" {...entrance()}>
        <div className="mx-auto w-full max-w-[420px]">
          <div className="mb-4 flex items-center gap-3">
            <Mono color={ON_CREAM_FAINT}>{`TAKE 0${shown + 1} / 04`}</Mono>
            <div className="h-px flex-1" style={{ background: "rgba(26,26,26,0.14)" }} />
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

      <motion.div className="order-1 lg:order-2" {...entrance(0.12)}>
        <CaptionBlock />
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
