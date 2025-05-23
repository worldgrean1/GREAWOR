"use client"

import { motion } from "framer-motion"

interface PowerFlowAnimationProps {
  inverterOn: boolean
  inverterPosition: { x: number; y: number }
  switchPosition: { x: number; y: number }
  scale: number
}

export default function PowerFlowAnimation({
  inverterOn,
  inverterPosition,
  switchPosition,
  scale,
}: PowerFlowAnimationProps) {
  const energyColor = "#00ff9d"
  const glowColor = "rgba(0, 255, 157, 0.7)"
  const particleCount = 5
  const pathLength = Math.abs(switchPosition.x - inverterPosition.x)
  
  // Calculate cable curve control points
  const midX = (inverterPosition.x + switchPosition.x) / 2
  const controlY = inverterPosition.y + 20 // Slight downward curve
  const cableOffset = 3 // Distance between parallel cables

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
        <defs>
          {/* Gradient definition for the power line */}
          <linearGradient id="powerLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: energyColor, stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#4ade80", stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: energyColor, stopOpacity: 1 }} />
          </linearGradient>

          {/* Cable texture pattern */}
          <pattern id="cablePattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 4 L8 4" stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
          </pattern>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Energy pulse effect */}
          <filter id="energyPulse">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
            <feBlend in="SourceGraphic" in2="glow" mode="normal" />
          </filter>

          {/* Cable shadow */}
          <filter id="cableShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Background cable lines */}
        <g style={{ filter: "url(#cableShadow)" }}>
          {/* Lower cable */}
          <path
            d={`M${inverterPosition.x + 50} ${inverterPosition.y + cableOffset} 
                Q ${midX} ${controlY + cableOffset}, ${switchPosition.x - 30} ${switchPosition.y + cableOffset}`}
            fill="none"
            stroke="#1e293b"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Upper cable */}
          <path
            d={`M${inverterPosition.x + 50} ${inverterPosition.y - cableOffset} 
                Q ${midX} ${controlY - cableOffset}, ${switchPosition.x - 30} ${switchPosition.y - cableOffset}`}
            fill="none"
            stroke="#1e293b"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Cable texture */}
          <path
            d={`M${inverterPosition.x + 50} ${inverterPosition.y} 
                Q ${midX} ${controlY}, ${switchPosition.x - 30} ${switchPosition.y}`}
            fill="none"
            stroke="url(#cablePattern)"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.3"
          />
        </g>

        {/* Main power line */}
        <path
          d={`M${inverterPosition.x + 50} ${inverterPosition.y} 
              Q ${midX} ${controlY}, ${switchPosition.x - 30} ${switchPosition.y}`}
          stroke={inverterOn ? "url(#powerLineGradient)" : "#1e293b"}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          style={{
            filter: inverterOn ? "url(#glow)" : "none",
          }}
        />

        {/* Energy pulse effect */}
        {inverterOn && (
          <motion.path
            d={`M${inverterPosition.x + 50} ${inverterPosition.y} 
                Q ${midX} ${controlY}, ${switchPosition.x - 30} ${switchPosition.y}`}
            stroke={glowColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              strokeWidth: ["8px", "12px", "8px"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              filter: "url(#energyPulse)",
            }}
          />
        )}

        {/* Energy particles */}
        {inverterOn && Array.from({ length: particleCount }).map((_, i) => (
          <g key={`particle-group-${i}`}>
            {/* Main particle */}
            <motion.circle
              r="4"
              fill={energyColor}
              initial={{ opacity: 0.8 }}
              animate={{
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * (2 / particleCount),
              }}
              style={{
                filter: "url(#glow)",
              }}
            >
              <animateMotion
                dur={`${2 + i * 0.2}s`}
                repeatCount="indefinite"
                path={`M${inverterPosition.x + 50} ${inverterPosition.y} Q ${midX} ${controlY}, ${switchPosition.x - 30} ${switchPosition.y}`}
              />
            </motion.circle>

            {/* Particle trail */}
            <motion.circle
              r="6"
              fill="transparent"
              stroke={glowColor}
              strokeWidth="2"
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * (1.5 / particleCount),
              }}
            >
              <animateMotion
                dur={`${2 + i * 0.2}s`}
                repeatCount="indefinite"
                path={`M${inverterPosition.x + 50} ${inverterPosition.y} Q ${midX} ${controlY}, ${switchPosition.x - 30} ${switchPosition.y}`}
              />
            </motion.circle>
          </g>
        ))}

        {/* Power indicator */}
        {inverterOn && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect
              x={(inverterPosition.x + switchPosition.x) / 2 - 45}
              y={inverterPosition.y - 30}
              width="90"
              height="22"
              rx="4"
              fill="rgba(0, 20, 24, 0.9)"
              stroke={energyColor}
              strokeWidth="1"
            />
            <text
              x={(inverterPosition.x + switchPosition.x) / 2}
              y={inverterPosition.y - 15}
              fontSize="12"
              fontFamily="monospace"
              fontWeight="500"
              textAnchor="middle"
              fill={energyColor}
              style={{
                filter: "url(#glow)",
              }}
            >
              POWER FLOW
            </text>
          </motion.g>
        )}

        {/* Connection nodes with cable connectors */}
        {[0, 0.5, 1].map((progress, i) => {
          const x = inverterPosition.x + 50 + progress * (switchPosition.x - 30 - (inverterPosition.x + 50))
          const y = inverterPosition.y + (progress * (progress - 1) * 4) // Slight curve for middle point
          return (
            <g key={`connection-${i}`}>
              {/* Cable connector housing */}
              <circle
                cx={x}
                cy={y}
                r="6"
                fill="#1e293b"
                stroke="#2d3748"
                strokeWidth="1"
              />
              {/* Connection point */}
              <circle
                cx={x}
                cy={y}
                r="4"
                fill={inverterOn ? energyColor : "#1e293b"}
                style={{
                  filter: inverterOn ? "url(#glow)" : "none",
                }}
              />
              {inverterOn && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="transparent"
                  stroke={glowColor}
                  strokeWidth="2"
                  initial={{ opacity: 0.3, scale: 1 }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
