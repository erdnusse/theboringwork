"use client"

import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

export default function BaseSection() {
  const isMobile = useIsMobile()

  const imageSrc = isMobile ? "/main-no-logo-mobile.png" : "/main-no-logo.png"

  return (
    <section 
      id="home" 
      className="bg-[hsl(36,30%,92%)] relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Centered image absolutely positioned */}
      <div className="w-full h-full z-0 flex items-center justify-center">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-20, 0] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative"
        >
          <img
            src={imageSrc}
            alt="Main background"
            className="max-w-full max-h-full mx-auto my-auto object-center"
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  );
}