export const CONSENT_KEY = "pholio_cookie_consent_v1";

export type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  updatedAt: string;
};

export function getConsent(): CookieConsent | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    if (
      typeof parsed.necessary !== "boolean" ||
      typeof parsed.analytics !== "boolean"
    ) {
      return null;
    }

    return {
      necessary: parsed.necessary,
      analytics: parsed.analytics,
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date(0).toISOString(),
    };
  } catch {
    return null;
  }
}

export function setConsent(
  consent: Pick<CookieConsent, "necessary" | "analytics">,
): void {
  if (typeof window === "undefined") {
    return;
  }

  const value: CookieConsent = {
    necessary: consent.necessary,
    analytics: consent.analytics,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
}
