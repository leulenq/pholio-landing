"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";

const FREE_FEATURES = [
  "Profile visible to agencies on Pholio",
  "Up to 10 portfolio images",
  "Comp card generated instantly",
  "AI archetype mapping",
  "Up to 3 agency applications per month",
  "Core analytics",
];

const STUDIO_FEATURES = [
  "Unlimited agency applications",
  "AI profile audit & recommendations",
  "Your own talent website",
  "QR code on comp cards",
  "Stronger agency discovery placement",
  "Priority application routing",
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

function formatMoney(n: number) {
  return n.toFixed(n % 1 === 0 ? 0 : 2);
}

export default function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  const [yearly, setYearly] = useState(false);

  const monthlyPrice = 9.99;
  const yearlyPricePerMo = 7.99;
  const yearlyTotal = Math.round(yearlyPricePerMo * 12 * 100) / 100;
  const price = yearly ? yearlyPricePerMo : monthlyPrice;

  const motionFade = reduceMotion
    ? { initial: false, animate: {} }
    : {
        initial: { opacity: 0, y: 20 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.8, ease },
      };

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative overflow-hidden py-28 texture-grain md:py-40"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="absolute inset-x-0 top-0 h-px divider-gold-center" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div className="mb-12 text-center" {...motionFade}>
          <span
            className="text-label mb-6 block"
            style={{ color: "var(--color-gold)" }}
          >
            Pricing
          </span>
          <h2 className="mb-5 font-editorial text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Simple, transparent{" "}
            <span
              className="font-editorial-italic"
              style={{ color: "var(--color-gold)" }}
            >
              pricing.
            </span>
          </h2>
          <p
            className="mx-auto max-w-md text-base md:text-lg"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Start free. Upgrade when you&apos;re ready.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          className="mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          <span
            id="pricing-billing-monthly"
            className="text-sm font-medium transition-colors duration-300"
            style={{
              color: !yearly ? "var(--color-ink)" : "var(--color-text-muted)",
            }}
          >
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label={
              yearly
                ? "Yearly billing on. Switch to monthly billing."
                : "Monthly billing on. Switch to yearly billing and save."
            }
            onClick={() => setYearly((v) => !v)}
            className="relative h-7 w-12 shrink-0 rounded-full transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)]"
            style={{
              backgroundColor: yearly
                ? "var(--color-gold)"
                : "var(--color-cream-dark)",
            }}
          >
            <span
              className="absolute top-0.5 block h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-300 motion-reduce:transition-none"
              style={{
                transform: yearly ? "translateX(22px)" : "translateX(2px)",
              }}
            />
          </button>
          <span
            id="pricing-billing-yearly"
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
                initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide"
                style={{
                  backgroundColor: "rgba(200,169,110,0.1)",
                  color: "var(--color-gold-dark)",
                }}
              >
                Save ~20%
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <p
          className="mb-10 text-center text-xs leading-relaxed sm:text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          {yearly ? (
            <>
              Studio+ shown as <strong className="font-semibold text-[var(--color-ink)]">${formatMoney(yearlyPricePerMo)}/month</strong> when paid annually (
              <strong className="font-semibold text-[var(--color-ink)]">${formatMoney(yearlyTotal)}</strong> once per year).
            </>
          ) : (
            <>
              Studio+ <strong className="font-semibold text-[var(--color-ink)]">${formatMoney(monthlyPrice)}/month</strong>, billed monthly. Cancel anytime.
            </>
          )}
        </p>


        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Free — slightly de-emphasized */}
            <motion.div
              className="overflow-hidden rounded-[10px] border border-black/[0.06] bg-white/90 p-7 md:p-9"
              style={{
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease }}
            >
              <h3 className="mb-1 text-base font-semibold text-[var(--color-ink)] md:text-lg">
                Free
              </h3>
              <p
                className="mb-5 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                Get started with the essentials
              </p>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="font-editorial text-3xl md:text-4xl">$0</span>
                <span
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  /month
                </span>
              </div>
              <a
                href={`${APP_URL}/signup`}
                className="mb-6 block w-full rounded-lg border border-[var(--color-cream-dark)] px-6 py-3 text-center text-sm font-semibold text-[var(--color-ink)] transition-all duration-300 hover:bg-black/[0.02] hover:shadow-sm"
              >
                Get started free
              </a>
              <p
                className="mb-6 rounded-md border border-black/[0.05] bg-[var(--color-cream-warm)]/50 px-3 py-2.5 text-xs leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <span className="font-semibold text-[var(--color-ink)]">On Free,</span> agency applications are capped at{" "}
                <span className="font-medium">3 per month</span>. Studio+ removes that limit.
              </p>
              <ul className="space-y-3">
                {FREE_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="var(--color-text-muted)"
                      strokeWidth={1.5}
                      aria-hidden
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
              className="relative overflow-hidden rounded-[10px] border-[1.5px] border-[var(--color-gold)] bg-white p-8 md:p-10"
              style={{
                boxShadow:
                  "0 30px 100px rgba(200,169,110,0.08), 0 1px 3px rgba(0,0,0,0.03)",
              }}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.16, ease }}
            >
              <div
                className="absolute -top-px left-8 rounded-b-md px-3 py-1 text-[9px] font-semibold uppercase tracking-widest"
                style={{
                  backgroundColor: "var(--color-gold)",
                  color: "var(--color-velvet)",
                }}
              >
                Recommended
              </div>

              <h3 className="mb-1 mt-3 text-lg font-semibold">Studio+</h3>
              <p
                className="mb-2 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                The full professional toolkit
              </p>
              <Link
                href="/studio-plus"
                className="mb-6 inline-flex text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-gold-dark)] underline-offset-4 transition-opacity hover:opacity-80 hover:underline"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                See everything in Studio+
              </Link>

              <div className="mb-2 flex flex-wrap items-baseline gap-x-1 gap-y-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={price}
                    className="font-editorial text-4xl"
                    initial={reduceMotion ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: 6 }}
                    transition={{ duration: reduceMotion ? 0 : 0.22 }}
                  >
                    ${formatMoney(price)}
                  </motion.span>
                </AnimatePresence>
                <span
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  /month
                </span>
              </div>
              {yearly && (
                <p
                  className="mb-5 text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Billed as ${formatMoney(yearlyTotal)} per year after trial.
                </p>
              )}
              {!yearly && (
                <p className="mb-5 text-xs" style={{ color: "var(--color-text-muted)" }}>
                  Billed monthly after trial.
                </p>
              )}

              <a
                href={`${APP_URL}/signup?plan=studio`}
                className="btn-gold mb-3 block w-full rounded-lg text-center"
              >
                Start 14-day free trial
              </a>
              <p
                className="mb-8 text-center text-[11px] leading-relaxed sm:text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                No charge for 14 days. Cancel before the trial ends and you won&apos;t be
                charged. After that, billing follows the plan you chose (monthly or annual).
              </p>

              <ul className="space-y-3.5">
                {STUDIO_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="var(--color-gold)"
                      strokeWidth={1.5}
                      aria-hidden
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

          {/* Enterprise */}
          <motion.div
            className="relative overflow-hidden rounded-[10px] border border-white/[0.06] border-t-[rgba(201,165,90,0.28)] p-8 md:p-10"
            style={{
              backgroundColor: "var(--color-velvet, #1a1a2e)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            }}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.22, ease }}
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="shrink-0">
                <h3
                  className="mb-1 text-lg font-semibold"
                  style={{ color: "rgba(255,255,255,0.95)" }}
                >
                  Enterprise
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  For agencies managing talent at scale
                </p>
                <p
                  className="mb-6 mt-2 max-w-sm text-xs leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  Volume seats, security review, SSO, and custom workflows — tell us what your board needs.
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
                  Contact us
                </a>
              </div>

              <div
                className="hidden w-px shrink-0 self-stretch md:block"
                style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
              />

              <ul className="grid flex-1 grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                {ENTERPRISE_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="var(--color-gold, #c8a96e)"
                      strokeWidth={1.5}
                      aria-hidden
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

        <p
          className="mx-auto mt-10 max-w-2xl text-center text-[11px] leading-relaxed sm:text-xs"
          style={{ color: "var(--color-text-muted)" }}
        >
          Prices in USD. Applicable taxes may be added at checkout. Plans renew automatically until you cancel in your account.
        </p>
      </div>
    </section>
  );
}
