"use client";

/* ═══════════════════════════════════════════════════════════════════
   SCENE — The Dock
   Register: INK. The close — quotes the product's onboarding "Action
   Dock" idiom: after the whole story, a single lit action.
   ═══════════════════════════════════════════════════════════════════ */

import { motion, useReducedMotion } from "framer-motion";
import {
  EASE,
  SPRING,
  INK,
  ON_INK,
  ON_INK_SOFT,
  ON_INK_FAINT,
  HAIR_INK,
  Orb,
  DockLink,
  V,
  Mono,
} from "./shared";
import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";

export default function SceneDock() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden texture-grain px-6 py-24 text-center lg:py-36"
      style={{ backgroundColor: INK }}
    >
      <div className="absolute inset-x-0 top-0 h-px divider-gold-center" />

      <Orb size={520} gold style={{ top: "-10%", left: "-5%" }} />
      <Orb size={480} gold={false} style={{ bottom: "-10%", right: "-5%" }} />

      <div className="relative" style={{ maxWidth: 560 }}>
        <motion.h2
          className="font-editorial"
          style={{
            fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
            color: ON_INK,
            margin: 0,
          }}
          initial={{ opacity: 0, y: reduce ? 0 : 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reduce ? { duration: 0.6, ease: EASE } : SPRING}
        >
          {"The light is "}
          <V>on</V>
          {"."}
        </motion.h2>

        <motion.p
          style={{
            marginTop: 24,
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            lineHeight: 1.75,
            color: ON_INK_SOFT,
          }}
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        >
          Upload two photos and get your first read tonight. Applying to
          agencies is free.
        </motion.p>

        <motion.div
          style={{ marginTop: 48 }}
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        >
          <DockLink href={`${APP_URL}/onboarding`}>
            Get your first read
          </DockLink>
        </motion.div>

        <motion.div
          style={{ marginTop: 40 }}
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
        >
          <Mono color={ON_INK_FAINT} size={9} tracking="0.24em">
            APP.PHOLIO.STUDIO — FREE TO START · FREE TO APPLY
          </Mono>
        </motion.div>
      </div>

      {/* three checkable promises — the compressed charter */}
      <motion.div
        className="relative mt-20 grid w-full max-w-4xl grid-cols-1 gap-8 px-2 text-center sm:grid-cols-3 sm:gap-0"
        initial={{ opacity: 0, y: reduce ? 0 : 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
      >
        {[
          {
            claim: "Applying is free.",
            sub: "You never pay to be seen or to submit.",
          },
          {
            claim: "Your images stay yours.",
            sub: "Rights and releases are recorded per photo.",
          },
          {
            claim: "Leave with everything.",
            sub: "Export your whole record; deletion means deletion.",
          },
        ].map((p, i) => (
          <div
            key={p.claim}
            className="px-6"
            style={{
              borderLeft: i > 0 ? `1px solid ${HAIR_INK}` : "none",
            }}
          >
            <div
              className="font-editorial"
              style={{ fontSize: 19, color: ON_INK, lineHeight: 1.3 }}
            >
              {p.claim}
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "var(--font-sans)",
                fontSize: 12.5,
                lineHeight: 1.6,
                color: ON_INK_FAINT,
              }}
            >
              {p.sub}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
