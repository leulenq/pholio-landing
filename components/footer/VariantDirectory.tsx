"use client";

/**
 * A — THE DIRECTORY (refined)
 *
 * The chosen direction, reworked after review. The first pass was structurally
 * right and visually inert: four even columns of equal weight, a 15px wordmark
 * that anchored nothing, and a utility strip that repeated the legal links
 * already sitting in a column above it.
 *
 * What changed, and why:
 *
 *  - **A real brand anchor.** The mark is set at 23px with a short gold rule
 *    beneath it and the address and social marks hanging off the same left
 *    edge. The left bay now has weight instead of trailing off.
 *  - **Three columns, not four.** The Legal column is gone; its documents live
 *    on the baseline, listed once. Fewer, wider columns give the block rhythm
 *    and let the gutters do real work.
 *  - **Hairlines between the columns.** The nav bay is organised rather than
 *    merely spaced — precision is what reads as premium here, not decoration.
 *  - **An open gutter between brand and nav.** No rule there: negative space
 *    separates the identity from the directory, hairlines organise within it.
 *  - **Motion.** Links draw a gold rule on hover, and the block arrives once
 *    on scroll. That is the whole answer to "visually inactive" — nothing
 *    loops, nothing shimmers.
 *
 * Asymmetry is deliberate: the bays are 0.9fr / 2.1fr, not halves, and the
 * three columns are not equal widths either. An even grid is what made the
 * first pass read as a placeholder.
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
  TOKENS,
  type FooterVariantProps,
} from "./kit";

export default function VariantDirectory({ field = "cream" }: FooterVariantProps) {
  const tokens = TOKENS[field];
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
        className="grid grid-cols-1 gap-14 pb-16 pt-20 lg:grid-cols-[minmax(260px,0.9fr)_2.1fr] lg:gap-24 lg:pb-20 lg:pt-28"
      >
        <motion.div {...arrive(0)}>
          <BrandAnchor tokens={tokens} />
        </motion.div>

        {/* The nav bay. Two-up on a phone so each group keeps its heading;
            three uneven columns with hairline spines once there is room. */}
        <motion.div
          {...arrive(1)}
          className="grid grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-12 lg:grid-cols-[0.85fr_0.85fr_1.15fr] lg:gap-x-0"
          style={{ borderColor: tokens.rule }}
        >
          {DIRECTORY_GROUPS.map((group, i) => (
            <div
              key={group.title}
              className={
                i === 0
                  ? "lg:pr-12"
                  : "lg:border-l lg:pl-12 lg:pr-12 lg:last:pr-0"
              }
              style={{ borderColor: tokens.rule }}
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
