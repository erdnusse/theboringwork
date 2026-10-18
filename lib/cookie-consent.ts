export const GA_ID = "G-SFHQRXLQLJ"
export const CONSENT_COOKIE = "cookie_consent"
export const CONSENT_OPEN_EVENT = "cookie-consent:open"
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180

export type ConsentChoice = "granted" | "denied"

export function readConsent(): ConsentChoice | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`))
  return (match?.[1] as ConsentChoice | undefined) ?? null
}

export function writeConsent(choice: ConsentChoice) {
  const secure = location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${CONSENT_COOKIE}=${choice}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`
}

// GA cookies (_ga, _ga_<id>, _gid, _gat*) are set on the root domain, so clear every domain level.
export function clearAnalyticsCookies() {
  const parts = location.hostname.split(".")
  const domains = ["", ...parts.map((_, i) => `; Domain=${parts.slice(i).join(".")}`)]
  document.cookie
    .split("; ")
    .map((entry) => entry.split("=")[0])
    .filter((name) => /^_ga|^_gid|^_gat/.test(name))
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; Path=/${domain}`
      })
    })
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))
}
