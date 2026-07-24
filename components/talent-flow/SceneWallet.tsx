"use client";

/* ═══════════════════════════════════════════════════════════════════
   Scene 7 — In the wallet (true black). The upcoming beat.
   A realistic iPhone rises and settles; the Pholio ID pass slides up
   into the screen and presents — real pass anatomy (header, portrait,
   primary name, secondary fields, code), Pholio's ink and gold. The
   Add to Apple Wallet badge sits below the device, small and
   secondary. Stated plainly as in design, for Studio+.
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
  FACES,
  GOLD,
  ON_INK_FAINT,
} from "./kit";

/* deterministic QR-ish code block (aria-hidden, decorative) */
const QR_CELLS: number[] = (() => {
  const cells: number[] = [];
  let seed = 41;
  for (let i = 0; i < 121; i++) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    cells.push(seed % 100 < 46 ? 1 : 0);
  }
  return cells;
})();

function PholioIdPass() {
  return (
    <div
      style={{
        background: "#101010",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "14px 14px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: "0 18px 50px rgba(0,0,0,0.65)",
      }}
    >
      {/* header row — logotype + pass type */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <span
          className="font-editorial"
          style={{ fontSize: 13, letterSpacing: "0.06em", color: GOLD }}
        >
          Pholio
        </span>
        <Mono color="rgba(245,240,232,0.5)" size={8}>
          Talent ID
        </Mono>
      </div>

      {/* portrait strip */}
      <div
        style={{
          borderRadius: 6,
          overflow: "hidden",
          aspectRatio: "16 / 9",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FACES.a}
          alt="Pass portrait"
          draggable={false}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 12%",
            filter: "grayscale(1) contrast(1.05)",
          }}
        />
      </div>

      {/* primary field */}
      <div>
        <Mono color="rgba(245,240,232,0.42)" size={7}>
          Name
        </Mono>
        <div
          className="font-editorial"
          style={{
            fontSize: 19,
            lineHeight: 1.15,
            color: "rgba(245,240,232,0.94)",
            marginTop: 2,
          }}
        >
          Amara Okafor
        </div>
      </div>

      {/* secondary fields */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        {[
          ["Height", "178 cm"],
          ["Base", "New York"],
          ["Book", "pholio.studio/you"],
        ].map(([label, value]) => (
          <div key={label} style={{ minWidth: 0 }}>
            <Mono color="rgba(245,240,232,0.42)" size={7}>
              {label}
            </Mono>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10.5,
                color: "rgba(245,240,232,0.85)",
                marginTop: 2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* code */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 2 }}>
        <div
          aria-hidden="true"
          style={{
            background: "#FAF7F2",
            borderRadius: 4,
            padding: 5,
            lineHeight: 0,
          }}
        >
          <svg width="52" height="52" viewBox="0 0 11 11">
            {QR_CELLS.map((on, i) =>
              on ? (
                <rect
                  key={i}
                  x={i % 11}
                  y={Math.floor(i / 11)}
                  width="1"
                  height="1"
                  fill="#101010"
                />
              ) : null,
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

/** The official-artwork-styled Add to Apple Wallet badge, kept small and
    secondary beneath the device per Apple's usage guidance. */
function AddToWalletBadge() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        background: "#000",
        border: "1px solid #A6A6A6",
        borderRadius: 7,
        padding: "7px 14px 7px 10px",
      }}
    >
      {/* Wallet glyph — fanned pass cards */}
      <svg width="26" height="21" viewBox="0 0 26 21" aria-hidden="true">
        <rect x="1" y="1" width="24" height="6.6" rx="1.6" fill="#D9A846" />
        <rect x="1" y="5.4" width="24" height="6.6" rx="1.6" fill="#C46A62" />
        <rect x="1" y="9.8" width="24" height="6.6" rx="1.6" fill="#6A9BC4" />
        <path
          d="M1 14.2 h24 v3.2 a2.4 2.4 0 0 1 -2.4 2.4 h-19.2 a2.4 2.4 0 0 1 -2.4 -2.4 z"
          fill="#E8E6E3"
        />
      </svg>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.12,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', system-ui, sans-serif",
          color: "#fff",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: 8.5 }}>Add to</span>
        <span style={{ fontSize: 14.5, fontWeight: 500 }}>Apple Wallet</span>
      </span>
    </div>
  );
}

export default function SceneWallet() {
  const prm = usePrm();
  return (
    <Stage id="wallet" hvh={280}>
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

  /* the device rises and settles with a breath of overshoot; it is
     already peeking as the stage scrolls into view */
  const phoneY = useTransform(progress, [0, 0.28, 0.35], [250, -14, 0]);
  const phoneOpacity = useTransform(progress, [0, 0.16], [0.55, 1]);

  /* the pass presents — slides up inside the screen and settles */
  const passY = useTransform(progress, [0.34, 0.54, 0.6], ["112%", "-3%", "0%"]);

  /* ambient gold breath behind the device */
  const orbOpacity = useTransform(progress, [0.15, 0.45, 0.9, 0.97], [0, 0.55, 0.55, 0]);

  /* caption + badge */
  const capOpacity = useTransform(progress, [0.42, 0.55, 0.9, 0.96], [0, 1, 1, 0]);
  const capY = useTransform(progress, [0.42, 0.55], [26, 0]);
  const badgeOpacity = useTransform(progress, [0.58, 0.68, 0.9, 0.96], [0, 1, 1, 0]);

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
          pointerEvents: "none",
        }}
      />

      <div
        className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-10 px-6 md:flex-row md:justify-center md:gap-24 lg:px-10"
        style={{ paddingTop: 64, paddingBottom: 32 }}
      >
        {/* caption */}
        <motion.div
          style={{ opacity: prm ? 1 : capOpacity, y: prm ? 0 : capY }}
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
              opacity: prm ? 1 : phoneOpacity,
              willChange: "transform, opacity",
            }}
          >
            {/* iPhone */}
            <div
              style={{
                width: "min(64vw, 264px)",
                aspectRatio: "264 / 536",
                borderRadius: 42,
                background: "#0a0a0b",
                border: "1px solid #3a3a3c",
                boxShadow:
                  "0 0 0 3px #1c1c1e, 0 30px 90px rgba(0,0,0,0.8), inset 0 0 2px rgba(255,255,255,0.08)",
                padding: 9,
                position: "relative",
              }}
            >
              {/* screen */}
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  borderRadius: 34,
                  background: "#0b0b0d",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* status bar + dynamic island */}
                <div
                  style={{
                    position: "relative",
                    height: 40,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 20px 0",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.92)",
                    }}
                  >
                    9:41
                  </span>
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 8,
                      width: 74,
                      height: 21,
                      marginLeft: -37,
                      borderRadius: 12,
                      background: "#000",
                    }}
                  />
                  <svg width="34" height="10" viewBox="0 0 34 10" aria-hidden="true">
                    <rect x="0" y="2.5" width="14" height="5" rx="1.4" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
                    <rect x="1.4" y="3.9" width="9" height="2.2" rx="0.8" fill="rgba(255,255,255,0.92)" />
                    <path d="M21 8 a7 7 0 0 1 10 0" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.4" />
                    <path d="M23.4 5.6 a4 4 0 0 1 5.2 0" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.4" />
                    <circle cx="26" cy="8.4" r="1" fill="rgba(255,255,255,0.92)" />
                  </svg>
                </div>

                {/* pass presentation area */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 12px 18px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    style={{
                      width: "100%",
                      y: prm ? "0%" : passY,
                      willChange: "transform",
                    }}
                  >
                    <PholioIdPass />
                  </motion.div>
                </div>

                {/* home indicator */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: 7,
                    left: "50%",
                    width: 96,
                    height: 4,
                    marginLeft: -48,
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.35)",
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div style={{ opacity: prm ? 1 : badgeOpacity }}>
            <AddToWalletBadge />
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
