import { NextResponse } from "next/server"
import { scheduleTokenRefresh } from "@/services/email-service"

// This endpoint can be called by a cron job to keep tokens fresh
export async function GET() {
  try {
    await scheduleTokenRefresh()
    return NextResponse.json({ success: true, message: "Token refresh scheduled successfully" })
  } catch (error) {
    console.error("Error in token refresh cron:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to refresh tokens",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
