# Intelligence Section — "The Presence" — Design

**Date:** 2026-06-07
**Status:** Approved (design), pending implementation plan
**Component:** `components/SceneIntelligence.tsx`

## Purpose

The first major *content* moment after the hero. Its job is to land one
positional, emotional message immediately:

> Pholio has intelligence built into it — an AI that **knows you** and is
> **working for you**. You are not left alone to figure out how to present
> yourself.

This is explicitly **not** a feature tour. It must never enumerate *where* the
AI helps (profile, comp card, website, applications). Those are deliberately
out of scope. The section sells the *feeling* of an ever-present intelligence
that understands the talent — a signature, luxurious, intentional Pholio moment.

## Placement

`ClientPage.tsx`, mounted between the existing sections:

```
Hero → BeliefSection (ink) → [SceneIntelligence — NEW] → SceneCompCard (ink) → …
```

Belief stays as a short transitional statement. SceneIntelligence becomes the
first heavyweight content beat.

## Format & motion

- **Tall, un-pinned.** Section is taller than one viewport (no sticky pin —
  deliberately distinct from the CompCard pin that immediately follows). The
  hero element draws continuously, tied to `scrollYProgress` of the section.
- **The gold thread is the hero element.** A single luminous gold thread (SVG
  path) whose `pathLength` is driven by scroll. The thread *is* the
  intelligence — one unbroken line, always there, drawn alongside the visitor.
  - Enters from the top edge (reads as handed off from the Belief section's
    descending gold line).
  - Meanders gently **off-center** (~left third on desktop) — asymmetric per
    house style.
  - Exits the bottom edge heading toward the CompCard section, so the
    intelligence visually "leads" the visitor into their comp card.
  - Soft, **static** gold glow/halo around the thread (luminous, alive — but
    NOT pulsing/looping; motion = arrival, never loop).
- **Copy arrives, doesn't animate.** Each atmospheric line fades + rises a few
  px as the thread's drawn length reaches that line's anchor point along the
  path. Single ease `cubic-bezier(0.22, 1, 0.36, 1)`. A faint 1px hairline tick
  connects each line to the thread.
- **Reduced motion:** honor `useReducedMotion()` — thread renders fully drawn,
  copy is static and visible, no scroll-tied transforms.

## Background

Velvet ink `#050505`, matching both neighbors. The gold thread glows most
luxuriously on black (gold-leaf-on-lacquer). Belief → Intelligence → CompCard
read as one intentional "night" movement that the cream comp-card paper then
illuminates. The section earns distinctness from its neighbors through
**emptiness + the glowing thread**, not a color change.

## Composition

- Asymmetric. Thread off-center; copy occupies the opposing space.
- Generous emptiness is the point — the luxury is the space around almost
  nothing. Do not crowd it.
- Responsive: on mobile the thread can run nearer one edge with copy stacked;
  on `md+` the off-center / opposing-copy arrangement applies.

## Copy (atmosphere — starting point, tunable)

- **Mono kicker** (top): `BUILT IN`
- **Headline** (exactly one italic-gold verdict word):
  > An intelligence that already *knows* you.
  Render as text + `<span class="font-editorial-italic" style={{color:'#C9A55A'}}>knows</span>` + rest.
- **2–3 short serif lines**, arriving in sequence along the thread:
  - "It learns how you read on camera."
  - "It shapes how the world sees you."
  - "It works while you rest — and it never leaves."
- **Closing line** (settles near the bottom, where the thread exits):
  > Always with you.

Copy is the heart of a "pure atmosphere" section and is expected to be tuned
during/after implementation. Keep the rules: one italic word per headline, no
emoji, no SaaS phrasing.

## Brand constraints (non-negotiable)

- Palette: velvet ink `#050505`, cream `#FAF7F2`, gold `#C9A55A` (+ documented
  warm/light/dark variants). No other accents.
- Type: Noto Serif Display (headline/atmosphere lines), Inter (any clerical
  text), JetBrains Mono (kicker). Use `font-editorial` / `font-editorial-italic`
  utilities and `font-mono`.
- Furniture only: hairlines (1px), the gold thread/sweep, grain (fractalNoise
  SVG, low opacity), mono kicker.
- **No** pills, **no** dot indicators, no scores, no numeric badges, no UI
  cards/chrome, no looping/shimmer animation, no emoji.

## Component shape

- New self-contained file `components/SceneIntelligence.tsx` (`"use client"`).
- Follows existing scene conventions (framer-motion, `useScroll` /
  `useTransform`, `useReducedMotion`, inline brand-color styles + utility
  classes).
- **Tunable knobs grouped at the top** of the component:
  - thread SVG path / control points,
  - glow intensity,
  - copy array with per-line anchor thresholds (where along the drawn path each
    line arrives),
  - base spacing / section height.
- No new dependencies. No changes to other scenes. Does not touch the separate
  `/talent` scene or `CardData.ts`.

## Out of scope

- Any per-area breakdown of what the AI does (profile/comp card/website/
  applications).
- Literal product UI, dashboards, scores, "Analyzing" states (the orphaned
  `SceneAI.tsx` is a non-goal reference, not a basis).
- Touching the CompCard section, Belief section internals (beyond the visual
  hand-off read), pricing, or any other scene.

## Success criteria

- Reads as a signature, premium, intentional moment — not a feature section.
- Communicates "AI is built in, it knows you, it works for you" within the
  first viewport of the section.
- Stays fully on-brand (palette, type, furniture, motion = arrival).
- `npx tsc --noEmit` clean; dev server compiles; visually confirmed in browser
  on `:3001` (scroll-tied motion — final judgement is visual).
- Reduced-motion path renders complete and legible.
