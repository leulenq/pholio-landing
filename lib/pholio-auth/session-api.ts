import type { PublicSession } from "./types";
import { PHOLIO_APP_ORIGIN } from "@/lib/pholio-app-origin";
import {
  LOGOUT_PATH,
  PUBLIC_SESSION_PATH,
  SAME_ORIGIN_HEADER,
  SAME_ORIGIN_VALUE,
} from "./constants";

/** Absolute app-API URL. See constants.ts for why these are not proxied. */
function appApi(path: string) {
  return `${PHOLIO_APP_ORIGIN}${path}`;
}

export async function fetchPublicSession(): Promise<PublicSession> {
  try {
    const response = await fetch(appApi(PUBLIC_SESSION_PATH), {
      // Same-site (www → app under pholio.studio), so the SameSite=Lax session
      // cookie rides along once credentials are included.
      credentials: "include",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      return { authenticated: false };
    }

    return await response.json();
  } catch {
    // Network/CORS failure must not throw into the provider — the header simply
    // renders signed-out.
    return { authenticated: false };
  }
}

export async function logoutSession() {
  await fetch(appApi(LOGOUT_PATH), {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      // Required by the app's same-origin mutation guard. An HTML form cannot
      // set a request header, and a cross-origin caller cannot set one without
      // a preflight the app's CORS allowlist rejects — that is what makes
      // login/logout CSRF-resistant across the shared session cookie.
      [SAME_ORIGIN_HEADER]: SAME_ORIGIN_VALUE,
    },
  }).catch(() => {});
}
