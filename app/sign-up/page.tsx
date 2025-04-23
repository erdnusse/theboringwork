import { SignUp } from "@clerk/nextjs"
import Link from "next/link"
import { Building } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <Building className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">EstateElite</span>
        </Link>
        <div className="w-full max-w-md">
          <SignUp />
        </div>
      </div>
    </div>
  )
}
