import type { NextConfig } from "next";

/** Web app (login, onboarding, dashboard) — public CTAs point here. */
const pholioAppOrigin =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.pholio.studio";

/**
 * API proxy target for /api/* (session, logout). Defaults to the same host as the web app.
 * Override with APP_BACKEND_URL (e.g. http://localhost:3000) when the app runs locally.
 */
const apiBackendOrigin =
  process.env.APP_BACKEND_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : pholioAppOrigin);

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  env: {
    NEXT_PUBLIC_APP_URL: pholioAppOrigin,
  },
  /**
   * Security headers.
   *
   * This site shipped none — no CSP, no frame protection, no HSTS — while
   * pholio-app runs helmet. That asymmetry matters because both origins share
   * the `.pholio.studio` session cookie: www is a same-site origin that can
   * POST to /api/login and /api/logout with that cookie attached, so the weaker
   * surface effectively sets the trust boundary for both.
   *
   * CSP is report-only for now, matching the app's posture — the marketing
   * scenes use inline styles and framer-motion, so an enforced policy needs a
   * browser pass first. The rest are enforced.
   */
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com",
      "font-src 'self' data:",
      `connect-src 'self' ${apiBackendOrigin} https://*.googleapis.com https://*.firebaseio.com https://www.gstatic.com`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy-Report-Only", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  async rewrites() {
    const apiProxy = {
      source: "/api/:path*",
      destination: `${apiBackendOrigin}/api/:path*`,
    };
    // Public URL stays /studio-plus; page lives at /studio/plus so dev (Turbopack) resolves the route reliably.
    return {
      beforeFiles: [
        { source: "/studio-plus", destination: "/studio/plus" },
        { source: "/studio-plus/", destination: "/studio/plus" },
        { source: "/agencies", destination: "/agency" },
        { source: "/agencies/", destination: "/agency" },
      ],
      afterFiles: [apiProxy],
    };
  },
};

export default nextConfig;
