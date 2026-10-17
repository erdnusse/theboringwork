# UI Development Guidelines

Conventions for building pages in this repository (Next.js App Router). Pages are being ported from the Lovable prototype in `new project/` (temporary, to be deleted). That prototype is a **visual reference only**; do not copy its code verbatim, since its stack differs.

## Stack

- Next.js 15 (App Router), React 19, TypeScript, npm
- Tailwind CSS 3 (`tailwind.config.ts`, CSS variables in `app/[lang]/globals.css`), `tailwindcss-animate`
- shadcn/ui (Radix) in `components/ui`, `lucide-react` icons, `cn()` from `@/lib/utils`
- `framer-motion` for animation, `sonner` for toasts, `react-hook-form` + `zod` for forms
- Auth: Clerk (`/dashboard` is protected in `middleware.ts`); DB: Prisma

## Lovable → this repo mapping

| Lovable (`new project/`) | Here |
|---|---|
| TanStack Router `src/routes/*.tsx` | `app/[lang]/<route>/page.tsx` |
| `lib/language.tsx` (`lang === "pt" ? … : …`) | `useTranslation()` + `locales/en.json` / `locales/pt.json` |
| Tailwind 4 `@theme inline`, oklch tokens | Tailwind 3: add tokens to `globals.css` variables and `tailwind.config.ts` (convert oklch to hex/HSL) |
| `site-shell.tsx` (header, footer, `PageIntro`) | `components/navbar.tsx`, `components/footer.tsx` (already in `app/[lang]/layout.tsx`), plus new shared components |
| Custom classes (`.eyebrow`, `.page-section`, `max-w-site`, `px-page`) | Define once as Tailwind utilities/components in the config or `globals.css`; never repeat raw values |

## Adding a page

1. Create `app/[lang]/<route>/page.tsx` as a **server component** exporting `metadata` (title, description, `robots`) and rendering one component.
2. Put the UI in `components/<route>-component.tsx` (`"use client"` only if it needs hooks, state or motion). Split sections into focused components.
3. Add **every** user-facing string to both `locales/en.json` and `locales/pt.json` with the same key (flat, snake_case, prefixed by page: `services_hero_title`). Access via `useTranslation()`. Portuguese is the default locale.
4. Add the link to `components/navbar.tsx` / `components/footer.tsx` when the page belongs in navigation, and to `app/sitemap.ts`.
5. Keep internal links locale-aware (`/${lang}/...`). `middleware.ts` redirects unprefixed paths.

## Design rules

- Reuse `components/ui/*` (Button, Card, Dialog, Form, Table, Accordion…) before writing new markup. Extend variants with `cva` instead of overriding with ad-hoc classes.
- Use design tokens (`bg-background`, `text-foreground`, `bg-primary`, `border-border`, `rounded-lg`) instead of hardcoded hex values or magic numbers. If the Lovable visual needs a new colour, font or radius, add it as a token first.
- Fonts via `next/font` or the existing layout setup; do not add `<link>` tags in pages.
- Images via `next/image` with `alt` text and explicit sizes.
- Reuse `ModernSpinner`, `Skeleton`, `Alert`, `sonner` toasts for loading, error and success feedback.
- Do not introduce a second styling system, component library, or state library.

## Responsive and accessibility checklist

- Mobile-first classes; verify at ~375px, 768px, 1280px and a wide screen.
- One `<h1>` per page, ordered headings, landmarks (`header`, `nav`, `main`, `footer`), labelled nav regions.
- All interactive elements are real `button`/`a` elements, keyboard reachable, with visible focus (`focus-visible:` ring).
- Form fields have `<Label>`, error text linked with `aria-describedby`, validation via zod.
- Icon-only buttons have `aria-label`; decorative icons/images use `aria-hidden` / `alt=""`.
- Colour contrast ≥ 4.5:1 for text; respect `prefers-reduced-motion` for framer-motion animations.

## States and data

- Every data-driven view handles loading, empty, error and success states.
- Use existing server actions in `actions/` and API routes; do not invent endpoints. Validate input on the server too.
- Secrets live in `.env.local` (pull with `npm run env:pull`); never hardcode keys.

## Validation before finishing

```
npm run lint
npx tsc --noEmit
npm run build
```

Then check the new routes in `/pt` and `/en`, mobile and desktop, and confirm existing pages are unchanged. In PowerShell, if `npm` is blocked by the execution policy, use `npm.cmd`.
