"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { sendEmail } from "@/services/email-service"

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate the form data
    const validatedData = contactFormSchema.parse(formData)

    // Store the contact message in the database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        status: "NEW",
      },
    })

    // Send notification email to admin
    try {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com"

      await sendEmail({
        to: adminEmail,
        subject: `New Contact Form Submission: ${validatedData.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <h3>Message:</h3>
          <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
          <p>This message is available in your admin dashboard.</p>
        `,
        text: `
          New contact form submission from ${validatedData.name}
          
          Email: ${validatedData.email}
          Subject: ${validatedData.subject}
          
          Message:
          ${validatedData.message}
          
          This message is available in your admin dashboard.
        `,
      })

      // Send confirmation email to the user
      await sendEmail({
        to: validatedData.email,
        subject: "We've received your message - StrategyPro",
        html: `
          <h2>Thank You for Contacting Us</h2>
          <p>Dear ${validatedData.name},</p>
          <p>Thank you for reaching out to us. This email confirms that we've received your message.</p>
          <p>Our team will review your inquiry and get back to you within 24-48 hours.</p>
          <p>For reference, here's a copy of your message:</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <div style="padding: 15px; background-color: #f5f7fa; border-left: 4px solid #0ea5e9; margin: 15px 0;">
            ${validatedData.message.replace(/\n/g, "<br>")}
          </div>
          <p>If you have any additional information to share, please reply to this email.</p>
          <p>Best regards,<br>The StrategyPro Team</p>
        `,
        text: `
          Dear ${validatedData.name},
          
          Thank you for contacting us. This email confirms that we've received your message.
          
          Our team will review your inquiry and get back to you within 24-48 hours.
          
          For reference, here's a copy of your message:
          
          Subject: ${validatedData.subject}
          Message:
          ${validatedData.message}
          
          If you have any additional information to share, please reply to this email.
          
          Best regards,
          The StrategyPro Team
        `,
      })

      // Update the contact message status to indicate emails were sent
      await prisma.contactMessage.update({
        where: { id: contactMessage.id },
        data: {
          notes: "Notification emails sent successfully.",
        },
      })
    } catch (emailError) {
      console.error("Failed to send notification emails:", emailError)

      // Update the contact message to indicate email failure
      await prisma.contactMessage.update({
        where: { id: contactMessage.id },
        data: {
          notes: `Failed to send notification emails: ${emailError instanceof Error ? emailError.message : "Unknown error"}`,
        },
      })

      // We don't want to fail the whole submission if just the email fails
      // The message is still saved in the database
    }

    revalidatePath("/contact")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid form data. Please check your inputs and try again.",
      }
    }

    return {
      success: false,
      error: "Failed to submit your message. Please try again later.",
    }
  }
}
