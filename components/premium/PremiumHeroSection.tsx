"use client"

import { motion } from "framer-motion"
import { useEnergySystemStore } from "@/store/energySystemStore"
import { Zap } from "lucide-react"

export default function PremiumHeroSection() {
  const { switchActive } = useEnergySystemStore()

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 md:pt-[15rem] pb-0 relative">
      <div className="flex flex-col items-center text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Intelligent Energy{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500 ml-2">
            Systems
          </span>{" "}
          <Zap className="w-10 h-10 ml-2 text-green-500" />
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-green-400">"At GREAN WORLD</span> Energy Technology, we don't just sell solar — we
          deliver intelligent energy systems built for reliability, efficiency, and a{" "}
          <span className="text-green-400">sustainable future.</span>"
        </motion.p>
      </div>
    </section>
  )
}
