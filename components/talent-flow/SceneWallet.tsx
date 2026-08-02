"use client";

/* ═══════════════════════════════════════════════════════════════════
   Scene 7 — In the wallet (true black). The upcoming beat.
   The device rises and settles with the Pholio ID pass already on the
   glass — one rendered mockup, angled toward the caption, rather than
   a CSS phone. The Add to Apple Wallet badge (Apple's own artwork)
   sits below the device, small and secondary. Stated plainly as in
   design, for Studio+.
   ═══════════════════════════════════════════════════════════════════ */

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Stage,
  Caption,
  Mono,
  V,
  usePrm,
  ON_INK_FAINT,
} from "./kit";
import { useMass, useRiseSettle, useScrub, useWipe } from "./motion";

/* the rendered mockup — pass already presenting on the glass */
const DEVICE = "/generated/wallet/pholio-id-device.webp";
const DEVICE_W = 900;
const DEVICE_H = 1883;
/* Apple's official badge artwork, rendered at its native 113×34 */
const WALLET_BADGE = "/generated/wallet/add-to-apple-wallet.png";

export default function SceneWallet() {
  const prm = usePrm();
  return (
    <Stage id="wallet" hvh={280} z={2} overlap={100}>
      {(progress) => <WalletStage progress={progress} prm={prm} />}
    </Stage>
  );
}

function WalletStage({
  progress,
  prm,
}: {
  progress: MotionValue<number>;
  prm: boolean;
}) {
  const sceneFade = useTransform(progress, [0, 1], [1, 1]);

  /* GESTURE: rise-settle. The device is heavy — it lifts into frame,
     overshoots, and rocks back onto its base. The tilt is what makes it
     an object rather than a layer. */
  const heavy = useMass(progress, "heavy");
  const { y: phoneY, rotateX: phoneRotX, scale: phoneScale } = useRiseSettle(
    heavy,
    [0, 0.42],
    260,
  );
  const phoneOpacity = useTransform(progress, [0, 0.14, 0.9, 1], [0.5, 1, 1, 0]);
  /* the device sinks back down as the closing scene takes the frame
     beneath it — without this the wallet stage scrolls away still
     holding an opaque phone over the resolution */
  const phoneExitY = useScrub(progress, [0.88, 1], [0, 220], "depart");

  /* ambient gold breath behind the device */
  const orbOpacity = useTransform(progress, [0.15, 0.45, 0.86, 0.96], [0, 0.55, 0.55, 0]);
  const orbScale = useScrub(progress, [0.15, 0.5], [0.7, 1], "arrival");

  /* the caption is the one still thing in a moving scene: it wipes in
     and holds, no travel */
  const capClip = useWipe(progress, [0.44, 0.6], "left");
  const capOpacity = useTransform(progress, [0.44, 0.52, 0.86, 0.96], [0, 1, 1, 0]);
  const badgeOpacity = useTransform(progress, [0.6, 0.7, 0.86, 0.96], [0, 1, 1, 0]);
  const badgeScale = useScrub(progress, [0.6, 0.72], [0.94, 1], "arrival");

  return (
    <motion.div
      style={{ position: "relative", height: "100%", opacity: prm ? 1 : sceneFade }}
    >
      {/* ambient */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 640,
          height: 640,
          marginLeft: -320,
          marginTop: -320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,165,90,0.14) 0%, transparent 65%)",
          filter: "blur(60px)",
          opacity: prm ? 0.55 : orbOpacity,
          scale: prm ? 1 : orbScale,
          pointerEvents: "none",
        }}
      />

      <div
        className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-10 px-6 md:flex-row md:justify-center md:gap-24 lg:px-10"
        style={{ paddingTop: 64, paddingBottom: 32 }}
      >
        {/* caption */}
        <motion.div
          style={{
            opacity: prm ? 1 : capOpacity,
            clipPath: prm ? "inset(0%)" : capClip,
            willChange: "clip-path, opacity",
          }}
          className="order-1 text-center md:order-none md:max-w-[380px] md:text-left"
        >
          <Caption
            dark
            headline={
              <>
                The card that&rsquo;s always on <V>you.</V>
              </>
            }
          >
            Pholio ID — your card as a Wallet pass. In design now, for
            Studio+.
          </Caption>
        </motion.div>

        {/* device + badge */}
        <div className="order-2 flex flex-col items-center gap-7">
          <motion.div
            style={{
              y: prm ? 0 : phoneY,
              translateY: prm ? 0 : phoneExitY,
              rotateX: prm ? 0 : phoneRotX,
              scale: prm ? 1 : phoneScale,
              opacity: prm ? 1 : phoneOpacity,
              transformPerspective: 1400,
              willChange: "transform, opacity",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DEVICE}
              alt="The Pholio ID pass presenting on an iPhone"
              width={DEVICE_W}
              height={DEVICE_H}
              draggable={false}
              /* Sized by HEIGHT, not width — the mockup is a tall object
                 and the stage's constraint is vertical. The device takes
                 whatever the viewport has left after the stage padding
                 (64 + 32) and the badge stack below it (~104), so it runs
                 as large as the frame allows instead of at a flat cap.
                 Mobile stacks the caption above, so it gets its own,
                 tighter budget. Width-sizing pushed the badge off frame. */
              className="block w-auto max-w-[78vw] h-[min(calc(100svh-430px),440px)] md:h-[min(calc(100svh-215px),700px)] md:max-w-[44vw]"
            />
          </motion.div>

          <motion.div
            style={{ opacity: prm ? 1 : badgeOpacity, scale: prm ? 1 : badgeScale }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={WALLET_BADGE}
              alt="Add to Apple Wallet"
              width={113}
              height={34}
              draggable={false}
              style={{ display: "block", width: 113, height: 34 }}
            />
          </motion.div>

          <motion.div style={{ opacity: prm ? 1 : badgeOpacity }}>
            <Mono color={ON_INK_FAINT} size={8.5}>
              Apple Wallet is a trademark of Apple Inc.
            </Mono>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
