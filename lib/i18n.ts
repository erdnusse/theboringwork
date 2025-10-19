import fs from 'fs'
import path from 'path'

type Locale = Record<string, string>

function loadLocale(locale: string): Locale {
  const localesDir = path.join(process.cwd(), 'locales')
  const file = path.join(localesDir, `${locale}.json`)
  try {
    const raw = fs.readFileSync(file, 'utf8')
    return JSON.parse(raw) as Locale
  } catch (err) {
    console.warn(`Could not load locale file for ${locale}:`, err)
    return {}
  }
}

export function getTranslator(locale: string) {
  const messages = loadLocale(locale)
  return function t(key: string, fallback?: string) {
    return messages[key] ?? fallback ?? key
  }
}

export function isSupportedLocale(lang?: string) {
  if (!lang) return false
  return ['en', 'pt'].includes(lang)
}
