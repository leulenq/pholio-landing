"use client";

/**
 * Shared machinery for the footer.
 *
 * WHAT A FOOTER IS
 * ----------------
 * Not a second header, not a closing statement, not a sitemap. The people who
 * reach the bottom are on an errand — find the address, check a policy, see
 * whether this company is real. A footer is a service counter, and it earns its
 * keep by being useful, not by being loud.
 *
 * WHAT "PREMIUM" MEANS HERE (learned the hard way)
 * -----------------------------------------------
 * The first build obeyed every restraint rule and still read as a placeholder:
 * "too pale, too inactive, not elevated enough." Restraint is not the same as
 * absence, and four specific things were missing:
 *
 *  1. **Contrast.** Every value sat at the header's 58–60% muted. A block where
 *     nothing reaches full strength is not restrained, it is washed out. Links
 *     now run at ~82–86%, labels at ~50%. The hierarchy comes from the *gap*
 *     between those, not from everything being quiet together.
 *  2. **Material.** Flat paper with nothing on it. Grain is listed brand
 *     furniture and it is what stops a large field looking unfinished.
 *  3. **The gold sweep.** An earlier note here banned it from the footer, which
 *     was wrong: per CLAUDE.md it is ported furniture that closes the app's
 *     workspace topbar — solid gold at the centre, transparent at both edges.
 *     A footer is a closing band. It opens on the sweep.
 *  4. **A focal point.** No element had priority, so the eye had nowhere to
 *     land. One full-strength action now anchors the brand bay.
 *
 * The field is ink by default. The header is the variable element — it samples
 * whatever section it crosses — so the footer is the constant one, and the site
 * ends on the velvet its own body is already set in.
 */

import { useState, type ReactNode } from "react";
import Link from "next/link";

import {
  EASE,
  GOLD,
  GoldSweep,
  MONO,
  SANS,
  TOKENS,
  Wordmark,
  type Field,
  type FieldTokens,
} from "@/components/header/kit";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import {
  BASELINE_LEGAL,
  ENTITY,
  FOOTER_SOCIAL,
  SIGNUP_HREF,
  SUPPORT_MAILTO,
  type FooterGroup as FooterGroupModel,
  type FooterLink as FooterLinkModel,
} from "@/lib/footer-links";
import { SocialGlyph, type SocialIcon } from "./icons";

export { EASE, GOLD, MONO, SANS, TOKENS, Wordmark };
export type { Field, FieldTokens, FooterGroupModel, FooterLinkModel };

export interface FooterVariantProps {
  field?: Field;
}

const T = `0.28s cubic-bezier(${EASE.join(",")})`;

/* ══════════════════════════════════════════════════════════════════════
   TOKENS — the footer runs its type harder than the header
   ══════════════════════════════════════════════════════════════════════ */

export interface FooterTokens extends FieldTokens {
  /** Link at rest. Near full strength; the header's `textMuted` reads washed. */
  link: string;
  /** Mono section labels. Clearly subordinate, still legible. */
  label: string;
  /** Baseline and social marks. */
  quiet: string;
  /** Hairlines — a touch stronger than the header's, since they do real work. */
  line: string;
}

export function footerTokens(field: Field): FooterTokens {
  const base = TOKENS[field];
  const ink = field === "ink";
  return {
    ...base,
    /* Floors are set by contrast, not by taste: every one of these is ≥4.5:1
       against its own surface, because the labels and the baseline sit at 10px
       and small text has no room to be decorative. Cream needs the higher
       alphas — ink on cream loses contrast faster than cream on ink. */
    link: ink ? "rgba(250,247,242,0.82)" : "rgba(15,23,42,0.86)",
    label: ink ? "rgba(250,247,242,0.52)" : "rgba(15,23,42,0.66)",
    quiet: ink ? "rgba(250,247,242,0.50)" : "rgba(15,23,42,0.62)",
    line: ink ? "rgba(250,247,242,0.14)" : "rgba(15,23,42,0.16)",
  };
}

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ══════════════════════════════════════════════════════════════════════
   SHELL
   ══════════════════════════════════════════════════════════════════════ */

/**
 * The closing band. Opens on the gold sweep — the exact ported hairline the
 * app's workspace topbar closes with — over grain, in the page's terminal
 * field.
 */
export function FooterRoot({
  field = "ink",
  children,
}: {
  field?: Field;
  children: ReactNode;
}) {
  const tokens = footerTokens(field);
  return (
    <footer
      data-site-footer
      className="relative w-full overflow-hidden"
      style={{ background: tokens.surface }}
    >
      <GoldSweep
        style={{ position: "absolute", top: 0, left: 0, right: 0, width: "auto" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: GRAIN,
          backgroundSize: "180px 180px",
          opacity: field === "ink" ? 0.055 : 0.04,
        }}
      />
      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-12">
        {children}
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TYPE
   ══════════════════════════════════════════════════════════════════════ */

export function GroupTitle({
  children,
  tokens,
}: {
  children: ReactNode;
  tokens: FooterTokens;
}) {
  return (
    <h2
      style={{
        fontFamily: MONO,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: tokens.label,
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}

/**
 * A footer link: sentence case, body register, near full strength. Hover shifts
 * to gold and draws a 1px rule in from the left — the same gesture the header's
 * nav uses, which is where the block's sense of being alive comes from.
 */
export function FooterLink({
  href,
  label,
  external = false,
  tokens,
  size = 13.5,
}: FooterLinkModel & { tokens: FooterTokens; size?: number }) {
  const [hover, setHover] = useState(false);

  const props = {
    className: "relative inline-block focus:outline-none focus-visible:underline",
    style: {
      position: "relative" as const,
      fontFamily: SANS,
      fontSize: size,
      lineHeight: 1.5,
      letterSpacing: "0.005em",
      color: hover ? tokens.gold : tokens.link,
      textDecoration: "none",
      paddingBottom: 3,
      transition: `color ${T}`,
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

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
 * The one action in the block, and the only element at full strength. Per the
 * header's rule, prominence is colour against muted siblings — never a larger
 * size, never a permanent rule, never a fill.
 */
export function FooterAction({
  href,
  label,
  tokens,
}: {
  href: string;
  label: string;
  tokens: FooterTokens;
}) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative inline-block focus:outline-none focus-visible:underline"
      style={{
        fontFamily: SANS,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.01em",
        color: hover ? tokens.gold : tokens.text,
        textDecoration: "none",
        paddingBottom: 4,
        transition: `color ${T}`,
      }}
    >
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
    </a>
  );
}

export function Group({
  group,
  tokens,
}: {
  group: FooterGroupModel;
  tokens: FooterTokens;
}) {
  return (
    <nav aria-label={group.title}>
      <GroupTitle tokens={tokens}>{group.title}</GroupTitle>
      <ul className="mt-6 flex list-none flex-col gap-3.5 p-0">
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
   IDENTITY
   ══════════════════════════════════════════════════════════════════════ */

/**
 * The brand bay: the mark at the app's own 24px, the one action, an address a
 * human answers, and the social marks. No tagline — a sentence of brand copy
 * down here is filler.
 */
export function BrandAnchor({ tokens }: { tokens: FooterTokens }) {
  return (
    <div className="flex flex-col items-start">
      <Link
        href="/"
        aria-label="Pholio — home"
        style={{ textDecoration: "none" }}
        className="focus:outline-none"
      >
        <Wordmark size={24} />
      </Link>

      <div className="mt-9">
        <FooterAction href={SIGNUP_HREF} label="Get scouted" tokens={tokens} />
      </div>

      <div className="mt-10">
        <GroupTitle tokens={tokens}>Enquiries</GroupTitle>
        <div className="mt-3.5">
          <FooterLink
            href={SUPPORT_MAILTO}
            label={ENTITY.email}
            external
            tokens={tokens}
            size={14}
          />
        </div>
      </div>

      <SocialRow tokens={tokens} className="mt-10" />
    </div>
  );
}

/**
 * Glyphs, and only here. A row of three under the mark reads as an identity
 * block; the same three in a line of legal links read as leftovers.
 */
export function SocialRow({
  tokens,
  className = "",
}: {
  tokens: FooterTokens;
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
}: FooterLinkModel & { icon: SocialIcon; tokens: FooterTokens }) {
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
        color: hover ? tokens.gold : tokens.quiet,
        transition: `color ${T}`,
      }}
    >
      <SocialGlyph icon={icon} size={16} />
    </a>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   BASELINE
   ══════════════════════════════════════════════════════════════════════ */

/**
 * The last line. The contractual documents — listed here and nowhere else —
 * plus the withdrawal control, and a way back up. No copyright or corporate
 * line: it was making this strip a dumping ground rather than a closing edge.
 */
export function Baseline({ tokens }: { tokens: FooterTokens }) {
  return (
    <div
      className="flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between"
      style={{ borderTop: `1px solid ${tokens.line}` }}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {BASELINE_LEGAL.map((link, i) => (
          <span key={link.href} className="flex items-center gap-x-4">
            {i > 0 && <Dot tokens={tokens} />}
            <MonoLink {...link} tokens={tokens} />
          </span>
        ))}
        <Dot tokens={tokens} />
        {/* A control, not a policy link: it clears the consent record and
            re-raises the banner, so withdrawing stays as easy as granting. */}
        <CookiePreferencesButton
          className="focus:outline-none focus-visible:underline"
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.06em",
            color: tokens.quiet,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: `color ${T}`,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = tokens.gold)}
          onMouseLeave={(e) => (e.currentTarget.style.color = tokens.quiet)}
        />
      </div>

      <BackToTop tokens={tokens} />
    </div>
  );
}

function BackToTop({ tokens }: { tokens: FooterTokens }) {
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
      className="flex items-center gap-2.5 self-start focus:outline-none focus-visible:underline md:self-auto"
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontFamily: MONO,
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: hover ? tokens.gold : tokens.quiet,
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

export function MonoLink({
  href,
  label,
  external = false,
  tokens,
}: FooterLinkModel & { tokens: FooterTokens }) {
  const [hover, setHover] = useState(false);
  const props = {
    className: "focus:outline-none focus-visible:underline",
    style: {
      fontFamily: MONO,
      fontSize: 10,
      letterSpacing: "0.06em",
      color: hover ? tokens.gold : tokens.quiet,
      textDecoration: "none",
      whiteSpace: "nowrap" as const,
      transition: `color ${T}`,
    },
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

function Dot({ tokens }: { tokens: FooterTokens }) {
  return (
    <span
      aria-hidden
      style={{ fontFamily: MONO, fontSize: 9, color: tokens.quiet, opacity: 0.55 }}
    >
      &middot;
    </span>
  );
}
