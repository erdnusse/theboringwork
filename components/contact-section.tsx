"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
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
            <div className="max-w-md">
  <div className="block group">
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -5,
      }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl p-8 lg:p-10 shadow-xl transition-all duration-500 hover:shadow-2xl border border-white/20 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Floating Icons */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Mail className="w-8 h-8 text-[#f4864f]" />
        </motion.div>
      </div>
      <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <motion.div
          animate={{
            rotate: [0, -10, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <MessageCircle className="w-6 h-6 text-[#f4864f]" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-4">
        {/* WhatsApp row */}
        <div className="flex justify-center mb-4">
          <a
            href="https://wa.me/351912735542"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
            title="Contactar via WhatsApp"
            onClick={e => e.stopPropagation()} // Prevents card click
          >
            {/* WhatsApp SVG icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: "#fff" }}
            >
              <path
                fill="#25D366"
                d="M12 2C6.477 2 2 6.477 2 12c0 1.989.583 3.837 1.583 5.393L2 22l4.707-1.561A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
              />
              <path
                fill="#fff"
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.369.71.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"
              />
            </svg>
            <span className="text-white font-bold text-lg">Entre em contacto</span>
          </a>
        </div>

        {/* Email and rest of card links to contact page */}
        <Link href="/contact" className="block group" tabIndex={-1}>
          <h4 className="text-gray-900 text-xl lg:text-2xl font-bold tracking-wide leading-tight">
            info@theboringwork.pt
          </h4>
          <p className="text-gray-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Clique para entrar em contacto
          </p>
          {/* Arrow Icon */}
          <div className="flex justify-center pt-2">
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              className="flex items-center text-[#f4864f] opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </div>
        </Link>
      </div>

      {/* Subtle Border Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#f4864f]/20 via-transparent to-[#f4864f]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  </div>
</div>
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
                transition: { duration: 0.1 },
              }}
              className="relative w-full h-full mx-auto"
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
