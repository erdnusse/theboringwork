"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

import ContactForm from "./contact-form";
import ModernSpinner from "./loading-spinner";
import { useTranslation } from "@/hooks/use-translation";

export default function ContactSection() {
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
      
  return (
    <section className="relative min-h-screen bg-[#f4864f] overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 relative">
           

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-2 h-40 lg:h-40 flex items-center relative z-10"
            >
              <Image
                src="/logo-contactos.png"
                alt="Logo boring work"
                width={400}
                height={400}
                className="object-contain"
              />
            </motion.div>

            {/* Subtitle */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#36393b] text-2xl lg:text-3xl xl:text-7xl font-medium leading-tight relative z-10"
            >
              {t("contact_subtitle")}
            </motion.h3>

             {/* Right Visual Element (now absolutely positioned above subtitle, z-0) */}
             {!isMobile ? (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex items-center gap-6 absolute top-44 left-60 z-0"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  rotate: 2,
                  transition: { duration: 0.1 },
                }}
                className="relative w-full h-full mx-auto"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <Image
                    src="/airplane-transparent-2.png"
                    alt="airplane placeholder"
                    width={120}
                    height={120}
                    className="object-contain w-80 h-80"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
             ) : null}
          </div>

          {/* Right: Contact Form */}
          <div className="mt-4 space-y-6 bg-[#f6ede6] rounded-lg p-6 shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}