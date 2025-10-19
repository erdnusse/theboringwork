import type { Metadata } from "next"

import { ContactMessages } from "@/components/contact-messages"

export const metadata: Metadata = {
  title: "Contact Messages",
  description: "View and manage contact form submissions",
}

export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-8 p-4 sm:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
        <p className="text-muted-foreground">View and manage messages submitted through your contact form.</p>
      </div>

      <ContactMessages />
    </div>
  )
}
