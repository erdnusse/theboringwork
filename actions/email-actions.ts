"use server"

import {
  generateOAuthUrl,
  exchangeCodeForTokens,
  saveEmailConfig,
  testEmailConfig,
  sendEmail,
  getEmailConfig as getEmailConfigService,
} from "@/services/email-service"

// Action to save initial OAuth settings and generate authorization URL
export async function saveEmailOAuthSettings(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const clientId = formData.get("clientId") as string
    const clientSecret = formData.get("clientSecret") as string

    if (!email || !clientId || !clientSecret) {
      return {
        success: false,
        message: "Email, Client ID, and Client Secret are required",
      }
    }

    // Generate OAuth URL
    const authUrl = generateOAuthUrl(clientId, clientSecret, email)

    return {
      success: true,
      message: "OAuth settings saved successfully",
      authUrl,
    }
  } catch (error) {
    console.error("Error saving OAuth settings:", error)
    return {
      success: false,
      message: `Failed to save OAuth settings: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Action to complete OAuth setup with authorization code
export async function completeOAuthSetup(formData: FormData) {
  try {
    const authCode = formData.get("authCode") as string
    const state = formData.get("state") as string

    if (!authCode || !state) {
      return {
        success: false,
        message: "Authorization code and state parameter are required",
      }
    }

    // Exchange authorization code for tokens
    const { accessToken, refreshToken, tokenExpiry, email } = await exchangeCodeForTokens(authCode, state)

    // Save the complete OAuth configuration
    const config = {
      email,
      clientId: "", // These will be retrieved from the state data
      clientSecret: "", // These will be retrieved from the state data
      refreshToken,
      accessToken,
      tokenExpiry,
    }

    const saved = await saveEmailConfig(config)

    if (!saved) {
      return {
        success: false,
        message: "Failed to save OAuth configuration",
      }
    }

    // Test the configuration
    const testResult = await testEmailConfig(config)

    if (!testResult.success) {
      return {
        success: false,
        message: `OAuth setup completed, but configuration test failed: ${testResult.message}`,
      }
    }

    return {
      success: true,
      message: "OAuth setup completed successfully",
    }
  } catch (error) {
    console.error("Error completing OAuth setup:", error)
    return {
      success: false,
      message: `Failed to complete OAuth setup: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Action to test email configuration
export async function testEmailConfiguration(formData: FormData) {
  try {
    const testEmail = formData.get("testEmail") as string

    if (!testEmail) {
      return {
        success: false,
        message: "Test email address is required",
      }
    }

    // Send a test email
    const emailSent = await sendEmail({
      to: testEmail,
      subject: "Test Email from Your Application",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333;">Test Email Successful!</h2>
          <p>This is a test email sent from your application using Gmail OAuth 2.0.</p>
          <p>If you're receiving this email, it means your email configuration is working correctly.</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px; color: #666;">This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    })

    if (!emailSent) {
      return {
        success: false,
        message: "Failed to send test email. Please check your configuration.",
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

// Action to get email configuration
export async function getEmailConfig() {
  try {
    const config = await getEmailConfigService()

    if (!config) {
      return {
        success: false,
        message: "No email configuration found",
        data: null,
      }
    }

    return {
      success: true,
      message: "Email configuration retrieved successfully",
      data: {
        email: config.email,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken ? true : false, // Just indicate if we have a refresh token
      },
    }
  } catch (error) {
    console.error("Error getting email configuration:", error)
    return {
      success: false,
      message: `Failed to get email configuration: ${error instanceof Error ? error.message : "Unknown error"}`,
      data: null,
    }
  }
}
