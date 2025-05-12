import { type NextRequest, NextResponse } from "next/server"
import { exchangeCodeForTokens } from "@/services/email-service"

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code) {
      return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 })
    }

    // The state parameter should contain the clientId and clientSecret
    // In a real application, you would use a more secure method to pass these values
    if (!state) {
      return NextResponse.json({ error: "State parameter is missing" }, { status: 400 })
    }

    let clientId, clientSecret
    try {
      const stateObj = JSON.parse(atob(state))
      clientId = stateObj.clientId
      clientSecret = stateObj.clientSecret
    } catch (error) {
      return NextResponse.json({ error: "Invalid state parameter" }, { status: 400 })
    }

    // Exchange the code for tokens
    const tokens = await exchangeCodeForTokens(code, clientId, clientSecret)

    // Return the tokens
    return NextResponse.json({
      success: true,
      tokens,
    })
  } catch (error) {
    console.error("Error in OAuth callback:", error)
    return NextResponse.json({ error: "Failed to process OAuth callback" }, { status: 500 })
  }
}
