# lessons.md

Corrections the owner of this site has actually made, written down so the next
agent does not make them again.

Read this before designing any surface. `AGENTS.md` says what the repo is;
`docs/design-language/03-banned-ui.md` says what not to build. This file says
what has already gone wrong here, in this owner's words, and what the fix was.

Rules for maintaining it:

- One entry per correction. Add an entry the same session the correction is
  made, while the reasoning is still exact.
- Record what was built, why it was wrong **in the owner's terms**, and the rule
  that follows. The rule is the part future agents act on.
- Do not soften a critique into a neutral guideline. The force of the wording is
  the signal.
- Never delete an entry because it feels dated. If a rule is genuinely
  superseded, mark it superseded and say by what.

**This file outranks every other instruction in the repo.** If the owner
criticises something, that critique becomes a rule here, and it wins over
`CLAUDE.md`, `AGENTS.md`, `docs/design-language/*`, and any installed skill,
even when one of those documents explicitly recommends the criticised thing.
When that happens, say so in the entry and name the document being overruled,
so the next agent inherits a decision rather than a contradiction. The
overruled document should then be corrected to match.

**Documenting the critique is not optional.** Any agent that receives a
correction writes the entry in the same session, before or alongside the fix.
An undocumented critique gets made again.

---

## 1. Inheriting a design language is not copying components

**Date:** 2026-08-04
**Surface:** the first four footer directions

**What was built.** Four footer prototypes assembled out of the header's own
components: `Wordmark`, `Kicker`, `NavLink`, `ActionLink`, `GoldSweep`, the
header's field tokens, the header's container geometry. One direction, "The
Ledger", reproduced the header's full-screen index panel lying down: the same
serif entries at display scale with the same mono margin notes beside them.

**What was wrong.**

> "These are still not unique. They're trying to imitate the header, and that's
> not what I need."

> "In `footer=ledger`, you basically copied the header directly into the footer.
> That is not design continuity, that is duplication. The footer should feel
> related to the header, but not dependent on it, and definitely not like a
> mirrored version of it."

> "When I say follow a design language, I do not mean copy-paste components
> across the site. I mean inherit the visual system — typography, spacing, tone,
> restraint, hierarchy — and then design each component appropriately for its
> role."

The agent had also written the sharing of primitives into the code as a virtue,
with a comment arguing that reimplementing them would cause brand drift. That
reasoning is what produced the failure. Shared primitives protect against drift
in *values*. They do not license reusing a surface's *composition*.

**The rule.** Inherit the system, design the component.

- **Inherit:** the palette, the three typefaces and what each one is for,
  spacing rhythm, hairline-not-card grouping, gold as a state rather than a
  surface, hover as colour plus a 1px rule, the level of restraint.
- **Do not inherit:** another surface's layout, its hierarchy, its type scale,
  its furniture, or its structural gestures.

Before building any new surface, write down the design problem it solves and how
that problem differs from the neighbouring surface's. The header's problem is to
be present without intruding over changing imagery while the page moves. The
footer's problem is to end the page and hold the whole site at rest, all visible
at once, with nothing after it. Those are different problems and they must
produce different compositions.

**The test.** If you can describe the new surface as "the header, but at the
bottom" or "X, laid down", you have duplicated rather than designed. Start over.

**Related:** this is the failure the clean-slate reset was meant to prevent.

> "This is the same issue we had with the old pholio-landing, and it's exactly
> why we started from a clean slate. Something from that mindset clearly carried
> over."

---

## 2. A brand accent used twice stops being an accent

**Date:** 2026-08-04
**Surface:** the footer's top edge

**What was built.** Every footer direction opened with the gold sweep across its
top edge, on the argument that the header closes its band with the same gradient
and so the page would read as bracketed by one piece of furniture.

**What was wrong.**

> "We also do not need the gold sweep in the footer, at least not in the way it
> is currently being used. Right now it conflicts with the header."

> "The footer needs its own visual resolution, and if there is any shared accent
> language, it should be interpreted in a quieter, more appropriate way rather
> than repeated literally."

Symmetry is not resolution. Two identical gold gradients on one screen compete;
neither reads as special, and the header's edge loses the distinctiveness that
made it worth preserving.

**The rule.** The gold sweep is the header's. It stays a brand asset, and it
stays scarce. A surface that needs to signal an ending finds its own way to end:
spacing, a plain hairline, the composition simply stopping. If a shared accent
appears on a second surface, it must be reinterpreted at lower volume, not
pasted.

Generalise it: **before repeating any brand element on a new surface, ask
whether repeating it makes the original weaker.** If yes, do not repeat it.

---

## 3. Monospace is not the house voice for legal and copyright lines

**Date:** 2026-08-04
**Surface:** the footer imprint

**What was built.** `© 2026 Pholio Studio, Inc.` set in JetBrains Mono at 10px
with wide tracking, matching the header's `Kicker`.

**What was wrong.**

> "I also want you to discontinue the font currently being used for
> '© 2026 Pholio Studio, Inc.' It feels too techy and generic. Find a better
> font treatment that feels more editorial, more industry-aligned, and more at
> home in the industry we're in (modeling, creative etc.)."

**The rule.** Mono is for labels on real data: a date, a measurement, a document
ordinal, a field name. A copyright line is none of those. It is the site's
signature, and it is read by an audience from fashion and casting, not from
engineering. Set it editorially.

More broadly: **the industry this site sells into is modelling and creative, not
software.** Any treatment that would look at home in a developer tool is wrong
here even when it is technically consistent with the token system. See
`docs/design-language/05-industry-reference.md`.

---

## 4. A sitewide surface cannot carry a statement

**Date:** 2026-08-05
**Surface:** the footer's closing line

**What was built.** Both footer directions opened on
*"Every book here belongs to a real person."* in the display serif with one
italic gold verdict word, sized as the surface's focal element.

**What was wrong.**

> "I don't like the 'Every book here belongs to a real person.' text since this
> footer shows in every page."

A line that is good once is wallpaper on the ninetieth reading. The footer
appears under the home page, under `/talent`, under every legal document; a
statement in that position is not a statement, it is furniture that happens to
contain words.

Independently confirmed by measurement: across roughly thirty-five sites in the
space, the largest element in a footer is the company's name, the company's
people, or one instruction, and **never a statement**
(`docs/design-language/05-industry-reference.md` §3.2).

**The rule.** Copy that argues belongs on a page, where it is read in a context
and read once. A sitewide surface carries names, destinations, and facts. If a
footer needs a focal element, it is the mark, a real address, or a single verb,
never a sentence about what the company believes.

---

## 5. Trim the standing links; a route does not need one

**Date:** 2026-08-05
**Surface:** the footer's legal column

**What was wrong.**

> "The legal section is too long, some don't need to be linked, they could just
> exist and we access them when they're hyperlinked somewhere."

Eight legal documents made the corpus the footer's longest column on every page
of the site, which spent the most space on the least interesting thing in it.

**The rule.** Publishing a route and giving it a standing sitewide link are two
different decisions. Most legal documents are reached from the context that
raises them, not from a masthead of them. `LEGAL_NAV` in
`lib/marketing-nav-links.ts` now carries an `inFooter` flag for exactly this:
every document stays live, routed and crawlable, and four carry the standing
link.

The same reasoning killed `Get scouted` in the footer:

> "Don't think we need get scouted in the footer."

The header index already carries the action. A conversion path repeated at the
bottom of every page is not twice as persuasive.

---

## 6. Pholio is not an agency, and has no address

**Date:** 2026-08-05

Research recommended printing a registered address or jurisdiction in the
footer, on the strength of Wilhelmina printing a street address and Next
printing a company registration number.

> "Address is not needed, pholio is not an agency we don't have a location,
> pholio is not legalized yet but will probably be a ccorp or an llc."

**The rule.** Pholio is a platform, not a roster with a building. Do not import
agency conventions that depend on being an agency: offices, city lists, a
representation board, a street address. The company is also **not yet
incorporated**, so nothing on this site may state or imply an entity, a
jurisdiction, a registration, or a founding date. Revisit only when the entity
actually exists, and then only from `lib/legal-constants.ts`.

---

## 7. A surface needs its own field, not just its own layout

**Date:** 2026-08-05
**Surface:** the footer's background

**What was wrong.**

> "We need some unique divider or something unique in the background of the
> footer. I don't like that it's just pure black. It needs some personality."

The footer printed on `#050505`, the same ink as the page above it. Correct type
on identical paper reads as the page running out of content rather than as a
page ending.

**The rule.** A surface with its own job is allowed its own paper. The footer
prints on a warmed, lifted ink that is not the document's, carries a coarser
grain than the sitewide utility, and divides its groups with *vertical*
hairlines, since anything horizontal at its top edge competes with the header's
gold sweep (see §2). None of that is a fourth colour and none of it is
decoration: the field change is the divider, which is also the most common
closing device in the industry sample.

Where a surface needs personality, reach for **field, texture and structure**
before reaching for an added element. Adding things is what made the earlier
versions basic.

---

## 8. The footer is a closing panel, not a footer

**Date:** 2026-08-05
**Surface:** the whole footer

**The direction.** The owner supplied a reference and a brief: the mark spanning
the top at scale, the groups beneath it, and the surface taking the viewport as
a destination with the header standing down while it does.

> "It should not read like a standard website footer. It should feel like a
> statement panel that closes the site with confidence."

**What that changed, structurally.** The panel is a viewport tall
(`min-h-mobile-screen`), an IntersectionObserver in the header hides the bar once
the panel owns the top 40% of the screen, and the mark is the composition rather
than an element in one. Four groups: Product, Company, Legal, Contact, with the
social channels under Contact.

**Two research findings deliberately overruled.** Both are recorded so nobody
"corrects" the panel back later by citing the document:

- `05-industry-reference.md` §3.9 refuses an oversized wordmark at the bottom of
  a page as a portfolio-template move. That finding is about a *footer*. At
  panel scale, with the header gone and the surface owning the screen, the mark
  is the composition, not an ornament on one.
- §5.3 found that no footer in the sample animates on entry. This one does,
  once, on a single observer. A takeover that simply appears is a jump cut; the
  motion is what makes the ending feel chosen.

**The rule that generalises.** Research describes what the space does. It does
not decide what this site is. When a brief and a finding disagree, the brief
wins and the disagreement gets written down here with the reasoning, so the next
agent inherits a decision rather than a contradiction.

---

## 9. Reference-grade surfaces

**Date:** 2026-08-04

These already feel right and are the standing reference for the brand. Study
them before designing something new, and do not change them without being asked:

- The gold sweep, as a scarce brand asset.
- The Pholio wordmark.
- The header and its full-screen index menu.
- The display-serif headline treatment on the 404 in `app/page.tsx`, including
  the single italic gold verdict word.
- The motion language of the legal pages
  (`components/legal/LegalDocumentLayout.tsx`), which is the register for
  secondary pages generally.
- The typography and tone of the header index's clerical column
  ("More / About / Careers / Contact / Press") and the INDEX trigger.

"Reference-grade" means study the *judgement* in them: the restraint, the scale
relationships, the tone. It does not mean lift the markup. See lesson 1.

---

## 10. The intelligence section is about the model, not the feature list

**Superseded in part by §11.** The principle below still holds. The execution it
describes was rejected: the annotation words became a vertical list, which is
the specific thing §11 bans.

**Date:** 2026-08-06
**Surface:** home intelligence beat (`components/intelligence/index.tsx`)

**What was built.** A four-beat scroll sequence that keeps the model footage as
its anchor. Each beat is a single headline. Sparse mono words drift in around her
like contact-sheet labels: `expression`, `pose`, `headshot`, `editorial`. Those
words are taken from the actual portfolio classifier in `pholio-app`, not added
as decoration.

**Why.** The brief was to reveal Pholio's intelligence without defaulting to the
generic three-card SaaS section or a wall of dashboard screenshots. The model is
the person being understood; the typography is the system's attention. That
relationship is the section's whole argument.

**The rule.** When translating product intelligence to the marketing site, lead
with what the talent experiences and keep the visual anchor human. Use type as
annotation or signal, not as a list of features. If the section could be
replaced by a feature grid, it is not designed yet.

---

## 11. Copy is not the design. The type is.

**Date:** 2026-08-06
**Surface:** the home intelligence section, second attempt
(`components/intelligence/`)

**What was built.** Six scroll-driven claims in a left-hand column at display
scale, a twenty-token vertical ledger of product vocabulary in the gutter beside
the model, a vertical hairline separating the two, and a horizontal reading band
that travelled down the stage crossing her figure.

**What was wrong.**

> "The current version is too crowded and too text-heavy. The text sits almost
> entirely on the left, and there is too much of it. The messaging is vague
> marketing language that doesn't say much."

> "The long vertical list and the horizontal lines are obstructive, visually
> cheap, and they overpower the model shot instead of supporting it."

> "The background text has promise, but it needs much more motion, animation,
> and creative treatment."

> "The section has potential, but the current execution is too safe."

Four separate failures, and they are worth separating because they have
different fixes.

**11.1 Volume.** Six headlines of eight to twelve words each is a page of copy
pretending to be a scroll sequence. Long copy also produced awkward and
nonsensical lines, named directly:

> "Digitals expire at twelve weeks. Pholio counts from day one."
> "Not how many looked. Who."
> "One move next, and the number that asked for it."
> "When there is nothing to report, Pholio reports nothing."

Every one of those is a sentence trying to carry a feature. That is the tell.

**The rule.** A cinematic section gets **one line of prose, at most**. Everything
else is either a single word, a real product term, or nothing. If a claim needs
a sentence to land, it belongs on a page that is read, not on a stage that is
watched. Write the section's vocabulary first and the sentence last; if the
sentence turns out to be unnecessary, that is the correct outcome.

**11.2 The list.** Stacking classifier vocabulary vertically produced exactly
the thing §10 was written to avoid, one layer down. A list of `full length` /
`three-quarter` / `headshot` is a feature grid rotated ninety degrees.

**The rule.** No vertical stack of short labels beside a subject, in any
treatment, at any opacity, however real the data behind it is. Product
vocabulary belongs at display scale, one term at a time, as the composition.

**11.3 Rules and hairlines cheapen this surface.** This directly overrules
`docs/design-language/03-banned-ui.md` §3.9, which calls hairlines "the site's
primary organising furniture", and lesson §7, which reached for them in the
footer.

> "Vertical and horizontal rules that cheapen the composition."

**The rule.** **No hairlines, rules, ticks, bands, or leader marks in the home
scroll sequence.** Not as dividers, not as instruments, not as scan lines, not
at eight percent opacity. The ban list's carve-out for "a rule with content on
both sides of it" does not license them here. Where a composition needs
structure, it comes from type scale, position, occlusion and timing. This is
scoped to the cinematic home surfaces; the legal documents and the footer keep
their existing treatment until the owner says otherwise.

**11.4 Nothing may obstruct the model.** She is the emotional anchor, and every
element competing for the same pixels weakens her.

**The rule.** In the home sequence, **all display typography sits behind the
figure.** She occludes it, never the reverse. Type being cut by her silhouette
is the effect worth having; type laid over her body is not. Anything that must
sit in front of her is small, and it sits in space she does not occupy.

**11.5 Safe is a failure state here.** The background type was the one element
called promising, and the note on it was that there was not enough of it.

**The rule.** Background type is the section's primary instrument, not its
atmosphere. It travels, scales, layers, overlaps in time, bleeds off both edges
of the frame, and hands off between planes at different depths and speeds. A
word that only fades in and out has not been designed. "Restraint scores" from
`04-scroll-craft.md` §6 is about not adding *elements*; it is not permission to
under-animate the one element the section is made of.

**The test.** Freeze the section at any scroll position. If what you see could
be described as "a headline and some labels", start over. It should be
describable as a composition with one subject and one word in it.

---

## 12. Do not fix too much copy by removing the message

**Date:** 2026-08-06
**Surface:** the home intelligence section, third attempt
(`components/intelligence/`)

**What was built.** §11 said "far less copy", so the section was rebuilt with
almost none: eleven giant product terms travelling behind the model
(`HEADSHOT`, `DIGITALS`, `TWELVE WEEKS`, `WHO LOOKED`, market names), two type
planes moving against each other, and one closing sentence.

**What was wrong.**

> "The current intelligence section has been pushed too far in the wrong
> direction. I do like the background text, but it should be a subtle addition,
> not the main design move. Right now it feels crowded and overworked."

> "The motion is also very clunky and there's no concrete message, just a bunch
> of words that are not legible."

> "This section should be high quality, premium, luxurious, and motion-led. It
> should be award winning."

> "You have a high-quality video of a model, use it. There's so much you could
> do."

**12.1 A correction is a direction, not a limit to run to.** §11 said the
section had too much copy. The response deleted the message entirely, which
failed the same brief from the opposite side. Both versions were wrong for the
same underlying reason: the copy was never designed, it was only sized.

**The rule.** When a critique names a quantity, change the *quality* first and
the quantity second. Ask what the surface has to say, write that in as few
words as it honestly takes, and set those words well. A section with no message
is not a restrained section, it is an empty one.

**12.2 Background type is subtle or it is not background.** Eleven display
words arriving and leaving is a foreground pretending to be atmosphere.

**The rule.** If type sits behind the subject it stays behind her: one element,
one continuous movement, low enough that it never competes for the glance. Type
that pops in and out is not a background, whatever its opacity.

**12.3 Illegible is not a style.** Display type bled off both edges of the
frame so phrases read as `WELVE WEE` and `MILAN LO`. That was defended as an
editorial crop. It is not.

**The rule.** **Every word on the stage must be readable, whole, at every scroll
position it appears in.** Scale serves the word; the word does not serve the
scale. If a phrase does not fit, it is the wrong size or the wrong phrase.

**12.4 Fading things in and out is not motion design.** Each element appearing
and disappearing on its own timer read as clunky, because a dozen independent
fades have no through-line.

**The rule.** A cinematic section needs **one continuous movement that runs its
whole length**, and everything else is timed against that. Elements should
already be moving when they arrive and still be moving when they leave. Nothing
parks, nothing pops.

**12.5 The footage is the asset. Use it.**

> "Keep the model as the anchor."

**The rule.** The frame sequence is a camera, not a backdrop. It can push in,
pull back, and reframe, and that move is the section's spine. A sequence where
the model holds one size for the whole section while type does all the work has
wasted the only real thing on the stage.

**12.6 The message, stated once so it stops being re-derived.** Pholio sees the
talent and knows her. It understands her deeply, and that understanding is what
makes the product feel intelligent. It is not "AI-powered" anything. Any future
version of this section is judged against that sentence.

---

## 13. The confirmed direction for the intelligence section

**Date:** 2026-08-06
**Surface:** the home intelligence section, fourth pass

**What was accepted.**

> "I love that the text on the left and the video now match, and the message is
> clear. The video is finally supporting the copy. This is the right direction."

**The parts that are now settled.** Do not reverse these without being asked:

- **The camera is the spine.** The frame sequence pulls back onto the
  full-length shot, then pushes in to a close portrait, and every other element
  is timed against that one move.
- **The message, in twelve words.** `Pholio sees the frame.` /
  `Then it sees you.` / `Understood before you send.` Gold falls once, on `you`.
- **Copy and camera move together.** Type placement, scale and pacing are
  derived from where she is and how close the camera has come, never chosen
  independently.

**What still had to change.**

> "It feels a little pale."

> "The left-side text is too limited in its current placement. Don't think of
> typography as only living on the left. Be more creative with how the copy is
> placed, revealed, layered, and paced. You have a lot of space, use it."

> "But keep it sparse. I do not want more text for the sake of filling space."

> "The background text can stay if it helps. If it weakens the section, remove
> it entirely. If it stays, it needs better motion and more finesse. It should
> feel like it belongs in the composition, not like an afterthought."

**13.1 Sparse is not the same as small.** "Pale" was a scale problem, not a
colour one: three blocks all set within one narrow range of sizes, none of them
big enough to carry a frame.

**The rule.** Within a beat, the scale jump between the largest and smallest
fragment should be at least three to one. Drama comes from that ratio, not from
adding elements and not from raising opacity.

**13.2 A sentence is a composition, not a block.** The same twelve words, set as
three stacked paragraphs, is positioning. Split into fragments placed against
each other, it is typography.

**The rule.** Break each line into two fragments at different scales and
different positions, and let the space between them be part of the design.
**No two beats may use the same composition.** Left column, split across the
frame, and hanging indent are three; a fourth beat would need a fourth.

**13.3 Copy does not live on the left.** The left edge is one option among the
whole frame, and locking to it makes the model look like an illustration beside
a caption.

**The rule.** Use the full stage. A fragment may sit right, high, low, or
indented into the field, as long as it never covers the figure and never has to
be hunted for. Where the composition allows it, let the figure sit *inside* the
sentence rather than beside it.

**13.4 Reveal, do not fade.** Opacity was doing all the entrance work.

**The rule.** Type enters by wipe, from behind a mask, staggered per fragment,
so a line assembles rather than appears. Fades are for things leaving.

**13.5 Background type belongs to the camera or it does not belong.** The
archetype ribbon drifted sideways on its own timeline while the camera pushed
in, which is exactly why it read as an afterthought.

**The rule.** Anything living behind the figure shares the camera's move,
damped: it scales and travels with the push, less than she does. A background
element on its own independent timeline is pasted on, whatever its opacity.

---

## 14. Polish is specific

**Date:** 2026-08-06
**Surface:** the home intelligence section, fifth pass

**What was accepted, again.** The core is settled and stays: the camera push in,
the twelve-word message, copy composed against where she is.

> "The core idea is strong: the text and the model match, the message is clear,
> and the section finally feels like it is saying something meaningful."

**Six named defects, each with its own rule.**

**14.1 Do not print the brand name next to the brand mark.** The first beat read
`Pholio sees the frame.` directly under a hero whose entire composition is the
word PHOLIO at 28vw.

> "Saying 'Pholio' twice is unnecessary. Since the hero already has PHOLIO in
> it, use that more creatively instead of repeating the word plainly."

**The rule.** The wordmark is a typographic asset, not just a logo slot. Where
the brand needs to be the subject of a sentence, **set the mark and let it do
the work** rather than typing the name again in body voice. And never state in
copy what the composition above already says.

**14.2 A lockup is not two elements that happen to share an edge.**

> "The first beat is too separated, 'Pholio sees' and 'the frame' are too far
> apart."

**The rule.** Parts of one sentence belong in one block, spaced in ems of the
type they sit against, not positioned independently by percentage of the stage.
Negative space goes *around* a lockup, never through the middle of a phrase.

**14.3 The exit is a design decision.**

> "The text exit feels like a PowerPoint fade-out. Use a different motion
> language."
> "Avoid the current text fade-out behavior. The motion should feel designed,
> not preset."

**The rule.** **No opacity animation on display copy, in or out.** Type enters
and leaves by mask, word by word, staggered in reading order. If a line can
leave as one rectangle, it has not been choreographed. Opacity is for
background planes only.

**14.4 Check the descenders.** The tail of the italic `y` in `you.` was being
shaved by its own reveal mask.

**The rule.** Masked type carries its clearance as padding **on the moving
element**, not on the mask, so the wipe distance is a percentage of a box that
already contains the overhang. Then look at the lowest and highest glyph in
every fragment before calling it done, at the scroll position where it settles
and at the ones where it is halfway through.

**14.5 White on black is not emphasis.**

> "'Understood before you send' is good, but it needs a stronger typographic
> emphasis. Right now it is too plain and all white."

**The rule.** A beat needs a second treatment somewhere in it: a scale
inversion, a change of tracking, or the one gold verdict word. All-cream at one
size is the absence of a decision. The gold stays rationed to one word per
beat, and the beats that carry it should differ in scale so two gold moments
never read as a pair.

**14.6 "Pale" has been said three times. It means contrast, not colour.**

**The rule.** Before calling this section done, check that it carries: a scale
ratio of at least three to one inside every beat, at least one non-cream
treatment per beat, and a background plane that is genuinely out of focus rather
than merely faint. Faintness reads as washed out; softness reads as depth.

**14.7 Background type earns its place every pass.**

> "If the background text stays, it should be subtle and better animated. If it
> doesn't strengthen the section, remove it. It should never compete with the
> model or the main message."

**The rule.** It stays only while it is doing something the composition would
miss. It is depth: softened, eased rather than linear, riding the camera. A
background element travelling at constant speed in a straight line is the
default, and the default is what reads as undercooked.
