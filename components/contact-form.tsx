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
import { useToast } from "@/components/ui/use-toast"
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
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const { toast } = useToast()

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
      console.warn("reCAPTCHA not loaded yet")
      return ""
    }

    try {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "contact_form" })
      return token
    } catch (error) {
      console.error("Error getting reCAPTCHA token:", error)
      return ""
    }
  }

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await getRecaptchaToken()

      if (!recaptchaToken) {
        toast({
          title: "reCAPTCHA verification failed",
          description: "Please try again or contact support if the problem persists.",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Submit form with reCAPTCHA token
      const result = await submitContactForm({
        ...values,
        recaptchaToken,
      })

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for contacting us. We'll respond shortly.",
          variant: "default",
        })
        form.reset()
      } else {
        toast({
          title: "Something went wrong",
          description: result.error || "Failed to send your message. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Contact form submission error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
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
                  <Input placeholder="your.email@example.com" {...field} />
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
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="What is this regarding?" {...field} />
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
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="How can we help you?" className="min-h-[120px] resize-y" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!recaptchaLoaded && <div className="text-sm text-amber-600">Loading security verification...</div>}

        <div className="text-xs text-muted-foreground">
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            Terms of Service
          </a>{" "}
          apply.
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
          disabled={isSubmitting || !recaptchaLoaded}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  )
}
