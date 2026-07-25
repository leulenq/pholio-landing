# Header — design directions

Four header directions for the Pholio marketing site, built live and switchable.
Compare them at **`/lab/header`**; apply any of them across the whole site with
`?header=<id>` (remembered for the tab), and return to the existing header with
`?header=reset`.

| id | direction | one line |
| --- | --- | --- |
| `masthead` | 01 · The Masthead | A magazine masthead that condenses into a running head. |
| `ledger` | 02 · The Ledger | A ruled grid of numbered cells — the two-sided market made structural. |
| `index` | 03 · The Index | No header at rest; two corner marks and a full-height editorial index. |
| `plate` | 04 · The Plate | The comp card's clerical margin over a centred symmetric masthead. |
| `current` | 00 · Current | The existing glass pill, kept for A/B only. |

`DEFAULT_HEADER_VARIANT` in `lib/header-variants.ts` decides what the live site
renders. It is still `current` — promoting a direction is a one-line change.

---

## Why the current header doesn't work

Not a taste problem; four structural ones.

1. **It is an object, not a frame.** A rounded pill with its own shadow, floating
   in a margin, belongs to no page. Every other piece of furniture on this site —
   hairlines, the gold sweep, mono kickers, the comp card's own margins — is
   flush with the page grid.
2. **Glass is a symptom.** `backdrop-filter: blur(30px) saturate(160%)` exists to
   rescue a boxed header sitting over imagery. Remove the box and the problem it
   solves disappears. It is also the single most dated gesture on the site.
3. **The nav is flat.** `TALENT · AGENCIES · STUDIO+` are not three peer pages —
   they are two audience doors and a product tier. A row of evenly spaced pills
   flattens the one piece of structure Pholio actually has.
4. **The CTA is from a different brand.** A filled gold pill with a conic
   gradient border and a looping shimmer sweep is SaaS grammar, and it sits
   directly against a brand whose whole argument is that it does not oversell.

Two behavioural bugs found while reading it, fixed in all four directions:

- On `/` the header **never appeared at all**: it gates on
  `[data-header-switch='comp-card']`, an attribute no longer present anywhere in
  the DOM, so `getHomeHeaderActive()` always returned false. The new headers
  reveal on hero exit (`2.35 × viewport`, the 300vh hero) and don't depend on a
  marker.
- Polarity was frozen per route, so the header stayed ink-dark while scrolling
  across the home page's cream sections. The new headers **sample the paper
  underneath the bar** and flip (`useFieldPolarity` in `components/header/kit.tsx`).

## What a Pholio header has to do

1. **Certify.** Talent arrive scam-burned and decide in seconds. The header is
   the first institutional signal: a house, or a template.
2. **Sort.** Two audiences with opposite questions hit the same URL.
3. **Hold the frame.** It's the one constant across twelve very different
   cinematic pages — it's what makes them one publication.
4. **Get out of the way.** It lives over scroll-driven 3D, portraits and video.
5. **Convert without shouting.** One action, permanently available, that never
   uses urgency or a gradient.

Jobs 3 and 4 are in direct tension. **Each direction is a different resolution of
that tension** — that, not the surface, is the actual choice.

## Rules shared by all four

- No blur, no translucency. A header that needs a backing takes the page's own
  paper colour, opaque.
- Gold is a state, not a surface: live route, action, sweep. Never a filled shape
  larger than a word (the Ledger's cell is a plate completing a grid, not a pill).
- Hover is a colour and a 1px rule — never a scale. The site runs a custom
  cursor, so feedback has to live on the mark itself.
- One ease, `cubic-bezier(0.22, 1, 0.36, 1)`; `useReducedMotion()` collapses
  every transition to `0s`.
- The mobile hamburger → full-screen serif index is kept in all four (it was the
  part that worked), with its chrome stripped: no blurred backdrop, no rounded
  button, no filled pill at the foot.

## Files

```
lib/header-variants.ts            registry + DEFAULT_HEADER_VARIANT
components/header/kit.tsx         state, tokens, primitives, account, index panel
components/header/VariantMasthead.tsx
components/header/VariantLedger.tsx
components/header/VariantIndex.tsx
components/header/VariantPlate.tsx
components/header/index.tsx       id → component
components/HeaderWrapper.tsx      variant selection + route field
app/lab/header/page.tsx           the critique surface
components/Header.tsx             untouched — still serves `current`
```

Each variant file opens with its own thesis. Read those before changing one.
