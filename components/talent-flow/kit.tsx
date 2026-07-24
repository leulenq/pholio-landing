"use client";

/* ═══════════════════════════════════════════════════════════════════
   /talent — "one continuous take" scene kit
   The page is a single unbroken camera move: seven scenes, each
   showcasing one instrument, connected by engineered handoffs. The
   background is ONE continuously interpolated color field (ink↔cream,
   ending true black for the Wallet scene) owned by TalentFlowPage —
   scenes are transparent and fade their own content near boundaries.
   Motion budget: one hero move per scene, transform/opacity only,
   sticky stages, no springs fighting scroll-scrub, one ease.
   ═══════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { PHOLIO_APP_ORIGIN } from "@/lib/pholio-app-origin";

export const APP_URL = PHOLIO_APP_ORIGIN;

export const EASE = [0.22, 1, 0.36, 1] as const;

export const INK = "#050505";
export const CREAM = "#FAF7F2";
export const CREAM_WARM = "#F5F0E8";
export const BLACK = "#000000";
export const GOLD = "#C9A55A";
export const GOLD_LIGHT = "#D4BC8A";

/* text tiers on the ink field (warm white, never pure white) */
export const ON_INK = "rgba(245, 240, 232, 0.92)";
export const ON_INK_SOFT = "rgba(245, 240, 232, 0.68)";
export const ON_INK_FAINT = "rgba(245, 240, 232, 0.44)";

/* text tiers on cream */
export const ON_CREAM = "#1A1A1A";
export const ON_CREAM_SOFT = "rgba(26, 26, 26, 0.72)";
export const ON_CREAM_FAINT = "rgba(26, 26, 26, 0.46)";

/* hairlines */
export const HAIR_INK = "rgba(255, 255, 255, 0.1)";
export const HAIR_CREAM = "rgba(26, 26, 26, 0.12)";

export const MONO = "var(--font-jbmono), 'JetBrains Mono', monospace";
export const SERIF = "var(--font-serif), Georgia, serif";
export const SANS = "var(--font-sans), Inter, sans-serif";

/* ── Scene score. Heights in vh; bg is the field color at the scene's
      center. TalentFlowPage interpolates between neighbors across each
      boundary so the page reads as one continuous take. ────────────── */
export const SCENES = [
  { id: "arrival", h: 150, bg: INK },
  { id: "card", h: 330, bg: CREAM },
  { id: "book", h: 260, bg: CREAM },
  { id: "send", h: 280, bg: INK },
  { id: "signal", h: 260, bg: INK },
  { id: "address", h: 230, bg: CREAM },
  { id: "wallet", h: 280, bg: BLACK },
  { id: "close", h: 130, bg: INK },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

/* ── Imagery ──────────────────────────────────────────────────────────
   Real engine renders (one identity, used ONLY in the card scene) and a
   breadth of faces for the arrival field and the book grid. All Unsplash
   IDs verified in-repo. Portraits render grayscale with warm grain. */
export const RENDERS = {
  front: "/generated/comp-card/elara-keats-front.png",
  back: "/generated/comp-card/elara-keats-back.png",
  galleryMat: "/generated/comp-card/elara-keats-gallery-mat.png",
  splitField: "/generated/comp-card/elara-keats-split-field.png",
  statement: "/generated/comp-card/elara-keats-statement.png",
} as const;

/* Unsplash portraits — every ID verified in use across indexed sites.
   Rendered grayscale with warm grain (the house treatment), so the
   originals' color grading never reaches the page. */
const UN = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&w=900&q=80`;

export const FACES = {
  /* the arrival constellation — five different faces, five divisions */
  a: UN("1509631179647-0177331693ae"),
  b: UN("1517841905240-472988babdf9"),
  c: UN("1544005313-94ddf0286df2"),
  d: UN("1539571696357-5a69c17a67c6"),
  e: UN("1488161628813-04466f872be2"),
  /* one identity for the book scene — a full-length editorial frame
     that survives eight different croppings */
  book: UN("1515886657613-9f3515b0c78f"),
  /* one identity shared by the Studio+ site and the Wallet pass */
  site: UN("1508214751196-bcfd4ca60f91"),
} as const;

export const SOURCE_FRAMES = {
  crossedArm: "/generated/comp-card/source/mara-voss-crossed-arm.jpg",
  profile: "/generated/comp-card/source/mara-voss-profile.jpg",
  redHero: "/generated/comp-card/source/mara-voss-red-hero.jpg",
} as const;

/* ── Primitives ─────────────────────────────────────────────────────── */

/** The one italic-gold verdict word of a headline. Never two. */
export function V({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-editorial-italic" style={{ color: GOLD }}>
      {children}
    </span>
  );
}

/** Clerical mono micro-label — the ledger voice. */
export function Mono({
  children,
  color,
  size = 10,
  tracking = "0.2em",
  style,
}: {
  children: React.ReactNode;
  color: string;
  size?: number;
  tracking?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: size,
        letterSpacing: tracking,
        textTransform: "uppercase",
        color,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** Scene caption: serif headline + at most one supporting sentence. */
export function Caption({
  dark,
  headline,
  children,
  maxWidth = 470,
  as: Tag = "h2",
  align = "left",
}: {
  dark: boolean;
  headline: React.ReactNode;
  children?: React.ReactNode;
  maxWidth?: number;
  as?: "h1" | "h2";
  align?: "left" | "center";
}) {
  return (
    <div style={{ maxWidth, textAlign: align }}>
      <Tag
        className="font-editorial"
        style={{
          fontSize: "clamp(2.2rem, 4.4vw, 3.7rem)",
          lineHeight: 1.07,
          letterSpacing: "-0.02em",
          color: dark ? ON_INK : ON_CREAM,
          textWrap: "balance",
          margin: 0,
        }}
      >
        {headline}
      </Tag>
      {children ? (
        <p
          style={{
            marginTop: "1.35rem",
            fontFamily: SANS,
            fontSize: 15,
            lineHeight: 1.75,
            color: dark ? ON_INK_SOFT : ON_CREAM_SOFT,
            maxWidth: "56ch",
            marginLeft: align === "center" ? "auto" : undefined,
            marginRight: align === "center" ? "auto" : undefined,
          }}
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}

/** Gold hairline sweep. */
export function Sweep({
  width = 64,
  centered = false,
}: {
  width?: number;
  centered?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "block",
        width,
        height: 1,
        margin: centered ? "0 auto" : undefined,
        background: centered
          ? `linear-gradient(to right, transparent, ${GOLD}, transparent)`
          : `linear-gradient(to right, ${GOLD}, transparent)`,
      }}
    />
  );
}

/**
 * Stage — the house sticky-scene pattern. A tall section whose sticky,
 * viewport-height stage receives the scene's scroll progress (0→1 over
 * the section). All scroll-scrubbed motion derives from this value.
 */
export function Stage({
  id,
  hvh,
  children,
  z = 1,
}: {
  id: SceneId;
  hvh: number;
  children: (progress: MotionValue<number>) => React.ReactNode;
  z?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <section
      id={id}
      ref={ref}
      style={{ height: `${hvh}vh`, position: "relative", zIndex: z }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {children(scrollYProgress)}
      </div>
    </section>
  );
}

/** Grayscale portrait frame with warm grain — the house treatment. */
export function Frame({
  src,
  alt,
  style,
  imgStyle,
  grain = true,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  grain?: boolean;
}) {
  return (
    <div
      className={grain ? "texture-grain" : undefined}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "grayscale(1) contrast(1.04)",
          ...imgStyle,
        }}
      />
    </div>
  );
}

/** Primary CTA — the site's gold button idiom. */
export function GoldCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="btn-gold">
      <span>{children}</span>
    </a>
  );
}

/** Quiet secondary entrance — gold-underlined serif link. */
export function QuietLink({
  href,
  children,
  dark = true,
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <a
      href={href}
      className="group inline-flex items-baseline gap-2.5"
      style={{
        fontFamily: SERIF,
        fontSize: "1.05rem",
        color: GOLD,
        textDecoration: "none",
        borderBottom: `1px solid ${dark ? "rgba(201,165,90,0.35)" : "rgba(201,165,90,0.5)"}`,
        paddingBottom: 5,
        transition:
          "border-color 0.45s cubic-bezier(0.22,1,0.36,1), color 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderBottomColor = GOLD;
        e.currentTarget.style.color = GOLD_LIGHT;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderBottomColor = dark
          ? "rgba(201,165,90,0.35)"
          : "rgba(201,165,90,0.5)";
        e.currentTarget.style.color = GOLD;
      }}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
        style={{ fontFamily: SANS, fontSize: "0.8em" }}
      >
        →
      </span>
    </a>
  );
}

/** Reduced-motion hook, re-exported so scenes share one import path. */
export function usePrm() {
  return useReducedMotion() ?? false;
}

/** Shorthand: fade a scene's content in after its entry boundary and out
    before its exit boundary, so field morphs happen over quiet frames. */
export const CONTENT_WINDOW: [number[], number[]] = [
  [0, 0.08, 0.92, 1],
  [0, 1, 1, 0],
];

export { motion, type MotionValue };
