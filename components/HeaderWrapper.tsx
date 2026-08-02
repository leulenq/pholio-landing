"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  DEFAULT_HEADER_VARIANT,
  isHeaderVariantId,
  type HeaderVariantId,
} from "@/lib/header-variants";
// Use the directory entrypoint explicitly so it cannot collide with the
// top-level `Header.tsx` on case-insensitive filesystems.
import { HEADER_COMPONENTS } from "@/components/header/index";

const STORAGE_KEY = "pholio:header-variant";

/**
 * Ink field: near-black cinematic page shells (#050505, #0A0A0F, the home stack).
 * Cream field: warm editorial pages (#FAF8F5, #FAF7F2).
 *
 * This is only the *starting* polarity — the redesigned headers sample the paper
 * beneath the bar while scrolling and flip themselves when a page changes field
 * mid-scroll (the current header can't, which is why it goes dark over cream
 * sections on the home page).
 */
function fieldForRoute(pathname: string | null): "ink" | "cream" {
  const isInk =
    pathname === "/" ||
    !!pathname?.startsWith("/talent") ||
    !!pathname?.startsWith("/agency") ||
    !!pathname?.startsWith("/about-us") ||
    !!pathname?.startsWith("/contact") ||
    !!pathname?.startsWith("/careers") ||
    !!pathname?.startsWith("/studio/plus") ||
    !!pathname?.startsWith("/studio-plus");
  return isInk ? "ink" : "cream";
}

/**
 * Reads a header direction from `?header=<id>` and remembers it for the tab, so
 * a direction can be walked through the whole site while it is being reviewed.
 * Nothing is persisted for ordinary visitors: with no override,
 * DEFAULT_HEADER_VARIANT renders. `?header=reset` clears it.
 *
 * There is deliberately no on-page indicator of which variant is applied —
 * anything pinned to the viewport competes with the header. `?header=current`
 * is kept only as an emergency rollback to the pre-redesign glass pill.
 */
function useHeaderVariant(): HeaderVariantId {
  const [variant, setVariant] = useState<HeaderVariantId>(DEFAULT_HEADER_VARIANT);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromQuery = new URLSearchParams(window.location.search).get("header");

    if (fromQuery === "reset") {
      window.sessionStorage.removeItem(STORAGE_KEY);
      setVariant(DEFAULT_HEADER_VARIANT);
      return;
    }
    if (isHeaderVariantId(fromQuery)) {
      window.sessionStorage.setItem(STORAGE_KEY, fromQuery);
      setVariant(fromQuery);
      return;
    }

    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (isHeaderVariantId(stored)) {
      setVariant(stored);
    }
  }, [pathname]);

  return variant;
}

export default function HeaderWrapper() {
  const pathname = usePathname();
  const Header = HEADER_COMPONENTS[useHeaderVariant()];

  return <Header theme={fieldForRoute(pathname)} />;
}
