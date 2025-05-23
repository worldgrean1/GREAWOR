'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FullPageEnergyAnimationProps {
  show: boolean
  onComplete?: () => void
}

export default function FullPageEnergyAnimation({ 
  show, 
  onComplete 
}: FullPageEnergyAnimationProps) {
  const [animationCompleted, setAnimationCompleted] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const redirectRef = useRef<boolean>(false)

  useEffect(() => {
    if (show && !redirectRef.current) {
      redirectRef.current = true;
      
      // Immediate redirect without animation
      if (onComplete) {
        onComplete()
      }
      window.location.href = '/home'
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [show, onComplete])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0a1628]">
      {/* Simple background without animations */}
    </div>
  )
} 