This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Internationalization (i18n)

This project uses a lightweight custom i18n system based on JSON files in `/locales` and a small middleware to ensure the URL contains a language prefix (`/en` or `/pt`).

- Locale files: `/locales/en.json` and `/locales/pt.json`.
- Server translator: `lib/i18n.ts` exposes `getTranslator(locale)` which you can use in server components.
- Client language context: `context/LanguageProvider.tsx` provides `lang` and `setLang` and is already included in `app/layout.tsx`.
- Language switcher: `components/language-switcher.tsx` (client) updates the URL to the selected language.
- Middleware: `middleware.ts` will redirect `/` to `/en` and ensure unknown paths get the default locale prefixed.

After editing the middleware or adding new routes, restart the dev server to pick up the changes.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
