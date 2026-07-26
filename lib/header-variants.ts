/**
 * Header directions under evaluation.
 *
 * Each entry is a genuinely different *structure* and *behaviour*, not a restyle:
 * they differ in where the wordmark sits, what the furniture is (rule vs grid vs
 * nothing), what the CTA is allowed to look like, and how the header responds to
 * scroll. Preview any of them sitewide with `?header=<id>` (persists for the
 * session) or compare them side by side at /lab/header.
 */
export const HEADER_VARIANTS = [
  {
    id: "masthead",
    index: "01",
    name: "The Masthead",
    thesis:
      "A magazine masthead that condenses into a running head. Full-bleed, no container — the header is the top edge of the page grid, not an object floating over it.",
    structure: "Asymmetric · wordmark left, index right, one hairline",
    behaviour: "Condenses on scroll (never hides). The frame is permanent furniture.",
    cta: "Text link with a gold rule — no pill, no fill.",
    tradeoff:
      "The most conventional of the four. Its correctness is also its risk: it could read as 'well-executed editorial site' rather than 'unmistakably Pholio'.",
  },
  {
    id: "ledger",
    index: "02",
    name: "The Ledger",
    thesis:
      "The two-sided market made structural. Vertical rules divide the bar into cells — a call sheet, a registry — with each audience entered as a numbered door rather than a nav word.",
    structure: "Ruled grid · numbered cells, top and bottom rules",
    behaviour: "Constant. Never hides, never resizes. Stability is the message.",
    cta: "A full-height gold cell — a filing tab, not a button.",
    tradeoff:
      "Densest of the four and the most opinionated. Adding a fifth destination costs a cell; it does not scale to a large nav.",
  },
  {
    id: "index",
    index: "03",
    name: "The Index",
    thesis:
      "Maximum restraint at rest, maximum brand on demand. The hamburger you liked, promoted to the whole system: at rest only a wordmark and an INDEX trigger; open, a full-height editorial index.",
    structure: "No bar · two corner marks, full-screen drawer",
    behaviour: "Nothing moves on scroll. The page is never framed until asked.",
    cta: "An entry inside the index, weighted by typography.",
    tradeoff:
      "Buys the cinematic scenes total silence, and pays for it in desktop nav discoverability — one click before anyone sees the destinations.",
  },
  {
    id: "plate",
    index: "04",
    name: "The Plate",
    thesis:
      "The comp card's own clerical margin applied to page furniture: a mono running record above, a symmetric centred masthead below, closed by the gold sweep.",
    structure: "Two tier · clerical strip over a centred wordmark",
    behaviour: "The clerical strip collapses on scroll; the masthead stays centred.",
    cta: "Small caps with a gold rule, held in the corner.",
    tradeoff:
      "Two tiers cost vertical space at the top of every page, and centred symmetry is less forgiving when nav grows.",
  },
  {
    id: "current",
    index: "00",
    name: "Current header",
    thesis: "The existing floating glass pill, kept for A/B comparison only.",
    structure: "Rounded pill · blurred translucent shell",
    behaviour: "Hides on scroll down, returns on scroll up.",
    cta: "Filled gold pill.",
    tradeoff: "Reads as SaaS chrome; disconnected from the page beneath it.",
  },
] as const;

export type HeaderVariantId = (typeof HEADER_VARIANTS)[number]["id"];

/**
 * What the live site renders when no variant is selected. Left on the existing
 * header so nothing ships before you've picked — change this one line to
 * promote a direction sitewide.
 */
export const DEFAULT_HEADER_VARIANT: HeaderVariantId = "current";

export function isHeaderVariantId(value: string | null | undefined): value is HeaderVariantId {
  return !!value && HEADER_VARIANTS.some((variant) => variant.id === value);
}
