"use client";

/**
 * Shared machinery for the footer directions.
 *
 * WHAT A FOOTER IS
 * ----------------
 * Not a second header, not a closing statement, not a sitemap. Footer research
 * is blunt about this: the people who reach the bottom of a page are not
 * browsing, they are on an errand — find the contact address, check the privacy
 * policy, see whether this company is real, find the careers page. A footer is
 * a service counter. It should be the quietest, densest, most useful block on
 * the page.
 *
 * That produces hard rules, and every direction here obeys them:
 *
 *  - **Small type only.** Links sit at 13px, headings at 10px, the baseline at
 *    10px. There is no display type in a footer except the wordmark. Nothing
 *    here is allowed to compete with a hero.
 *  - **The page's own paper**, closed by a single hairline. Not a dramatic
 *    slab in a colour the page was not already using.
 *  - **Air lives between the items, not above the block.** Padding is ~72px
 *    top, not 200px. The footer is a plinth, not a chapter.
 *  - **Labelled semantic groups.** Undivided link piles are the single most
 *    common footer failure; headings matter more on a phone, not less.
 *  - **Legal is a first-class citizen**, because it is one of the two things
 *    people actually come down here for.
 *  - **No prose.** A tagline in a footer is filler. The wordmark, the links and
 *    the entity line say everything a footer is entitled to say.
 *
 * Coherence with the header comes from the shared palette, the shared ease and
 * the shared mono micro-label voice — not from reusing its composition. The
 * wordmark is imported because it is the app's mark and must never be
 * reinvented; the header's display grammar deliberately is not.
 */

import { useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";

import {
  EASE,
  MONO,
  SANS,
  TOKENS,
  Wordmark,
  type Field,
  type FieldTokens,
} from "@/components/header/kit";
import {
  BASELINE_LEGAL,
  ENTITY,
  FOOTER_SOCIAL,
  SUPPORT_MAILTO,
  type FooterGroup as FooterGroupModel,
  type FooterLink as FooterLinkModel,
} from "@/lib/footer-links";
import { SocialGlyph, type SocialIcon } from "./icons";

export { EASE, MONO, SANS, TOKENS, Wordmark };
export type { Field, FieldTokens, FooterGroupModel, FooterLinkModel };

export interface FooterVariantProps {
  /** The paper the page is already on. The footer does not introduce a new one. */
  field?: Field;
}

const T = `0.28s cubic-bezier(${EASE.join(",")})`;

/* ══════════════════════════════════════════════════════════════════════
   SHELL
   ══════════════════════════════════════════════════════════════════════ */

/**
 * The footer band. One hairline separates it from the page — that line is the
 * entire transition. No gradient, no colour change, no bracket: the content
 * above simply ends and the service counter begins.
 */
export function FooterRoot({
  field = "cream",
  children,
}: {
  field?: Field;
  children: ReactNode;
}) {
  const tokens = TOKENS[field];
  return (
    <footer
      data-site-footer
      className="w-full"
      style={{
        background: tokens.surface,
        borderTop: `1px solid ${tokens.rule}`,
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">{children}</div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TYPE
   ══════════════════════════════════════════════════════════════════════ */

/** A group heading. Mono caps — the site's clerical label voice, at label size. */
export function GroupTitle({
  children,
  tokens,
}: {
  children: ReactNode;
  tokens: FieldTokens;
}) {
  return (
    <h2
      style={{
        fontFamily: MONO,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: tokens.textMuted,
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}

/**
 * A footer link. Sentence case at 13px — this is body-register clerical type,
 * not the header's tracked uppercase nav voice. Hover resolves from muted to
 * full strength and picks up the gold; nothing moves, nothing scales.
 */
export function FooterLink({
  href,
  label,
  external = false,
  tokens,
  size = 13.5,
}: FooterLinkModel & { tokens: FieldTokens; size?: number }) {
  const [hover, setHover] = useState(false);

  const style: CSSProperties = {
    position: "relative",
    fontFamily: SANS,
    fontSize: size,
    lineHeight: 1.5,
    letterSpacing: "0.005em",
    color: hover ? tokens.gold : tokens.textMuted,
    textDecoration: "none",
    transition: `color ${T}`,
    display: "inline-block",
    paddingBottom: 3,
  };

  const props = {
    style,
    className: "focus:outline-none focus-visible:underline",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  /* A rule that draws in from the left rather than a static underline — the
     footer's only piece of motion, and what stops the link columns reading as
     an inert list. */
  const content = (
    <>
      {label}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 1,
          width: hover ? "100%" : 0,
          background: tokens.gold,
          transition: `width 0.42s cubic-bezier(${EASE.join(",")})`,
        }}
      />
    </>
  );

  return external ? (
    <a href={href} rel="noopener noreferrer" {...props}>
      {content}
    </a>
  ) : (
    <Link href={href} {...props}>
      {content}
    </Link>
  );
}

/**
 * A labelled section of links — the unit the whole footer is built from.
 * Stays a real group on a phone (two per row) rather than collapsing into an
 * undifferentiated stack.
 */
export function Group({
  group,
  tokens,
}: {
  group: FooterGroupModel;
  tokens: FieldTokens;
}) {
  return (
    <nav aria-label={group.title}>
      <GroupTitle tokens={tokens}>{group.title}</GroupTitle>
      <ul className="mt-5 flex list-none flex-col gap-3 p-0">
        {group.links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <FooterLink {...link} tokens={tokens} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   BASELINE
   ══════════════════════════════════════════════════════════════════════ */

/**
 * The last line of every page: who the company legally is, the three documents
 * people come looking for, and the social accounts. Mono at 10px — smaller
 * than everything above it, which is what makes the block read as a base
 * rather than another section.
 */
export function Baseline({ tokens }: { tokens: FieldTokens }) {
  return (
    <div
      className="flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between"
      style={{ borderTop: `1px solid ${tokens.rule}` }}
    >
      {/* The legal documents, and the only place any of them is listed. The
          social accounts have moved up to sit under the wordmark, and the
          corporate line is gone — both were making this strip a dumping
          ground rather than a closing edge. */}
      <Cluster links={BASELINE_LEGAL} tokens={tokens} />
      <BackToTop tokens={tokens} />
    </div>
  );
}

/**
 * The last piece of utility on the page. On a site whose pages are long
 * scroll-driven scenes, returning to the top is a real errand — and it gives
 * the baseline a right-hand anchor now that the copyright line is gone.
 */
function BackToTop({ tokens }: { tokens: FieldTokens }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group flex items-center gap-2.5 self-start focus:outline-none focus-visible:underline md:self-auto"
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontFamily: MONO,
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: hover ? tokens.gold : tokens.textFaint,
        transition: `color ${T}`,
      }}
    >
      <span>Back to top</span>
      <span
        aria-hidden
        style={{
          display: "inline-block",
          transform: hover ? "translateY(-2px)" : "none",
          transition: `transform 0.4s cubic-bezier(${EASE.join(",")})`,
        }}
      >
        &#8593;
      </span>
    </button>
  );
}

/** Baseline-scale text. */
export function Note({
  children,
  tokens,
}: {
  children: ReactNode;
  tokens: FieldTokens;
}) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: 10,
        letterSpacing: "0.06em",
        color: tokens.textFaint,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

/** Baseline-scale link. */
export function MonoLink({
  href,
  label,
  external = false,
  tokens,
}: FooterLinkModel & { tokens: FieldTokens }) {
  const [hover, setHover] = useState(false);
  const style: CSSProperties = {
    fontFamily: MONO,
    fontSize: 10,
    letterSpacing: "0.06em",
    color: hover ? tokens.gold : tokens.textFaint,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: `color ${T}`,
  };
  const props = {
    style,
    className: "focus:outline-none focus-visible:underline",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {label}
    </a>
  ) : (
    <Link href={href} {...props}>
      {label}
    </Link>
  );
}

function Cluster({
  links,
  tokens,
}: {
  links: FooterLinkModel[];
  tokens: FieldTokens;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {links.map((link, i) => (
        <span key={link.href} className="flex items-center gap-x-4">
          {i > 0 && <Dot tokens={tokens} />}
          <MonoLink {...link} tokens={tokens} />
        </span>
      ))}
    </div>
  );
}

function Dot({ tokens }: { tokens: FieldTokens }) {
  return (
    <span
      aria-hidden
      style={{ fontFamily: MONO, fontSize: 9, color: tokens.textFaint, opacity: 0.6 }}
    >
      ·
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   IDENTITY
   ══════════════════════════════════════════════════════════════════════ */

/**
 * The brand anchor.
 *
 * The old identity block set the wordmark at the header's 15px and left the
 * bay to trail off, which is what made the footer read as unweighted. Here the
 * mark is set larger and carries a short gold rule beneath it — the one
 * deliberate accent in the block — with the address and the social marks
 * hanging off the same left edge. Still no tagline: the anchor is the mark and
 * a way to reach a person, nothing else.
 */
export function BrandAnchor({ tokens }: { tokens: FieldTokens }) {
  return (
    <div className="flex flex-col items-start">
      <Link
        href="/"
        aria-label="Pholio — home"
        style={{ textDecoration: "none" }}
        className="focus:outline-none"
      >
        <Wordmark size={23} />
      </Link>

      {/* A single short rule. Gold appears exactly twice in the footer: here,
          and on hover. */}
      <span
        aria-hidden
        style={{
          display: "block",
          width: 38,
          height: 1,
          marginTop: 20,
          background: tokens.gold,
          opacity: 0.75,
        }}
      />

      <div className="mt-8">
        <GroupTitle tokens={tokens}>Enquiries</GroupTitle>
        <div className="mt-3.5">
          <FooterLink
            href={SUPPORT_MAILTO}
            label={ENTITY.email}
            external
            tokens={tokens}
            size={15}
          />
        </div>
      </div>

      <SocialRow tokens={tokens} className="mt-9" />
    </div>
  );
}

/**
 * The social marks, sitting under the wordmark as a signature rather than
 * repeated in the utility strip. Glyphs earn their place here — as a row of
 * three under a mark they read as an identity block; in a line of legal links
 * they read as leftovers.
 */
export function SocialRow({
  tokens,
  className = "",
}: {
  tokens: FieldTokens;
  className?: string;
}) {
  return (
    <ul className={`flex list-none items-center gap-5 p-0 ${className}`}>
      {FOOTER_SOCIAL.map((link) => (
        <li key={link.href}>
          <SocialMark {...link} tokens={tokens} />
        </li>
      ))}
    </ul>
  );
}

function SocialMark({
  href,
  label,
  icon,
  tokens,
}: FooterLinkModel & { icon: SocialIcon; tokens: FieldTokens }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="focus:outline-none focus-visible:underline"
      style={{
        display: "block",
        color: hover ? tokens.gold : tokens.textMuted,
        transition: `color ${T}`,
      }}
    >
      <SocialGlyph icon={icon} size={16} />
    </a>
  );
}
