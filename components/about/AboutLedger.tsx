"use client";

/**
 * The ledger — what Pholio is, what it is not, and what it costs.
 *
 * This section replaces "The Three Standard Pillars", which claimed a
 * multi-layer verification of every data point "from height to past bookings"
 * and the elimination of guesswork from scouting. None of that is true of the
 * product, and in this category an unverifiable claim is not neutral: the
 * audience is people who have already been lied to by a website.
 *
 * So the pillars become a ledger. Everything below is checkable against the
 * product, the Terms, the AI Notice, or an invoice. The commercial rows carry
 * the numbers rather than gesturing at them — the free monthly cap and the fact
 * that open-call submissions are exempt from it, the Studio+ price and what it
 * does and does not buy, that agencies pay nothing and that we never touch a
 * fee for anyone's work.
 */

import {
  Body,
  Display,
  FIELDS,
  Hairline,
  Label,
  Reveal,
  SANS,
  SHELL,
  Verdict,
} from "@/components/about/kit";
import {
  FREE_MONTHLY_SUBMISSIONS,
  STUDIO_PLUS_PRICE_ANNUAL,
  STUDIO_PLUS_PRICE_MONTHLY,
  STUDIO_PLUS_TRIAL_DAYS,
  formatMoney,
} from "@/lib/marketing-pricing";

const IS = [
  "A portfolio and comp-card system for talent.",
  "A submission channel to agencies that chose to receive them.",
  "A review, roster and casting workspace for those agencies.",
  "An edit that ranks the photographs you already took.",
];

const IS_NOT = [
  "An agency. We represent nobody.",
  "A booker. We arrange no work and negotiate no rate.",
  "A guarantee. No submission here buys an outcome.",
  "A paid placement. Ranking and discovery are not for sale.",
  "A party to your money. We take no commission, ever.",
];

const COMMERCIAL: { label: string; body: string }[] = [
  {
    label: "Applying",
    body: `Free. A free account sends ${FREE_MONTHLY_SUBMISSIONS} submissions a month, and submissions made through an agency's own open-call link do not count against that.`,
  },
  {
    label: "Studio+",
    body: `$${formatMoney(STUDIO_PLUS_PRICE_MONTHLY)} a month or $${formatMoney(
      STUDIO_PLUS_PRICE_ANNUAL,
    )} a year, after a ${STUDIO_PLUS_TRIAL_DAYS}-day trial. It buys presentation, scale, analytics and export — never a safety control, a privacy control, or a place in a queue.`,
  },
  {
    label: "Agencies",
    body: "Pay nothing. There is no agency plan, no per-seat fee and no commission. Pholio never handles payment for work.",
  },
  {
    label: "Access",
    body: "Agency accounts are reviewed and provisioned by us rather than opened on demand, so the roster on the other end of a submission is a real one.",
  },
];

function LedgerColumn({
  heading,
  items,
}: {
  heading: string;
  items: string[];
}) {
  return (
    <div>
      <Label>{heading}</Label>
      <ul className="mt-6 list-none p-0" style={{ margin: "24px 0 0" }}>
        {items.map((item) => (
          <li key={item}>
            <Hairline />
            <p
              style={{
                fontFamily: SANS,
                fontSize: 15.5,
                fontWeight: 300,
                lineHeight: 1.55,
                color: FIELDS.cream.text,
                margin: 0,
                padding: "18px 0",
              }}
            >
              {item}
            </p>
          </li>
        ))}
      </ul>
      <Hairline />
    </div>
  );
}

export default function AboutLedger() {
  return (
    <section
      className="relative texture-grain"
      style={{ background: FIELDS.cream.surface }}
    >
      <div className={`${SHELL} pb-28 md:pb-40`}>
        <Reveal>
          <Display style={{ maxWidth: "18ch" }}>
            What Pholio is, and what it is <Verdict>not</Verdict>.
          </Display>
        </Reveal>

        <Reveal delay={0.08}>
          <Body style={{ marginTop: 28, maxWidth: "58ch" }}>
            Written plainly, because the people this platform is for have
            already been sold something by a website that would not say it
            plainly. Every line below can be checked against the product, the
            Terms, or a receipt.
          </Body>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-2 md:gap-20">
            <LedgerColumn heading="It is" items={IS} />
            <LedgerColumn heading="It is not" items={IS_NOT} />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-20 md:mt-24">
            <Label>The commercial facts</Label>
            <dl className="mt-8 grid grid-cols-1 gap-x-20 gap-y-0 md:grid-cols-2">
              {COMMERCIAL.map((row) => (
                <div key={row.label}>
                  <Hairline />
                  <div className="py-7">
                    <dt
                      style={{
                        fontFamily: SANS,
                        fontSize: 14,
                        fontWeight: 600,
                        letterSpacing: "0.01em",
                        color: FIELDS.cream.text,
                      }}
                    >
                      {row.label}
                    </dt>
                    <dd style={{ margin: "10px 0 0" }}>
                      <Body size={15}>{row.body}</Body>
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <Hairline />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
