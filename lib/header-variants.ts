/**
 * Header variants.
 *
 * "The Index" (see components/header/VariantIndex.tsx) is the shipped header:
 * no bar at rest, a wordmark and an INDEX trigger, a full-screen editorial
 * index on open. It was chosen from four directions built and compared live
 * (masthead, ledger, index, plate) — the other three were retired once index
 * shipped; their rationale lives in git history and docs/header-directions.md.
 *
 * `current` is kept only as an emergency rollback to the pre-redesign glass
 * pill (`components/Header.tsx`, untouched) via `?header=current`.
 */
export const HEADER_VARIANTS = [
  {
    id: "index",
    index: "01",
    name: "The Index",
    thesis:
      "Maximum restraint at rest, maximum brand on demand. The hamburger you liked, promoted to the whole system: at rest only a wordmark and an INDEX trigger; open, a full-height editorial index.",
    structure: "No bar · two corner marks, full-screen drawer",
    behaviour: "Nothing moves on scroll. The page is never framed until asked.",
    cta: "An entry inside the index, weighted by a permanent gold rule — never scale.",
    tradeoff:
      "Buys the cinematic scenes total silence, and pays for it in desktop nav discoverability — one click before anyone sees the destinations.",
  },
  {
    id: "current",
    index: "00",
    name: "Current header (rollback only)",
    thesis: "The pre-redesign floating glass pill, kept only as an emergency rollback.",
    structure: "Rounded pill · blurred translucent shell",
    behaviour: "Hides on scroll down, returns on scroll up.",
    cta: "Filled gold pill.",
    tradeoff: "Reads as SaaS chrome; disconnected from the page beneath it.",
  },
] as const;

export type HeaderVariantId = (typeof HEADER_VARIANTS)[number]["id"];

/** What the live site renders when no `?header=` override is set. */
export const DEFAULT_HEADER_VARIANT: HeaderVariantId = "index";

export function isHeaderVariantId(value: string | null | undefined): value is HeaderVariantId {
  return !!value && HEADER_VARIANTS.some((variant) => variant.id === value);
}
