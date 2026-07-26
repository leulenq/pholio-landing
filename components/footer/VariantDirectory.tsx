"use client";

/**
 * A — THE DIRECTORY
 *
 * The conventional premium footer, executed properly. Identity on the left,
 * four labelled sections across the right, a baseline underneath. It is the
 * pattern every well-built site converges on, and the reason to consider it is
 * that convention is a feature down here: a visitor looking for the careers
 * page or the privacy policy already knows where to look, and the footer's job
 * is to be found, not to be original.
 *
 * The four sections are chosen, not inherited. "Trust & safety" is pulled out
 * of the legal pile and given its own heading because those four documents —
 * community guidelines, the submission programme, the AI notice, the copyright
 * policy — are precisely what a scam-wary applicant scrolls down here to check.
 * Leaving them buried under "Legal" answers the question technically and hides
 * from it in practice.
 *
 * Tradeoff: it is the least distinctive of the three. It will never be the
 * thing anyone remembers about the site — which is arguably correct for a
 * footer, and arguably a wasted opportunity.
 */

import { DIRECTORY_GROUPS } from "@/lib/footer-links";

import {
  Baseline,
  FooterRoot,
  Group,
  IdentityBlock,
  TOKENS,
  type FooterVariantProps,
} from "./kit";

export default function VariantDirectory({ field = "cream" }: FooterVariantProps) {
  const tokens = TOKENS[field];

  return (
    <FooterRoot field={field}>
      <div className="grid grid-cols-1 gap-12 pb-14 pt-16 lg:grid-cols-[minmax(200px,1fr)_2.4fr] lg:gap-16 lg:pt-20">
        <IdentityBlock tokens={tokens} />

        {/* Two per row on a phone so each group keeps its heading and the
            block stays scannable instead of becoming one long stack. */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 lg:grid-cols-4">
          {DIRECTORY_GROUPS.map((group) => (
            <Group key={group.title} group={group} tokens={tokens} />
          ))}
        </div>
      </div>

      <Baseline tokens={tokens} />
    </FooterRoot>
  );
}
