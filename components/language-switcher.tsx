"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

export default function LanguageSwitcher({ current }: { current: 'en' | 'pt' }) {
  const router = useRouter()

  function switchTo(lang: 'en' | 'pt') {
    const pathname = window.location.pathname
    const parts = pathname.split('/').filter(Boolean)
    if (parts[0] && (parts[0] === 'en' || parts[0] === 'pt')) {
      parts[0] = lang
    } else {
      parts.unshift(lang)
    }
    const newPath = '/' + parts.join('/') + window.location.search + window.location.hash
    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => switchTo('en')} className={`px-2 py-1 rounded ${current === 'en' ? 'bg-gray-200' : ''}`}>
        EN
      </button>
      <button onClick={() => switchTo('pt')} className={`px-2 py-1 rounded ${current === 'pt' ? 'bg-gray-200' : ''}`}>
        PT
      </button>
    </div>
  )
}
