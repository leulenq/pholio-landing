"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import type { HeaderVariantId } from "@/lib/header-variants";
import type { HeaderVariantProps } from "./kit";

/* Client-only: every variant samples the DOM (field polarity, scroll) on mount. */
const opts = { ssr: false } as const;

const VariantMasthead = dynamic(() => import("./VariantMasthead"), opts);
const VariantLedger = dynamic(() => import("./VariantLedger"), opts);
const VariantIndex = dynamic(() => import("./VariantIndex"), opts);
const VariantPlate = dynamic(() => import("./VariantPlate"), opts);
const CurrentHeader = dynamic(() => import("@/components/Header"), opts);

/** The existing header only speaks light/dark; adapt it to the shared prop shape. */
function LegacyHeader({ theme = "ink" }: HeaderVariantProps) {
  return <CurrentHeader theme={theme === "cream" ? "light" : "dark"} />;
}

export const HEADER_COMPONENTS: Record<
  HeaderVariantId,
  ComponentType<HeaderVariantProps>
> = {
  masthead: VariantMasthead,
  ledger: VariantLedger,
  index: VariantIndex,
  plate: VariantPlate,
  current: LegacyHeader,
};

export type { HeaderVariantProps };
