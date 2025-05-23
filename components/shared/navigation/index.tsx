"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Import components
import { Logo } from "./Logo"
import { NavigationCSS } from "./NavigationCSS"

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`py-4 px-4 sm:px-6 border-b transition-all duration-500 fixed top-0 left-0 right-0 z-50 ${
        scrolled ? "bg-[#0a1628]/90 backdrop-blur-md border-slate-700/30" : "border-slate-700/20"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo />
        </motion.div>
      </div>

      {/* CSS Styles */}
      <NavigationCSS />
    </motion.header>
  )
} 