"use client";

/**
 * B — THE SERVICE COUNTER
 *
 * Same routes as the Directory, filed under the errand instead of the site
 * structure. The headings are verbs — "Join as talent", "Scout & book", "Get
 * help", "Company" — because nobody arrives at a footer wanting to browse the
 * information architecture; they arrive wanting to do one thing, and a section
 * named for that thing is found faster than a section named after a department.
 *
 * The other move is the contact panel. Research on footers is consistent that
 * the single most-sought item down here is a way to reach a person, and that
 * users look either top-right or in the footer for it. So this direction stops
 * treating contact as one link in a column and gives it a real block: the
 * address, plus the two facts that answer "is this a real company" — legal
 * entity and jurisdiction.
 *
 * Tradeoff: intent labels age badly. They have to be re-argued every time the
 * product adds an audience, where "Company / Legal" never needs revisiting.
 * It is also the widest of the three, so it needs the full four columns to
 * breathe.
 */

import { ENTITY, INTENT_GROUPS, SUPPORT_MAILTO } from "@/lib/footer-links";

import {
  Baseline,
  FooterLink,
  FooterRoot,
  Group,
  GroupTitle,
  Note,
  footerTokens,
  Wordmark,
  type FooterVariantProps,
} from "./kit";

export default function VariantServiceCounter({
  field = "cream",
}: FooterVariantProps) {
  const tokens = footerTokens(field);

  return (
    <FooterRoot field={field}>
      <div className="pb-14 pt-16 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-12">
          {INTENT_GROUPS.map((group) => (
            <Group key={group.title} group={group} tokens={tokens} />
          ))}
        </div>

        {/* The counter itself. A hairline above it, so it reads as the desk at
            the end of the aisles rather than a fifth column. */}
        <div
          className="mt-14 flex flex-col gap-8 pt-10 md:flex-row md:items-end md:justify-between"
          style={{ borderTop: `1px solid ${tokens.line}` }}
        >
          <div>
            <GroupTitle tokens={tokens}>Talk to a person</GroupTitle>
            <div className="mt-3">
              <FooterLink
                href={SUPPORT_MAILTO}
                label={ENTITY.email}
                external
                tokens={tokens}
                size={15}
              />
            </div>
            {/* The entity name is already on the © line below; repeating it
                here would be the second of three mentions on one screen. */}
            <div className="mt-3">
              <Note tokens={tokens}>Incorporated in {ENTITY.jurisdiction}</Note>
            </div>
          </div>

          <Wordmark size={15} />
        </div>
      </div>

      {/* The entity line is already stated above the baseline here. */}
      <Baseline tokens={tokens} />
    </FooterRoot>
  );
}
