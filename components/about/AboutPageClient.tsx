"use client";

/**
 * /about-us — the composition.
 *
 * The page is a cream publication with two ink bands: the Manifesto in the
 * middle and the close at the end, where it runs into the ink footer. The
 * previous page inverted that — an ink page with cream interruptions, opening
 * on a cinematic photographic hero. This order is deliberate:
 *
 *   Masthead   who is speaking, and the record that proves it
 *   Origin     why the company exists, described concretely
 *   Ledger     what it is, what it is not, what it costs   ← the trust engine
 *   Manifesto  what we hold to                             ← ink
 *   Standing   what exists today, what is next
 *   Collective who builds it
 *   Close      the positioning line and the way out        ← ink
 *
 * Argument before belief before people. A manifesto placed before the ledger is
 * a stranger telling you their values; placed after it, it is a company that
 * has already shown its terms.
 */

import MarketingFooter from "@/components/MarketingFooter";
import ThemeColor from "@/components/ThemeColor";

import AboutClose from "@/components/about/AboutClose";
import AboutCollective from "@/components/about/AboutCollective";
import AboutLedger from "@/components/about/AboutLedger";
import AboutManifesto from "@/components/about/AboutManifesto";
import AboutMasthead from "@/components/about/AboutMasthead";
import AboutOrigin from "@/components/about/AboutOrigin";
import AboutStanding from "@/components/about/AboutStanding";
import { CREAM } from "@/components/about/kit";

export default function AboutPageClient() {
  return (
    <main className="min-h-mobile-screen" style={{ background: CREAM }}>
      <ThemeColor color={CREAM} />
      <AboutMasthead />
      <AboutOrigin />
      <AboutLedger />
      <AboutManifesto />
      <AboutStanding />
      <AboutCollective />
      <AboutClose />
      <MarketingFooter />
    </main>
  );
}
