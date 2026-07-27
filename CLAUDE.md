# Pholio Landing — Working Notes

Next.js + Tailwind v4 + framer-motion marketing site for Pholio (a verified-talent
platform). This file captures conventions and hard-won lessons. 

## 🚧 Repo Boundaries (CRITICAL)

- **Marketing Site (`pholio-landing`):** `/Users/lenquanhone/Projects/pholio-landing`
  - Handles all public-facing marketing pages.
  - Handles all legal pages (Terms of Service, Privacy Policy, Submission Program Notice).
  - Any marketing-site content must go here.
- **Application Product (`pholio-app`):** `/Users/lenquanhone/Projects/pholio-app`
  - This is the application product repo *only*. Do not put marketing or legal site pages there, and do not put application dashboard/API logic here.

## Brand system (non-negotiable)

- **Palette is three colors only:** velvet ink `#050505` / `#0F172A`, cream `#FAF7F2`
  (+ warm `#F5F0E8`), gold `#C9A55A` (warm `#C8A96E`, light `#D4BC8A`, dark `#A8894E`).
  **No other accent colors** — e.g. terracotta is off-brand. No SaaS gradients, no emoji.
- **Type:** Noto Serif Display (display/headlines), Inter (body/clerical), JetBrains Mono
  (timestamps, labels, measurements). CSS vars: `--font-serif/-sans/-mono`; utility
  classes `font-editorial`, `font-editorial-italic`; Tailwind `font-mono`.
- **One italic-gold word per headline** — the "verdict." Never two. Render as
  `text + <span class="font-editorial-italic" style={{color:'#C9A55A'}}>word</span> + rest`.
- **Motion = arrival, not animation.** Single ease `cubic-bezier(0.22,1,0.36,1)`. Hover =
  color shift, not scale. No looping/shimmer. Always honor `useReducedMotion()`.
- **Furniture:** hairlines (1px), the gold sweep (spec below), grain (fractalNoise SVG
  at low opacity), mono kickers. Frame imagery, don't crop it; portraits are grayscale
  with warm grain.

### Ported from pholio-app's talent system (non-negotiable, don't re-derive)

Two pieces of brand furniture are not marketing-site inventions — they're the literal
talent-dashboard mark and rule, copied from `pholio-app`. Read the values here, not
CLAUDE.md's general brand-system notes above, whenever you touch either: a
brand-system-only read produces plausible but wrong numbers (400→600 weight,
0.2em→0.3em+ tracking, a feathered gradient instead of a solid one) — this has
happened twice, once as the marketing site's own placeholder and once from a session
that couldn't reach `pholio-app` to check. If `pholio-app` isn't in reach, these values
*are* the source of truth — no need to go re-read the app to confirm them.

- **Wordmark** — Noto Serif Display, **400** weight, **0.2em** letter-spacing, **gold**
  (`#C9A55A`), uppercase "PHOLIO". Source: `.tl-logo-word` in
  `client/src/shared/layouts/TalentLayout/TalentLayout.css` and `.apply-workspace-logo
  span` in `client/src/domains/talent/pages/ApplyPage/ApplyExperience.css` in
  `pholio-app` — both files agree on every value, including a literal size of **24px**.
  Implemented as `Wordmark` in `components/header/kit.tsx`. Size is the one deliberate
  exception: the marketing header renders it at **16px** (set explicitly in
  `VariantIndex.tsx`), smaller than the app's 24px, by explicit product call — that's
  a marketing-site sizing decision, not a mismatch to "fix."
- **Gold sweep** — a 1px hairline, `linear-gradient(to right, transparent, gold,
  transparent)`: solid gold at the center, fading to transparent at both edges. No
  alpha-stepped stops, no feathering, no narrow clamp band. Source:
  `.apply-workspace-top::after` in that same `ApplyExperience.css`, which closes the
  `/apply` workspace topbar this exact way. Implemented as `GoldSweep` in
  `components/header/kit.tsx`, default color the fixed brand gold (not a
  paper-tracking token) so the match holds on cream pages too.

## Header (`components/header/`)

"The Index" (`VariantIndex.tsx`) is the shipped header — see `docs/header-directions.md`
for the reasoning and the three retired alternatives. `DEFAULT_HEADER_VARIANT` in
`lib/header-variants.ts` is `index`. `?header=current` forces the pre-redesign glass
pill (`components/Header.tsx`, untouched) as an emergency rollback only;
`?header=reset` clears any override.

The wordmark (`Wordmark` in `components/header/kit.tsx`) and the gold sweep that
closes the header band (`GoldSweep`, same file) are both the pholio-app talent-system
pieces documented above under "Ported from pholio-app's talent system" — read that
section for the exact values and source files before touching either.

Rules the header keeps, and any future changes must respect:

- **No glass.** No `backdrop-filter`, no translucent shell. A header that needs a
  backing takes the page's own paper colour, opaque. Blur only ever existed to
  rescue a boxed header floating over imagery — don't reintroduce the box.
- **Gold is a state, not a surface** — live route, action, sweep. No filled gold
  shape larger than a word, no conic borders, no shimmer sweeps, no permanent
  rule under a CTA. Prominence (e.g. the "Get scouted" CTA, `ActionLink` in
  `components/header/kit.tsx`) comes from full-strength color against its
  muted siblings, never from making the text bigger — scale is not how this
  system signals importance.
- **Nav is not flat.** `TALENT` / `AGENCIES` are audience *doors*; `STUDIO+` is a
  tier. `NAV` in `components/header/kit.tsx` carries `kind` and an index number.
- The mobile hamburger → full-screen serif index is the pattern that worked; it is
  kept (`IndexTrigger` + `IndexPanel`) with its chrome stripped.
- Headers **sample the paper under the bar** (`useFieldPolarity`) and flip
  ink/cream mid-scroll. Route theme is only the starting value.
- Home reveal measures the hero section (`[data-hero-chrome]`'s `<section>`) and
  falls back to one viewport of scroll. Don't reintroduce the
  `[data-header-switch='comp-card']` marker gate — the attribute no longer exists
  in the DOM, which is why the old header never appeared on `/` at all. (`/`
  currently serves `TemporaryLanding`, which has no hero and doesn't scroll, so
  the header stays hidden there by design.)

## Comp-card showcase (`components/SceneCompCard.tsx`)

The home page's flagship section (mounted in `ClientPage.tsx`). It is a **cinematic,
scroll-driven product showcase of ONE comp card** shown from four angles, NOT a gallery
of different cards. Direction the user converged on over several iterations:

- **One physical card in 3D, driven continuously by scroll** — a real front/back flip
  card (`backfaceVisibility:hidden`, back face pre-rotated `rotateY(180deg)`, parent has
  `perspective` + child `transformStyle:preserve-3d`). Beats: front → angle/tilt →
  contact-sheet back (half-turn) → detail zoom (turn back to front). Use `scrollYProgress`
  + `useTransform` for `rotateY/rotateX/rotateZ/z/scale/x/y`. Drama comes from: rotation
  **overshoot** into rest poses, **translateZ depth** (lunge toward viewer at rest, recede
  mid-flip), and **scale breathing**. `phase` state (thresholds) drives only the text.
- **Minimal text.** Exactly one headline (one italic word) + one short sentence per beat.
  No chapter rails, kickers, repeated labels, or decorative framing (no mats, corner
  ticks, shutter hairlines). The user repeatedly rejected "busy/overcrowded."
- **Asymmetric composition.** Scenes sit left/right, not all centered: card drifts via `x`
  with the caption on the opposite side (`captionClass()` does responsive placement —
  centered on mobile, left/right on md+).
- **Progress indicator** = four slim 1px gold ticks filling per scene. Keep it minimal.
- **State 1 fan** = three faint `CompCardFront` copies behind the hero that **gather into
  one** (a `gather` MotionValue 1→0). Lessons: give it generous spread; **never leave a
  card at dead-center (`x:0`)** behind the hero — it reads as a misaligned clone. The back
  card lifts up + scales down so it's clearly "behind."

### Layout constraints learned the hard way

- A fixed site **header overlays the top** of this sticky section. The detail **zoom must
  stay capped (~1.3×) with no upward translate**, or it slides under the header and over
  the caption. The stage uses `pt-12 pb-36` so the card centers in a header/caption-safe
  band.
- To raise an individual state without disturbing others, add the offset to the shared `y`
  transform over that state's scroll range and ease it back (e.g. state 1 sits at `-9%`,
  returns to `0%` before the angle). Don't move the whole band — it pushes the tall state-1
  fan into the header and the state-4 zoom out of bounds.
- Tunable knobs live at the top of the component: rotation/`z`/`scale`/`x`/`y` keyframes,
  the `fan` array, base card width classes.

### Card faces (`components/compcard/`)

- `CompCardFront.tsx` / `CompCardBack.tsx` — cream paper, grayscale framed portrait, serif
  name (italic-gold last name), gold sweep, mono measurements. Identity + imagery live in
  `CardData.ts` (`PORTRAIT` uses `crop=faces`; `SHEET` re-frames the same shot for the
  contact-sheet back so it's one identity). Swap for real talent photos via `CardData.ts`.
- **Don't** reintroduce per-photo index numbers, "Comp Card 20XX", "Verified Talent",
  ghost letterforms, or tile tag captions — all were explicitly removed as clutter.

### Separate scene — do not break

`/talent` uses its own `components/talent/TalentSceneCompCard.tsx` with the **legacy
template cards** (`EditorialNoir`, `MaisonBlanc`, `SwissGrid`, `VelvetRunway`, still
exported from `components/compcard/index.ts`). That page was out of scope for the landing
redesign — keep those files and exports intact, and keep `CardData.ts` backward-compatible
(it still exports `PHOTOS` and a 6-item `MEASUREMENTS` for them).

## Dev / verification

- **The dev server must run in tmux** (a pre-tool hook blocks bare `npm run dev`):
  `tmux new-session -d -s dev "npm run dev"`. Landing dev server has been on **:3001**.
- Fast sanity loop: `npx tsc --noEmit` + `curl -s -o /dev/null -w "%{http_code}" localhost:3001`.
  Note: Next dev HTML always contains the string `Error:` (overlay boilerplate) — grep for
  `failed to compile` / `module not found` / `unhandled runtime` instead.
- This is scroll-tied 3D animation; final judgement is visual — confirm in the browser, not
  just typecheck.
