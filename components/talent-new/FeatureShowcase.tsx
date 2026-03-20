// landing/components/talent-new/FeatureShowcase.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  CreditCard,
  ImagePlus,
  BarChart3,
  Globe,
  Wallet,
  Link2,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  {
    key: "compcard",
    icon: CreditCard,
    eyebrow: "01",
    label: "AI Comp Card",
    headline: "One card.",
    accent: "Every detail.",
    description:
      "Professional comp card generated from your profile — measurements, your best photos, and contact info — formatted the way agencies expect. Download, print, or share via QR.",
    visual: "compcard",
    color: "#C9A55A",
  },
  {
    key: "photointel",
    icon: ImagePlus,
    eyebrow: "02",
    label: "Photo Intelligence",
    headline: "Let AI curate",
    accent: "your best.",
    description:
      "Upload your portfolio. Our AI scores composition, lighting, and expression — then selects the shots that perform. Agencies only see your strongest work.",
    visual: "photointel",
    color: "#D4B96E",
  },
  {
    key: "analytics",
    icon: BarChart3,
    eyebrow: "03",
    label: "Analytics",
    headline: "Know who's",
    accent: "looking.",
    description:
      "See every agency view, profile save, and board add in real time. Track weekly engagement and understand which photos drive the most interest.",
    visual: "analytics",
    color: "#BFA258",
  },
  {
    key: "discovery",
    icon: Globe,
    eyebrow: "04",
    label: "Agency Discovery",
    headline: "Be found by",
    accent: "the right people.",
    description:
      "Your profile is surfaced in agency searches matching your look, measurements, and market. No cold emails. No guesswork. Just visibility.",
    visual: "discovery",
    color: "#C9A55A",
  },
  {
    key: "wallet",
    icon: Wallet,
    eyebrow: "05",
    label: "Apple Wallet & QR",
    headline: "Always",
    accent: "on you.",
    description:
      "Your comp card in Apple Wallet with a scannable QR code. At castings, on set, or anywhere your career takes you — your portfolio is one tap away.",
    visual: "wallet",
    color: "#D4B96E",
  },
  {
    key: "portfolio",
    icon: Link2,
    eyebrow: "06",
    label: "Public Portfolio",
    headline: "Your own",
    accent: ".studio URL.",
    description:
      "A clean, professional portfolio website at your-name.pholio.studio — your photos, measurements, and comp card. No design skills needed.",
    visual: "portfolio",
    color: "#BFA258",
  },
];

/* ═══════════════════════════════════════════════════════
   Glassmorphic feature visuals — unique to this page
   ═══════════════════════════════════════════════════════ */
function FeatureVisual({ feature, color }: { feature: string; color: string }) {
  const glass = {
    backgroundColor: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 16,
    backdropFilter: "blur(12px)",
  };

  const shimmer = {
    position: "absolute" as const,
    top: 0,
    left: "-100%",
    width: "200%",
    height: "100%",
    background: `linear-gradient(90deg, transparent, rgba(201,165,90,0.04), transparent)`,
    animation: "shimmer 4s ease-in-out infinite",
  };

  if (feature === "compcard") {
    return (
      <div className="relative" style={{ width: 300 }}>
        <div
          style={{
            ...glass,
            padding: "24px 20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={shimmer} />
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div
              style={{
                width: 40,
                height: 48,
                borderRadius: 8,
                background: `linear-gradient(135deg, rgba(${color === "#C9A55A" ? "201,165,90" : "180,150,80"},0.15), rgba(255,255,255,0.04))`,
                border: "1px solid rgba(201,165,90,0.15)",
              }}
            />
            <div>
              <div
                style={{
                  height: 6,
                  width: 80,
                  backgroundColor: "rgba(255,255,255,0.14)",
                  borderRadius: 3,
                  marginBottom: 5,
                }}
              />
              <div
                style={{
                  height: 4,
                  width: 50,
                  backgroundColor: "rgba(201,165,90,0.2)",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
          {/* Photo row */}
          <div className="flex gap-2 mb-5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 80,
                  borderRadius: 8,
                  backgroundColor: `rgba(255,255,255,${0.03 + i * 0.01})`,
                  border: i === 0 ? "1px solid rgba(201,165,90,0.2)" : "1px solid rgba(255,255,255,0.04)",
                }}
              />
            ))}
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {["Height", "Bust", "Waist", "Hips"].map((s) => (
              <div key={s} className="flex flex-col gap-1">
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 8,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(201,165,90,0.45)",
                  }}
                >
                  {s}
                </span>
                <div
                  style={{
                    height: 5,
                    width: "70%",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderRadius: 3,
                  }}
                />
              </div>
            ))}
          </div>
          {/* QR  */}
          <div className="flex justify-end mt-4">
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 6,
                border: "1px solid rgba(201,165,90,0.15)",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 1.5,
                padding: 5,
              }}
            >
              {Array.from({ length: 16 }).map((_, j) => (
                <div
                  key={j}
                  style={{
                    borderRadius: 1,
                    backgroundColor:
                      j % 3 === 0
                        ? "rgba(201,165,90,0.3)"
                        : "rgba(255,255,255,0.05)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Shadow glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -20,
            left: "10%",
            right: "10%",
            height: 40,
            background: `radial-gradient(ellipse, ${color}15, transparent)`,
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  if (feature === "photointel") {
    return (
      <div style={{ width: 300 }}>
        <div style={{ ...glass, padding: "20px 16px", position: "relative", overflow: "hidden" }}>
          <div style={shimmer} />
          {/* Photo grid with scores */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 6,
              marginBottom: 14,
            }}
          >
            {[97, 93, 88, 82, 76, 71].map((score, i) => (
              <div
                key={i}
                style={{
                  height: 80,
                  borderRadius: 10,
                  border: score >= 88 ? "1px solid rgba(201,165,90,0.25)" : "1px solid rgba(255,255,255,0.04)",
                  backgroundColor: `rgba(255,255,255,${0.02 + (score / 100) * 0.04})`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Score */}
                <div
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    padding: "1px 5px",
                    borderRadius: 4,
                    backgroundColor:
                      score >= 88
                        ? "rgba(201,165,90,0.2)"
                        : "rgba(255,255,255,0.06)",
                    border: `1px solid ${score >= 88 ? "rgba(201,165,90,0.3)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 9,
                      fontWeight: 700,
                      color: score >= 88 ? "#C9A55A" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {score}
                  </span>
                </div>
                {/* Selected indicator */}
                {score >= 88 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 5,
                      left: 5,
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      backgroundColor: "#C9A55A",
                      boxShadow: "0 0 6px rgba(201,165,90,0.4)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          {/* AI selection label */}
          <div className="flex items-center gap-2 justify-center">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1l1.5 4.5L14 8l-4.5 1.5L8 14l-1.5-4.5L2 8l4.5-1.5L8 1z"
                fill="#C9A55A"
                opacity="0.7"
              />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(201,165,90,0.6)",
              }}
            >
              3 selected by AI
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (feature === "analytics") {
    return (
      <div style={{ width: 300 }}>
        <div style={{ ...glass, padding: "20px 18px", position: "relative", overflow: "hidden" }}>
          <div style={shimmer} />
          {/* Stats row */}
          <div className="flex gap-3 mb-5">
            {[
              { val: "142", lbl: "Views", trend: "+23%" },
              { val: "23", lbl: "Saves", trend: "+12%" },
              { val: "8", lbl: "Boards", trend: "+4" },
            ].map((s) => (
              <div
                key={s.lbl}
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  borderRadius: 10,
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  textAlign: "center",
                }}
              >
                <div
                  className="font-editorial"
                  style={{ fontSize: 20, color: "#C9A55A", lineHeight: 1 }}
                >
                  {s.val}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 8,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: 3,
                  }}
                >
                  {s.lbl}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 8,
                    color: "rgba(52,211,153,0.6)",
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  {s.trend}
                </div>
              </div>
            ))}
          </div>
          {/* Chart */}
          <div className="flex items-end gap-[3px] mb-4" style={{ height: 64, padding: "0 4px" }}>
            {[30, 42, 55, 38, 62, 70, 48, 58, 75, 52, 65, 85, 72, 90].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  borderRadius: 2,
                  background:
                    i >= 11
                      ? "linear-gradient(to top, rgba(201,165,90,0.5), rgba(201,165,90,0.15))"
                      : "rgba(255,255,255,0.05)",
                  transition: "height 0.5s ease",
                }}
              />
            ))}
          </div>
          {/* Activity */}
          <div
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              backgroundColor: "rgba(201,165,90,0.04)",
              border: "1px solid rgba(201,165,90,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#C9A55A",
                boxShadow: "0 0 8px rgba(201,165,90,0.4)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Wilhelmina viewed your profile · 3h
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (feature === "discovery") {
    return (
      <div style={{ width: 300 }}>
        <div style={{ ...glass, padding: "18px 16px", position: "relative", overflow: "hidden" }}>
          <div style={shimmer} />
          {/* Search */}
          <div
            style={{
              height: 38,
              borderRadius: 10,
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.3 }}>
              <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, fontFamily: "var(--font-sans)", flex: 1 }}>
              Search talent...
            </span>
          </div>
          {/* Filter chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {["Editorial", "5′9″+", "NYC"].map((c) => (
              <div
                key={c}
                style={{
                  padding: "3px 10px",
                  borderRadius: 100,
                  backgroundColor: "rgba(201,165,90,0.08)",
                  border: "1px solid rgba(201,165,90,0.15)",
                  fontSize: 9,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  color: "#C9A55A",
                }}
              >
                {c}
              </div>
            ))}
          </div>
          {/* Results */}
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const highlighted = i === 2;
              return (
                <div
                  key={i}
                  style={{
                    height: 72,
                    borderRadius: 8,
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: highlighted
                      ? "1.5px solid rgba(201,165,90,0.5)"
                      : "1px solid rgba(255,255,255,0.04)",
                    boxShadow: highlighted
                      ? "0 4px 20px rgba(201,165,90,0.12)"
                      : "none",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ height: "60%", backgroundColor: `rgba(255,255,255,${0.02 + i * 0.008})` }} />
                  <div style={{ padding: "4px 6px" }}>
                    <div style={{ height: 3, width: "60%", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 2 }} />
                  </div>
                  {highlighted && (
                    <div
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        width: 14,
                        height: 14,
                        borderRadius: 4,
                        backgroundColor: "rgba(201,165,90,0.15)",
                        border: "1px solid rgba(201,165,90,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="7" height="7" viewBox="0 0 16 16" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="#C9A55A" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (feature === "wallet") {
    return (
      <div style={{ width: 240 }}>
        <div
          style={{
            ...glass,
            padding: "28px 20px",
            textAlign: "center",
            borderRadius: 20,
            background:
              "linear-gradient(160deg, rgba(201,165,90,0.05), rgba(255,255,255,0.015))",
            border: "1px solid rgba(201,165,90,0.12)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={shimmer} />
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "1.5px solid rgba(201,165,90,0.25)",
              margin: "0 auto 14px",
              backgroundColor: "rgba(255,255,255,0.03)",
            }}
          />
          <div style={{ height: 6, width: "45%", backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 3, margin: "0 auto 5px" }} />
          <div style={{ height: 4, width: "30%", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 2, margin: "0 auto 18px" }} />
          {/* QR */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 10,
              border: "1px solid rgba(201,165,90,0.15)",
              margin: "0 auto 14px",
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 2,
              padding: 7,
            }}
          >
            {Array.from({ length: 25 }).map((_, j) => (
              <div
                key={j}
                style={{
                  borderRadius: 1,
                  backgroundColor:
                    j % 3 === 0
                      ? "rgba(201,165,90,0.25)"
                      : "rgba(255,255,255,0.04)",
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "5px 12px",
              borderRadius: 8,
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Wallet size={10} color="rgba(255,255,255,0.4)" />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
              Add to Wallet
            </span>
          </div>
        </div>
      </div>
    );
  }

  // portfolio
  return (
    <div style={{ width: 300 }}>
      <div style={{ ...glass, overflow: "hidden", position: "relative" }}>
        <div style={shimmer} />
        {/* Browser chrome */}
        <div
          style={{
            padding: "8px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <div className="flex gap-[5px]">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div
                key={c}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: c,
                  opacity: 0.65,
                }}
              />
            ))}
          </div>
          <div
            style={{
              flex: 1,
              height: 20,
              borderRadius: 5,
              backgroundColor: "rgba(255,255,255,0.03)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 8,
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.02em",
              }}
            >
              your-name.pholio.studio
            </span>
          </div>
        </div>
        {/* Page */}
        <div style={{ padding: "18px 16px" }}>
          <div className="flex items-center gap-3 mb-4">
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1.5px solid rgba(201,165,90,0.2)",
                backgroundColor: "rgba(255,255,255,0.03)",
              }}
            />
            <div>
              <div style={{ height: 5, width: 60, backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 3, marginBottom: 4 }} />
              <div style={{ height: 4, width: 40, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 2 }} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[5px]">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  height: 55,
                  borderRadius: 6,
                  backgroundColor: `rgba(255,255,255,${0.025 + i * 0.006})`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeatureShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Auto-cycle through features
  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % FEATURES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [inView, prefersReducedMotion]);

  const active = FEATURES[activeIndex];

  return (
    <section
      ref={ref}
      id="features"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#070706",
        padding: "7rem 0 8rem",
      }}
    >
      {/* Fine noise texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.025,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Ambient glow — follows active feature color */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute"
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          right: "5%",
          top: "25%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          filter: "blur(120px)",
          backgroundColor: active.color,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <div className="flex items-center gap-3 mb-5">
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
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C9A55A",
              }}
            >
              Features
            </span>
          </div>
          <h2
            className="font-editorial"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              color: "#FFFFFF",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Built for how agencies{" "}
            <span className="font-editorial-italic" style={{ color: "#C9A55A" }}>
              actually work.
            </span>
          </h2>
        </motion.div>

        {/* Split layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left — tab list */}
          <motion.div
            className="w-full lg:w-[52%] flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {FEATURES.map((ft, i) => {
              const Icon = ft.icon;
              const isActive = i === activeIndex;
              return (
                <button
                  key={ft.key}
                  onClick={() => setActiveIndex(i)}
                  className="group w-full text-left"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "16px 14px",
                    borderRadius: 10,
                    backgroundColor: isActive
                      ? "rgba(201,165,90,0.04)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(201,165,90,0.08)"
                      : "1px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                    marginBottom: 2,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Progress bar on active */}
                  {isActive && !prefersReducedMotion && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: "linear" }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 1,
                        backgroundColor: "rgba(201,165,90,0.2)",
                        transformOrigin: "left",
                      }}
                    />
                  )}

                  {/* Number */}
                  <span
                    className="font-editorial-italic"
                    style={{
                      fontSize: "0.75rem",
                      color: isActive
                        ? "#C9A55A"
                        : "rgba(255,255,255,0.15)",
                      transition: "color 0.3s ease",
                      flexShrink: 0,
                      width: 20,
                      marginTop: 2,
                    }}
                  >
                    {ft.eyebrow}
                  </span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon
                        size={13}
                        color={isActive ? "#C9A55A" : "rgba(255,255,255,0.25)"}
                        strokeWidth={1.5}
                        style={{ transition: "color 0.3s ease", flexShrink: 0 }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.5625rem",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: isActive ? "#C9A55A" : "rgba(255,255,255,0.25)",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {ft.label}
                      </span>
                    </div>
                    <p
                      className="font-editorial"
                      style={{
                        fontSize: "1.2rem",
                        color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.35)",
                        fontWeight: 400,
                        lineHeight: 1.2,
                        letterSpacing: "-0.015em",
                        transition: "color 0.3s ease",
                        marginBottom: isActive ? 6 : 0,
                      }}
                    >
                      {ft.headline}{" "}
                      <span className="font-editorial-italic" style={{ color: isActive ? "#C9A55A" : "rgba(255,255,255,0.2)" }}>
                        {ft.accent}
                      </span>
                    </p>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.8125rem",
                            color: "rgba(255,255,255,0.4)",
                            lineHeight: 1.6,
                            margin: 0,
                            overflow: "hidden",
                          }}
                        >
                          {ft.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Right — visual panel */}
          <div className="flex-1 flex items-center justify-center min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: 0.4, ease }}
              >
                <FeatureVisual feature={active.visual} color={active.color} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-50%); }
          50%      { transform: translateX(0%); }
        }
      `}</style>
    </section>
  );
}
