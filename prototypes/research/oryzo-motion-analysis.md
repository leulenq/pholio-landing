# Oryzo motion and continuity analysis

**Inspection date:** 2026-07-12  
**Source inspected:** [oryzo.ai](https://oryzo.ai/)  
**Method:** fresh end-to-end inspection in the in-app browser, with viewport screenshots and DOM measurements at scroll checkpoints across the entire page. The public JavaScript and CSS bundles were then inspected to verify implementation patterns. No previous workspace research was used.

## Executive conclusion

Oryzo does not feel continuous because it has better reveal animations. It feels continuous because the site is directed as one fixed visual world with a persistent protagonist.

The cork coaster is not an illustration placed inside sections. It is the subject of the film. Across roughly 52,700 desktop scroll pixels, it remains identifiable while the camera, light, material, context, scale, supporting imagery, and typography change around it. A conventional page asks, “What should enter in the next section?” Oryzo asks, “What can the object become next, and what new claim can that transformation prove?”

The page’s deeper system is:

1. **One protagonist:** the same product is repeatedly re-read rather than repeatedly reintroduced.
2. **One camera world:** a fixed full-screen WebGL stage sits beneath fixed or sticky DOM compositions.
3. **Continuous scroll state:** wheel and touch input feed a custom smoothed scroll model; per-frame scene code maps scroll ranges into camera, object, light, masks, and typography.
4. **Pre-lapped transitions:** the next visual premise appears before the previous one has fully resolved.
5. **Alternating transport and proof:** long transformation passages are followed by quieter, legible proof frames.
6. **Compositional inheritance:** the outgoing scene leaves behind a circle, crop, texture, tabletop, edge, or direction that the incoming scene adopts.
7. **Narrative escalation:** absurd product claim becomes technical proof, social proof, product family, then a final reveal that the product is fictional and the real product is Lusion’s ability to create desire.

For Pholio, the transferable lesson is not “use more WebGL.” It is to choose one career object that can carry every transition. The strongest candidate is a single photograph that becomes a classified frame, a living Book, a comp card, a submission dossier, a trace inside agency workflow, an intelligence signal, and finally new evidence that edits the original Book.

## What was directly observed

### Page scale and scene architecture

At the inspected desktop viewport, the document measured approximately 52,709px high. The DOM exposes twelve major ranges, but most are far taller than a viewport and function as animation timelines rather than content blocks:

| DOM range | Approximate start | Approximate height | Function in the film |
|---|---:|---:|---|
| Hero | 0 | 853 | Establishes tabletop world and product |
| AI | 853 | 6,824 | Product close-up, rotation, hand reveal, chromatic energy |
| Wearable | 7,677 | 11,302 | Reticle, package, wearable contexts, editorial gallery |
| Features | 18,979 | 8,957 | Tabletop tests: elevation, temperature, curve |
| Encryption | 27,936 | 3,412 | Product opens/closes as an interface object |
| Grip | 31,348 | 3,412 | Macro material proof and tactile tension |
| Sustainability | 34,760 | 4,647 | Cork becomes bark, then cream editorial data |
| Testimonies | 39,407 | 1,755 | Dense social proof and satire |
| Social content | 41,162 | 7,660 | Horizontal editorial conveyor of use cases |
| Product | 48,822 | 2,498 | Product family and selection |
| Open weight | 51,320 | 754 | Technical paper parody |
| Footer | 52,073 | 636 | Final reversal and studio CTA |

This matters: the section tags are implementation ranges, not perceptual pages. Several ranges consume four to thirteen viewport-heights so a single composition can evolve slowly without surrendering the frame.

### Persistent UI anchors

The following remain fixed for most of the experience:

- the Oryzo wordmark at the top-left;
- a minimal chapter navigation at the top-right;
- a custom vertical progress rail at the right edge;
- a bottom “scroll to continue” cue;
- the main WebGL canvas;
- selected full-screen section inner containers.

They create a stable screen coordinate system while the content world moves. The viewer never loses the feeling of inhabiting the same film frame.

## Scene-by-scene motion reading

### 1. Tabletop establishes the visual laws

**Enters:** an overhead workbench, cutting mat, tools, oversized wordmark, factual copy, inset studio card, coaster.  
**Persists:** the coaster, tabletop geometry, fixed site chrome.  
**Exits:** copy and peripheral props lose emphasis before the background disappears.

The opening composition initially behaves like an editorial still. The first scroll does not immediately replace it. Instead, the camera pushes toward the coaster while the surrounding tabletop darkens and softens. The oversized wordmark contracts into the persistent navigation mark. Peripheral copy becomes partially occluded and then irrelevant. The viewer’s attention is narrowed before the spatial world changes.

The handoff is therefore not “hero fades out.” It is “the camera chooses the coaster.” The circular object grows until it owns the frame, allowing the workbench to fall away behind it.

**Reusable principle:** begin with a rich world, then progressively reduce it until only the narrative carrier remains.

### 2. The coaster becomes a product protagonist

**Enters:** black field, split claim text, controlled product lighting.  
**Persists:** the same coaster in the same visual center.  
**Transforms:** top view rotates to an oblique edge view; scale and specular light change continuously.  
**Pre-lap:** blurred “Powered by AI” typography appears before the prior claim is fully gone.

The object remains visible while the text moves from a left/right explanatory arrangement to an oversized product claim. Rotation is not decorative; it turns a flat disk into a dimensional engineered object. The camera repeatedly alternates between evidence of surface and evidence of thickness.

At the transition to “Powered by AI,” the coaster scales down while a hand rises into the lower frame. The hand does not appear after the object leaves. It arrives to receive it. That overlap gives the next scene physical causality.

**Reusable principle:** introduce the next scene as a force acting on the current object.

### 3. AI energy creates an acceleration passage

**Enters:** hand, large AI claim, secondary copy, interactive hover instruction, chromatic border light.  
**Persists:** coaster centered above the hand.  
**Transforms:** environment lighting sweeps through multiple hues; border energy intensifies and then recedes; headline loses weight before the hand leaves.

The pacing accelerates through light rather than through more objects. Multiple layers move at different rates:

- background darkness and vignette change slowly;
- chromatic edge light pulses more quickly;
- the coaster and hand remain comparatively stable;
- typography holds long enough to read, then dims while the visual energy continues.

The hover prompt is a local interaction within an already coherent scene. It does not interrupt the scroll narrative or become the main event.

**Reusable principle:** acceleration can come from changing light, focus, and edge energy while the core composition stays calm.

### 4. Hand to measurement reticle

**Enters:** drafting frame, dotted square, circular registration marks, precise ticks.  
**Persists:** coaster circle.  
**Exits:** hand and AI copy.  
**Transforms:** the held product reduces into a measured object.

The visual system changes from sensual product film to engineered diagram, but the circular silhouette bridges the modes. The object does not vanish and reappear inside a UI card; the reticle grows around it. This is a strong example of compositional inheritance.

**Reusable principle:** when changing visual languages, preserve shape, center, or motion vector so the viewer reads transformation rather than replacement.

### 5. Portable becomes wearable

**Enters:** package material, giant cropped typography, portrait photography, lateral gallery frames, magazine cover.  
**Persists:** the coaster and the dotted editorial frame.  
**Transforms:** product becomes wrapped object, chest-worn device, fashion accessory, eye cover, pocket detail, then cultural/editorial subject.

The headline “it’s wearable” is not delivered as a static title. Its scale exceeds the viewport and it is masked by the central product frame, so type becomes spatial scenery. The gallery does not read as cards. A large central window remains dominant while side images preview where the film is headed and where it has been.

The rhythm varies inside the long range:

- short transformation beats between product contexts;
- longer holds on portrait images;
- a deliberately strange transition blur before the magazine reveal;
- a resolved editorial still that gives the eye time to read.

The magazine cover then dissolves back into the original workbench environment. This is not a hard chapter break: an image inside the gallery becomes the full-screen world of the next act.

**Reusable principle:** make a contained image become the next environment. Expansion is stronger than replacement.

### 6. Feature tests share one laboratory

**Enters:** translucent left-side proof panel, icons, technical annotations, equations, environmental treatments.  
**Persists:** the workbench, cup, coaster, navigation, lab framing.  
**Transforms:** the same table scene passes through elevation, thermal stability, and geometry demonstrations.

Each feature is not a new card or screenshot. The environment itself becomes the proof:

- the cup appears physically elevated by the coaster;
- color grading and shader treatment convert the scene into a thermal image;
- the camera returns overhead to demonstrate circular design and drafting geometry.

The left proof panel remains a stable reading surface while the right world changes more aggressively. This is a transport/verify pairing inside the same frame: the product demonstration moves; the copy stays anchored.

**Reusable principle:** let product behavior change the environment while the explanatory surface remains spatially stable.

### 7. Geometry becomes encryption

**Enters:** vector control points, logo geometry, top-down table, small message interface.  
**Persists:** circle construction, coaster, workbench.  
**Transforms:** the drafted circle expands into the Oryzo wordmark; the scene returns to the table; the coaster folds upright, then opens into a tray.

This sequence uses visual rhyme. Circular Bézier handles become logo letterforms, then resolve into the physical coaster. The product’s physical hinge becomes the mechanism for the “encryption” joke. Software UI is subordinate to the object transformation rather than displayed as a screenshot.

**Reusable principle:** if software must appear, embed it into the story object and let the object explain the software.

### 8. Macro edge becomes a material world

**Enters:** extreme grayscale macro, microscope-like inset, coefficient annotation.  
**Persists:** cork texture and edge.  
**Transforms:** camera moves so close that the product stops reading as an object and becomes terrain; grayscale texture shifts into bark-like organic imagery.

This is the site’s deepest camera move. Scale creates a complete scene change without a new protagonist. The viewer moves from product to material science through a continuous push. The subsequent bark texture inherits the irregular cellular surface of the cork.

The pace slows here. There is less text and more surface. This pause resets attention after the denser feature act.

**Reusable principle:** use a macro push as a chapter transition only when the material detail has narrative meaning.

### 9. Bark releases into cream editorial space

**Enters:** pale tonal field, enormous “sustainability” typography, small explanatory copy, three data panels.  
**Persists:** organic shadow and material origin.  
**Transforms:** dark tactile texture washes into a high-key paper-like atmosphere.

The tonal release is important. Oryzo spends much of the experience in brown and black; the cream scene creates emotional exhale. Giant low-contrast type is first used atmospherically, then yields to smaller concrete data. The panels arrive as one editorial system rather than a staggered SaaS grid.

**Reusable principle:** after a high-tension dark passage, change luminance and density to create release, not merely variety.

### 10. Proof thickens and then becomes a conveyor

**Enters:** stacked testimony rows, media thumbnails, ratings, humorous quotations.  
**Persists:** warm brown world and coaster imagery.  
**Transforms:** vertical evidence becomes a horizontally moving wall of editorial panels.

This is the least filmic part of Oryzo, but the transition out is instructive. The page does not end the testimonial list and start a gallery below it. The gallery panels begin to occupy the same viewport, then the dominant movement turns horizontal while the user continues scrolling vertically. Large crops and partial offscreen panels imply a wider world.

**Reusable principle:** a change in motion axis can re-energize a long narrative, but it should inherit imagery and palette from the prior scene.

### 11. Editorial conveyor returns the product to center

**Enters:** camping use, color variants, durability, customization, legacy objects.  
**Persists:** horizontal motion, product circle, warm color system.  
**Transforms:** multiple contextual panels collapse into a centered product selector.

The conveyor accelerates through use cases and humor, then releases into stillness. “Choose your own Oryzo” recenters the original protagonist against a dark field. After long lateral movement, the centered product feels authoritative and calm.

**Reusable principle:** after a fast montage, return to the original composition to create recognition and closure.

### 12. Technical climax and narrative reversal

**Enters:** model comparison, open-weight paper parody, citation, code block, then coffee beans and studio statement.  
**Persists:** product naming and technical visual language.  
**Transforms:** the fictional product pitch exposes itself as a studio capability demonstration.

The final act first intensifies technical credibility, then withdraws it. The viewer learns that the product does not exist. This creates the strongest tension/release event on the page: all prior craft is recontextualized as proof of Lusion’s ability to make an unnecessary object desirable.

The footer is not a generic link graveyard. Coffee beans become another physical layer behind the closing message, maintaining the material-film world through the CTA.

**Reusable principle:** the ending should change the meaning of what came before, not merely summarize it.

## Motion grammar extracted from Oryzo

### 1. State is continuous; scenes are named ranges

The page uses a custom scroll manager rather than relying on independent intersection events. Input is clamped, smoothed, and synchronized to native scroll position. Scene update code runs on every animation frame and reads normalized DOM ranges. Values are mapped with interpolation functions into object transforms, camera offsets, light, opacity, masks, and text positions.

This produces three qualities:

- scroll direction can reverse the film coherently;
- motion does not restart when an element enters the viewport;
- multiple properties can share one exact progress value.

### 2. Acceleration is physically filtered

The public bundle includes second-order dynamic systems for pointer and motion response, a custom scroll pane with friction, velocity, and target positions, and per-frame interpolation. This is why large wheel deltas do not create abrupt jumps. The page has inertia, but it remains tightly directed rather than floaty.

The lesson is not to add a generic smooth-scroll library and accept its defaults. Scroll feel, scene duration, and property curves need to be tuned together.

### 3. The canvas and DOM have separate jobs

Direct implementation evidence shows:

- a fixed main canvas running a modified Three.js r178 stack;
- custom shaders and post-processing for blur, bloom, vignette, tint, chromatic edge energy, screen-paint distortion, and temporal anti-aliasing;
- Rive canvases for selected illustrative/data moments;
- GSAP SplitText present for typographic segmentation;
- fixed and sticky DOM layers for legible copy and interaction;
- mobile-specific asset and layout branches below 768px.

The canvas carries object continuity, camera, material, and light. DOM carries high-fidelity editorial typography, semantic content, and controls. Neither is asked to do everything.

### 4. Transitions use inheritance, not cover-up

Oryzo repeatedly hands a property from one scene to the next:

| Outgoing property | Incoming use |
|---|---|
| coaster circle | reticle, logo geometry, selector |
| workbench grid | technical measurement and feature lab |
| central framed image | full-screen workbench environment |
| cork edge | macro terrain and bark texture |
| warm brown lighting | testimonial and editorial conveyor |
| horizontal gallery movement | product montage |
| product-centered composition | closing product selector |

Masking and scale are successful because they preserve identity while changing context.

### 5. Typography changes role over time

Type alternates among four roles:

1. **Title:** oversized, stable, immediately legible.
2. **Scenery:** cropped beyond the viewport or masked behind the object.
3. **Annotation:** small technical copy aligned to diagrams.
4. **Payoff:** centered, high-contrast statement after motion slows.

It rarely behaves as a repeated “fade-up paragraph.” It participates in depth and hierarchy.

### 6. Pacing is constructed through density

Oryzo varies more than duration. It varies the number of simultaneous channels:

- **Stillness:** opening frame, magazine cover, centered product selector.
- **Slow tension:** macro cork, hand holding product, sustainability wash.
- **Acceleration:** chromatic AI energy, wearable montage, feature state changes, horizontal editorial conveyor.
- **Release:** cream sustainability field, returned center composition, final reversal.

Constant movement would flatten this. The quiet frames are what make the fast passages feel fast.

## What Pholio should borrow

### Transfer directly

- One persistent protagonist with a clear semantic identity.
- A global scroll clock and reversibility.
- Scene overlap of roughly 15–25% so the next premise begins early.
- Camera scale as a narrative device: photograph, frame detail, artifact, dossier, market view.
- Alternation between transport passages and readable proof holds.
- Three spatial layers with different motion amplitudes.
- Contained image expanding into the next world.
- Tonal release from black to cream at the emotional midpoint.
- Typography switching among title, scenery, annotation, and payoff.
- Separate desktop and mobile camera/layout decisions.

### Adapt carefully

- Heavy WebGL should be reserved for the persistent image/artifact and a small number of meaningful shaders. Fashion imagery needs texture and humanity; too much synthetic rendering would make Pholio feel like hardware or crypto.
- Technical annotations should express classification, currentness, rights, package readiness, and signal hierarchy. They should never suggest facial scoring, beauty scoring, or hiring prediction.
- Humor can humanize the page, but Oryzo’s satire should not be copied. Talent career anxiety requires calm authority.
- Horizontal conveyors are useful for a brief acceleration montage, not for presenting the core product value.

### Do not transfer

- Fictional claims or a final bait-and-switch.
- Hardware-lab parody, scientific equations without product truth, or gratuitous “AI glow.”
- A long testimonial wall.
- Hover-dependent narrative information.
- Constant brown product-rendering aesthetics.
- A desktop film merely squeezed into a narrow viewport.

## A Pholio motion grammar derived from the study

### Persistent protagonist

Use one hero photograph as the carrier. It should never simply disappear between the main acts.

Its continuous states:

1. loose photograph;
2. identified frame with human-confirmable classification;
3. frame inside a living Book;
4. dominant image on a composed comp card;
5. selected frame inside an addressed submission dossier;
6. reduced trace traveling through a dark agency workflow;
7. signal point inside a hierarchy of review, advance, card pull, qualified attention, and reach;
8. returned evidence that changes the ordering or currentness of the Book.

### Layer model

- **Background:** color field, photographic world, market/agency space; slowest movement and deepest scale.
- **Middle ground:** persistent photograph/book/card/dossier; primary camera subject.
- **Foreground:** crop marks, category labels, rights/currentness notes, type masks, status language; fastest but sparsest layer.

### Transition rules

1. The next scene must be visible or exert force before the current scene completes.
2. Every transition must preserve at least one of: object, crop, shape, axis, color, light, or semantic label.
3. No full-screen opacity reset between core acts.
4. No core act may begin with all of its elements at rest and offscreen.
5. A major scale change must reveal a new truth, not merely impress.
6. Information is read during a hold; transformation happens before or after the hold.
7. The gold underline can behave as a tracking line or crop baseline, but it must not become a decorative progress gimmick.

### Curve families

- **Camera transport:** long cubic or quintic in/out, with a low-velocity center hold where necessary.
- **Artifact snap/alignment:** critically damped spring with minimal overshoot.
- **Mask handoff:** asymmetric curve; faster entry, slower settle.
- **Text scenery:** linear-to-smoothstep movement tied closely to camera progress.
- **Signal return:** quick acceleration followed by extended deceleration so the result feels discovered, not announced.

### Pacing target

Use a normalized master timeline rather than equal-height sections:

| Scroll band | Narrative action | Pacing |
|---|---|---|
| 0–10% | Recognize one image | near-still |
| 7–24% | Image gains structure; Book forms | slow build |
| 19–39% | Book composes card and public presence | controlled acceleration |
| 34–55% | Card gathers into dossier | precise hold, then transport |
| 49–66% | Dossier leaves; agency silence | acceleration into stillness |
| 61–84% | Signal hierarchy returns | layered reveal, measured pace |
| 79–100% | Evidence edits the Book; CTA closes loop | release and recognition |

The overlaps are intentional. They eliminate the perceptual sentence, “Now the next section starts.”

## Mobile-specific implications

The inspected bundle contains explicit mobile branches, mobile asset loading, layout-specific camera zoom and offsets, reduced control geometries, mobile navigation, and alternate scene calculations below 768px. This confirms that the mobile experience is not only CSS stacking.

Pholio should adopt the principle, not Oryzo’s exact mobile behavior:

- keep the photograph/artifact centered more consistently;
- use depth through scale and masks rather than wide lateral travel;
- shorten gallery and conveyor passages;
- move annotations into top/bottom safe zones around the artifact;
- replace hover evidence with scroll or tap states;
- reduce shader count and texture resolution while preserving the core object transformation;
- use fewer simultaneous foreground labels;
- keep the same narrative loop, but retime it rather than deleting acts.

## Final judgment

Oryzo’s premium quality comes from directed continuity. Its individual techniques are familiar, but they are governed by a rigorous cinematic system: one subject, one spatial world, one continuous scroll state, inherited compositions, controlled density, and a narrative ending that reinterprets the beginning.

For Pholio, the equivalent film is not a tour of product screens. It is the life of one photograph as it becomes professional infrastructure and returns with evidence. If that transformation remains visible and causally connected, the page can communicate product depth without ever feeling like a sequence of SaaS sections.
