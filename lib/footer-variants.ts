/**
 * Footer directions.
 *
 * All three are footers first: small type, labelled semantic sections, the
 * page's own paper, a legal baseline, and no display type anywhere except the
 * wordmark. They differ in *how the links are organised* — by site structure,
 * by errand, or by audience — not in how loudly they announce themselves.
 *
 * An earlier set of four directions (colophon, ledger, open index, comp-card
 * reverse) was built and rejected: each took the header's display grammar and
 * stretched it downward, producing statement panels that competed with the
 * hero instead of closing the page. See docs/footer-directions.md.
 *
 * `current` is the pre-redesign card footer (`components/MarketingFooterLegacy.tsx`,
 * untouched), kept as an emergency rollback exactly as `components/Header.tsx`
 * is for the header.
 */
export const FOOTER_VARIANTS = [
  {
    id: "directory",
    index: "A",
    name: "The Directory",
    thesis:
      "The conventional premium footer, executed properly: identity left, four labelled sections right, baseline underneath. Convention is a feature down here — a footer's job is to be found, not to be original.",
    organised: "By site structure — Platform, Company, Trust & safety, Legal.",
    move: "Pulls the four trust documents out of the legal pile and gives them their own heading, because that is what a scam-wary applicant scrolls down to check.",
    tradeoff:
      "The least distinctive of the three. Nobody will remember it — arguably correct for a footer, arguably a wasted opportunity.",
  },
  {
    id: "counter",
    index: "B",
    name: "The Service Counter",
    thesis:
      "The same routes filed under the errand rather than the org chart. Nobody reaches a footer wanting to browse an information architecture; they arrive wanting to do one thing.",
    organised: "By intent — Join as talent, Scout & book, Get help, Company.",
    move: "Gives contact a real block instead of one link in a column: the address a human answers, plus legal entity and jurisdiction.",
    tradeoff:
      "Intent labels age badly and must be re-argued whenever the product adds an audience. Needs the full four columns to breathe.",
  },
  {
    id: "doors",
    index: "C",
    name: "The Two Doors",
    thesis:
      "Pholio's one structural fact is two audiences with opposite questions. The header sorts them on arrival; this sorts them again at the point where someone has read the page and is deciding what to do next.",
    organised: "By audience — For talent, For agencies, plus a shared row.",
    move: "The two halves are strict peers, divided by a hairline and nothing else: no larger type, no fill, no border. Only the words differ.",
    tradeoff:
      "Duplicates the header's sorting job, and forces every future route to be assigned an audience even when it belongs to both.",
  },
  {
    id: "current",
    index: "00",
    name: "Current footer (rollback only)",
    thesis:
      "The pre-redesign rounded card with three link columns, kept only as an emergency rollback.",
    organised: "Three columns — Platform, Company, and a seven-item Legal dump.",
    move: "None. A card on a tray with radial gradient washes.",
    tradeoff:
      "Off-palette slate greys, a 700-weight wordmark contradicting the app mark, and 'For Agencies' pointing at a login screen.",
  },
] as const;

export type FooterVariantId = (typeof FOOTER_VARIANTS)[number]["id"];

/** What the site renders when no `?footer=` override is set. */
export const DEFAULT_FOOTER_VARIANT: FooterVariantId = "directory";

export function isFooterVariantId(
  value: string | null | undefined,
): value is FooterVariantId {
  return !!value && FOOTER_VARIANTS.some((variant) => variant.id === value);
}
