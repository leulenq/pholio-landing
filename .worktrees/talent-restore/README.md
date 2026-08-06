# Pholio Landing

This repository contains the marketing site and public-facing legal pages for [Pholio](https://www.pholio.studio), a full-stack talent portfolio and agency management platform.

> [!IMPORTANT]  
> **🚧 Repository Boundaries**  
> This repository (`pholio-landing`) is the **marketing site and legal page repo only**. It handles the public-facing promotional pages, Terms of Service, Privacy Policy, and Submission Program Notice.  
> **The application product** (backend API, dashboard SPA, etc.) belongs in the completely separate `pholio-app` repository.

## Tech Stack

- **Framework:** Next.js 16 (App Router, SSG/SSR)
- **Language:** TypeScript
- **Styling:** TailwindCSS 4
- **Animation:** Framer Motion, GSAP, Lenis (smooth scroll)

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 9

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd pholio-landing

# Install dependencies
npm install
```

### Development

The development server is typically run on port `3001` to avoid conflicting with the `pholio-app` backend.

```bash
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001) to view the site.

### Build

```bash
npm run build
```

## Architecture & Design

The design of the landing page is the gold standard for the brand. It features a cinematic, scroll-driven product showcase (e.g., the comp card in `components/SceneCompCard.tsx`).

Please refer to `CLAUDE.md` in this repository for detailed design philosophies, banned UI patterns, and strict visual brand rules. For cross-repo design tokens, refer to the `pholio-app` repository's `Design Philosophy.html` and `Brand Reference.html`.

## Deployment

This site is deployed to Netlify (or Vercel) independently of the `pholio-app` backend.
