"use client"

import { motion, useMotionValue, useTransform, useSpring, useAnimationControls } from "framer-motion"
import { ReactNode, useEffect } from "react"

interface Card3DEffectProps {
  children: ReactNode
  depth?: "low" | "medium" | "high"
  perspective?: number
  springConfig?: {
    damping?: number
    stiffness?: number
  }
  hoverScale?: number
  className?: string
  onHoverStart?: () => void
  onHoverEnd?: () => void
}

export function Card3DEffect({
  children,
  depth = "medium",
  perspective = 1000,
  springConfig = { damping: 15, stiffness: 150 },
  hoverScale = 1.02,
  className = "",
  onHoverStart,
  onHoverEnd,
}: Card3DEffectProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const controls = useAnimationControls()

  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  const depthMultiplier = depth === "low" ? 0.5 : depth === "medium" ? 1 : 1.5

  useEffect(() => {
    controls.start("idle")
  }, [controls])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    controls.start("idle")
  }

  return (
    <motion.div
      className={className}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      initial="initial"
      animate={controls}
      variants={{
        initial: { scale: 1 },
        idle: { scale: 1 },
        hover: { scale: hoverScale }
      }}
      whileHover="hover"
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          transform: `translateZ(${depthMultiplier * 20}px)`,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
} 