import type { NextConfig } from "next";

/** Web app (login, onboarding, dashboard) — public CTAs point here. */
const pholioAppOrigin =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.pholio.studio";

/**
 * API proxy target for /api/* (session, logout). Defaults to the same host as the web app.
 * Override with APP_BACKEND_URL (e.g. http://localhost:3000) when the app runs locally.
 */
const apiBackendOrigin = process.env.APP_BACKEND_URL || pholioAppOrigin;

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
