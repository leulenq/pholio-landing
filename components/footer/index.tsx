import type { ComponentType } from "react";

import type { FooterVariantId } from "@/lib/footer-variants";
import MarketingFooterLegacy from "@/components/MarketingFooterLegacy";

import VariantDirectory from "./VariantDirectory";
import type { FooterVariantProps } from "./kit";

/**
 * The legacy footer speaks `theme`, not `field`. Adapting it here keeps the
 * rollback a one-word URL change rather than a branch at every call site.
 */
function VariantCurrent({ field = "cream" }: FooterVariantProps) {
  return <MarketingFooterLegacy theme={field === "ink" ? "dark" : "light"} />;
}

export const FOOTER_COMPONENTS: Record<
  FooterVariantId,
  ComponentType<FooterVariantProps>
> = {
  directory: VariantDirectory,
  current: VariantCurrent,
};

export type { FooterVariantProps };
