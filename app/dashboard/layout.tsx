import type React from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { LayoutDashboard, Mail, MessageSquare, Settings } from "lucide-react"
import { ClerkProvider } from "@clerk/nextjs"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Use await with auth() since it returns a Promise
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <ClerkProvider>
    <div className="flex min-h-screen flex-col">

      <div className="flex flex-1">
        <aside className="hidden w-[200px] flex-col border-r bg-muted/40 sm:flex">
          <nav className="grid gap-2 px-4 py-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-muted"
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </Link>

            <Link
              href="/dashboard/email"
              className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-muted"
            >
              <Mail className="h-4 w-4" />
              Email
            </Link>

            <Link
              href="/dashboard/messages"
              className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-muted"
            >
              <MessageSquare className="h-4 w-4" />
              Messages
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-muted"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
    </ClerkProvider>
  )
}
