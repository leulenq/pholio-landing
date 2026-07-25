"use client";

/**
 * 04 — THE PLATE
 *
 * Thesis: Pholio already owns a piece of typographic anatomy nobody else on the
 * internet owns — the comp card. Every card in the product carries a clerical
 * margin above the image (a record: who, which frame, which edition) and closes
 * with the gold sweep. This direction applies that anatomy to page furniture,
 * so the header is recognisably the same object family as the thing the product
 * makes.
 *
 * Tier one is the record: the live section on the left, the positioning line on
 * the right, mono, quiet. Tier two is the plate: a centred serif masthead with
 * the audience doors held symmetrically either side of it — the composition an
 * agency board or a house masthead uses, and the one arrangement of the four
 * where the wordmark, not the CTA, is the strongest thing in the frame.
 *
 * On scroll the record collapses and the masthead settles, but it never breaks
 * symmetry and never leaves. The gold sweep is the bottom edge throughout.
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
  Kicker,
  NAV,
  NavLink,
  Rule,
  Wordmark,
  useHeaderState,
  type HeaderVariantProps,
} from "./kit";

/** The live section, rendered the way the product records a frame: `02 / TALENT`. */
function sectionRecord(pathname: string): string {
  const match = NAV.find((link) => pathname.startsWith(link.href));
  if (match) return `${match.index} / ${match.label}`;
  if (pathname === "/") return "00 / INDEX";
  const segment = pathname.split("/").filter(Boolean).pop() ?? "";
  return `— / ${segment.replace(/-/g, " ").toUpperCase()}`;
}

export default function VariantPlate({
  theme = "ink",
  preview = false,
  previewState,
}: HeaderVariantProps) {
  const { tokens, revealed, condensed, pathname, reduceMotion } =
    useHeaderState({ theme, preview, previewState });
  const [indexOpen, setIndexOpen] = useState(false);
  const T = reduceMotion ? "0s" : `0.55s cubic-bezier(${EASE.join(",")})`;

  const doors = NAV.filter((link) => link.kind === "door");
  const tier = NAV.filter((link) => link.kind === "tier");

  return (
    <FieldProvider tokens={tokens}>
      <header
        data-site-header
        className={`${preview ? "absolute" : "fixed"} inset-x-0 top-0 z-50`}
        style={{
          background: tokens.surface,
          opacity: revealed ? 1 : 0,
          pointerEvents: revealed ? "auto" : "none",
          transition: `opacity ${T}, background ${T}`,
        }}
        aria-hidden={!revealed}
      >
        {/* ── Tier 1 · the record ──────────────────────────────────── */}
        <div
          className="overflow-hidden"
          style={{
            height: condensed ? 0 : 29,
            opacity: condensed ? 0 : 1,
            transition: `height ${T}, opacity ${T}`,
          }}
        >
          <div
            className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 md:px-12"
            style={{ height: 29 }}
          >
            <Kicker size={8.5} tracking={0.28} color={tokens.gold}>
              {sectionRecord(pathname)}
            </Kicker>
            <Kicker size={8.5} tracking={0.28} className="hidden sm:inline">
              Built for talent · Trusted by agencies
            </Kicker>
          </div>
          <Rule />
        </div>

        {/* ── Tier 2 · the plate ───────────────────────────────────── */}
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12">
          <div
            className="grid items-center"
            style={{
              gridTemplateColumns: "1fr auto 1fr",
              height: condensed ? 56 : 64,
              transition: `height ${T}`,
            }}
          >
            {/* Left — the doors */}
            <nav
              className="hidden items-center justify-start lg:flex"
              style={{ gap: 30 }}
            >
              {doors.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={pathname.startsWith(link.href)}
                />
              ))}
            </nav>
            <div className="lg:hidden" />

            {/* Centre — the masthead */}
            <Link
              href="/"
              aria-label="Pholio — home"
              className="justify-self-center focus:outline-none"
              style={{ textDecoration: "none" }}
            >
              <Wordmark
                size={condensed ? 14 : 17}
                tracking={condensed ? 0.34 : 0.44}
                color={GOLD}
                weight={600}
                style={{ transition: `font-size ${T}, letter-spacing ${T}` }}
              />
            </Link>

            {/* Right — tier, account, action */}
            <div
              className="hidden items-center justify-end lg:flex"
              style={{ gap: 30 }}
            >
              {tier.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={pathname.startsWith(link.href)}
                />
              ))}
              <Rule vertical style={{ height: 15, alignSelf: "center" }} />
              <AccountCluster />
            </div>

            <div className="flex justify-end lg:hidden">
              <IndexTrigger
                open={indexOpen}
                onToggle={() => setIndexOpen((v) => !v)}
                tokens={tokens}
              />
            </div>
          </div>
        </div>

        {/* ── The sweep · the card's bottom edge ───────────────────── */}
        <div className="relative">
          <Rule color={tokens.rule} />
          <div className="absolute inset-x-0 top-0">
            <GoldSweep opacity={condensed ? 0.85 : 0.4} />
          </div>
        </div>
      </header>

      <IndexPanel
        open={indexOpen}
        onClose={() => setIndexOpen(false)}
        pathname={pathname}
        reduceMotion={reduceMotion}
        contained={preview}
        top={condensed ? 57 : 94}
      />
    </FieldProvider>
  );
}
