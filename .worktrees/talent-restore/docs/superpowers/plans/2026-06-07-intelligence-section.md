# Intelligence Section ("The Presence") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `SceneIntelligence.tsx` — a tall, un-pinned, velvet-ink section between Belief and CompCard whose hero element is a single luminous gold thread that draws with scroll, with a few atmospheric serif lines, selling "an intelligence built into Pholio that knows you and works for you."

**Architecture:** One self-contained `"use client"` framer-motion component. A full-height absolutely-positioned SVG renders the gold thread (crisp path + blurred glow path, both `vectorEffect="non-scaling-stroke"`). The section's `useScroll` progress drives the thread's `pathLength` and each atmosphere line's arrival (opacity/translateY via `useTransform`). The header (kicker + headline) uses `useInView` for a clean entrance. `useReducedMotion()` renders the thread fully drawn and all copy static.

**Tech Stack:** Next.js (app router) + React + Tailwind v4 + framer-motion. Brand tokens: gold `#C9A55A`, cream `#FAF7F2`, ink `#050505`. Utility classes `font-editorial`, `font-editorial-italic`, `font-mono`, `texture-grain`, `divider-gold-center`. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-06-07-intelligence-section-design.md`

---

## File Structure

- **Create:** `components/SceneIntelligence.tsx` — the entire section, self-contained. Tunable knobs (`THREAD_D`, `LINES`, draw range, `GOLD`/`CREAM`) grouped at the top.
- **Modify:** `components/ClientPage.tsx` — import and mount `<SceneIntelligence />` between `<BeliefSection />` and `<SceneCompCard />`.
- Touches nothing else. No changes to `SceneCompCard`, `BeliefSection`, `/talent`, `CardData.ts`, or dependencies.

## Verification model (repo-specific — overrides skill TDD default)

This repo has no unit-test framework; CLAUDE.md defines the loop. Before starting, ensure the dev server runs in tmux (a pre-tool hook blocks bare `npm run dev`):

```bash
tmux has-session -t dev 2>/dev/null || tmux new-session -d -s dev "npm run dev"
```

The standard per-task gate (the "GATE" referenced below) is:

```bash
npx tsc --noEmit \
  && curl -s -o /dev/null -w "%{http_code}\n" localhost:3001 \
  && curl -s localhost:3001 | grep -iE "failed to compile|module not found|unhandled runtime" || echo "compile clean"
```

Expected: `tsc` prints nothing (exit 0); curl prints `200`; the grep finds nothing and prints `compile clean`. (Note: Next dev HTML always contains the literal `Error:` overlay boilerplate — do NOT treat that as a failure; only the three phrases above indicate a real compile error.) Each visual task also requires opening `localhost:3001` and scrolling to confirm — final judgement is visual.

---

### Task 1: Scaffold the static section + mount it

**Files:**
- Create: `components/SceneIntelligence.tsx`
- Modify: `components/ClientPage.tsx`

- [ ] **Step 1: Create the static section file**

Create `components/SceneIntelligence.tsx` with the full static shell (ink bg, grain, top/bottom gold hairlines, mono kicker, headline with one italic word, a static copy stack, and a static full-height thread). No scroll wiring yet — this proves layout, brand, and mounting in isolation.

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────
   "The Presence" — Pholio's intelligence layer for talent.
   NOT a feature tour. One message: an AI is built into Pholio — it knows
   you and works for you. Hero element is a single luminous gold thread
   (the intelligence itself) that draws with scroll. Pure atmosphere.
   ────────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;
const GOLD = "#C9A55A";
const CREAM = "#FAF7F2";

// ── Tunable knobs ───────────────────────────────────────────────────────
// Thread path in a 100×1000 viewBox, drawn top→bottom. Lives left-of-center,
// gentle meander, exits lower toward the CompCard section below.
const THREAD_D =
  "M 36 0 C 28 150, 56 250, 44 370 S 24 580, 52 720 S 72 900, 60 1000";

// Atmosphere lines: copy + scroll-progress point (0–1) where each arrives.
const LINES = [
  { text: "It learns how you read on camera.", at: 0.34 },
  { text: "It shapes how the world sees you.", at: 0.52 },
  { text: "It works while you rest — and it never leaves.", at: 0.70 },
];

export default function SceneIntelligence() {
  const ref = useRef<HTMLElement>(null);
  const headerInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden texture-grain"
      style={{ backgroundColor: "#050505", color: CREAM }}
    >
      <div className="absolute inset-x-0 top-0 h-px divider-gold-center" />

      {/* Thread — full-height background element (static for now). */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 h-full w-[42%] max-w-[440px]"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
      >
        <path
          d={THREAD_D}
          fill="none"
          stroke={GOLD}
          strokeWidth={1.25}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.9}
        />
      </svg>

      {/* Content — sits in the space opposite the thread (asymmetric). */}
      <div className="relative mx-auto max-w-7xl px-6 py-40 lg:px-8 lg:py-56">
        <div className="ml-auto w-full max-w-xl lg:pr-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.34em]"
              style={{ color: GOLD }}
            >
              Built in
            </span>
            <h2 className="font-editorial mt-6 text-[2.7rem] leading-[1.04] sm:text-5xl md:text-6xl">
              An intelligence that already{" "}
              <span className="font-editorial-italic" style={{ color: GOLD }}>
                knows
              </span>{" "}
              you.
            </h2>
          </motion.div>

          {/* Atmosphere lines (static stack for now) */}
          <div className="mt-24 flex flex-col gap-24">
            {LINES.map((line) => (
              <div key={line.text} className="flex items-baseline gap-5">
                <span
                  className="mt-2 h-px w-12 shrink-0"
                  style={{
                    background: `linear-gradient(to right, ${GOLD}, rgba(201,165,90,0))`,
                  }}
                />
                <p className="font-editorial text-2xl leading-snug md:text-3xl">
                  {line.text}
                </p>
              </div>
            ))}
          </div>

          {/* Closing line (static for now) */}
          <p
            className="mt-28 font-editorial-italic text-3xl md:text-4xl"
            style={{ color: GOLD }}
          >
            Always with you.
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px divider-gold-center" />
    </section>
  );
}
```

- [ ] **Step 2: Mount it in ClientPage between Belief and CompCard**

In `components/ClientPage.tsx`, add the import alongside the other scene imports (near line 7–8):

```tsx
import BeliefSection from "@/components/BeliefSection";
import SceneIntelligence from "@/components/SceneIntelligence";
import SceneCompCard from "@/components/SceneCompCard";
```

Then place the component in the JSX between Belief and CompCard (the `{/* ── BELIEF ── */}` and `{/* ── COMP CARD ── */}` blocks):

```tsx
        {/* ── BELIEF ────────────────────────────────────────────────────── */}
        <BeliefSection />

        {/* ── INTELLIGENCE — "The Presence" (AI knows you, works for you) ── */}
        <SceneIntelligence />

        {/* ── COMP CARD ─────────────────────────────────────────────────── */}
        <SceneCompCard />
```

- [ ] **Step 3: GATE**

Run the GATE (see Verification model). Expected: `tsc` clean, `200`, `compile clean`.

- [ ] **Step 4: Visual check**

Open `localhost:3001`, scroll past the Belief section. Confirm: ink section appears with a static gold thread on the left, kicker `BUILT IN`, headline with italic-gold "knows", three serif lines, and "Always with you." Top/bottom gold hairlines present. No layout overlap with the fixed header.

- [ ] **Step 5: Commit**

```bash
git add components/SceneIntelligence.tsx components/ClientPage.tsx
git commit -m "feat: scaffold SceneIntelligence section (static)"
```

---

### Task 2: Wire the thread to draw with scroll (+ glow)

**Files:**
- Modify: `components/SceneIntelligence.tsx`

- [ ] **Step 1: Add scroll + reduced-motion hooks**

Replace the import line and the top of the component (the `useRef`/`useInView` lines) so scroll progress and reduced-motion are available.

Replace:

```tsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
```

with:

```tsx
import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
```

Replace:

```tsx
  const ref = useRef<HTMLElement>(null);
  const headerInView = useInView(ref, { once: true, margin: "-120px" });
```

with:

```tsx
  const ref = useRef<HTMLElement>(null);
  const headerInView = useInView(ref, { once: true, margin: "-120px" });
  const rm = useReducedMotion();

  // 0 when the section top reaches the viewport bottom, 1 when its bottom
  // leaves the top. Thread draws across the middle of that range.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // DRAW_RANGE knob — narrows the span over which the thread completes.
  const drawn = useTransform(scrollYProgress, [0.08, 0.82], [0, 1]);
```

- [ ] **Step 2: Replace the static SVG with the drawn thread + glow**

Replace the entire `<svg … >…</svg>` block from Task 1 with a crisp animated path plus a blurred glow path behind it (both share `pathLength: drawn`, so they draw together). When reduced motion is on, both render fully drawn.

```tsx
      {/* Thread — the intelligence. Draws as the section scrolls past. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 h-full w-[42%] max-w-[440px]"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="thread-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {/* glow */}
        <motion.path
          d={THREAD_D}
          fill="none"
          stroke={GOLD}
          strokeWidth={5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#thread-glow)"
          opacity={0.22}
          style={rm ? { pathLength: 1 } : { pathLength: drawn }}
        />
        {/* crisp thread */}
        <motion.path
          d={THREAD_D}
          fill="none"
          stroke={GOLD}
          strokeWidth={1.25}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.9}
          style={rm ? { pathLength: 1 } : { pathLength: drawn }}
        />
      </svg>
```

- [ ] **Step 3: GATE**

Run the GATE. Expected: `tsc` clean, `200`, `compile clean`.

- [ ] **Step 4: Visual check**

Open `localhost:3001` and scroll slowly through the section. Confirm the thread draws from top to bottom as you scroll (not all at once), with a soft gold glow around it, and is fully drawn by the time the section's lower portion is centered. Scroll back up — it should retract (scroll-tied). Toggle OS "Reduce Motion" and reload: thread should appear fully drawn immediately, no scroll dependence.

- [ ] **Step 5: Commit**

```bash
git add components/SceneIntelligence.tsx
git commit -m "feat: draw the intelligence thread on scroll with glow"
```

---

### Task 3: Make the atmosphere lines arrive on scroll

**Files:**
- Modify: `components/SceneIntelligence.tsx`

- [ ] **Step 1: Add a scroll-driven Line subcomponent**

Add this component below the `LINES` constant and above `export default function SceneIntelligence`. It ties one line's opacity/translateY to the section scroll progress around its `at` anchor. Hooks live in a real component so the hook count is stable across the map.

```tsx
function AtmosphereLine({
  text,
  at,
  progress,
  rm,
}: {
  text: string;
  at: number;
  progress: import("framer-motion").MotionValue<number>;
  rm: boolean | null;
}) {
  const opacity = useTransform(progress, [at - 0.1, at], [0, 1]);
  const y = useTransform(progress, [at - 0.1, at], [18, 0]);
  return (
    <motion.div
      className="flex items-baseline gap-5"
      style={rm ? undefined : { opacity, y }}
    >
      <span
        className="mt-2 h-px w-12 shrink-0"
        style={{
          background: `linear-gradient(to right, ${GOLD}, rgba(201,165,90,0))`,
        }}
      />
      <p className="font-editorial text-2xl leading-snug md:text-3xl">{text}</p>
    </motion.div>
  );
}
```

- [ ] **Step 2: Replace the static line stack with the subcomponent**

Replace the static `{LINES.map(...)}` block from Task 1:

```tsx
          {/* Atmosphere lines (static stack for now) */}
          <div className="mt-24 flex flex-col gap-24">
            {LINES.map((line) => (
              <div key={line.text} className="flex items-baseline gap-5">
                <span
                  className="mt-2 h-px w-12 shrink-0"
                  style={{
                    background: `linear-gradient(to right, ${GOLD}, rgba(201,165,90,0))`,
                  }}
                />
                <p className="font-editorial text-2xl leading-snug md:text-3xl">
                  {line.text}
                </p>
              </div>
            ))}
          </div>
```

with:

```tsx
          {/* Atmosphere lines — each arrives as the thread reaches it. */}
          <div className="mt-24 flex flex-col gap-24">
            {LINES.map((line) => (
              <AtmosphereLine
                key={line.text}
                text={line.text}
                at={line.at}
                progress={scrollYProgress}
                rm={rm}
              />
            ))}
          </div>
```

- [ ] **Step 3: GATE**

Run the GATE. Expected: `tsc` clean, `200`, `compile clean`.

- [ ] **Step 4: Visual check**

Scroll through the section. Confirm each serif line fades + rises into place in sequence as you reach it (roughly tracking the thread's progress), and remains once arrived. With Reduce Motion on, all lines are visible immediately. Tune the `at` values in `LINES` if a line arrives too early/late relative to the thread.

- [ ] **Step 5: Commit**

```bash
git add components/SceneIntelligence.tsx
git commit -m "feat: atmosphere lines arrive on scroll"
```

---

### Task 4: Closing line arrival + final polish pass

**Files:**
- Modify: `components/SceneIntelligence.tsx`

- [ ] **Step 1: Make the closing line arrive on scroll**

First add the closing-line transforms next to the `drawn` knob from Task 2 (these hooks must run unconditionally — never inside the JSX ternary — to satisfy the rules of hooks). Directly after:

```tsx
  const drawn = useTransform(scrollYProgress, [0.08, 0.82], [0, 1]);
```

add:

```tsx
  // Closing line — arrives near the bottom, where the thread exits.
  const closeOpacity = useTransform(scrollYProgress, [0.82, 0.92], [0, 1]);
  const closeY = useTransform(scrollYProgress, [0.82, 0.92], [18, 0]);
```

Then replace the static closing line from Task 1:

```tsx
          {/* Closing line (static for now) */}
          <p
            className="mt-28 font-editorial-italic text-3xl md:text-4xl"
            style={{ color: GOLD }}
          >
            Always with you.
          </p>
```

with a scroll-tied version that only branches on the *applied* style (the hooks already ran above):

```tsx
          {/* Closing line — settles where the thread exits, bottom. */}
          <motion.p
            className="mt-28 font-editorial-italic text-3xl md:text-4xl"
            style={
              rm
                ? { color: GOLD }
                : { color: GOLD, opacity: closeOpacity, y: closeY }
            }
          >
            Always with you.
          </motion.p>
```

- [ ] **Step 2: GATE**

Run the GATE. Expected: `tsc` clean, `200`, `compile clean`.

- [ ] **Step 3: Full-section visual review against the spec**

Open `localhost:3001` and scroll the whole section top→bottom, then bottom→top. Confirm against the spec's success criteria:
- Reads as a signature, premium, intentional moment — generous emptiness, not a feature list.
- Thread draws continuously with scroll, glows on the ink, exits toward the comp card.
- Header → three lines → "Always with you." arrive in order; closing line lands near the thread's exit.
- Fully on-brand: only ink/cream/gold, serif + mono, hairlines + grain + thread. No pills, dots, scores, UI chrome, or looping motion.
- No overlap with the fixed header at any scroll position.
- With OS Reduce Motion on: thread fully drawn, all copy visible and legible, no scroll-tied jumps.

Tune knobs (`THREAD_D` shape, `DRAW_RANGE` numbers in the `drawn` transform, `LINES[].at`, section `py`) until the rhythm feels right. This is the visual-judgement step — iterate here.

- [ ] **Step 4: Commit**

```bash
git add components/SceneIntelligence.tsx
git commit -m "feat: closing line arrival + intelligence section polish"
```

---

## Self-Review (completed)

- **Spec coverage:** Placement (Task 1 Step 2) ✓; tall/un-pinned + thread-draws-on-scroll (Task 2) ✓; ink background + glow (Tasks 1–2) ✓; asymmetric composition + emptiness (Task 1 layout) ✓; pure-atmosphere copy incl. kicker/headline/3 lines/closing (Tasks 1, 3, 4) ✓; hairline ticks (Task 1/3) ✓; reduced motion (Tasks 2–4) ✓; tunable knobs at top (Task 1) ✓; brand furniture only, no pills/dots/scores/UI (Task 1, reviewed Task 4) ✓; mount between Belief and CompCard, no other files touched ✓.
- **Placeholder scan:** None — every step has complete code. "static for now" labels are intentional staging, each explicitly replaced in a later task.
- **Type consistency:** `scrollYProgress` (raw 0–1) is passed to `AtmosphereLine.progress` and used directly with each line's `at`; `drawn` (remapped) drives only `pathLength`. `rm` typed `boolean | null` to match `useReducedMotion()`'s return. `THREAD_D`, `GOLD`, `CREAM`, `LINES` referenced consistently across tasks.
