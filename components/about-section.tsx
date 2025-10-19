"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslation } from "@/hooks/use-translation";

export default function AboutSection() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen bg-[#5344b4] overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-[#8dbad8] rounded-3xl p-8 lg:p-12 shadow-2xl backdrop-blur-sm">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white text-lg font-medium mb-4 tracking-wide"
              >
                {t("about_heading")}
              </motion.h3>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 b bg-clip-text  leading-tight text-[#dff51e]"
              >
                {t("about_title_line1")}
                <br />
                {t("about_title_line2")}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-white text-lg lg:text-xl leading-relaxed opacity-90"
              >
                {t("about_description")}
              </motion.p>
            </div>
          </motion.div>

          {/* Image/Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Placeholder for main image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="relative z-20"
              >
                <div className="w-full h-2/3 rounded-2xl  flex items-center justify-center">
                  <Image
                    src="/hand-peace.png"
                    alt="Hand gesture placeholder"
                    width={600}
                    height={800}
                    className="object-contain "
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
