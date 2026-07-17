"use client";

/* ═══════════════════════════════════════════════════════════════════
   SLOT 6 — "The Dossier" (the real 7-page application flow)
   A genuine ordered sequence — the only scene in the page where folio
   numbers are earned. On desktop the seven sheets ride a scroll-tied
   horizontal strip inside a sticky stage; on mobile (and with reduced
   motion) they fall back to a simple vertical stack of paper, no
   scroll-tie, no rotation.
   ═══════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  CREAM,
  EASE,
  GOLD,
  HAIR_INK,
  INK,
  ON_CREAM,
  ON_CREAM_FAINT,
  ON_CREAM_SOFT,
  PRODUCT_SERIF,
  Caption,
  Mono,
  V,
} from "@/components/talent-cinema/shared";

const SHEETS = [
  { n: "01", title: "The Board", body: "Which agency — and which of its open boards you're answering." },
  { n: "02", title: "Digitals", lead: "Raw, current, unretouched.", body: "The truth check agencies read first." },
  { n: "03", title: "Stats", body: "Your measurements, exactly as the booker will read them." },
  { n: "04", title: "The Book", body: "Only work that earns its place. It supports the digitals, never replaces them." },
  { n: "05", title: "The Card", body: "The leave-behind — from your saved cards, or composed live." },
  { n: "06", title: "The Message", body: "A short note, addressed to a person." },
  { n: "07", title: "Review & Send", body: "Sent once, frozen as a record. Withdraw any time; resubmit when you're ready." },
] as const;

const RESTING_ROTATION = [-1.2, 0.8, -1.2, 0.8, -1.2, 0.8, -1.2];

function Sheet({ sheet, index, stacked }: { sheet: (typeof SHEETS)[number]; index: number; stacked: boolean }) {
  return (
    <div
      className={stacked ? "w-full" : "w-[280px] shrink-0 lg:w-[310px]"}
      style={{
        backgroundColor: CREAM,
        borderRadius: 2,
        boxShadow: "0 18px 50px -20px rgba(0,0,0,0.5)",
        padding: 28,
        aspectRatio: "3 / 4",
        display: "flex",
        flexDirection: "column",
        transform: stacked ? undefined : `rotate(${RESTING_ROTATION[index]}deg)`,
      }}
    >
      <Mono color={ON_CREAM_FAINT} size={9}>{`${sheet.n} / 07`}</Mono>
      <h3
        style={{
          fontFamily: PRODUCT_SERIF,
          fontSize: 26,
          lineHeight: 1.15,
          color: ON_CREAM,
          margin: "0.75rem 0 0",
        }}
      >
        {sheet.title}
      </h3>
      <div className="mt-4 h-px w-6" style={{ backgroundColor: GOLD }} />
      <div className="mt-4" style={{ fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.7, color: ON_CREAM_SOFT }}>
        {"lead" in sheet ? (
          <p style={{ fontFamily: PRODUCT_SERIF, fontStyle: "italic", color: GOLD, margin: "0 0 6px" }}>
            {sheet.lead}
          </p>
        ) : null}
        <p style={{ margin: 0 }}>{sheet.body}</p>
      </div>
    </div>
  );
}

function DossierStrip({ caption }: { caption: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["2%", "-62%"]);

  return (
    <div ref={wrapperRef} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* the caption rides the sticky stage so the story stays present
            while the seven sheets travel */}
        <div className="mx-auto w-full max-w-6xl px-6 pt-16 lg:px-8">{caption}</div>

        <motion.div className="mt-10 flex gap-6 pl-6 lg:pl-8" style={{ x }}>
          {SHEETS.map((sheet, i) => (
            <Sheet key={sheet.n} sheet={sheet} index={i} stacked={false} />
          ))}
        </motion.div>

        <div
          className="pointer-events-none absolute bottom-10 left-[10%] right-[10%] h-px"
          style={{ backgroundColor: HAIR_INK }}
        >
          <motion.div
            className="h-full"
            style={{ backgroundColor: GOLD, transformOrigin: "left", scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </div>
  );
}

function DossierStack() {
  return (
    <div className="mx-auto flex max-w-[340px] flex-col gap-5 px-6 py-20 lg:px-8">
      {SHEETS.map((sheet, i) => (
        <motion.div
          key={sheet.n}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
        >
          <Sheet sheet={sheet} index={i} stacked />
        </motion.div>
      ))}
    </div>
  );
}

export default function SceneDossier() {
  const reducedMotion = useReducedMotion();
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const stacked = Boolean(reducedMotion) || isNarrow;

  const caption = (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reducedMotion ? 0.4 : 0.8, ease: EASE }}
    >
      <Caption
        dark
        maxWidth={820}
        headline={<>{"The whole package, before you "}<V>send</V>{"."}</>}
      >
        Seven pages, addressed to the agency — and the package audit runs before
        anything leaves: nothing mislabeled, nothing missing, nothing stale. Made,
        checked, and sent from the same studio your media, card, and public book
        already live in.
      </Caption>
    </motion.div>
  );

  return (
    <section className="relative" style={{ backgroundColor: INK }}>
      <div className="absolute inset-x-0 top-0 h-px divider-gold-center" />

      {stacked ? (
        <>
          <div className="mx-auto max-w-6xl px-6 pt-24 lg:px-8">{caption}</div>
          <DossierStack />
        </>
      ) : (
        <DossierStrip caption={caption} />
      )}

      <div className="absolute inset-x-0 bottom-0 h-px divider-gold-center" />
    </section>
  );
}
