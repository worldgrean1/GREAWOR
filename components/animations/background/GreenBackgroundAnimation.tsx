"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Leaf, SunMedium, Wind, Zap, FlaskConical, Sparkles, Trees } from "lucide-react"

type GreenBackgroundAnimationProps = {
  intensity?: "low" | "medium" | "high"
  theme?: "energy" | "science" | "about" | "contact"
}

export function GreenBackgroundAnimation({ intensity = "medium", theme = "energy" }: GreenBackgroundAnimationProps) {
  const [isClient, setIsClient] = useState(false)
  const [particles, setParticles] = useState<Array<{
    width: number
    height: number
    color: string
    left: string
    top: string
  }>>([])
  
  const [iconPositions, setIconPositions] = useState<Array<{
    left: string
    top: string
    fontSize: string
  }>>([])

  const getThemeIcons = () => {
    switch (theme) {
      case "energy":
        return [<SunMedium key="sun" />, <Leaf key="leaf" />, <Wind key="wind" />, <Zap key="zap" />]
      case "science":
        return [<FlaskConical key="flask" />, <Sparkles key="sparkles" />]
      case "about":
        return [<Leaf key="leaf" />, <Trees key="trees" />]
      case "contact":
        return [<Zap key="zap" />, <Sparkles key="sparkles" />]
      default:
        return [<SunMedium key="sun" />, <Leaf key="leaf" />]
    }
  }

  const themeIcons = getThemeIcons()

  // Determine intensity settings
  let opacityLevel = 0.05
  let particleCount = 8

  switch (intensity) {
    case "low":
      opacityLevel = 0.03
      particleCount = 6
      break
    case "high":
      opacityLevel = 0.08
      particleCount = 12
      break
    default: // medium
      opacityLevel = 0.05
      particleCount = 8
  }
  
  useEffect(() => {
    setIsClient(true)

    // Generate particles only on client side
    const newParticles = Array.from({ length: particleCount }).map(() => ({
      width: Math.random() * 8 + 4,
      height: Math.random() * 8 + 4,
      color: `hsl(${140 + Math.random() * 40}, 80%, 65%)`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    
    setParticles(newParticles)

    // Generate icon positions only on client side
    const newIconPositions = Array.from({ length: Math.min(6, themeIcons.length * 2) }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 16 + 12}px`,
    }))
    
    setIconPositions(newIconPositions)
  }, [particleCount, themeIcons.length])

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {/* Simplified grid pattern using CSS instead of SVG for better performance */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(74, 222, 128, ${opacityLevel / 2}) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(74, 222, 128, ${opacityLevel / 2}) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Reduced number of animated particles for better performance */}
      {isClient && (
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
              className="absolute rounded-full particle"
            style={{
              width: particle.width,
              height: particle.height,
              backgroundColor: particle.color,
                left: particle.left,
                top: particle.top,
              opacity: 0.2,
            }}
            animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
                duration: 10 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>
      )}

      {/* Simplified theme elements - reduced quantity for better performance */}
      {isClient && (
      <div className="absolute inset-0">
          {iconPositions.map((position, i) => (
          <motion.div
              key={`eco-element-${i}`}
              className="absolute text-green-400"
            style={{
                left: position.left,
                top: position.top,
                opacity: 0.3,
                fontSize: position.fontSize,
            }}
            animate={{
              y: [0, -20, 0],
                opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
                duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
              {themeIcons[i % themeIcons.length]}
          </motion.div>
        ))}
      </div>
      )}
    </div>
  )
} 