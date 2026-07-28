export const PHOLIO_AUTH_CHANNEL = "pholio-auth";

/**
 * App API paths. These are called **cross-origin against PHOLIO_APP_ORIGIN**,
 * not through a same-origin proxy.
 *
 * There used to be a `/api/:path*` rewrite in next.config.ts that proxied these
 * server-side. It returned 500 for every path in production — Netlify's Next
 * runtime does not serve this site's external rewrites, while its internal
 * rewrites and pages are fine — so the entire session integration was dead:
 * the header could never resolve a signed-in state and logout did nothing.
 *
 * Calling the app directly is also the better architecture: no proxy hop means
 * the real client IP reaches Express (so rate limiting keys per visitor rather
 * than per proxy), and the browser always sends an Origin header, which makes
 * the app's CSRF origin check real defense in depth instead of a check that has
 * to tolerate a missing value.
 *
 * www → app is cross-origin but SAME-SITE (both under pholio.studio), so the
 * SameSite=Lax session cookie is still sent with `credentials: "include"`. The
 * app's CORS allowlist names this origin explicitly and returns
 * `Access-Control-Allow-Credentials: true`.
 */
export const PUBLIC_SESSION_PATH = "/api/public/session";
export const LOGOUT_PATH = "/api/logout";
export const AGENCY_ACCESS_REQUEST_PATH = "/api/public/agency-access-requests";

/**
 * Mirrors REQUEST_HEADER / REQUEST_HEADER_VALUE in
 * pholio-app/src/shared/middleware/same-origin-mutation.js. Required on every
 * mutation this site sends to the app API (/api/login, /api/logout).
 */
export const SAME_ORIGIN_HEADER = "X-Pholio-Request";
export const SAME_ORIGIN_VALUE = "same-origin";

/**
 * Fallback only — the app returns `dashboardPath` on /api/public/session and
 * that value wins. Mirrors dashboardPathForRole() in
 * pholio-app/src/routes/api/public.js; keep the two in step.
 */
export function dashboardPathForRole(role?: string) {
  if (role === "AGENCY") return "/dashboard/agency";
  if (role === "TALENT") return "/dashboard/talent";
  return "/dashboard/talent";
}
