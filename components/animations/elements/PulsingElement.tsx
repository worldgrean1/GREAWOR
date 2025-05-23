"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

type Size = "sm" | "md" | "lg"
type Color = "green" | "blue" | "purple"

interface PulsingElementProps {
  size?: Size
  color?: Color
  className?: string
}

export function PulsingElement({ 
  size = "md", 
  color = "green",
  className = ""
}: PulsingElementProps) {
  // Memoize size and color configurations
  const config = useMemo(() => ({
    size: {
      sm: "w-2 h-2",
      md: "w-3 h-3",
      lg: "w-4 h-4"
    }[size],
    color: {
      green: "bg-green-400",
      blue: "bg-blue-400",
      purple: "bg-purple-400"
    }[color]
  }), [size, color])

  return (
    <motion.div
      className={`rounded-full ${config.size} ${config.color} ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut"
      }}
    />
  )
} 