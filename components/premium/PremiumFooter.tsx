"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEnergySystemStore } from "@/store/energySystemStore"

export default function PremiumFooter() {
  const { switchActive } = useEnergySystemStore()

  return (
    <AnimatePresence>
      {switchActive && (
        <motion.footer
          className="w-full bg-slate-900/80 backdrop-blur-md border-t border-emerald-500/10 py-4 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} GREAN WORLD Energy Technology. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                Contact
              </a>
            </div>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  )
}
