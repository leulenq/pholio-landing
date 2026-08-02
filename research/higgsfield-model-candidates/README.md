# Pholio — Higgsfield model reference candidates

This library is for selecting a consistent on-screen model before producing any Higgsfield image-to-video tests. It contains **23 locally downloaded, free Unsplash images** grouped into four same-person reference sets.

Open `index.html` for the visual comparison gallery. See `SOURCES.md` for exact photo pages and attribution.

## What a useful reference set needs

A strong candidate is not just an attractive portrait. For Pholio's continuous landing-page system, the set should provide:

- a clear, unobstructed face at useful resolution;
- repeatable facial identity across multiple photographs;
- frontal, three-quarter, and profile information;
- upper-body and full-body proportions;
- at least one natural standing or walking pose;
- enough pose and expression variation to avoid overfitting to a single frame;
- restrained styling that can be translated into Pholio's black, cream, white, and gold visual world;
- adult status that can be reasonably established from the contributor context;
- a plausible route to contacting the photographer/model for explicit likeness approval.

## Recommendation order

### 1. Ola Szkolda — strongest overall

**Why she works:** The account identifies Ola as a fashion model and contains extensive self-modelled fashion work. This set has the best combination of clean identity, close facial detail, full-body proportions, walking movement, controlled poses, and editorial styling.

**Best for:** A high-fashion, composed Pholio film with the same model moving from hero portrait to intelligence scan to comp-card poses.

**Coverage:** 7 images — close-up, studio close-up, front, three-quarter, leaning, full body, walking.

**Risk:** Different shoots have different hair and lighting. Use one hero image as the identity anchor and the remaining images as structural references, not equal identity inputs.

### 2. Tamara Bellis — strongest motion coverage

**Why she works:** The account identifies Tamara as a fashion influencer and provides a broad, coherent body of self-modelled imagery. The set includes walking, standing, seated, upper-body, and close portrait references.

**Best for:** A warmer, sunlit editorial direction with graceful walking and natural pose transitions.

**Coverage:** 7 images — close-up, upper body, seated, standing, elevated full body, and two walking references.

**Risk:** The beach/travel context is less aligned with Pholio's current studio-luxury world. Higgsfield prompts would need to suppress resort styling and preserve only identity and movement cues.

### 3. Vitaly Gariev studio model — strongest single-shoot continuity

**Why she works:** All five frames clearly belong to one studio session, so hair, wardrobe, body proportions, and lighting remain highly consistent. The horizontal source frames also give useful space for web composition.

**Best for:** Early motion tests where identity consistency matters more than final art direction.

**Coverage:** 5 images — multiple full-body and three-quarter studio poses.

**Risk:** Most frames include crew or studio equipment and there is no clean close facial portrait. Good movement reference, weaker identity pack.

### 4. Valerie Elash brunette series — strongest intimate portrait mood

**Why she works:** This is a visually consistent four-image editorial series with strong facial visibility, a distinctive short haircut, varied expression, and monochrome frames that suit Pholio's restrained brand language.

**Best for:** Close, intelligent, observational sequences and the “PHOLIO sees you” moment.

**Coverage:** 4 images — close portrait, seated portrait, wider seated composition, three-quarter pose.

**Risk:** No standing or full-body source. This candidate would require more invention from Higgsfield for walking and comp-card body poses.

## Free-license status and likeness warning

Every included source page was selected from standard Unsplash content, not Unsplash+. The files are therefore available under the free Unsplash copyright license as of July 13, 2026.

That copyright license does **not** automatically grant permission to use a recognizable person's likeness in a commercial generated-video campaign. Unsplash explicitly warns that privacy and publicity rights can require additional approval. Before a selected identity is used in production, contact the contributor and obtain written confirmation that:

1. the depicted model is an adult;
2. the contributor has authority to grant the requested use;
3. the model approves image-to-video generation and character-consistent synthetic variants;
4. the generated clips may be used commercially on Pholio's landing page and related campaign materials.

Until that approval exists, treat this library as **internal selection and visual-development material only**.

## Suggested next step

Choose one primary candidate and one backup. Then select a single identity-anchor image, define wardrobe/hair invariants, and run a small Higgsfield consistency test before generating the full scroll sequence.
