"use client"

import { UserButton } from "@clerk/nextjs"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UserNav() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
        <span className="sr-only">Notifications</span>
      </Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
