import { ArrowRight, Users, Clock, Zap, Target, CheckCircle, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"
import BaseSection from "@/components/base-section"
import MissionSection from "@/components/mission-statement-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import ContactSection from "@/components/contact-section"


export const metadata = {
  title: "Home | The Boring Work - Consultoria Empresarial",
  description:
    "Fazemos o trabalho chato para que se possa focar no mais importante: a sua empresa. Especialistas em estruturação e crescimento de PMEs.",
    robots: {
    index: true,
    follow: true,
  }
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[--background-primary-color] overflow-hidden">

         {/* Hero Section */}
      <BaseSection/>

       {/* Advantages Section */}
     <MissionSection/>

      {/* Mission Section */}
      <AboutSection/>

     
      {/* Stats Section */}
      <ServicesSection/>

      {/* CTA Section */}
      <ContactSection/>
    </div>
  )
}
