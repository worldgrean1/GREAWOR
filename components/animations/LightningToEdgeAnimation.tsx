import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

interface LightningToEdgeAnimationProps {
  start: { x: number; y: number }
  onComplete: () => void
}

export default function LightningToEdgeAnimation({ start, onComplete }: LightningToEdgeAnimationProps) {
  const controls = useAnimation()
  useEffect(() => {
    controls.start({
      x: window.innerWidth - start.x - 60, // animate to right edge
      opacity: [1, 1, 0.7, 0.3, 0],
      transition: { duration: 1.2, ease: "easeInOut" },
    }).then(() => {
      onComplete()
    })
  }, [controls, onComplete, start.x])

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={controls}
      style={{
        position: "fixed",
        left: start.x,
        top: start.y,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {/* Lightning bolt SVG */}
      <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
        <polyline
          points="0,20 30,10 50,30 80,5 120,20"
          stroke="#38bdf8"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />
        <defs>
          <filter id="glow" x="-10" y="-10" width="140" height="60">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </motion.div>
  )
} 