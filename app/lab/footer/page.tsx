import type { Metadata } from "next";

import FooterLab from "@/components/footer/FooterLab";

export const metadata: Metadata = {
  title: "Footer directions — Pholio lab",
  robots: { index: false, follow: false },
};

/**
 * The critique surface. Every direction rendered in full, in order, each under
 * its own thesis and stated tradeoff, on either field — the same way the four
 * header directions were compared before The Index shipped.
 *
 * Retire this route once a direction is chosen, as `/lab/header` was.
 */
export default function FooterLabPage() {
  return <FooterLab />;
}
