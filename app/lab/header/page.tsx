"use client";

/**
 * /lab/header — the critique surface.
 *
 * Four header directions, each rendered live against both fields the site uses,
 * in both scroll states, with the reasoning and the cost of each written next to
 * it. Apply any of them across the whole site with one click; `?header=reset`
 * returns to the current header.
 */

/* Plain <a> throughout: applying a direction has to be a full page load so the
   header override is picked up from the query string, not a client transition. */
import { useState, type CSSProperties, type ReactNode } from "react";

import { HEADER_VARIANTS, type HeaderVariantId } from "@/lib/header-variants";
import { HEADER_COMPONENTS } from "@/components/header";

const GOLD = "#C9A55A";
const GOLD_DARK = "#A8894E";
const INK = "#0F172A";
const SERIF = "var(--font-serif)";
const SANS = "var(--font-sans)";
const MONO = "var(--font-mono)";

/** What the header actually has to do, before any of it is styled. */
const JOBS = [
  {
    n: "01",
    title: "Certify",
    body: "Talent arrive scam-burned, from an Instagram link, deciding in three seconds whether this is real. The header is the first institutional signal on the page — it either reads as a house or as a template.",
  },
  {
    n: "02",
    title: "Sort",
    body: "Two audiences with opposite questions arrive at the same URL. The header is the only element on every page that can put both doors in front of both of them without a landing page choosing for them.",
  },
  {
    n: "03",
    title: "Hold the frame",
    body: "The site is a sequence of full-bleed cinematic scenes. The header is the one constant across all of them, so it is what makes twelve very different pages read as one publication.",
  },
  {
    n: "04",
    title: "Get out of the way",
    body: "It sits over scroll-driven 3D, portraits and video for most of its life. Anything with a shape, a shadow or a blur is a rectangle on someone's photograph.",
  },
  {
    n: "05",
    title: "Convert without shouting",
    body: "One action, permanently visible, that never uses urgency or a gradient to earn the click — because the anti-reference here is the scam-adjacent modelling site, and it is loud.",
  },
];

const REJECTED = [
  ["Glassmorphic pill", "Blur is a rescue for a boxed header floating over imagery. Remove the box and the problem it solves disappears — which is why none of the four use it."],
  ["Vertical spine / side rail", "Genuinely fashion-native (agency boards use it), but it fights every full-bleed scene on this site and steals width from the comp-card showcase."],
  ["Logo-only, nav in footer", "Too withheld for a two-sided market: agencies never find their door."],
  ["Serif nav words", "Reads costume. The clerical layer is what makes Pholio credible; the serif belongs to headlines and the wordmark, not to furniture."],
];

export default function HeaderLabPage() {
  return (
    <main style={{ background: "#FAF7F2", color: INK, minHeight: "100vh" }}>
      <div className="mx-auto w-full max-w-[1080px] px-6 pb-32 pt-40 md:px-10">
        {/* ── Brief ────────────────────────────────────────────────── */}
        <Kicker>Header · Directions · 2026</Kicker>
        <h1
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(2.6rem, 6vw, 4.4rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            marginTop: 26,
            maxWidth: "14ch",
          }}
        >
          Four ways to{" "}
          <span style={{ fontFamily: SERIF, fontStyle: "italic", color: GOLD }}>frame</span> Pholio.
        </h1>
        <p
          style={{
            fontFamily: SANS,
            fontSize: 15.5,
            lineHeight: 1.75,
            color: "rgba(15,23,42,0.66)",
            marginTop: 30,
            maxWidth: "62ch",
          }}
        >
          Not four restyled nav bars. Four different answers to what belongs at the top of this
          site — each with its own structure, its own scroll behaviour, and its own idea of what
          the action is allowed to look like. Every one is live: apply it and walk the whole site.
        </p>

        <div style={{ height: 1, background: "rgba(15,23,42,0.12)", margin: "64px 0 0" }} />

        {/* ── The brief ────────────────────────────────────────────── */}
        <Section title="What a Pholio header has to do" number="I">
          <div className="grid gap-x-14 gap-y-9 md:grid-cols-2">
            {JOBS.map((job) => (
              <div key={job.n}>
                <div className="flex items-baseline gap-3">
                  <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.24em", color: GOLD_DARK }}>
                    {job.n}
                  </span>
                  <span style={{ fontFamily: SERIF, fontSize: 20, letterSpacing: "-0.01em" }}>
                    {job.title}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: 13.5,
                    lineHeight: 1.72,
                    color: "rgba(15,23,42,0.62)",
                    marginTop: 10,
                  }}
                >
                  {job.body}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: SANS,
              fontSize: 13.5,
              lineHeight: 1.75,
              color: "rgba(15,23,42,0.62)",
              marginTop: 44,
              paddingLeft: 18,
              borderLeft: `1px solid ${GOLD}`,
              maxWidth: "70ch",
            }}
          >
            Jobs 03 and 04 are in direct tension — the frame wants to be permanent, the imagery
            wants it gone. Each direction below resolves that tension differently, and that, more
            than any surface treatment, is what you are choosing between.
          </p>
        </Section>

        {/* ── Directions ───────────────────────────────────────────── */}
        <Section title="The directions" number="II">
          <div className="flex flex-col gap-24">
            {HEADER_VARIANTS.filter((v) => v.id !== "current").map((variant) => (
              <Direction key={variant.id} variant={variant} />
            ))}
          </div>
        </Section>

        {/* ── Comparison ───────────────────────────────────────────── */}
        <Section title="Side by side" number="III">
          <Matrix />
        </Section>

        {/* ── Rejected ─────────────────────────────────────────────── */}
        <Section title="Considered and dropped" number="IV">
          <div className="flex flex-col">
            {REJECTED.map(([name, why]) => (
              <div key={name} className="grid gap-2 py-5 md:grid-cols-[220px_1fr] md:gap-10" style={{ borderTop: "1px solid rgba(15,23,42,0.1)" }}>
                <span style={{ fontFamily: SERIF, fontSize: 17 }}>{name}</span>
                <span style={{ fontFamily: SANS, fontSize: 13.5, lineHeight: 1.7, color: "rgba(15,23,42,0.62)" }}>
                  {why}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Reset ────────────────────────────────────────────────── */}
        <div style={{ borderTop: "1px solid rgba(15,23,42,0.12)", marginTop: 90, paddingTop: 28 }}>
          <a href="/lab/header?header=reset" style={linkStyle}>
            Restore the current header
          </a>
        </div>
      </div>
    </main>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ONE DIRECTION
   ══════════════════════════════════════════════════════════════════════ */

function Direction({ variant }: { variant: (typeof HEADER_VARIANTS)[number] }) {
  const [state, setState] = useState<"rest" | "settled">("rest");
  const Header = HEADER_COMPONENTS[variant.id as HeaderVariantId];
  const tall = variant.id === "index";

  return (
    <article>
      <div className="flex items-baseline gap-4">
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.24em", color: GOLD_DARK }}>
          {variant.index}
        </span>
        <h3 style={{ fontFamily: SERIF, fontSize: "clamp(1.7rem, 3.4vw, 2.3rem)", letterSpacing: "-0.02em" }}>
          {variant.name}
        </h3>
      </div>

      <p
        style={{
          fontFamily: SANS,
          fontSize: 14.5,
          lineHeight: 1.75,
          color: "rgba(15,23,42,0.68)",
          marginTop: 16,
          maxWidth: "68ch",
        }}
      >
        {variant.thesis}
      </p>

      {/* Live frames */}
      <div className="mt-9 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Kicker small>Live — ink field</Kicker>
          {variant.id !== "index" && (
            <StateToggle value={state} onChange={setState} />
          )}
        </div>
        <Frame field="ink" tall={tall}>
          <Header theme="ink" preview previewState={state} />
        </Frame>

        <div className="mt-4">
          <Kicker small>Live — cream field</Kicker>
        </div>
        <Frame field="cream" tall={tall}>
          <Header theme="cream" preview previewState={state} />
        </Frame>

        {variant.id === "index" && (
          <p style={{ fontFamily: SANS, fontSize: 12, color: "rgba(15,23,42,0.45)", marginTop: 4 }}>
            Click INDEX in either frame to open the drawer.
          </p>
        )}
      </div>

      {/* Spec */}
      <dl className="mt-9 grid gap-x-10 gap-y-5 md:grid-cols-2">
        <Spec term="Structure" value={variant.structure} />
        <Spec term="Behaviour" value={variant.behaviour} />
        <Spec term="Action" value={variant.cta} />
        <Spec term="What it costs" value={variant.tradeoff} accent />
      </dl>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
        <a href={`/?header=${variant.id}`} style={{ ...linkStyle, color: INK }}>
          Apply sitewide → home
        </a>
        <a href={`/talent?header=${variant.id}`} style={linkStyle}>
          → /talent
        </a>
        <a href={`/studio-plus?header=${variant.id}`} style={linkStyle}>
          → /studio-plus
        </a>
        <a href={`/privacy?header=${variant.id}`} style={linkStyle}>
          → cream page
        </a>
      </div>
    </article>
  );
}

/** A header sitting on a stand-in page, so it is judged against content. */
function Frame({
  field,
  tall,
  children,
}: {
  field: "ink" | "cream";
  tall?: boolean;
  children: ReactNode;
}) {
  const ink = field === "ink";
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: tall ? 440 : 260,
        background: ink ? "#050505" : "#FAF7F2",
        border: "1px solid rgba(15,23,42,0.12)",
      }}
    >
      {/* Stand-in page beneath the header */}
      <div className="absolute inset-x-0 bottom-0 px-8 pb-9 md:px-12">
        <span
          style={{
            fontFamily: MONO,
            fontSize: 9,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: ink ? "rgba(250,247,242,0.34)" : "rgba(15,23,42,0.38)",
          }}
        >
          The page beneath
        </span>
        <p
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            color: ink ? "#FAF7F2" : INK,
            marginTop: 14,
            maxWidth: "20ch",
          }}
        >
          Every card is{" "}
          <span style={{ fontFamily: SERIF, fontStyle: "italic", color: GOLD }}>verified</span>{" "}
          before an agency sees it.
        </p>
      </div>
      {children}
    </div>
  );
}

function StateToggle({
  value,
  onChange,
}: {
  value: "rest" | "settled";
  onChange: (v: "rest" | "settled") => void;
}) {
  return (
    <div className="flex items-center gap-5">
      {(["rest", "settled"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          style={{
            background: "none",
            border: "none",
            padding: "2px 0",
            fontFamily: MONO,
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: value === option ? GOLD_DARK : "rgba(15,23,42,0.38)",
            borderBottom: `1px solid ${value === option ? GOLD : "transparent"}`,
            cursor: "pointer",
          }}
        >
          {option === "rest" ? "Top of page" : "Scrolled"}
        </button>
      ))}
    </div>
  );
}

function Spec({ term, value, accent }: { term: string; value: string; accent?: boolean }) {
  return (
    <div style={{ borderTop: `1px solid ${accent ? "rgba(201,165,90,0.5)" : "rgba(15,23,42,0.12)"}`, paddingTop: 12 }}>
      <dt style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: accent ? GOLD_DARK : "rgba(15,23,42,0.4)" }}>
        {term}
      </dt>
      <dd style={{ fontFamily: SANS, fontSize: 13.5, lineHeight: 1.7, color: "rgba(15,23,42,0.72)", marginTop: 8 }}>
        {value}
      </dd>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MATRIX
   ══════════════════════════════════════════════════════════════════════ */

const MATRIX_ROWS: [string, string, string, string, string][] = [
  ["Presence over imagery", "Medium", "Heavy", "None", "Medium"],
  ["Brand assertion", "High", "Medium", "Highest, on demand", "Highest, always"],
  ["Nav discoverability", "High", "Highest", "Low until opened", "High"],
  ["Scales to more pages", "Yes", "Poorly", "Yes", "Awkwardly"],
  ["Feels most like", "A magazine", "A registry", "A fashion house", "A comp card"],
  ["Risk", "Familiar", "Busy", "Hidden", "Formal"],
];

function Matrix() {
  return (
    <div className="w-full overflow-x-auto">
      <table style={{ width: "100%", minWidth: 720, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle} />
            {["01 Masthead", "02 Ledger", "03 Index", "04 Plate"].map((h) => (
              <th key={h} style={{ ...thStyle, color: GOLD_DARK }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MATRIX_ROWS.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  style={{
                    borderTop: "1px solid rgba(15,23,42,0.1)",
                    padding: "14px 16px 14px 0",
                    fontFamily: i === 0 ? SANS : SANS,
                    fontSize: 13,
                    fontWeight: i === 0 ? 500 : 400,
                    color: i === 0 ? INK : "rgba(15,23,42,0.62)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle: CSSProperties = {
  textAlign: "left",
  padding: "0 16px 12px 0",
  fontFamily: MONO,
  fontSize: 9,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "rgba(15,23,42,0.4)",
  fontWeight: 400,
  whiteSpace: "nowrap",
};

/* ══════════════════════════════════════════════════════════════════════
   FURNITURE
   ══════════════════════════════════════════════════════════════════════ */

function Section({
  title,
  number,
  children,
}: {
  title: string;
  number: string;
  children: ReactNode;
}) {
  return (
    <section style={{ paddingTop: 78 }}>
      <div className="mb-11 flex items-baseline gap-4">
        <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.24em", color: GOLD_DARK }}>
          {number}
        </span>
        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Kicker({ children, small }: { children: ReactNode; small?: boolean }) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: small ? 9 : 10,
        letterSpacing: "0.26em",
        textTransform: "uppercase",
        color: "rgba(15,23,42,0.42)",
      }}
    >
      {children}
    </span>
  );
}

const linkStyle: CSSProperties = {
  fontFamily: SANS,
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(15,23,42,0.55)",
  textDecoration: "none",
  borderBottom: `1px solid ${GOLD}`,
  paddingBottom: 3,
};
