// landing/components/talent/TalentSceneWallet.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// Decorative QR code SVG (not scannable — visual placeholder only)
function QrCodePlaceholder() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top-left finder */}
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#1A1815" />
      <rect x="6" y="6" width="12" height="12" rx="1" fill="white" />
      <rect x="9" y="9" width="6" height="6" fill="#1A1815" />
      {/* Top-right finder */}
      <rect x="42" y="2" width="20" height="20" rx="2" fill="#1A1815" />
      <rect x="46" y="6" width="12" height="12" rx="1" fill="white" />
      <rect x="49" y="9" width="6" height="6" fill="#1A1815" />
      {/* Bottom-left finder */}
      <rect x="2" y="42" width="20" height="20" rx="2" fill="#1A1815" />
      <rect x="6" y="46" width="12" height="12" rx="1" fill="white" />
      <rect x="9" y="49" width="6" height="6" fill="#1A1815" />
      {/* Data dots */}
      <rect x="26" y="2" width="4" height="4" fill="#1A1815" />
      <rect x="32" y="2" width="4" height="4" fill="#1A1815" />
      <rect x="26" y="8" width="4" height="4" fill="#1A1815" />
      <rect x="38" y="8" width="4" height="4" fill="#1A1815" />
      <rect x="26" y="14" width="4" height="4" fill="#1A1815" />
      <rect x="2" y="26" width="4" height="4" fill="#1A1815" />
      <rect x="8" y="26" width="4" height="4" fill="#1A1815" />
      <rect x="26" y="26" width="4" height="4" fill="#1A1815" />
      <rect x="38" y="26" width="4" height="4" fill="#1A1815" />
      <rect x="50" y="26" width="4" height="4" fill="#1A1815" />
      <rect x="56" y="26" width="4" height="4" fill="#1A1815" />
      <rect x="2" y="32" width="4" height="4" fill="#1A1815" />
      <rect x="14" y="32" width="4" height="4" fill="#1A1815" />
      <rect x="26" y="32" width="4" height="4" fill="#1A1815" />
      <rect x="44" y="32" width="4" height="4" fill="#1A1815" />
      <rect x="2" y="38" width="4" height="4" fill="#1A1815" />
      <rect x="26" y="44" width="4" height="4" fill="#1A1815" />
      <rect x="44" y="44" width="4" height="4" fill="#1A1815" />
      <rect x="32" y="50" width="4" height="4" fill="#1A1815" />
      <rect x="50" y="50" width="4" height="4" fill="#1A1815" />
      <rect x="44" y="56" width="4" height="4" fill="#1A1815" />
      <rect x="56" y="56" width="4" height="4" fill="#1A1815" />
    </svg>
  );
}

// Generic Apple logo SVG path (not Apple's trademarked badge)
function AppleLogo() {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 814 1000"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-155.8-96.8C111 633.4 79.4 518.8 79.4 409.2c0-194.3 127.6-297.5 253.7-297.5 66.1 0 121.2 43.4 162.6 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  );
}

export default function TalentSceneWallet() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        padding: "0 24px",
      }}
    >
      {/* Two-column layout: text left, phone right */}
      <div
        className="relative mx-auto flex flex-col lg:flex-row items-center lg:items-stretch"
        style={{ maxWidth: 1100, minHeight: "100vh" }}
      >
        {/* ── Left column: text ── */}
        <div
          className="flex flex-col justify-center lg:w-[48%] lg:flex-shrink-0 lg:pr-16"
          style={{ padding: "6rem 0 4rem" }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "0.6875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A55A",
              marginBottom: "1.5rem",
            }}
          >
            Pholio ID
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={
              inView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }
            }
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="font-editorial"
            style={{
              fontSize: "clamp(2.6rem, 4.5vw, 4.5rem)",
              color: "#1A1815",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              marginBottom: "1.75rem",
            }}
          >
            Your identity,
            <br />
            always in your pocket.
          </motion.h2>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={
              inView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: prefersReducedMotion ? 0 : 12 }
            }
            transition={{ duration: 0.6, delay: 0.2, ease }}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "1rem",
              color: "rgba(26,24,21,0.6)",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              maxWidth: 400,
            }}
          >
            Your Pholio profile in an Apple Wallet pass. Tap to share at castings,
            events, or anywhere agencies need to see who you are.
          </motion.p>

          {/* Custom "Add to Apple Wallet"-style button */}
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.88 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            whileHover={{ opacity: 1 }}
            aria-label="Add to Apple Wallet — coming soon"
            style={{
              height: 48,
              width: 175,
              borderRadius: 9,
              backgroundColor: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
              textDecoration: "none",
              cursor: "pointer",
              flexShrink: 0,
              marginBottom: "1rem",
            }}
          >
            <AppleLogo />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: 10,
                  color: "white",
                  lineHeight: 1.2,
                }}
              >
                Add to
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 16,
                  color: "white",
                  lineHeight: 1.2,
                }}
              >
                Apple Wallet
              </span>
            </div>
          </motion.a>

          {/* Coming soon note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "0.75rem",
              color: "rgba(26,24,21,0.35)",
            }}
          >
            Coming soon. Sign up to be first.
          </motion.p>
        </div>

        {/* ── Right column: iPhone frame ── */}
        <div
          className="flex flex-1 items-center justify-center"
          style={{ padding: "4rem 0 4rem" }}
        >
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 48 }}
            animate={
              inView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: prefersReducedMotion ? 0 : 48 }
            }
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 75,
              damping: 18,
            }}
            style={{
              width: 290,
              height: 590,
              borderRadius: 46,
              border: "11px solid #1A1815",
              backgroundColor: "#000",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              flexShrink: 0,
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)",
            }}
          >
            {/* Notch bar */}
            <div
              style={{
                height: 28,
                backgroundColor: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 24,
                  backgroundColor: "#1A1815",
                  borderRadius: 12,
                }}
              />
            </div>

            {/* Screen area */}
            <div
              style={{
                flex: 1,
                backgroundColor: "#f2f2f7",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* iOS status bar */}
              <div
                style={{
                  height: 20,
                  backgroundColor: "#f2f2f7",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 14px",
                  justifyContent: "space-between",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 10,
                    color: "#1A1815",
                  }}
                >
                  9:41
                </span>
                <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
                  {[4, 7, 10].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: 3,
                        height: h,
                        backgroundColor: "#1A1815",
                        borderRadius: 1,
                      }}
                    />
                  ))}
                  <div
                    style={{
                      width: 14,
                      height: 7,
                      border: "1px solid #1A1815",
                      borderRadius: 2,
                      marginLeft: 3,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 1,
                        top: 1,
                        right: 2,
                        bottom: 1,
                        backgroundColor: "#1A1815",
                        borderRadius: 1,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Wallet app header */}
              <div
                style={{
                  height: 36,
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    fontSize: 17,
                    color: "#1A1815",
                  }}
                >
                  Wallet
                </span>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: "#007AFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: 16,
                      lineHeight: 1,
                      marginTop: -1,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    +
                  </span>
                </div>
              </div>

              {/* Pass stack */}
              <div
                style={{
                  flex: 1,
                  padding: "4px 10px 0",
                  overflow: "hidden",
                }}
              >
                {/* Primary Pholio pass */}
                <div
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                    position: "relative",
                    zIndex: 3,
                  }}
                >
                  {/* Pass header — gold gradient */}
                  <div
                    style={{
                      height: 56,
                      background:
                        "linear-gradient(135deg, #C9A55A 0%, #A6845C 100%)",
                      padding: "0 14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 700,
                        fontSize: 13,
                        color: "white",
                        letterSpacing: "0.2em",
                      }}
                    >
                      PHOLIO
                    </span>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.4)",
                        backgroundColor: "rgba(255,255,255,0.2)",
                      }}
                    />
                  </div>

                  {/* Pass body */}
                  <div style={{ backgroundColor: "white", padding: "12px 14px" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        fontSize: 15,
                        color: "#1A1815",
                        marginBottom: 2,
                      }}
                    >
                      Sofia M.
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 400,
                        fontSize: 11,
                        color: "#6B6560",
                        marginBottom: 1,
                      }}
                    >
                      Editorial · New York
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 400,
                        fontSize: 10,
                        color: "#6B6560",
                        marginBottom: 10,
                      }}
                    >
                      5&apos;10&quot; · Size 2 · Brown/Brown
                    </div>
                    <div
                      style={{
                        height: 1,
                        backgroundColor: "#f1f5f9",
                        marginBottom: 10,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <QrCodePlaceholder />
                      <div
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: 9,
                          color: "#94a3b8",
                          marginTop: 4,
                          textAlign: "center",
                        }}
                      >
                        Scan to view portfolio
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: 500,
                          fontSize: 10,
                          color: "#C9A55A",
                          marginTop: 2,
                        }}
                      >
                        pholio.studio/sofia-m
                      </div>
                    </div>
                  </div>
                </div>

                {/* Peeking passes */}
                <div
                  style={{
                    height: 20,
                    borderRadius: 16,
                    backgroundColor: "rgba(201,165,90,0.4)",
                    margin: "-10px 8px 0",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
                <div
                  style={{
                    height: 20,
                    borderRadius: 16,
                    backgroundColor: "rgba(201,165,90,0.2)",
                    margin: "-10px 16px 0",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </div>
            </div>

            {/* Home indicator */}
            <div
              style={{
                height: 20,
                backgroundColor: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 4,
                  backgroundColor: "rgba(255,255,255,0.35)",
                  borderRadius: 2,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
