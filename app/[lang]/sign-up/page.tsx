import { ClerkProvider, SignUp } from "@clerk/nextjs"

export const metadata = {
  title: "Sign Up | The Boring Work - Consultoria Empresarial",
  description:
    "Fazemos o trabalho chato para que se possa focar no mais importante: a sua empresa. Especialistas em estruturação e crescimento de PMEs.",
    robots: {
    index: false,
    follow: false,
  }
}

export default function SignUpPage() {
  return (
      <ClerkProvider>
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto">
          <SignUp />
        </div>
      </div>
    </div>
    </ClerkProvider>
  )
}
