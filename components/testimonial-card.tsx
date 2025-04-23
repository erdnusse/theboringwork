import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image: string
}

export function TestimonialCard({ quote, author, role, image }: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-6 pb-0">
        <div className="flex justify-center">
          <QuoteIcon className="h-8 w-8 text-primary/20" />
        </div>
      </CardHeader>
      <CardContent className="p-6 text-center">
        <p className="italic mb-6">{quote}</p>
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
            <img src={image || "/placeholder.svg"} alt={author} className="object-cover w-full h-full" />
          </div>
          <div className="text-left">
            <div className="font-semibold">{author}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
