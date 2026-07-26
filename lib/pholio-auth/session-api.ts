import type { PublicSession } from "./types";
import {
  PUBLIC_SESSION_PATH,
  SAME_ORIGIN_HEADER,
  SAME_ORIGIN_VALUE,
} from "./constants";

export async function fetchPublicSession(): Promise<PublicSession> {
  const response = await fetch(PUBLIC_SESSION_PATH, {
    credentials: "include",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    return { authenticated: false };
  }

  return response.json();
}

export async function syncFirebaseSession(idToken: string) {
  const response = await fetch("/api/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Required by the app's same-origin mutation guard
      // (pholio-app/src/shared/middleware/same-origin-mutation.js). An HTML
      // form cannot set a request header, and cross-origin JS cannot set one
      // without a preflight the app's CORS allowlist rejects — that is what
      // makes login/logout CSRF-resistant across the shared session cookie.
      [SAME_ORIGIN_HEADER]: SAME_ORIGIN_VALUE,
    },
    body: JSON.stringify({ firebase_token: idToken }),
  });

  return response.ok;
}

export async function logoutSession() {
  await fetch("/api/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      [SAME_ORIGIN_HEADER]: SAME_ORIGIN_VALUE,
    },
  }).catch(() => {});
}
