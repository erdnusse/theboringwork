"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTranslation } from "@/hooks/use-translation"
import {
  CONSENT_OPEN_EVENT,
  GA_ID,
  clearAnalyticsCookies,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/cookie-consent"

export default function CookieConsent() {
  const { t, lang } = useTranslation()
  const [consent, setConsent] = useState<ConsentChoice | null>(null)
  const [open, setOpen] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const saved = readConsent()
    setConsent(saved)
    setAnalytics(saved === "granted")
    setOpen(saved === null)

    const reopen = () => {
      setAnalytics(readConsent() === "granted")
      setCustomizing(true)
      setOpen(true)
    }
    window.addEventListener(CONSENT_OPEN_EVENT, reopen)
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen)
  }, [])

  function save(choice: ConsentChoice) {
    writeConsent(choice)
    if (choice === "denied") {
      (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true
      clearAnalyticsCookies()
    } else {
      (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = false
    }
    setConsent(choice)
    setOpen(false)
    setCustomizing(false)
  }

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {open && (
        <div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-text"
          className="fixed inset-x-4 bottom-4 z-50 max-w-md rounded-lg border border-line bg-background p-5 text-ink shadow-xl duration-300 animate-in fade-in slide-in-from-bottom-4 motion-reduce:animate-none sm:right-auto"
        >
          <h2 id="cookie-consent-title" className="text-lg font-bold">
            {t("cookie_banner_title")}
          </h2>
          <p id="cookie-consent-text" className="mt-2 text-sm text-muted-foreground">
            {t("cookie_banner_text")}{" "}
            <Link href={`/${lang}/cookies`} className="underline underline-offset-4">
              {t("cookie_banner_policy_link")}
            </Link>
          </p>

          {customizing && (
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold">{t("cookie_banner_necessary_title")}</p>
                  <p className="text-muted-foreground">{t("cookie_banner_necessary_text")}</p>
                </div>
                <Switch checked disabled aria-label={t("cookie_banner_necessary_title")} />
              </li>
              <li className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold">{t("cookie_banner_analytics_title")}</p>
                  <p className="text-muted-foreground">{t("cookie_banner_analytics_text")}</p>
                </div>
                <Switch
                  checked={analytics}
                  onCheckedChange={setAnalytics}
                  aria-label={t("cookie_banner_analytics_title")}
                />
              </li>
            </ul>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {customizing ? (
              <Button size="sm" onClick={() => save(analytics ? "granted" : "denied")}>
                {t("cookie_banner_save")}
              </Button>
            ) : (
              <>
                <Button size="sm" onClick={() => save("granted")}>
                  {t("cookie_banner_accept")}
                </Button>
                <Button size="sm" variant="outline" onClick={() => save("denied")}>
                  {t("cookie_banner_reject")}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setCustomizing(true)}>
                  {t("cookie_banner_customize")}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
