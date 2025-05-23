"use client"

import { motion } from "framer-motion"

interface InverterStatusProps {
  solarConnected: boolean
  gridConnected: boolean
  batteryConnected: boolean
  faultCondition: boolean
  mode: "normal" | "pv" | "battery"
}

export function InverterStatus({
  solarConnected,
  gridConnected,
  batteryConnected,
  faultCondition,
  mode
}: InverterStatusProps) {
  return (
    <div className="w-full flex justify-between mb-4">
      {/* Solar connection indicator */}
      <motion.div
        className="w-6 h-6 rounded-full flex items-center justify-center relative"
        animate={{
          backgroundColor: solarConnected ? "#22c55e" : "#1e293b",
          boxShadow: solarConnected ? "0 0 10px rgba(74, 222, 128, 0.7)" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-black"
        >
          <rect x="6" y="8" width="12" height="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
          <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" />
          <line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" />
          <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        {solarConnected && (
          <motion.div
            className="absolute inset-0 rounded-full bg-green-500/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>

      {/* Grid connection indicator */}
      <motion.div
        className="w-6 h-6 rounded-full flex items-center justify-center relative"
        animate={{
          backgroundColor: gridConnected ? "#f59e0b" : "#1e293b",
          boxShadow: gridConnected ? "0 0 10px rgba(245, 158, 11, 0.7)" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-black"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
        {gridConnected && (
          <motion.div
            className="absolute inset-0 rounded-full bg-amber-500/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>

      {/* Battery connection indicator */}
      <motion.div
        className="w-6 h-6 rounded-full flex items-center justify-center relative"
        animate={{
          backgroundColor: batteryConnected ? "#3b82f6" : "#1e293b",
          boxShadow: batteryConnected ? "0 0 10px rgba(59, 130, 246, 0.7)" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-black"
        >
          <rect x="4" y="8" width="16" height="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <line x1="20" y1="10" x2="20" y2="14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        {batteryConnected && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>

      {/* Fault indicator */}
      {faultCondition && (
        <motion.div
          className="w-6 h-6 rounded-full flex items-center justify-center relative"
          animate={{
            backgroundColor: "#ef4444",
            boxShadow: "0 0 10px rgba(239, 68, 68, 0.7)",
          }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path
              d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </div>
  )
} 