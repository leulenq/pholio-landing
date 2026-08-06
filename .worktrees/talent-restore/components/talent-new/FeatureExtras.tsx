// landing/components/talent-new/FeatureExtras.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { showcaseImageAt } from "@/lib/talent-showcase-images";

const ease = [0.22, 1, 0.36, 1] as const;

const WALLET_FACE = showcaseImageAt(2);
const GRID = [3, 4, 5, 6, 7, 8].map((i) => showcaseImageAt(i));

export default function FeatureExtras() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FAF8F5", padding: "6rem 0 7rem" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.025,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "150px 150px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            style={{
              padding: "3rem 2.5rem",
              borderRadius: 16,
              backgroundColor: "#1A1815",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 20px 50px -12px rgba(0,0,0,0.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 300,
                height: 300,
                background:
                  "radial-gradient(circle, rgba(201,165,90,0.05) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />

            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div
                  style={{
                    width: 20,
                    height: 1,
                    background: "linear-gradient(to right, #C9A55A, transparent)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "0.5625rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#C9A55A",
                  }}
                >
                  Apple Wallet
                </span>
              </div>

              <h3
                className="font-editorial"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  color: "white",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: "0 0 0.75rem",
                }}
              >
                Comp on your{" "}
                <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
                  wrist.
                </span>
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.6,
                  margin: "0 0 2rem",
                  maxWidth: 280,
                }}
              >
                QR opens your Pholio book at the casting desk — no digging for
                the right attachment.
              </p>

              <div
                style={{
                  width: 200,
                  padding: "16px 14px",
                  borderRadius: 14,
                  background:
                    "linear-gradient(160deg, rgba(201,165,90,0.08), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(201,165,90,0.12)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 14,
                  }}
                >
                  <div
                    className="relative overflow-hidden rounded-full"
                    style={{
                      width: 32,
                      height: 32,
                      border: "1.5px solid rgba(201,165,90,0.25)",
                    }}
                  >
                    <Image
                      src={WALLET_FACE.src}
                      alt=""
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        height: 5,
                        width: 50,
                        backgroundColor: "rgba(255,255,255,0.12)",
                        borderRadius: 3,
                        marginBottom: 3,
                      }}
                    />
                    <div
                      style={{
                        height: 4,
                        width: 30,
                        backgroundColor: "rgba(255,255,255,0.06)",
                        borderRadius: 2,
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 8,
                    border: "1px solid rgba(201,165,90,0.12)",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: 1.5,
                    padding: 5,
                  }}
                >
                  {Array.from({ length: 25 }).map((_, j) => (
                    <div
                      key={j}
                      style={{
                        borderRadius: 0.5,
                        backgroundColor:
                          j % 3 === 0
                            ? "rgba(201,165,90,0.25)"
                            : "rgba(255,255,255,0.04)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            style={{
              padding: "3rem 2.5rem",
              borderRadius: 16,
              backgroundColor: "#1A1815",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 20px 50px -12px rgba(0,0,0,0.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 300,
                height: 300,
                background:
                  "radial-gradient(circle, rgba(201,165,90,0.04) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />

            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div
                  style={{
                    width: 20,
                    height: 1,
                    background: "linear-gradient(to right, #C9A55A, transparent)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "0.5625rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#C9A55A",
                  }}
                >
                  .studio
                </span>
              </div>

              <h3
                className="font-editorial"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  color: "white",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: "0 0 0.75rem",
                }}
              >
                Link that reads{" "}
                <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
                  expensive.
                </span>
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.6,
                  margin: "0 0 2rem",
                  maxWidth: 280,
                }}
              >
                A quiet URL with your name on it — digitals, comp, stats — the
                whole package, one tap from your bio.
              </p>

              <div
                style={{
                  width: 240,
                  borderRadius: 10,
                  overflow: "hidden",
                  backgroundColor: "rgba(255,255,255,0.015)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    padding: "6px 10px",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <div className="flex gap-1">
                    {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                      <div
                        key={c}
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          backgroundColor: c,
                          opacity: 0.5,
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: 16,
                      borderRadius: 4,
                      backgroundColor: "rgba(255,255,255,0.02)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 7,
                        color: "rgba(255,255,255,0.2)",
                      }}
                    >
                      your-name.pholio.studio
                    </span>
                  </div>
                </div>
                <div style={{ padding: "10px 10px 12px" }}>
                  <div className="mb-3 flex items-center gap-2">
                    <div
                      className="relative overflow-hidden rounded-full"
                      style={{
                        width: 22,
                        height: 22,
                        border: "1px solid rgba(201,165,90,0.15)",
                      }}
                    >
                      <Image
                        src={WALLET_FACE.src}
                        alt=""
                        fill
                        sizes="22px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          height: 4,
                          width: 40,
                          backgroundColor: "rgba(255,255,255,0.1)",
                          borderRadius: 2,
                          marginBottom: 2,
                        }}
                      />
                      <div
                        style={{
                          height: 3,
                          width: 25,
                          backgroundColor: "rgba(255,255,255,0.04)",
                          borderRadius: 1.5,
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {GRID.map((g, i) => (
                      <div
                        key={g.src}
                        className="relative overflow-hidden rounded"
                        style={{ height: 32 }}
                      >
                        <Image
                          src={g.src}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
