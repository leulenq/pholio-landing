// landing/components/talent-new/FeatureCompCard.tsx
"use client";

import { useRef, useCallback, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { showcaseImageAt } from "@/lib/talent-showcase-images";

const ease = [0.22, 1, 0.36, 1] as const;

const HERO = showcaseImageAt(0);
const THUMBS = [1, 2, 3, 4].map((i) => showcaseImageAt(i));

export default function FeatureCompCard() {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const cfg = { damping: 25, stiffness: 180 };
  const mx = useSpring(0, cfg);
  const my = useSpring(0, cfg);
  const rotX = useTransform(my, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [6, -6]);
  const rotY = useTransform(mx, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-6, 6]);
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || prefersReducedMotion) return;
      const r = cardRef.current.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mx, my, prefersReducedMotion],
  );

  const onLeave = useCallback(() => {
    setHovered(false);
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      id="features"
      className="relative overflow-hidden scroll-mt-24"
      style={{ backgroundColor: "#FAF8F5", padding: "8rem 0" }}
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
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "10%",
          top: "20%",
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(201,165,90,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            className="lg:order-2"
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div
                style={{
                  width: 24,
                  height: 1,
                  background: "linear-gradient(to right, #C9A55A, transparent)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "0.625rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C9A55A",
                }}
              >
                Comp
              </span>
            </div>
            <h2
              className="font-editorial"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                color: "#1A1815",
                fontWeight: 400,
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                margin: "0 0 1.25rem",
              }}
            >
              The card
              <br />
              <span
                className="font-editorial-italic"
                style={{ color: "var(--color-gold)" }}
              >
                they still ask for.
              </span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9375rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                maxWidth: 420,
                margin: "0 0 1.5rem",
              }}
            >
              Measurements, hero, and selects — generated from your Pholio book,
              export-ready for the go-see table or a PDF they can file.
            </p>
            <p
              className="font-editorial-italic m-0"
              style={{
                fontSize: "0.9375rem",
                color: "rgba(201,165,90,0.88)",
                lineHeight: 1.55,
                maxWidth: 400,
              }}
            >
              Same layout language casting directors already read — without
              rebuilding InDesign at midnight.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center lg:order-1 lg:justify-start"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease }}
          >
            <div
              ref={cardRef}
              style={{ perspective: 1000, transformStyle: "preserve-3d" }}
              onMouseMove={onMove}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={onLeave}
            >
              <motion.div
                style={{ rotateX: rotX, rotateY: rotY, transformOrigin: "center center" }}
              >
                <div
                  style={{
                    width: 340,
                    maxWidth: "85vw",
                    borderRadius: 12,
                    overflow: "hidden",
                    backgroundColor: "#0E0E0C",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: hovered
                      ? "0 50px 120px -20px rgba(201,165,90,0.14), 0 20px 50px -15px rgba(0,0,0,0.2)"
                      : "0 30px 80px -15px rgba(0,0,0,0.15), 0 10px 30px -10px rgba(0,0,0,0.08)",
                    transition: "box-shadow 0.5s ease",
                    position: "relative",
                  }}
                >
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-30"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
                      opacity: hovered ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                  />

                  <div
                    style={{
                      height: 280,
                      position: "relative",
                      backgroundColor: "#141210",
                    }}
                  >
                    <Image
                      src={HERO.src}
                      alt={HERO.alt}
                      fill
                      sizes="340px"
                      className="object-cover object-top"
                    />
                    <div
                      className="absolute bottom-3 right-3 flex gap-1"
                      style={{ zIndex: 2 }}
                    >
                      {THUMBS.map((t, i) => (
                        <div
                          key={t.src}
                          className="relative overflow-hidden rounded"
                          style={{
                            width: 32,
                            height: 40,
                            border:
                              i === 0
                                ? "1px solid rgba(201,165,90,0.35)"
                                : "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <Image
                            src={t.src}
                            alt=""
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div
                      className="absolute left-3 top-3 flex items-center gap-1.5"
                      style={{ zIndex: 2 }}
                    >
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5L8 1z"
                          fill="#C9A55A"
                          opacity="0.65"
                        />
                      </svg>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: 8,
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "rgba(201,165,90,0.55)",
                        }}
                      >
                        Pholio
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: "18px 20px" }}>
                    <div
                      style={{
                        height: 8,
                        width: "55%",
                        backgroundColor: "rgba(255,255,255,0.16)",
                        borderRadius: 4,
                        marginBottom: 6,
                      }}
                    />
                    <div
                      style={{
                        height: 5,
                        width: "35%",
                        backgroundColor: "rgba(201,165,90,0.22)",
                        borderRadius: 3,
                        marginBottom: 18,
                      }}
                    />
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 12,
                      }}
                    >
                      {[
                        { label: "Height", val: "5'10\"" },
                        { label: "Bust", val: "34\"" },
                        { label: "Waist", val: "24\"" },
                        { label: "Hips", val: "35\"" },
                        { label: "Shoe", val: "8.5" },
                        { label: "Hair", val: "Brown" },
                      ].map((m) => (
                        <div key={m.label}>
                          <div
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: 8,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "rgba(201,165,90,0.4)",
                              marginBottom: 3,
                            }}
                          >
                            {m.label}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: 12,
                              color: "rgba(255,255,255,0.62)",
                              fontWeight: 500,
                            }}
                          >
                            {m.val}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        marginTop: 16,
                        paddingTop: 14,
                        borderTop: "1px solid rgba(255,255,255,0.04)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", gap: 6 }}>
                        {["PDF", "Share"].map((a) => (
                          <div
                            key={a}
                            style={{
                              padding: "4px 10px",
                              borderRadius: 6,
                              backgroundColor: "rgba(201,165,90,0.06)",
                              border: "1px solid rgba(201,165,90,0.1)",
                              fontSize: 9,
                              fontFamily: "var(--font-sans)",
                              fontWeight: 600,
                              color: "rgba(201,165,90,0.5)",
                              letterSpacing: "0.06em",
                            }}
                          >
                            {a}
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 5,
                          border: "1px solid rgba(201,165,90,0.12)",
                          display: "grid",
                          gridTemplateColumns: "repeat(4, 1fr)",
                          gap: 1,
                          padding: 4,
                        }}
                      >
                        {Array.from({ length: 16 }).map((_, j) => (
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
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
