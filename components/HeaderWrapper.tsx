"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DEFAULT_HEADER_VARIANT,
  HEADER_VARIANTS,
  isHeaderVariantId,
  type HeaderVariantId,
} from "@/lib/header-variants";
import { HEADER_COMPONENTS } from "@/components/header";

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
 * a variant can be walked through the whole site. Nothing is persisted for
 * ordinary visitors: with no override, DEFAULT_HEADER_VARIANT renders.
 */
function useHeaderVariant(): [HeaderVariantId, boolean] {
  const [variant, setVariant] = useState<HeaderVariantId>(DEFAULT_HEADER_VARIANT);
  const [overridden, setOverridden] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromQuery = new URLSearchParams(window.location.search).get("header");

    if (fromQuery === "reset") {
      window.sessionStorage.removeItem(STORAGE_KEY);
      setVariant(DEFAULT_HEADER_VARIANT);
      setOverridden(false);
      return;
    }
    if (isHeaderVariantId(fromQuery)) {
      window.sessionStorage.setItem(STORAGE_KEY, fromQuery);
      setVariant(fromQuery);
      setOverridden(true);
      return;
    }

    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (isHeaderVariantId(stored)) {
      setVariant(stored);
      setOverridden(true);
    }
  }, [pathname]);

  return [variant, overridden];
}

export default function HeaderWrapper() {
  const pathname = usePathname();
  const [variant, overridden] = useHeaderVariant();
  const Header = HEADER_COMPONENTS[variant];

  return (
    <>
      <Header theme={fieldForRoute(pathname)} />
      {overridden && <VariantBadge variant={variant} />}
    </>
  );
}

/** Only ever visible while a direction is being previewed. */
function VariantBadge({ variant }: { variant: HeaderVariantId }) {
  const meta = HEADER_VARIANTS.find((v) => v.id === variant);
  if (!meta) return null;

  return (
    <Link
      href="/lab/header"
      className="fixed bottom-5 left-5 z-[80] flex items-center gap-2.5 focus:outline-none"
      style={{
        background: "#050505",
        border: "1px solid rgba(201,165,90,0.32)",
        padding: "7px 13px",
        textDecoration: "none",
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "rgba(250,247,242,0.62)",
      }}
    >
      <span style={{ color: "#C9A55A" }}>{meta.index}</span>
      <span>{meta.name}</span>
    </Link>
  );
}
