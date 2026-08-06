"use client";

/* ═══════════════════════════════════════════════════════════════════
   /talent — shared scene kit
   The page is a cinematic prologue to the talent product: each scene
   re-stages a real product surface (onboarding "screen test", /reveal,
   dashboard, comp-card editions, Intel, the application dossier).
   Two voices coexist deliberately:
   — EDITORIAL voice (marketing captions): Noto Serif Display, ease EASE.
   — PRODUCT voice (inside product frames): Playfair Display + JetBrains
     Mono + the app's spring, quoted verbatim from the shipped app.
   ═══════════════════════════════════════════════════════════════════ */

export const EASE = [0.22, 1, 0.36, 1] as const; // site-wide "arrival" ease
export const EASE_ONBOARD = [0.16, 1, 0.3, 1] as const; // product onboarding ease (no bounce)
export const SPRING = { type: "spring", stiffness: 55, damping: 16 } as const; // the app's one true spring

export const INK = "#050505";
export const INK_PANEL = "#111111";
export const CREAM = "#FAF7F2";
export const CREAM_WARM = "#F5F0E8";
export const GOLD = "#C9A55A";
export const GOLD_LIGHT = "#D4BC8A";

/* text tiers on the ink stage (product values: warm white, not pure white) */
export const ON_INK = "rgba(245, 240, 232, 0.88)";
export const ON_INK_SOFT = "rgba(245, 240, 232, 0.65)";
export const ON_INK_FAINT = "rgba(245, 240, 232, 0.45)";

/* text tiers on cream */
export const ON_CREAM = "#1A1A1A";
export const ON_CREAM_SOFT = "rgba(26, 26, 26, 0.68)";
export const ON_CREAM_FAINT = "rgba(26, 26, 26, 0.46)";

/* hairlines */
export const HAIR_INK = "rgba(255, 255, 255, 0.09)";
export const HAIR_CREAM = "rgba(26, 26, 26, 0.1)";

export const PRODUCT_SERIF = "var(--font-playfair), Georgia, serif";
export const MONO = "var(--font-jbmono), 'JetBrains Mono', monospace";

/** The one italic-gold verdict word of a headline. */
export function V({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-editorial-italic" style={{ color: GOLD }}>
      {children}
    </span>
  );
}

/** Clerical micro-label — the product's JetBrains Mono voice. */
export function Mono({
  children,
  color,
  size = 10,
  tracking = "0.22em",
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

/** Editorial caption block: serif headline (≤6rem) + one supporting sentence. */
export function Caption({
  dark,
  headline,
  children,
  maxWidth = 460,
}: {
  dark: boolean;
  headline: React.ReactNode;
  children?: React.ReactNode;
  maxWidth?: number;
}) {
  return (
    <div style={{ maxWidth }}>
      <h2
        className="font-editorial"
        style={{
          fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          color: dark ? ON_INK : ON_CREAM,
          textWrap: "balance",
          margin: 0,
        }}
      >
        {headline}
      </h2>
      {children ? (
        <p
          style={{
            marginTop: "1.5rem",
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            lineHeight: 1.75,
            color: dark ? ON_INK_SOFT : ON_CREAM_SOFT,
            maxWidth: "62ch",
          }}
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}

/** Paper grain veil (existing brand furniture; relies on .texture-grain). */
export function sectionGrainClass() {
  return "texture-grain";
}

/** Product-true gold ambient orb from the onboarding stage. Static — the
    slow float lives on the parent when motion is allowed. */
export function Orb({
  size = 520,
  gold = true,
  style,
}: {
  size?: number;
  gold?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: gold
          ? "radial-gradient(circle, rgba(201,165,90,0.16) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(120,112,100,0.1) 0%, transparent 70%)",
        filter: "blur(80px)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

/** Reticle — four thin gold L-corners that draw around a frame as the
    machine reads it. `active` draws them in; each corner scales from its
    own origin. */
export function Reticle({
  active,
  inset = -10,
  size = 22,
  delay = 0,
}: {
  active: boolean;
  inset?: number;
  size?: number;
  delay?: number;
}) {
  const corners: { pos: React.CSSProperties; originX: string; originY: string; rotate: number }[] = [
    { pos: { top: inset, left: inset }, originX: "left", originY: "top", rotate: 0 },
    { pos: { top: inset, right: inset }, originX: "right", originY: "top", rotate: 90 },
    { pos: { bottom: inset, right: inset }, originX: "right", originY: "bottom", rotate: 180 },
    { pos: { bottom: inset, left: inset }, originX: "left", originY: "bottom", rotate: 270 },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: size,
            height: size,
            ...c.pos,
            transform: `rotate(${c.rotate}deg) scale(${active ? 1 : 0.4})`,
            opacity: active ? 1 : 0,
            transformOrigin: `${c.originX} ${c.originY}`,
            borderTop: `1px solid ${GOLD}`,
            borderLeft: `1px solid ${GOLD}`,
            transition: `transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay + i * 0.08}s, opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay + i * 0.08}s`,
          }}
        />
      ))}
    </>
  );
}

/** Readout — a mono wire-feed line that ticks in character by character
    once `active`. Reduced-motion callers should pass `instant`. */
export function Readout({
  text,
  active,
  delay = 0,
  color = "rgba(245, 240, 232, 0.65)",
  accent,
  size = 10,
  instant = false,
}: {
  text: string;
  active: boolean;
  delay?: number;
  color?: string;
  /** optional leading segment rendered in gold (e.g. "TYPED — ") */
  accent?: string;
  size?: number;
  instant?: boolean;
}) {
  const full = (accent ?? "") + text;
  return (
    <span
      aria-label={full}
      style={{
        fontFamily: MONO,
        fontSize: size,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        whiteSpace: "pre-wrap",
        opacity: instant ? (active ? 1 : 0) : 1,
        transition: instant ? "opacity 0.4s" : undefined,
      }}
    >
      {full.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            color: accent && i < accent.length ? GOLD : color,
            opacity: instant ? 1 : active ? 1 : 0,
            transition: instant ? undefined : `opacity 0.04s linear ${delay + i * 0.022}s`,
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

/** The product's Action Dock CTA idiom: a lit gold text-link, arrow slides
    on hover. Never a pill, never a lifted button. */
export function DockLink({
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
      className="group inline-flex items-baseline gap-3"
      style={{
        fontFamily: PRODUCT_SERIF,
        fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
        color: GOLD,
        textDecoration: "none",
        borderBottom: `1px solid ${dark ? "rgba(201,165,90,0.35)" : "rgba(201,165,90,0.45)"}`,
        paddingBottom: 6,
        transition: "border-color 0.45s cubic-bezier(0.22,1,0.36,1), color 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderBottomColor = GOLD;
        e.currentTarget.style.color = GOLD_LIGHT;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderBottomColor = dark
          ? "rgba(201,165,90,0.35)"
          : "rgba(201,165,90,0.45)";
        e.currentTarget.style.color = GOLD;
      }}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
        style={{ fontFamily: "var(--font-sans)", fontSize: "0.8em" }}
      >
        →
      </span>
    </a>
  );
}
