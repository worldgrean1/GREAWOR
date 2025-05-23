"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { id: 'brand-intro', label: 'Brand Intro' },
  { id: 'green-home', label: 'Green Home' },
  { id: 'green-about', label: 'About' },
  { id: 'green-solutions', label: 'Solutions' },
  { id: 'green-products', label: 'Products' },
  { id: 'green-contact', label: 'Contact' }
]

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState('brand-intro')
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      // Find the current section
      let currentSection = sections[0]?.id || 'brand-intro'
      sections.forEach(section => {
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = section.id
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle manual clicks on navigation items
  const handleNavClick = (id: string) => {
    setActiveSection(id)
    
    // Programmatically scroll to the section
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <motion.div 
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0.3, 
        x: isVisible ? 0 : 10
      }}
      transition={{ duration: 0.3 }}
    >
      <ul className="flex flex-col items-end gap-6">
        {navItems.map((item) => (
          <li key={item.id} className="relative group">
            <button
              onClick={() => handleNavClick(item.id)}
              className={`
                w-10 h-10 rounded-full 
                flex items-center justify-center 
                transition-all duration-300
                ${activeSection === item.id 
                  ? 'bg-[#3DD56D] text-white shadow-lg shadow-[#3DD56D]/20' 
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/80'
                }
              `}
            >
              <span className="text-white/0 group-hover:text-white/80 text-sm font-medium mr-3 transition-all duration-300 absolute right-full whitespace-nowrap">
                {item.label}
              </span>
            </button>
            {activeSection === item.id && (
              <div className="absolute inset-0 rounded-full border-2 border-[#3DD56D]" />
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  )
} 