# Custom Pholio Pricing, Powered by Stripe — Design

**Date:** 2026-06-02
**Status:** Approved (design); pending spec review
**Repos touched:** `pholio-landing` (storefront), `pholio-app` (engine)

## Summary

Build a custom-branded `/pricing` page on the landing site presenting three tiers —
**Free**, **Studio+**, **Enterprise** — in Pholio's own design language. The page is a
storefront only: it never calls Stripe directly (a subscription requires an
authenticated user). Studio+ hands off to the existing `pholio-app` Stripe machinery,
which is extended from a single price ID to separate **monthly** and **annual** price
IDs. The result feels like a custom Pholio experience with Stripe in the backend, not a
Stripe-looking frontend. Stripe's hosted pricing-table UI is **not** used.

## Goals

- Custom, on-brand three-tier pricing page at `/pricing` on the landing site.
- Free routes into onboarding; Studio+ connects to Stripe Checkout; Enterprise is
  Contact Sales only.
- Studio+ supports monthly and annual billing via two distinct Stripe price IDs.
- Keep the existing 14-day free trial on Studio+ checkout.
- Reuse the app's existing Stripe engine (customer, checkout session, webhook,
  `is_pro` sync, customer portal) rather than duplicating it.

## Non-goals

- No Stripe-hosted pricing table or Stripe-branded frontend.
- No anonymous/un-authenticated checkout on the landing site.
- No rebuild of the home `PricingSection.tsx` (only CTA alignment to `/pricing`).
- No new auth or backend on the landing site.

## Architecture & flow

The landing `/pricing` page is the **storefront**; `pholio-app` remains the **engine**.

```
Landing /pricing
 ├─ Free        →  app /onboarding (casting-call apply funnel)
 ├─ Studio+     →  app /dashboard/talent/settings?upgrade=studio-plus&interval=monthly|annual
 │                   → (login if needed) → user clicks "Start Studio+"
 │                   → POST /stripe/create-checkout-session { interval }
 │                   → Stripe Checkout (14-day trial, chosen price)
 │                   → webhook + /stripe/checkout/success → is_pro sync
 └─ Enterprise  →  mailto:hello@pholio.studio (Enterprise subject)
```

User chose: dedicated `/pricing` route; Studio+ lands on the app upgrade surface where
the user reviews and clicks Start (not auto-launch); keep the 14-day trial; Free →
`/onboarding`; Enterprise → mailto.

## Component 1 — Landing site (`pholio-landing`)

### Files
- `app/pricing/page.tsx` — route + `Metadata` (title, description, canonical
  `https://www.pholio.studio/pricing`). Server component that renders the client.
- `components/pricing/PricingPageClient.tsx` — `"use client"` three-tier layout +
  monthly/annual selector + framer-motion arrival.
- `components/pricing/plans.ts` — single source of displayed copy and amounts.

### Design rules (from CLAUDE.md + memory)
- Palette: velvet ink / cream / gold only. No other accents, no SaaS gradients, no emoji.
- Type: Noto Serif Display (display), Inter (body), JetBrains Mono (labels/amounts).
- Exactly one italic-gold "verdict" word in the page headline.
- Motion = arrival (single ease `cubic-bezier(0.22,1,0.36,1)`), honor
  `useReducedMotion()`. Hover = color shift, not scale.
- Furniture: hairlines, gold sweep, low-opacity grain, mono kickers.
- **No pills, no dot indicators** (memory rule). The monthly/annual selector is a
  **hairline segmented control**: two serif/mono labels with a gold underline sliding
  under the active option — not a pill switch.

### Tiers
- **Free** — cream card. Amount `$0`. CTA "Create your profile" →
  `${PHOLIO_APP_ORIGIN}/onboarding`.
- **Studio+** — featured dark (`#0A0A0A`) card, carried forward from the visual
  hierarchy already converged on in `PricingSection.tsx`. Amount reflects the selected
  interval. CTA "Start Studio+" →
  `${PHOLIO_APP_ORIGIN}/dashboard/talent/settings?upgrade=studio-plus&interval=<monthly|annual>`.
- **Enterprise** — cream card. CTA "Contact sales" →
  `mailto:hello@pholio.studio?subject=Pholio%20Enterprise`.

### Displayed amounts
Real money — displayed values must equal the Stripe price objects.
- Monthly: `$9.99`.
- Annual: placeholder `$99/yr` in `plans.ts`, flagged `// CONFIRM: must match Stripe
  STRIPE_PRICE_ID_ANNUAL amount`. User confirms when creating the Stripe annual price.

### Home section
Leave `components/PricingSection.tsx` in place; repoint its CTAs to `/pricing` so there
is one source of truth. No structural rebuild.

## Component 2 — App backend (`pholio-app`)

### `src/config.js`
Add under `stripe`:
- `priceIdMonthly: process.env.STRIPE_PRICE_ID_MONTHLY`
- `priceIdAnnual: process.env.STRIPE_PRICE_ID_ANNUAL`

Keep legacy `priceId` (`STRIPE_PRICE_ID`) as the monthly fallback when
`priceIdMonthly` is unset.

### `src/shared/lib/stripe.js`
`createCheckoutSession(customerId, userId, email, interval = 'monthly')`:
- Resolve `priceId` from interval: `annual` → `priceIdAnnual`; otherwise
  `priceIdMonthly || priceId`.
- Throw a clear error if the resolved price ID is missing.
- Keep `mode: 'subscription'`, `subscription_data.trial_period_days: 14`,
  `allow_promotion_codes: true`.

### `src/routes/stripe.js` `/create-checkout-session`
- Read `interval` from `req.body`; validate against `{ 'monthly', 'annual' }`; default
  `monthly` on unknown/missing.
- Pass `interval` into `createCheckoutSession`.
- Persist the resolved `stripePriceId` on the subscription record (replace the hardcoded
  `config.stripe.priceId`).
- Redirect checkout success/cancel to `/dashboard/talent/settings` instead of the stale
  `/pro/upgrade` (the live billing surface is the React Settings page).

## Component 3 — App client (`pholio-app/client`)

### `client/src/domains/talent/api/talent.js`
`createCheckoutSession(interval)` → `POST /create-checkout-session` with `{ interval }`
(baseURL `/stripe`).

### Talent `SettingsPage` billing section
(`client/src/domains/talent/pages/SettingsPage/index.jsx`)
- Read `?interval=` and `?upgrade=` from the URL; preselect monthly/annual and surface
  the Studio+ start CTA (the "app upgrade page" the visitor lands on).
- Pass the selected interval into `createCheckoutSession(interval)`.
- Preserve existing behavior: an already-active subscriber (`isPro` /
  `stripeCustomerId`) is routed to the **customer portal** instead of checkout.

## Configuration / environment

Provided by the user:
- App: `STRIPE_PRICE_ID_MONTHLY`, `STRIPE_PRICE_ID_ANNUAL` (created in Stripe dashboard).
- Landing: `NEXT_PUBLIC_APP_URL` (already present; defaults to
  `https://app.pholio.studio`).

## Edge cases

- **Already subscribed** clicks Studio+ → app opens customer portal (existing logic).
- **Logged-out visitor** → app login, then return to settings with interval preserved.
  Assumption: app auth preserves return URL; verify during implementation and add if
  missing.
- **Unknown / missing `interval`** → default monthly (validated server- and
  client-side).
- **Missing price ID env** → checkout throws a clear configuration error rather than
  silently using the wrong price.

## Verification

- Landing: `npx tsc --noEmit`; dev server in tmux on `:3001`
  (`tmux new-session -d -s dev "npm run dev"`); confirm `/pricing` renders, toggle
  switches amount + CTA `interval`, and each CTA points to the correct destination.
  Visual confirmation in browser (scroll/motion + brand correctness).
- App: Stripe **test mode**. Manual checkout for both monthly and annual — confirm the
  correct price, 14-day trial, webhook fires, subscription record stores the right
  `stripePriceId`, and `is_pro` flips on. Confirm already-subscribed → customer portal.

## Open items for the user

- Confirm the **annual price amount** displayed on the landing page once the Stripe
  annual price is created (update `plans.ts`).
