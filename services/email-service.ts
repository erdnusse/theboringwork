import nodemailer from "nodemailer"
import { google } from "googleapis"
import prisma from "@/lib/prisma"
import crypto from "crypto"

const OAuth2 = google.auth.OAuth2

// Interface for OAuth email configuration
export interface EmailOAuthConfig {
  email: string
  clientId: string
  clientSecret: string
  refreshToken: string
  accessToken?: string
  tokenExpiry?: number
}

// Interface for email message
export interface EmailMessage {
  to: string
  subject: string
  text?: string
  html?: string
}

// Get email configuration from database
export async function getEmailConfig(): Promise<EmailOAuthConfig | null> {
  try {
    const config = await prisma.emailOAuthConfig.findFirst({
      where: {
        isActive: true,
      },
    })

    if (!config) return null

    return {
      email: config.email,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      refreshToken: config.refreshToken,
      accessToken: config.accessToken || undefined,
      tokenExpiry: config.tokenExpiry ? Number(config.tokenExpiry) : undefined,
    }
  } catch (error) {
    console.error("Error fetching email configuration:", error)
    return null
  }
}

// Save email configuration to database
export async function saveEmailConfig(config: EmailOAuthConfig): Promise<boolean> {
  try {
    // Deactivate all existing configurations first
    await prisma.emailOAuthConfig.updateMany({
      where: {
        isActive: true,
      },
      data: {
        isActive: false,
      },
    })

    // Insert new configuration
    await prisma.emailOAuthConfig.create({
      data: {
        email: config.email,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken,
        accessToken: config.accessToken,
        tokenExpiry: config.tokenExpiry ? BigInt(config.tokenExpiry) : null,
        isActive: true,
      },
    })

    return true
  } catch (error) {
    console.error("Error saving email configuration:", error)
    return false
  }
}

// Update access token in database
export async function updateAccessToken(email: string, accessToken: string, tokenExpiry: number): Promise<boolean> {
  try {
    await prisma.emailOAuthConfig.updateMany({
      where: {
        email,
        isActive: true,
      },
      data: {
        accessToken,
        tokenExpiry: BigInt(tokenExpiry),
      },
    })
    return true
  } catch (error) {
    console.error("Error updating access token:", error)
    return false
  }
}

// Create OAuth2 client
export function createOAuth2Client(config: EmailOAuthConfig) {
  const oauth2Client = new OAuth2(
    config.clientId,
    config.clientSecret,
    process.env.OAUTH_REDIRECT_URI || "https://developers.google.com/oauthplayground",
  )

  oauth2Client.setCredentials({
    refresh_token: config.refreshToken,
    access_token: config.accessToken,
    expiry_date: config.tokenExpiry,
  })

  return oauth2Client
}

// Get fresh access token if needed
export async function getAccessToken(config: EmailOAuthConfig): Promise<string> {
  try {
    const oauth2Client = createOAuth2Client(config)

    // Check if token is expired or will expire soon (within 5 minutes)
    const isTokenExpired = !config.tokenExpiry || config.tokenExpiry < Date.now() + 5 * 60 * 1000

    if (isTokenExpired) {
      const { credentials } = await oauth2Client.refreshAccessToken()

      if (credentials.access_token) {
        // Update the token in the database
        await updateAccessToken(config.email, credentials.access_token, credentials.expiry_date || Date.now() + 3600000)

        return credentials.access_token
      }
      throw new Error("Failed to refresh access token")
    }

    return config.accessToken || ""
  } catch (error) {
    console.error("Error getting access token:", error)
    throw error
  }
}

// Create a transporter for sending emails
export async function createTransporter() {
  try {
    // Get email configuration from database
    const config = await getEmailConfig()

    if (!config) {
      throw new Error("Email configuration not found")
    }

    // Get fresh access token
    const accessToken = await getAccessToken(config)

    // Create nodemailer transporter with OAuth2
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.email,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken,
        accessToken: accessToken,
      },
    })

    return transporter
  } catch (error) {
    console.error("Error creating email transporter:", error)
    throw error
  }
}

// Send an email
export async function sendEmail(message: EmailMessage): Promise<boolean> {
  try {
    const transporter = await createTransporter()

    // Get the from address from the config
    const config = await getEmailConfig()
    if (!config) {
      throw new Error("Email configuration not found")
    }

    // Create email log entry
    const emailLog = await prisma.emailLog.create({
      data: {
        to: message.to,
        subject: message.subject,
        content: message.html || message.text || "",
        status: "PENDING",
      },
    })

    try {
      // Send the email
      const info = await transporter.sendMail({
        from: config.email,
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html,
      })

      // Update email log with success
      await prisma.emailLog.update({
        where: { id: emailLog.id },
        data: {
          status: "SENT",
          sentAt: new Date(),
        },
      })

      console.log("Email sent:", info.messageId)
      return true
    } catch (error) {
      // Update email log with error
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

// Test email configuration
export async function testEmailConfig(config: EmailOAuthConfig): Promise<{ success: boolean; message: string }> {
  try {

    console.log("Config" + config)
    // Create OAuth2 client
    const oauth2Client = createOAuth2Client(config)

    console.log("Config refreshtoken" + config.refreshToken)

    // Verify the credentials by getting token info
    const tokenInfo = await oauth2Client.getTokenInfo(config.refreshToken)

    if (!tokenInfo || !tokenInfo.email) {
      return {
        success: false,
        message: "Invalid OAuth credentials",
      }
    }

    return {
      success: true,
      message: "Email configuration verified successfully",
    }
  } catch (error) {
    console.error("Error verifying email configuration:", error)
    return {
      success: false,
      message: `Failed to verify email configuration: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Generate OAuth URL for authorization
export function generateOAuthUrl(clientId: string, clientSecret: string, email: string): string {
  try {
    if (!clientId || !clientSecret) {
      throw new Error("Client ID and Client Secret are required")
    }

    const redirectUri = process.env.OAUTH_REDIRECT_URI || "https://developers.google.com/oauthplayground"

    console.log("Using redirect URI:", redirectUri)

    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUri)

    const scopes = [
      "https://mail.google.com/",
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/gmail.compose",
      "https://www.googleapis.com/auth/gmail.modify",
    ]

    // Generate a random state value for security
    const state = crypto.randomBytes(20).toString("hex")

    // Store the state with client credentials in the database for verification
    // This is a simplified approach - in production, you might want to use a more secure method
    prisma.oAuthState
      .upsert({
        where: { id: 1 },
        update: {
          state,
          email,
          clientId,
          clientSecret,
          expiresAt: new Date(Date.now() + 3600000), // Expires in 1 hour
          updatedAt: new Date(),
        },
        create: {
          id: 1,
          state,
          email,
          clientId,
          clientSecret,
          expiresAt: new Date(Date.now() + 3600000), // Expires in 1 hour
        },
      })
      .catch((error) => {
        console.error("Error storing OAuth state:", error)
      })

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      prompt: "consent",
      state: state, // Include the state parameter
    })

    console.log("Generated OAuth URL with state:", url)

    return url
  } catch (error) {
    console.error("Error generating OAuth URL:", error)
    throw error
  }
}

// Exchange authorization code for tokens
export async function exchangeCodeForTokens(
  code: string,
  state: string,
): Promise<{ accessToken: string; refreshToken: string; tokenExpiry: number; email: string }> {
  try {
    // Retrieve the stored state data
    const stateData = await prisma.oAuthState.findUnique({
      where: { id: 1 },
    })
    console.log("State value:", state)
    console.log("State data3:", stateData)

    if (!stateData || stateData.state !== state) {
      throw new Error("Invalid state parameter")
    }

    // Check if the state has expired
    if (stateData.expiresAt < new Date()) {
      await prisma.oAuthState.delete({
        where: { id: 1 },
      })
      throw new Error("State parameter has expired")
    }

    const { clientId, clientSecret, email } = stateData
    const redirectUri = process.env.OAUTH_REDIRECT_URI || "https://developers.google.com/oauthplayground"

    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUri)

    const { tokens } = await oauth2Client.getToken(code)

    if (!tokens.refresh_token || !tokens.access_token) {
      throw new Error("Failed to obtain tokens")
    }

    // Clean up the used state
    // No need to delete since we're reusing the same record

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      tokenExpiry: tokens.expiry_date || Date.now() + 3600000,
      email,
    }
  } catch (error) {
    console.error("Error exchanging code for tokens:", error)
    throw error
  }
}
