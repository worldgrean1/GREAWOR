'use client'

import React, { useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { scroller } from 'react-scroll'

// Separate component that uses search params to prevent build errors
const ScrollToAnchor = () => {
  // We need to access window in a client component
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const elementId = hash.substring(1)
        const element = document.getElementById(elementId)
        if (element) {
          scroller.scrollTo(elementId, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
            offset: -100 // Offset to account for fixed header if needed
          })
        }
      }, 500) // Small delay to ensure component is rendered
    }
  }, [])

  return null
}

interface MainLayoutWrapperProps {
  children: React.ReactNode
  className?: string
}

const MainLayoutWrapper = ({ children, className = '' }: MainLayoutWrapperProps) => {
  const pathname = usePathname()
  
  // Check if the current path is green_home
  const isGreenHomePage = pathname === '/green_home'
  
  return (
    <div className={`min-h-screen ${isGreenHomePage ? 'bg-black' : 'bg-black'} ${className}`}>
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Only show the eco-glass background if not on green_home page */}
        {!isGreenHomePage && <div className="eco-glass fixed inset-0 z-0" />}
        <div className="relative z-10 flex-1">
          <Suspense fallback={null}>
            <ScrollToAnchor />
          </Suspense>
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayoutWrapper