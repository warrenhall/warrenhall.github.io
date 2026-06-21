# Portfolio React Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the legacy Vue 2 compiled site with a fresh React + Vite + Tailwind source project whose About page reflects Warren's React / Design Systems persona, deployed via GitHub Actions.

**Architecture:** A small Vite SPA. `main.tsx` bootstraps a `BrowserRouter`; `App.tsx` is the layout shell (Navbar + routed `<Outlet/>` with a fade transition); `pages/` holds Home and About; `components/` holds Navbar and the presentational SkillBadge. Tailwind v4 provides styling via its Vite plugin. A GitHub Actions workflow builds and publishes `dist/` to Pages.

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind CSS v4 (`@tailwindcss/vite`), react-router-dom v6, GitHub Actions (`actions/deploy-pages`).

## Global Constraints

- Framework: React 18 + TypeScript. No Vue, Skeleton, animate.css, or SCSS.
- Build tool: Vite. Styling: Tailwind CSS v4 only.
- `vite.config.ts` must set `base: '/'` (user/org Pages site served at domain root).
- Preserve assets verbatim: `favicon.ico` and `img/logo.png` → move into `public/` (`public/favicon.ico`, `public/img/logo.png`).
- Preserve contact details exactly: email `mailto:warrenkhall@gmail.com`, LinkedIn `https://www.linkedin.com/in/warrenkhall/`.
- Home hero heading text: `Hey, I'm Warren 🖖🏻`. Home tagline: `Senior Full Stack Engineer · React & Design Systems Specialist`.
- Keep the Raleway typeface.
- Routes: `/` → Home, `/about` → About.
- About top skills, in order: React.js, Tailwind CSS, Web Components, JavaScript, TypeScript.
- Remove legacy build artifacts from repo root: old `index.html`, `js/`, `css/`, root `favicon.ico`, `img/`.
- No build output committed to git (source only); `dist/` gitignored.

---

### Task 1: Project scaffolding, dependencies, asset migration

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `.gitignore`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`
- Create (move): `public/favicon.ico`, `public/img/logo.png`
- Delete: root `index.html`, `js/`, `css/`, root `favicon.ico`, `img/`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: a runnable Vite app. `App.tsx` exports default `App` rendering a router `<Outlet/>` shell. Routing/pages are wired in Task 4 — for now `App` renders a placeholder so the build is green.

- [ ] **Step 1: Migrate preserved assets into `public/`**

```bash
mkdir -p public/img
git mv favicon.ico public/favicon.ico
git mv img/logo.png public/img/logo.png
```

- [ ] **Step 2: Remove legacy Vue build artifacts**

```bash
git rm -r js css index.html
# img/ is now empty after the git mv above; remove if it lingers
rmdir img 2>/dev/null || true
```

- [ ] **Step 3: Create `package.json`**

```json
{
  "name": "warrenhall-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.5.4",
    "vite": "^5.4.2"
  }
}
```

- [ ] **Step 4: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 5: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 6: Create `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 7: Create `.gitignore`**

```
node_modules
dist
*.local
.DS_Store
```

- [ ] **Step 8: Create `src/vite-env.d.ts`**

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 9: Create `index.html` (Vite source entry)**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800&display=swap"
      rel="stylesheet"
    />
    <title>Warren Hall — Senior Full Stack Engineer</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 10: Create `src/index.css` (Tailwind entry + tokens)**

```css
@import 'tailwindcss';

@theme {
  --font-sans: 'Raleway', ui-sans-serif, system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-neutral-950 text-neutral-100 font-sans antialiased;
}
```

- [ ] **Step 11: Create `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 12: Create placeholder `src/App.tsx`** (routing added in Task 4)

```tsx
export default function App() {
  return <div className="p-8">Scaffolding OK</div>
}
```

- [ ] **Step 13: Install dependencies**

Run: `npm install`
Expected: completes, creates `node_modules` and `package-lock.json`, no peer-dep errors.

- [ ] **Step 14: Verify the build**

Run: `npm run build`
Expected: PASS — `tsc -b` reports no errors, Vite writes `dist/` with `index.html` and a hashed JS/CSS bundle.

- [ ] **Step 15: Verify dev server boots**

Run: `npm run dev` (then stop it with Ctrl-C)
Expected: Vite prints a local URL with no compile errors.

- [ ] **Step 16: Commit**

```bash
git add -A
git commit -m "Scaffold React + Vite + Tailwind project, migrate assets, remove Vue build"
```

---

### Task 2: SkillBadge component

**Files:**
- Create: `src/components/SkillBadge.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `export default function SkillBadge(props: { label: string }): JSX.Element` — renders a single pill. Consumed by About (Task 5).

- [ ] **Step 1: Create `src/components/SkillBadge.tsx`**

```tsx
export default function SkillBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-semibold text-emerald-300">
      {label}
    </span>
  )
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc -b`
Expected: PASS — no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/SkillBadge.tsx
git commit -m "Add SkillBadge presentational component"
```

---

### Task 3: Navbar component

**Files:**
- Create: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `react-router-dom` `NavLink`.
- Produces: `export default function Navbar(): JSX.Element`. Consumed by `App.tsx` (Task 4). Must be rendered inside a Router.

- [ ] **Step 1: Create `src/components/Navbar.tsx`**

```tsx
import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-semibold tracking-wide transition-colors ${
    isActive ? 'text-emerald-300' : 'text-neutral-400 hover:text-neutral-100'
  }`

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
      <NavLink to="/" className="shrink-0" aria-label="Home">
        <img src="/img/logo.png" alt="Warren Hall logo" className="h-10 w-10" />
      </NavLink>
      <div className="flex items-center gap-6">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc -b`
Expected: PASS — no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "Add Navbar component"
```

---

### Task 4: Routing shell with page transition

**Files:**
- Modify: `src/App.tsx` (replace placeholder)
- Modify: `src/index.css` (add fade transition utility)

**Interfaces:**
- Consumes: `Navbar` (Task 3); `Home`/`About` page components (Tasks 5 — imported now, created next). To keep the build green when implemented in order, create minimal stub pages in this task if Task 5 is not yet done; otherwise import the real ones.
- Produces: `App` default export rendering `<BrowserRouter>` → `Navbar` + `<Routes>` for `/` and `/about`, keyed to trigger a fade on route change.

- [ ] **Step 1: Add fade keyframe to `src/index.css`** (append at end)

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.35s ease-out;
}
```

- [ ] **Step 2: Replace `src/App.tsx`**

```tsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <main key={location.pathname} className="animate-fade-in">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
```

- [ ] **Step 3: Create stub pages so the build compiles** (real content in Task 5)

`src/pages/Home.tsx`:

```tsx
export default function Home() {
  return <div />
}
```

`src/pages/About.tsx`:

```tsx
export default function About() {
  return <div />
}
```

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: PASS — no TypeScript errors, `dist/` regenerated.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/index.css src/pages/Home.tsx src/pages/About.tsx
git commit -m "Add routing shell with fade transition and page stubs"
```

---

### Task 5: Home and About page content

**Files:**
- Modify: `src/pages/Home.tsx` (replace stub)
- Modify: `src/pages/About.tsx` (replace stub)

**Interfaces:**
- Consumes: `SkillBadge` (Task 2).
- Produces: final page content. No further consumers.

- [ ] **Step 1: Implement `src/pages/Home.tsx`**

```tsx
export default function Home() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Hey, I'm Warren 🖖🏻
      </h1>
      <h2 className="text-lg font-semibold text-emerald-300 sm:text-xl">
        Senior Full Stack Engineer · React &amp; Design Systems Specialist
      </h2>
      <div className="mt-2 flex flex-wrap gap-4">
        <a
          href="mailto:warrenkhall@gmail.com"
          className="rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-emerald-300"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/warrenkhall/"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-neutral-700 px-6 py-2.5 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-500"
        >
          LinkedIn
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Implement `src/pages/About.tsx`**

```tsx
import SkillBadge from '../components/SkillBadge'

const focusAreas = [
  {
    title: 'Modern Frontend Stack',
    body: 'Expert-level development using React and TypeScript to build robust, type-safe applications.',
  },
  {
    title: 'Design Systems',
    body: 'Architecting and maintaining scalable design languages, ensuring visual consistency and developer efficiency.',
  },
  {
    title: 'Styling & UI',
    body: 'Rapid, responsive UI development leveraging Tailwind CSS.',
  },
  {
    title: 'Web Components',
    body: 'Building framework-agnostic, reusable components to ensure long-term portability and interoperability.',
  },
]

const topSkills = [
  'React.js',
  'Tailwind CSS',
  'Web Components',
  'JavaScript',
  'TypeScript',
]

export default function About() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-16">
      <header className="flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
          About
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Senior Full Stack Engineer · React &amp; Design Systems Specialist
        </h1>
        <p className="text-base leading-relaxed text-neutral-300">
          With over a decade of experience in the JavaScript ecosystem, I have
          evolved from building traditional full-stack applications to
          architecting modern, scalable front-end ecosystems. My current focus
          centers on React, TypeScript, and the intersection of Design Systems
          and Web Components.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Core Technical Focus</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6"
            >
              <h3 className="mb-2 text-base font-bold text-emerald-300">
                {area.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-300">
                {area.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Top skills</h2>
        <div className="flex flex-wrap gap-3">
          {topSkills.map((skill) => (
            <SkillBadge key={skill} label={skill} />
          ))}
        </div>
      </div>

      <p className="text-base text-neutral-300">
        Have a UI or design-system problem to solve?{' '}
        <a
          href="mailto:warrenkhall@gmail.com"
          className="font-semibold text-emerald-300 underline-offset-4 hover:underline"
        >
          Email me
        </a>
        .
      </p>
    </section>
  )
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: PASS — no TypeScript errors.

- [ ] **Step 4: Manual visual check**

Run: `npm run dev`, open the local URL.
Expected: Home shows hero + tagline + Email/LinkedIn buttons; `/about` shows intro, four focus cards, five skill badges, and the Email CTA; nav links switch pages with a fade; layout holds at mobile (~375px) and desktop widths. Stop the server when done.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.tsx src/pages/About.tsx
git commit -m "Add Home and About page content"
```

---

### Task 6: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: `npm run build` producing `dist/`.
- Produces: a Pages deployment on push to `master`.

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verify YAML is well-formed**

Run: `npx --yes js-yaml .github/workflows/deploy.yml >/dev/null && echo OK`
Expected: prints `OK` (valid YAML).

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions Pages deploy workflow"
```

- [ ] **Step 4: Manual step for Warren (not an agent action)**

In GitHub repo Settings → Pages → Source, select **GitHub Actions**. Then merge `portfolio-react-rebuild` to `master` to trigger the first deploy.

---

## Notes on visual design

During Tasks 4–5, apply the `frontend-design` skill to refine typography scale,
spacing rhythm, color tokens, and the route transition so the result reads as
intentional rather than default Tailwind. The class lists above are a working
baseline, not a ceiling — adjust for polish while keeping the required copy,
links, and structure from Global Constraints intact.
