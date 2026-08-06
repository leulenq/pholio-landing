"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const CHAPTERS = [
  {
    n: "01",
    title: "Presentation",
    pull: "Before you walk in, your book has already arrived.",
    body: "Unlimited portfolio depth, refined comp cards, and a personal .studio site—materials that read as intentional, not improvised. Themes are editorial, not templates.",
  },
  {
    n: "02",
    title: "Visibility",
    pull: "Be seen where decisions are made.",
    body: "Priority placement in search and a profile polished for discovery—so the right agencies encounter you in context, not by accident.",
  },
  {
    n: "03",
    title: "Applications",
    pull: "Every door you choose, on your terms.",
    body: "No monthly cap on agency applications. Reach further without diluting how you present—each submission stays on-brand.",
  },
  {
    n: "04",
    title: "Intelligence",
    pull: "Understand who is leaning in.",
    body: "Advanced analytics and a thoughtful profile audit—signal, not noise—so you know what is working before the callback.",
  },
  {
    n: "05",
    title: "Control",
    pull: "You decide how the room reads you.",
    body: "Curate without limits: unlimited images, QR comp cards for the floor, a custom portfolio URL—packaging that respects how agencies actually work.",
  },
];

function ChapterBlock({
  chapter,
  index,
}: {
  chapter: (typeof CHAPTERS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -15% 0px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start"
    >
      <div className="md:col-span-4 lg:col-span-3 flex md:block items-baseline gap-4">
        <motion.span
          className="font-editorial select-none block"
          initial={false}
          animate={
            inView
              ? { opacity: 1, x: 0 }
              : { opacity: prefersReducedMotion ? 1 : 0.15, x: 0 }
          }
          transition={{ duration: 0.9, ease }}
          style={{
            fontSize: "clamp(4rem, 12vw, 7.5rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            color: "rgba(201,165,90,0.12)",
          }}
        >
          {chapter.n}
        </motion.span>
      </div>
      <div className="md:col-span-8 lg:col-span-9">
        <motion.h2
          className="font-editorial m-0"
          initial={false}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 28 }
          }
          transition={{ duration: 0.75, ease }}
          style={{
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#F5F3F0",
          }}
        >
          {chapter.title}
        </motion.h2>
        <motion.p
          className="font-editorial-italic m-0 mt-5"
          initial={false}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }
          }
          transition={{ duration: 0.7, delay: 0.06, ease }}
          style={{
            fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)",
            lineHeight: 1.45,
            color: "rgba(201,165,90,0.85)",
          }}
        >
          {chapter.pull}
        </motion.p>
        <motion.p
          className="m-0 mt-6 max-w-[40rem]"
          initial={false}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 16 }
          }
          transition={{ duration: 0.65, delay: 0.12, ease }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9375rem",
            lineHeight: 1.8,
            color: "rgba(245,243,240,0.38)",
          }}
        >
          {chapter.body}
        </motion.p>
        {index < CHAPTERS.length - 1 && (
          <div
            className="mt-16 md:mt-24 h-px w-full max-w-md"
            style={{
              background:
                "linear-gradient(90deg, rgba(201,165,90,0.25) 0%, transparent 100%)",
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}

export default function StudioPlusChapters() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const railY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -40]
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: "#08070a" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "120px 120px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          <motion.aside
            style={{ y: railY }}
            className="lg:col-span-3 lg:sticky lg:top-28 self-start hidden lg:block"
          >
            <div
              className="h-px w-10 mb-6"
              style={{
                background: "linear-gradient(90deg, var(--color-gold), transparent)",
              }}
            />
            <p
              className="text-label m-0 mb-4"
              style={{ color: "rgba(201,165,90,0.75)" }}
            >
              Chapters
            </p>
            <nav aria-label="Studio+ sections" className="flex flex-col gap-3">
              {CHAPTERS.map((c) => (
                <span
                  key={c.n}
                  className="text-micro"
                  style={{
                    color: "rgba(245,243,240,0.22)",
                    letterSpacing: "0.16em",
                  }}
                >
                  {c.n} — {c.title}
                </span>
              ))}
            </nav>
          </motion.aside>

          <div className="lg:col-span-9 space-y-20 md:space-y-28">
            <div className="lg:hidden mb-4">
              <span className="text-label" style={{ color: "rgba(201,165,90,0.75)" }}>
                Chapters
              </span>
            </div>
            {CHAPTERS.map((chapter, index) => (
              <ChapterBlock key={chapter.n} chapter={chapter} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
