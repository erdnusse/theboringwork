import Link from "next/link"
import { ArrowRight, Building, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PropertyCard } from "@/components/property-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { AgentCard } from "@/components/agent-card"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Building className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EstateElite</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/properties" className="text-sm font-medium hover:underline underline-offset-4">
              Properties
            </Link>
            <Link href="/agents" className="text-sm font-medium hover:underline underline-offset-4">
              Agents
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4 hidden md:block">
              Dashboard
            </Link>
            <Link href="/sign-in">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Find Your Dream Home Today
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover exclusive properties in prime locations. Your perfect home is just a click away.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/properties">
                    <Button size="lg" className="gap-1.5">
                      Browse Properties
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline">
                      Contact an Agent
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-video overflow-hidden rounded-xl shadow-xl">
                  <img
                    src="/sleek-modern-villa.png"
                    alt="Modern luxury home"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Find Your Perfect Property</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Use our advanced search to find properties that match your exact requirements.
                </p>
              </div>
              <div className="w-full max-w-3xl bg-background rounded-xl shadow-lg p-4 md:p-6">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="md:col-span-2">
                    <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-primary">
                      <div className="px-3">
                        <Search className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Location, property type, keywords..."
                        className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                  <div>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="">Property Type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>
                  <div>
                    <Button className="w-full">Search</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Properties</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Explore our handpicked selection of premium properties.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <PropertyCard
                  title="Modern Downtown Apartment"
                  location="123 Main St, Downtown"
                  price="$450,000"
                  beds={2}
                  baths={2}
                  sqft={1200}
                  image="/minimalist-loft.png"
                />
                <PropertyCard
                  title="Luxury Waterfront Villa"
                  location="456 Ocean Dr, Beachside"
                  price="$1,250,000"
                  beds={4}
                  baths={3}
                  sqft={3200}
                  image="/emerald-coast-estate.png"
                />
                <PropertyCard
                  title="Cozy Suburban Home"
                  location="789 Maple Ave, Suburbia"
                  price="$650,000"
                  beds={3}
                  baths={2}
                  sqft={2100}
                  image="/suburban-autumn-evening.png"
                />
                <PropertyCard
                  title="Urban Loft Space"
                  location="101 Artist Way, Arts District"
                  price="$525,000"
                  beds={1}
                  baths={1}
                  sqft={950}
                  image="/exposed-brick-loft.png"
                />
              </div>
              <div className="flex justify-center mt-8">
                <Link href="/properties">
                  <Button variant="outline" size="lg" className="gap-1.5">
                    View All Properties
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Expert Agents</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Meet our team of experienced real estate professionals.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AgentCard
                  name="Sophia Rodriguez"
                  title="Senior Real Estate Agent"
                  image="/placeholder.svg?height=300&width=300&query=professional woman realtor"
                  phone="(555) 123-4567"
                  email="sophia@estateelit.com"
                  listings={24}
                />
                <AgentCard
                  name="Michael Chen"
                  title="Luxury Property Specialist"
                  image="/placeholder.svg?height=300&width=300&query=professional man realtor"
                  phone="(555) 987-6543"
                  email="michael@estateelit.com"
                  listings={18}
                />
                <AgentCard
                  name="Olivia Johnson"
                  title="Commercial Real Estate Expert"
                  image="/placeholder.svg?height=300&width=300&query=professional woman business attire"
                  phone="(555) 456-7890"
                  email="olivia@estateelit.com"
                  listings={31}
                />
              </div>
              <div className="flex justify-center mt-8">
                <Link href="/agents">
                  <Button variant="outline" size="lg" className="gap-1.5">
                    Meet All Agents
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Clients Say</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Hear from our satisfied clients about their experience with EstateElite.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <TestimonialCard
                  quote="EstateElite helped me find my dream home in just two weeks. Their team was professional, responsive, and truly cared about my needs."
                  author="Emma Thompson"
                  role="Homeowner"
                  image="/placeholder.svg?height=100&width=100&query=woman portrait"
                />
                <TestimonialCard
                  quote="As a first-time buyer, I was nervous about the process. The agents at EstateElite guided me every step of the way, making it stress-free."
                  author="David Wilson"
                  role="First-time Buyer"
                  image="/placeholder.svg?height=100&width=100&query=man portrait"
                />
                <TestimonialCard
                  quote="I've worked with many real estate agencies, but EstateElite stands out for their attention to detail and personalized service."
                  author="Sarah Martinez"
                  role="Property Investor"
                  image="/placeholder.svg?height=100&width=100&query=woman professional portrait"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Find Your Dream Home?</h2>
                  <p className="max-w-[600px] md:text-xl">
                    Join thousands of satisfied clients who found their perfect property with EstateElite.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/sign-up">
                    <Button size="lg" variant="secondary" className="gap-1.5">
                      Get Started Today
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary-foreground/20 hover:bg-primary-foreground/10"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-[500px]">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300&query=modern home interior living room"
                      alt="Modern home interior"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300&query=luxury kitchen design"
                      alt="Luxury kitchen"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300&query=modern bathroom design"
                      alt="Modern bathroom"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300&query=home office design"
                      alt="Home office"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:h-24 md:px-6">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">EstateElite</span>
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
            <div className="text-xs md:text-sm text-muted-foreground">© 2023 EstateElite. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
