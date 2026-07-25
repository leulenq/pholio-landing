"use client";

/**
 * 02 — THE LEDGER
 *
 * Thesis: Pholio's nav isn't a list of pages, it's a two-sided market with two
 * entrances. So the header stops pretending to be a menu and becomes a ruled
 * grid — a call sheet, a registry line, the ruled margin of a booking ledger.
 * Vertical hairlines divide the bar into cells; each audience is a numbered
 * door rather than a nav word.
 *
 * Numbering is the Pholio-specific part. The site already speaks in clerical
 * mono (measurements, timestamps, contact-sheet frames); carrying that into the
 * top-level frame says "this is an instrument" without a single trust adjective.
 *
 * The action is a full-height gold cell. Not a pill — a plate, the tab on a
 * filing system: it earns weight from the grid it completes rather than from a
 * radius and a shadow. Nothing here moves on scroll, because a registry that
 * slides away isn't a registry.
 */

import { useState } from "react";
import Link from "next/link";

import {
  AccountCluster,
  EASE,
  FieldProvider,
  GOLD,
  GoldSweep,
  IndexPanel,
  IndexTrigger,
  MONO,
  NAV,
  Rule,
  SANS,
  SIGNUP_HREF,
  Wordmark,
  useHeaderState,
  useTokens,
  type HeaderVariantProps,
} from "./kit";
import { usePholioAuth } from "@/lib/pholio-auth/PholioAuthProvider";

const BAR_H = 66;

export default function VariantLedger({
  theme = "ink",
  preview = false,
  previewState,
}: HeaderVariantProps) {
  const { tokens, revealed, condensed, pathname, reduceMotion } =
    useHeaderState({ theme, preview, previewState });
  const { isAuthenticated, isLoading } = usePholioAuth();
  const [indexOpen, setIndexOpen] = useState(false);
  const T = reduceMotion ? "0s" : `0.5s cubic-bezier(${EASE.join(",")})`;

  return (
    <FieldProvider tokens={tokens}>
      <header
        data-site-header
        className={`${preview ? "absolute" : "fixed"} inset-x-0 top-0 z-[103]`}
        style={{
          background: tokens.surface,
          opacity: revealed ? 1 : 0,
          pointerEvents: revealed ? "auto" : "none",
          transition: `opacity ${T}, background ${T}`,
        }}
        aria-hidden={!revealed}
      >
        {/* Top rule — the bar is a ruled band, closed on both edges. */}
        <Rule />

        <div className="flex items-stretch" style={{ height: BAR_H }}>
          {/* ── Wordmark cell ───────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="Pholio — home"
            className="flex shrink-0 items-center px-6 focus:outline-none md:px-8"
            style={{ textDecoration: "none" }}
          >
            <Wordmark size={15} tracking={0.28} />
          </Link>
          <Rule vertical />

          {/* ── Doors ───────────────────────────────────────────────── */}
          <nav className="hidden items-stretch lg:flex">
            {NAV.map((link) => (
              <Cell
                key={link.href}
                href={link.href}
                index={link.index}
                label={link.label}
                active={pathname.startsWith(link.href)}
              />
            ))}
          </nav>

          {/* ── Open ledger space ───────────────────────────────────── */}
          <div className="flex-1" />

          {/* ── Account ─────────────────────────────────────────────── */}
          <div className="hidden items-center px-7 lg:flex">
            {/* The gold cell is this variant's action, so the cluster drops its own. */}
            <AccountCluster compact showAction={false} />
          </div>

          {/* ── The plate ───────────────────────────────────────────── */}
          {!isLoading && !isAuthenticated && (
            <a
              href={SIGNUP_HREF}
              className="hidden shrink-0 items-center px-9 focus:outline-none lg:flex"
              style={{
                background: GOLD,
                color: "#050505",
                fontFamily: SANS,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: `background ${T}`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#D4BC8A")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
            >
              Get scouted
            </a>
          )}

          {/* ── Mobile ──────────────────────────────────────────────── */}
          <div className="flex items-stretch lg:hidden">
            <Rule vertical />
            <div className="flex items-center px-6">
              <IndexTrigger
                open={indexOpen}
                onToggle={() => setIndexOpen((v) => !v)}
                tokens={tokens}
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <Rule
            color={condensed ? tokens.ruleStrong : tokens.rule}
            style={{ transition: `background ${T}` }}
          />
          <div className="absolute inset-x-0 top-0">
            <GoldSweep opacity={condensed ? 0.55 : 0} />
          </div>
        </div>
      </header>

      <IndexPanel
        open={indexOpen}
        onClose={() => setIndexOpen(false)}
        pathname={pathname}
        reduceMotion={reduceMotion}
        contained={preview}
        top={BAR_H + 2}
      />
    </FieldProvider>
  );
}

/**
 * One ruled cell. The hover state is a wash and a gold index number — the cell
 * itself lights, so the whole column reads as a door you step through rather
 * than a word you click.
 */
function Cell({
  href,
  index,
  label,
  active,
}: {
  href: string;
  index: string;
  label: string;
  active: boolean;
}) {
  const tokens = useTokens();
  const [hover, setHover] = useState(false);
  const live = hover || active;

  return (
    <>
      <Link
        href={href}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative flex flex-col justify-center px-7 focus:outline-none"
        style={{
          textDecoration: "none",
          background: hover ? tokens.wash : "transparent",
          transition: "background 0.34s cubic-bezier(0.22,1,0.36,1)",
          minWidth: 128,
        }}
        aria-current={active ? "page" : undefined}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 8.5,
            letterSpacing: "0.26em",
            color: live ? tokens.gold : tokens.textFaint,
            transition: "color 0.34s cubic-bezier(0.22,1,0.36,1)",
            marginBottom: 7,
          }}
        >
          {index}
        </span>
        <span
          style={{
            fontFamily: SANS,
            fontSize: 10.5,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: live ? tokens.text : tokens.textMuted,
            transition: "color 0.34s cubic-bezier(0.22,1,0.36,1)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
        {/* Live route: the cell is underscored along its full width. */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 2,
            background: tokens.gold,
            opacity: active ? 1 : 0,
            transition: "opacity 0.34s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </Link>
      <Rule vertical />
    </>
  );
}
