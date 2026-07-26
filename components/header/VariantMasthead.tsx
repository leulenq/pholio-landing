"use client";

/**
 * 01 — THE MASTHEAD
 *
 * Thesis: the header is the top edge of the page grid, not an object floating
 * over it. So: full bleed, no container, no radius, no shadow, no blur. One
 * hairline holds the whole thing, exactly as a magazine masthead sits on the
 * rule that starts the page.
 *
 * The move is *condensation*, not concealment. At the top of a page the
 * wordmark is at display scale with a wide clerical index beside it; by 96px of
 * scroll it has settled into a running head — smaller, tighter, on solid paper.
 * It never hides. Hiding a masthead is a SaaS reflex: it treats the frame as
 * something in the way rather than something the reader navigates by.
 *
 * Hierarchy is typographic only. The action is a word with a gold rule under
 * it, the same weight of mark as the live-route indicator — Pholio does not
 * need a filled button to be worth clicking.
 */

import { useState } from "react";
import Link from "next/link";

import {
  AccountCluster,
  EASE,
  FieldProvider,
  GoldSweep,
  IndexPanel,
  IndexTrigger,
  Kicker,
  NAV,
  NavLink,
  Rule,
  Wordmark,
  useHeaderState,
  type HeaderVariantProps,
} from "./kit";

export default function VariantMasthead({
  theme = "ink",
  preview = false,
  previewState,
}: HeaderVariantProps) {
  const { tokens, revealed, condensed, pathname, reduceMotion } =
    useHeaderState({ theme, preview, previewState });
  const [indexOpen, setIndexOpen] = useState(false);

  // One ease across the whole condensation; reduced motion collapses it to 0s.
  const T = reduceMotion ? "0s" : `0.6s cubic-bezier(${EASE.join(",")})`;
  const height = condensed ? 60 : 92;

  return (
    <FieldProvider tokens={tokens}>
      <header
        data-site-header
        className={`${preview ? "absolute" : "fixed"} inset-x-0 top-0 z-[103]`}
        style={{
          opacity: revealed ? 1 : 0,
          pointerEvents: revealed ? "auto" : "none",
          transition: `opacity ${T}`,
        }}
        aria-hidden={!revealed}
      >
        {/* Paper. Transparent at the top of the page so the header reads as part
            of the composition; solid once it becomes a running head. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: tokens.surface,
            opacity: condensed ? 1 : 0,
            transition: `opacity ${T}`,
          }}
        />

        <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12">
          <div
            className="flex items-center justify-between"
            style={{ height, transition: `height ${T}` }}
          >
            {/* ── Masthead ─────────────────────────────────────────── */}
            <Link
              href="/"
              aria-label="Pholio — home"
              className="focus:outline-none"
              style={{ textDecoration: "none" }}
            >
              <span className="flex items-baseline gap-4">
                <Wordmark
                  size={condensed ? 15 : 25}
                  tracking={condensed ? 0.26 : 0.34}
                  style={{
                    transition: `font-size ${T}, letter-spacing ${T}, color ${T}`,
                  }}
                />
                {/* The clerical descriptor only survives at full scale — the
                    running head drops it, the way a spread drops the cover line. */}
                <span
                  className="hidden md:inline"
                  style={{
                    opacity: condensed ? 0 : 1,
                    transform: condensed ? "translateX(-6px)" : "none",
                    transition: `opacity ${T}, transform ${T}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  <Kicker>Verified talent</Kicker>
                </span>
              </span>
            </Link>

            {/* ── Index ────────────────────────────────────────────── */}
            <nav className="hidden items-center lg:flex" style={{ gap: 34 }}>
              {NAV.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={pathname.startsWith(link.href)}
                />
              ))}
              <Rule vertical style={{ height: 16, alignSelf: "center" }} />
              <AccountCluster />
            </nav>

            {/* ── Mobile ───────────────────────────────────────────── */}
            <div className="lg:hidden">
              <IndexTrigger
                open={indexOpen}
                onToggle={() => setIndexOpen((v) => !v)}
                tokens={tokens}
              />
            </div>
          </div>
        </div>

        {/* The rule. Always present, gaining density as the header settles —
            the page's first horizontal, not a border around a box. */}
        <div className="relative">
          <Rule
            color={condensed ? tokens.ruleStrong : tokens.rule}
            style={{ transition: `background ${T}` }}
          />
          <div className="absolute inset-x-0 top-0">
            <GoldSweep opacity={condensed ? 0.5 : 0} />
          </div>
        </div>
      </header>

      <IndexPanel
        open={indexOpen}
        onClose={() => setIndexOpen(false)}
        pathname={pathname}
        reduceMotion={reduceMotion}
        contained={preview}
        top={height}
      />
    </FieldProvider>
  );
}
