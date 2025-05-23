"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface StaticSwitchNodeProps {
  position: { x: number; y: number }
  switchOn: boolean
  onSwitchChange?: (value: boolean) => void
  scale?: number
}

export default function StaticSwitchNode({
  position,
  switchOn = false,
  onSwitchChange,
  scale = 1,
}: StaticSwitchNodeProps) {
  const [pressed, setPressed] = useState(false)
  const energyColor = "#00ff9d"
  const glowColor = "rgba(0, 255, 157, 0.7)"

  // Calculate dimensions based on scale
  const nodeWidth = 128 * scale
  const nodeHeight = 128 * scale

  // Toggle switch on click
  const handleToggle = () => {
    setPressed(true)
    if (typeof onSwitchChange === "function") {
      onSwitchChange(!switchOn)
    }
    setTimeout(() => setPressed(false), 150)
  }

  return (
    <div
      data-node-id="switch"
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: `${nodeWidth}px`,
        height: `${nodeHeight}px`,
      }}
    >
      <div
        className="relative w-full h-full flex flex-col items-center justify-center select-none cursor-pointer"
        onClick={handleToggle}
        style={{
          background: "transparent",
        }}
      >
        {/* Breathing glow effect when switch is on */}
        {switchOn && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: `radial-gradient(circle, ${glowColor} 0%, rgba(0, 255, 157, 0.2) 50%, transparent 70%)`,
              filter: "blur(10px)",
              zIndex: 0,
            }}
          />
        )}

        {/* Energy pulse rings when switch is on */}
        {switchOn && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={`pulse-${i}`}
                className="absolute inset-0 rounded-full border-2"
                style={{
                  borderColor: energyColor,
                }}
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{
                  opacity: [0.5, 0],
                  scale: [0.8, 1.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}

        {/* Switch PNG image with transparent background */}
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.img
            src="/images/light-switch.png"
            alt="Light Switch"
            className="object-contain"
            animate={{
              filter: switchOn ? "brightness(1.2) drop-shadow(0 0 10px rgba(0, 255, 157, 0.7))" : "brightness(0.9)",
              scale: pressed ? 0.95 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{
              width: "75%",
              height: "75%",
              zIndex: 1,
            }}
          />
        </div>

        {/* Power ON message when switch is on */}
        {switchOn && (
          <motion.div
            className="absolute right-0 bottom-1/2 transform translate-y-1/2 translate-x-full ml-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              ON
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
