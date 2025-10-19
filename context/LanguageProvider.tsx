"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Lang = 'en' | 'pt'

const LanguageContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
} | null>(null)

export const LanguageProvider = ({ children, initialLang }: { children: React.ReactNode; initialLang?: Lang }) => {
  const router = useRouter()
  const [lang, setLangState] = useState<Lang>(initialLang ?? 'pt')

  useEffect(() => {
    // Keep URL in sync when lang changes
    // If current path already has lang prefix, replace it; otherwise push new prefix
    const pathname = window.location.pathname
    const parts = pathname.split('/').filter(Boolean)
    if (parts[0] && (parts[0] === 'en' || parts[0] === 'pt')) {
      parts[0] = lang
      const newPath = '/' + parts.join('/') + window.location.search + window.location.hash
      if (newPath !== pathname) router.push(newPath)
    } else {
      const newPath = `/${lang}${pathname}`
      router.push(newPath)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
