"use client";

/**
 * The Collective — kept, and corrected.
 *
 * Three things changed. The heading no longer says the company is "Engineered
 * by Visionaries"; a two-person team calling itself visionary is the exact
 * register this brand is supposed to be the opposite of. The biographies are no
 * longer hidden behind a hover — a `grid-rows-[0fr]` reveal is invisible to
 * every touch device and to anyone reading with a keyboard, and it was hiding
 * the only part of the section that does any work. And the claims are real:
 * "cryptographic identity infrastructure" describes nothing in this codebase.
 *
 * The advisor is a hairline row rather than a portrait tile, because there is
 * no portrait — a monogrammed circle standing in for a photograph reads as a
 * placeholder, which is worse than the honest typographic entry.
 *
 * Hover is a colour shift only (grayscale lifting to full colour). No scale:
 * scale is not how this system signals anything.
 */

import { useState } from "react";

import {
  Body,
  Display,
  FIELDS,
  Hairline,
  Label,
  Reveal,
  SERIF,
  SHELL,
  TextLink,
  Verdict,
} from "@/components/about/kit";

interface Founder {
  first: string;
  last: string;
  role: string;
  portrait: string;
  bio: string;
}

const FOUNDERS: Founder[] = [
  {
    first: "Leul",
    last: "Enquanhone",
    role: "Co-founder · Engineering",
    portrait: "/assets/Leul_Portrait.PNG",
    bio: "Leul builds the platform: the portfolio and comp-card engine, the submission pipeline, and the workspace agencies review in. Born in Ethiopia. If something on Pholio behaves the way it should, or doesn't, it is his code.",
  },
  {
    first: "Natan",
    last: "Getahun",
    role: "Co-founder · Business",
    portrait: "/assets/Natan_Portrait.png",
    bio: "Natan runs the business and the agency side — which agencies Pholio opens to, on what terms, and what we will and will not promise them. Born in Ethiopia. CEO of PXI Labs, Pholio's parent company.",
  },
];

const ADVISORS: { name: string; role: string; line: string }[] = [
  {
    name: "Alex Rieder",
    role: "Industry advisor",
    line: "Co-producer at Fashion Week Brooklyn. Tells us when a screen would not survive contact with a real casting, which is most of what an advisor is for.",
  },
];

function FounderCard({ founder, delay }: { founder: Founder; delay: number }) {
  const [hover, setHover] = useState(false);

  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "4 / 5",
            background: "#FFFFFF",
            boxShadow: `0 0 0 1px ${FIELDS.cream.rule}`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={founder.portrait}
            alt={`${founder.first} ${founder.last}`}
            className="h-full w-full object-cover"
            style={{
              filter: hover ? "grayscale(0)" : "grayscale(1)",
              transition: "filter 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
        </div>

        <div className="mt-7">
          <Label>{founder.role}</Label>
          <h3
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: FIELDS.cream.text,
              margin: "16px 0 0",
            }}
          >
            {founder.first}{" "}
            <span
              className="font-editorial-italic"
              style={{ color: FIELDS.cream.gold }}
            >
              {founder.last}
            </span>
          </h3>
          <Body size={15} style={{ marginTop: 16, maxWidth: "44ch" }}>
            {founder.bio}
          </Body>
        </div>
      </div>
    </Reveal>
  );
}

export default function AboutCollective() {
  return (
    <section
      className="relative texture-grain"
      style={{ background: FIELDS.cream.surface }}
    >
      <div className={`${SHELL} pb-28 md:pb-40`}>
        <Reveal>
          <Label>The Collective</Label>
        </Reveal>

        <Reveal delay={0.06}>
          <Display style={{ marginTop: 26, maxWidth: "20ch" }}>
            Two founders, and the people who keep us{" "}
            <Verdict>honest</Verdict>.
          </Display>
        </Reveal>

        <Reveal delay={0.12}>
          <Body style={{ marginTop: 26, maxWidth: "56ch" }}>
            Pholio is small. That is a fact about the company rather than a
            marketing position: two founders build it, and people who work
            inside the industry it serves tell us when we have got it wrong.
          </Body>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-14 md:mt-20 md:grid-cols-2 md:gap-20">
          {FOUNDERS.map((founder, i) => (
            <FounderCard
              key={founder.last}
              founder={founder}
              delay={i * 0.08}
            />
          ))}
        </div>

        <Reveal delay={0.1} style={{ marginTop: 72 }}>
          <Label>Advisors</Label>
          <div className="mt-8">
            {ADVISORS.map((advisor) => (
              <div key={advisor.name}>
                <Hairline />
                <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
                  <div>
                    <h3
                      style={{
                        fontFamily: SERIF,
                        fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                        fontWeight: 400,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.1,
                        color: FIELDS.cream.text,
                        margin: 0,
                      }}
                    >
                      {advisor.name}
                    </h3>
                    <Label style={{ marginTop: 12 }}>{advisor.role}</Label>
                  </div>
                  <Body size={15} style={{ maxWidth: "52ch" }}>
                    {advisor.line}
                  </Body>
                </div>
              </div>
            ))}
            <Hairline />
          </div>
        </Reveal>

        <Reveal delay={0.14} style={{ marginTop: 40 }}>
          <TextLink href="/careers">We are hiring — open roles</TextLink>
        </Reveal>
      </div>
    </section>
  );
}
