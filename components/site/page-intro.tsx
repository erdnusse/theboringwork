import type { ReactNode } from "react"

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="section-dark page-section">
      <div className="mx-auto max-w-site px-page">
        <p className="eyebrow hero-in">{eyebrow}</p>
        <h1 className="hero-in mt-6 max-w-5xl text-display" style={{ "--d": "120ms" } as React.CSSProperties}>{title}</h1>
        {children ? <p className="hero-in mt-8 max-w-2xl text-body-lg" style={{ "--d": "260ms" } as React.CSSProperties}>{children}</p> : null}
      </div>
    </section>
  )
}

export function HandUnderline() {
  return (
    <svg
      className="absolute -bottom-2 left-0 h-3 w-full text-lime"
      viewBox="0 0 160 12"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 8.5C32 4.5 64 3.5 96 5.5C118 6.8 139 6.2 158 2.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
