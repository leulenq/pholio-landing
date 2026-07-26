# Header — design direction

Four header directions were built live and compared at `/lab/header`: masthead,
ledger, index, and plate. **The Index won and shipped** — the other three
(and the `/lab/header` comparison page) have been retired from the tree. Their
rationale and screenshots live in git history if they're ever worth revisiting.

| id | direction | one line |
| --- | --- | --- |
| `index` | 01 · The Index | No header at rest; two corner marks and a full-height editorial index. |
| `current` | 00 · Current (rollback only) | The pre-redesign glass pill, kept only as an emergency fallback. |

`DEFAULT_HEADER_VARIANT` in `lib/header-variants.ts` is `index` — that's what
the live site renders. `?header=current` forces the old glass pill; `?header=reset`
clears any override.

---

## Why the old header didn't work

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

Two behavioural bugs were found while reading it, fixed in the shipped header:

- On `/` the header **never appeared at all**: it gates on
  `[data-header-switch='comp-card']`, an attribute no longer present anywhere in
  the DOM, so `getHomeHeaderActive()` always returned false. The new header
  measures the hero section itself (`[data-hero-chrome]`'s section) and reveals
  once it has largely left the viewport, falling back to one viewport of scroll
  when a page has no hero.

  Note `/` currently serves `TemporaryLanding` ("Launching soon"), which has no
  hero and does not scroll — so the header stays hidden there, which is right.
  Re-check `/` when `ClientPage` goes back on the route.
- Polarity was frozen per route, so the header stayed ink-dark while scrolling
  across the home page's cream sections. The new header **samples the paper
  underneath the bar** and flips (`useFieldPolarity` in `components/header/kit.tsx`).

## What a Pholio header has to do

1. **Certify.** Talent arrive scam-burned and decide in seconds. The header is
   the first institutional signal: a house, or a template.
2. **Sort.** Two audiences with opposite questions hit the same URL.
3. **Hold the frame.** It's the one constant across twelve very different
   cinematic pages — it's what makes them one publication.
4. **Get out of the way.** It lives over scroll-driven 3D, portraits and video.
5. **Convert without shouting.** One action, permanently available, that never
   uses urgency or a gradient.

Jobs 3 and 4 are in direct tension. The Index resolves it by buying total
silence at rest and spending all the brand weight in one place (the open
index) where it has room to be good — at the cost of one extra click before a
desktop visitor sees the destinations.

## Rules the shipped header keeps

- No blur, no translucency. A header that needs a backing takes the page's own
  paper colour, opaque.
- Gold is a state, not a surface: live route, action, sweep — never a filled
  shape larger than a word, never a whole word set permanently in gold text.
- Hover/prominence is a colour and a 1px rule — **never scale.** The site runs
  a custom cursor, so feedback has to live on the mark itself, not its size.
  (The mobile index's "Get scouted" action was briefly rendered at display
  serif/25px to outrank "Log in" — that was wrong for the same reason; it now
  uses the same permanent-gold-rule treatment as every other CTA in the header.)
- The wordmark is the pholio-app talent-dashboard mark, not a bespoke
  marketing-site invention: Noto Serif Display 400, 0.2em tracking, gold,
  uppercase (`Wordmark` in `components/header/kit.tsx`, sourced from
  `client/src/shared/layouts/TalentLayout/TalentLayout.css` in `pholio-app`).
- One ease, `cubic-bezier(0.22, 1, 0.36, 1)`; `useReducedMotion()` collapses
  every transition to `0s`.
- The mobile hamburger → full-screen serif index is the pattern that worked,
  kept with its chrome stripped: no blurred backdrop, no rounded button, no
  filled pill at the foot.

## Files

```
lib/header-variants.ts            registry + DEFAULT_HEADER_VARIANT
components/header/kit.tsx         state, tokens, primitives, account, index panel
components/header/VariantIndex.tsx
components/header/index.tsx       id → component
components/HeaderWrapper.tsx      variant selection + route field
components/Header.tsx             untouched — still serves `current` (rollback)
```
