"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useEnergySystemStore } from "@/store/energySystemStore"
import { useState, useEffect } from "react"
import { LEDTextDisplay } from "@/components/ui/LEDTextDisplay"

interface PremiumHeaderProps {
  scrolled: boolean
}

export default function PremiumHeader({ scrolled }: PremiumHeaderProps) {
  const { switchActive } = useEnergySystemStore()
  const [energyLevel, setEnergyLevel] = useState(0)

  // Animate energy level
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyLevel((prev) => {
        const newValue = prev + (Math.random() * 10 - 4)
        return Math.max(0, Math.min(100, newValue))
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // News ticker messages
  const tickerMessages = [
    "Welcome to GREAN WORLD Energy Technology",
    "Sustainable energy solutions for a greener future",
    "Smart grid technology for efficient power management",
    "Reducing carbon footprint with innovative energy systems",
    "24/7 monitoring and support for all energy solutions",
  ]

  return (
    <AnimatePresence>
      <motion.header
        className={`py-4 px-6 sm:px-8 transition-all duration-500 fixed top-0 left-0 right-0 z-50 ${
          scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="flex justify-between items-center">
            {/* Logo and LED Display */}
            <div className="flex items-center gap-4 flex-grow overflow-hidden">
              <motion.div
                className="flex-shrink-0 items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/" className="flex items-center">
                  <motion.div className="flex items-center">
                    <motion.div
                      className="logo-container relative mr-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="logo-glow-effect"></div>
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 logo-spin">
                        <Image
                          src="/images/grean-logo-icon.png"
                          alt="GREAN WORLD Logo"
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    </motion.div>
                    <div>
                      <motion.div className="flex flex-col" transition={{ duration: 0.5 }}>
                        <div className="flex items-center">
                          <span className="text-[#3DD56D] text-xl sm:text-2xl font-bold tracking-wide">GREAN</span>
                          <span className="text-xl sm:text-2xl font-bold text-gray-200 tracking-wide ml-1">WORLD</span>
                        </div>
                        <p className="text-xs text-gray-400 tracking-wide">ENERGY TECHNOLOGY</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* LED Text Display - Next to logo */}
              <motion.div
                className="hidden sm:block flex-grow overflow-hidden"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <LEDTextDisplay messages={tickerMessages} />
              </motion.div>
            </div>
          </div>

          {/* Mobile LED Text Display */}
          <motion.div
            className="sm:hidden mt-4 w-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <LEDTextDisplay messages={tickerMessages} />
          </motion.div>
        </div>
      </motion.header>
    </AnimatePresence>
  )
}
