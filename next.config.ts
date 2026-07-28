import type { NextConfig } from "next";

/** Web app (login, onboarding, dashboard) — public CTAs point here. */
const pholioAppOrigin =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.pholio.studio";

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
      `connect-src 'self' ${pholioAppOrigin}`,
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

  /**
   * Internal rewrites only.
   *
   * An external `/api/:path*` proxy to the app used to live here. It returned
   * 500 for every path in production — Netlify's Next runtime does not serve
   * this site's external rewrites, though these internal ones work fine — which
   * silently killed the whole session integration. The site now calls the app
   * API cross-origin instead (see lib/pholio-auth/constants.ts). Do not
   * reintroduce an external rewrite here.
   *
   * Public URL stays /studio-plus; page lives at /studio/plus so dev (Turbopack)
   * resolves the route reliably.
   */
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/studio-plus", destination: "/studio/plus" },
        { source: "/studio-plus/", destination: "/studio/plus" },
        { source: "/agencies", destination: "/agency" },
        { source: "/agencies/", destination: "/agency" },
      ],
    };
  },
};

export default nextConfig;
