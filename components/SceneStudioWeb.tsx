"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
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
   0.00–0.34  TEXT ALONE — the editorial page holds, covering the live site
   0.34–0.56  THE CAMERA PUSHES THROUGH — not a 2D wipe: on a real perspective
              stage the page rushes forward past the lens (enlarging, blurring,
              dissolving) while the live site rises out of depth behind it,
              sharpening from soft + dim into full, sharp presence. Immersive.
   0.56–0.60  the hero of the site holds — take in the opening
   0.60–0.98  the site scrolls at a natural pace
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

  // ── Immersive depth dolly (not a 2D wipe) ───────────────────────────
  // The stage carries a real CSS perspective, so these translateZ moves read
  // as a camera pushing through space, not a slide swapping. The editorial
  // page rushes toward the lens and dissolves; the live site rises from depth
  // and resolves into focus — you feel like you move INTO the site.

  // Cover (the page you're reading) — accelerates toward the camera (perspective
  // enlarges it), softens and fades as it blows past the lens.
  const coverZ = useTransform(sp, [0.34, 0.56], [0, 600], { ease: GLIDE });
  const coverOpacity = useTransform(sp, [0.4, 0.55], [1, 0], { ease: GLIDE });
  const coverBlur = useTransform(sp, [0.4, 0.56], [0, 14], { ease: GLIDE });
  const coverFilter = useMotionTemplate`blur(${coverBlur}px)`;

  // Site — set back in depth (smaller, soft, dim), dollies forward to z:0 and
  // resolves into sharp, lit, full presence as the camera arrives inside it.
  const siteZ = useTransform(sp, [0.34, 0.6], [-360, 0], { ease: GLIDE });
  const siteBlur = useTransform(sp, [0.34, 0.55], [10, 0], { ease: GLIDE });
  const siteBright = useTransform(sp, [0.34, 0.58], [0.45, 1], { ease: GLIDE });
  const siteFilter = useMotionTemplate`blur(${siteBlur}px) brightness(${siteBright})`;

  // After a hero hold, the site scrolls continuously. 4 screens = a 400%
  // column; -75% reveals all. Linear so it tracks the smoothed scroll.
  const contentY = useTransform(sp, [0.6, 0.98], ["0%", "-75%"]);

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
        className="sticky top-0 h-mobile-screen overflow-hidden"
        style={{ backgroundColor: "#FFFDF8", boxShadow: "0 -40px 90px -10px rgba(5,5,5,0.6)", perspective: "1600px", perspectiveOrigin: "center center" }}
      >
        {/* ── Base layer: the live site, rising out of depth into focus ── */}
        <motion.div
          className="absolute inset-0 z-10 overflow-hidden"
          style={{ z: siteZ, filter: siteFilter, backgroundColor: "#0a0a0a", transformOrigin: "center center", willChange: "transform, filter" }}
        >
          <BrowserChrome />
          <motion.div className="absolute inset-x-0 top-0" style={{ y: contentY }}>
            <StudioPortfolio />
          </motion.div>
        </motion.div>

        {/* ── Cover layer: the editorial page the camera pushes through ── */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center px-6"
          style={{ z: coverZ, opacity: coverOpacity, filter: coverFilter, backgroundColor: "#FFFDF8", transformOrigin: "center center", willChange: "transform, opacity, filter" }}
        >
          <Intro />
        </motion.div>
      </div>
    </section>
  );
}

/* The framing moment — an asymmetric editorial title page. The verdict word
   ("curated") anchors a staggered, diagonal headline; below, a gold sweep
   resolves the abstract "one name" into a live, typeable namesake domain —
   the visitor writes their own name into the site about to slide in. */
function Intro() {
  const [name, setName] = useState("");
  const placeholder = "yourname";
  const handle = name.toLowerCase().replace(/[^a-z0-9-]/g, "");

  return (
    <div className="relative mx-auto w-full max-w-4xl px-1 text-left lg:max-w-5xl">
      {/* staggered, diagonal headline — left edge to lower-right */}
      <h2 className="font-editorial" style={{ color: "#10151F" }}>
        <span
          className="block text-[1.4rem] sm:text-[1.8rem] md:pl-[3%] md:text-[2.3rem]"
          style={{ fontWeight: 400, letterSpacing: "0.01em" }}
        >
          A website,
        </span>
        <span
          className="block font-editorial-italic text-[4.5rem] font-light leading-[0.82] sm:text-[7rem] md:text-[9.5rem] lg:text-[11rem]"
          style={{ color: "#C9A55A", margin: "0.04em 0 0.07em", marginLeft: "-0.05em" }}
        >
          curated
        </span>
        <span
          className="block text-[1.4rem] sm:text-[1.8rem] md:pl-[38%] md:text-[2.3rem]"
          style={{ fontWeight: 400, letterSpacing: "0.01em" }}
        >
          for one name.
        </span>
      </h2>

      {/* the payoff: gold sweep + a live, typeable namesake domain */}
      <div className="mt-11 flex items-center gap-5 md:mt-14">
        <span
          className="h-px w-12 shrink-0 md:w-24"
          style={{ background: "linear-gradient(to right, rgba(201,165,90,0), #C9A55A)" }}
        />
        <label className="group flex shrink-0 cursor-text items-baseline font-mono text-[13px] tracking-[0.14em] md:text-[15px]">
          <span className="relative">
            <input
              value={handle}
              onChange={(e) => setName(e.target.value)}
              placeholder={placeholder}
              size={Math.max(handle.length || placeholder.length, 1)}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="Your name"
              className="border-0 bg-transparent p-0 font-mono tracking-[0.14em] outline-none"
              style={{ color: "#A8894E", caretColor: "#C9A55A" }}
            />
            {/* editable affordance — a hairline that warms on focus */}
            <span
              className="pointer-events-none absolute -bottom-1.5 left-0 right-0 h-px transition-colors duration-300"
              style={{ backgroundColor: "rgba(168,137,78,0.3)" }}
            />
            <span
              className="pointer-events-none absolute -bottom-1.5 left-0 right-0 h-px opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"
              style={{ backgroundColor: "#C9A55A" }}
            />
          </span>
          <span style={{ color: "rgba(168,137,78,0.55)" }}>.pholio.studio</span>
        </label>
        <span
          className="h-px flex-1"
          style={{ background: "linear-gradient(to right, rgba(201,165,90,0.45), rgba(201,165,90,0))" }}
        />
      </div>
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
