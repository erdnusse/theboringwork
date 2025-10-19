'use client';
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function Footer() {
  const currentYear = new Date().getFullYear();


  const { t, lang } = useTranslation();
  const siteMap = [
    { name: t("home_title"), href: `/${lang}` },
    { name: t("services"), href: `/${lang}/services` },
    { name: t("about"), href: `/${lang}/about` },
    { name: t("contact"), href: `/${lang}/contact` },
  ];

  const legalLinks = [
    { name: t("privacy_policy"), href: `/${lang}/privacy` },
    { name: t("cookies_policy"), href: `/${lang}/cookies` },
    { name: t("terms_of_service"), href: `/${lang}/terms` },
  ];

  const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61577336057767", icon: Facebook },
    { name: "Instagram", href: "https://www.instagram.com/the_boringwork/#", icon: Instagram },
    { name: "LinkedIn", href: "https://pt.linkedin.com/company/the-boring-work?trk=public_profile_topcard-current-company ", icon: Linkedin },
  ];

  return (
    <footer className="bg-[#35393c] border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#f4864f]">{t("company_name")}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer_tagline")}
            </p>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{t("footer_location")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{t("footer_phone")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{t("footer_email")}</span>
              </div>
            </div>
          </div>

          {/* Site map */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#f4864f] ">{t("footer_sitemap")}</h4>
            <nav className="flex flex-col space-y-2">
              {siteMap.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-[#f4864f] transition-smooth"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#f4864f]">{t("footer_legal")}</h4>
            <nav className="flex flex-col space-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-[#f4864f] transition-smooth"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#f4864f]">{t("footer_follow_us")}</h4>
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

        {/* Bottom bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} {t("company_name")}. {t("footer_rights")}
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{t("footer_made_with_love")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}