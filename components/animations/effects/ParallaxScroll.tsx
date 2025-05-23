"use client"

import { useMemo, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxScrollProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
}

export function ParallaxScroll({
  children,
  className = "",
  speed = 0.5,
  direction = "up"
}: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Memoize transform calculations
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [100, -100] : [-100, 100]
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1 + speed * 0.2, 1]
  )

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          y,
          scale,
          willChange: "transform"
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
} 