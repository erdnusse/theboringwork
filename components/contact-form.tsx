"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { toast } from "sonner"


import { useTranslation } from "@/hooks/use-translation";
import { submitContactForm } from "@/actions/contact-actions"

// Add reCAPTCHA script dynamically
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "missing_recaptcha_site_key"

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const { t } = useTranslation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema.refine((data) => {
      // Custom error messages using translation
      if (data.name.length < 2) throw new Error(t("contact_error_name"));
      if (!/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) throw new Error(t("contact_error_email"));
      if (data.subject.length < 5) throw new Error(t("contact_error_subject"));
      if (data.message.length < 10) throw new Error(t("contact_error_message"));
      return true;
    })),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  // Load reCAPTCHA script
  useEffect(() => {
    // Only load if not already loaded
    if (!window.grecaptcha) {
      const script = document.createElement("script")
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
      script.async = true
      script.defer = true
      script.onload = () => {
        window.grecaptcha.ready(() => {
          setRecaptchaLoaded(true)
        })
      }
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    } else {
      setRecaptchaLoaded(true)
    }
  }, [])

  // Get reCAPTCHA token
  const getRecaptchaToken = async (): Promise<string> => {
    if (!recaptchaLoaded) {
      console.warn("O reCAPTCHA ainda não foi carregado")
      return ""
    }

    try {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "contact_form" })
      return token
    } catch (error) {
      console.error("Erro ao obter o token do reCAPTCHA:", error)
      return ""
    }
  }

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    const start = Date.now() // Start timing

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await getRecaptchaToken()

      if (!recaptchaToken) {
        toast.error("Falha na verificação do reCAPTCHA");
        setIsSubmitting(false)
        return
      }

      // Submit form with reCAPTCHA token
      const result = await submitContactForm({
        ...values,
        recaptchaToken,
      })

      if (result.success) {
        toast.success("Mensagem enviada com sucesso");
        form.reset()
      } else {
        toast.error("Falha ao enviar a sua mensagem. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao submeter o formulário de contacto:", error)
      toast.error("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact_label_name")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("contact_placeholder_name") || ""} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact_label_email")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("contact_placeholder_email") || ""} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact_label_subject")}</FormLabel>
              <FormControl>
                <Input placeholder={t("contact_placeholder_subject") || ""} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact_label_message")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("contact_placeholder_message") || ""} className="min-h-[120px] resize-y" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

  {!recaptchaLoaded && <div className="text-sm text-amber-600">{t("contact_recaptcha_loading")}</div>}

        <div className="text-xs text-muted-foreground">
          {t("contact_recaptcha_notice_start")}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            {t("contact_recaptcha_privacy")}
          </a>
          {t("contact_recaptcha_notice_middle")}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            {t("contact_recaptcha_terms")}
          </a>
          {t("contact_recaptcha_notice_end")}
        </div>

        <Button
          type="submit"
          className="w-full bg-[#5344b4] hover:bg-[#dff506] text-[#dff506] hover:text-[#5344b4] 
          group inline-flex items-center justify-center px-8 py-5 text-base font-semibold tracking-wide rounded-xl transition-all duration-300  hover:shadow-xl"
          disabled={isSubmitting || !recaptchaLoaded}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("contact_button_sending")}
            </>
          ) : (
            t("contact_button_send")
          )}
        </Button>
      </form>
    </Form>
  )
}