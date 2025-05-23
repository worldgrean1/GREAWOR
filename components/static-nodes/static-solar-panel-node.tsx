"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface StaticSolarPanelNodeProps {
  position: { x: number; y: number }
  scale?: number
  sunIntensity?: number
  efficiency?: number
  tiltAngle?: number
}

export default function StaticSolarPanelNode({
  position,
  scale = 1,
  sunIntensity = 100,
  efficiency = 20,
  tiltAngle = 30,
}: StaticSolarPanelNodeProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [powerOutput, setPowerOutput] = useState(0)
  const [animationActive, setAnimationActive] = useState(false)

  // Calculate power output based on sun intensity and efficiency
  useEffect(() => {
    const calculatedOutput = (sunIntensity * efficiency) / 100
    setPowerOutput(Math.round(calculatedOutput * 10) / 10)
    setIsGenerating(sunIntensity > 20)
    
    // Start animation if generating power
    if (sunIntensity > 20) {
      setAnimationActive(true)
    } else {
      setAnimationActive(false)
    }
  }, [sunIntensity, efficiency])

  return (
    <div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        transform: `scale(${scale}) rotate(${tiltAngle}deg)`,
        transformOrigin: "center center",
      }}
    >
      {/* Base */}
      <div
        className="absolute w-8 h-12 bg-slate-700"
        style={{
          left: "50%",
          marginLeft: "-16px",
          bottom: "-30px",
          borderRadius: "2px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      />

      {/* Main Panel */}
      <div
        className="relative w-60 h-40 bg-slate-800 border-2 border-slate-600 rounded-sm overflow-hidden"
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Solar Cells Grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-1 p-2 h-full w-full">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="bg-blue-900 rounded-sm relative overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(135deg, #1e3a8a 25%, #1e40af 25%, #1e40af 50%, #1e3a8a 50%, #1e3a8a 75%, #1e40af 75%, #1e40af 100%)",
                backgroundSize: "10px 10px",
              }}
            >
              {isGenerating && (
                <motion.div
                  className="absolute inset-0 bg-blue-500 opacity-20"
                  animate={{ opacity: animationActive ? [0.1, 0.3, 0.1] : 0.1 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sun Reflections */}
      {isGenerating && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-8 h-8 bg-yellow-400 rounded-full opacity-0"
            animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            style={{ filter: "blur(4px)" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-6 h-6 bg-yellow-400 rounded-full opacity-0"
            animate={{ opacity: [0, 0.2, 0], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ filter: "blur(3px)" }}
          />
        </>
      )}

      {/* Power Output Indicator */}
      <div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-3 py-1 rounded-full text-xs font-mono"
        style={{
          border: "1px solid #374151",
          color: isGenerating ? "#4ade80" : "#94a3b8",
        }}
      >
        {isGenerating ? (
          <>
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
            {powerOutput}W
          </>
        ) : (
          <>
            <span className="inline-block w-2 h-2 rounded-full bg-slate-500 mr-1"></span>
            0.0W
          </>
        )}
      </div>
    </div>
  )
}
