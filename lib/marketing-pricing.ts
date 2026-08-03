import { PHOLIO_APP_ORIGIN } from "@/lib/pholio-app-origin";

export const STUDIO_PLUS_PRICE_MONTHLY = 9.99;
export const STUDIO_PLUS_PRICE_ANNUAL = 95.88;
export const STUDIO_PLUS_ANNUAL_EQUIVALENT_MONTHLY = 7.99;
export const STUDIO_PLUS_TRIAL_DAYS = 14;

/**
 * Submissions a free account may send per month.
 *
 * ⚠️ CROSS-REPO CONTRACT — the authority is `FREE_MONTHLY_APPLICATION_LIMIT` in
 * `pholio-app/src/domains/talent/services/application-quota.js`. Only
 * platform-discovery submissions are counted there; a submission made through
 * an agency's own open-call link is recorded `quota_exempt` and does not count.
 * Say both halves wherever this number is published, or the cap reads as
 * stricter than it is.
 */
export const FREE_MONTHLY_SUBMISSIONS = 5;

export const FREE_SIGNUP_URL = `${PHOLIO_APP_ORIGIN}/signup`;
export const FREE_ONBOARDING_URL = `${PHOLIO_APP_ORIGIN}/onboarding`;
export const STUDIO_PLUS_SIGNUP_URL = `${PHOLIO_APP_ORIGIN}/signup?plan=studio`;

export function formatMoney(value: number) {
  return value.toFixed(value % 1 === 0 ? 0 : 2);
}
