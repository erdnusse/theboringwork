import Link from "next/link"
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { TestimonialCard } from "@/components/testimonial-card"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20 md:py-32">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Transform Your Business With Strategic Consulting
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  We help companies unlock their potential through innovative strategies, operational excellence, and
                  digital transformation.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/contact">
                  <Button size="lg" className="gap-1.5">
                    Schedule a Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline">
                    Explore Our Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-full shadow-xl border-8 border-background">
                <img
                  src="/strategic-planning-session.png"
                  alt="Professional consultant"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Our Services
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Expert Solutions for Your Business</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              We offer comprehensive consulting services tailored to meet your company's unique challenges and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Service 1 */}
            <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 text-primary">
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
                  className="h-10 w-10"
                >
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                  <path d="M13 5v14"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Strategic Planning</h3>
              <p className="mb-4 text-muted-foreground">
                Develop comprehensive business strategies aligned with your vision and market opportunities.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Market Analysis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Competitive Positioning</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Growth Planning</span>
                </li>
              </ul>
              <Link href="/services/strategic-planning" className="inline-flex items-center text-primary">
                Learn More <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 text-primary">
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
                  className="h-10 w-10"
                >
                  <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"></path>
                  <path d="M15 7h6v6"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Operational Excellence</h3>
              <p className="mb-4 text-muted-foreground">
                Optimize your business processes to improve efficiency, quality, and customer satisfaction.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Process Optimization</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Quality Management</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Cost Reduction</span>
                </li>
              </ul>
              <Link href="/services/operational-excellence" className="inline-flex items-center text-primary">
                Learn More <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-lg">
              <div className="mb-4 text-primary">
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
                  className="h-10 w-10"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M7 7h10"></path>
                  <path d="M7 12h10"></path>
                  <path d="M7 17h10"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Digital Transformation</h3>
              <p className="mb-4 text-muted-foreground">
                Leverage technology to transform your business models and create new opportunities for growth.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Technology Assessment</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Digital Strategy</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Implementation Support</span>
                </li>
              </ul>
              <Link href="/services/digital-transformation" className="inline-flex items-center text-primary">
                Learn More <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-video overflow-hidden rounded-xl shadow-xl">
                <img
                  src="/collaborative-strategy-session.png"
                  alt="Consulting team meeting"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground w-fit">
                About Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Experienced Consultants Dedicated to Your Success
              </h2>
              <p className="text-muted-foreground">
                With over 15 years of experience working with businesses across industries, our team of expert
                consultants brings deep knowledge and practical insights to every engagement.
              </p>
              <p className="text-muted-foreground">
                We believe in building long-term partnerships with our clients, understanding their unique challenges,
                and delivering tailored solutions that drive measurable results.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">150+</span>
                  <span className="text-sm text-muted-foreground">Clients Served</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">95%</span>
                  <span className="text-sm text-muted-foreground">Client Satisfaction</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">12+</span>
                  <span className="text-sm text-muted-foreground">Industries</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">$500M+</span>
                  <span className="text-sm text-muted-foreground">Client Value Created</span>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/about">
                  <Button variant="outline" className="gap-1.5">
                    Learn More About Us
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Clients Say</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Hear from the businesses we've helped transform through our consulting services.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <TestimonialCard
              quote="The strategic planning process led by their team was transformative for our business. We now have a clear roadmap for growth and the tools to execute it effectively."
              author="Sarah Johnson"
              role="CEO, TechInnovate"
              image="/serene-gaze.png"
            />
            <TestimonialCard
              quote="Their operational excellence program helped us reduce costs by 22% while improving customer satisfaction. The ROI on this engagement has been exceptional."
              author="Michael Chen"
              role="COO, Global Manufacturing"
              image="/thoughtful-gaze.png"
            />
            <TestimonialCard
              quote="The digital transformation guidance we received was invaluable. They didn't just recommend technology—they helped us reimagine our entire business model for the digital age."
              author="Elena Rodriguez"
              role="CTO, Financial Services Inc."
              image="/confident-leader.png"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Transform Your Business?</h2>
              <p className="max-w-[600px] md:text-xl">
                Schedule a free consultation with our experts to discuss your business challenges and how we can help
                you overcome them.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="gap-1.5">
                    Schedule Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/case-studies">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/20 hover:bg-primary-foreground/10"
                  >
                    View Case Studies
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-[500px]">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src="/collaborative-growth-session.png"
                    alt="Strategy meeting"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src="/interactive-data-dashboard.png"
                    alt="Data analysis"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src="/collaborative-growth.png"
                    alt="Team collaboration"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src="/interconnected-future.png"
                    alt="Digital transformation"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:h-24 md:px-6">
          <div className="flex items-center gap-2">
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
              className="h-5 w-5 text-primary"
            >
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
            </svg>
            <span className="text-lg font-semibold">StrategyPro Consulting</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <Link href="/terms" className="text-xs md:text-sm text-muted-foreground hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-xs md:text-sm text-muted-foreground hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <div className="text-xs md:text-sm text-muted-foreground">
              © 2023 StrategyPro Consulting. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
