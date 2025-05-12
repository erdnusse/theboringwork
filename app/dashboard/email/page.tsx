'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const EmailSettingsPage = () => {
  const [gmailAddress, setGmailAddress] = useState('');

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Email Settings</CardTitle>
          <CardDescription>Configure your email settings to receive notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="gmailAddress">Your Gmail Address</Label>
              <Input
                id="gmailAddress"
                type="email"
                placeholder="your.email@gmail.com"
                value={gmailAddress}
                onChange={(e) => setGmailAddress(e.target.value)}
              />
            </div>

            <Separator />

            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">Configuring Your Gmail Account</h3>
              <p className="text-sm text-muted-foreground">
                To allow external applications to send emails through your Gmail account, you need to adjust some settings in your Google account.
              </p>

              <div className="grid gap-2 mt-4">
                <h4 className="font-medium">Step 1: Enable POP/IMAP Access (if not already enabled)</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Go to your Gmail settings (gear icon in the top right).</li>
                  <li>Click "See all settings".</li>
                  <li>Go to the "Forwarding and POP/IMAP" tab.</li>
                  <li>Enable POP and/or IMAP access (IMAP is generally recommended).</li>
                  <li>Save Changes.</li>
                </ul>
              </div>

              <div className="grid gap-2 mt-4">
                <h4 className="font-medium">Step 2: Generate an App Password (Recommended for Security)</h4>
                <p className="text-sm text-muted-foreground">
                  Using an App Password instead of your main Gmail password is more secure, especially if you have 2-Factor Authentication enabled.
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Go to your <a href="https://myaccount.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Account</a> settings.</li>
                  <li>Click on "Security" in the left navigation panel.</li>
                  <li>Under "Signing in to Google", click on "App passwords". (You might need to sign in again).</li>
                  <li>Select the app and device for which you want to generate the App Password (e.g., "Mail" and "Other (Custom Name)" - you can name it something like "My App").</li>
                  <li>Click "Generate".</li>
                  <li>A 16-character password will be generated. Copy this password. This password will be used instead of your regular Gmail password in external applications.</li>
                  <li>Click "Done".</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Important:</strong> You will only see the App Password once. If you lose it, you'll need to generate a new one.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSettingsPage;