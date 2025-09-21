"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import ModernSpinner from "./loading-spinner";

export default function BaseSection() {
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

  const imageSrc = isMobile ? "/mobile-last.png" : "/main-no-logo.png";

  console.log("Rendering BaseSection, isMobile:", isMobile);

  return (
    <section
      id="home"
      style={{paddingTop: isMobile ? '4rem' : '0'}}
      className="bg-[hsl(36,30%,92%)] relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Centered image absolutely positioned */}
      <div className="w-full h-full z-0 flex items-center justify-center ">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-20, 0] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative"
        >
          <img
            src={imageSrc}
            alt="Main background"
            className={`mx-auto my-auto object-center
    ${
      isMobile
        ? "h-[700px] "
        : "max-h-full max-w-full"
    }
  `}
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  );
}
