"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

type Speed = "slow" | "medium" | "fast"

interface AnimatedBlobBackgroundProps {
  color?: string
  opacity?: number
  count?: number
  speed?: Speed
}

export function AnimatedBlobBackground({ 
  color = "#4ade80",
  opacity = 0.1,
  count = 3,
  speed = "medium"
}: AnimatedBlobBackgroundProps) {
  // Memoize blob count and animation duration
  const settings = useMemo(() => ({
    blobCount: Math.min(count, 2),
    duration: {
      slow: 25,
      medium: 15,
      fast: 8,
    }[speed] || 15
  }), [count, speed])

  // Memoize blob configurations
  const blobs = useMemo(() => 
    Array.from({ length: settings.blobCount }).map((_, i) => ({
      width: 20 + (i * 5),
      height: 20 + (i * 5),
      x: 20 + (i * 15),
      y: 20 + (i * 15),
      borderRadius: [
        "40% 60% 60% 40% / 60% 30% 70% 40%",
        "40% 60% 70% 30% / 50% 60% 30% 60%",
        "40% 60% 60% 40% / 60% 30% 70% 40%",
      ],
      delay: i * 2
    }))
  , [settings.blobCount])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            opacity: opacity,
            filter: "blur(50px)",
            width: `${blob.width}%`,
            height: `${blob.height}%`,
            left: `${blob.x}%`,
            top: `${blob.y}%`,
          }}
          animate={{
            x: [0, 30 - (i * 10), 0],
            y: [0, 30 - (i * 10), 0],
            borderRadius: blob.borderRadius,
          }}
          transition={{
            duration: settings.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: blob.delay
          }}
        />
      ))}
    </div>
  )
} 