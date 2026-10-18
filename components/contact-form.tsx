"use client"

import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowUpRight, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { submitContactForm } from "@/actions/contact-actions"

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "missing_recaptcha_site_key"

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

type FormValues = { name: string; email: string; subject: string; message: string }
type FieldName = keyof FormValues

const FIELDS: FieldName[] = ["name", "email", "subject"]

export default function ContactForm() {
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const { t } = useTranslation()

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("contact_error_name")),
        email: z.string().email(t("contact_error_email")),
        subject: z.string().min(5, t("contact_error_subject")),
        message: z.string().min(10, t("contact_error_message")),
      }),
    [t],
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  })

  useEffect(() => {
    if (window.grecaptcha) {
      setRecaptchaLoaded(true)
      return
    }
    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => window.grecaptcha.ready(() => setRecaptchaLoaded(true))
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const getRecaptchaToken = async (): Promise<string> => {
    if (!recaptchaLoaded) return ""
    try {
      return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "contact_form" })
    } catch (error) {
      console.error("Erro ao obter o token do reCAPTCHA:", error)
      return ""
    }
  }

  async function onSubmit(values: FormValues) {
    try {
      const recaptchaToken = await getRecaptchaToken()
      if (!recaptchaToken) {
        toast.error("Falha na verificação do reCAPTCHA")
        return
      }
      const result = await submitContactForm({ ...values, recaptchaToken })
      if (result.success) {
        toast.success("Mensagem enviada com sucesso")
        reset()
      } else {
        console.error("Contact form failed:", result.error)
        toast.error("Falha ao enviar a sua mensagem. Por favor, tente novamente.")
      }
    } catch (error) {
      console.error("Erro ao submeter o formulário de contacto:", error)
      toast.error("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.")
    }
  }

  const errorText = (name: FieldName) =>
    errors[name] ? (
      <span id={`${name}-error`} role="alert" className="text-xs font-normal normal-case tracking-normal text-destructive">
        {errors[name]?.message}
      </span>
    ) : null

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-8">
      {FIELDS.map((name) => (
        <label key={name} className="field-label">
          {t(`contact_label_${name}`)}
          <input
            className="field"
            type={name === "email" ? "email" : "text"}
            autoComplete={name === "subject" ? "off" : name}
            placeholder={t(`contact_placeholder_${name}`)}
            aria-invalid={Boolean(errors[name])}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
            {...register(name)}
          />
          {errorText(name)}
        </label>
      ))}

      <label className="field-label">
        {t("contact_label_message")}
        <textarea
          className="field min-h-36 resize-y"
          placeholder={t("contact_placeholder_message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errorText("message")}
      </label>

      <div>
        <Button type="submit" size="lg" disabled={isSubmitting || !recaptchaLoaded}>
          {isSubmitting ? (
            <>
              {t("contact_button_sending")} <Loader2 className="animate-spin" aria-hidden="true" />
            </>
          ) : (
            <>
              {t("contact_button_send")} <ArrowUpRight aria-hidden="true" />
            </>
          )}
        </Button>
        {!recaptchaLoaded && <p className="mt-4 text-xs text-ink-soft">{t("contact_recaptcha_loading")}</p>}
        <p className="mt-4 text-xs leading-relaxed text-ink-soft">
          {t("contact_recaptcha_notice_start")}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline underline-offset-2">
            {t("contact_recaptcha_privacy")}
          </a>
          {t("contact_recaptcha_notice_middle")}
          <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline underline-offset-2">
            {t("contact_recaptcha_terms")}
          </a>
          {t("contact_recaptcha_notice_end")}
        </p>
      </div>
    </form>
  )
}
