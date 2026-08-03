"use client";

/**
 * The close.
 *
 * This carries the line the whole page was written toward — "Building the next
 * standard for identity in the digital age" — which was previously the last
 * decorative gesture on the page, sitting above a pulsing monogram ring and a
 * tracked-out "Pholio Studio Established 2024". It is a positioning statement,
 * so it gets the position: a section headline, one paragraph explaining what
 * "standard" means concretely, and the three real doors out of this page.
 *
 * The band is ink and runs straight into the ink footer; the footer's own gold
 * sweep is the seam between them, which is the job that rule exists to do.
 * Prominence in the action row is colour — "Get scouted" at full strength
 * against two muted siblings. No buttons, no fills.
 */

import {
  Body,
  Display,
  FIELDS,
  Grain,
  Hairline,
  Reveal,
  MONO,
  SHELL,
  TextLink,
  Verdict,
} from "@/components/about/kit";
import { FREE_ONBOARDING_URL } from "@/lib/marketing-pricing";
import { SUPPORT_EMAIL } from "@/lib/legal-constants";

export default function AboutClose() {
  return (
    <section className="relative" style={{ background: FIELDS.ink.surface }}>
      <Grain opacity={0.045} />

      <div className={`${SHELL} relative z-10 py-28 md:py-40`}>
        <Reveal>
          <Display
            field="ink"
            size="clamp(2.3rem, 5.4vw, 4.5rem)"
            style={{ maxWidth: "20ch" }}
          >
            Building the next <Verdict field="ink">standard</Verdict> for
            identity in the digital age.
          </Display>
        </Reveal>

        <Reveal delay={0.08}>
          <Body field="ink" size={17} style={{ marginTop: 34, maxWidth: "62ch" }}>
            In this industry a professional identity still travels as a PDF in a
            group chat — copied, renamed, out of date by the time it is opened.
            It should be yours: portable, current, and checkable. The book, the
            measurements, the record of who has actually looked. That is the
            standard we are working toward, and Pholio is the first instrument
            of it.
          </Body>
        </Reveal>

        <Reveal delay={0.14} style={{ marginTop: 56 }}>
          <Hairline color={FIELDS.ink.rule} />
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5 pt-8">
            <TextLink
              href={FREE_ONBOARDING_URL}
              field="ink"
              strength="action"
              external
            >
              Get scouted
            </TextLink>
            <TextLink href="/agency/request-access" field="ink">
              Request agency access
            </TextLink>
            <TextLink href="/contact" field="ink">
              Talk to us
            </TextLink>
          </div>
        </Reveal>

        <Reveal delay={0.2} style={{ marginTop: 64 }}>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: FIELDS.ink.clerical,
              lineHeight: 1.9,
              margin: 0,
            }}
          >
            Pholio Studio, Inc. · Founded 2024 · Remote-first ·{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {SUPPORT_EMAIL}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
