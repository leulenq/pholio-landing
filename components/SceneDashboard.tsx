"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CinematicCard from "./CinematicCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FEATURES_GRID = [
  { title: "Custom .studio domain", desc: "Your own branded URL" },
  { title: "Verified metrics", desc: "Trusted by top agencies" },
  { title: "Professional comp cards", desc: "5 editorial themes" },
  { title: "Advanced analytics", desc: "Track who views your profile" },
];

const MEASUREMENTS = [
  { label: "Height", value: "5'11\"" },
  { label: "Bust", value: "34\"" },
  { label: "Waist", value: "25\"" },
  { label: "Hips", value: "35\"" },
];

export default function SceneDashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useGSAP(
    () => {
      if (!orbsRef.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) return;

      const orbs = orbsRef.current.querySelectorAll(".orb");
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: `${20 + i * 10}`,
          x: `${10 + i * 5}`,
          duration: 4 + i * 0.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: "var(--color-cream-warm)" }}
    >
      {/* Floating orbs */}
      <div ref={orbsRef} className="pointer-events-none absolute inset-0">
        <div
          className="orb absolute top-20 right-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: "var(--color-gold)" }}
        />
        <div
          className="orb absolute bottom-40 left-10 h-48 w-48 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "var(--color-ink)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <CinematicCard className="group mx-auto max-w-sm">
              <div
                className="overflow-hidden rounded-2xl shadow-2xl"
                style={{ backgroundColor: "white" }}
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop"
                    alt="Talent profile"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {/* Verified badge */}
                  <div
                    className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: "rgba(200,169,110,0.9)",
                      color: "var(--color-velvet)",
                    }}
                  >
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified
                  </div>
                  {/* Availability */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Available
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-editorial text-xl mb-1">Alessandra V.</h3>
                  <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
                    New York, NY
                  </p>

                  {/* Measurements grid */}
                  <div className="grid grid-cols-4 gap-2">
                    {MEASUREMENTS.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg p-2 text-center"
                        style={{ backgroundColor: "var(--color-cream)" }}
                      >
                        <p className="text-[10px] uppercase tracking-wider mb-0.5"
                           style={{ color: "var(--color-text-muted)" }}>
                          {m.label}
                        </p>
                        <p className="text-sm font-semibold">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CinematicCard>
          </motion.div>

          {/* Right: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-label mb-4 block" style={{ color: "var(--color-gold)" }}>
              Studio+ Dashboard
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl mb-6">
              Present yourself like{" "}
              <span className="font-editorial-italic" style={{ color: "var(--color-gold)" }}>
                a professional.
              </span>
            </h2>
            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Your Studio+ profile is more than a portfolio — it&apos;s a
              verified digital identity. Custom domains, real-time analytics,
              and editorial comp cards that agencies actually want to see.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FEATURES_GRID.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div
                    className="mt-1 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: "var(--color-gold)" }}
                  />
                  <div>
                    <p className="font-medium text-sm">{f.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
