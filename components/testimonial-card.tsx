import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image: string
  accentColor?: "primary" | "secondary" | "teal" | "purple" | "amber" | "coral"
}

export function TestimonialCard({ quote, author, role, image, accentColor = "primary" }: TestimonialCardProps) {
  const getAccentColorClasses = () => {
    switch (accentColor) {
      case "primary":
        return "bg-primary-50 text-primary-600 border-primary-100"
      case "secondary":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "teal":
        return "bg-accent-teal/10 text-accent-teal border-accent-teal/20"
      case "purple":
        return "bg-accent-purple/10 text-accent-purple border-accent-purple/20"
      case "amber":
        return "bg-accent-amber/10 text-accent-amber border-accent-amber/20"
      case "coral":
        return "bg-accent-coral/10 text-accent-coral border-accent-coral/20"
      default:
        return "bg-primary-50 text-primary-600 border-primary-100"
    }
  }

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-lg border ${getAccentColorClasses()} card-hover-effect`}
    >
      <CardHeader className="p-6 pb-0">
        <div className="flex justify-center">
          <QuoteIcon
            className={`h-8 w-8 ${accentColor === "primary" ? "text-primary-300" : accentColor === "secondary" ? "text-secondary/30" : `text-accent-${accentColor}/30`}`}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 text-center">
        <p className="italic mb-6 text-slate-600">{quote}</p>
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-white shadow-sm">
            <img src={image || "/placeholder.svg"} alt={author} className="object-cover w-full h-full" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-gray-800">{author}</div>
            <div className="text-sm text-slate-500">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
