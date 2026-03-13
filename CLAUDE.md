# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # TypeScript check (tsc -b) + Vite bundle
npm run preview   # Preview production build
```

No test runner is configured in this project.

## Architecture

This is a **design system documentation site** for the Bankr design system — a static React SPA that showcases tokens, typography, and interactive component demos.

**Stack:** React 18 + TypeScript (strict) + Vite 5 + Tailwind CSS 3 + Radix UI + CVA

### Routing

React Router v6 with a shared `Layout` shell. Three routes: `/colors`, `/typography`, `/components`.

### Design Token System

Tokens originate from Figma and flow through the stack:

1. `src/styles/globals.css` — CSS variables defined under `:root` (light) and `.dark` (dark)
2. `tailwind-preset.ts` (source) / `tailwind-preset.js` (compiled) — maps CSS vars to Tailwind utilities using `rgb(var(--token) / <alpha-value>)` pattern
3. `src/data/tokens.ts` — parses `globals.css` + `docs/mapping.md` at runtime for the ColorsPage display

Token naming mirrors Figma: `Background/color-bg` → `--background-color-bg` → `bg-background-color-bg`. See `docs/mapping.md` for the full table.

When adding or modifying tokens, update all three layers: `globals.css`, `tailwind-preset.ts`, then rebuild `tailwind-preset.js` (`tsc -b`).

### Component Library (`src/components/ui/`)

Follows the shadcn/ui pattern: Radix UI primitives + CVA variants + Tailwind tokens. All components use `React.forwardRef`. The `cn()` utility (`src/lib/utils.ts`) merges classes via clsx + twMerge.

Key components with CVA variants: `button.tsx` (5 variants, 4 sizes), `badge.tsx` (4 variants, 3 sizes, 5 colors), `input.tsx` (4 states).

### Theme

Dark mode uses the `.dark` class on `<html>`. `src/lib/theme.ts` handles `localStorage` persistence and initial detection from `prefers-color-scheme`. `ComponentsPage.tsx` uses a `MutationObserver` on the `<html>` element to react to theme changes.

### State Management

React hooks only — no global state library. Theme persistence via localStorage. Toast notifications via `useToast()` hook + `<Toaster />` component in `src/components/ui/`.

### Deployment

Deployed on Vercel. `vercel.json` configures SPA rewrites so all routes serve `index.html`.
