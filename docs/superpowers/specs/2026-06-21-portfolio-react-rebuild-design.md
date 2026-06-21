# Portfolio Rebuild — React + Vite + Tailwind

**Date:** 2026-06-21
**Repo:** `warrenhall.github.io` (GitHub Pages user site)

## Problem

The repo currently contains only the *compiled* output of an old Vue 2 app
(minified `js/app.4d417f8e.js`, `css/app.*.css`, Skeleton/animate.css, no
`package.json`, no source). The About page lists Angular / MEAN / Vue skills in
an experience-rating table, which conflicts with Warren's current professional
identity: **Senior Full Stack Engineer — React & Design Systems Specialist**.

We are rebuilding the site from a proper modern source project and replacing the
About content to reflect the new persona.

## Goals

- Establish a real, maintainable source project with current dependencies.
- Replace the About content with the new React / TypeScript / Tailwind /
  Web Components narrative + top-skills badges.
- Keep the site visually intentional (not templated defaults).
- Deploy to GitHub Pages cleanly via GitHub Actions.

## Non-Goals

- No new pages, blog, CMS, analytics, or backend.
- No reuse of the old Vue source (none exists) or old CSS frameworks.

## Stack

- **React 18 + TypeScript**
- **Vite** (build tool / dev server)
- **Tailwind CSS v4** (styling; replaces Skeleton + custom SCSS)
- **react-router-dom v6** (Home / About routing — preserves existing URL paths)

All declared in a real `package.json` so "dependencies" are genuine and
upgradable.

## Project Structure

```
.
├── index.html                 # Vite source entry (replaces old built index.html)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── public/
│   ├── favicon.ico            # preserved from current repo
│   └── img/logo.png           # preserved from current repo
├── src/
│   ├── main.tsx               # app bootstrap + BrowserRouter
│   ├── App.tsx                # layout shell: Navbar + <Outlet/> + page transition
│   ├── index.css              # Tailwind entry + design tokens
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── SkillBadge.tsx
│   └── pages/
│       ├── Home.tsx
│       └── About.tsx
└── .github/workflows/deploy.yml
```

Old artifacts removed: root `index.html` (Vue build), `js/`, `css/`,
`favicon.ico` (moved to `public/`), `img/` (moved to `public/img/`).

## Components & Content

### Navbar (`components/Navbar.tsx`)
- Logo (`/img/logo.png`) + nav links: **Home**, **About**.
- Active-link styling via `NavLink`. Rebuilt in Tailwind.

### Home (`pages/Home.tsx`)
- Hero heading: `Hey, I'm Warren 🖖🏻` (preserved).
- Tagline: **"Senior Full Stack Engineer · React & Design Systems Specialist"**
  (updated from "Full Stack JavaScript Developer").
- Buttons: **Email** (`mailto:warrenkhall@gmail.com`) and **LinkedIn**
  (`https://www.linkedin.com/in/warrenkhall/`) — both preserved.

### About (`pages/About.tsx`)
Narrative sections + badges (per approved format):

1. **Intro paragraph** — "With over a decade of experience in the JavaScript
   ecosystem, I have evolved from building traditional full-stack applications to
   architecting modern, scalable front-end ecosystems. My current focus centers
   on React, TypeScript, and the intersection of Design Systems and Web
   Components."
2. **Core Technical Focus** — four items, each a heading + description:
   - *Modern Frontend Stack* — Expert-level development using React and
     TypeScript to build robust, type-safe applications.
   - *Design Systems* — Architecting and maintaining scalable design languages,
     ensuring visual consistency and developer efficiency.
   - *Styling & UI* — Rapid, responsive UI development leveraging Tailwind CSS.
   - *Web Components* — Building framework-agnostic, reusable components to ensure
     long-term portability and interoperability.
3. **Top skills** — row of pill badges (`SkillBadge`):
   React.js · Tailwind CSS · Web Components · JavaScript · TypeScript.
4. Closing CTA line linking to `mailto:warrenkhall@gmail.com`.

The old experience-rating `<table>` is dropped.

### SkillBadge (`components/SkillBadge.tsx`)
- Presentational: renders one pill from a `label` string. Used to map the top
  skills array.

## Visual Direction

Applied during implementation via the frontend-design skill:
- Keep the **Raleway** typeface (currently loaded from Google Fonts).
- Define a small Tailwind design-token set (color, spacing, radius) so the look is
  deliberate rather than default.
- Subtle route transition (fade/slide) replacing the old animate.css fade.
- Mobile-first, responsive layout.

## Deployment

**GitHub Actions → GitHub Pages** (approved).

- `.github/workflows/deploy.yml`: on push to `master`, install deps, `vite build`,
  upload `dist/` as a Pages artifact, deploy via `actions/deploy-pages`.
- `vite.config.ts` `base: '/'` (user/org page served from domain root).
- **Manual step (Warren):** Settings → Pages → Source → **GitHub Actions** (one
  time).
- No build output committed to the repo; source only.

## Testing / Verification

- `npm run build` succeeds with no TypeScript errors.
- `npm run dev` renders Home and About; nav links route correctly.
- Manual check: hero, About sections, badges, email/LinkedIn links, responsive
  layout at mobile + desktop widths.
- Verify the deploy workflow completes and the live site serves the new content.

## Risks

- **Pages source setting** must be switched to GitHub Actions or the deploy won't
  publish — called out as a manual step.
- Tailwind v4 uses the newer Vite plugin config; ensure the chosen versions are
  consistent.
