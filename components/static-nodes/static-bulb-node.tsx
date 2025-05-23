"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface StaticBulbNodeProps {
  position?: { x: number; y: number }
  bulbOn: boolean
  onBulbToggle?: (value: boolean) => void
  t?: (key: string) => string
  scale?: number
}

export default function StaticBulbNode({
  position,
  bulbOn = false,
  onBulbToggle,
  t = (key: string) => key,
  scale = 1,
}: StaticBulbNodeProps) {
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [initialFlash, setInitialFlash] = useState(false)
  const prevBulbState = useRef(bulbOn)

  // Detect when bulb turns on to trigger initial flash effect
  useEffect(() => {
    if (bulbOn && !prevBulbState.current) {
      setInitialFlash(true)
      const timer = setTimeout(() => setInitialFlash(false), 600)
      return () => clearTimeout(timer)
    }
    prevBulbState.current = bulbOn
  }, [bulbOn])

  // Light rays animation
  const lightRays = Array.from({ length: 8 }).map((_, i) => ({
    angle: i * 45,
    delay: i * 0.1,
    length: 80 + Math.random() * 40,
  }))

  return (
    <>
      <motion.div
        className="relative flex flex-col items-center justify-center w-28 h-48 select-none transition-shadow"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title={bulbOn ? t("Bulb On") : t("Bulb Off")}
        style={{ background: "transparent" }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Main circular glow behind the bulb - ENHANCED AND REPOSITIONED */}
        <motion.div
          style={{
            position: "absolute",
            left: "-40%",
            top: "-20%",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #4ade80 0%, #10b981 60%, transparent 100%)",
            filter: "blur(30px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: bulbOn ? [0.6, 0.8, 0.6] : 0,
            scale: bulbOn ? [0.9, 1.1, 0.9] : 0.8,
          }}
          transition={{
            duration: 3,
            repeat: bulbOn ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
        />

        {/* Secondary outer glow - ENHANCED AND REPOSITIONED */}
        <motion.div
          style={{
            position: "absolute",
            left: "-40%",
            top: "-20%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(74, 222, 128, 0.4) 0%, rgba(16, 185, 129, 0.25) 50%, transparent 100%)",
            filter: "blur(35px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: bulbOn ? [0.4, 0.6, 0.4] : 0,
            scale: bulbOn ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 4,
            repeat: bulbOn ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
            delay: 0.5,
          }}
        />

        {/* Tertiary outer glow for extra intensity */}
        <motion.div
          style={{
            position: "absolute",
            left: "-40%",
            top: "-20%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(74, 222, 128, 0.2) 0%, rgba(16, 185, 129, 0.15) 40%, transparent 100%)",
            filter: "blur(40px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: bulbOn ? [0.3, 0.5, 0.3] : 0,
            scale: bulbOn ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 5,
            repeat: bulbOn ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
            delay: 1,
          }}
        />

        {/* Ripple effect when bulb turns on - REPOSITIONED */}
        <AnimatePresence>
          {bulbOn && (
            <>
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={`ripple-${i}`}
                  className="absolute rounded-full border-2 border-green-400/30"
                  style={{
                    width: "180px",
                    height: "180px",
                    left: "-40%",
                    top: "-20%",
                    zIndex: 0,
                  }}
                  initial={{ opacity: 0.7, scale: 0.1 }}
                  animate={{ opacity: 0, scale: 2.5 }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.8,
                    ease: "easeOut",
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Enhanced light rays when bulb is on - REPOSITIONED */}
        {bulbOn && (
          <div className="absolute" style={{ left: "-40%", top: "-20%", zIndex: 1 }}>
            {lightRays.map((ray, index) => (
              <motion.div
                key={index}
                className="absolute bg-gradient-to-t from-green-400/50 to-transparent"
                style={{
                  width: index % 2 === 0 ? "3px" : "2px",
                  height: ray.length * 1.2,
                  left: "50%",
                  top: "50%",
                  transformOrigin: "center bottom",
                  transform: `translateX(-50%) translateY(-50%) rotate(${ray.angle}deg) translateY(-${ray.length * 0.6}px)`,
                }}
                animate={{
                  height: [ray.length * 1.1, ray.length * 1.3, ray.length * 1.1],
                  opacity: [0.3, 0.6, 0.3],
                  filter: ["blur(1px)", "blur(2px)", "blur(1px)"],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Number.POSITIVE_INFINITY,
                  delay: ray.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Connection point at bottom center */}
        <motion.div
          className="absolute bottom-[2px] left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2"
          animate={{
            backgroundColor: bulbOn ? "#4ade80" : "#475569",
            borderColor: bulbOn ? "#22c55e" : "#334155",
            boxShadow: bulbOn ? "0 0 8px 2px rgba(74, 222, 128, 0.5)" : "none",
          }}
          transition={{ duration: 0.3 }}
          data-handle-id="bulb-input"
        />

        {/* Hidden connection point for right side */}
        <div className="absolute" style={{ display: "none" }} data-handle-id="bulb-output" />

        {/* Green Bulb PNG Image with exact styling from user */}
        <motion.div
          className="relative z-10"
          style={{ width: "80px", height: "160px" }}
          animate={{
            filter: bulbOn ? "drop-shadow(0 0 12px rgba(74, 222, 128, 0.8))" : "none",
            scale: pressed ? 0.95 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BULB-RC2P5EIrYJ3AYipx4XIODhH3Q8oxEs.png"
              alt={bulbOn ? t("Bulb On") : t("Bulb Off")}
              width={80}
              height={120}
              className="object-contain"
              style={{
                color: "transparent",
                filter: bulbOn ? "brightness(1.3) saturate(1.3)" : "brightness(0.9) saturate(0.9)",
                transition: "filter 0.3s",
                transform: "scale(2.7)",
              }}
            />
          </div>
        </motion.div>

        {/* Hidden connection point for right side */}
        <div className="absolute" style={{ display: "none" }} data-handle-id="bulb-output" />
      </motion.div>

      {/* Connection points with enhanced shadow */}
      <motion.div
        className="absolute rounded-full border-2"
        style={{
          // Input connection point (left side)
          top: "50%",
          left: "0",
          transform: "translate(-50%, -50%)",
          width: `${scale * 12}px`,
          height: `${scale * 12}px`,
          zIndex: 2,
        }}
        animate={{
          backgroundColor: bulbOn ? "#4ade80" : "#475569",
          borderColor: bulbOn ? "#22c55e" : "#334155",
          boxShadow: bulbOn ? "0 0 8px 2px rgba(74, 222, 128, 0.5)" : "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        transition={{ duration: 0.3 }}
        data-handle-id="bulb-input"
        data-connection-point="true"
      />

      <motion.div
        className="absolute rounded-full border-2"
        style={{
          // Output connection point (right side)
          top: "50%",
          right: "0",
          transform: "translate(50%, -50%)",
          width: `${scale * 12}px`,
          height: `${scale * 12}px`,
          zIndex: 2,
        }}
        animate={{
          backgroundColor: bulbOn ? "#4ade80" : "#475569",
          borderColor: bulbOn ? "#22c55e" : "#334155",
          boxShadow: bulbOn ? "0 0 8px 2px rgba(74, 222, 128, 0.5)" : "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        transition={{ duration: 0.3 }}
        data-handle-id="bulb-output"
        data-connection-point="true"
      />
    </>
  )
}
