"use client";

/**
 * Variant selection for the footer, mirroring `HeaderWrapper` exactly: a
 * direction can be pinned with `?footer=<id>` and is then remembered for the
 * tab, so it can be walked through the whole site while it is being reviewed.
 * Nothing is persisted for ordinary visitors — with no override,
 * `DEFAULT_FOOTER_VARIANT` renders. `?footer=reset` clears it.
 *
 * Field
 * -----
 * The footer is **ink on every page**, regardless of what the page above it is
 * set in. The header is the variable element — it samples whatever section it
 * crosses and flips mid-scroll — so the footer is the constant one, and the
 * publication ends on the same velvet its own `body` is already set in.
 *
 * This replaced per-page paper after the cream footer was read as "too pale":
 * at footer type sizes, muted ink on cream washes out, while cream on velvet
 * holds its contrast and lets the gold actually register. `?footerfield=cream`
 * still previews the alternative, and the `theme` prop is kept so the eighteen
 * existing call sites need no edit.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  DEFAULT_FOOTER_VARIANT,
  isFooterVariantId,
  type FooterVariantId,
} from "@/lib/footer-variants";
// Keep the directory entrypoint explicit: `components/Footer.tsx` also exists,
// and case-insensitive resolution can otherwise select the wrong module.
import { FOOTER_COMPONENTS } from "@/components/footer/index";
import type { Field } from "@/components/header/kit";

const STORAGE_KEY = "pholio:footer-variant";
const FIELD_KEY = "pholio:footer-field";

function useOverride<T extends string>(
  param: string,
  storageKey: string,
  isValid: (value: string | null) => value is T,
  fallback: T,
): T {
  const [value, setValue] = useState<T>(fallback);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromQuery = new URLSearchParams(window.location.search).get(param);

    if (fromQuery === "reset") {
      window.sessionStorage.removeItem(storageKey);
      setValue(fallback);
      return;
    }
    if (isValid(fromQuery)) {
      window.sessionStorage.setItem(storageKey, fromQuery);
      setValue(fromQuery);
      return;
    }

    const stored = window.sessionStorage.getItem(storageKey);
    if (isValid(stored)) setValue(stored);
  }, [param, storageKey, isValid, fallback, pathname]);

  return value;
}

const isField = (value: string | null): value is Field =>
  value === "ink" || value === "cream";

export interface FooterWrapperProps {
  /** The page's paper. Kept as `theme` so existing call sites are unchanged. */
  theme?: "light" | "dark";
}

export default function FooterWrapper({ theme }: FooterWrapperProps) {
  const variant = useOverride<FooterVariantId>(
    "footer",
    STORAGE_KEY,
    isFooterVariantId,
    DEFAULT_FOOTER_VARIANT,
  );
  const fieldOverride = useOverride<Field | "default">(
    "footerfield",
    FIELD_KEY,
    (value): value is Field | "default" => isField(value) || value === "default",
    "default",
  );

  /* `theme` is still accepted so no call site needs editing, but it no longer
     picks the paper — the footer is the publication's constant field. */
  void theme;

  const Footer = FOOTER_COMPONENTS[variant];
  return <Footer field={fieldOverride === "default" ? "ink" : fieldOverride} />;
}
