import ContactForm from "@/components/contact-form"

export const metadata = {
  title: "Contact Us | StrategyPro",
  description: "Get in touch with our team for any inquiries or support.",
  robots: {
    index: true,
    follow: true,
  }
}

export default function ContactPage() {
  return (
    <div className="container max-w-5xl py-12 md:py-16">
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Get in touch</h1>
          <p className="mt-4 text-muted-foreground">
            Have questions about our services or need assistance? Fill out the form and our team will get back to you
            shortly.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary-50 p-2 text-primary-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="mt-1 text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary-50 p-2 text-primary-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="mt-1 text-muted-foreground">contact@strategypro.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary-50 p-2 text-primary-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Office</h3>
                <p className="mt-1 text-muted-foreground">
                  123 Business Avenue
                  <br />
                  Suite 500
                  <br />
                  San Francisco, CA 94107
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold">Follow Us</h3>
            <div className="mt-3 flex gap-4">
              <a
                href="#"
                className="rounded-full bg-primary-50 p-2 text-primary-600 hover:bg-primary-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="rounded-full bg-primary-50 p-2 text-primary-600 hover:bg-primary-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="rounded-full bg-primary-50 p-2 text-primary-600 hover:bg-primary-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Send us a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">We'll get back to you as soon as possible.</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
