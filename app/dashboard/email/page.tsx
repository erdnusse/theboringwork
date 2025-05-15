"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { saveEmailOAuthSettings, completeOAuthSetup, testEmailConfiguration } from "@/actions/email-actions"
import { AlertCircle, CheckCircle, HelpCircle, Info, Key, Lock, Mail, Settings, TestTube } from "lucide-react"

// Form schema for OAuth settings
const oauthSettingsSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  clientId: z.string().min(1, { message: "Client ID is required" }),
  clientSecret: z.string().min(1, { message: "Client Secret is required" }),
  authCode: z.string().optional(),
  state: z.string().optional(),
  testEmail: z.string().email({ message: "Please enter a valid test email address" }).optional(),
})

type OAuthSettingsFormValues = z.infer<typeof oauthSettingsSchema>

export default function EmailSettingsPage() {
  const [activeTab, setActiveTab] = useState("settings")
  const [isSaving, setIsSaving] = useState(false)
  const [isAuthorizing, setIsAuthorizing] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [authUrl, setAuthUrl] = useState<string | null>(null)
  const [setupStep, setSetupStep] = useState<"initial" | "authorize" | "complete">("initial")

  // Default values for the form
  const defaultValues: Partial<OAuthSettingsFormValues> = {
    email: "",
    clientId: "",
    clientSecret: "",
    authCode: undefined,
    state: undefined,
    testEmail: undefined,
  }

  const form = useForm<OAuthSettingsFormValues>({
    resolver: zodResolver(oauthSettingsSchema),
    defaultValues,
  })

  // Handle initial OAuth setup
  const handleInitialSetup = async (data: OAuthSettingsFormValues) => {
    setIsSaving(true)
    setFeedback(null)

    try {
      const formData = new FormData()
      formData.append("email", data.email)
      formData.append("clientId", data.clientId)
      formData.append("clientSecret", data.clientSecret)

      const result = await saveEmailOAuthSettings(formData)

      console.log("OAuth setup result:", result) // Add debugging

      if (result.success && result.authUrl) {
        setAuthUrl(result.authUrl)
        setSetupStep("authorize")

        // Show a message to help users if popup is blocked
        setFeedback({
          type: "success",
          message: "Click 'Authorize with Google' to continue. If nothing happens, check for popup blockers.",
        })
      } else {
        setFeedback({
          type: "error",
          message: result.message || "Failed to generate authorization URL",
        })
      }
    } catch (error) {
      console.error("OAuth setup error:", error)
      setFeedback({
        type: "error",
        message: "An unexpected error occurred while setting up OAuth",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle OAuth authorization completion
  const handleCompleteSetup = async (data: OAuthSettingsFormValues) => {
    setIsAuthorizing(true)
    setFeedback(null)

    try {
      const formData = new FormData()
      formData.append("authCode", data.authCode || "")
      formData.append("state", data.state || "")

      const result = await completeOAuthSetup(formData)

      setFeedback({
        type: result.success ? "success" : "error",
        message: result.message,
      })

      if (result.success) {
        setSetupStep("complete")
        setActiveTab("test")
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: "An unexpected error occurred while completing OAuth setup",
      })
    } finally {
      setIsAuthorizing(false)
    }
  }

  // Handle test email submission
  const handleTestEmail = async () => {
    const isValid = await form.trigger("testEmail")

    if (!isValid || !form.getValues("testEmail")) {
      form.setError("testEmail", {
        type: "manual",
        message: "Please enter a valid test email address",
      })
      return
    }

    setIsTesting(true)
    setFeedback(null)

    try {
      const formData = new FormData()
      formData.append("testEmail", form.getValues("testEmail") || "")

      const result = await testEmailConfiguration(formData)

      setFeedback({
        type: result.success ? "success" : "error",
        message: result.message,
      })
    } catch (error) {
      setFeedback({
        type: "error",
        message: "An unexpected error occurred while testing email",
      })
    } finally {
      setIsTesting(false)
    }
  }

  // Parse URL parameters on page load
  useState(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get("code")
      const state = urlParams.get("state")

      if (code && state) {
        form.setValue("authCode", code)
        form.setValue("state", state)
        setSetupStep("authorize")

        // Optional: Clear the URL parameters
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    }
  })

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Email Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure your Gmail account with OAuth 2.0 for secure email sending
        </p>
      </div>

      {feedback && (
        <Alert variant={feedback.type === "success" ? "default" : "destructive"} className="mb-6">
          {feedback.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>{feedback.type === "success" ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>{feedback.message}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            OAuth Setup
          </TabsTrigger>
          <TabsTrigger value="test">
            <TestTube className="mr-2 h-4 w-4" />
            Test Email
          </TabsTrigger>
          <TabsTrigger value="help">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Gmail OAuth 2.0 Configuration</CardTitle>
                <CardDescription>Set up secure authentication with your Gmail account using OAuth 2.0</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {setupStep === "initial" && (
                  <form onSubmit={form.handleSubmit(handleInitialSetup)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gmail Address</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@gmail.com" {...field} />
                          </FormControl>
                          <FormDescription>The Gmail account you want to send emails from</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator className="my-4" />

                    <div className="rounded-md bg-muted p-4 mb-4">
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <Key className="h-4 w-4 mr-2" />
                        Google Cloud Project Credentials
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        You need to create a project in Google Cloud Console and set up OAuth credentials. See the Help
                        tab for detailed instructions.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="clientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Your OAuth Client ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="clientSecret"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client Secret</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Your OAuth Client Secret" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isSaving} className="mt-2">
                      {isSaving ? "Processing..." : "Continue to Authorization"}
                    </Button>
                  </form>
                )}

                {setupStep === "authorize" && (
                  <form onSubmit={form.handleSubmit(handleCompleteSetup)} className="space-y-4">
                    <Alert className="mb-4">
                      <Info className="h-4 w-4" />
                      <AlertTitle>Authorization Required</AlertTitle>
                      <AlertDescription>
                        {form.getValues("authCode") && form.getValues("state")
                          ? "We detected authorization parameters in the URL. Please complete the setup below."
                          : "Click the button below to authorize access to your Gmail account. You'll be redirected to Google's authorization page."}
                      </AlertDescription>
                    </Alert>

                    {!form.getValues("authCode") && (
                      <div className="flex flex-col items-center justify-center p-4 border rounded-md">
                        <Button
                          type="button"
                          variant="outline"
                          className="mb-4"
                          onClick={() => {
                            if (authUrl) {
                              // Log the URL for debugging
                              console.log("Opening authorization URL:", authUrl)

                              // Try to open the window
                              const authWindow = window.open(authUrl, "_blank", "width=800,height=700")

                              // Check if the window opened successfully
                              if (!authWindow) {
                                setFeedback({
                                  type: "error",
                                  message: "Popup blocked! Please allow popups for this site and try again.",
                                })
                              } else {
                                setFeedback({
                                  type: "success",
                                  message:
                                    "Authorization window opened. Please complete the Google authorization process.",
                                })
                              }
                            } else {
                              setFeedback({
                                type: "error",
                                message: "Authorization URL is missing. Please try again.",
                              })
                            }
                          }}
                        >
                          <Lock className="mr-2 h-4 w-4" />
                          Authorize with Google
                        </Button>

                        <p className="text-sm text-muted-foreground mb-4 text-center">
                          After authorization, you'll be redirected to a page with an authorization code and state
                          parameter. Copy and paste those values below.
                        </p>
                      </div>
                    )}

                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="authCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Authorization Code</FormLabel>
                            <FormControl>
                              <Input placeholder="Paste the authorization code here" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State Parameter</FormLabel>
                            <FormControl>
                              <Input placeholder="Paste the state parameter here" {...field} />
                            </FormControl>
                            <FormDescription>This is required for security verification</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {authUrl && !form.getValues("authCode") && (
                      <div className="mt-2 text-center">
                        <p className="text-sm text-muted-foreground mb-2">If the button doesn't work, you can also:</p>
                        <a
                          href={authUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Open Authorization Page Directly
                        </a>
                      </div>
                    )}

                    <div className="flex justify-between mt-4">
                      <Button type="button" variant="outline" onClick={() => setSetupStep("initial")}>
                        Back
                      </Button>
                      <Button type="submit" disabled={isAuthorizing}>
                        {isAuthorizing ? "Completing Setup..." : "Complete Setup"}
                      </Button>
                    </div>
                  </form>
                )}

                {setupStep === "complete" && (
                  <div className="space-y-4">
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>Setup Complete</AlertTitle>
                      <AlertDescription>
                        Your Gmail account has been successfully configured with OAuth 2.0. You can now send emails
                        securely.
                      </AlertDescription>
                    </Alert>

                    <div className="flex justify-center">
                      <Button onClick={() => setActiveTab("test")} className="mt-2">
                        <TestTube className="mr-2 h-4 w-4" />
                        Test Your Configuration
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="test">
            <Card>
              <CardHeader>
                <CardTitle>Test Email Configuration</CardTitle>
                <CardDescription>Send a test email to verify your configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Before testing</AlertTitle>
                  <AlertDescription>
                    Make sure you have completed the OAuth setup first. The test will use your current configuration.
                  </AlertDescription>
                </Alert>

                <FormField
                  control={form.control}
                  name="testEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Test Recipient Email</FormLabel>
                      <FormControl>
                        <Input placeholder="recipient@example.com" {...field} />
                      </FormControl>
                      <FormDescription>Enter an email address to receive the test email</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="button" onClick={handleTestEmail} disabled={isTesting} className="flex items-center">
                  {isTesting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Test Email
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Form>

        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Gmail OAuth 2.0 Setup Guide</CardTitle>
              <CardDescription>Learn how to set up OAuth 2.0 for your Gmail account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Setting up OAuth 2.0 for Gmail</h3>

                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">Step 1: Create a Google Cloud Project</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>
                      Go to the{" "}
                      <a
                        href="https://console.cloud.google.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google Cloud Console
                      </a>
                    </li>
                    <li>Create a new project or select an existing one</li>
                    <li>Give your project a name (e.g., "Real Estate App")</li>
                    <li>Click "Create"</li>
                  </ol>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">Step 2: Enable the Gmail API</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>In your Google Cloud project, go to "APIs & Services" &gt; "Library"</li>
                    <li>Search for "Gmail API"</li>
                    <li>Click on "Gmail API" and then click "Enable"</li>
                  </ol>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">Step 3: Configure OAuth Consent Screen</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Go to "APIs & Services" &gt; "OAuth consent screen"</li>
                    <li>Select "External" user type (unless you have a Google Workspace)</li>
                    <li>
                      Fill in the required information:
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li>App name</li>
                        <li>User support email</li>
                        <li>Developer contact information</li>
                      </ul>
                    </li>
                    <li>Click "Save and Continue"</li>
                    <li>
                      Add the following scopes:
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li>https://mail.google.com/</li>
                        <li>https://www.googleapis.com/auth/gmail.send</li>
                      </ul>
                    </li>
                    <li>Click "Save and Continue"</li>
                    <li>Add test users (including your Gmail address)</li>
                    <li>Click "Save and Continue"</li>
                  </ol>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">Step 4: Create OAuth Credentials</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Go to "APIs & Services" &gt; "Credentials"</li>
                    <li>Click "Create Credentials" &gt; "OAuth client ID"</li>
                    <li>Select "Web application" as the application type</li>
                    <li>Give your client a name</li>
                    <li>
                      Add authorized redirect URIs:
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li>https://your-domain.com/api/oauth-callback</li>
                        <li>For local testing: http://localhost:3000/api/oauth-callback</li>
                      </ul>
                    </li>
                    <li>Click "Create"</li>
                    <li>Note your Client ID and Client Secret</li>
                  </ol>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">Step 5: Enter Credentials in This App</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Enter your Gmail address</li>
                    <li>Enter the Client ID and Client Secret from step 4</li>
                    <li>Click "Continue to Authorization"</li>
                    <li>Follow the authorization process</li>
                    <li>Copy the authorization code and state parameter and paste them back in this app</li>
                  </ol>
                </div>
              </div>

              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important Security Note</AlertTitle>
                <AlertDescription>
                  OAuth 2.0 is more secure than using app passwords. Your credentials are never stored in plain text,
                  and you can revoke access at any time from your Google Account.
                </AlertDescription>
              </Alert>

              <div className="mt-4">
                <h3 className="text-lg font-medium">Additional Resources</h3>
                <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                  <li>
                    <a
                      href="https://developers.google.com/gmail/api/auth/about-auth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Gmail API: Authentication and Authorization
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://developers.google.com/identity/protocols/oauth2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google OAuth 2.0 Documentation
                    </a>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
