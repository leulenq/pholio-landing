/**
 * The footer's content model.
 *
 * Grouped the way footer research says footers are actually used: people who
 * scroll to the bottom are not browsing, they are *verifying or looking for one
 * specific thing* — a policy, a contact address, a careers page, whether the
 * company is real. So the model is a set of small, semantically distinct
 * sections with real headings (Baymard: undivided footer link piles are the
 * most common footer usability failure, and headings matter more on mobile, not
 * less), not one long list and not a sitemap.
 *
 * Every href here is a route that exists. Labels may be written for intent
 * ("Get scouted" rather than "Onboarding"), but nothing points at a page that
 * has not been built.
 */

import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";
import {
  COMPANY_NAME,
  GOVERNING_LAW_STATE,
  SUPPORT_EMAIL,
} from "@/lib/legal-constants";

export interface FooterLink {
  label: string;
  href: string;
  /** Leaves the Next router — the app, a mail client, or a social profile. */
  external?: boolean;
}

export interface FooterGroup {
  title: string;
  links: FooterLink[];
}

export const LOGIN_HREF = `${APP_URL}/login`;
export const SIGNUP_HREF = `${APP_URL}/onboarding`;
export const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}`;

/* ── Site-structure grouping ─────────────────────────────────────────────
   Four balanced sections. "Trust & safety" is not filler and not a synonym
   for Legal: those four documents are the ones a scam-wary nineteen-year-old
   actually goes looking for, and burying them in a legal column is the
   difference between answering that question and hiding from it. */

export const GROUP_PLATFORM: FooterGroup = {
  title: "Platform",
  links: [
    { label: "For talent", href: "/talent" },
    { label: "For agencies", href: "/agency" },
    { label: "Studio+", href: "/studio-plus" },
  ],
};

export const GROUP_COMPANY: FooterGroup = {
  title: "Company",
  links: [
    { label: "About", href: "/about-us" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
};

/**
 * Talent-facing, and deliberately not a synonym for Legal. These three answer
 * "what protects me" — the question a scam-wary applicant scrolls down with.
 * The contractual documents live on the baseline instead, so no route is
 * listed twice and the two kinds of document stop blurring together.
 */
export const GROUP_TRUST: FooterGroup = {
  title: "Trust & safety",
  links: [
    { label: "Community guidelines", href: "/community-guidelines" },
    { label: "Submission program", href: "/legal/submission-program" },
    { label: "AI notice", href: "/ai-notice" },
  ],
};

/**
 * Three columns, not four. The footer is curated rather than exhaustive: it
 * carries the highest-value destinations, and the procedural legal pages are
 * reachable from the baseline and from the flows that actually need them
 * (the cookie banner links the cookie policy; copyright sits beside the
 * community rules it enforces).
 */
export const DIRECTORY_GROUPS: FooterGroup[] = [
  GROUP_PLATFORM,
  GROUP_COMPANY,
  GROUP_TRUST,
];

/* ── Intent grouping ─────────────────────────────────────────────────────
   The same routes, filed under the errand that brings someone here. */

export const INTENT_GROUPS: FooterGroup[] = [
  {
    title: "Join as talent",
    links: [
      { label: "Get scouted", href: SIGNUP_HREF, external: true },
      { label: "How Pholio works", href: "/talent" },
      { label: "Studio+", href: "/studio-plus" },
      { label: "Submission program", href: "/legal/submission-program" },
    ],
  },
  {
    title: "Scout & book",
    links: [
      { label: "For agencies", href: "/agency" },
      { label: "Agency log in", href: LOGIN_HREF, external: true },
      { label: "Press enquiries", href: "/press" },
    ],
  },
  {
    title: "Get help",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Community guidelines", href: "/community-guidelines" },
      { label: "AI notice", href: "/ai-notice" },
      { label: "Copyright & DMCA", href: "/dmca" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Terms of service", href: "/terms" },
      { label: "Privacy policy", href: "/privacy" },
    ],
  },
];

/* ── Audience grouping ───────────────────────────────────────────────────
   Pholio has exactly two audiences with opposite questions, which is the one
   structural fact the site actually has. */

export const AUDIENCE_TALENT: FooterGroup = {
  title: "For talent",
  links: [
    { label: "Get scouted", href: SIGNUP_HREF, external: true },
    { label: "How Pholio works", href: "/talent" },
    { label: "Studio+", href: "/studio-plus" },
    { label: "Submission program", href: "/legal/submission-program" },
    { label: "Community guidelines", href: "/community-guidelines" },
  ],
};

export const AUDIENCE_AGENCY: FooterGroup = {
  title: "For agencies",
  links: [
    { label: "Scout on Pholio", href: "/agency" },
    { label: "Agency log in", href: LOGIN_HREF, external: true },
    { label: "Press", href: "/press" },
    { label: "Contact us", href: "/contact" },
  ],
};

/** The shared row beneath the two doors. */
export const SHARED_LINKS: FooterLink[] = [
  { label: "About", href: "/about-us" },
  { label: "Careers", href: "/careers" },
  { label: "AI notice", href: "/ai-notice" },
  { label: "Copyright & DMCA", href: "/dmca" },
];

/* ── Baseline ────────────────────────────────────────────────────────── */

/**
 * The contractual and procedural documents, and the *only* place any of them
 * is listed. They used to appear both in a Legal column and again down here,
 * which is what made the old baseline read as unresolved.
 *
 * The cookie *policy* is deliberately not here: the baseline carries
 * `CookiePreferencesButton` instead, which re-raises the consent banner — a
 * control beats a link to a page with no controls on it, and the banner links
 * the policy anyway.
 */
export const BASELINE_LEGAL: FooterLink[] = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Copyright", href: "/dmca" },
];

export const FOOTER_SOCIAL: (FooterLink & { icon: "instagram" | "linkedin" | "x" })[] = [
  { label: "Instagram", href: "https://instagram.com/pholiostudio", external: true, icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com/company/pholiostudio", external: true, icon: "linkedin" },
  { label: "X", href: "https://x.com/pholiostudio", external: true, icon: "x" },
];

/**
 * Who you are dealing with. Not a brand statement — the two facts a visitor
 * checking whether this is a real company would look for, plus somewhere to
 * write. Kept to the baseline, at the smallest size on the page.
 */
export const ENTITY = {
  name: COMPANY_NAME,
  jurisdiction: GOVERNING_LAW_STATE,
  email: SUPPORT_EMAIL,
};

export function footerCopyright(): string {
  return `© ${new Date().getFullYear()} ${COMPANY_NAME}`;
}
