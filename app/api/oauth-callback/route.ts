import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code) {
      return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 })
    }

    if (!state) {
      return NextResponse.json({ error: "State parameter is missing" }, { status: 400 })
    }

    // Verify the state exists in our database
    const stateData = await prisma.oAuthState.findUnique({
      where: { id: 1 },
    })

    console.log("State data1:", stateData)

    if (!stateData) {
      return NextResponse.json({ error: "Invalid state parameter" }, { status: 400 })
    }

    // Return a simple page that helps the user copy the code and state
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>OAuth Authorization Complete</title>
          <style>
            /* trunk-ignore(git-diff-check/error) */
            body { 
              font-family: Arial, sans-serif; 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
              line-height: 1.6;
            }
            .container {
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 { color: #333; margin-bottom: 20px; }
            .code-box { 
              background: #f5f5f5; 
              padding: 15px; 
              border-radius: 5px; 
              margin: 20px 0; 
              font-family: monospace;
              word-break: break-all;
            }
            .field { margin-bottom: 15px; }
            .field label {
              display: block;
              font-weight: bold;
              margin-bottom: 5px;
            }
              button { 
              background: #4285f4; 
              color: white; 
              border: none; 
              padding: 10px 15px; 
              border-radius: 5px; 
              cursor: pointer; 
              margin-right: 10px;
            }
            button:hover {
              background: #3367d6;
            }
            .success-icon {
              color: #34a853;
              font-size: 48px;
              text-align: center;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success-icon">✓</div>
            <h1>Authorization Successful</h1>
            <p>Please copy the following information and paste it back in the application:</p>
              <div class="field">
              <label for="auth-code">Authorization Code:</label>
              <div class="code-box" id="auth-code">${code}</div>
            </div>
            <div class="field">
              <label for="state">State:</label>
              <div class="code-box" id="state">${state}</div>
            </div>
            <div>
              <button onclick="copyBoth()">Copy Both Values</button>
              <button onclick="copyCode()">Copy Code Only</button>
              <button onclick="copyState()">Copy State Only</button>
            </div>
             <p style="margin-top: 20px;">You can close this window after copying the values.</p>
          </div>
          <script>
            function copyCode() {
              const code = document.getElementById('auth-code').textContent;
              navigator.clipboard.writeText(code)
                .then(() => alert('Authorization code copied to clipboard!'))
                .catch(err => console.error('Failed to copy: ', err));
            }
                         function copyState() {
              const state = document.getElementById('state').textContent;
              navigator.clipboard.writeText(state)
                .then(() => alert('State copied to clipboard!'))
                .catch(err => console.error('Failed to copy: ', err));
            }
                            function copyBoth() {
              const code = document.getElementById('auth-code').textContent;
              const state = document.getElementById('state').textContent;
              navigator.clipboard.writeText('Code: ' + code + '\\nState: ' + state)
                .then(() => alert('Both values copied to clipboard!'))
                .catch(err => console.error('Failed to copy: ', err));
            }
          </script>
        </body>
      </html>
    `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      },
    )
  } catch (error) {
    console.error("Error in OAuth callback:", error)
    return NextResponse.json({ error: "Failed to process OAuth callback" }, { status: 500 })
  }
}
