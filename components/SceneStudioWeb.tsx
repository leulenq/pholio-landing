"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  cubicBezier,
} from "framer-motion";
import StudioPortfolio from "@/components/studio/StudioPortfolio";

const GLIDE = cubicBezier(0.6, 0, 0.3, 1); // ease-in-out — smooth start AND stop

/* Realistic browser toolbar icon — line style, neutral, readable. */
function ToolIcon({ d, o = 0.6 }: { d: string; o?: number }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3c3c43" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: o }}>
      <path d={d} />
    </svg>
  );
}

/* ── Choreography (smoothed progress over the section) ───────────────
   A strict, staged progression — text, THEN preview, THEN immersion —
   driven by a SPRING-SMOOTHED progress so the motion glides. Ease-in-out
   at every boundary keeps velocity continuous (no rough starts/stops).
   (pre-pin)  the cream stage rises a FULL viewport over the comp-card's
              held frame — a real takeover
   0.00–0.33  TEXT ALONE — editorial header holds on cream (preview at 0)
   0.33–0.39  the text recedes and clears
   0.39–0.45  the preview ENTERS — the browser window glides in to a card
   0.45–0.49  the window HOLDS as a card (you read it as a real browser)
   0.49–0.57  the window EXPANDS to full-bleed
   0.57–0.63  the hero of the site holds — take in the opening
   0.63–0.98  the site scrolls at a natural pace
   0.98–1.00  rest on the contact screen
   Section is 680vh, so 0.10 of progress ≈ 58vh of scroll.                */

export default function SceneStudioWeb() {
  const sectionRef = useRef<HTMLElement>(null);
  const rm = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Spring-smooth the scroll so the whole sequence glides rather than
  // tracking raw scroll 1:1 — this is what makes it feel premium/controlled.
  const sp = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4, restDelta: 0.0004 });

  // Stage 1 — the standalone text recedes and clears before the preview.
  const introOpacity = useTransform(sp, [0.33, 0.39], [1, 0], { ease: GLIDE });
  const introScale = useTransform(sp, [0.33, 0.41], [1, 0.95], { ease: GLIDE });
  const introY = useTransform(sp, [0.33, 0.41], ["0px", "-40px"], { ease: GLIDE });

  // Stage 2-3 — the browser window: hidden (scale 0), then it ENTERS as a
  // centered card, HOLDS as a card, then EXPANDS to full-bleed. Scale only,
  // always opaque — never a fade. Ease-in-out on every moving segment.
  const siteScale = useTransform(sp, [0.39, 0.45, 0.49, 0.57], [0, 0.5, 0.5, 1], { ease: [GLIDE, GLIDE, GLIDE] });
  const siteRadius = useTransform(sp, [0.39, 0.49, 0.57], [18, 18, 0], { ease: [GLIDE, GLIDE] });
  const siteShadow = useTransform(
    sp,
    [0.39, 0.49, 0.57],
    ["0 50px 130px -24px rgba(5,5,5,0.7)", "0 50px 130px -24px rgba(5,5,5,0.7)", "0 0 0 0 rgba(0,0,0,0)"]
  );

  // Stage 4 — the site scrolls continuously after a hero hold. 4 screens =
  // a 400% column; -75% reveals all. Linear so it tracks the smoothed scroll.
  const contentY = useTransform(sp, [0.63, 0.98], ["0%", "-75%"]);

  if (rm) {
    return (
      <section id="studio-plus" className="relative" style={{ backgroundColor: "#FFFDF8" }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Intro />
          <div className="relative mt-12 overflow-hidden" style={{ borderRadius: 10, height: "78vh", backgroundColor: "#0a0a0a", boxShadow: "0 40px 100px -30px rgba(5,5,5,0.45), 0 0 0 1px rgba(15,23,42,0.08)" }}>
            <BrowserChrome />
            <div className="absolute inset-x-0" style={{ top: 84, bottom: 0 }}>
              <StudioPortfolio />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="studio-plus"
      ref={sectionRef}
      className="relative"
      style={{ height: "680vh", zIndex: 30, marginTop: "-100vh" }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: "#FFFDF8", boxShadow: "0 -40px 90px -10px rgba(5,5,5,0.6)" }}
      >
        {/* ── Stage 1: the standalone text on cream ─────────────── */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center px-6"
          style={{ opacity: introOpacity, scale: introScale, y: introY }}
        >
          <Intro />
        </motion.div>

        {/* ── Stage 2-4: the browser window enters, expands, scrolls ── */}
        <motion.div
          className="absolute inset-0 z-20 overflow-hidden"
          style={{ scale: siteScale, borderRadius: siteRadius, boxShadow: siteShadow, backgroundColor: "#0a0a0a", transformOrigin: "center center", willChange: "transform" }}
        >
          <BrowserChrome />
          <motion.div className="absolute inset-x-0 top-0" style={{ y: contentY }}>
            <StudioPortfolio />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* The framing moment — plain centered type. */
function Intro() {
  return (
    <div className="flex max-w-6xl flex-col items-center px-2 text-center">
      <h2 className="font-editorial" style={{ color: "#10151F" }}>
        <span className="block text-[1.45rem] sm:text-[1.9rem] md:text-[2.4rem]" style={{ fontWeight: 400, letterSpacing: "0.02em" }}>
          A website,
        </span>
        <span
          className="block font-editorial-italic text-[4.25rem] font-light sm:text-[6.75rem] md:text-[8.75rem] lg:text-[10rem]"
          style={{ lineHeight: 0.86, color: "#C9A55A", margin: "0.1em 0 0.12em" }}
        >
          curated
        </span>
        <span className="block text-[1.45rem] sm:text-[1.9rem] md:text-[2.4rem]" style={{ fontWeight: 400, letterSpacing: "0.02em" }}>
          for one name.
        </span>
      </h2>
    </div>
  );
}

/* A solid, realistic browser shell — tab strip + toolbar. */
function BrowserChrome() {
  return (
    <div className="absolute inset-x-0 top-0 z-30">
      {/* tab strip */}
      <div className="flex items-end gap-1 px-3 pt-2" style={{ backgroundColor: "#cfd0d4", height: 38 }}>
        <div className="flex items-center gap-2 px-3 py-1.5" style={{ backgroundColor: "#f5f5f7", borderTopLeftRadius: 9, borderTopRightRadius: 9, maxWidth: 240 }}>
          <span className="flex shrink-0 items-center justify-center" style={{ width: 15, height: 15, borderRadius: 3, backgroundColor: "#C9A55A" }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontSize: 10, lineHeight: 1, color: "#0a0a0a", fontWeight: 700 }}>P</span>
          </span>
          <span className="truncate text-[12px]" style={{ color: "#26262b" }}>Elara Keats — Portfolio</span>
          <ToolIcon d="M18 6 6 18M6 6l12 12" o={0.5} />
        </div>
        <span className="px-2 pb-1.5"><ToolIcon d="M12 5v14M5 12h14" o={0.45} /></span>
      </div>

      {/* toolbar */}
      <div className="flex items-center gap-3 px-4" style={{ backgroundColor: "#f5f5f7", height: 46, borderBottom: "1px solid rgba(0,0,0,0.14)" }}>
        <div className="flex items-center gap-3.5">
          <ToolIcon d="m15 18-6-6 6-6" />
          <ToolIcon d="m9 18 6-6-6-6" o={0.32} />
          <ToolIcon d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
        </div>
        <div
          className="flex flex-1 items-center gap-2.5 px-3.5 py-2"
          style={{ backgroundColor: "#ffffff", borderRadius: 7, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.14)" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-dark)" strokeWidth={1.9}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="truncate text-[13px]" style={{ fontFamily: "var(--font-mono), monospace", color: "#26262b" }}>
            elarakeats.pholio.studio
          </span>
        </div>
        <ToolIcon d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
      </div>
    </div>
  );
}
