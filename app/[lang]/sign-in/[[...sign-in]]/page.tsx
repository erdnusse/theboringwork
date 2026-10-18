import { ClerkProvider, SignIn } from "@clerk/nextjs"

export const metadata = {
  title: "Sign in | The Boring Work - Consultoria Empresarial",
  description:
    "Fazemos o trabalho chato para que se possa focar no mais importante: a sua empresa. Especialistas em estruturação e crescimento de PMEs.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function SignInPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <ClerkProvider>
      <div className="flex min-h-screen flex-col">
        <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4 py-12">
          <div className="mx-auto w-full max-w-md">
            <SignIn fallbackRedirectUrl={`/${lang}/dashboard`} />
          </div>
        </div>
      </div>
    </ClerkProvider>
  )
}