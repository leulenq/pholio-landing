"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { PHOLIO_APP_ORIGIN } from "@/lib/pholio-app-origin";
import { dashboardPathForRole } from "./constants";
import { subscribeAuthChanges } from "./broadcast";
import { fetchPublicSession, logoutSession, syncFirebaseSession } from "./session-api";
import { getPholioFirebaseAuth } from "./firebase";
import type { PublicSession } from "./types";

type PholioAuthContextValue = {
  session: PublicSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  dashboardHref: string;
};

const PholioAuthContext = createContext<PholioAuthContextValue | null>(null);

export function PholioAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<PublicSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    const data = await fetchPublicSession();
    setSession(data);
    setIsLoading(false);
  }, []);

  const logout = useCallback(async () => {
    const auth = getPholioFirebaseAuth();
    if (auth) {
      const { signOut } = await import("firebase/auth");
      await signOut(auth).catch(() => {});
    }
    await logoutSession();
    setSession({ authenticated: false });
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (cancelled) return;
      await refresh();
    };

    load();

    const auth = getPholioFirebaseAuth();
    let unsubscribeFirebase: (() => void) | undefined;

    if (auth) {
      unsubscribeFirebase = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = await user.getIdToken();
          await syncFirebaseSession(token);
        }
        if (!cancelled) await refresh();
      });
    }

    const unsubscribeBroadcast = subscribeAuthChanges(() => {
      if (!cancelled) refresh();
    });

    const onFocus = () => {
      if (!cancelled) refresh();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") onFocus();
    });

    const poll = window.setInterval(() => {
      if (!cancelled) refresh();
    }, 60_000);

    return () => {
      cancelled = true;
      unsubscribeFirebase?.();
      unsubscribeBroadcast();
      window.removeEventListener("focus", onFocus);
      window.clearInterval(poll);
    };
  }, [refresh]);

  const dashboardHref = useMemo(() => {
    const path =
      session?.dashboardPath || dashboardPathForRole(session?.role);
    return `${PHOLIO_APP_ORIGIN}${path}`;
  }, [session?.dashboardPath, session?.role]);

  const value = useMemo<PholioAuthContextValue>(
    () => ({
      session,
      isLoading,
      isAuthenticated: session?.authenticated === true,
      refresh,
      logout,
      dashboardHref,
    }),
    [session, isLoading, refresh, logout, dashboardHref],
  );

  return (
    <PholioAuthContext.Provider value={value}>{children}</PholioAuthContext.Provider>
  );
}

export function usePholioAuth() {
  const ctx = useContext(PholioAuthContext);
  if (!ctx) {
    throw new Error("usePholioAuth must be used within PholioAuthProvider");
  }
  return ctx;
}
