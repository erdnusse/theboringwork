'use client'
import { useLanguage } from '@/context/LanguageProvider'
import en from '@/locales/en.json'
import pt from '@/locales/pt.json'

export function useTranslation() {
  const { lang } = useLanguage()
  const messages: Record<string, string> = lang === 'pt' ? pt : en
  function t(key: string): string {
    return messages[key] || key
  }
  return { t, lang }
}
