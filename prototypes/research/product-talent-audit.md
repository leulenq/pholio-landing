# Pholio talent product audit

**Audit date:** 2026-07-12  
**Product inspected:** `/Users/lenquanhone/Projects/pholio-app`  
**Purpose:** establish the real, defensible talent value beneath the new landing-page narrative. This is an implementation audit, not a route inventory and not a rewrite of prior product claims.

## Executive conclusion

Pholio is strongest when described as the system that turns a model's raw career materials into an agency-readable package, carries that package into agency workflows, and shows the talent what happens afterward.

Its credible transformation is:

> **From photographs scattered across folders and links to a current, rights-cleared, agency-readable career presence—with submissions, conversations, and market signals connected to the same living book.**

That is materially more specific than “portfolio builder” and more defensible than an unrestricted “career operating system” claim. The implemented product spans five connected jobs:

1. **Become presentable:** guided intake, a structured industry profile, measurements, disciplines, booking lanes, credits, training, social links, and a first-card reveal.
2. **Build the materials agencies actually use:** separate digitals from styled book work; classify, date, credit, crop, order, rights-clear, and control each image; produce digitals sheets and comp cards.
3. **Become discoverable and submit properly:** opt into agency discovery, browse open agencies, enter agency open calls, assemble a seven-part submission dossier, and satisfy real readiness and consent gates.
4. **Stay in the conversation:** see submission standing, preserve drafts, receive requests, message agencies, and respond to interviews or go-sees.
5. **Read the career:** track representation, availability and bookouts; understand material freshness, agency review/advance signals, pipeline movement, markets, card pulls, portfolio attention, and next moves.

The product is not merely a collection of screens. It has a meaningful data spine: the same profile, images, rights records, visibility decisions, representations, and applications flow into the portfolio, comp card, agency discovery, submission package, and Intel. That continuity is the most valuable marketing truth and the best basis for the landing page's continuous visual transformation.

## Status vocabulary used in this audit

- **Shipped:** an implemented user path is mounted in the current application and supported by server behavior/data.
- **Shipped, conditional:** implemented, but dependent on Studio+, an opt-in, a configured provider, agency participation, or sufficient event volume.
- **Partial:** meaningful implementation exists, but the visible promise is incomplete, misleading, legacy, or not joined into a dependable end-to-end path.
- **Speculative / infrastructure only:** migrations, tasks, or agency-side concepts exist without a complete talent-facing experience. Do not present these as available features.

## Product thesis and narrative priorities

### The three strongest promises

#### 1. Your work becomes an agency-readable package

This is the clearest product advantage. Pholio does not treat every image as an interchangeable gallery tile. It knows the operational difference between current, unretouched **digitals** and styled **book** work; checks for headshot and full-length requirements; recognizes stale or misclassified material; carries credits and rights; and turns the result into an industry-formatted comp card and submission dossier.

Best expression:

> **Your images become the materials agencies expect: current digitals, a considered book, a comp card, and a complete submission.**

#### 2. One living book travels through the career

The same underlying material feeds the public portfolio, comp card, agency discovery preview, and submission package. Updating the source material can improve every downstream representation of the talent. Saved card editions and submitted package snapshots add appropriate permanence where needed.

Best expression:

> **Build the book once. Keep every way you are seen current.**

This must not imply that already-submitted packages mutate after sending; the system deliberately snapshots submissions.

#### 3. Silence becomes legible

The application ledger, named status changes, messages, interviews, and aggregate Intel reduce the uncertainty that follows a submission. Intel correctly distinguishes high-value signals—review, advance, card pull—from raw reach and avoids named agency read receipts.

Best expression:

> **Know when a submission is reviewed, when it advances, when more is requested, and whether your materials are still doing their job.**

This is more credible than “know who is viewing you.” Anonymous attention remains aggregate by design.

### Secondary promises

- Agency discovery is real and opt-in; adult talent can appear in an agency's semantic Scout search and receive an invitation to apply.
- Current-material coaching is real: digitals and measurements are perishable, and Pholio uses dates and classification signals to make that actionable.
- The product handles minors and sensitive material with real guardian-consent and visibility rules; this supports trust, but it should not dominate the aspirational narrative.
- Studio+ writing assistance is useful operational polish, but it is not a product-defining promise.
- Representation, availability, and bookouts make Pholio useful after the first submission, supporting the “career system” position.

## Detailed capability audit

Each capability below answers: (1) technical behavior, (2) problem solved, (3) professional relevance, (4) aspiring relevance, (5) emotional benefit, (6) practical benefit, (7) landing-page suitability, and (8) a defensible marketing expression.

### 1. Guided casting-call onboarding and resumable setup

**Status:** Shipped.

1. **Technical behavior:** A persisted server-side state machine takes talent through entry/authentication, birthdate, identity, a required headshot plus optional full-length digital, height and eligible stats, location/focus, then a one-time first-card reveal. It resumes after reload, enforces adjacent transitions, requires DOB before photo collection, requires a real uploaded digital headshot, and branches minors to a height-only path until guardian consent. Evidence: `client/src/domains/onboarding/pages/CastingCallPage.jsx`, `CastingScout.jsx`, `src/domains/onboarding/services/state-machine.js`, `src/domains/onboarding/routes/casting.js`, and `client/src/domains/talent/pages/RevealPage/FirstCard.jsx`.
2. **Problem solved:** blank-profile setup is intimidating, and inexperienced talent often do not know what materials or stats matter first.
3. **Professional relevance:** creates a fast, controlled route back into a standardized working profile without forcing completion of every optional field.
4. **Aspiring relevance:** teaches the first industry distinction—headshot/full-length digitals and accurate height—through the structure of the flow.
5. **Emotional benefit:** joining feels like entering a professional process, not filling out a generic account form.
6. **Practical benefit:** progress survives reloads; age/consent rules prevent unsafe collection; the talent reaches a usable profile with minimal inputs.
7. **Landing page:** Supporting. It is a conversion-confidence beat, not the central story.
8. **Marketing expression:** **“Start with a headshot, your height, and the facts agencies need first. Pholio shapes the rest into a working profile.”**

**Important limitation:** the cinematic “scan” shown during onboarding does not currently run the main image-classification pipeline. Do not say “Pholio analyzes your face,” “scores your potential,” or “discovers your best market” during onboarding. A separate legacy `/api/upload` Scout route still contains facial/potential and body-estimation logic, but it is not the canonical intake and is not an acceptable marketing basis.

### 2. Structured professional identity and discipline model

**Status:** Shipped.

1. **Technical behavior:** The talent profile stores identity, city/markets, playable age, pronouns, discipline (`Model`, `Performer`, `Creator`), stats track, primary and secondary booking lanes, union status, work eligibility, languages, passport/travel readiness, experience, achievements, credits, training, specialties, comfort levels, look details, social links, and contact information. Booking lanes are ordered and can be informed by stored fit signals. Evidence: `client/src/domains/talent/pages/ProfilePage/index.jsx`, `DisciplineSection.jsx`, `BookingLanesControl.jsx`, and `src/domains/talent/routes/profile.js`.
2. **Problem solved:** a social bio or image gallery cannot represent the structured facts that bookers search and cast against.
3. **Professional relevance:** consolidates operational details normally repeated across agency forms, decks, email, and personal notes.
4. **Aspiring relevance:** reveals what a credible professional profile contains and helps the user articulate the kinds of work they are pursuing.
5. **Emotional benefit:** the talent feels defined by a professional identity rather than reduced to an unstructured photo account.
6. **Practical benefit:** one canonical profile feeds discovery, portfolio, comp card, applications, and package validation.
7. **Landing page:** High, as part of the “raw identity becomes industry-ready” transformation.
8. **Marketing expression:** **“Not a creator profile. A modeling profile—built around your lanes, stats, book, credits, markets, and availability.”**

### 3. Accurate, current stats and measurement discipline

**Status:** Shipped.

1. **Technical behavior:** Talent can maintain metric/imperial height, gender/track-appropriate core measurements, shoe region/size, dress or suit information, inseam, hair, eyes, body/build, tattoos and piercings. Measurement updates are timestamped; a one-tap “still accurate” action refreshes currency; the package and Intel judge stats against real recency windows. Core measurement validation respects womenswear, menswear, and ungendered tracks. Evidence: `MeasurementsSection.jsx`, `src/domains/talent/routes/availability.js`, `src/domains/talent/services/send-readiness.js`, and `src/domains/talent/services/intel/materials.js`.
2. **Problem solved:** outdated or improperly formatted stats create bad submissions, wasted callbacks, and credibility loss.
3. **Professional relevance:** reduces repeated admin while keeping information booker-readable and current.
4. **Aspiring relevance:** teaches what should be measured, how it is presented, and why accuracy matters more than idealized numbers.
5. **Emotional benefit:** confidence that the package will not expose an avoidable amateur mistake.
6. **Practical benefit:** consistent stats power comp cards, discovery, and submissions; stale data creates an actionable reminder rather than silently passing.
7. **Landing page:** High as evidence of intelligence that performs useful work quietly.
8. **Marketing expression:** **“Your stats stay formatted for the board you work in—and Pholio tells you when they need confirming.”**

**Claims caution:** Measurements are self-reported unless an agency explicitly records “measured in person.” Never call ordinary stats “verified.” Weight is intentionally not a standard submission stat.

### 4. Submission readiness and package coaching

**Status:** Shipped.

1. **Technical behavior:** A canonical profile-strength and send-readiness system evaluates identity, location, DOB, discipline, height, track-appropriate measurements, current headshot/full-length digitals, contact details, image distribution rights, guardian consent, and named-agency consent for minors. It separates required readiness from optional improvement, produces concrete next steps, and server-validates the package before submission. Evidence: `src/domains/talent/services/profile-strength.js`, `package-intelligence.js`, `send-readiness.js`, `validate-submission-package.js`, and the mirrored client utilities.
2. **Problem solved:** talent often discover a missing or stale item only after entering an application or receiving a booker's rejection.
3. **Professional relevance:** protects reputation by preventing incomplete or rights-defective packages from being sent.
4. **Aspiring relevance:** turns tacit booker expectations into a prioritized preparation path.
5. **Emotional benefit:** replaces vague “am I ready?” anxiety with a finite, understandable next move.
6. **Practical benefit:** deep-links the user to the exact missing material and blocks invalid sends on the server, not only in UI.
7. **Landing page:** Very high. This is one of the clearest “intelligence reduces manual uncertainty” moments.
8. **Marketing expression:** **“Before you send, Pholio checks the package a booker will receive—not just whether your profile is ‘complete.’”**

### 5. The Book: media organization with real industry categories

**Status:** Shipped.

1. **Technical behavior:** The media workspace separates **Digitals**, **The Book**, **Tests**, **Campaigns**, **Tearsheets**, and **Motion**. Talent can upload images, add video URLs, reorder by drag/keyboard, select a hero, bulk edit/delete, replace a processed file, restore the original, crop, create dated digitals sets, and choose a current set. Evidence: `client/src/domains/talent/components/MediaWorkspace.jsx`, `FrameEditor.jsx`, and `src/domains/talent/routes/media.js`.
2. **Problem solved:** files spread across camera roll, Drive, PDFs, social accounts, and old cards lose context and become hard to keep current.
3. **Professional relevance:** provides a living archive for tests, campaigns, published work, motion, and current agency materials.
4. **Aspiring relevance:** teaches that digitals, tests, editorial work, and campaigns play different roles in a book.
5. **Emotional benefit:** the work feels curated and owned rather than accumulated.
6. **Practical benefit:** one organized source feeds every outward-facing artifact and makes updates faster.
7. **Landing page:** Very high. It is the ideal first transformation scene: loose images resolve into a professional system.
8. **Marketing expression:** **“Digitals stay digitals. Tests, campaigns, tearsheets, motion, and your book each keep their place.”**

### 6. Automatic image classification with human review

**Status:** Shipped, conditional on configured vision service; degrades to heuristics/manual review.

1. **Technical behavior:** New media runs through image forensics, heuristic shot classification, and—when needed—a Groq vision classifier. It assigns or suggests shot type, style type, and image type; records signals such as expression, pose, body visibility, background, styling, retouch likelihood, and makeup; uses confidence bands to auto-apply, suggest, or ask; preserves user-confirmed classifications; audits a stable sample; persists signals; and reindexes agency discovery. Evidence: `src/domains/talent/services/run-image-classification.js`, `image-classification-policy.js`, `src/domains/ai/classify-portfolio-image.js`, and `ClassificationReviewStrip.jsx`.
2. **Problem solved:** manually categorizing every upload is tedious, while incorrect labels let polished book work masquerade as raw digitals and weaken the package.
3. **Professional relevance:** accelerates maintenance of large books without removing editorial control.
4. **Aspiring relevance:** provides immediate, concrete education about how an image reads in industry terms.
5. **Emotional benefit:** the system feels attentive to the actual work, not merely a storage container.
6. **Practical benefit:** classification powers readiness, package advisories, discovery indexing, and downstream image selection.
7. **Landing page:** Very high, but show classification as quiet organization and package judgment—not facial scoring.
8. **Marketing expression:** **“Upload the work. Pholio reads the frame—digital or book, headshot or full length, natural or styled—then lets you confirm the call.”**

**Claims caution:** This is classification, not an objective assessment of beauty, talent, hireability, identity, ethnicity, or body measurements. The service can fail or return suggestions; the talent remains the authority.

### 7. Image editing, provenance, rights, releases, and visibility

**Status:** Shipped.

1. **Technical behavior:** Each frame can store crop and focal treatment, caption/tags, shot/style/image taxonomy, capture date, retouch date, collaborator credits, publication/issue/story data for tearsheets, public/private state, separate public and agency exclusion, rights status, license type, owner/photographer, scope, territory, term/expiry, exclusivity, and a model-release reference with signer role/date. Expired or incomplete rights can block distribution. Original/processed file replacement and restoration are supported. Evidence: `FrameEditor.jsx`, `ImageMetadataModal.jsx`, `src/domains/talent/routes/media.js`, `src/shared/lib/image-rights.js`, and media migrations.
2. **Problem solved:** portfolios lose professional context, and talent can accidentally circulate work beyond its permitted use.
3. **Professional relevance:** preserves credits and distribution readiness across a growing archive.
4. **Aspiring relevance:** introduces rights discipline early and makes collaborator attribution part of the workflow.
5. **Emotional benefit:** control—over the work, who sees it, and whether it is safe to send.
6. **Practical benefit:** keeps prohibited or expired material out of public pages and submission packages.
7. **Landing page:** Medium-high. It is strong trust proof but too operational for a standalone scene; show it as an intelligence layer annotating a frame.
8. **Marketing expression:** **“Every frame can carry its credit, release, usage rights, and audience—so the right work travels, and the wrong work stays private.”**

### 8. Dated digitals sets and digitals export

**Status:** Shipped.

1. **Technical behavior:** Talent can create named/date-stamped digitals sets, select the current set, classify the required slots, and download a dedicated digitals PDF. Package intelligence distinguishes true `image_type: digital` material from styled portfolio work, checks headshot/full-length presence, reads additional profile/smile/back slots, detects environmental backgrounds, polished styling, heavy retouch signals, and staleness beyond the configured 90-day window. Digitals cannot retain a retouch date. Evidence: `MediaWorkspace.jsx`, `src/domains/talent/services/profile-readiness-images.js`, `package-intelligence.js`, and the `/pdf/digitals` routes.
2. **Problem solved:** models frequently resend old digitals, use retouched work, or lose track of which set is current.
3. **Professional relevance:** makes seasonal/current-set maintenance and clean agency delivery faster.
4. **Aspiring relevance:** clearly teaches why a beautiful editorial portrait is not a substitute for a truthful digital.
5. **Emotional benefit:** readiness without second-guessing which files belong in the set.
6. **Practical benefit:** current set selection and dated exports reduce accidental use of stale material.
7. **Landing page:** Very high; it is a clear and visually legible product transformation.
8. **Marketing expression:** **“A styled portrait cannot stand in for a digital. Pholio knows the difference—and keeps your current set ready to send.”**

### 9. Intelligent, print-ready comp cards

**Status:** Shipped; some customization and writing/advisory paths are conditional.

1. **Technical behavior:** The comp-card pipeline produces 5.5 × 8.5-inch, two-sided cards with a dominant front, 3–5-image back, industry-ordered dual-unit stats, safe-crop logic, image forensics, parametric geometry, typography and palette derived within taste/print constraints, and fallback behavior that never intentionally fails a render. Talent can generate/view/download a card; save named editions/presets; lock hero/grid choices; freeze a design at save time; rename, apply, revise, rollback, import/export, and use print-ready PDFs. The PHOLIO wordmark can carry a portfolio link; optional print QR and short link exist. Evidence: `src/domains/pdf/routes/pdf.js`, `src/domains/pdf/composition/`, `tasks/comp-card-atelier-spec.md`, comp-card migrations, and the client comp-card surfaces.
2. **Problem solved:** designing a credible comp card requires print knowledge, disciplined image hierarchy, crop judgment, stat conventions, and repeated updates.
3. **Professional relevance:** produces current leave-behinds without a manual designer/export cycle for every update or market.
4. **Aspiring relevance:** supplies an industry artifact many new models do not know how to create well.
5. **Emotional benefit:** legitimacy—the user's work resolves into something recognizably professional and personal.
6. **Practical benefit:** cards are generated from the current book and stats, support multiple saved editions, and remain reproducible through frozen plans/revisions.
7. **Landing page:** Highest. This is the strongest cinematic object transformation on the page: photographs become a card in real time.
8. **Marketing expression:** **“Not a template with your name dropped in. A print-ready card composed from your images, proportions, stats, and visual character.”**

**Claims caution:** Do not imply every output is handcrafted by a human designer, guaranteed unique in a mathematical sense, accepted by every agency, or NFC-enabled by default. NFC is documented as a physical product workflow, not an included digital feature. Free/Studio+ watermark and customization differences must remain honest.

### 10. Public portfolio and shareable personal presence

**Status:** Shipped, but narrower than a true website builder.

1. **Technical behavior:** Every eligible public profile has a slug-based portfolio page driven by the selected hero, visible media, profile content, public-safe age band, social links, and an explicitly opted-in public stats block. Studio+ receives a chrome-less portfolio layout. Talent can change the slug, make the profile public/private, hide images, and control whether stats/creator metrics are public. Public views, downloads, link clicks, bio reads, scroll/image events, referrer/session data, and share-token opens feed analytics/Intel. Evidence: `src/routes/portfolio.js`, `views/portfolio/show.ejs`, `views/portfolio-pro.ejs`, `src/shared/lib/field-visibility.js`, and talent settings.
2. **Problem solved:** talent otherwise maintain disconnected website, social, PDF, and agency links that drift out of date.
3. **Professional relevance:** supplies a stable, trackable destination for outreach and a card-linked book.
4. **Aspiring relevance:** creates a credible presence without buying a domain or learning site building.
5. **Emotional benefit:** being publicly present as talent, not merely having a private folder of photos.
6. **Practical benefit:** one URL reflects approved current work and respects image/field visibility.
7. **Landing page:** High as a downstream outcome of the living book, not as “build a custom website.”
8. **Marketing expression:** **“One link for the work you are ready to show—fed by the same book behind your card and submissions.”**

**Claims caution:** Current implementation is a fixed public portfolio renderer, not a flexible website builder with pages, custom domains, themes, SEO controls, or no-code layout design. The present template also contains legacy visual patterns and TODO notes around public DTO granularity. Say **public portfolio** or **shareable portfolio**, not “build your own website.”

### 11. Opt-in agency discovery and semantic scouting

**Status:** Shipped for consenting adult talent; agency adoption and search outcomes are external conditions.

1. **Technical behavior:** Talent can opt into `is_discoverable`. The agency Scout surface searches the eligible adult pool through structured constraints and semantic similarity, exposes exact and near matches with truth annotations, logs discovery impressions/opens, and lets permitted agency users invite talent to apply. Profile and image data are audience-allowlisted; minors are excluded from generic discovery. Classification changes can reindex the profile. Evidence: talent settings; `src/domains/agency/services/discover*`; `src/domains/agency/routes/inbox.js`; `client/src/domains/agency/pages/DiscoverPage.jsx`; and `src/shared/lib/profile-visibility.js`.
2. **Problem solved:** a polished portfolio has little value if it never enters a real scouting workflow.
3. **Professional relevance:** provides passive discovery alongside direct outreach, with structured booker criteria rather than social popularity alone.
4. **Aspiring relevance:** creates a path to be seen without already having an agent or private industry network.
5. **Emotional benefit:** possibility—the profile can enter the room before the talent does.
6. **Practical benefit:** agencies can find opted-in talent by actual brief constraints and invite them into the canonical application flow.
7. **Landing page:** Very high, but must be presented as access to a workflow, not guaranteed exposure.
8. **Marketing expression:** **“Choose to enter Pholio Scout. Agencies can find your profile against the brief they are actually casting—and invite you to submit.”**

**Claims caution:** Do not say “get discovered,” “get matched to jobs,” “agencies are looking for you,” “guaranteed agency exposure,” or “verified agencies only” unless the exact access/verification policy is confirmed for launch. A discovery impression is not interest. Generic discovery excludes minors.

### 12. Agency directory, direct applications, and open calls

**Status:** Shipped; utility depends on active participating agencies.

1. **Technical behavior:** Talent can browse active agencies/open boards, start a direct application, resume a saved agency-specific draft, and withdraw eligible submissions. Agency-owned open-call links bring visitors through a branded arrival page, preserve the invitation across signup, mint a time-limited claim, and exempt the invited submission from the normal free monthly discovery allowance within anti-abuse limits. Free direct-discovery applications currently have a monthly quota; Studio+ is unlimited. Evidence: `ApplicationsView.jsx`, `OpenCallArrivalPage.jsx`, `src/domains/talent/routes/applications.js`, `open-call-claims.js`, and `application-quota.js`.
2. **Problem solved:** models repeatedly locate open-call instructions, create one-off packages, and lose track of what was sent where.
3. **Professional relevance:** centralizes representation outreach while preserving each agency's board context and package.
4. **Aspiring relevance:** provides a concrete, understandable path into agency review and reduces dependence on informal DMs.
5. **Emotional benefit:** agency outreach feels deliberate and legitimate rather than like sending materials into an inbox void.
6. **Practical benefit:** agency choices, invitations, quotas, duplicate-send checks, drafts, and submissions are managed in one workflow.
7. **Landing page:** High, after the package has visibly been built.
8. **Marketing expression:** **“When an agency opens its door, your package is already ready. Enter the call, review what they will receive, and send it to their team.”**

**Claims caution:** This is primarily an **agency representation submission** workflow, not a broad casting/job marketplace. “Open call” refers to agency invitation links in the implemented path. Do not imply endless agencies, automatic consideration, or that Studio+ buys access to otherwise unavailable agencies.

### 13. The seven-part submission dossier

**Status:** Shipped.

1. **Technical behavior:** The Apply experience is a seven-page dossier: agency/optional board, five-slot digitals review, stats, curated book, comp card, note, and final review/consent. It reads the target agency's open boards and requirements; distinguishes book work from digitals; lets the user choose/exclude frames; audits book range/repetition; uses the selected/frozen comp-card edition; snapshots the package; binds consent to package content; enforces adult/minor authority; validates image rights; uses idempotency keys and optimistic version/generation checks; autosaves; repairs stale references; expires/deletes/recovers drafts; and prevents duplicate submissions. Evidence: `ApplyExperience.jsx`, `src/domains/talent/routes/applications.js`, application draft schema/migrations, and `src/domains/talent/services/validate-submission-package.js`.
2. **Problem solved:** an application is not a link and a note; it is a coordinated package whose weak or missing element can undermine everything else.
3. **Professional relevance:** makes every outbound package reviewable and reproducible, with real safeguards against stale media and accidental double-send.
4. **Aspiring relevance:** gives step-by-step access to the exact sequence an experienced model or booker would check.
5. **Emotional benefit:** composure at the highest-anxiety moment—the talent can see exactly what enters the room.
6. **Practical benefit:** one workflow assembles, validates, autosaves, snapshots, and delivers the complete dossier.
7. **Landing page:** Highest. This is the natural second major transformation: the comp card becomes a complete addressed dossier.
8. **Marketing expression:** **“Before anything leaves your hands, see the exact dossier the agency will receive: digitals, stats, book, card, note, rights, and consent.”**

### 14. Industry-true submission lifecycle and durable drafts

**Status:** Shipped.

1. **Technical behavior:** Applications carry an activity timeline and states including under review, shortlisted, requested more, go-see requested, development offer, kept on file, accepted/represented, declined/passed, withdrawn, and archived. The talent ledger groups soft-yes outcomes as advancing rather than failed. Drafts retain agency identity, step, content version, generation, expiry, recovery window, repair warnings, and conflict behavior. Evidence: `client/src/domains/talent/utils/applicationStatus.js`, `ApplicationsView.jsx`, `src/domains/talent/routes/applications.js`, and `application-drafts.js` services/migrations.
2. **Problem solved:** email and spreadsheets flatten the process into “sent” or “rejected,” burying meaningful soft signals and unfinished work.
3. **Professional relevance:** makes multi-agency outreach and follow-up manageable without a separate personal CRM.
4. **Aspiring relevance:** teaches that “kept on file,” “requested more,” development, and a go-see have distinct meanings.
5. **Emotional benefit:** uncertainty becomes a visible process rather than a personal verdict.
6. **Practical benefit:** talent can resume where they left off, understand the next action, and preserve the complete status history.
7. **Landing page:** Very high as the tension-and-release transition after the dossier disappears into the agency side.
8. **Marketing expression:** **“Submitted is only the beginning. Follow review, shortlist, requests, go-sees, development, kept-on-file, and representation without reducing the journey to ‘pending.’”**

### 15. Agency messaging, requested materials, interviews, and go-see responses

**Status:** Shipped.

1. **Technical behavior:** Each non-withdrawn application has an agency conversation; the unified inbox orders threads by latest activity and counts agency-origin unread messages. Opening a thread marks inbound messages read; talent can send replies. Agencies can schedule/reschedule interviews; talent can accept or decline with an optional response; activity and notifications are recorded. Studio+ can polish a drafted message, while ordinary messaging is not paywalled. Evidence: `src/domains/talent/routes/messages.js`, application message endpoints, `interviews.js`, `ApplicationMessages.jsx`, `ApplicationInterviews.jsx`, and notification services.
2. **Problem solved:** next steps fragment across email, DMs, calendar messages, and application records.
3. **Professional relevance:** keeps agency context attached to the relevant submission and reduces missed responses.
4. **Aspiring relevance:** provides a clear, legitimate channel for the first high-stakes agency conversation.
5. **Emotional benefit:** responsiveness and control when an opportunity moves.
6. **Practical benefit:** one inbox, one activity record, explicit interview responses, and targeted notifications.
7. **Landing page:** High, but use as a brief acceleration beat rather than a messaging-feature scene.
8. **Marketing expression:** **“When a submission moves, the conversation stays with it—from ‘send more’ to a go-see time you can answer.”**

### 16. Representation, market placement, availability, and bookouts

**Status:** Shipped; largely self-managed talent records.

1. **Technical behavior:** Talent can record one active mother agency and multiple market/territory placement agencies, including internal or external agency, division, exclusivity, start date, and ended-history. They can set availability to available/limited/unavailable and add dated bookouts with notes; these fields feed agency discovery/roster reads and profile standing. Evidence: `RepresentationSection.jsx`, `src/domains/talent/routes/representations.js`, `services/representations.js`, `AvailabilitySection.jsx`, and `routes/availability.js`.
2. **Problem solved:** career state continues after signing; multi-market representation and unavailable dates are easy to miscommunicate.
3. **Professional relevance:** respects the real mother-agency/placement structure and keeps casting availability close to the profile agencies see.
4. **Aspiring relevance:** demonstrates that representation is not a single forever-status and introduces real industry structure.
5. **Emotional benefit:** continuity—Pholio remains useful after the first “yes.”
6. **Practical benefit:** one record for active/history agencies, markets, division, exclusivity, and unavailable dates.
7. **Landing page:** Medium-high as proof that the product is career infrastructure, not an application form.
8. **Marketing expression:** **“When representation changes, Pholio changes with it—mother agency, market placements, divisions, availability, and bookouts in one career record.”**

**Claims caution:** These records do not themselves execute contracts, guarantee that an agency recognizes the record, manage bookings/payments, or replace the agency's roster system. Do not market this as full talent accounting or contract management.

### 17. Talent Intel: signal quality, pipeline, material currency, and next moves

**Status:** Shipped, conditional on data volume and Studio+ tier for deeper windows/instruments.

1. **Technical behavior:** A composed Intel endpoint combines application reviews/advances, card pulls and portfolio-link opens, qualified public attention, raw reach, per-day signal layers, rhythm, market/source aggregates, pipeline flow, kept-on-file counts, stage clock, material currency, book range, image-level attention rank, search-demand nudges from agency queries, and an inspectable momentum composite. It excludes self views, avoids double-counting agency traffic as public reach, suppresses deltas/percentages at small sample sizes, withholds geo/viewer detail for minors, and uses calibrating states when data is insufficient. Share-token open/reopen and image event capture are implemented; discovery impressions feed aggregate demand. Evidence: `src/domains/talent/services/intel/compose.js`, `attention.js`, `pipeline.js`, `materials.js`, `searchability.js`, `capture.js`, `src/domains/talent/routes/intel.js`, and the `IntelPage` instrument components.
2. **Problem solved:** models typically cannot tell whether silence means unseen, seen but not advancing, weak materials, stale materials, poor targeting, or normal agency latency.
3. **Professional relevance:** helps prioritize material updates, follow-up, and market conversations from higher-value signals rather than vanity views.
4. **Aspiring relevance:** explains what genuine traction looks like and stops raw traffic from masquerading as career progress.
5. **Emotional benefit:** silence becomes more legible without turning agency browsing into surveillance.
6. **Practical benefit:** a ranked set of next moves ties observations to action—refresh digitals, confirm stats, strengthen range, answer a request, or keep a soft-yes file current.
7. **Landing page:** Highest. It is the story's intellectual payoff after the package enters the market.
8. **Marketing expression:** **“Views are not the signal. Pholio separates review, advance, card pull, qualified attention, and raw reach—then shows what your materials need next.”**

**Claims caution:** Never promise named agency view tracking. Named agencies appear only after explicit actions such as a status change, message, request, or submission. Market/source data can be absent. Image rankings need enough events. Cohort benchmarks remain calibrating until honest population thresholds are met. Search-demand nudges indicate aggregate brief activity, not guaranteed individual interest.

### 18. Context-aware writing assistance

**Status:** Shipped, Studio+ and provider-dependent.

1. **Technical behavior:** Studio+ can generate or refine a first/third-person bio at tight/standard length from real profile context; format/summarize/expand training; draft, sharpen, or shorten an agency-specific submission note using profile, agency, and board context; and polish an application message. Outputs pass bounded validation/rubrics and retries, with minimum-context rules. Evidence: the talent writer routes and services under `src/domains/talent/services/*-writer/` and writing controls in Profile/Apply/Messages.
2. **Problem solved:** talent either undersell themselves, sound generic, over-write, or copy the same unsuitable note into every agency application.
3. **Professional relevance:** reduces repetitive writing while keeping factual profile context and agency specificity.
4. **Aspiring relevance:** gives structure and tone guidance where industry confidence is lowest.
5. **Emotional benefit:** a clearer voice without having to perform startup-style self-promotion.
6. **Practical benefit:** fast first drafts and edits constrained by character/word limits and actual profile facts.
7. **Landing page:** Low-medium. It supports “quiet intelligence,” but leading with generative writing would make Pholio look like generic AI SaaS.
8. **Marketing expression:** **“When the words slow you down, Pholio drafts from your real work, training, target agency, and board—not from an empty prompt.”**

**Claims caution:** AI outputs can fail, require review, and depend on Groq availability. The current bio path names a model scheduled for provider deprecation in August 2026 and needs migration. Do not promise flawless copy, a unique personal voice, or autonomous sending.

### 19. Privacy, consent, moderation, and account control

**Status:** Shipped, with some operational provider/config dependencies.

1. **Technical behavior:** Public profile, agency discovery, AI image processing, contact exposure, image-level public/agency exclusions, public stats/creator metrics, and cookie/notification settings are controlled separately. Sensitive field audiences are deny-by-default and server-allowlisted. Minors require DOB and guardian consent for sensitive measurements/body imagery and public exposure, plus named-agency consent for submissions; unconsented minor uploads are forced private. Image uploads run content moderation and CSAM escalation/review paths. Users can block agencies, revoke sessions, export data, deactivate, and delete the account. Evidence: settings routes/UI; `field-visibility.js`; `profile-visibility.js`; `talent-age.js`; guardian consent services/routes; media moderation paths; account export/deletion helpers.
2. **Problem solved:** a career-facing profile contains sensitive body data, imagery, contact details, and minor information that cannot safely share one on/off switch.
3. **Professional relevance:** lets talent distribute work selectively and keep rights/sensitive data from leaking into the wrong audience.
4. **Aspiring relevance:** builds safer habits before first public exposure or agency submission.
5. **Emotional benefit:** agency access does not require surrendering control of the entire profile.
6. **Practical benefit:** server-enforced visibility and consent rules protect public, discovery, named-submission, and minor paths independently.
7. **Landing page:** Medium as trust substantiation near conversion; avoid turning it into fear-based marketing.
8. **Marketing expression:** **“You decide what is public, what agencies can see, and which images travel. Sensitive details do not become public by default.”**

**Claims caution:** Do not call the system perfectly safe, fully compliant in every jurisdiction, or infallibly moderated. Some settings such as a legacy `showContact` preference are not the same as a complete field-by-field public contact system. Legal claims require separate counsel review.

### 20. Social links and creator metrics

**Status:** Manual links shipped; verified/synced metrics are partial/conditional.

1. **Technical behavior:** Talent can attach Instagram, TikTok, X, YouTube, a website, and a video reel. A Phyllo connection path can create a provider user, fetch supported account details/engagement, store follower/engagement metrics, and disconnect while retaining the handle; the current provider helper reports sandbox/staging. A separate mock OAuth route generates simulated metrics and is explicitly not production-grade proof. Evidence: `SocialSection.jsx`, `src/domains/talent/routes/phyllo-routes.js`, `social-oauth.js`, and shared Phyllo helpers.
2. **Problem solved:** bookers often check social presence after the book, but handles and reel links are easy to omit or let drift.
3. **Professional relevance:** keeps relevant public proof adjacent to the portfolio and agency profile.
4. **Aspiring relevance:** provides one place to present the strongest, most current channels without making follower count the core identity.
5. **Emotional benefit:** the broader public presence feels coherent.
6. **Practical benefit:** links travel with the profile; configured providers can reduce manual metric entry.
7. **Landing page:** Low. Mention only as a small completeness detail.
8. **Marketing expression:** **“Keep the social profiles and reel an agency will check next attached to the same current profile.”**

**Claims caution:** Do not claim verified social metrics, automatic audience analytics, live synchronization, or broad platform support until the production Phyllo configuration is confirmed. Never market the mock OAuth metrics.

## Cross-surface value: what is greater than the individual features

The landing page should make these system relationships visible because they explain why Pholio is different:

### One image, many professional consequences

An image can be uploaded once, classified, dated, cropped, credited, rights-cleared, assigned to a digitals set or the book, hidden from a specific audience, used in a card, selected for a dossier, rendered publicly, and measured for attention. The value is not “image tagging”; it is the way one correct decision propagates through the career presence.

### One profile, audience-specific reads

The owner sees the full record. The public sees a safe portfolio and optional stats. Generic agency discovery receives a restricted adult profile. A named submission receives a deliberate snapshot. A represented roster or confirmed job may receive different permitted fields. This is real infrastructure behind the promise that Pholio prepares the right version of the talent for the right room.

### Preparation and feedback form a loop

Readiness improves the book and dossier. The dossier enters agency workflow. Explicit status changes and aggregate attention return through Intel. Intel points back to stale digitals, stats, weak range, or a request requiring action. This loop is the best “operating system” evidence:

**Prepare → present → submit → read the signal → update.**

## Features that should not lead the landing page

- Generic profile editing fields.
- Dashboard views, counts, and old analytics terminology.
- Social follower/engagement metrics.
- AI bio and message writing.
- Subscription customization controls.
- Apple Wallet or NFC concepts.
- Data export, sessions, and account settings.
- Fit scores, archetypes, facial symmetry, professional-potential scoring, inferred body measurements, or market-fit predictions.

The first group is supporting infrastructure. The second group risks collapsing a distinctive product into generic SaaS. The last group contains legacy or ethically weak concepts that should not become promises.

## Partial, hidden, and speculative capabilities

### Real but under-marketed

- **Per-image rights/release records and expiry blocking.** Strong professional trust feature.
- **Dated digitals sets rather than a single undifferentiated photo library.** Strong industry distinction.
- **Server-side package snapshots, consent fingerprints, idempotency, versioned drafts, and recovery.** Invisible reliability that makes the high-stakes send moment trustworthy.
- **Mother-agency plus multi-market placement model.** Evidence that Pholio understands real career structure.
- **Public/agency image exclusions plus audience-specific field visibility.** Strong control story.
- **Search-demand nudges from aggregate agency query logs.** Potentially powerful when enough data accrues; must be described carefully.
- **Card revision/freeze/rollback and linked wordmark.** Strong artifact continuity.
- **Kept-on-file treated as a soft yes rather than failure.** Small implementation choice with large industry credibility.

### Partial or conditional

- **Personal website:** a shareable portfolio exists; a custom website builder does not.
- **Social verification/metrics:** production provider readiness is not established; mock metrics exist and must never be marketed.
- **Intel markets, book ranking, demand, and benchmarks:** capture exists, but most users will initially see low-data/calibrating states; benchmark promises must wait for sufficient population.
- **Image classification:** real and useful, but provider-dependent and fallible; it is a suggestion/organization system, not aesthetic truth.
- **Content moderation:** implemented with fail-to-review behavior and provider adapter, but operational coverage depends on configuration/manual review.
- **Comp-card physical NFC:** documented workflow, not an included product capability.
- **Onboarding AI:** the visible scan is cinematic; substantive classification is not joined into that canonical step.

### Infrastructure or concepts not suitable as current talent claims

- **Casting briefs, match evaluations, preference learning, fairness audits, talent commitments, confirmed-job safety, permits, and job-related schemas** exist in recent migrations/services, but there is no complete talent-facing casting/job-management experience in the inspected SPA. Do not say Pholio manages castings or bookings end-to-end.
- **Commissions** exist in the broader product data model, but the audited talent experience does not expose a complete earnings/accounting workflow. Do not market invoicing, commissions, payment collection, or financial career management.
- **Saved briefs/alerts, broad multimodal reverse-image matching, and full cohort benchmarks** appear in planning documents or conditional architecture. Do not present them as shipped.
- **Legacy Scout facial symmetry, potential scores, visual height/weight estimates, skin tone, and “market fit” inference** are ethically and product-strategically incompatible with the recommended position. Some legacy code remains, but canonical onboarding has removed body-stat estimation. Exclude these claims entirely.
- **Automated representation or booking outcomes** do not exist. The product organizes access and follow-through; agencies decide.

## Trust, safety, and claims guardrails

### Safe claims

- Pholio separates digitals from styled book work.
- It can classify image roles and suggest corrections, subject to talent confirmation.
- It checks package readiness, material recency, rights, and required inputs before a send.
- It creates comp cards and dedicated digitals PDFs from the talent's real profile and images.
- Adult talent can opt into agency discovery.
- Talent can submit to participating agencies/open calls through a structured dossier.
- It tracks explicit application status changes, messages, and interview responses.
- It provides aggregate attention and pipeline intelligence with calibrating/low-data states.
- It supports mother/placement representation records, availability, and bookouts.
- It gives talent control over public/discovery exposure and applies guardian-consent protections for minors.

### Unsafe or misleading claims

- “AI tells you whether you can be a model.”
- “Pholio finds your perfect agency / job / market.”
- “Get discovered” used as an outcome promise.
- “See which agency viewed you.”
- “Know exactly who is interested.”
- “Verified measurements,” unless explicitly measured in person by an agency.
- “Verified social metrics” without production provider confirmation.
- “Build your own website.”
- “Every card is handcrafted” or “guaranteed unique.”
- “Apply to every agency” or “Studio+ unlocks more agencies.”
- “Manage bookings, contracts, payments, and commissions” as a talent feature.
- “AI automatically improves your career.”
- “All-in-one” or “everything you need”; both conceal what is genuinely distinctive.

### Outcome boundary

Pholio can improve preparation, presentation, consistency, discoverability eligibility, application quality, follow-through, and understanding of recorded signals. It cannot promise representation, a response, a callback, a go-see, bookings, income, or career success. Copy should sell **professional readiness and continuity**, not guaranteed outcomes.

## Recommended landing-page claim hierarchy

### Hero truth

> **Your work enters the room before you do.**  
> Pholio turns a living book into current digitals, a comp card, and the exact dossier an agency receives—then shows you how the submission moves.

This has aspiration, product specificity, and a natural motion thesis.

### Scene-level proof

1. **Scattered work becomes a Book.** Show the categories resolving, not a feature grid.
2. **The Book learns its own structure.** Show classification and recency as annotations, with talent confirmation.
3. **The Book becomes a card.** Make this the major object transformation.
4. **The card becomes a dossier.** Add digitals, stats, book selection, note, rights, consent, and agency address around the same persistent object.
5. **The dossier enters the agency workflow.** The object leaves; explicit review/advance/request states return.
6. **Attention becomes signal.** Separate review, advance, card pull, qualified attention, and reach; surface material currency and next moves.
7. **The system remains after the first yes.** Representation, markets, availability, and bookouts establish career longevity.

### Closing truth

> **Walk in with the work already speaking for you.**

The CTA should be direct—**Start your Pholio** or **Build your book**—not “Elevate your career.”

## Implementation evidence index

The most important code paths used to verify this audit are:

- Talent onboarding: `client/src/domains/onboarding/pages/CastingCallPage.jsx`, `CastingScout.jsx`, `src/domains/onboarding/routes/casting.js`, `src/domains/onboarding/services/state-machine.js`
- Profile and readiness: `client/src/domains/talent/pages/ProfilePage/`, `src/domains/talent/routes/profile.js`, `src/domains/talent/services/profile-strength.js`, `send-readiness.js`
- Media and classification: `client/src/domains/talent/components/MediaWorkspace.jsx`, `FrameEditor.jsx`, `src/domains/talent/routes/media.js`, `run-image-classification.js`, `src/domains/ai/classify-portfolio-image.js`
- Package intelligence: `src/domains/talent/services/profile-readiness-images.js`, `package-intelligence.js`, `validate-submission-package.js`
- Comp cards: `src/domains/pdf/routes/pdf.js`, `src/domains/pdf/composition/`, `tasks/comp-card-atelier-spec.md`
- Applications: `client/src/domains/talent/pages/ApplyPage/ApplyExperience.jsx`, `client/src/domains/talent/components/ApplicationsView.jsx`, `src/domains/talent/routes/applications.js`, application draft and open-call services
- Messaging/interviews: `src/domains/talent/routes/messages.js`, `interviews.js`, per-application message endpoints
- Public portfolio and exposure: `src/routes/portfolio.js`, `views/portfolio/show.ejs`, `src/shared/lib/field-visibility.js`, `profile-visibility.js`
- Discovery: `src/domains/agency/services/discover/`, `src/domains/agency/routes/inbox.js`, `client/src/domains/agency/pages/DiscoverPage.jsx`
- Intel: `src/domains/talent/services/intel/`, `src/domains/talent/routes/intel.js`, `client/src/domains/talent/pages/IntelPage/`
- Representation and availability: `src/domains/talent/services/representations.js`, representation/availability routes and profile UI
- Privacy/account controls: talent settings, guardian-consent services, audience DTO/visibility helpers, moderation and deletion/export helpers

## Final audit judgment

The product supports a premium talent proposition because it understands **the objects and transitions of the industry**, not merely the vocabulary: a digital is not a book shot; a book becomes a card; a card joins a dossier; a dossier has rights and consent; a submission can be reviewed, shortlisted, kept on file, or moved to a go-see; an image can attract attention without proving agency interest; representation can span a mother agency and market placements; materials expire.

The landing page should therefore avoid showing software as a dashboard. It should show one body of work gaining professional structure, entering the agency system, and returning as intelligible career signal. That transformation is real in the codebase and strong enough to carry the entire narrative.
