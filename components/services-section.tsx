"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ServicesSection() {
  return (
    <section className="relative min-h-screen bg-[#f6ede6] overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Element - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center items-center order-2 lg:order-1"
          >
            <div className="relative w-full  mx-auto">
              {/* Statue placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="relative z-20 "
              >
                <div className="relative">
                  {/* Placeholder for statue image */}
                  <div className="w-full h-full flex relative overflow-hidden">
                    <Image
                      src="/statue.png"
                      alt="Classical statue placeholder"
                      width={800}
                      height={800}
                      className="object-cover w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Card - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="bg-[#5344b4] rounded-3xl p-8 lg:p-12 shadow-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 text-[#dff506] leading-tight"
              >
                Existimos para simplicar o seu dia-a-dia empresarial e reduzir o
                stress do caos
              </motion.h2>

              {/* CTA Button */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8"
              >
                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center px-8 py-5 border border-[#dff506] text-[#dff506] text-lg font-semibold tracking-wide rounded-xl transition-all duration-300 hover:bg-[#dff506] hover:text-[#5344b4] hover:shadow-xl"
                >
                  <span className="mr-3">Conheça os nossos serviços</span>
                  <svg
                    className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 4.293a1 1 0 011.414 0L18 8.586a1 1 0 010 1.414l-4.293 4.293a1 1 0 01-1.414-1.414L15.586 10H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
