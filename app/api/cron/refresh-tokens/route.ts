import { NextResponse } from "next/server"
import { robustTokenRefresh } from "@/services/enhanced-email-service"

// Enhanced cron endpoint with comprehensive monitoring
export async function GET(request: Request) {
  const startTime = Date.now()

  try {
    // Verify the request is from an authorized source
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      console.warn("Unauthorized cron job access attempt")
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    console.log("Starting scheduled token refresh...")

    const result = await robustTokenRefresh()
    const duration = Date.now() - startTime

    // Log the result for monitoring
    console.log(`Token refresh completed in ${duration}ms:`, {
      success: result.success,
      message: result.message,
      details: result.details,
    })

    // Return appropriate HTTP status
    const status = result.success ? 200 : 500

    return NextResponse.json(
      {
        ...result,
        executionTime: `${duration}ms`,
        timestamp: new Date().toISOString(),
      },
      { status },
    )
  } catch (error) {
    const duration = Date.now() - startTime

    console.error("Critical error in token refresh cron:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Critical error in token refresh",
        error: error instanceof Error ? error.message : "Unknown error",
        executionTime: `${duration}ms`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

// Health check endpoint for monitoring
export async function HEAD() {
  return new NextResponse(null, { status: 200 })
}
