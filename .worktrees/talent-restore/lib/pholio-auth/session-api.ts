import type { PublicSession } from "./types";
import { PUBLIC_SESSION_PATH } from "./constants";

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
    },
    body: JSON.stringify({ firebase_token: idToken }),
  });

  return response.ok;
}

export async function logoutSession() {
  await fetch("/api/logout", {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json" },
  }).catch(() => {});
}
