import type { ReactNode } from "react"
import { PageIntro } from "@/components/site/page-intro"

export function LegalLayout({
  eyebrow,
  title,
  updated,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  updated: string
  intro: string
  children: ReactNode
}) {
  return (
    <main>
      <PageIntro eyebrow={eyebrow} title={title}>
        {updated}
      </PageIntro>
      <section className="section-light page-section">
        <div className="mx-auto max-w-3xl px-page">
          {intro && <p className="pb-10 text-lg text-ink-soft">{intro}</p>}
          {children}
        </div>
      </section>
    </main>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="border-t border-line py-10">
      <h2 className="text-card-title">{title}</h2>
      <div className="mt-5 space-y-4 text-ink-soft">{children}</div>
    </article>
  )
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-6">{children}</ul>
}

export const legalLink = "font-medium text-primary underline underline-offset-4"
