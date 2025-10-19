"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ErrorSection() {
  return (
    <section
      id="error"
      className="bg-[hsl(36,30%,92%)] relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Error message overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-5xl font-bold text-[#f3864d] drop-shadow-lg mb-4">
          Oops!
        </h1>
        <p className="text-2xl text-gray-800 mb-6">Algo correu mal.</p>
        <a
          href="/"
          className="px-6 py-3 bg-[#f3864d] text-white rounded-lg font-semibold hover:bg-[#d96e36] transition"
        >
          Voltar ao início
        </a>
      </div>
    </section>
  );
}
