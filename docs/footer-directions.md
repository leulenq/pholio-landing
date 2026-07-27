# Footer — design directions

Three directions, comparable live at `/lab/footer`. **Nothing is chosen yet** —
`DEFAULT_FOOTER_VARIANT` in `lib/footer-variants.ts` is `directory` because
rendering requires a default, not because it won.

| id | direction | organised by |
| --- | --- | --- |
| `directory` | A · The Directory | Site structure — Platform, Company, Trust & safety, Legal. |
| `counter` | B · The Service Counter | Errand — Join as talent, Scout & book, Get help, Company. |
| `doors` | C · The Two Doors | Audience — For talent / For agencies, plus a shared row. |
| `current` | 00 · Current (rollback only) | The pre-redesign rounded card. |

Pin one site-wide with `?footer=<id>` (remembered for the tab), clear with
`?footer=reset`. `?footerfield=ink` / `=cream` forces a paper.

---

## What a footer is

This was the thing the first attempt got wrong, so it is worth stating plainly
before any layout.

Footer research is consistent and unflattering to designers: **a footer is not a
second navigation menu, not a brand statement, and not a sitemap — it is a
service counter** (Nielsen Norman Group). Most visitors never read it. The ones
who scroll there are not browsing; they are *verifying or hunting one specific
thing* — the contact address, the privacy policy, the careers page, whether this
is a real company. Baymard's finding is the structural counterpart: footer links
must be divided into **distinct semantic sections with real headings**, and
those headings matter *more* on a phone, not less.

So the footer's success condition is that someone on an errand finds the thing
in about two seconds, and that everyone else's eye passes over a block that
feels finished and calm. Nothing about that is served by making it dramatic.

## What a footer is not (and what the first attempt did)

The first set of four directions — a colophon, a ledger, an open index, and a
comp-card reverse — were all rejected, correctly, for the same root error: each
took the *header's* grammar and stretched it downward. Display serif at 3–5rem.
A one-line brand verdict with an italic gold word. A full-bleed ink slab with
150–200px of top air. The header's own `NavLink` and index numbering repeated at
the bottom of the page.

The result read as a second hero: a manifesto panel with links sprinkled around
it. Four specific failures worth not repeating:

1. **Display type in a footer.** The single clearest tell. A footer that opens
   with a headline is competing with the page it is supposed to close.
2. **Brand prose.** "Where talent is verified, not advertised" is filler in this
   position — a footer has no persuasion budget, and nobody scrolled down for a
   slogan.
3. **Top-of-page air.** Vertical drama says "new chapter". A footer says "the
   end of this one".
4. **Header mimicry mistaken for coherence.** Reusing the header's composition
   is not the same as belonging to its system. Coherence comes from the shared
   palette, the shared ease, the shared clerical mono voice and the shared
   wordmark — not from repeating its layout.

A fifth, quieter mistake: the first attempt declared "legal is never a column",
which sounds like restraint and is actually the opposite. Legal is one of the
two things people come down here for. It gets a heading like everything else.

## The rules all three directions obey

- **Small type only.** Links 13px, headings 10px mono caps, baseline 10px. The
  wordmark is the only non-clerical type in the block.
- **The page's own paper**, closed by **one hairline**. No new colour field, no
  gradient, no gold sweep bracket, no card.
- **Air between the items, not above the block.** ~64–80px of top padding.
- **Labelled semantic sections**, preserved on mobile as a two-up grid so each
  group keeps its heading rather than collapsing into one stack.
- **Legal and trust documents are primary content.** "Trust & safety" is broken
  out of the legal pile in every direction — community guidelines, submission
  programme, AI notice, copyright — because those four are what a scam-wary
  applicant is actually checking.
- **No prose.** The wordmark, the links, an address a human answers, and the
  entity line. Nothing else.
- **Gold is a state**: the wordmark, and hover. Never a surface.
- Social links are **words, not glyph buttons**.

## The directions

### A · The Directory — **chosen, and since refined**

Identity left, labelled sections right, baseline underneath. The pattern every
well-built site converges on — and convention is a feature down here, because
the footer's job is to be *found*, not to be original.

Reviewed as "structurally right, but too plain, too static, and too repetitive
in its legal structure — a placeholder rather than a final footer." The rework:

- **A real brand anchor.** The mark goes from 15px to 23px, gains a short gold
  rule, and the address and social glyphs hang off the same left edge. The left
  bay had been trailing off into nothing.
- **Three columns, not four.** The Legal column is gone (see IA below). Fewer,
  wider, *uneven* columns — 0.85 / 0.85 / 1.15 — give the bay rhythm.
- **Hairline spines between the nav columns**, but an open gutter between brand
  and nav: negative space separates identity from directory, hairlines organise
  within it.
- **Motion.** Links draw a gold rule from the left on hover; the block arrives
  once on scroll. That is the whole answer to "visually inactive" — nothing
  loops, nothing shimmers, reduced motion drops the transform.
- **Social moved under the wordmark as glyphs**, out of the utility strip.
- **The copyright / incorporation line is gone**, by request.

- **Strength:** instantly legible, and now anchored. Nothing to learn.
- **Tradeoff:** still the most conventional of the three — which is arguably
  the correct ambition for a footer.

#### The information architecture

The complaint that unlocked this: Terms, Privacy and Cookies appeared in a Legal
column *and* again in the baseline. Duplication is what made the block feel
unresolved. The principle is now **edited, not exhaustive** — the footer carries
the highest-value destinations, every route appears exactly once, and secondary
policies live deeper in the site.

| Where | Contents | Why |
| --- | --- | --- |
| Platform | For talent, For agencies, Studio+ | The doors. |
| Company | About, Careers, Press, Contact | The house. |
| Trust & safety | Community guidelines, Submission program, AI notice | Talent-facing — *what protects you*. |
| Baseline | Terms · Privacy · Cookies · Copyright | Contractual and procedural. Listed once, nowhere else. |

Copyright/DMCA moved from the Trust column to the baseline: it is a procedure,
not a protection a talent reads. The cookie policy is additionally reachable
from the consent banner, which is where people actually look for it.

### B · The Service Counter

The same routes filed under the errand rather than the org chart, plus a real
contact block: the address, and the two facts that answer "is this a real
company". The most literal reading of the research.

- **Strength:** fastest for someone who arrived with a task; treats contact as
  the primary item it measurably is.
- **Tradeoff:** intent labels age badly and must be re-argued whenever the
  product adds an audience. Needs the full four columns to breathe.

### C · The Two Doors

Pholio's one structural fact is two audiences with opposite questions. The
header sorts them on arrival; this sorts them again at the point where someone
has read a page and is deciding what to do next. The halves are strict peers —
a hairline between them and nothing else.

- **Strength:** the most Pholio-specific, without being conceptual or theatrical.
- **Tradeoff:** duplicates the header's sorting job, and forces every future
  route to be assigned an audience even when it belongs to both — which is what
  the shared row is for, and why that row will be under constant pressure to
  grow.

## Open questions for the critique

1. **Which organisation wins** — structure, errand, or audience.
2. **Should the footer ever be ink?** It currently takes the page's field, so it
   is cream on the editorial/legal pages and ink on the cinematic ones. A fixed
   terminal field would make the footer the one constant while the header stays
   variable. `?footerfield=ink` shows it site-wide.
3. **Accordions on mobile?** Currently every group stays open in a two-up grid,
   which keeps all content visible. Collapsible sections are the other accepted
   pattern and would shorten the phone footer considerably.
4. **Is a CTA missing?** No direction carries a "Get scouted" button. `Get
   scouted` appears as a link in B and C. A footer CTA is defensible; a footer
   CTA that shouts is not.

## Files

```
lib/footer-links.ts                 content model — one source for all directions
lib/footer-variants.ts              registry + DEFAULT_FOOTER_VARIANT
components/footer/kit.tsx           shell, type scale, groups, baseline
components/footer/VariantDirectory.tsx
components/footer/VariantServiceCounter.tsx
components/footer/VariantTwoDoors.tsx
components/footer/FooterLab.tsx     the /lab/footer comparison surface
components/footer/index.tsx         id → component
components/FooterWrapper.tsx        variant + field selection
components/MarketingFooter.tsx      thin shim, so the 18 existing call sites are unchanged
components/MarketingFooterLegacy.tsx  untouched — still serves `current` (rollback)
```

Retire `/lab/footer` and the losing directions once one is chosen, as
`/lab/header` was.

## Sources

- [Footers Are Underrated — Nielsen Norman Group](https://www.nngroup.com/videos/footers/)
- [Footer Links Should be Divided into Distinct Semantic Sections — Baymard Institute](https://baymard.com/blog/footer-links-ecommerce)
- [Website footer design best practices — LogRocket](https://blog.logrocket.com/ux-design/website-footer-design-practices/)
- [Footer Design Best Practices — UXPin](https://www.uxpin.com/studio/blog/footer-design-basics/)
