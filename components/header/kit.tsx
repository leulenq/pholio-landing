"use client";

/**
 * Shared machinery for the header (currently: VariantIndex, the shipped
 * direction, and the untouched legacy pill it can roll back to).
 *
 * Deliberately holds *behaviour and state*, not looks: reveal gating, scroll
 * condensation, field-polarity sampling, the account cluster and the mobile
 * index. Each variant supplies its own structure and furniture on top.
 *
 * Two rules apply:
 *  - No blur, no translucency. When a header needs a backing it takes the
 *    page's own paper colour, opaque. Glass exists to rescue boxed headers
 *    over imagery; a header made of type and one hairline doesn't need it.
 *  - Gold is a state, not a surface. It marks the live route, the action and
 *    the sweep — never a filled shape bigger than a word, and prominence
 *    never comes from scale.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";

import { MARKETING_NAV_LINKS } from "@/lib/marketing-nav-links";
import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";
import { STUDIO_PLUS_SIGNUP_URL } from "@/lib/marketing-pricing";
import { usePholioAuth } from "@/lib/pholio-auth/PholioAuthProvider";

/** The site's single ease. Mutable tuple so framer-motion accepts it directly. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** The field the header is sitting on — the page's paper, not a colour scheme. */
export type Field = "ink" | "cream";

export interface HeaderVariantProps {
  /** Route-level default polarity; live sampling can override it while scrolling. */
  theme?: Field;
  /** Render inside a demo/preview frame instead of the fixed viewport. */
  preview?: boolean;
  /** Which scroll state the demo frame should hold. */
  previewState?: "rest" | "settled";
}

/* ══════════════════════════════════════════════════════════════════════
   TOKENS
   ══════════════════════════════════════════════════════════════════════ */

export const GOLD = "#C9A55A";
export const GOLD_LIGHT = "#D4BC8A";
export const GOLD_DARK = "#A8894E";

export interface FieldTokens {
  surface: string;
  /** Solid panel colour for drawers and menus — never translucent. */
  panel: string;
  text: string;
  textMuted: string;
  textFaint: string;
  rule: string;
  ruleStrong: string;
  wash: string;
  gold: string;
}

export const TOKENS: Record<Field, FieldTokens> = {
  ink: {
    surface: "#050505",
    panel: "#0A0A0A",
    text: "#FAF7F2",
    textMuted: "rgba(250,247,242,0.58)",
    textFaint: "rgba(250,247,242,0.34)",
    rule: "rgba(250,247,242,0.10)",
    ruleStrong: "rgba(250,247,242,0.18)",
    wash: "rgba(201,165,90,0.06)",
    gold: GOLD,
  },
  cream: {
    surface: "#FAF7F2",
    panel: "#FFFFFF",
    text: "#0F172A",
    textMuted: "rgba(15,23,42,0.60)",
    textFaint: "rgba(15,23,42,0.38)",
    rule: "rgba(15,23,42,0.12)",
    ruleStrong: "rgba(15,23,42,0.20)",
    wash: "rgba(201,165,90,0.08)",
    gold: GOLD_DARK,
  },
};

export const SANS = "var(--font-sans)";
export const SERIF = "var(--font-serif)";
export const MONO = "var(--font-mono)";

/* ══════════════════════════════════════════════════════════════════════
   NAV MODEL
   ══════════════════════════════════════════════════════════════════════ */

/**
 * The marketing nav is not a flat list of pages — it is two audience doors and
 * one product tier, carried on `kind` for any variant that wants to express it.
 */
export const NAV = MARKETING_NAV_LINKS.map((link, i) => ({
  ...link,
  index: String(i + 1).padStart(2, "0"),
  kind: link.label === "STUDIO+" ? ("tier" as const) : ("door" as const),
}));

export const SECONDARY_LINKS = [
  { label: "About", href: "/about-us" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Press", href: "/press" },
];

export const LOGIN_HREF = `${APP_URL}/login`;
export const SIGNUP_HREF = `${APP_URL}/onboarding`;

/* ══════════════════════════════════════════════════════════════════════
   STATE
   ══════════════════════════════════════════════════════════════════════ */

/**
 * The home page carries its own chrome inside the 300vh hero composition, so
 * the sitewide header stays out of the way until the hero has left. (The old
 * header looked for a `[data-header-switch]` marker that no longer exists in
 * the DOM, which is why it never appeared on `/` at all — so this measures the
 * hero itself, and falls back to one viewport of scroll if there isn't one.)
 *
 * Note `/` currently serves the "Launching soon" holding page, which has no hero
 * and does not scroll — so the header stays hidden there, which is correct.
 */
const CONDENSE_AT = 96; // px of scroll before the header settles

function homeHeaderRevealed(): boolean {
  const hero = document
    .querySelector("[data-hero-chrome]")
    ?.closest("section");
  if (hero) {
    // Revealed once the hero's last frame has largely left the viewport.
    return hero.getBoundingClientRect().bottom <= window.innerHeight * 0.5;
  }
  return window.scrollY > window.innerHeight;
}

export interface HeaderState {
  field: Field;
  tokens: FieldTokens;
  /** False while the home hero owns the top of the page. */
  revealed: boolean;
  /** True once the page has scrolled past the settle threshold. */
  condensed: boolean;
  pathname: string;
  reduceMotion: boolean;
}

export function useHeaderState({
  theme = "ink",
  preview = false,
  previewState = "rest",
}: HeaderVariantProps): HeaderState {
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/";
  const reduceMotion = !!useReducedMotion();
  const { scrollY } = useScroll();

  const [revealed, setRevealed] = useState(preview || !isHome);
  const [condensed, setCondensed] = useState(
    preview && previewState === "settled",
  );
  const [field, setField] = useState<Field>(theme);

  useEffect(() => setField(theme), [theme]);

  useEffect(() => {
    if (preview) return;
    setRevealed(!isHome);
    setCondensed(false);
  }, [isHome, preview]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (preview) return;
    if (isHome) {
      setRevealed(homeHeaderRevealed());
    }
    setCondensed(latest > CONDENSE_AT);
  });

  /* Field polarity: read the paper directly under the bar so the header belongs
     to whatever section it is crossing, instead of being frozen per route. */
  const sampledField = useFieldPolarity({ enabled: !preview, fallback: theme });
  useEffect(() => {
    if (preview) return;
    setField(sampledField);
  }, [sampledField, preview]);

  return {
    field: preview ? theme : field,
    tokens: TOKENS[preview ? theme : field],
    revealed,
    condensed: preview ? previewState === "settled" : condensed,
    pathname,
    reduceMotion,
  };
}

const OPAQUE_SKIP = new Set(["rgba(0, 0, 0, 0)", "transparent"]);

/**
 * Samples the first opaque background beneath the header band and returns the
 * polarity its luminance implies. Progressive enhancement: anything unreadable
 * (canvas, video, pointer-events:none scenery) leaves the route default alone.
 */
function useFieldPolarity({
  enabled,
  fallback,
}: {
  enabled: boolean;
  fallback: Field;
}): Field {
  const [field, setField] = useState<Field>(fallback);
  const frame = useRef(0);

  useEffect(() => setField(fallback), [fallback]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const sample = () => {
      const y = 78;
      const xs = [24, window.innerWidth / 2, window.innerWidth - 24];

      for (const x of xs) {
        const stack = document.elementsFromPoint(x, y);
        for (const el of stack) {
          if (!(el instanceof HTMLElement)) continue;
          if (el.closest("[data-site-header]")) continue;
          const bg = window.getComputedStyle(el).backgroundColor;
          if (OPAQUE_SKIP.has(bg)) continue;
          const match = bg.match(
            /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/,
          );
          if (!match) continue;
          const alpha = match[4] === undefined ? 1 : Number(match[4]);
          if (alpha < 0.85) continue;
          const [r, g, b] = [
            Number(match[1]),
            Number(match[2]),
            Number(match[3]),
          ];
          const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
          setField(luminance > 0.55 ? "cream" : "ink");
          return;
        }
      }
      setField(fallback);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(sample);
    };

    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled, fallback]);

  return field;
}

/** Locks page scroll while a full-screen index is open. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active || typeof document === "undefined") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
}

/* ══════════════════════════════════════════════════════════════════════
   PRIMITIVES
   ══════════════════════════════════════════════════════════════════════ */

const FieldContext = createContext<FieldTokens>(TOKENS.ink);
export const useTokens = () => useContext(FieldContext);
export function FieldProvider({
  tokens,
  children,
}: {
  tokens: FieldTokens;
  children: ReactNode;
}) {
  return (
    <FieldContext.Provider value={tokens}>{children}</FieldContext.Provider>
  );
}

/** A 1px rule. The header's only container. */
export function Rule({
  vertical = false,
  color,
  style,
  className,
}: {
  vertical?: boolean;
  color?: string;
  style?: CSSProperties;
  className?: string;
}) {
  const tokens = useTokens();
  return (
    <span
      aria-hidden
      className={className}
      style={{
        display: "block",
        background: color ?? tokens.rule,
        ...(vertical
          ? { width: 1, alignSelf: "stretch" }
          : { height: 1, width: "100%" }),
        ...style,
      }}
    />
  );
}

/**
 * The furniture rule shared with the app: a 1px hairline that fades in from
 * transparent, peaks at solid gold in the center, and fades back out — not a
 * feathered/alpha-stepped glow. Matches `.apply-workspace-top::after` in
 * pholio-app's talent /apply workspace exactly (`--app-gold` === `GOLD` here).
 */
export function GoldSweep({
  opacity = 1,
  style,
}: {
  opacity?: number;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      style={{
        display: "block",
        height: 1,
        width: "100%",
        opacity,
        background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1)`,
        ...style,
      }}
    />
  );
}

export function Wordmark({
  size = 15,
  tracking = 0.2,
  color,
  weight = 400,
  className,
  style,
}: {
  size?: number | string;
  tracking?: number;
  color?: string;
  weight?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={className}
      style={{
        fontFamily: SERIF,
        fontWeight: weight,
        fontSize: typeof size === "number" ? `${size}px` : size,
        letterSpacing: `${tracking}em`,
        // letter-spacing adds a trailing gap after the O; pull it back so the
        // mark optically aligns with whatever sits to its right.
        marginRight: `-${tracking}em`,
        // The mark is gold everywhere it appears — in the app (talent
        // dashboard topbar) as in the marketing header — not a themed
        // ink/cream text color. Callers can still override for a specific
        // surface (e.g. a scrim that needs more contrast).
        color: color ?? GOLD,
        lineHeight: 1,
        display: "inline-block",
        transition:
          "color 0.4s cubic-bezier(0.22,1,0.36,1), font-size 0.5s cubic-bezier(0.22,1,0.36,1), letter-spacing 0.5s cubic-bezier(0.22,1,0.36,1)",
        ...style,
      }}
    >
      PHOLIO
    </span>
  );
}

/** Wide-tracked clerical caps — the site's existing micro-label voice. */
export function Kicker({
  children,
  color,
  size = 9,
  tracking = 0.26,
  style,
  className,
}: {
  children: ReactNode;
  color?: string;
  size?: number;
  tracking?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const tokens = useTokens();
  return (
    <span
      className={className}
      style={{
        fontFamily: MONO,
        fontSize: size,
        letterSpacing: `${tracking}em`,
        textTransform: "uppercase",
        color: color ?? tokens.textFaint,
        lineHeight: 1,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/**
 * A nav word with a rule that draws in from the left on hover and sits filled
 * when the route is live. Hover is a colour and a line — never a scale, never a
 * pill (the site runs a custom cursor, so the feedback has to live on the mark).
 */
export function NavLink({
  href,
  label,
  active,
  size = 10,
  tracking = 0.2,
  color,
  activeColor,
  external = false,
  onClick,
}: {
  href: string;
  label: string;
  active?: boolean;
  size?: number;
  tracking?: number;
  color?: string;
  activeColor?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const tokens = useTokens();
  const [hover, setHover] = useState(false);
  const live = active || hover;

  /* External destinations (the app's login/onboarding) leave Next's router. */
  const anchorProps = {
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    className: "relative inline-block focus:outline-none focus-visible:underline",
    style: { textDecoration: "none", paddingBottom: 5 } as CSSProperties,
    "aria-current": active ? ("page" as const) : undefined,
  };

  const content = (
    <>
      <span
        style={{
          fontFamily: SANS,
          fontSize: size,
          fontWeight: 500,
          letterSpacing: `${tracking}em`,
          textTransform: "uppercase",
          color: live
            ? (activeColor ?? tokens.gold)
            : (color ?? tokens.textMuted),
          transition: "color 0.32s cubic-bezier(0.22,1,0.36,1)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 1,
          width: live ? "100%" : 0,
          background: activeColor ?? tokens.gold,
          transition: "width 0.42s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </>
  );

  return external ? (
    <a href={href} {...anchorProps}>
      {content}
    </a>
  ) : (
    <Link href={href} {...anchorProps}>
      {content}
    </Link>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ACCOUNT
   ══════════════════════════════════════════════════════════════════════ */

/**
 * Signed-in cluster. Rebuilt without the glass trigger and rounded card: a bare
 * avatar and name, opening a square-cornered panel in the page's own paper with
 * hairline sections and mono section labels. The profile-strength meter becomes
 * a 1px gold rule — the same furniture the rest of the site uses.
 */
export function AccountCluster({
  compact = false,
  showAction = true,
}: {
  compact?: boolean;
  /** Set false when the variant renders its own action (the Ledger's gold cell). */
  showAction?: boolean;
}) {
  const tokens = useTokens();
  const { session, isLoading, isAuthenticated, logout, dashboardHref } =
    usePholioAuth();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const handleLogout = useCallback(async () => {
    setOpen(false);
    await logout();
    window.location.reload();
  }, [logout]);

  if (isLoading)
    return <span style={{ width: compact ? 84 : 132 }} aria-hidden />;

  if (!isAuthenticated) {
    return (
      <div className="flex items-center" style={{ gap: compact ? 18 : 26 }}>
        <NavLink
          href={LOGIN_HREF}
          label="Log in"
          external
          size={10}
          tracking={0.2}
        />
        {showAction && <ActionLink href={SIGNUP_HREF} label="Get scouted" />}
      </div>
    );
  }

  const profile = session?.profile;
  const initial =
    profile?.first_name?.[0]?.toUpperCase() ||
    session?.user?.email?.[0]?.toUpperCase() ||
    "P";
  const name = profile?.first_name
    ? `${profile.first_name}${profile.last_name ? ` ${profile.last_name}` : ""}`
    : session?.user?.email?.split("@")[0] || "Account";
  const strength = session?.completeness?.percentage ?? 0;

  const item = (key: string): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    padding: "11px 18px",
    fontFamily: SANS,
    fontSize: 12.5,
    letterSpacing: "0.01em",
    textAlign: "left",
    textDecoration: "none",
    background: hover === key ? tokens.wash : "transparent",
    color: hover === key ? tokens.gold : tokens.textMuted,
    transition:
      "color 0.24s cubic-bezier(0.22,1,0.36,1), background 0.24s cubic-bezier(0.22,1,0.36,1)",
    border: "none",
    cursor: "pointer",
  });

  const hoverProps = (key: string) => ({
    onMouseEnter: () => setHover(key),
    onMouseLeave: () => setHover(null),
  });

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Account menu"
        className="flex items-center focus:outline-none"
        style={{ gap: 10, background: "none", border: "none", padding: 0 }}
      >
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            overflow: "hidden",
            display: "grid",
            placeItems: "center",
            background: profile?.profile_image ? "transparent" : GOLD,
            color: "#050505",
            fontFamily: SANS,
            fontSize: 11,
            fontWeight: 600,
            flexShrink: 0,
            boxShadow: `0 0 0 1px ${tokens.rule}`,
          }}
        >
          {profile?.profile_image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={profile.profile_image}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(1)",
              }}
            />
          ) : (
            initial
          )}
        </span>
        {!compact && (
          <span
            style={{
              fontFamily: SANS,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: tokens.textMuted,
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </span>
        )}
        <ChevronDown
          size={12}
          style={{
            color: tokens.textFaint,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{
            position: "absolute",
            top: "calc(100% + 18px)",
            right: 0,
            width: 288,
            background: tokens.panel,
            border: `1px solid ${tokens.rule}`,
            zIndex: 60,
          }}
        >
          <div style={{ padding: "16px 18px 14px" }}>
            <Kicker>{session?.role === "TALENT" ? "Talent" : "Agency"}</Kicker>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 17,
                letterSpacing: "-0.01em",
                color: tokens.text,
                marginTop: 9,
              }}
            >
              {name}
            </div>
            <div
              style={{
                fontFamily: SANS,
                fontSize: 11.5,
                color: tokens.textFaint,
                marginTop: 3,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {session?.user?.email}
            </div>
          </div>

          {session?.role === "TALENT" && (
            <>
              <Rule />
              <a
                href={dashboardHref}
                style={{
                  display: "block",
                  padding: "13px 18px",
                  textDecoration: "none",
                }}
                {...hoverProps("strength")}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <Kicker>Profile strength</Kicker>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      color: GOLD,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {strength}%
                  </span>
                </div>
                <div
                  style={{
                    height: 1,
                    background: tokens.rule,
                    marginTop: 9,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: `${strength}%`,
                      background: GOLD,
                      transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                </div>
              </a>
            </>
          )}

          <Rule />
          <div style={{ padding: "6px 0" }}>
            {session?.role === "TALENT" && profile?.slug && (
              <a
                href={`${APP_URL}/talent/${profile.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                style={item("public")}
                {...hoverProps("public")}
              >
                <ExternalLink size={14} />
                <span>View public profile</span>
              </a>
            )}
            <a
              href={`${dashboardHref}/settings`}
              style={item("settings")}
              {...hoverProps("settings")}
            >
              <Settings size={14} />
              <span>Account settings</span>
            </a>
            {!session?.subscription?.isPro && (
              <a
                href={STUDIO_PLUS_SIGNUP_URL}
                style={item("upgrade")}
                {...hoverProps("upgrade")}
              >
                <Sparkles size={14} />
                <span>Upgrade to Studio+</span>
              </a>
            )}
          </div>

          <Rule />
          <button
            type="button"
            onClick={handleLogout}
            style={item("logout")}
            {...hoverProps("logout")}
          >
            <LogOut size={14} />
            <span>Log out</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}

/**
 * The action. Not a pill: a word at full-strength color against its muted
 * siblings. Prominence comes from that color contrast alone — no rule, no
 * larger font size.
 */
export function ActionLink({
  href,
  label,
  size = 10,
  tracking = 0.18,
  onClick,
}: {
  href: string;
  label: string;
  size?: number;
  tracking?: number;
  onClick?: () => void;
}) {
  const tokens = useTokens();
  const [hover, setHover] = useState(false);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative inline-block focus:outline-none focus-visible:underline"
      style={{ textDecoration: "none" }}
    >
      <span
        style={{
          fontFamily: SANS,
          fontSize: size,
          fontWeight: 600,
          letterSpacing: `${tracking}em`,
          textTransform: "uppercase",
          color: hover ? tokens.gold : tokens.text,
          transition: "color 0.32s cubic-bezier(0.22,1,0.36,1)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </a>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MOBILE INDEX — the pattern worth keeping
   ══════════════════════════════════════════════════════════════════════ */

/**
 * The hamburger → full-screen serif index. Kept from the current header (the one
 * part that works), with the chrome stripped: no blur behind it, no rounded
 * button around the trigger, no filled pill at the bottom. `variant="index"`
 * promotes the same pattern to desktop for direction 03.
 */
export function IndexTrigger({
  open,
  onToggle,
  label,
  tokens,
}: {
  open: boolean;
  onToggle: () => void;
  label?: string;
  tokens: FieldTokens;
}) {
  const [hover, setHover] = useState(false);
  const color = open || hover ? GOLD : tokens.text;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-label={open ? "Close index" : "Open index"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center focus:outline-none focus-visible:underline"
      style={{ gap: 12, background: "none", border: "none", padding: "6px 0" }}
    >
      {label && (
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9.5,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color,
            transition: "color 0.3s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {open ? "Close" : label}
        </span>
      )}
      <span aria-hidden style={{ display: "grid", gap: 5, width: 22 }}>
        <span
          style={{
            height: 1,
            width: "100%",
            background: color,
            transformOrigin: "center",
            transform: open ? "translateY(3px) rotate(45deg)" : "none",
            transition:
              "transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s ease",
          }}
        />
        <span
          style={{
            height: 1,
            width: open ? "100%" : "64%",
            marginLeft: "auto",
            background: color,
            transformOrigin: "center",
            transform: open ? "translateY(-3px) rotate(-45deg)" : "none",
            transition:
              "transform 0.4s cubic-bezier(0.22,1,0.36,1), width 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s ease",
          }}
        />
      </span>
    </button>
  );
}

/**
 * The index panel itself. Solid velvet, grain, serif entries with mono margin
 * numbers, a clerical foot. `full` renders the two-column desktop composition
 * used by direction 03; otherwise it is the single-column mobile sheet.
 */
export function IndexPanel({
  open,
  onClose,
  pathname,
  reduceMotion,
  full = false,
  top = 0,
  contained = false,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  reduceMotion: boolean;
  full?: boolean;
  top?: number;
  /** Scoped to a demo frame instead of the viewport. */
  contained?: boolean;
}) {
  const { isAuthenticated, dashboardHref } = usePholioAuth();
  useScrollLock(open && !contained);

  const entry = (i: number) => ({
    initial: false as const,
    animate: {
      opacity: open ? 1 : 0,
      y: open ? 0 : reduceMotion ? 0 : 14,
    },
    transition: {
      delay: open && !reduceMotion ? 0.08 + i * 0.055 : 0,
      duration: 0.5,
      ease: EASE,
    },
  });

  return (
    <motion.div
      className={`${contained ? "absolute" : "fixed"} inset-x-0 bottom-0 z-[102] flex flex-col`}
      initial={false}
      animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      transition={{ duration: 0.36, ease: EASE }}
      style={{ top, background: "#050505" }}
      aria-hidden={!open}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      <FieldProvider tokens={TOKENS.ink}>
        <div
          className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col px-6 md:px-12"
          /* `full` runs beneath the still-visible corner marks, so it clears them. */
          style={{
            paddingTop: full ? (contained ? 96 : 128) : 44,
            paddingBottom: contained
              ? "1.5rem"
              : "max(2rem, env(safe-area-inset-bottom))",
          }}
        >
          <div
            className={
              full
                ? "grid flex-1 grid-cols-1 gap-10 overflow-y-auto md:grid-cols-[1.5fr_1fr] md:gap-12 md:overflow-visible"
                : "flex flex-1 flex-col"
            }
          >
            {/* Primary index */}
            <nav className="flex flex-col md:justify-center">
              {NAV.map((link, i) => (
                <motion.div key={link.href} {...entry(i)}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-baseline focus:outline-none"
                    style={{ textDecoration: "none", padding: "18px 0" }}
                  >
                    <IndexEntryLabel
                      label={link.label}
                      active={pathname === link.href}
                      full={full}
                    />
                  </Link>
                  <Rule color="rgba(250,247,242,0.07)" />
                </motion.div>
              ))}
            </nav>

            {/* Clerical column. Sits beside the entries on desktop and stacks
                under them on a phone — it carries the only sign-up route in this
                composition, so it can never be a desktop-only luxury. */}
            {full && (
              <motion.div
                className="flex flex-col gap-9 md:justify-center md:gap-10"
                {...entry(NAV.length)}
              >
                <div>
                  <Kicker color="rgba(250,247,242,0.3)">More</Kicker>
                  <div className="mt-5 flex flex-col gap-3.5">
                    {SECONDARY_LINKS.map((link) => (
                      <NavLink
                        key={link.href}
                        href={link.href}
                        label={link.label}
                        size={11}
                        tracking={0.12}
                        onClick={onClose}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Kicker color="rgba(250,247,242,0.3)">Account</Kicker>
                  <div className="mt-4 flex flex-col items-start gap-3">
                    {isAuthenticated ? (
                      <ActionLink
                        href={dashboardHref}
                        label="Open dashboard"
                        size={11}
                        tracking={0.14}
                        onClick={onClose}
                      />
                    ) : (
                      <>
                        <ActionLink
                          href={SIGNUP_HREF}
                          label="Get scouted"
                          size={11}
                          tracking={0.14}
                          onClick={onClose}
                        />
                        <NavLink
                          href={LOGIN_HREF}
                          label="Log in"
                          external
                          size={11}
                          tracking={0.14}
                          onClick={onClose}
                        />
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Foot — only the single-column sheet needs one; the full
              composition's clerical column already carries the actions. */}
          {!full && (
          <motion.div {...entry(NAV.length + 1)} className="shrink-0 pt-8">
            <Rule color="rgba(250,247,242,0.09)" />
            <div className="flex flex-wrap items-center justify-end gap-5 pt-6">
              {!full && (
                <div className="flex items-center gap-7">
                  {isAuthenticated ? (
                    <ActionLink
                      href={dashboardHref}
                      label="Dashboard"
                      onClick={onClose}
                    />
                  ) : (
                    <>
                      <NavLink
                        href={LOGIN_HREF}
                        label="Log in"
                        external
                        size={10}
                        onClick={onClose}
                      />
                      <ActionLink
                        href={SIGNUP_HREF}
                        label="Get scouted"
                        onClick={onClose}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
          )}
        </div>
      </FieldProvider>
    </motion.div>
  );
}

function IndexEntryLabel({
  label,
  active,
  full,
}: {
  label: string;
  active: boolean;
  full: boolean;
}) {
  const [hover, setHover] = useState(false);
  const live = hover || active;
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: SERIF,
        // Upright throughout — the italic is the headline's verdict move, and
        // it does not also get to mean "hovered".
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: full
          ? "clamp(2.4rem, 5.4vw, 4.4rem)"
          : "clamp(1.9rem, 8vw, 2.4rem)",
        letterSpacing: "-0.025em",
        lineHeight: 1,
        textTransform: "capitalize",
        color: live ? GOLD : "rgba(250,247,242,0.9)",
        transition: "color 0.36s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {label === "STUDIO+" ? "Studio+" : label.toLowerCase()}
    </span>
  );
}
