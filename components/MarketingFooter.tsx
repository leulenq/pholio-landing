"use client";

/**
 * The sitewide footer mount.
 *
 * This used to be the footer itself; it is now a one-line shim onto
 * `FooterWrapper`, which selects a direction (see `lib/footer-variants.ts`).
 * Keeping the name and the `theme` prop means the eighteen pages that already
 * mount `<MarketingFooter />` need no edit to pick up the redesign, and the
 * old implementation stays reachable at `components/MarketingFooterLegacy.tsx`
 * via `?footer=current`.
 */

import FooterWrapper from "@/components/FooterWrapper";

export interface MarketingFooterProps {
  theme?: "light" | "dark";
}

export default function MarketingFooter({ theme = "light" }: MarketingFooterProps) {
  return <FooterWrapper theme={theme} />;
}
