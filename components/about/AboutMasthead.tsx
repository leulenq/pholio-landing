"use client";

/**
 * The masthead.
 *
 * Not a hero. The previous About page opened with a full-bleed photograph, a
 * parallaxing 35vw ghost word, a breathing radial glow and a scroll cue — a
 * cinematic entrance to a page whose actual job is to be believed. This opens
 * the way the legal documents do, because that is the register the page needs:
 * paper, a title, and the record of who is speaking.
 *
 * The record strip is the point. An About page for a young company in a
 * scam-heavy category earns more from four verifiable facts at the top than
 * from any amount of atmosphere.
 */

import { SUPPORT_EMAIL } from "@/lib/legal-constants";
import {
  Body,
  Display,
  Hairline,
  Label,
  Reveal,
  SHELL,
  Verdict,
  FIELDS,
  MONO,
  SANS,
} from "@/components/about/kit";

const RECORD: { label: string; value: string; href?: string }[] = [
  { label: "Company", value: "Pholio Studio, Inc." },
  { label: "Founded", value: "2024" },
  { label: "Team", value: "Remote-first" },
  { label: "Enquiries", value: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
];

export default function AboutMasthead() {
  return (
    <section
      className="relative texture-grain"
      style={{ background: FIELDS.cream.surface }}
    >
      <div className={`${SHELL} pt-36 pb-20 md:pt-44 md:pb-28`}>
        <Reveal>
          <Label>About Pholio</Label>
        </Reveal>

        <Reveal delay={0.06}>
          <Display
            as="h1"
            size="clamp(2.4rem, 5.6vw, 4.5rem)"
            style={{ marginTop: 28, maxWidth: "34ch" }}
          >
            The industry runs on judgement.
            {/* Two sentences, one per line from md up; left to wrap on phones. */}
            <br className="hidden md:inline" /> We build the{" "}
            <Verdict>instrument</Verdict>.
          </Display>
        </Reveal>

        <Reveal delay={0.12}>
          <Body size={18} style={{ marginTop: 36, maxWidth: "62ch" }}>
            Pholio is a portfolio and comp-card platform for models, actors and
            creatives, and a submission and roster workspace for the agencies
            that receive them. Talent build a professional book, compose a
            print-ready card, and submit it to agencies that chose to be
            reachable. Agencies read those submissions in one format instead of
            two hundred.
          </Body>
        </Reveal>

        <Reveal delay={0.18} style={{ marginTop: 56 }}>
          <Hairline />
          <dl className="grid grid-cols-2 gap-x-8 gap-y-7 pt-7 md:grid-cols-4">
            {RECORD.map((entry) => (
              <div key={entry.label}>
                <dt>
                  <Label>{entry.label}</Label>
                </dt>
                <dd
                  style={{
                    fontFamily: entry.href ? MONO : SANS,
                    fontSize: entry.href ? 12.5 : 13.5,
                    fontWeight: 400,
                    letterSpacing: entry.href ? "0.01em" : "0.005em",
                    color: FIELDS.cream.text,
                    marginTop: 12,
                  }}
                >
                  {entry.href ? (
                    <a
                      href={entry.href}
                      className="transition-colors duration-300"
                      style={{
                        color: FIELDS.cream.text,
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = FIELDS.cream.gold;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = FIELDS.cream.text;
                      }}
                    >
                      {entry.value}
                    </a>
                  ) : (
                    entry.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
