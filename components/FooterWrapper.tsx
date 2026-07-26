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
 * The footer takes the page's field from its `theme` prop, which is what every
 * existing call site already passes. There is a live argument for making it
 * *always* ink — the header is the variable element (it samples whatever
 * section it crosses), so a fixed terminal field would make the footer the
 * constant one, and every page in the publication would end on the same paper.
 * That is a content decision, not a mechanical one, so it is left to the
 * critique: `?footerfield=ink` previews it site-wide without editing a page.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  DEFAULT_FOOTER_VARIANT,
  isFooterVariantId,
  type FooterVariantId,
} from "@/lib/footer-variants";
import { FOOTER_COMPONENTS } from "@/components/footer";
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

export default function FooterWrapper({ theme = "light" }: FooterWrapperProps) {
  const variant = useOverride<FooterVariantId>(
    "footer",
    STORAGE_KEY,
    isFooterVariantId,
    DEFAULT_FOOTER_VARIANT,
  );
  const routeField: Field = theme === "dark" ? "ink" : "cream";
  const fieldOverride = useOverride<Field | "route">(
    "footerfield",
    FIELD_KEY,
    (value): value is Field | "route" => isField(value) || value === "route",
    "route",
  );

  const Footer = FOOTER_COMPONENTS[variant];
  return <Footer field={fieldOverride === "route" ? routeField : fieldOverride} />;
}
