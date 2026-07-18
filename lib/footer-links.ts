/**
 * The footer's content model.
 *
 * Grouped the way footer research says footers are actually used: the people
 * who scroll to the bottom are not browsing, they are *verifying or looking for
 * one specific thing* — a policy, a contact address, a careers page, whether
 * the company is real. So the model is a small set of semantically distinct
 * sections with real headings, not one long list and not a sitemap.
 *
 * Two rules hold it together:
 *
 *  - **Curated, not exhaustive.** The footer carries the highest-value
 *    destinations. Secondary policy pages stay routable and are reached from
 *    the flows that need them — the cookie banner links the cookie policy —
 *    rather than being surfaced here just because they exist.
 *  - **No route is listed twice.** Terms/Privacy/Copyright appearing both in a
 *    column and again in the baseline is what made an earlier pass read as
 *    unresolved.
 *
 * Every href is a route that exists. Labels may be written for intent ("Get
 * scouted" rather than "Onboarding"), but nothing points at a page that has not
 * been built.
 */

import { PHOLIO_APP_ORIGIN as APP_URL } from "@/lib/pholio-app-origin";
import { COMPANY_NAME, GOVERNING_LAW_STATE, SUPPORT_EMAIL } from "@/lib/legal-constants";

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

/* ── The columns ─────────────────────────────────────────────────────── */

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
 * The contractual documents live on the baseline instead, so the two kinds of
 * document stop blurring together.
 */
export const GROUP_TRUST: FooterGroup = {
  title: "Trust & safety",
  links: [
    { label: "Community guidelines", href: "/community-guidelines" },
    { label: "Intimate image removal", href: "/take-it-down" },
    { label: "Submission program", href: "/legal/submission-program" },
    { label: "AI notice", href: "/ai-notice" },
  ],
};

/** Three columns, not four. The Legal column was the duplication. */
export const DIRECTORY_GROUPS: FooterGroup[] = [
  GROUP_PLATFORM,
  GROUP_COMPANY,
  GROUP_TRUST,
];

/* ── The baseline ────────────────────────────────────────────────────── */

/**
 * The contractual and procedural documents, and the *only* place any of them
 * is listed.
 *
 * The cookie *policy* is deliberately absent: the baseline carries
 * `CookiePreferencesButton` instead, which re-raises the consent banner — a
 * control beats a link to a page with no controls on it, and the banner links
 * the policy anyway.
 */
export const BASELINE_LEGAL: FooterLink[] = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Copyright", href: "/dmca" },
];

/**
 * Glyphs, and only under the wordmark. A row of three beneath a mark reads as
 * an identity block; the same three in a line of legal links read as leftovers.
 */
export const FOOTER_SOCIAL: (FooterLink & { icon: "instagram" | "linkedin" | "x" })[] = [
  { label: "Instagram", href: "https://instagram.com/pholiostudio", external: true, icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com/company/pholiostudio", external: true, icon: "linkedin" },
  { label: "X", href: "https://x.com/pholiostudio", external: true, icon: "x" },
];

/**
 * Who you are dealing with. Not a brand statement — only the address a human
 * answers is surfaced in the footer; the rest is here for any future use.
 */
export const ENTITY = {
  name: COMPANY_NAME,
  jurisdiction: GOVERNING_LAW_STATE,
  email: SUPPORT_EMAIL,
};
