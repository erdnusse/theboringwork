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
import { submitContactForm } from "@/actions/contact-actions"

import { toast } from "sonner"

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
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um endereço de email válido.",
  }),
  subject: z.string().min(5, {
    message: "O assunto deve ter pelo menos 5 caracteres.",
  }),
  message: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="O seu nome" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="o.seu.email@exemplo.com" {...field} />
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
              <FormLabel>Assunto</FormLabel>
              <FormControl>
                <Input placeholder="Sobre o que pretende falar?" {...field} />
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
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea placeholder="Como podemos ajudar?" className="min-h-[120px] resize-y" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!recaptchaLoaded && <div className="text-sm text-amber-600">A carregar verificação de segurança...</div>}

        <div className="text-xs text-muted-foreground">
          Este site é protegido pelo reCAPTCHA e pela{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            Política de Privacidade
          </a>{" "}
          e pelos{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            Termos de Serviço
          </a>{" "}
          da Google.
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
              A enviar...
            </>
          ) : (
            "Enviar Mensagem"
          )}
        </Button>
      </form>
    </Form>
  )
}