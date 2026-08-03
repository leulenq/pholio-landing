"use client";

/**
 * Shared machinery for the About page.
 *
 * The About page is built to the grammar of the two surfaces that are already
 * right — the header (`components/header/`) and the legal documents
 * (`components/LegalDocumentLayout.tsx`): opaque paper, hairlines, small
 * clerical type, one display serif line per beat, and gold used as a state
 * rather than a surface.
 *
 * Three rules this kit enforces so individual sections cannot drift:
 *
 *  - **No looping motion.** Every animation here is an arrival: opacity and a
 *    short offset, once, on the site's single ease. No pulsing rings, no
 *    breathing glows, no shimmer. `useReducedMotion()` collapses all of it to
 *    a plain crossfade.
 *  - **Gold tracks the paper.** `#C9A55A` on ink, `#A8894E` on cream — the same
 *    split the header's `TOKENS` makes, and for the same reason: the brand gold
 *    manages roughly 2:1 on cream and washes out. Gold is reserved for display
 *    type (where 3:1 is the bar it clears), hairlines and hover; the clerical
 *    layer is ink or cream, never gold, because 10px gold on cream is a
 *    contrast failure the legal pages happen to ship and this one shouldn't
 *    inherit.
 *  - **One italic-gold word per headline.** `Verdict` exists so a headline can
 *    only be written that way.
 */

import type { CSSProperties, ReactNode } from "react";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ══════════════════════════════════════════════════════════════════════
   TOKENS
   ══════════════════════════════════════════════════════════════════════ */

export const EASE = [0.22, 1, 0.36, 1] as const;

export const INK = "#050505";
export const CREAM = "#FAF7F2";
export const GOLD = "#C9A55A";
export const GOLD_ON_CREAM = "#A8894E";

export type Field = "ink" | "cream";

export interface AboutTokens {
  surface: string;
  text: string;
  /** Body copy. Held at ≥4.5:1 against `surface`. */
  body: string;
  /** Clerical labels, indices, baselines. Also ≥4.5:1 — muted, not faint. */
  clerical: string;
  rule: string;
  /** Display-size accent only. Never small type. */
  gold: string;
}

export const FIELDS: Record<Field, AboutTokens> = {
  ink: {
    surface: INK,
    text: "rgba(250,247,242,0.94)",
    body: "rgba(250,247,242,0.72)",
    clerical: "rgba(250,247,242,0.62)",
    rule: "rgba(250,247,242,0.12)",
    gold: GOLD,
  },
  cream: {
    surface: CREAM,
    text: "#050505",
    body: "rgba(5,5,5,0.70)",
    clerical: "rgba(5,5,5,0.58)",
    rule: "rgba(5,5,5,0.12)",
    gold: GOLD_ON_CREAM,
  },
};

export const SANS = "var(--font-sans)";
export const SERIF = "var(--font-serif)";
export const MONO = "var(--font-mono)";

/** The page's one container width and its gutters. */
export const SHELL = "mx-auto w-full max-w-[1280px] px-6 md:px-12";

/* ══════════════════════════════════════════════════════════════════════
   MOTION
   ══════════════════════════════════════════════════════════════════════ */

/**
 * Arrival. Opacity plus a short rise, once, then it is never touched again.
 * With reduced motion the offset is dropped entirely and only the fade runs.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: reduce ? 0.4 : 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   FURNITURE
   ══════════════════════════════════════════════════════════════════════ */

/** A 1px rule — the page's only container. */
export function Hairline({
  color,
  style,
  className,
}: {
  color?: string;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={className}
      style={{
        display: "block",
        height: 1,
        width: "100%",
        background: color ?? FIELDS.cream.rule,
        ...style,
      }}
    />
  );
}

/**
 * The ported gold sweep — a 1px hairline solid at the centre, transparent at
 * both edges. Canonical source is `.apply-workspace-top::after` in pholio-app's
 * talent /apply workspace; see the "Ported from pholio-app's talent system"
 * section of CLAUDE.md before changing a single stop. Used here once, to open
 * the Manifesto band, which is exactly what a closing/opening rule is for.
 */
export function GoldSweep({ style }: { style?: CSSProperties }) {
  return (
    <span
      aria-hidden
      style={{
        display: "block",
        height: 1,
        width: "100%",
        background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
        ...style,
      }}
    />
  );
}

/**
 * The clerical voice: mono, small caps, wide. Deliberately not gold — see the
 * contrast note at the top of this file. Used sparingly: the masthead and the
 * two named sections, not above every heading.
 */
export function Label({
  children,
  field = "cream",
  color,
  className,
  style,
}: {
  children: ReactNode;
  field?: Field;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={className}
      style={{
        fontFamily: MONO,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.26em",
        textTransform: "uppercase",
        color: color ?? FIELDS[field].clerical,
        lineHeight: 1,
        display: "block",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/**
 * The verdict — the single italic-gold word a headline is allowed. Rendering it
 * through a component is the cheapest way to keep "never two" true.
 */
export function Verdict({
  children,
  field = "cream",
}: {
  children: ReactNode;
  field?: Field;
}) {
  return (
    <span
      className="font-editorial-italic"
      style={{ color: FIELDS[field].gold }}
    >
      {children}
    </span>
  );
}

/** Display serif. One per section; the size scales, the voice does not. */
export function Display({
  children,
  field = "cream",
  size = "clamp(2.1rem, 4.6vw, 3.9rem)",
  className,
  style,
  as: Tag = "h2",
}: {
  children: ReactNode;
  field?: Field;
  size?: string;
  className?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={`font-editorial ${className ?? ""}`}
      style={{
        fontSize: size,
        lineHeight: 1.04,
        letterSpacing: "-0.03em",
        color: FIELDS[field].text,
        /* Block margins only. An inline `margin: 0` shorthand would beat any
           horizontal margin utility passed through `className` — which is how
           the Manifesto's stagger silently rendered flush-left. */
        marginTop: 0,
        marginBottom: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/** Body copy. */
export function Body({
  children,
  field = "cream",
  size = 16.5,
  className,
  style,
}: {
  children: ReactNode;
  field?: Field;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <p
      className={className}
      style={{
        fontFamily: SANS,
        fontSize: size,
        fontWeight: 300,
        lineHeight: 1.68,
        color: FIELDS[field].body,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/**
 * A text link. Prominence is colour against muted siblings — never a pill, a
 * fill, a permanent rule or a larger size, the same rule the header's
 * `ActionLink` follows. `strength: "action"` is the one link in a group allowed
 * to sit at full text colour; everything else rests muted and shifts to gold on
 * hover and focus.
 */
export function TextLink({
  href,
  children,
  field = "cream",
  strength = "muted",
  external = false,
  size = 13,
}: {
  href: string;
  children: ReactNode;
  field?: Field;
  strength?: "action" | "muted";
  /** Leaves the Next router — the app, or a mail client. */
  external?: boolean;
  size?: number;
}) {
  const tokens = FIELDS[field];
  const rest = strength === "action" ? tokens.text : tokens.clerical;

  const style: CSSProperties = {
    fontFamily: SANS,
    fontSize: size,
    fontWeight: strength === "action" ? 600 : 500,
    letterSpacing: "0.02em",
    color: rest,
    textDecoration: "none",
    transition: "color 0.32s cubic-bezier(0.22,1,0.36,1)",
    whiteSpace: "nowrap",
  };

  const handlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.color = tokens.gold;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.color = rest;
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      e.currentTarget.style.color = tokens.gold;
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      e.currentTarget.style.color = rest;
    },
    className: "focus:outline-none focus-visible:underline",
    style,
  };

  return external ? (
    <a href={href} {...handlers}>
      {children}
    </a>
  ) : (
    <Link href={href} {...handlers}>
      {children}
    </Link>
  );
}

/** Grain. Ink bands carry it inline; cream sections use `.texture-grain`. */
export function Grain({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "180px 180px",
      }}
    />
  );
}
