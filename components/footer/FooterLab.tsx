"use client";

/**
 * Side-by-side critique of the footer directions.
 *
 * Each direction is rendered at full size — a footer cannot be judged as a
 * thumbnail, since the whole question is how much weight it puts at the bottom
 * of a page. The field toggle matters as much as the direction toggle: the
 * open question of whether the site should always end on ink is answered by
 * looking, not by arguing.
 */

import { useState } from "react";

import { FOOTER_VARIANTS, type FooterVariantId } from "@/lib/footer-variants";
import { FOOTER_COMPONENTS } from "@/components/footer";
import { GOLD, MONO, SANS, SERIF, TOKENS, type Field } from "@/components/header/kit";

export default function FooterLab() {
  const [field, setField] = useState<Field>("cream");
  const [only, setOnly] = useState<FooterVariantId | "all">("all");

  const shown = FOOTER_VARIANTS.filter((v) => only === "all" || v.id === only);

  return (
    <main style={{ background: "#0B0B0C", minHeight: "100vh" }}>
      {/* Controls. Sticky, deliberately plain — lab furniture, not brand.
          Stacked above the sitewide header (z-103), which is fixed and would
          otherwise sit on top of the toggles and swallow their clicks. */}
      <div
        className="sticky top-0 flex flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4 md:px-12"
        style={{
          zIndex: 120,
          background: "#0B0B0C",
          borderBottom: "1px solid rgba(250,247,242,0.12)",
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: GOLD,
          }}
        >
          Footer directions
        </span>

        <Group label="Field">
          {(["ink", "cream"] as Field[]).map((f) => (
            <Toggle key={f} active={field === f} onClick={() => setField(f)}>
              {f}
            </Toggle>
          ))}
        </Group>

        <Group label="Show">
          <Toggle active={only === "all"} onClick={() => setOnly("all")}>
            all
          </Toggle>
          {FOOTER_VARIANTS.map((v) => (
            <Toggle key={v.id} active={only === v.id} onClick={() => setOnly(v.id)}>
              {v.index}
            </Toggle>
          ))}
        </Group>

        <span
          style={{
            fontFamily: MONO,
            fontSize: 9.5,
            color: "rgba(250,247,242,0.4)",
            letterSpacing: "0.06em",
          }}
        >
          Pin one site-wide with ?footer=&lt;id&gt; · clear with ?footer=reset
        </span>
      </div>

      {/* The standard all three are held to, stated once so the comparison is
          about organisation rather than about which one looks loudest. */}
      <div className="mx-auto max-w-[1440px] px-6 pt-14 md:px-12">
        <p
          style={{
            fontFamily: SANS,
            fontSize: 13.5,
            lineHeight: 1.7,
            color: "rgba(250,247,242,0.55)",
            maxWidth: "78ch",
            margin: 0,
          }}
        >
          A footer is a service counter, not a second header and not a sitemap:
          people who scroll here are verifying or hunting one specific thing.
          All three directions therefore share the same constraints — small type
          only, no display headline, the page&rsquo;s own paper closed by a single
          hairline, labelled semantic sections, and legal treated as primary
          content. They differ only in how the links are organised.
        </p>
      </div>

      {shown.map((variant) => {
        const Footer = FOOTER_COMPONENTS[variant.id];
        return (
          <section key={variant.id}>
            {/* The brief for this direction, then the direction itself. */}
            <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-16 md:px-12">
              <div className="flex items-baseline gap-4">
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    color: GOLD,
                  }}
                >
                  {variant.index}
                </span>
                <h2
                  style={{
                    fontFamily: SERIF,
                    fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    color: "#FAF7F2",
                    margin: 0,
                  }}
                >
                  {variant.name}
                </h2>
              </div>

              <p
                style={{
                  fontFamily: SANS,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "rgba(250,247,242,0.72)",
                  maxWidth: "70ch",
                  marginTop: 16,
                }}
              >
                {variant.thesis}
              </p>

              <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-3">
                <Fact term="Organised">{variant.organised}</Fact>
                <Fact term="The move">{variant.move}</Fact>
                <Fact term="Tradeoff">{variant.tradeoff}</Fact>
              </dl>
            </div>

            {/* Sat on a slab of the field's paper, so the footer's own top
                edge (the gold sweep) is read against a real page, not a gap. */}
            <div style={{ background: TOKENS[field].surface, height: 72 }} />
            <Footer field={field} />
            <div style={{ height: 64 }} />
          </section>
        );
      })}
    </main>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span
        style={{
          fontFamily: MONO,
          fontSize: 9,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(250,247,242,0.35)",
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: MONO,
        fontSize: 10,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: active ? "#050505" : "rgba(250,247,242,0.6)",
        background: active ? GOLD : "transparent",
        border: `1px solid ${active ? GOLD : "rgba(250,247,242,0.2)"}`,
        padding: "4px 10px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function Fact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div>
      <dt
        style={{
          fontFamily: MONO,
          fontSize: 9,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(250,247,242,0.38)",
        }}
      >
        {term}
      </dt>
      <dd
        style={{
          fontFamily: SANS,
          fontSize: 12.5,
          lineHeight: 1.6,
          color: "rgba(250,247,242,0.6)",
          margin: "8px 0 0",
        }}
      >
        {children}
      </dd>
    </div>
  );
}
