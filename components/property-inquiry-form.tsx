"use client"

import type React from "react"

import { useState } from "react"
import { submitPropertyInquiry } from "@/actions/inquiry-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PropertyInquiryFormProps {
  propertyId: number
  propertyTitle: string
}

export function PropertyInquiryForm({ propertyId, propertyTitle }: PropertyInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    try {
      const formData = new FormData(event.currentTarget)
      formData.append("propertyId", propertyId.toString())

      const response = await submitPropertyInquiry(formData)

      if (response.success) {
        setFormStatus({ success: true, message: response.message })
        event.currentTarget.reset()
      } else {
        setFormStatus({ success: false, message: response.message })
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-semibold">Inquire About This Property</h3>
        <p className="text-sm text-muted-foreground">
          Fill out the form below to get more information about {propertyTitle}
        </p>
      </div>

      {formStatus?.success ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
          <p className="text-green-800">{formStatus.message}</p>
          <Button variant="outline" className="mt-2" onClick={() => setFormStatus(null)}>
            Send Another Inquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input id="phone" name="phone" type="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              defaultValue={`I'm interested in learning more about ${propertyTitle}.`}
              required
            />
          </div>

          {formStatus?.success === false && (
            <div className="bg-red-50 border border-red-200 rounded-md p-2 text-center">
              <p className="text-red-800 text-sm">{formStatus.message}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </Button>
        </form>
      )}
    </div>
  )
}
