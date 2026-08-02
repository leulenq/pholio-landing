# /talent hero directions

**01 The Room is the shipped hero.** `DEFAULT_HERO_VARIANT` in
`lib/hero-variants.ts` is `room`. The other three are kept mountable for
comparison and can be retired once the choice has settled; their
rationale is below.

Four prototypes, built to be compared live rather than argued about.
Flip with `?hero=<id>` on `/talent`; `?hero=reset` clears the override.
Registry: `lib/hero-variants.ts`. Components: `components/talent-hero/`.

## Why these exist

Three earlier attempts failed, and the failures are the useful part.

1. **The photo wall.** Five stock portraits at random positions and
   rotations with centred type floating over them. Read as a moodboard.
   The imagery competed with the headline, nothing sat on a grid, and the
   baseline label landed on top of a face.
2. **The stripped ink title page.** Removed the imagery but kept the
   template: mono eyebrow, headline, supporting paragraph, filled button,
   microcopy footnote, two-label baseline strip. Six text elements is a
   SaaS hero no matter what typeface it is set in.
3. **The /for-talent copy.** Correct mood, wrong content. Cream, centred,
   restrained, but the message was generic and the KPI proof strip was
   the exact pattern the page was trying to escape.

## Rules all four hold to

So the comparison is about composition and message, not compliance.

- No eyebrow or kicker. No scroll cue. No proof or KPI strip.
- Max three text elements: headline, one sentence, one action.
- Sentence max 20 words.
- Exactly one italic-gold word per headline. Never two.
- Zero em-dashes in any visible string.
- One CTA label for the whole page: **Get scouted**, the same label the
  header uses. Never a second label for the same intent.
- Ink / cream / gold only. Square corners, never a pill. Hover shifts
  colour, never scale.
- Real photography from the repo, house-treated (grayscale, contrast
  lift, warm grain). No decorative SVG, no device chrome, no fake
  product UI.
- Shared motion vocabulary: masked line rise on mount, one shared exit
  curve (`useHeroExit` in `components/talent-hero/kit.tsx`), everything
  collapsing to static under `prefers-reduced-motion`.

## The four

### 01 The Room (`?hero=room`) - SHIPPED

> Get in the *room*.

Manifesto. Display type at poster scale on velvet ink, one portrait bled
off the right edge under a heavy scrim so it reads as atmosphere rather
than as a subject. The most confident and the most abstract: it lands the
feeling instantly and the product slowly.

Mobile does not drop the portrait. An earlier pass hid it below `md`,
which left the type on an empty black field with the upper half of the
frame dead. It now goes full bleed under everything with a bottom-to-top
scrim, so the face fills the upper frame and the type sits low.

### 02 Access (`?hero=access`)

> Talent isn't the hard part. *Access* is.

Asymmetric split, 54/46, cream type bay against a full-height figure.
This is the agency-website archetype, which is the register the audience
already reads as industry rather than as software. The sharpest line of
the four: it names what talent already believes about their own career
and takes their side. Set as three short stacked lines rather than two
long ones, because the bay is only ~610px wide at desktop and a two-line
set forced the scale down until it stopped commanding the frame.

### 03 The Artifact (`?hero=artifact`)

> This is what *arrives* before you do.

Object hero on cream. The only direction where the product is visible in
the first frame: the real composed comp card render, presented as a
physical object with a cast shadow. Most concrete and most
differentiated; trades some emotional lift for proof. Note the render's
own photograph is warm red, which is off-palette, so it takes the house
grayscale treatment.

### 04 Title Card (`?hero=titlecard`)

> They're already *looking*.

Cinematic. Full-bleed portrait under an ink scrim, type set low in the
frame the way a film title is. A slow scroll-tied push keeps the frame
alive without a loop. Most arresting, and the most dependent on the
photograph being excellent, which makes it the riskiest to scale across
future art direction.

## Flow constraints any future direction must respect

- The hero is Scene 1 of a continuous take. It mounts inside `Stage`
  (`components/talent-flow/SceneArrival.tsx`) and must hold the frame,
  then recede as the card scene takes it.
- **It has to occlude.** Scene 2 is already staged 59vh down the flow and
  will show through the hero's air at rest unless the variant paints its
  own opaque field. Every variant does this and clears it on the shared
  exit curve.
- `SCENES[0].bg` in `components/talent-flow/kit.tsx` seeds the page's
  interpolated colour field and `TalentFlowPage` seeds `themeColor` from
  it. Both are `INK`, matching the shipped hero, which also restores the
  arrival to card seam as a real ink to cream cut. A cream direction
  (Access, Artifact) must flip both, or the browser chrome colour will
  disagree with the page.
- The override is read after mount, not during render, so server and
  first client pass always agree on the default and the preview never
  causes a hydration mismatch.
