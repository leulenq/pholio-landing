"use client";

/**
 * Where the product actually stands.
 *
 * An About page for a company this young is a status report, and the honest
 * version of "what we're building" is two columns: what a person can use today,
 * and what is genuinely next. This is deliberately not the feature tour — that
 * is /talent's job, with the product frames to back it. Five lines, one
 * sentence each, on a hairline rail. No icon cards.
 *
 * The fifth line is the one that proves we know the industry: an inbound
 * submission has real states — kept on file is the most common non-rejection
 * outcome there is — and most software in this category flattens them into
 * won/lost. Ours doesn't.
 *
 * "Next" carries no dates on purpose. Dated roadmaps on a marketing page age
 * into a credibility problem within one quarter, and this page's whole argument
 * is that we do not publish things we cannot stand behind.
 */

import {
  Body,
  Display,
  FIELDS,
  Hairline,
  Label,
  Reveal,
  SANS,
  SERIF,
  MONO,
  SHELL,
  Verdict,
} from "@/components/about/kit";

const TODAY: { index: string; title: string; line: string }[] = [
  {
    index: "01",
    title: "The casting call",
    line: "Onboarding collects what a booker actually asks for — digitals, measurements, market, division — instead of a generic profile form.",
  },
  {
    index: "02",
    title: "The edit",
    line: "Your uploads are ranked so the strongest frames lead the book, and the weak ones stay out of the first impression.",
  },
  {
    index: "03",
    title: "The card",
    line: "A print-ready comp card composed from that same profile, alongside a public portfolio link that stays current when the book changes.",
  },
  {
    index: "04",
    title: "The submission",
    line: "You send the finished package to agencies that opted in, and you can see where each one stands rather than guessing.",
  },
  {
    index: "05",
    title: "The room",
    line: "Agencies read it in a workspace built for the real outcomes — in review, kept on file, shortlisted, met, signed — not a sales pipeline wearing a fashion coat.",
  },
];

const NEXT = [
  "Video and walk reels in the book.",
  "Comp-card editions — a catalogue of art directions rather than one house template.",
  "Casting alerts when a brief matches your stats.",
];

export default function AboutStanding() {
  return (
    <section
      className="relative texture-grain"
      style={{ background: FIELDS.cream.surface }}
    >
      <div className={`${SHELL} py-28 md:py-40`}>
        <Reveal>
          <Display style={{ maxWidth: "16ch" }}>
            What exists <Verdict>today</Verdict>, and what is next.
          </Display>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-16 md:mt-20 lg:grid-cols-[1.5fr_0.9fr] lg:gap-24">
          <Reveal delay={0.08}>
            <Label>Today</Label>
            <ol className="mt-8 list-none p-0" style={{ margin: "32px 0 0" }}>
              {TODAY.map((step) => (
                <li key={step.index}>
                  <Hairline />
                  <div className="flex gap-6 py-7 md:gap-10">
                    <span
                      aria-hidden
                      style={{
                        fontFamily: MONO,
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        color: FIELDS.cream.clerical,
                        lineHeight: 2.2,
                        flexShrink: 0,
                      }}
                    >
                      {step.index}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontFamily: SERIF,
                          fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)",
                          fontWeight: 400,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.2,
                          color: FIELDS.cream.text,
                          margin: 0,
                        }}
                      >
                        {step.title}
                      </h3>
                      <Body size={15} style={{ marginTop: 10, maxWidth: "56ch" }}>
                        {step.line}
                      </Body>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <Hairline />
          </Reveal>

          <Reveal
            delay={0.16}
            className="lg:border-l lg:pl-16"
            style={{ borderColor: FIELDS.cream.rule }}
          >
            <Label>Next</Label>
            <ul className="mt-8 list-none p-0" style={{ margin: "32px 0 0" }}>
              {NEXT.map((item) => (
                <li key={item} className="py-4">
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: 15,
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: FIELDS.cream.text,
                      margin: 0,
                    }}
                  >
                    {item}
                  </p>
                </li>
              ))}
            </ul>
            <Body size={13.5} style={{ marginTop: 20, maxWidth: "34ch" }}>
              No dates. A roadmap with quarters on it is a promise the calendar
              breaks; these ship when they are real.
            </Body>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
