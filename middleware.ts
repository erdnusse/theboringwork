
import { NextRequest, NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const SUPPORTED = ['en', 'pt']
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Locale prefix logic first
  const { pathname } = req.nextUrl

  // If root, redirect to default locale
  if (pathname === '/' || pathname === '') {
    const url = req.nextUrl.clone()
    url.pathname = '/pt'
    return NextResponse.redirect(url)
  }

  // If already has a supported locale, continue
  const parts = pathname.split('/').filter(Boolean)
  if (!(parts.length > 0 && SUPPORTED.includes(parts[0]))) {
    // If unknown path without locale, redirect to add default locale
    const url = req.nextUrl.clone()
    url.pathname = `/en${pathname}`
    return NextResponse.redirect(url)
  }

  // Clerk auth for protected routes
  if (isProtectedRoute(req)) await auth.protect()
  // Continue
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Match all routes except Next.js internals, static files, and excluded paths
    '/((?!_next|static|favicon.ico|robots.txt|sitemap.xml|api|sign-in|sign-out|.*\\.(?:png|jpg|jpeg|webp|svg|ico|css|js|json|txt|woff2?|ttf)).*)',
  ],
}