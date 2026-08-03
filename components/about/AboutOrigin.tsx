"use client";

/**
 * Why the company exists.
 *
 * The retired version of this beat ("Discovery is fragmented", "algorithmic
 * noise", "superficial metrics") argued with an abstraction. This one describes
 * the two concrete rooms Pholio was built between — the camera roll and the
 * submission inbox — because that is the part a reader can check against their
 * own experience, and because the pull quote in the middle is the single
 * truest sentence on the site.
 *
 * Composition is the asymmetric editorial spread the old section got right:
 * heading left, argument right, an open gutter and one hairline between them.
 */

import {
  Body,
  Display,
  FIELDS,
  Reveal,
  SERIF,
  SHELL,
  Verdict,
} from "@/components/about/kit";

export default function AboutOrigin() {
  return (
    <section
      className="relative texture-grain"
      style={{ background: FIELDS.cream.surface }}
    >
      <div className={`${SHELL} pb-28 md:pb-40`}>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[42fr_58fr] lg:gap-24">
          <Reveal>
            <Display style={{ maxWidth: "12ch" }}>
              The problem was never the <Verdict>talent</Verdict>.
            </Display>
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex flex-col gap-9 lg:border-l lg:pl-16"
            style={{ borderColor: FIELDS.cream.rule }}
          >
            <Body>
              A working model&rsquo;s professional identity lives in a camera
              roll, a comp card rebuilt in a design app the night before a
              go-see, and a message sent into an inbox that will not answer. On
              the other side of that message an agency is opening several
              hundred submissions a week — screenshots, dead links, stats that
              do not match the pictures, no consistent way to file the ones
              worth keeping.
            </Body>

            <p
              className="font-editorial-italic"
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
                lineHeight: 1.28,
                letterSpacing: "-0.02em",
                color: FIELDS.cream.gold,
                margin: 0,
                maxWidth: "20ch",
              }}
            >
              Most submissions never get a no. They get nothing.
            </p>

            <Body>
              Both sides are improvising the same missing format. Pholio is that
              format and the tools around it: a submission that arrives
              complete, a sender who can see what happened to it, and a reader
              with something worth reading. We are not trying to replace the
              judgement in this industry. We are trying to give it better
              material to work with.
            </Body>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
