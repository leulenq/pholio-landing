"use client";

/**
 * C — THE TWO DOORS
 *
 * Pholio has exactly one structural fact: two audiences with opposite
 * questions arriving at the same URL. The header solves it at the top of the
 * page; this direction is the only one of the three that solves it again at the
 * bottom, where a visitor who has just read a page and is deciding what to do
 * next is arguably more sortable than one who has only just landed.
 *
 * Structurally it is a footer, not a hero: two labelled columns of small links
 * divided by a hairline, a shared row of company and policy links beneath them,
 * and the baseline. The two halves are peers — neither is given a larger type
 * size, a fill, or a border. The only difference between them is the words.
 *
 * Tradeoff: it duplicates the header's sorting job, and it forces every future
 * route to be assigned an audience even when it belongs to both — which is why
 * the shared row exists, and why that row will be under constant pressure to
 * grow.
 */

import {
  AUDIENCE_AGENCY,
  AUDIENCE_TALENT,
  ENTITY,
  SHARED_LINKS,
  SUPPORT_MAILTO,
} from "@/lib/footer-links";

import {
  Baseline,
  FooterLink,
  FooterRoot,
  Group,
  GroupTitle,
  footerTokens,
  Wordmark,
  type FooterVariantProps,
} from "./kit";

export default function VariantTwoDoors({ field = "ink" }: FooterVariantProps) {
  const tokens = footerTokens(field);

  return (
    <FooterRoot field={field}>
      <div className="pb-14 pt-16 lg:pt-20">
        {/* The dividing hairline runs vertically once the three sit side by
            side and horizontally while they are stacked, so a rule never ends
            up orphaned against the page margin. */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_minmax(190px,0.8fr)]"
          style={{ borderColor: tokens.line }}
        >
          {/* Door one. */}
          <div className="pb-10 lg:pb-0 lg:pr-12">
            <Group group={AUDIENCE_TALENT} tokens={tokens} />
          </div>

          {/* Door two. Same size, same weight — the hairline is the only thing
              separating them, and it is the only thing that should be. */}
          <div
            className="border-t pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pr-12 lg:pt-0"
            style={{ borderColor: tokens.line }}
          >
            <Group group={AUDIENCE_AGENCY} tokens={tokens} />
          </div>

          {/* Identity, kept out of the doors so neither appears to own it. */}
          <div
            className="mt-10 border-t pt-10 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
            style={{ borderColor: tokens.line }}
          >
            <Wordmark size={15} />
            <div className="mt-5">
              <GroupTitle tokens={tokens}>Enquiries</GroupTitle>
              <div className="mt-3">
                <FooterLink
                  href={SUPPORT_MAILTO}
                  label={ENTITY.email}
                  external
                  tokens={tokens}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Everything that belongs to both audiences. */}
        <div
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 pt-8"
          style={{ borderTop: `1px solid ${tokens.line}` }}
        >
          {/* Not "Pholio" — set in mono caps beside the wordmark it reads as a
              second, broken lockup rather than a section label. */}
          <GroupTitle tokens={tokens}>Company</GroupTitle>
          {SHARED_LINKS.map((link) => (
            <FooterLink key={link.href} {...link} tokens={tokens} />
          ))}
        </div>
      </div>

      <Baseline tokens={tokens} />
    </FooterRoot>
  );
}
