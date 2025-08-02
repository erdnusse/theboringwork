"use client";
import ContactForm from "@/components/contact-form"
import ModernSpinner from "@/components/loading-spinner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";



export default function ContactSection() {
   const isMobile = useIsMobile();
  
      // Prevent SSR/hydration mismatch: only render image when isMobile is defined
      if (typeof isMobile === "undefined") {
        return (
          <section
            id="home"
            className="bg-[hsl(36,30%,92%)] relative w-full min-h-screen flex items-center justify-center overflow-hidden"
          >
            {/* Centered image absolutely positioned */}
            <div className="w-full h-full z-0 flex items-center justify-center">
              <ModernSpinner />
            </div>
          </section>
        );
      }
  
       const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61577336057767", icon: Facebook },
    { name: "Instagram", href: "https://www.instagram.com/the_boringwork/#", icon: Instagram },
    { name: "LinkedIn", href: "https://pt.linkedin.com/company/the-boring-work?trk=public_profile_topcard-current-company ", icon: Linkedin },

  ];

  return (
    <div className="min-h-screen bg-[#f6ede4] py-10 px-2 md:px-0 flex flex-col items-center">
    <div className="container max-w-5xl py-12 md:py-16">
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Entre em contacto</h1>
          <p className="mt-4 text-muted-foreground">
            Tem dúvidas sobre os nossos serviços ou precisa de ajuda? Preencha o formulário e a nossa equipa entrará em contacto consigo
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-3">
              <Phone className="h-8 w-8 text-[#f4864f] font-semibold" />
              <div>
                <h3 className="font-semibold">Telefone</h3>
                <p className="mt-1 text-muted-foreground">+351912735542</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-8 w-8 text-[#f4864f] font-semibold" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="mt-1 text-muted-foreground">rita@theboringwork.pt</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
             <MapPin className="h-8 w-8 text-[#f4864f] font-semibold"  />
              <div>
                <h4 className="font-semibold text-[#f4864f]">Escritorio</h4>
                <p className="mt-1 text-muted-foreground">
                  Lisboa
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
           
            {/* Social media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#f4864f]">Siga-nos</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-[#f4864f] hover:text-primary-foreground transition-smooth hover:scale-110"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          </div>
        </div>

        <div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Entre em contacto</h2>
            <p className="mt-1 text-sm text-muted-foreground">Responderemos assim que possível.</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
