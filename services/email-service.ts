import nodemailer from "nodemailer"
import prisma from "@/lib/prisma"

export interface EmailMessage {
  to: string
  subject: string
  text?: string
  html?: string
}

export async function createTransporter() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    throw new Error("GMAIL_USER and GMAIL_APP_PASSWORD must be set")
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  })
}

export async function sendEmail(message: EmailMessage): Promise<boolean> {
  try {
    const transporter = await createTransporter()

    const emailLog = await prisma.emailLog.create({
      data: {
        to: message.to,
        subject: message.subject,
        content: message.html || message.text || "",
        status: "PENDING",
      },
    })

    try {
      const info = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html,
      })

      await prisma.emailLog.update({
        where: { id: emailLog.id },
        data: { status: "SENT", sentAt: new Date() },
      })

      console.log("Email sent:", info.messageId)
      return true
    } catch (error) {
      await prisma.emailLog.update({
        where: { id: emailLog.id },
        data: {
          status: "FAILED",
          error: error instanceof Error ? error.message : "Unknown error",
        },
      })
      throw error
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}
