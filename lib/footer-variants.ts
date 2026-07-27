/**
 * Footer variants.
 *
 * "The Directory" (see `components/footer/VariantDirectory.tsx`) is the shipped
 * footer: a brand anchor against three labelled columns, on ink, opening on the
 * gold sweep. It was chosen from three directions built and compared live
 * (directory, service counter, two doors) and then refined over two further
 * passes — the alternatives and the `/lab/footer` comparison page were retired
 * once it shipped, exactly as `/lab/header` was. Their rationale lives in git
 * history and `docs/footer-directions.md`.
 *
 * `current` is kept only as an emergency rollback to the pre-redesign card
 * footer (`components/MarketingFooterLegacy.tsx`, untouched) via
 * `?footer=current`.
 */
export const FOOTER_VARIANTS = [
  {
    id: "directory",
    index: "01",
    name: "The Directory",
    thesis:
      "A footer is a service counter — the people who scroll here are verifying or hunting one specific thing, not browsing. Identity anchored left, three curated columns right, the legal documents on the baseline once.",
    structure: "Brand bay · three uneven columns with hairline spines · baseline",
    field: "Ink on every page — the constant terminal field beneath a header that varies.",
    tradeoff:
      "The most conventional of the three directions considered, which is arguably the correct ambition for a footer.",
  },
  {
    id: "current",
    index: "00",
    name: "Current footer (rollback only)",
    thesis:
      "The pre-redesign rounded card with three link columns, kept only as an emergency rollback.",
    structure: "Rounded card on a padded tray · three-column link grid · icon row",
    field: "Samples the previous section's background.",
    tradeoff:
      "Off-palette slate greys, a 700-weight wordmark contradicting the app mark, and a seven-item legal column.",
  },
] as const;

export type FooterVariantId = (typeof FOOTER_VARIANTS)[number]["id"];

/** What the live site renders when no `?footer=` override is set. */
export const DEFAULT_FOOTER_VARIANT: FooterVariantId = "directory";

export function isFooterVariantId(
  value: string | null | undefined,
): value is FooterVariantId {
  return !!value && FOOTER_VARIANTS.some((variant) => variant.id === value);
}
