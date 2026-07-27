# Footer — design direction

Three footer directions were built live and compared at `/lab/footer`: directory,
service counter, and two doors. **The Directory won and shipped**, then went
through two further passes in review — the other two directions (and the
`/lab/footer` comparison page) have been retired from the tree. Their rationale
and screenshots live in git history if they're ever worth revisiting.

| id | direction | one line |
| --- | --- | --- |
| `directory` | 01 · The Directory | Brand anchor left, three curated columns right, legal on the baseline. |
| `current` | 00 · Current (rollback only) | The pre-redesign rounded card, kept only as an emergency fallback. |

`DEFAULT_FOOTER_VARIANT` in `lib/footer-variants.ts` is `directory` — that's what
the live site renders. `?footer=current` forces the old card footer;
`?footer=reset` clears any override. `?footerfield=cream` previews the footer on
cream paper instead of ink.

---

## What a footer is

Worth stating plainly, because the first attempt got the category wrong.

Footer research is consistent and unflattering to designers: **a footer is not a
second navigation menu, not a brand statement, and not a sitemap — it is a
service counter** (Nielsen Norman Group). Most visitors never read it. The ones
who scroll there are not browsing; they are *verifying or hunting one specific
thing* — the contact address, the privacy policy, the careers page, whether this
is a real company. Baymard's finding is the structural counterpart: footer links
must be divided into **distinct semantic sections with real headings**, and those
headings matter *more* on a phone, not less.

So the success condition is narrow. Someone on an errand finds the thing in about
two seconds, and everyone else's eye passes over a block that feels finished and
calm.

## Why the first attempts didn't work

Three rejected passes, three different failures. All are worth not repeating.

### Pass 1 — the header, stretched downward

An earlier set of four directions (a colophon, a ledger, an open index, and a
comp-card reverse) took the *header's* grammar and pointed it at the bottom of
the page: display serif at 3–5rem, a brand verdict line with an italic gold word,
a full-bleed ink slab with 200px of top air, the header's own `NavLink` and index
numbering repeated. The result read as a second hero — "a manifesto panel with
links sprinkled around it."

- **Display type in a footer** is the clearest tell. A footer that opens with a
  headline competes with the page it is supposed to close.
- **Brand prose** is filler here. A footer has no persuasion budget.
- **Top-of-page air** announces a new chapter. A footer ends one.
- **Mimicry is not coherence.** Reusing the header's composition is not the same
  as belonging to its system.

### Pass 2 — structurally right, visually unresolved

The Directory won on structure and then failed on execution: four even columns,
a 15px wordmark anchoring nothing, and — the tell — Terms/Privacy/Cookies listed
in a Legal column *and again* in the baseline. That duplication is what made the
block feel unfinished.

### Pass 3 — "too pale, too inactive, not elevated enough"

The important one, because paleness turned out to be **literal rather than a
matter of taste**. Every value in the block sat at the header's 58–60% muted, on
flat cream, with a single 38px gold rule as the only accent across the full page
width. Nothing ever reached full strength.

**Restraint is not the same as absence.** Four things were missing:

1. **Contrast.** Links now run at 82–86%, labels at 52–66%. Hierarchy comes from
   the *gap* between those values, not from everything being quiet together.
2. **Material.** Grain is listed brand furniture; without it a large field looks
   unfinished.
3. **The gold sweep.** An earlier note in this file banned it from the footer.
   That was wrong: per CLAUDE.md it is ported furniture that closes the app's
   workspace topbar. A footer is a closing band — it opens on the sweep.
4. **A focal point.** Nothing had priority, so the eye had nowhere to land.

## The shipped footer

### Composition

A brand bay against three uneven columns (0.85 / 0.85 / 1.15), with hairline
spines between the columns and an **open gutter** before them: negative space
separates identity from directory, hairlines organise within it. The asymmetry is
deliberate — an even four-column grid is what made pass 2 look like a placeholder.

- **Ink on every page.** The header is the variable element — it samples whatever
  section it crosses and flips mid-scroll — so the footer is the constant one,
  and the publication ends on the same velvet its own `body` is already set in.
  Per-page paper was tried and read as too pale.
- **The band opens on the gold sweep**, over grain.
- **The wordmark at 24px** — the app's own literal size (see CLAUDE.md, "Ported
  from pholio-app's talent system"), where the header deliberately uses 16px.
- **One action at full strength.** "Get scouted" is the only element at 100%;
  prominence comes from colour against muted siblings, never from size, a
  permanent rule, or a fill.
- **Motion is arrival, not animation.** Links draw a gold rule from the left on
  hover; the block arrives once on scroll. Nothing loops. `useReducedMotion()`
  drops the transform.

### Information architecture

Curated, not exhaustive — and **no route is listed twice**.

| Where | Contents | Why |
| --- | --- | --- |
| Platform | For talent, For agencies, Studio+ | The doors. |
| Company | About, Careers, Press, Contact | The house. |
| Trust & safety | Community guidelines, Submission program, AI notice | Talent-facing — *what protects you*. |
| Baseline | Terms · Privacy · Copyright · Cookie preferences | Contractual and procedural. Listed once, nowhere else. |

"Trust & safety" is deliberately not a synonym for Legal: those three are what a
scam-wary applicant scrolls down to check, and burying them under "Legal" answers
the question technically while hiding from it in practice.

The cookie *policy* is not linked directly. The baseline carries
`CookiePreferencesButton` instead, which clears the consent record and re-raises
the banner — a control beats a link to a page with no controls on it, and the
banner links the policy anyway.

There is **no copyright or corporate line**, removed by request.

### Contrast

All resting values are ≥4.5:1 against their own surface, verified rather than
eyeballed — the labels and baseline sit at 10px, where small text has no room to
be decorative.

| | ink | cream |
| --- | --- | --- |
| Link | 12.7:1 | 11.2:1 |
| Label | 5.4:1 | 5.6:1 |
| Baseline | 5.0:1 | 4.9:1 |
| Action | 19.1:1 | 16.7:1 |

Gold on hover is 8.8:1 on ink. On cream it is 3.1:1 — the brand's fixed accent,
acceptable on a hover state where the resting value already passes, and one more
reason ink is the default.

## Open questions

- **Should a minimal © return?** It is fully removed as requested; most brands
  keep one.
- **Accordions on mobile?** Every group stays open in a two-up grid today, which
  keeps all content visible.
- **The action talks only to talent.** Agencies get no equivalent.

## Files

```
lib/footer-links.ts                 content model — groups, baseline, social, entity
lib/footer-variants.ts              registry + DEFAULT_FOOTER_VARIANT
components/footer/kit.tsx           shell, tokens, type scale, brand anchor, baseline
components/footer/VariantDirectory.tsx
components/footer/icons.tsx         the three social glyphs
components/footer/index.tsx         id → component
components/FooterWrapper.tsx        variant + field selection
components/MarketingFooter.tsx      thin shim, so the 18 call sites are unchanged
components/MarketingFooterLegacy.tsx  untouched — still serves `current` (rollback)
```

## Sources

- [Footers Are Underrated — Nielsen Norman Group](https://www.nngroup.com/videos/footers/)
- [Footer Links Should be Divided into Distinct Semantic Sections — Baymard Institute](https://baymard.com/blog/footer-links-ecommerce)
- [Website footer design best practices — LogRocket](https://blog.logrocket.com/ux-design/website-footer-design-practices/)
- [Footer Design Best Practices — UXPin](https://www.uxpin.com/studio/blog/footer-design-basics/)
