import Link from "next/link"
import { Bath, Bed, MapPin, MoveHorizontal } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PropertyCardProps {
  title: string
  location: string
  price: string
  beds: number
  baths: number
  sqft: number
  image: string
  featured?: boolean
}

export function PropertyCard({
  title,
  location,
  price,
  beds,
  baths,
  sqft,
  image,
  featured = false,
}: PropertyCardProps) {
  return (
    <Link href={`/properties/${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative">
          <div className="aspect-video overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
          </div>
          {featured && (
            <Badge className="absolute top-2 right-2" variant="secondary">
              Featured
            </Badge>
          )}
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {location}
              </div>
            </div>
            <div className="text-lg font-bold text-primary">{price}</div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>
                {beds} {beds === 1 ? "Bed" : "Beds"}
              </span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>
                {baths} {baths === 1 ? "Bath" : "Baths"}
              </span>
            </div>
            <div className="flex items-center">
              <MoveHorizontal className="h-4 w-4 mr-1" />
              <span>{sqft} sqft</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t bg-muted/40">
          <div className="w-full text-center text-sm font-medium text-primary">View Property</div>
        </CardFooter>
      </Card>
    </Link>
  )
}
