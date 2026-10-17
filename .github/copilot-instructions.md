# Copilot instructions

Next.js 15 App Router + React 19 + TypeScript + Tailwind 3 + shadcn/ui. Package manager: npm. Full conventions: [UI_DEVELOPMENT_GUIDELINES.md](../UI_DEVELOPMENT_GUIDELINES.md). Read it before creating or changing UI.

## Rules

- `new project/` is a temporary Lovable prototype (TanStack Router, Tailwind 4). Use it only as a visual reference when porting pages; never edit it or import from it.
- Pages: `app/[lang]/<route>/page.tsx` (server component with `metadata`) rendering a component from `components/`. Add `"use client"` only when needed.
- All user-facing text goes in both `locales/en.json` and `locales/pt.json` and is read with `useTranslation()`. No inline `lang === "pt" ? …` strings.
- Reuse `components/ui/*`, `cn()`, existing navbar/footer and tokens. Add new colours, fonts or radii as Tailwind/CSS tokens, not hardcoded values. Don't add new UI/styling/state libraries.
- Build mobile-first, semantic and keyboard accessible; include loading, empty, error and success states.
- Use existing `actions/` and API routes; don't invent backend endpoints.
- Match the surrounding code style (2-space indent, `@/` imports). Comment only non-obvious code.
- Validate with `npm run lint`, `npx tsc --noEmit` and `npm run build`. On Windows PowerShell use `npm.cmd` if `npm` is blocked.
