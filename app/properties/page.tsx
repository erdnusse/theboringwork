import Link from "next/link"
import { ArrowLeft, Building, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PropertyCard } from "@/components/property-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

export default function PropertiesPage() {
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
            <Link href="/properties" className="text-sm font-medium hover:underline underline-offset-4 underline">
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
        <div className="container px-4 py-6 md:px-6 md:py-12">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold md:text-3xl">Properties</h1>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-lg border p-4 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </h3>
                  <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-primary mb-4">
                    <div className="px-3">
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search properties..."
                      className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Property Type</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="house" />
                        <label htmlFor="house" className="text-sm">
                          House
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="apartment" />
                        <label htmlFor="apartment" className="text-sm">
                          Apartment
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="condo" />
                        <label htmlFor="condo" className="text-sm">
                          Condo
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="townhouse" />
                        <label htmlFor="townhouse" className="text-sm">
                          Townhouse
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Price Range</h4>
                    <div className="space-y-4">
                      <Slider defaultValue={[500000]} max={2000000} step={50000} />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">$0</span>
                        <span className="text-sm">$2M+</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Bedrooms</h4>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, "5+"].map((num) => (
                        <Button key={num} variant="outline" size="sm" className="rounded-full min-w-[40px]">
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Bathrooms</h4>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, "4+"].map((num) => (
                        <Button key={num} variant="outline" size="sm" className="rounded-full min-w-[40px]">
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Features</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="pool" />
                        <label htmlFor="pool" className="text-sm">
                          Pool
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="garage" />
                        <label htmlFor="garage" className="text-sm">
                          Garage
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="garden" />
                        <label htmlFor="garden" className="text-sm">
                          Garden
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="aircon" />
                        <label htmlFor="aircon" className="text-sm">
                          Air Conditioning
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-muted-foreground">Showing 12 of 48 properties</div>
                <select className="text-sm border rounded-md h-9 px-3 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <PropertyCard
                  title="Modern Downtown Apartment"
                  location="123 Main St, Downtown"
                  price="$450,000"
                  beds={2}
                  baths={2}
                  sqft={1200}
                  image="/minimalist-loft.png"
                  featured={true}
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
                <PropertyCard
                  title="Family Home with Pool"
                  location="202 Family Rd, Suburbia"
                  price="$780,000"
                  beds={4}
                  baths={3}
                  sqft={2800}
                  image="/placeholder.svg?height=400&width=600&query=family home with pool"
                />
                <PropertyCard
                  title="Mountain View Cabin"
                  location="303 Mountain Pass, Highland"
                  price="$395,000"
                  beds={2}
                  baths={1}
                  sqft={1100}
                  image="/placeholder.svg?height=400&width=600&query=mountain cabin exterior"
                />
                <PropertyCard
                  title="Beachfront Condo"
                  location="404 Beach Blvd, Oceanside"
                  price="$575,000"
                  beds={2}
                  baths={2}
                  sqft={1350}
                  image="/placeholder.svg?height=400&width=600&query=beachfront condo view"
                />
                <PropertyCard
                  title="Historic Townhouse"
                  location="505 Heritage St, Old Town"
                  price="$825,000"
                  beds={3}
                  baths={2.5}
                  sqft={2200}
                  image="/placeholder.svg?height=400&width=600&query=historic townhouse exterior"
                />
                <PropertyCard
                  title="Penthouse Suite"
                  location="606 Skyline Ave, Downtown"
                  price="$1,750,000"
                  beds={3}
                  baths={3}
                  sqft={2900}
                  image="/placeholder.svg?height=400&width=600&query=luxury penthouse interior"
                />
              </div>
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" disabled>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    4
                  </Button>
                  <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
