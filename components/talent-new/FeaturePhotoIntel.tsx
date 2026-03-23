// landing/components/talent-new/FeaturePhotoIntel.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { showcaseImageAt } from "@/lib/talent-showcase-images";

const ease = [0.22, 1, 0.36, 1] as const;

const PHOTOS = [
  { id: 0, score: 97, tag: "Hero", selected: true },
  { id: 1, score: 93, tag: "Editorial", selected: true },
  { id: 2, score: 88, tag: "Portrait", selected: true },
  { id: 3, score: 82, tag: "Lifestyle", selected: false },
  { id: 4, score: 76, tag: "Casual", selected: false },
  { id: 5, score: 71, tag: "Candid", selected: false },
  { id: 6, score: 64, tag: "Outdoors", selected: false },
  { id: 7, score: 55, tag: "Group", selected: false },
  { id: 8, score: 48, tag: "Low light", selected: false },
];

export default function FeaturePhotoIntel() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [scanning, setScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!inView || prefersReducedMotion) {
      setShowResults(true);
      return;
    }
    const t1 = setTimeout(() => setScanning(true), 600);
    const t2 = setTimeout(() => {
      setScanning(false);
      setShowResults(true);
    }, 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView, prefersReducedMotion]);

  return (
    <section
      ref={ref}
      id="the-edit"
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
          top: "20%",
          left: "5%",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(201,165,90,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="order-2 lg:order-1"
          >
            <div style={{ maxWidth: 420 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 8,
                }}
              >
                {PHOTOS.map((photo, i) => {
                  const img = showcaseImageAt(photo.id + 3);
                  return (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + i * 0.06,
                        ease,
                      }}
                      style={{
                        height: 120,
                        borderRadius: 10,
                        position: "relative",
                        overflow: "hidden",
                        backgroundColor: "#1A1815",
                        border:
                          photo.selected && showResults
                            ? "1.5px solid rgba(201,165,90,0.5)"
                            : "1px solid rgba(26,24,21,0.08)",
                        boxShadow:
                          photo.selected && showResults
                            ? "0 4px 20px rgba(201,165,90,0.12)"
                            : "0 1px 4px rgba(0,0,0,0.04)",
                        transition: "border 0.5s ease, box-shadow 0.5s ease",
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 1024px) 30vw, 140px"
                        className="object-cover"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background: `linear-gradient(180deg, transparent 40%, rgba(10,9,8,0.45))`,
                        }}
                      />
                      <AnimatePresence>
                        {scanning && (
                          <motion.div
                            initial={{ top: "0%", opacity: 0 }}
                            animate={{
                              top: "100%",
                              opacity: [0, 1, 1, 0],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 1.8,
                              delay: i * 0.15,
                              ease: "linear",
                            }}
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              height: 2,
                              background:
                                "linear-gradient(90deg, transparent, #C9A55A, transparent)",
                              boxShadow: "0 0 12px 3px rgba(201,165,90,0.25)",
                              pointerEvents: "none",
                            }}
                          />
                        )}
                      </AnimatePresence>
                      <AnimatePresence>
                        {showResults && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            style={{
                              position: "absolute",
                              top: 6,
                              right: 6,
                              padding: "2px 7px",
                              borderRadius: 5,
                              backgroundColor: photo.selected
                                ? "rgba(201,165,90,0.9)"
                                : "rgba(255,255,255,0.88)",
                              backdropFilter: "blur(4px)",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: 10,
                                fontWeight: 700,
                                color: photo.selected
                                  ? "#050505"
                                  : "rgba(26,24,21,0.5)",
                              }}
                            >
                              {photo.score}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {showResults && photo.selected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: 0.3 + i * 0.08,
                          }}
                          style={{
                            position: "absolute",
                            bottom: 6,
                            left: 6,
                            width: 18,
                            height: 18,
                            borderRadius: 5,
                            backgroundColor: "rgba(201,165,90,0.92)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M5 13l4 4L19 7"
                              stroke="#050505"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                      )}
                      <div style={{ position: "absolute", bottom: 6, right: 6 }}>
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: 8,
                            color: "rgba(255,255,255,0.55)",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {photo.tag}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <AnimatePresence>
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{
                      marginTop: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "10px 16px",
                      borderRadius: 10,
                      backgroundColor: "rgba(201,165,90,0.06)",
                      border: "1px solid rgba(201,165,90,0.12)",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5L8 1z"
                        fill="#C9A55A"
                        opacity="0.8"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--color-gold-dark, #8B7740)",
                      }}
                    >
                      Three frames for the board
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 11,
                        color: "rgba(26,24,21,0.4)",
                      }}
                    >
                      · six stay in the bin
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="order-1 lg:order-2"
          >
            <div className="mb-5 flex items-center gap-3">
              <div
                style={{
                  width: 24,
                  height: 1,
                  background:
                    "linear-gradient(to right, var(--color-gold), transparent)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "0.625rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                }}
              >
                The edit
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
              Rank the roll.
              <br />
              <span
                className="font-editorial-italic"
                style={{ color: "var(--color-gold)" }}
              >
                Lead with the cut.
              </span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9375rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                maxWidth: 420,
                margin: "0 0 1.75rem",
              }}
            >
              Pholio reads light, line, and casting legibility on every
              digital — the way a booker flips a contact sheet. Strong frames
              float; noisy ones stay off the shortlist.
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
              Scouts never see the frames you would have buried yourself.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
