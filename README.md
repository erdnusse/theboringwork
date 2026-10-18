🧱 The Boring Work — Web Platform

A modern, full-stack web application for The Boring Work
, a family business based in Portugal.
This platform provides an elegant, fast, and maintainable online presence with integrated client contact, authentication, and data management.

🚀 Overview

This project is a commercial website and management platform for The Boring Work.
Features include:

🌐 Multilingual support (English & Portuguese)

🧩 Service showcase

🔐 Secure Google OAuth login

✉️ Direct email contact form

🧭 Admin dashboard for messages

📄 Privacy, cookies, and terms pages

Backend uses Neon’s serverless PostgreSQL with Prisma ORM for scalability and maintainability.

🧰 Tech Stack
Category	Technology	Description
Frontend	Next.js 14+
	Modern React framework with App Router (SSR, SSG, API routes)
Styling	Tailwind CSS
	Utility-first CSS for responsive UI
State & Logic	React Context + Custom Hooks	Used for i18n, mobile detection, and UI logic
Internationalization	Custom i18n	JSON-based translations (/locales/en.json, /locales/pt.json)
Authentication	NextAuth.js
	Google OAuth 2.0 for secure login
Database	Neon
 + Prisma
	Serverless Postgres with schema-based ORM
Email System	Nodemailer
	Sends messages via Gmail SMTP (app password)
Analytics	Google Analytics (gtag.js)	Tracks traffic and engagement
Deployment	Vercel
	CI/CD and environment management
🧩 Project Structure
/
├── app/                 # Next.js App Router pages & layouts
│   ├── [lang]/          # Language-prefixed routes (en/pt)
│   │   ├── about/       # About page
│   │   ├── contact/     # Contact page
│   │   ├── cookies/     # Cookies policy
│   │   ├── dashboard/   # Admin dashboard (protected)
│   │   ├── privacy/     # Privacy policy
│   │   ├── services/    # Services page
│   │   ├── sign-in/     # Auth pages
│   │   ├── sign-up/
│   │   ├── terms/       # Terms & conditions
│   │   └── layout.tsx   # Language context provider
│   ├── api/             # API routes
│   ├── sitemap.ts       # Sitemap generator
│   ├── robots.ts        # Robots.txt
│   └── globals.css      # Global styles
├── components/          # Reusable UI components
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utilities (e.g., i18n loader)
├── locales/             # Translation JSON files
├── prisma/              # Prisma schema & migrations
├── public/              # Static assets
└── styles/              # Additional styles

🏁 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/yourusername/theboringwork.git
cd theboringwork

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Copy and update the .env file:

cp .env.example .env


Required Variables:

DATABASE_URL="postgresql://user:password@host/dbname"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-random-secret"
GMAIL_USER="you@gmail.com"
GMAIL_APP_PASSWORD="your-16-char-app-password"

🧱 Database Setup

Run Prisma migrations and generate the client:

npx prisma migrate dev
npx prisma generate


Open Prisma Studio (optional):

npx prisma studio

🔐 Authentication (Google OAuth)

Secure login via NextAuth.js with Google provider.
Used to authenticate administrators and protect routes like /dashboard.

📧 Email Contact System

Visitors can contact the company directly through a form that sends structured emails using Nodemailer with Gmail SMTP and an app password (`GMAIL_USER`, `GMAIL_APP_PASSWORD`).

🌍 Internationalization (i18n)

URLs prefixed by locale: /en/..., /pt/...

Translations stored in /locales/en.json and /locales/pt.json

Custom LanguageProvider React context with hooks for switching languages

Middleware ensures locale-based redirects (default: Portuguese)

📊 Analytics

Google Analytics (gtag.js) tracks:

Page views

Visitor language preferences

Basic engagement metrics

Integrated via <Script /> in the root layout.

🚢 Deployment

Deployed on Vercel with automatic deployments from main

Database hosted on Neon (PostgreSQL)

Environment variables managed via Vercel dashboard

📜 License

Proprietary License — All Rights Reserved
This project is the intellectual property of The Boring Work.
Unauthorized copying, modification, or redistribution is strictly prohibited.
© 2025 The Boring Work

🌐 https://www.theboringwork.pt

🙌 Acknowledgments

Developed with ❤️ by The Boring Work and collaborators.
Powered by modern open-source technologies and cloud infrastructure.
