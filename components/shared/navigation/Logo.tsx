"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEnergySystemStore } from "@/store/energySystemStore"
import { useRouter } from "next/navigation"

export function Logo() {
  const { setInverterActive, setSwitchActive } = useEnergySystemStore()
  const router = useRouter()

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setInverterActive(false)
    setSwitchActive(false)
    router.push('/')
  }

  return (
    <Link href="/" onClick={handleLogoClick}>
      <motion.div className="flex items-center gap-3">
        <motion.div className="logo-container relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <div className="logo-glow-effect"></div>
          <div className="relative w-10 h-10 sm:w-12 sm:h-12">
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
            <p className="text-xs text-gray-400 tracking-wide">ENERGY TECHNOLOGY PLC</p>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
} 