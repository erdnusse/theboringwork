"use client";

import ContactForm from "@/components/contact-form"
import ModernSpinner from "@/components/loading-spinner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";


export default function ContactPage() {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  
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
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t("contact_page_title")}</h1>
          <p className="mt-4 text-muted-foreground">
            {t("contact_page_description")}
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-3">
              <Phone className="h-8 w-8 text-[#f4864f] font-semibold" />
              <div>
                <h3 className="h-8 w-8 text-[#f4864f] font-semibold">{t("contact_page_phone_label")}</h3>
                <p className="mt-1 text-muted-foreground">{t("contact_page_phone_value")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-8 w-8 text-[#f4864f] font-semibold" />
              <div>
                <h3 className="h-8 w-8 text-[#f4864f] font-semibold">{t("contact_page_email_label")}</h3>
                <p className="mt-1 text-muted-foreground">{t("contact_page_email_value")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
             <MapPin className="h-8 w-8 text-[#f4864f] font-semibold"  />
              <div>
                <h4 className="font-semibold text-[#f4864f]">{t("contact_page_office_label")}</h4>
                <p className="mt-1 text-muted-foreground">
                  {t("contact_page_office_value")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
           
            {/* Social media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#f4864f]">{t("contact_page_follow_us")}</h4>
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
            <h2 className="text-xl font-semibold">{t("contact_page_form_title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("contact_page_form_description")}</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
