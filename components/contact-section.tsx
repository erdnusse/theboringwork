"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="relative min-h-screen bg-[#f4864f] overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-2"
            >
              <Image
                src="/logo-contactos.png"
                alt="Logo boring work"
                width={800}
                height={800}
                className="object-cover w-full h-auto"
              />
            </motion.div>

            {/* Subtitle */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#36393b] text-2xl lg:text-3xl xl:text-7xl font-medium leading-tight"
            >
              Vamos falar sobre o seu projeto?
            </motion.h3>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl max-w-md"
            >
              <h4 className="text-gray-900 text-xl lg:text-2xl font-bold text-center tracking-wide">
                FICHA DE CONTACTOS E<br />
                CONTACTOS
              </h4>
            </motion.div>
          </div>

          {/* Right Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              whileHover={{
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.3 },
              }}
              className="relative w-full h-full mx-auto cursor-pointer"
            >
              {/* Paper Airplane Base */}
              <div className="relative">
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
                width={800}
                height={800}
                className="object-cover w-full h-auto"
              />    
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
