"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useAnimation, useMotionValue } from "framer-motion";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

interface HeroProps {
  ready?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.08 },
  },
};

const itemUp = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 62, damping: 20 },
  },
};

const HERO_WORDS = ["Present", "Connect", "Curate", "Discover", "Book"];
const WORD_INTERVAL = 2400;
const N = HERO_WORDS.length;
const ROW_H = 52; // px

export function Hero({ ready = false }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [wordIndex, setWordIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (ready) controls.start("visible");
  }, [ready, controls]);

  useEffect(() => {
    if (!ready) return;
    const timer = setInterval(() => {
      setWordIndex((i) => (i + 1) % N);
    }, WORD_INTERVAL);
    return () => clearInterval(timer);
  }, [ready]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textSpring = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  // Cursor-tracked spotlight
  // Cursor-tracked spotlight using GPU-accelerated x/y transforms
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 800);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 400);
  const spotX = useSpring(mouseX, { stiffness: 38, damping: 22 });
  const spotY = useSpring(mouseY, { stiffness: 38, damping: 22 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.45, 0.88, 1],
    ["#050505", "#0a0a0a", "#050505", "#050505"]
  );

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const textY = useTransform(textSpring, [0, 1], [0, -400]);

  const textOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  const uiOpacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroOpacity = useTransform(scrollYProgress, [0.75, 0.95], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] z-10">
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ opacity: heroOpacity }}
      >

        <motion.div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: bgColor }}
        />

        {/* ── Background Typography (Z-10) ── */}
        <motion.div
          className="absolute inset-0 z-10 flex items-start justify-center pt-[15vh] pointer-events-none px-6"
          style={{ opacity: textOpacity, y: textY, willChange: "transform" }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" as const } }
            }}
            className="text-[28vw] leading-none text-center whitespace-nowrap"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              opacity: 0.85,
              WebkitTextStroke: "1px rgba(201, 165, 90, 0.5)",
              textShadow: "0 0 40px rgba(201, 165, 90, 0.15)", // Simplified text shadow
            }}
          >
            PHOLIO
          </motion.h1>
        </motion.div>

        {/* ── Ambient Base (mobile + always-on) ── */}
        <motion.div
          className="absolute inset-0 z-[14] pointer-events-none"
          animate={{ opacity: [0.07, 0.13, 0.07] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201, 165, 90, 0.4) 0%, transparent 70%)",
          }}
        />
        {/* ── Cursor Spotlight (desktop) ── */}
        <motion.div
          className="absolute z-[15] pointer-events-none rounded-full"
          animate={{ opacity: [0.13, 0.22, 0.13] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1000,
            height: 1000,
            left: -500, // Offset by half of width/height
            top: -500,
            x: spotX,
            y: spotY,
            background: "radial-gradient(circle, rgba(201, 165, 90, 0.6) 0%, transparent 70%)",
          }}
        />

        {/* ── Foreground Image (Z-20) ── */}
        <motion.div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
          <motion.div
            className="w-full h-full relative flex items-end justify-center pb-6"
            style={{ scale: imageScale }}
          >
            <img
              src="/images/model2-nobg.png"
              alt="Editorial fashion model cutout"
              className="h-[100vh] w-auto object-contain object-bottom"
            />
          </motion.div>
        </motion.div>

        {/* ── UI Chrome (Z-30) ── */}
        <motion.div className="absolute inset-0 z-30 pointer-events-none">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="w-full h-full relative max-w-[1440px] mx-auto px-6"
          >
            {/* Nav links - Top Left */}
            <motion.div
              variants={itemUp}
              style={{ opacity: uiOpacity }}
              className="absolute top-10 left-6 md:left-12 flex items-center gap-8 pointer-events-auto"
            >
              {[
                { label: 'Platform', href: '#platform' },
                { label: 'For Agencies', href: '#agencies' },
                { label: 'Studio+', href: '#studio-plus' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-[10px] font-medium tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors duration-300 pb-1 group"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {link.label}
                  <div
                    className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 ease-out"
                    style={{ backgroundColor: "#C9A55A" }}
                  />
                </a>
              ))}
            </motion.div>

            {/* Log In + Get Scouted - Top Right */}
            <motion.div
              variants={itemUp}
              style={{ opacity: uiOpacity }}
              className="absolute top-8 right-6 md:right-12 flex items-center gap-6 pointer-events-auto"
            >
              <a
                href={`${APP_URL}/login`}
                className="relative text-[10px] font-medium tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors duration-300 pb-1 group"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Log In
                <div
                  className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 ease-out"
                  style={{ backgroundColor: "#C9A55A" }}
                />
              </a>
              <a
                href={`${APP_URL}/onboarding`}
                className="relative text-[10px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 rounded-full focus:outline-none overflow-hidden group transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, #C9A55A 0%, #A68644 100%)",
                  color: "#050505",
                  boxShadow: "0 4px 15px rgba(201, 165, 90, 0.2)",
                  fontFamily: "var(--font-sans)"
                }}
              >
                <span className="relative z-10">Get Scouted</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #DFBE76 0%, #C9A55A 100%)",
                  }}
                />
              </a>
            </motion.div>

            {/* ── Word Wheel - Bottom Right ── */}
            <motion.div
              variants={itemUp}
              style={{ opacity: uiOpacity }}
              className="absolute bottom-16 md:bottom-24 right-6 md:right-12 pointer-events-auto"
            >
              <div
                style={{
                  position: "relative",
                  height: ROW_H * 3,
                  width: 200,
                  overflow: "hidden",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
                }}
              >

                {/* Each word is independently positioned via y transform */}
                {HERO_WORDS.map((word, i) => {
                  // Wrap-aware distance from active index
                  let dist = ((i - wordIndex) % N + N) % N;
                  if (dist > Math.floor(N / 2)) dist -= N;
                  // dist ∈ {-2, -1, 0, 1, 2} for N=5

                  const absD = Math.abs(dist);
                  const isActive = dist === 0;

                  // y: center of window (3 rows, center is row index 1)
                  const yPos = ROW_H + dist * ROW_H;

                  return (
                    <motion.div
                      key={word}
                      animate={{
                        y: yPos,
                        opacity: isActive ? 1 : absD === 1 ? 0.22 : 0,
                        x: isActive ? -12 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 55, damping: 16, mass: 1.2 }}
                      style={{
                        position: "absolute",
                        right: 24,
                        top: 0,
                        height: ROW_H,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "12px",
                      }}
                    >
                      <motion.span
                        animate={{
                          color: isActive ? "#C9A55A" : "#FFFFFF",
                          fontSize: isActive ? "1.75rem" : "1.5rem",
                          scale: isActive ? 1 : 0.9,
                        }}
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontWeight: 300,
                          letterSpacing: "0.02em",
                          whiteSpace: "nowrap",
                          lineHeight: 1,
                        }}
                      >
                        {word}
                      </motion.span>
                      {isActive && (
                        <motion.div
                          layoutId="active-dot"
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: "#C9A55A" }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <motion.div
            className="w-[1px] h-12"
            style={{
              background: "linear-gradient(to bottom, transparent, #C9A55A, transparent)",
              transformOrigin: "top",
            }}
            animate={{ scaleY: [0, 1, 0], y: [0, 20, 40], opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
