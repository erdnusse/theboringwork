import Link from "next/link"
import { Mail, Phone, Home } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AgentCardProps {
  name: string
  title: string
  image: string
  phone: string
  email: string
  listings: number
}

export function AgentCard({ name, title, image, phone, email, listings }: AgentCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={name} className="object-cover w-full h-full" />
      </div>
      <CardHeader className="p-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-muted-foreground text-sm">{title}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center text-sm">
          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{email}</span>
        </div>
        <div className="flex items-center text-sm">
          <Home className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{listings} Active Listings</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Link href={`/agents/${name.toLowerCase().replace(/\s+/g, "-")}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
