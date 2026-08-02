# Archived marketing site

Moved out of the live Next.js app on 2026-07-20 so the public site keeps only:

- Home: Hero (including “PHOLIO sees you.”) → Comp card showcase → Footer
- Legal routes under `app/` (terms, privacy, cookies, DMCA, community guidelines, take-it-down, AI notice, submission program)

## Layout

| Path | What was archived |
|------|-------------------|
| `app/` | `/talent`, `/for-talent`, `/agency`, `/studio/plus`, `/about-us`, `/careers`, `/contact`, `/press` |
| `components/` | Product scenes (Studio Web, Reveal, In the Open, Pricing, etc.), talent/agency/studio-plus page trees, about/careers/contact heroes, unused scene orphans |
| `lib/` | `talent-showcase-images.ts` (talent marketing only) |

## Restoring

Move a route folder back under repo-root `app/` and its components under `components/`, restore any `lib/` helpers, re-add nav/footer links and `next.config.ts` rewrites (`/studio-plus` → `/studio/plus`, `/agencies` → `/agency`), then typecheck.

These files are **not** imported by the live app; TypeScript does not compile this tree.
