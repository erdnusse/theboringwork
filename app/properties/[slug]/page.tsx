import Link from "next/link"
import { ArrowLeft, Bath, Bed, Building, Calendar, Heart, MapPin, MoveHorizontal, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyCard } from "@/components/property-card"
import { SiteHeader } from "@/components/site-header"

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  // This would normally fetch the property data based on the slug
  const property = {
    title: "Modern Downtown Apartment",
    location: "123 Main St, Downtown",
    price: "$450,000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.",
    features: [
      "2 Bedrooms",
      "2 Bathrooms",
      "1200 sq ft",
      "Built in 2018",
      "Central Air Conditioning",
      "In-unit Laundry",
      "Hardwood Floors",
      "Stainless Steel Appliances",
      "Granite Countertops",
      "Walk-in Closet",
      "Balcony",
      "Fitness Center",
      "Rooftop Deck",
    ],
    agent: {
      name: "Sophia Rodriguez",
      title: "Senior Real Estate Agent",
      phone: "(555) 123-4567",
      email: "sophia@estateelit.com",
      image: "/confident-realtor.png",
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          <div className="flex items-center mb-6">
            <Link
              href="/properties"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Properties
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src="/placeholder.svg?height=600&width=1000&query=modern apartment interior living room"
                    alt={property.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="aspect-square overflow-hidden rounded-md">
                    <img
                      src="/placeholder.svg?height=200&width=200&query=modern apartment kitchen"
                      alt="Kitchen"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-md">
                    <img
                      src="/placeholder.svg?height=200&width=200&query=modern apartment bedroom"
                      alt="Bedroom"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-md">
                    <img
                      src="/placeholder.svg?height=200&width=200&query=modern apartment bathroom"
                      alt="Bathroom"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-md relative">
                    <img
                      src="/placeholder.svg?height=200&width=200&query=modern apartment balcony"
                      alt="Balcony"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-medium">+8 more</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold md:text-3xl">{property.title}</h1>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-primary">{property.price}</div>
                  </div>
                  <div className="flex items-center justify-between mt-4 py-4 border-y">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center">
                        <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>2 Beds</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>2 Baths</span>
                      </div>
                      <div className="flex items-center">
                        <MoveHorizontal className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>1200 sqft</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="map">Map</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="py-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Property Description</h3>
                      <p>{property.description}</p>
                      <p>{property.description}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="features" className="py-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Property Features</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        {property.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="map" className="py-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Location</h3>
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Map would be displayed here</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <div>
              <div className="sticky top-24 space-y-6">
                <div className="rounded-lg border overflow-hidden">
                  <div className="p-4 bg-muted/40">
                    <h3 className="font-semibold">Contact Agent</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src={property.agent.image || "/placeholder.svg"}
                          alt={property.agent.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{property.agent.name}</div>
                        <div className="text-sm text-muted-foreground">{property.agent.title}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="first-name" className="text-sm font-medium">
                            First Name
                          </label>
                          <input id="first-name" className="w-full h-10 px-3 rounded-md border" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="last-name" className="text-sm font-medium">
                            Last Name
                          </label>
                          <input id="last-name" className="w-full h-10 px-3 rounded-md border" placeholder="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full h-10 px-3 rounded-md border"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          className="w-full h-10 px-3 rounded-md border"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <textarea
                          id="message"
                          className="w-full h-24 px-3 py-2 rounded-md border resize-none"
                          placeholder="I'm interested in this property..."
                          defaultValue={`I'm interested in ${property.title} at ${property.location}.`}
                        ></textarea>
                      </div>
                      <Button className="w-full">Send Message</Button>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border overflow-hidden">
                  <div className="p-4 bg-muted/40">
                    <h3 className="font-semibold">Schedule a Viewing</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Select a date and time to view this property</span>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="date" className="text-sm font-medium">
                          Date
                        </label>
                        <input id="date" type="date" className="w-full h-10 px-3 rounded-md border" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="time" className="text-sm font-medium">
                          Time
                        </label>
                        <select id="time" className="w-full h-10 px-3 rounded-md border">
                          <option>9:00 AM</option>
                          <option>10:00 AM</option>
                          <option>11:00 AM</option>
                          <option>12:00 PM</option>
                          <option>1:00 PM</option>
                          <option>2:00 PM</option>
                          <option>3:00 PM</option>
                          <option>4:00 PM</option>
                          <option>5:00 PM</option>
                        </select>
                      </div>
                      <Button className="w-full">Schedule Viewing</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
