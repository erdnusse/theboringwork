"use server"

import { revalidatePath } from "next/cache"
import {
  type EmailOAuthConfig,
  saveEmailConfig,
  sendEmail,
  testEmailConfig,
  generateOAuthUrl,
  exchangeCodeForTokens,
} from "@/services/email-service"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

// Helper function to check if user is authorized
async function isAuthorized() {
console.log("Checking user authorization...")
  const { userId } = await auth()
  if (!userId) {
    console.log("User id missing, user is not authorized")
    return false
}
  return true
}

// Save email OAuth settings
export async function saveEmailOAuthSettings(formData: FormData): Promise<{
  success: boolean
  message: string
  authUrl?: string
}> {
  try {
    console.log("Saving email OAuth settings...")
    // Check if user is authorized
    if (!(await isAuthorized())) {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    // Extract form data
    const email = formData.get("email") as string
    const clientId = formData.get("clientId") as string
    const clientSecret = formData.get("clientSecret") as string

    // Validate form data
    if (!email || !clientId || !clientSecret) {
      return {
        success: false,
        message: "Please fill in all required fields",
      }
    }

    try {
      // Generate OAuth URL for authorization
      const authUrl = generateOAuthUrl(clientId, clientSecret, email)

      // Log the URL for debugging (will be visible in server logs)
      console.log("Generated OAuth URL:", authUrl)

      if (!authUrl) {
        throw new Error("Failed to generate authorization URL")
      }

      return {
        success: true,
        message: "Please authorize access to your Gmail account",
        authUrl,
      }
    } catch (oauthError) {
      console.error("OAuth URL generation error:", oauthError)
      return {
        success: false,
        message: `Failed to generate OAuth URL: ${oauthError instanceof Error ? oauthError.message : "Unknown error"}`,
      }
    }
  } catch (error) {
    console.error("Error saving email OAuth settings:", error)
    return {
      success: false,
      message: `Failed to save email OAuth settings: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Complete OAuth setup with authorization code
export async function completeOAuthSetup(formData: FormData): Promise<{
  success: boolean
  message: string
}> {
  try {
    // Check if user is authorized
    if (!(await isAuthorized())) {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    // Extract form data

    const authCode = formData.get("authCode") as string
    const state = formData.get("state") as string

    // Validate form data
    if (!authCode || !state) {
      return {
        success: false,
        message: "Authorization code and state are required",
      }
    }

    // Exchange authorization code for tokens
    const { accessToken, refreshToken, tokenExpiry, email } = await exchangeCodeForTokens(authCode, state)

    // Get client credentials from state
    const stateData = await prisma.oAuthState.findUnique({
      where: { id: 1 },
    })
    console.log("State value:", state);
    console.log("State data2:", stateData)

    if (!stateData) {
      return {
        success: false,
        message: "Invalid state parameter",
      }
    }

    // Create email config
    const config: EmailOAuthConfig = {
      email,
      clientId: stateData.clientId,
      clientSecret: stateData.clientSecret,
      refreshToken,
      accessToken,
      tokenExpiry,
    }

    // Test the configuration first
    const testResult = await testEmailConfig(config)
    if (!testResult.success) {
      return testResult
    }

    // Save the configuration
    const saved = await saveEmailConfig(config)
    if (!saved) {
      return {
        success: false,
        message: "Failed to save email configuration",
      }
    }

    // Revalidate the path to update the UI
    revalidatePath("/dashboard/email")

    return {
      success: true,
      message: "Email configuration saved successfully",
    }
  } catch (error) {
    console.error("Error completing OAuth setup:", error)
    return {
      success: false,
      message: `Failed to complete OAuth setup: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Test email configuration
export async function testEmailConfiguration(formData: FormData): Promise<{
  success: boolean
  message: string
}> {
  try {
    // Check if user is authorized
    if (!(await isAuthorized())) {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    // Extract test email address
    const testEmail = formData.get("testEmail") as string

    // Validate form data
    if (!testEmail) {
      return {
        success: false,
        message: "Please enter a test email address",
      }
    }

    // Send a test email
    const sent = await sendEmail({
      to: testEmail,
      subject: "Test Email from Your Real Estate App",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Email Configuration Test</h2>
          <p style="color: #555; line-height: 1.5;">This is a test email to confirm that your email configuration is working correctly.</p>
          <p style="color: #555; line-height: 1.5;">If you're receiving this email, it means your email settings have been configured successfully with OAuth 2.0!</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 5px 0 0; color: #777;">Date: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    })

    if (!sent) {
      return {
        success: false,
        message: "Failed to send test email",
      }
    }

    return {
      success: true,
      message: `Test email sent successfully to ${testEmail}`,
    }
  } catch (error) {
    console.error("Error testing email configuration:", error)
    return {
      success: false,
      message: `Failed to test email configuration: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}
