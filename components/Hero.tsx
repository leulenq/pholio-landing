"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useAnimation,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { MARKETING_NAV_LINKS } from "@/lib/marketing-nav-links";
import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";

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

const HERO_WORDS = ["Digitals", "Portfolio", "Comp Card", "Castings", "Bookings"];
const WORD_INTERVAL = 2400;
const N = HERO_WORDS.length;
const ROW_H = 52; // px

/**
 * The hero narrative, two beats on one continuous scroll, one static image
 * throughout (no frame-sequence playback):
 *
 *   1. REST  She holds, centred, PHOLIO set large behind her. Word wheel and
 *            scroll cue present.
 *   2. DRIFT Wordmark and word wheel clear away; she drifts to the right,
 *            opening the left side. "PHOLIO sees you." resolves into the gap.
 */
const REST_END = 0.1; // scroll held on the opening pose before anything moves
const STAND_END = 0.42;

export function Hero({ ready = false }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const pathname = usePathname();
  const [wordIndex, setWordIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ready) return;

    if (prefersReducedMotion) {
      controls.set("visible");
      return;
    }

    controls.start("visible");
  }, [ready, controls, prefersReducedMotion]);

  useEffect(() => {
    if (!ready || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setWordIndex((i) => (i + 1) % N);
    }, WORD_INTERVAL);
    return () => clearInterval(timer);
  }, [ready, prefersReducedMotion]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // The story completes while the frame is still sticky. The final viewport of
  // travel is a separate handoff phase in which the model bridges into the
  // comp-card scene.
  const { scrollYProgress: storyProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: handoffProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });

  const storySpring = useSpring(storyProgress, {
    stiffness: 82,
    damping: 26,
    mass: 0.45,
  });

  // Cursor-tracked spotlight using GPU-accelerated x/y transforms
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 800);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 400);
  const spotX = useSpring(mouseX, { stiffness: 38, damping: 22 });
  const spotY = useSpring(mouseY, { stiffness: 38, damping: 22 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  const bgColor = useTransform(
    storyProgress,
    [0, 0.45, 0.88, 1],
    ["#050505", "#0a0a0a", "#050505", "#050505"]
  );

  // ── She clears the centre and takes the right ──────────────────────────
  const desktopModelX = useTransform(
    storySpring,
    [0, REST_END, STAND_END, 1],
    ["0vw", "0vw", "20vw", "22vw"]
  );
  const mobileModelX = useTransform(
    storySpring,
    [0, REST_END, STAND_END, 1],
    ["0vw", "0vw", "17vw", "20vw"]
  );
  const modelX = isMobile ? mobileModelX : desktopModelX;

  // Standing makes her taller in frame; ease the scale back so she doesn't grow
  // out of the sticky band as she rises.
  const desktopModelScale = useTransform(
    storySpring,
    [0, REST_END, STAND_END, 1],
    // Calibrated against the supplied production screenshot: the sequence's
    // 1.03 optical correction and this parent scale produce a 1.096 effective
    // opening size, matching its head, centre line, and boot clearance.
    [1.064, 1.064, 0.84, 0.8]
  );
  const mobileModelScale = useTransform(
    storySpring,
    [0, REST_END, STAND_END, 1],
    [1.02, 1.02, 0.76, 0.72]
  );
  const modelScale = isMobile ? mobileModelScale : desktopModelScale;

  const mobileModelY = useTransform(
    storySpring,
    [0, REST_END, STAND_END],
    ["0dvh", "0dvh", "10dvh"]
  );

  // ── The wordmark sits behind her, and clears as she rises ──────────────
  const wordmarkOpacity = useTransform(
    storySpring,
    [0, 0.05, 0.26],
    [0.85, 0.85, 0]
  );
  const wordmarkY = useTransform(storySpring, [0, 0.3], [0, -120]);

  // Word wheel and scroll cue belong to the resting state only.
  const chromeOpacity = useTransform(storySpring, [0, 0.05, 0.22], [1, 1, 0]);
  const scrollIndicatorOpacity = useTransform(storyProgress, [0, 0.08], [1, 0]);

  // ── The verdict lands in the space she vacated ─────────────────────────
  const seesYouOpacity = useTransform(
    storySpring,
    [0.28, 0.46, 0.94, 1],
    [0, 1, 1, 0]
  );
  const seesYouY = useTransform(storySpring, [0.28, 0.46], [28, 0]);

  const ambientScale = useTransform(storySpring, [0, 0.6, 1], [1, 1.025, 1.08]);
  const sceneryOpacity = useTransform(storySpring, [0, 0.36, 0.58], [1, 1, 0.2]);

  // Once the sticky frame releases it travels upward by one viewport. The equal
  // counter-translation keeps the cutout fixed as the comp-card scene rises.
  const imageCounterY = useTransform(handoffProgress, [0, 1], ["0dvh", "100dvh"]);
  const desktopImageOpacity = useTransform(handoffProgress, [0, 0.86, 1], [1, 1, 0]);
  const mobileImageOpacity = useTransform(
    handoffProgress,
    [0, 0.72, 0.96, 1],
    [1, 1, 0.12, 0]
  );
  const imageOpacity = isMobile ? mobileImageOpacity : desktopImageOpacity;
  const desktopMaskPosition = useTransform(
    handoffProgress,
    [0, 0.18, 0.92, 1],
    ["0% 0%", "0% 0%", "0% 100%", "0% 100%"]
  );
  const mobileMaskPosition = useTransform(
    handoffProgress,
    [0, 0.32, 0.9, 1],
    ["0% 0%", "0% 0%", "0% 100%", "0% 100%"]
  );
  const imageMaskPosition = isMobile ? mobileMaskPosition : desktopMaskPosition;

  return (
    <section
      ref={containerRef}
      className={
        prefersReducedMotion
          ? "relative min-h-[100dvh] z-10"
          : "relative h-[460vh] z-10"
      }
    >
      {/* ── UI Chrome: embedded in the hero composition, scrolls with the section ── */}
      <motion.div data-hero-chrome className="absolute inset-x-0 top-0 z-30 h-[100dvh] pointer-events-none">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="w-full h-full relative max-w-[1440px] mx-auto px-6"
        >
          {/* Inline hero chrome — phones & tablets, container-less like desktop.
              Only three destinations, so the links sit inline (no hamburger);
              the sitewide Header takes over after the comp-card handoff. */}
          <motion.div
            variants={itemUp}
            className="pointer-events-auto absolute left-5 top-6 z-[38] flex items-center gap-4 lg:hidden"
          >
            {MARKETING_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: pathname === link.href ? "#C9A55A" : undefined,
                }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>

          <motion.div
            variants={itemUp}
            className="pointer-events-auto absolute right-5 top-5 z-[38] flex items-center gap-4 lg:hidden"
          >
            <a
              href={`${APP_URL}/login`}
              className="hidden text-[10px] font-medium uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white sm:inline"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Log In
            </a>
            <a
              href={`${APP_URL}/onboarding`}
              className="rounded-[3px] border border-[#E4C77F] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#050505] transition-transform active:scale-[0.98]"
              style={{
                fontFamily: "var(--font-sans)",
                background: "linear-gradient(135deg, #E0BF73 0%, #CDA653 100%)",
                boxShadow: "0 6px 20px rgba(205,166,83,0.3)",
              }}
            >
              Get Scouted
            </a>
          </motion.div>

          {/* Nav links - Top Left (desktop lg+) */}
          <motion.div
            variants={itemUp}
            className="pointer-events-auto absolute left-6 top-10 hidden items-center gap-8 lg:left-12 lg:flex"
          >
            {MARKETING_NAV_LINKS.map((link) => {
              const className =
                "relative text-[10px] font-medium tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors duration-300 pb-1 group";
              const underline = (
                <div
                  className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 ease-out"
                  style={{ backgroundColor: "#C9A55A" }}
                />
              );
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={className}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {link.label}
                  {underline}
                </Link>
              );
            })}
          </motion.div>

          {/* Log In + Get Scouted - Top Right (desktop lg+) */}
          <motion.div
            variants={itemUp}
            className="pointer-events-auto absolute right-6 top-8 hidden items-center gap-6 lg:right-12 lg:flex"
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
              className="relative overflow-hidden rounded-[3px] border border-[#E4C77F] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] focus:outline-none group transition-transform duration-300 hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, #E0BF73 0%, #CDA653 100%)",
                color: "#050505",
                boxShadow: "0 6px 20px rgba(205, 166, 83, 0.3)",
                fontFamily: "var(--font-sans)"
              }}
            >
              <span className="relative z-10">Get Scouted</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #E9CF91 0%, #D6B25F 100%)",
                }}
              />
            </a>
          </motion.div>

        </motion.div>
      </motion.div>

      <motion.div
        className={
          prefersReducedMotion
            ? "relative h-[100dvh] w-full overflow-hidden flex items-center justify-center"
            : "sticky top-0 h-[100dvh] w-full overflow-x-clip overflow-y-visible flex items-center justify-center"
        }
      >

        <motion.div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: bgColor }}
        />

        {/* ── BEAT 1 — the wordmark, set behind her ── */}
        <motion.div
          className="absolute inset-0 z-10 flex items-start justify-center pt-[17vh] md:pt-[15vh] pointer-events-none px-6"
          style={
            prefersReducedMotion
              ? { opacity: 0.85 }
              : {
                  opacity: wordmarkOpacity,
                  y: wordmarkY,
                  willChange: "transform, opacity",
                }
          }
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
              WebkitTextStroke: "1px rgba(201, 165, 90, 0.5)",
              textShadow: "0 0 40px rgba(201, 165, 90, 0.15)",
            }}
          >
            PHOLIO
          </motion.h1>
        </motion.div>

        {/* ── Ambient Base (mobile + always-on) ── */}
        <motion.div
          className="absolute inset-0 z-[14] pointer-events-none"
          style={{
            opacity: prefersReducedMotion ? 1 : sceneryOpacity,
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={
              prefersReducedMotion
                ? { opacity: 0.1 }
                : { opacity: [0.07, 0.13, 0.07] }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }
            style={{
              background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201, 165, 90, 0.4) 0%, transparent 70%)",
              scale: prefersReducedMotion ? 1 : ambientScale,
            }}
          />
        </motion.div>

        {/* ── Cursor Spotlight (desktop) ── */}
        <motion.div
          className="absolute inset-0 z-[15] overflow-hidden pointer-events-none"
          style={{
            opacity: prefersReducedMotion ? 1 : sceneryOpacity,
          }}
        >
          <motion.div
            className="absolute rounded-full"
            animate={
              prefersReducedMotion
                ? { opacity: 0.16 }
                : { opacity: [0.13, 0.22, 0.13] }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }
            style={{
              width: 1000,
              height: 1000,
              left: -500,
              top: -500,
              x: spotX,
              y: spotY,
              background: "radial-gradient(circle, rgba(201, 165, 90, 0.6) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* ── BEAT 2/3 — "PHOLIO sees you." takes the side she left ── */}
        {!prefersReducedMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[18] mx-auto max-w-[1440px] px-6 md:px-12"
            style={{
              opacity: seesYouOpacity,
              y: seesYouY,
              willChange: "transform, opacity",
            }}
          >
            <div className="absolute left-6 top-[11dvh] max-w-[13.5rem] sm:max-w-[18rem] md:left-12 md:top-1/2 md:max-w-[32rem] md:-translate-y-1/2">
              <h2
                className="font-editorial text-[2.35rem] leading-[0.98] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[5.8rem]"
                style={{ color: "#FAF7F2" }}
              >
                PHOLIO
                <br />
                <span
                  className="font-editorial-italic inline-block pb-2 leading-[1.08]"
                  style={{ color: "#C9A55A" }}
                >
                  sees you.
                </span>
              </h2>
              <p
                className="mt-4 font-editorial text-base leading-snug sm:text-xl md:mt-8 md:text-2xl"
                style={{ color: "rgba(250,247,242,0.68)" }}
              >
                It sees what sets you apart.
              </p>
            </div>
          </motion.div>
        )}

        {/* ── The model: rest → stand → turn, scrubbed by scroll ── */}
        <motion.div
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          style={
            prefersReducedMotion
              ? { opacity: 1 }
              : {
                  y: imageCounterY,
                  opacity: imageOpacity,
                  maskImage:
                    "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)",
                  maskSize: "100% 300%",
                  WebkitMaskSize: "100% 300%",
                  maskPosition: imageMaskPosition,
                  WebkitMaskPosition: imageMaskPosition,
                  willChange: "transform, opacity, mask-position",
                }
          }
        >
          <motion.div
            className="w-full h-full relative flex items-end justify-center pb-6"
            style={{
              scale: prefersReducedMotion ? 1 : modelScale,
              x: prefersReducedMotion ? 0 : modelX,
              y: prefersReducedMotion || !isMobile ? 0 : mobileModelY,
              willChange: prefersReducedMotion ? "auto" : "transform",
            }}
          >
            <div className="relative h-[100dvh] w-[80dvh] max-w-[134vw] shrink-0 translate-y-[6vh] md:max-w-none md:translate-y-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-model.webp"
                alt="Ola in a seated editorial pose"
                className="absolute inset-0 h-full w-full scale-[1.03] object-contain object-bottom"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ── BEAT 1 — word wheel, clears with the wordmark ── */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none"
          style={{
            opacity: prefersReducedMotion ? 1 : chromeOpacity,
            willChange: "opacity",
          }}
        >
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="w-full h-full relative max-w-[1440px] mx-auto px-6"
          >
            <motion.div
              data-hero-word-wheel
              variants={itemUp}
              className="absolute bottom-16 right-6 hidden pointer-events-auto md:block md:bottom-24 md:right-12"
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
                {HERO_WORDS.map((word, i) => {
                  let dist = ((i - wordIndex) % N + N) % N;
                  if (dist > Math.floor(N / 2)) dist -= N;

                  const absD = Math.abs(dist);
                  const isActive = dist === 0;
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
                        gap: "14px",
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
                      {/* Hairline marks the active word. House rule: hairlines,
                          never dots or pills. */}
                      {isActive && (
                        <motion.div
                          layoutId="active-rule"
                          className="h-[1px] w-6"
                          style={{ backgroundColor: "#C9A55A" }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
          style={{
            opacity: prefersReducedMotion ? 0 : scrollIndicatorOpacity,
          }}
        >
          <motion.div
            className="w-[1px] h-12"
            style={{
              background: "linear-gradient(to bottom, transparent, #C9A55A, transparent)",
              transformOrigin: "top",
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : { scaleY: [0, 1, 0], y: [0, 20, 40], opacity: [0, 1, 0] }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </motion.div>
      </motion.div>

    </section>
  );
}
