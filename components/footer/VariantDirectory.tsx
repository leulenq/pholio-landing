"use client";

/**
 * A — THE DIRECTORY
 *
 * The chosen direction, on its third pass. The first was a placeholder; the
 * second fixed the architecture but was still called "too pale, too inactive,
 * not elevated enough."
 *
 * Paleness turned out to be literal, not a matter of taste. Everything sat at
 * 58–60% opacity on flat cream, with a single 38px gold rule as the only accent
 * in a block the width of the page. So this pass changes the material, not the
 * skeleton:
 *
 *  - **Ink by default.** The site's own body is velvet; the header is the
 *    variable element that samples each section, so the footer is the constant
 *    one and the publication ends on the same field every time.
 *  - **The gold sweep opens the band** — the ported hairline that closes the
 *    app's workspace topbar, full width, solid at the centre.
 *  - **Grain** over the field, so it reads as paper rather than a fill.
 *  - **Links at 82%, labels at 50%.** Hierarchy from the gap between them.
 *  - **One action at full strength.** "Get scouted" is the only element at
 *    100% — prominence by colour against muted siblings, per the header's rule:
 *    no larger size, no permanent rule, no fill.
 *
 * The skeleton is unchanged and deliberately asymmetric: a brand bay against
 * three uneven columns (0.85 / 0.85 / 1.15) with hairline spines between them
 * and an open gutter before them. Negative space separates identity from
 * directory; hairlines organise within it.
 */

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { DIRECTORY_GROUPS } from "@/lib/footer-links";

import {
  Baseline,
  BrandAnchor,
  EASE,
  FooterRoot,
  Group,
  footerTokens,
  type FooterVariantProps,
} from "./kit";

export default function VariantDirectory({ field = "ink" }: FooterVariantProps) {
  const tokens = footerTokens(field);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = !!useReducedMotion();

  const arrive = (i: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: reduceMotion ? 0.2 : 0.66,
      delay: reduceMotion ? 0 : i * 0.07,
      ease: EASE,
    },
  });

  return (
    <FooterRoot field={field}>
      <div
        ref={ref}
        className="grid grid-cols-1 gap-14 pb-14 pt-20 lg:grid-cols-[minmax(240px,0.85fr)_2.15fr] lg:gap-24 lg:pb-16 lg:pt-24"
      >
        <motion.div {...arrive(0)}>
          <BrandAnchor tokens={tokens} />
        </motion.div>

        {/* Two-up on a phone so every group keeps its heading; three uneven
            columns with hairline spines once there is room for them. */}
        <motion.div
          {...arrive(1)}
          className="grid grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-12 lg:grid-cols-[0.85fr_0.85fr_1.15fr] lg:gap-x-0"
        >
          {DIRECTORY_GROUPS.map((group, i) => (
            <div
              key={group.title}
              className={
                i === 0 ? "lg:pr-12" : "lg:border-l lg:pl-12 lg:pr-12 lg:last:pr-0"
              }
              style={{ borderColor: tokens.line }}
            >
              <Group group={group} tokens={tokens} />
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div {...arrive(2)}>
        <Baseline tokens={tokens} />
      </motion.div>
    </FooterRoot>
  );
}
