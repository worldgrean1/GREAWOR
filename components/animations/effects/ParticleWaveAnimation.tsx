"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useEffect } from "react"

interface ParticleWaveAnimationProps {
  color?: string
  density?: "low" | "medium" | "high"
  speed?: "slow" | "medium" | "fast"
  size?: "small" | "medium" | "large"
  direction?: "up" | "down" | "random"
  opacity?: number
  className?: string
}

export function ParticleWaveAnimation({
  color = "#4ade80",
  density = "medium",
  speed = "medium",
  size = "medium",
  direction = "up",
  opacity = 0.1,
  className = "",
}: ParticleWaveAnimationProps) {
  const controls = useAnimationControls()
  
  const particleCount = density === "low" ? 20 : density === "medium" ? 40 : 60
  const duration = speed === "slow" ? 4 : speed === "medium" ? 3 : 2
  const particleSize = size === "small" ? 2 : size === "medium" ? 4 : 6
  const maxDistance = direction === "random" ? 40 : 20

  useEffect(() => {
    controls.start("animate")
  }, [controls])

  const getDirection = () => {
    switch (direction) {
      case "up":
        return [0, -maxDistance, 0]
      case "down":
        return [0, maxDistance, 0]
      case "random":
        return [0, Math.random() > 0.5 ? -maxDistance : maxDistance, 0]
      default:
        return [0, -maxDistance, 0]
    }
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            opacity: opacity,
            width: Math.random() * particleSize + particleSize/2,
            height: Math.random() * particleSize + particleSize/2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial="initial"
          animate={controls}
          variants={{
            initial: { opacity: opacity },
            animate: {
              y: getDirection(),
              opacity: [opacity, opacity * 3, opacity],
              scale: [1, 1.2, 1],
            }
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay: i * (duration / particleCount),
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
} 