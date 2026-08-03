"use client";

/**
 * The Manifesto — kept, and made true.
 *
 * What was worth keeping: the ink break, the display-serif scale, and the
 * staggered indents that make the block read as a statement rather than a list.
 * What was not: "Curation is Our Compass / Quality is Our Currency" put two
 * italic-gold verdicts in one headline (the brand allows one), said nothing a
 * reader could hold us to, and called quality a currency on a platform whose
 * whole commercial posture is that it charges agencies nothing.
 *
 * So each line is now a commitment with a source. Curation over volume is the
 * edit ranking your own frames. A score is not a verdict, and human judgement,
 * are the AI Notice's own position restated in the brand's voice. The work
 * staying yours is export, deletion and the absence of a commission. The
 * marginal glosses carry that evidence at clerical size, so the big type can
 * stay withheld without the block becoming empty poetry.
 */

import {
  Display,
  FIELDS,
  GoldSweep,
  Grain,
  Hairline,
  Label,
  Reveal,
  MONO,
  SANS,
  SHELL,
  Verdict,
} from "@/components/about/kit";

interface Article {
  index: string;
  line: React.ReactNode;
  gloss: string;
  /**
   * Indent on md+. Written as a literal utility rather than an interpolated
   * value so Tailwind's source scan can see the candidate — the stagger is the
   * composition, and it silently disappears if the class never gets generated.
   */
  indent: string;
}

const ARTICLES: Article[] = [
  {
    index: "01",
    line: <>Curation is not volume.</>,
    gloss:
      "The edit ranks the frames you already shot so the strongest lead the book. Nothing is generated, nothing is retouched, and no photograph is altered on your behalf.",
    indent: "",
  },
  {
    index: "02",
    line: <>A score is not a verdict.</>,
    gloss:
      "Image and match scores are machine estimates, and we publish what they can and cannot do in the AI Notice rather than describing them as measurement.",
    indent: "md:ml-[7%]",
  },
  {
    index: "03",
    line: (
      <>
        Judgement stays <Verdict field="ink">human</Verdict>.
      </>
    ),
    gloss:
      "Every outcome that matters — in review, kept on file, shortlisted, met, signed — is set by a person at an agency. No model on this platform decides representation.",
    indent: "md:ml-[3%]",
  },
  {
    index: "04",
    line: <>The work stays yours.</>,
    gloss:
      "Your images and your data, exportable and deletable from account settings. We do not sell placement, and we take no share of anything you are paid.",
    indent: "md:ml-[9%]",
  },
];

export default function AboutManifesto() {
  return (
    <section className="relative" style={{ background: FIELDS.ink.surface }}>
      <GoldSweep />
      <Grain />

      <div className={`${SHELL} relative z-10 py-28 md:py-40`}>
        <Reveal>
          {/* The band's own heading. It is set at clerical size rather than
              display size — the articles are the display type here — but it
              still has to be an h2, or the four articles below are h3s hanging
              off the previous section. */}
          <h2 style={{ margin: 0 }}>
            <Label field="ink">The Manifesto</Label>
          </h2>
        </Reveal>

        <div className="mt-14 md:mt-20">
          {ARTICLES.map((article, i) => (
            <Reveal key={article.index} delay={i * 0.06}>
              <Hairline
                color={FIELDS.ink.rule}
                style={i === 0 ? { opacity: 0 } : undefined}
              />
              <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[1.35fr_0.65fr] md:gap-16 md:py-14">
                <Display
                  as="h3"
                  field="ink"
                  /* Sized so each article holds one line on desktop — an
                     orphaned "verdict." / "yours." undoes the declarative
                     read — and below the masthead, which stays the page's
                     largest type. */
                  size="clamp(1.95rem, 4.6vw, 3.6rem)"
                  className={article.indent}
                  style={{ maxWidth: "22ch" }}
                >
                  {article.line}
                </Display>

                <div className="flex items-start gap-5 md:pt-3">
                  <span
                    aria-hidden
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      color: FIELDS.ink.gold,
                      lineHeight: 1.6,
                      flexShrink: 0,
                    }}
                  >
                    {article.index}
                  </span>
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: 14,
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: FIELDS.ink.body,
                      margin: 0,
                      maxWidth: "38ch",
                    }}
                  >
                    {article.gloss}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
          <Hairline color={FIELDS.ink.rule} />
        </div>
      </div>
    </section>
  );
}
