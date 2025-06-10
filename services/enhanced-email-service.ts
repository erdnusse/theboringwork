import { google } from "googleapis"
import prisma from "@/lib/prisma"

const OAuth2 = google.auth.OAuth2

// Enhanced interfaces
export interface EmailOAuthConfig {
  email: string
  clientId: string
  clientSecret: string
  refreshToken: string
  accessToken?: string
  tokenExpiry?: number
  lastUsed?: Date
}

export interface TokenRefreshResult {
  success: boolean
  accessToken?: string
  tokenExpiry?: number
  error?: string
  retryAfter?: number
}

export interface RefreshAttempt {
  timestamp: Date
  success: boolean
  error?: string
  retryCount: number
}

// Enhanced token refresh with retry logic and rate limiting
export async function enhancedTokenRefresh(
  config: EmailOAuthConfig,
  maxRetries = 3,
  baseDelayMs = 1000,
): Promise<TokenRefreshResult> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Implement exponential backoff for retries
      if (attempt > 0) {
        const delay = baseDelayMs * Math.pow(2, attempt - 1) + Math.random() * 1000
        console.log(`Token refresh retry ${attempt}, waiting ${delay}ms`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }

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

      // Attempt to refresh the token
      const { credentials } = await oauth2Client.refreshAccessToken()

      if (!credentials.access_token) {
        throw new Error("No access token received from refresh")
      }

      const tokenExpiry = credentials.expiry_date || Date.now() + 3600000

      // Update token in database
      await updateAccessToken(config.email, credentials.access_token, tokenExpiry)

      // Log successful refresh
      await logRefreshAttempt({
        timestamp: new Date(),
        success: true,
        retryCount: attempt,
      })

      return {
        success: true,
        accessToken: credentials.access_token,
        tokenExpiry: tokenExpiry,
      }
    } catch (error) {
      lastError = error as Error
      console.error(`Token refresh attempt ${attempt + 1} failed:`, error)

      // Check for specific error types
      if (isRateLimitError(error)) {
        const retryAfter = extractRetryAfter(error) || 60000 // Default 1 minute
        console.log(`Rate limit hit, should retry after ${retryAfter}ms`)

        await logRefreshAttempt({
          timestamp: new Date(),
          success: false,
          error: `Rate limit: ${(error as Error).message}`,
          retryCount: attempt,
        })

        return {
          success: false,
          error: "Rate limit exceeded",
          retryAfter: retryAfter,
        }
      }

      if (isTokenRevokedError(error)) {
        console.error("Refresh token appears to be revoked or invalid")

        // Mark configuration as invalid
        await markConfigurationInvalid(
          config.email,
          error instanceof Error ? error.message : String(error)
        )

        await logRefreshAttempt({
          timestamp: new Date(),
          success: false,
          error: `Token revoked: ${error instanceof Error ? error.message : String(error)}`,
          retryCount: attempt,
        })

        return {
          success: false,
          error: "Refresh token revoked - re-authorization required",
        }
      }

      // For network errors or temporary issues, continue retrying
      if (isRetryableError(error) && attempt < maxRetries - 1) {
        continue
      }

      // Log the failed attempt
      await logRefreshAttempt({
        timestamp: new Date(),
        success: false,
        error: error instanceof Error ? error.message : String(error),
        retryCount: attempt,
      })
    }
  }

  // All retries exhausted
  return {
    success: false,
    error: lastError?.message || "Token refresh failed after all retries",
  }
}

// Enhanced cron job function with comprehensive error handling
export async function robustTokenRefresh(): Promise<{
  success: boolean
  message: string
  details?: any
}> {
  const startTime = Date.now()

  try {
    // Get active email configuration
    const config = await getEmailConfig()

    if (!config) {
      return {
        success: false,
        message: "No active email configuration found",
      }
    }

    // Check if token needs refreshing (refresh if expires within 30 minutes)
    const needsRefresh = !config.tokenExpiry || config.tokenExpiry < Date.now() + 30 * 60 * 1000

    if (!needsRefresh) {
      return {
        success: true,
        message: "Token is still valid, refresh not needed",
        details: {
          tokenExpiry: new Date(config.tokenExpiry!),
          timeUntilExpiry: config.tokenExpiry! - Date.now(),
        },
      }
    }

    // Perform enhanced token refresh
    const refreshResult = await enhancedTokenRefresh(config)

    if (!refreshResult.success) {
      // Handle different types of failures
      if (refreshResult.retryAfter) {
        // Schedule retry for later
        await scheduleRetry(refreshResult.retryAfter)
      }

      if (refreshResult.error?.includes("revoked")) {
        // Send alert for manual intervention
        await sendTokenRevocationAlert(config.email)
      }

      return {
        success: false,
        message: refreshResult.error || "Token refresh failed",
        details: refreshResult,
      }
    }

    const duration = Date.now() - startTime

    return {
      success: true,
      message: "Token refreshed successfully",
      details: {
        duration: `${duration}ms`,
        newTokenExpiry: new Date(refreshResult.tokenExpiry!),
        email: config.email,
      },
    }
  } catch (error) {
    console.error("Unexpected error in token refresh:", error)

    return {
      success: false,
      message: `Unexpected error: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Helper functions for error classification
function isRateLimitError(error: any): boolean {
  return (
    error.message?.includes("rate_limit_exceeded") || error.message?.includes("quota_exceeded") || error.status === 429
  )
}

function isTokenRevokedError(error: any): boolean {
  return (
    error.message?.includes("invalid_grant") ||
    error.message?.includes("Token has been expired or revoked") ||
    error.message?.includes("unauthorized_client")
  )
}

function isRetryableError(error: any): boolean {
  // Network errors, temporary server errors, etc.
  return (
    error.code === "ECONNRESET" ||
    error.code === "ENOTFOUND" ||
    error.code === "ETIMEDOUT" ||
    error.status >= 500 ||
    error.message?.includes("network")
  )
}

function extractRetryAfter(error: any): number | null {
  // Extract retry-after header if available
  if (error.response?.headers?.["retry-after"]) {
    return Number.parseInt(error.response.headers["retry-after"]) * 1000
  }
  return null
}

// Database functions for logging and monitoring
async function logRefreshAttempt(attempt: RefreshAttempt): Promise<void> {
  try {
    await prisma.tokenRefreshLog.create({
      data: {
        timestamp: attempt.timestamp,
        success: attempt.success,
        error: attempt.error,
        retry_count: attempt.retryCount,
      },
    })
  } catch (error) {
    console.error("Failed to log refresh attempt:", error)
  }
}

async function markConfigurationInvalid(email: string, reason: string): Promise<void> {
  try {
    await prisma.emailOAuthConfig.updateMany({
      where: {
        email,
        isActive: true,
      },
      data: {
        isActive: false,
        // Add a status field to track why it was deactivated
        updatedAt: new Date(),
      },
    })
  } catch (error) {
    console.error("Failed to mark configuration as invalid:", error)
  }
}

async function scheduleRetry(delayMs: number): Promise<void> {
  // In a production environment, you might use a job queue like Bull or Agenda
  console.log(`Scheduling retry in ${delayMs}ms`)
  // This is a simplified approach - in production, use proper job scheduling
}

async function sendTokenRevocationAlert(email: string): Promise<void> {
  // Send alert to administrators about token revocation
  console.error(`ALERT: OAuth token revoked for ${email} - manual re-authorization required`)
  // In production, integrate with your alerting system (email, Slack, PagerDuty, etc.)
}

// Get email configuration from database (keeping existing function)
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

// Update access token in database (keeping existing function)
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
        updatedAt: new Date(),
      },
    })
    return true
  } catch (error) {
    console.error("Error updating access token:", error)
    return false
  }
}
