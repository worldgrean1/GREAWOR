"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

type AnimationType = "fade" | "slide" | "scale"
type Direction = "up" | "down" | "left" | "right"

interface AnimatedTextProps {
  text: string
  type?: AnimationType
  direction?: Direction
  className?: string
  delay?: number
}

export function AnimatedText({
  text,
  type = "fade",
  direction = "up",
  className = "",
  delay = 0
}: AnimatedTextProps) {
  // Memoize animation configurations
  const animation = useMemo(() => {
    const baseConfig = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5, delay }
    }

    switch (type) {
      case "slide":
        return {
          ...baseConfig,
          initial: {
            ...baseConfig.initial,
            [direction === "up" || direction === "down" ? "y" : "x"]: 
              direction === "up" || direction === "left" ? 20 : -20
          },
          animate: {
            ...baseConfig.animate,
            [direction === "up" || direction === "down" ? "y" : "x"]: 0
          }
        }
      case "scale":
        return {
          ...baseConfig,
          initial: { ...baseConfig.initial, scale: 0.8 },
          animate: { ...baseConfig.animate, scale: 1 }
        }
      default:
        return baseConfig
    }
  }, [type, direction, delay])

  return (
    <motion.div
      className={className}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
    >
      {text}
    </motion.div>
  )
} 