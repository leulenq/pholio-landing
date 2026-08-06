# Custom Pholio Pricing Page (Stripe) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a custom-branded `/pricing` page on the landing site (Free, Studio+, Enterprise) whose Studio+ tier hands off to the existing `pholio-app` Stripe engine, extended to support separate monthly and annual price IDs.

**Architecture:** The landing `/pricing` page is a storefront only — it never calls Stripe directly. Studio+ deep-links to the authenticated app's talent Settings billing surface carrying the chosen interval; the app (Express + React client) owns auth and all Stripe calls. The app's single-price checkout is extended to resolve a price by interval (monthly/annual), keeping the 14-day trial.

**Tech Stack:** Next.js 16 / React 19 / Tailwind v4 / framer-motion (landing); Express + Knex + Stripe + Jest (app server); Vite + React Router + React Query (app client).

**Repos:**
- Landing: `/Users/lenquanhone/Projects/pholio-landing`
- App: `/Users/lenquanhone/Projects/pholio-app`

---

## File structure

**Landing (`pholio-landing`)**
- Create `components/pricing/plans.ts` — shared price constants, feature copy, CTA URL builders. Single source of pricing truth.
- Create `app/pricing/page.tsx` — route + metadata, renders the client component.
- Create `components/pricing/PricingPageClient.tsx` — full 3-tier UI + monthly/yearly toggle + interval-aware Studio+ CTA.
- Modify `components/PricingSection.tsx` — consume `plans.ts`; repoint home CTAs to `/pricing` (home becomes the teaser funneling to the canonical page).

**App server (`pholio-app`)**
- Modify `src/config.js` — add `priceIdMonthly`, `priceIdAnnual`.
- Modify `src/shared/lib/stripe.js` — export pure `resolvePriceId(interval)`; `createCheckoutSession` takes `interval`.
- Modify `src/routes/stripe.js` — read/validate `interval`, persist resolved price, fix redirects.
- Create `tests/stripe-resolve-price.test.js` — unit test for `resolvePriceId`.

**App client (`pholio-app/client`)**
- Modify `client/src/domains/talent/api/talent.js` — `createCheckoutSession(interval)`.
- Modify `client/src/domains/talent/pages/SettingsPage/index.jsx` — read `?interval=`, interval selector, pass interval to checkout.

---

## Task 1: Shared pricing data module (landing)

**Files:**
- Create: `/Users/lenquanhone/Projects/pholio-landing/components/pricing/plans.ts`

- [ ] **Step 1: Create the module**

```ts
// components/pricing/plans.ts
import { PHOLIO_APP_ORIGIN } from "@/lib/pholio-app-origin";

export type BillingInterval = "monthly" | "annual";

export const MONTHLY_PRICE = 9.99;
export const YEARLY_PRICE_PER_MONTH = 7.99;
export const YEARLY_TOTAL = Math.round(YEARLY_PRICE_PER_MONTH * 12 * 100) / 100; // 95.88

export const FREE_POINTS = [
  "3 agency applications each month",
  "Standard comp card with public profile",
  "Basic profile analytics",
  "Agency discovery when complete",
] as const;

export const STUDIO_POINTS = [
  "Unlimited agency applications",
  "Your own talent website and custom domain",
  "Featured placement on pholio.studio",
  "Smart portfolio builder",
  "Personalized agency and board match scores",
  "Advanced analytics with no storage limits",
] as const;

export const ENTERPRISE_POINTS = [
  "Team shortlists",
  "Managed roster workflows",
  "Priority support",
] as const;

export function formatMoney(value: number): string {
  return value.toFixed(value % 1 === 0 ? 0 : 2);
}

/** Free tier → app onboarding (casting-call apply funnel). */
export const FREE_ONBOARDING_HREF = `${PHOLIO_APP_ORIGIN}/onboarding`;

/** Enterprise → Contact Sales (mailto). */
export const ENTERPRISE_MAILTO = "mailto:hello@pholio.studio?subject=Pholio%20Enterprise";

/**
 * Studio+ → authenticated app billing surface, carrying the chosen interval.
 * App resolves login (if needed) and lets the user start Stripe Checkout there.
 */
export function studioCheckoutHref(interval: BillingInterval): string {
  return `${PHOLIO_APP_ORIGIN}/dashboard/talent/settings?upgrade=studio-plus&interval=${interval}`;
}
```

- [ ] **Step 2: Typecheck**

Run: `cd /Users/lenquanhone/Projects/pholio-landing && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/lenquanhone/Projects/pholio-landing
git add components/pricing/plans.ts
git commit -m "feat(pricing): shared pricing data + CTA builders"
```

---

## Task 2: `/pricing` route + client component (landing)

**Files:**
- Create: `/Users/lenquanhone/Projects/pholio-landing/app/pricing/page.tsx`
- Create: `/Users/lenquanhone/Projects/pholio-landing/components/pricing/PricingPageClient.tsx`

- [ ] **Step 1: Create the route file**

```tsx
// app/pricing/page.tsx
import type { Metadata } from "next";
import PricingPageClient from "@/components/pricing/PricingPageClient";

const canonical = "https://www.pholio.studio/pricing";

export const metadata: Metadata = {
  title: "Pricing — Pholio",
  description:
    "One profile, every next room. Start free, or arrive through Studio+ — a finished talent address agencies and casting teams remember.",
  openGraph: {
    title: "Pricing — Pholio",
    description:
      "Start free, or arrive through Studio+. Monthly or annual, billed through Stripe.",
    url: canonical,
    siteName: "Pholio",
    type: "website",
  },
  alternates: { canonical },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
```

- [ ] **Step 2: Create the client component**

Mirrors the accepted `PricingSection.tsx` visual language (dark featured Studio+, white Free, Enterprise strip, "Pricing" backdrop, monthly/yearly toggle). Differences from the home section: Studio+ CTA carries the toggle interval to the app billing surface; Free → onboarding; Enterprise → mailto; copy reads as a standalone page.

```tsx
// components/pricing/PricingPageClient.tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  FREE_POINTS,
  STUDIO_POINTS,
  ENTERPRISE_POINTS,
  MONTHLY_PRICE,
  YEARLY_PRICE_PER_MONTH,
  YEARLY_TOTAL,
  formatMoney,
  FREE_ONBOARDING_HREF,
  ENTERPRISE_MAILTO,
  studioCheckoutHref,
} from "@/components/pricing/plans";

const ease = [0.22, 1, 0.36, 1] as const;

function FeatureLine({ children, tone = "light" }: { children: string; tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  return (
    <li className={`flex items-start gap-3 text-sm leading-7 ${isDark ? "text-white/70" : "text-[rgba(15,23,42,0.72)]"}`}>
      <span
        className={`mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          isDark ? "bg-[#C9A55A]/18 text-[#D8BD76]" : "bg-[#C9A55A]/12 text-[#A8894E]"
        }`}
      >
        <Check size={13} strokeWidth={2.2} />
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function PricingPageClient() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [yearly, setYearly] = useState(true);
  const interval = yearly ? "annual" : "monthly";
  const studioPrice = yearly ? YEARLY_PRICE_PER_MONTH : MONTHLY_PRICE;

  const cardInitial = { opacity: 0, y: prefersReducedMotion ? 0 : 18 };
  const cardAnimate = inView ? { opacity: 1, y: 0 } : {};

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="texture-grain relative overflow-hidden bg-[var(--color-cream)] px-5 pb-24 pt-28 sm:px-6 md:px-10 md:pb-28 md:pt-32 lg:px-16"
    >
      <div className="absolute inset-x-0 top-0 h-px divider-gold-center" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.52) 0%, rgba(250,247,242,0.96) 34%, rgba(245,240,232,0.92) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.55fr)] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={cardAnimate}
            transition={{ duration: 0.72, ease }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase text-[var(--color-gold-dark)]">Pricing</p>
            <h2 className="mt-5 font-editorial text-4xl leading-[1.04] text-[var(--color-ink)] sm:text-5xl md:text-6xl" style={{ letterSpacing: 0 }}>
              One profile.
              <span className="block font-editorial-italic text-[var(--color-gold)]" style={{ letterSpacing: 0 }}>
                Every next room.
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)] md:text-base">
              Free gets you discovered. Studio+ gives your work a finished address when an agency, client, or casting team opens it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
            animate={cardAnimate}
            transition={{ duration: 0.68, delay: 0.08, ease }}
            className="justify-self-start border-l border-[rgba(201,165,90,0.45)] pl-5 lg:justify-self-end"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className={`text-sm font-semibold ${yearly ? "text-[rgba(15,23,42,0.44)]" : "text-[var(--color-ink)]"}`}>Monthly</span>
              <button
                type="button"
                role="switch"
                aria-checked={yearly}
                aria-label={yearly ? "Yearly billing selected. Switch to monthly billing." : "Monthly billing selected. Switch to yearly billing."}
                onClick={() => setYearly((value) => !value)}
                className="relative h-8 w-14 rounded-full border border-[rgba(201,165,90,0.34)] bg-[#D4B36D]/70 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A55A]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)]"
              >
                <span
                  className="absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(15,23,42,0.16)] transition-transform duration-300"
                  style={{ transform: yearly ? "translateX(24px)" : "translateX(4px)" }}
                />
              </button>
              <span className={`text-sm font-semibold ${yearly ? "text-[var(--color-ink)]" : "text-[rgba(15,23,42,0.44)]"}`}>Yearly</span>
              <span className="rounded-full border border-[rgba(201,165,90,0.34)] px-3 py-1 text-xs font-semibold text-[var(--color-gold-dark)]">Save 20%</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[rgba(15,23,42,0.62)]">
              {yearly
                ? `Studio+ shown monthly, billed yearly at $${formatMoney(YEARLY_TOTAL)}.`
                : "Studio+ billed monthly. Free needs no card."}
            </p>
          </motion.div>
        </div>

        <div className="relative mt-12 lg:mt-16">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.04, ease }}
            className="pointer-events-none absolute left-1/2 top-[-3.2rem] z-0 -translate-x-1/2 select-none whitespace-nowrap font-editorial text-[5.6rem] leading-none text-[rgba(15,23,42,0.055)] sm:top-[-4.5rem] sm:text-[8.5rem] md:top-[-6.5rem] md:text-[12rem] lg:top-[-7.2rem] lg:text-[15.5rem]"
            style={{ letterSpacing: 0 }}
          >
            Pricing
          </motion.div>

          <div className="relative z-10 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.75fr)] lg:gap-6">
            <motion.article
              initial={cardInitial}
              animate={cardAnimate}
              transition={{ duration: 0.72, delay: 0.12, ease }}
              className="relative overflow-hidden rounded-lg border border-[rgba(201,165,90,0.34)] bg-[#070806] p-6 text-white md:p-8 lg:min-h-[34rem]"
              style={{ boxShadow: "0 32px 80px -44px rgba(5,5,5,0.72), inset 0 1px 0 rgba(255,255,255,0.06)" }}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, #C9A55A, transparent)" }} />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-[-3.5rem] right-[-0.7rem] font-editorial text-[16rem] leading-none text-[#C9A55A]/[0.055]" style={{ letterSpacing: 0 }}>P</div>

              <div className="relative flex h-full flex-col">
                <div className="flex flex-col gap-7 border-b border-white/[0.08] pb-8 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-sm">
                    <p className="text-xs font-semibold uppercase text-[#D8BD76]">Recommended</p>
                    <h3 className="mt-6 text-xl font-semibold text-white">Studio+</h3>
                    <p className="mt-5 text-sm leading-7 text-white/54">
                      For talent who needs a portfolio that reads complete before the second click.
                    </p>
                  </div>
                  <div className="md:text-right">
                    <div className="flex flex-wrap items-end gap-x-3 gap-y-2 md:justify-end">
                      <span className="font-editorial text-6xl leading-none text-[#FAF7F2] md:text-7xl" style={{ letterSpacing: 0 }}>${formatMoney(studioPrice)}</span>
                      <span className="pb-2 text-sm text-white/46">/mo</span>
                    </div>
                    <p className="mt-4 text-xs leading-6 text-white/38">
                      {yearly ? `Billed annually at $${formatMoney(YEARLY_TOTAL)} per year.` : "Billed monthly. Cancel when the season ends."}
                    </p>
                  </div>
                </div>

                <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                  {STUDIO_POINTS.map((point) => (
                    <FeatureLine key={point} tone="dark">{point}</FeatureLine>
                  ))}
                </ul>

                <div className="mt-8">
                  <a
                    href={studioCheckoutHref(interval)}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#C9A55A] px-5 text-sm font-semibold text-[#050505] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
                  >
                    Start Studio+
                    <ArrowRight size={16} strokeWidth={2} />
                  </a>
                  <p className="mt-3 text-xs leading-6 text-white/38">14-day free trial. Secure checkout by Stripe.</p>
                </div>
              </div>
            </motion.article>

            <motion.article
              initial={cardInitial}
              animate={cardAnimate}
              transition={{ duration: 0.72, delay: 0.18, ease }}
              className="rounded-lg border border-[rgba(15,23,42,0.1)] bg-white/88 p-6 md:p-8 lg:min-h-[34rem]"
              style={{ boxShadow: "0 28px 70px -48px rgba(15,23,42,0.34), inset 0 1px 0 rgba(255,255,255,0.92)" }}
            >
              <p className="text-xs font-semibold uppercase text-[rgba(15,23,42,0.48)]">Free</p>
              <h3 className="mt-6 text-xl font-semibold text-[var(--color-ink)]">Start being seen</h3>
              <div className="mt-8 flex flex-wrap items-end gap-x-3 gap-y-2">
                <span className="font-editorial text-6xl leading-none text-[var(--color-ink)] md:text-7xl" style={{ letterSpacing: 0 }}>$0</span>
                <span className="pb-2 text-sm text-[rgba(15,23,42,0.52)]">/month</span>
              </div>
              <p className="mt-5 text-sm leading-7 text-[rgba(15,23,42,0.58)]">No card required.</p>
              <a
                href={FREE_ONBOARDING_HREF}
                className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-[rgba(15,23,42,0.13)] bg-white px-5 text-sm font-semibold text-[var(--color-ink)] transition-colors duration-300 hover:border-[rgba(201,165,90,0.6)] hover:text-[var(--color-gold-dark)]"
              >
                Begin your portfolio
              </a>

              <div className="my-8 h-px bg-[rgba(15,23,42,0.07)]" />

              <ul className="grid gap-4">
                {FREE_POINTS.map((point) => (
                  <FeatureLine key={point}>{point}</FeatureLine>
                ))}
              </ul>
            </motion.article>
          </div>

          <motion.article
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
            animate={cardAnimate}
            transition={{ duration: 0.68, delay: 0.24, ease }}
            className="relative z-10 mt-5 rounded-lg border border-[rgba(15,23,42,0.1)] bg-white/82 p-5 md:p-6"
            style={{ boxShadow: "0 24px 60px -46px rgba(15,23,42,0.28), inset 0 1px 0 rgba(255,255,255,0.9)" }}
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="font-semibold text-[var(--color-ink)]">
                  Enterprise <span className="font-normal text-[rgba(15,23,42,0.58)]">for agencies, boards, and teams operating at scale.</span>
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {ENTERPRISE_POINTS.map((point) => (
                    <FeatureLine key={point}>{point}</FeatureLine>
                  ))}
                </ul>
              </div>
              <a
                href={ENTERPRISE_MAILTO}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border-b border-[#C9A55A] px-1 text-sm font-semibold text-[var(--color-ink)] transition-colors duration-300 hover:text-[var(--color-gold-dark)] sm:w-fit"
              >
                Talk to us
                <ArrowRight size={15} strokeWidth={2} />
              </a>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
```

Note: `<Link>` import is intentionally unused-safe — remove the `import Link` line if `npx tsc`/eslint flags it as unused (all CTAs here are `<a>` because they leave the site or are mailto). Prefer removing the unused import.

- [ ] **Step 3: Remove the unused Link import**

Delete the line `import Link from "next/link";` from `PricingPageClient.tsx` (no `<Link>` is used — Free/Studio+/Enterprise all use `<a>` to external/mailto targets).

- [ ] **Step 4: Typecheck + lint**

Run: `cd /Users/lenquanhone/Projects/pholio-landing && npx tsc --noEmit && npx eslint app/pricing/page.tsx components/pricing/PricingPageClient.tsx`
Expected: no errors.

- [ ] **Step 5: Visual check**

Run dev server (in tmux) and load the page:
```bash
cd /Users/lenquanhone/Projects/pholio-landing
tmux new-session -d -s dev "npm run dev" 2>/dev/null || true
sleep 4
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3001/pricing
curl -s http://localhost:3001/pricing | grep -iE "failed to compile|module not found|unhandled runtime" || echo "no compile errors"
```
Expected: `200`, and "no compile errors". Then confirm in a browser: toggle flips price ($9.99 ↔ $7.99) and the Studio+ link `href` switches `interval=monthly` ↔ `interval=annual`.

- [ ] **Step 6: Commit**

```bash
cd /Users/lenquanhone/Projects/pholio-landing
git add app/pricing/page.tsx components/pricing/PricingPageClient.tsx
git commit -m "feat(pricing): custom /pricing page with interval-aware Studio+ handoff"
```

---

## Task 3: Home section consumes shared data + funnels to /pricing (landing)

**Files:**
- Modify: `/Users/lenquanhone/Projects/pholio-landing/components/PricingSection.tsx`

- [ ] **Step 1: Import shared data and remove local duplicates**

In `components/PricingSection.tsx`, replace the local constants/arrays/`formatMoney` (lines 9-55, the `ease`/price consts, `FREE_POINTS`, `STUDIO_POINTS`, `ENTERPRISE_POINTS`, `formatMoney`) with imports from `plans.ts`. Keep the local `ease` constant (framer needs it) and the `FeatureLine` component.

Add near the top imports:
```tsx
import {
  FREE_POINTS,
  STUDIO_POINTS,
  ENTERPRISE_POINTS,
  MONTHLY_PRICE,
  YEARLY_PRICE_PER_MONTH,
  YEARLY_TOTAL,
  formatMoney,
} from "@/components/pricing/plans";
```
Delete the now-duplicated `const MONTHLY_PRICE`, `const YEARLY_PRICE_PER_MONTH`, `const YEARLY_TOTAL`, the three `*_POINTS` arrays, and the `formatMoney` function from this file. Keep `const ease = [0.22, 1, 0.36, 1] as const;`.

- [ ] **Step 2: Repoint home CTAs to the canonical /pricing page**

The home section is now the teaser. Change the Studio+ CTA (currently `<Link href="/studio-plus">…Explore Studio+`) and the Free CTA (currently `<a href={`${APP_URL}/signup`}>…Begin your portfolio`) to both point to `/pricing`:

Studio+ CTA → keep it a `<Link href="/pricing">` with label `Explore Studio+`.
Free CTA → change to `<Link href="/pricing">` with label `Begin your portfolio` (drop the `${APP_URL}/signup` target; the canonical Free CTA on `/pricing` handles onboarding).

Leave the Enterprise mailto CTA unchanged. The `APP_URL` import becomes unused — remove `import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";` if eslint/tsc flags it.

- [ ] **Step 3: Typecheck + lint**

Run: `cd /Users/lenquanhone/Projects/pholio-landing && npx tsc --noEmit && npx eslint components/PricingSection.tsx`
Expected: no errors.

- [ ] **Step 4: Visual check**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3001/
curl -s http://localhost:3001/ | grep -iE "failed to compile|module not found|unhandled runtime" || echo "no compile errors"
```
Expected: `200`, "no compile errors". In a browser, confirm the home pricing section looks identical to before and its CTAs now navigate to `/pricing`.

- [ ] **Step 5: Commit**

```bash
cd /Users/lenquanhone/Projects/pholio-landing
git add components/PricingSection.tsx
git commit -m "refactor(pricing): home section reuses shared data, funnels to /pricing"
```

---

## Task 4: App config — dual price IDs (app server)

**Files:**
- Modify: `/Users/lenquanhone/Projects/pholio-app/src/config.js` (stripe block, ~lines 71-77)

- [ ] **Step 1: Add monthly/annual price IDs**

Change the `stripe` config block to:
```js
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    priceId: process.env.STRIPE_PRICE_ID, // legacy / monthly fallback
    priceIdMonthly: process.env.STRIPE_PRICE_ID_MONTHLY,
    priceIdAnnual: process.env.STRIPE_PRICE_ID_ANNUAL,
    baseUrl: process.env.BASE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL || 'http://localhost:3000'
  },
```

- [ ] **Step 2: Commit**

```bash
cd /Users/lenquanhone/Projects/pholio-app
git add src/config.js
git commit -m "feat(stripe): add monthly/annual price ID config"
```

---

## Task 5: Price resolution + interval-aware checkout (app server, TDD)

**Files:**
- Modify: `/Users/lenquanhone/Projects/pholio-app/src/shared/lib/stripe.js`
- Create: `/Users/lenquanhone/Projects/pholio-app/tests/stripe-resolve-price.test.js`

- [ ] **Step 1: Write the failing test**

```js
// tests/stripe-resolve-price.test.js
const config = require('../src/config');
const { resolvePriceId } = require('../src/shared/lib/stripe');

describe('resolvePriceId', () => {
  const original = { ...config.stripe };
  afterEach(() => { Object.assign(config.stripe, original); });

  test('annual interval resolves to the annual price', () => {
    config.stripe.priceIdAnnual = 'price_annual_x';
    config.stripe.priceIdMonthly = 'price_monthly_x';
    expect(resolvePriceId('annual')).toBe('price_annual_x');
  });

  test('monthly interval resolves to the monthly price', () => {
    config.stripe.priceIdAnnual = 'price_annual_x';
    config.stripe.priceIdMonthly = 'price_monthly_x';
    expect(resolvePriceId('monthly')).toBe('price_monthly_x');
  });

  test('unknown/missing interval defaults to monthly', () => {
    config.stripe.priceIdMonthly = 'price_monthly_x';
    expect(resolvePriceId(undefined)).toBe('price_monthly_x');
    expect(resolvePriceId('weekly')).toBe('price_monthly_x');
  });

  test('monthly falls back to legacy priceId when priceIdMonthly unset', () => {
    config.stripe.priceIdMonthly = undefined;
    config.stripe.priceId = 'price_legacy';
    expect(resolvePriceId('monthly')).toBe('price_legacy');
  });

  test('throws a clear error when the resolved price is missing', () => {
    config.stripe.priceIdAnnual = undefined;
    expect(() => resolvePriceId('annual')).toThrow(/annual price/i);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd /Users/lenquanhone/Projects/pholio-app && npx jest tests/stripe-resolve-price.test.js`
Expected: FAIL — `resolvePriceId is not a function`.

- [ ] **Step 3: Implement `resolvePriceId` and wire it into `createCheckoutSession`**

In `src/shared/lib/stripe.js`, add the pure helper (above `createCheckoutSession`):
```js
/**
 * Resolve the Stripe price ID for a billing interval.
 * @param {('monthly'|'annual')} interval
 * @returns {string} Stripe price ID
 */
function resolvePriceId(interval = 'monthly') {
  if (interval === 'annual') {
    const id = config.stripe.priceIdAnnual;
    if (!id) {
      throw new Error('Stripe annual price is not configured. Set STRIPE_PRICE_ID_ANNUAL.');
    }
    return id;
  }
  const id = config.stripe.priceIdMonthly || config.stripe.priceId;
  if (!id) {
    throw new Error('Stripe monthly price is not configured. Set STRIPE_PRICE_ID_MONTHLY (or STRIPE_PRICE_ID).');
  }
  return id;
}
```

Change `createCheckoutSession` to accept an interval and use the resolved price. Replace its signature and the `config.stripe.priceId` checks/usage:
```js
async function createCheckoutSession(customerId, userId, userEmail, interval = 'monthly') {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.');
  }

  const priceId = resolvePriceId(interval);

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    subscription_data: {
      trial_period_days: 14,
      metadata: { userId: userId }
    },
    success_url: `${config.stripe.baseUrl}/stripe/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.stripe.baseUrl}/dashboard/talent/settings?canceled=true`,
    metadata: { userId: userId, userEmail: userEmail, interval },
    allow_promotion_codes: true
  });

  return session;
}
```

Add `resolvePriceId` to `module.exports`:
```js
module.exports = {
  stripe,
  getOrCreateCustomer,
  createCheckoutSession,
  createCustomerPortalSession,
  getSubscription,
  cancelSubscription,
  verifyWebhookSignature,
  resolvePriceId
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd /Users/lenquanhone/Projects/pholio-app && npx jest tests/stripe-resolve-price.test.js`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
cd /Users/lenquanhone/Projects/pholio-app
git add src/shared/lib/stripe.js tests/stripe-resolve-price.test.js
git commit -m "feat(stripe): resolve price by interval, interval-aware checkout"
```

---

## Task 6: Checkout route reads interval (app server)

**Files:**
- Modify: `/Users/lenquanhone/Projects/pholio-app/src/routes/stripe.js` (the `/create-checkout-session` handler, ~lines 24-92)

- [ ] **Step 1: Read + validate interval, pass it through, persist resolved price**

In the `/create-checkout-session` handler:

After `const userId = req.session.userId;`, add interval parsing:
```js
    const requested = (req.body && req.body.interval) || 'monthly';
    const interval = requested === 'annual' ? 'annual' : 'monthly';
```

Change the checkout session creation call to pass the interval:
```js
    const session = await createCheckoutSession(customer.id, userId, user.email, interval);
```

Change the subscription record's `stripePriceId` from the hardcoded `config.stripe.priceId` to the resolved price. Replace the `subscriptionData` block with:
```js
    const { resolvePriceId } = require('../shared/lib/stripe');
    const subscriptionData = {
      userId,
      stripeCustomerId: customer.id,
      stripePriceId: resolvePriceId(interval),
      status: 'trialing',
      trialStart: null,
      trialEnd: null
    };
```

- [ ] **Step 2: Redirect stale success/cancel targets to the live settings surface**

In the same file, in `/checkout/success` and `/checkout/cancel` and `/customer-portal` handlers, replace each `res.redirect('/pro/upgrade')` with `res.redirect('/dashboard/talent/settings')`. (There are several occurrences — replace all of them.)

- [ ] **Step 3: Sanity-run the server**

Run: `cd /Users/lenquanhone/Projects/pholio-app && node -e "require('./src/routes/stripe.js'); console.log('stripe route loads OK')"`
Expected: prints `stripe route loads OK` with no throw.

- [ ] **Step 4: Commit**

```bash
cd /Users/lenquanhone/Projects/pholio-app
git add src/routes/stripe.js
git commit -m "feat(stripe): checkout route honors billing interval; redirect to settings"
```

---

## Task 7: Talent API passes interval (app client)

**Files:**
- Modify: `/Users/lenquanhone/Projects/pholio-app/client/src/domains/talent/api/talent.js` (lines 76-78)

- [ ] **Step 1: Accept an interval argument**

Replace:
```js
  createCheckoutSession: () =>
    apiClient.post('/create-checkout-session', {}, { baseURL: '/stripe' }),
```
with:
```js
  createCheckoutSession: (interval = 'monthly') =>
    apiClient.post('/create-checkout-session', { interval }, { baseURL: '/stripe' }),
```

- [ ] **Step 2: Commit**

```bash
cd /Users/lenquanhone/Projects/pholio-app
git add client/src/domains/talent/api/talent.js
git commit -m "feat(talent): pass billing interval to checkout session"
```

---

## Task 8: Settings billing — interval selection + URL preselect (app client)

**Files:**
- Modify: `/Users/lenquanhone/Projects/pholio-app/client/src/domains/talent/pages/SettingsPage/index.jsx` (`SubscriptionSection`, ~lines 744-820)

- [ ] **Step 1: Read the interval from the URL and add interval state**

At the top of the file, ensure `useSearchParams` is imported from `react-router-dom` (add to the existing react-router-dom import, or add a new import line):
```js
import { useSearchParams } from 'react-router-dom';
```

In `SubscriptionSection`, after the existing `const [isOpeningBilling, setIsOpeningBilling] = useState(false);`, add:
```js
  const [searchParams] = useSearchParams();
  const initialInterval = searchParams.get('interval') === 'annual' ? 'annual' : 'monthly';
  const [interval, setInterval] = useState(initialInterval);
```

- [ ] **Step 2: Pass the interval into checkout**

Change `openBilling` so the checkout call uses the selected interval:
```js
  const openBilling = async () => {
    if (subscription?.isPro || subscription?.stripeCustomerId) {
      window.location.href = '/stripe/customer-portal';
      return;
    }

    setIsOpeningBilling(true);
    try {
      const session = await talentApi.createCheckoutSession(interval);
      if (session?.url) {
        window.location.href = session.url;
      } else {
        window.location.href = '/dashboard/talent/settings';
      }
    } catch (error) {
      toast.error(error?.message || 'Unable to open billing');
      setIsOpeningBilling(false);
    }
  };
```

- [ ] **Step 3: Add a monthly/annual selector for non-pro users**

Inside the plan card, only when the user is not pro, render a minimal interval selector above the "Upgrade Plan" button (so the visitor arriving from `/pricing` can review/confirm the interval they chose). Insert before the existing upgrade `<button …>` in the `ts-plan-left` block:
```jsx
            {!subscription.isPro && (
              <div className="ts-billing-interval" role="group" aria-label="Billing interval" style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button
                  type="button"
                  className={`ts-btn ${interval === 'monthly' ? 'ts-btn-primary' : 'ts-btn-ghost'}`}
                  style={{ padding: '5px 12px', fontSize: '12px' }}
                  aria-pressed={interval === 'monthly'}
                  onClick={() => setInterval('monthly')}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  className={`ts-btn ${interval === 'annual' ? 'ts-btn-primary' : 'ts-btn-ghost'}`}
                  style={{ padding: '5px 12px', fontSize: '12px' }}
                  aria-pressed={interval === 'annual'}
                  onClick={() => setInterval('annual')}
                >
                  Annual
                </button>
              </div>
            )}
```
(If `ts-btn-primary` does not exist in the Settings CSS, use `ts-btn-ghost` for both and rely on `aria-pressed` + an inline `style` border to indicate the active one — confirm the class set when implementing.)

- [ ] **Step 4: Build the client to verify it compiles**

Run: `cd /Users/lenquanhone/Projects/pholio-app && npm run client:build`
Expected: build succeeds with no errors referencing `SettingsPage` or `useSearchParams`.

- [ ] **Step 5: Commit**

```bash
cd /Users/lenquanhone/Projects/pholio-app
git add client/src/domains/talent/pages/SettingsPage/index.jsx
git commit -m "feat(talent): interval selection + URL preselect on settings billing"
```

---

## Task 9: End-to-end verification (Stripe test mode)

**Files:** none (manual verification).

- [ ] **Step 1: Configure test-mode env**

In `pholio-app`, ensure `.env` has test-mode `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, and the two new price IDs created in the Stripe dashboard:
- `STRIPE_PRICE_ID_MONTHLY` — recurring monthly, $9.99.
- `STRIPE_PRICE_ID_ANNUAL` — recurring yearly, $95.88 (matches $7.99/mo × 12; adjust if you change the displayed figure).

- [ ] **Step 2: Verify the monthly path**

Run the app (`npm run dev:all`) and the landing (`npm run dev`). From landing `/pricing` with the toggle on **Monthly**, click **Start Studio+** → confirm it lands on the app billing surface with `interval=monthly` preselected → click upgrade → Stripe Checkout shows the **$9.99/mo** price with a 14-day trial. Complete with test card `4242 4242 4242 4242`.

- [ ] **Step 3: Verify the annual path**

Repeat with the toggle on **Yearly** → `interval=annual` preselected → Stripe Checkout shows the **$95.88/yr** price with the 14-day trial.

- [ ] **Step 4: Verify post-checkout sync**

After completing checkout, confirm: redirect lands on `/dashboard/talent/settings`; the `subscriptions` row has the correct `stripe_price_id` for the chosen interval; webhook/`/stripe/checkout/success` flips `profiles.is_pro` to true; a returning pro user clicking upgrade is routed to the **customer portal** (not checkout).

- [ ] **Step 5: Verify Free + Enterprise**

From `/pricing`: Free **Begin your portfolio** → app `/onboarding`. Enterprise **Talk to us** → mailto draft with `Pholio Enterprise` subject.

- [ ] **Step 6: Verify logged-out handoff**

Log out of the app, then click **Start Studio+** from `/pricing`. Confirm the app sends you to login and, after auth, returns you to the settings billing surface with the interval preserved. If the return URL is NOT preserved, add return-URL handling to the app's auth redirect (small follow-up — note it and confirm with the user before expanding scope).

---

## Notes / open items

- **Annual amount:** decided as **$7.99/mo billed annually = $95.88/yr** (carried from the accepted `PricingSection.tsx`). The Stripe `STRIPE_PRICE_ID_ANNUAL` must match this figure; if you change it, update `components/pricing/plans.ts` (`YEARLY_PRICE_PER_MONTH`).
- **Toggle style vs. memory:** `/pricing` mirrors the accepted home toggle (pill switch + "Save 20%" chip), which conflicts with the `no-pills-no-dots` memory. Kept for visual consistency with the shipped home section; revisit both together if you'd rather honor the memory with a hairline control.
- **Login return URL (Task 9 Step 6):** assumed the app preserves the return URL through login. Verify; if absent, it's a small addition gated on user confirmation.
