"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

export default function BaseSection() {

  const isMobile = useIsMobile()
  
    const imageSrc = isMobile ? "/main-no-logo-mobile.png" : "/main-no-logo.png"

  return (
    <section 
      id="home" 
      className="bg-[hsl(36,30%,92%)] relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image absolutely positioned with proper z-index */}
      <div className="absolute inset-0 w-full h-full z-0">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-20, 0] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          <img
            src={imageSrc}
            alt="Hero background"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
      </div>

   
    </section>
  );
}