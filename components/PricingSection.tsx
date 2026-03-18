"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const FREE_FEATURES = [
  "Professional profile, visible to every agency",
  "Up to 10 portfolio images",
  "Comp card generated instantly",
  "AI archetype mapping",
  "Up to 3 agency applications per month",
  "Analytics",
];

const STUDIO_FEATURES = [
  "Unlimited agency applications",
  "AI profile audit ",
  "Your own talent website",
  "QR code on comp cards",
  "Agency discovery",
  "Priority applications",
  "Custom .studio URL",
  "Advanced analytics",
];

const ENTERPRISE_FEATURES = [
  "Unlimited talent seats",
  "Dedicated account manager",
  "Custom integrations & API access",
  "SLA & priority support",
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [yearly, setYearly] = useState(false);

  const monthlyPrice = 9.99;
  const yearlyPrice = 7.99;
  const price = yearly ? yearlyPrice : monthlyPrice;

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative py-28 md:py-40 overflow-hidden texture-grain"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px divider-gold-center" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <span
            className="text-label mb-6 block"
            style={{ color: "var(--color-gold)" }}
          >
            Pricing
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl mb-5 leading-[1.05]">
            Simple, transparent{" "}
            <span
              className="font-editorial-italic"
              style={{ color: "var(--color-gold)" }}
            >
              pricing.
            </span>
          </h2>
          <p
            className="text-base md:text-lg max-w-md mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Start free. Upgrade when you&apos;re ready.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          className="mb-14 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <span
            className="text-sm font-medium transition-colors duration-300"
            style={{
              color: !yearly ? "var(--color-ink)" : "var(--color-text-muted)",
            }}
          >
            Monthly
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className="relative h-7 w-12 rounded-full transition-colors duration-500"
            style={{
              backgroundColor: yearly
                ? "var(--color-gold)"
                : "var(--color-cream-dark)",
            }}
            aria-label="Toggle yearly pricing"
          >
            <div
              className="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-300"
              style={{
                transform: yearly ? "translateX(22px)" : "translateX(2px)",
              }}
            />
          </button>
          <span
            className="text-sm font-medium transition-colors duration-300"
            style={{
              color: yearly ? "var(--color-ink)" : "var(--color-text-muted)",
            }}
          >
            Yearly
          </span>
          <AnimatePresence>
            {yearly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide"
                style={{
                  backgroundColor: "rgba(200,169,110,0.1)",
                  color: "var(--color-gold-dark)",
                }}
              >
                Save 20%
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {/* Free + Studio+ row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Free */}
          <motion.div
            className="overflow-hidden p-8 md:p-10"
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid rgba(0,0,0,0.04)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <h3 className="text-lg font-semibold mb-1">Free</h3>
            <p
              className="text-sm mb-7"
              style={{ color: "var(--color-text-muted)" }}
            >
              Get started with the essentials
            </p>
            <div className="mb-7 flex items-baseline gap-1">
              <span className="font-editorial text-4xl">$0</span>
              <span
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                /month
              </span>
            </div>
            <a
              href={`${APP_URL}/signup`}
              className="mb-8 block w-full rounded-lg px-6 py-3 text-center text-sm font-semibold transition-all duration-300 hover:shadow-sm"
              style={{
                border: "1px solid var(--color-cream-dark)",
                color: "var(--color-ink)",
              }}
            >
              Get Started Free
            </a>
            <ul className="space-y-3.5">
              {FREE_FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <svg
                    className="h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="var(--color-text-muted)"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Studio+ */}
          <motion.div
            className="relative overflow-hidden p-8 md:p-10"
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1.5px solid var(--color-gold)",
              boxShadow:
                "0 30px 100px rgba(200,169,110,0.08), 0 1px 3px rgba(0,0,0,0.03)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            {/* Badge */}
            <div
              className="absolute -top-px left-8 rounded-b-md px-3 py-1 text-[9px] font-semibold uppercase tracking-widest"
              style={{
                backgroundColor: "var(--color-gold)",
                color: "var(--color-velvet)",
              }}
            >
              Recommended
            </div>

            <h3 className="text-lg font-semibold mb-1 mt-3">Studio+</h3>
            <p
              className="text-sm mb-7"
              style={{ color: "var(--color-text-muted)" }}
            >
              The full professional toolkit
            </p>
            <div className="mb-7 flex items-baseline gap-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={price}
                  className="font-editorial text-4xl"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                >
                  ${price}
                </motion.span>
              </AnimatePresence>
              <span
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                /month
              </span>
            </div>
            <a
              href={`${APP_URL}/signup?plan=studio`}
              className="btn-gold mb-8 block w-full rounded-lg text-center"
            >
              Start 14-Day Trial
            </a>
            <ul className="space-y-3.5">
              {STUDIO_FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <svg
                    className="h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="var(--color-gold)"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
          </div>

          {/* Enterprise — full width */}
          <motion.div
            className="relative overflow-hidden p-8 md:p-10"
            style={{
              backgroundColor: "var(--color-velvet, #1a1a2e)",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              {/* Left: title + price */}
              <div className="shrink-0">
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{ color: "rgba(255,255,255,0.95)" }}
                >
                  Enterprise
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  For agencies managing talent at scale
                </p>
                <div className="mb-6">
                  <span
                    className="font-editorial text-4xl"
                    style={{ color: "rgba(255,255,255,0.95)" }}
                  >
                    Let&apos;s talk.
                  </span>
                </div>
                <a
                  href="mailto:hello@pholio.studio?subject=Enterprise%20Enquiry"
                  className="inline-block rounded-lg px-8 py-3 text-sm font-semibold transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: "rgba(200,169,110,0.15)",
                    border: "1px solid rgba(200,169,110,0.35)",
                    color: "var(--color-gold, #c8a96e)",
                  }}
                >
                  Contact Us
                </a>
              </div>

              {/* Divider */}
              <div
                className="hidden md:block self-stretch w-px shrink-0"
                style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
              />

              {/* Right: features grid */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 flex-1">
                {ENTERPRISE_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    <svg
                      className="h-4 w-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="var(--color-gold, #c8a96e)"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
