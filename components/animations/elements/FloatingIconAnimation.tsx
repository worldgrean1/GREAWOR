"use client"

import { motion, useAnimationControls } from "framer-motion"
import { ReactNode, useEffect } from "react"

interface FloatingIconAnimationProps {
  children: ReactNode
  duration?: number
  delay?: number
  className?: string
  distance?: number
  rotation?: boolean
  scale?: boolean
  opacity?: boolean
  hoverEffect?: boolean
  onHoverStart?: () => void
  onHoverEnd?: () => void
}

export function FloatingIconAnimation({
  children,
  duration = 2,
  delay = 0,
  className = "",
  distance = 10,
  rotation = false,
  scale = false,
  opacity = false,
  hoverEffect = false,
  onHoverStart,
  onHoverEnd,
}: FloatingIconAnimationProps) {
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start("animate")
  }, [controls])

  const variants = {
    initial: {
      y: 0,
      rotate: rotation ? 0 : undefined,
      scale: scale ? 1 : undefined,
      opacity: opacity ? 0.5 : undefined,
    },
    animate: {
      y: [0, -distance, 0],
      rotate: rotation ? [0, 5, 0] : undefined,
      scale: scale ? [1, 1.1, 1] : undefined,
      opacity: opacity ? [0.5, 1, 0.5] : undefined,
      transition: {
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    hover: {
      y: -distance * 1.5,
      rotate: rotation ? 10 : undefined,
      scale: scale ? 1.2 : undefined,
      opacity: opacity ? 1 : undefined,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      className={className}
      initial="initial"
      animate={controls}
      variants={variants}
      whileHover={hoverEffect ? "hover" : undefined}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      {children}
    </motion.div>
  )
} 