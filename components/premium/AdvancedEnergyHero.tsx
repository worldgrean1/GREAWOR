"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Zap } from "lucide-react"
import { GreenBackgroundAnimation } from "@/components/animations/background/GreenBackgroundAnimation"

export default function AdvancedEnergyHero() {
  const [isActive, setIsActive] = useState(false)

  // Auto-activate after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <GreenBackgroundAnimation intensity="high" theme="energy" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        {/* Title and Subtitle */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <span className="text-white">Advanced Energy </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500 ml-2">
              Systems
            </span>
            <Zap className="w-12 h-12 ml-3 text-green-500" />
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-teal-100/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <span className="text-green-400">"At GREAN WORLD</span> Energy Technology, we don't just sell solar — we
            deliver advanced energy systems built for reliability, efficiency, and a{" "}
            <span className="text-green-400">sustainable future.</span>"
          </motion.p>
        </motion.div>

        {/* Energy Flow Diagram */}
        <div className="relative max-w-5xl mx-auto mt-10 h-[300px] md:h-[400px]">
          {/* Inverter */}
          <motion.div
            className="absolute left-0 bottom-1/2 transform translate-y-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="relative w-[180px] h-[220px] bg-slate-800/80 rounded-lg border border-teal-900 shadow-lg flex flex-col">
              {/* Inverter Screen */}
              <div className="m-3 flex-1 bg-slate-900 rounded-md p-3 overflow-hidden">
                <div className="text-xs text-teal-500 mb-1 flex justify-between">
                  <span>GENERATION</span>
                  <span>EFFICIENCY</span>
                  <span>STATUS</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="text-teal-400 text-sm">
                    <div className="font-mono">10.1 kW</div>
                    <div className="text-xs text-teal-600">CURRENT</div>
                  </div>
                  <div className="text-teal-400 text-sm">
                    <div className="font-mono">98.5%</div>
                    <div className="text-xs text-teal-600">RATE</div>
                  </div>
                  <div className="text-teal-400 text-sm">
                    <div className="font-mono">ACTIVE</div>
                    <div className="text-xs text-teal-600">SYSTEM</div>
                  </div>
                </div>

                <div className="mt-3 border-t border-teal-900/50 pt-2">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="text-teal-400 text-sm">
                      <div className="font-mono">8.2kWh</div>
                      <div className="text-xs text-teal-600">STORED</div>
                    </div>
                    <div className="text-teal-400 text-sm">
                      <div className="font-mono">3.7kW</div>
                      <div className="text-xs text-teal-600">USAGE</div>
                    </div>
                    <div className="text-teal-400 text-sm">
                      <div className="font-mono">13.4h</div>
                      <div className="text-xs text-teal-600">BACKUP</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 border-t border-teal-900/50 pt-2">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="text-teal-400 text-sm">
                      <div className="font-mono">31.5 kWh</div>
                      <div className="text-xs text-teal-600">TODAY</div>
                    </div>
                    <div className="text-teal-400 text-sm">
                      <div className="font-mono">0.0</div>
                      <div className="text-xs text-teal-600">ALERTS</div>
                    </div>
                    <div className="text-teal-400 text-sm">
                      <div className="font-mono">13.5°C</div>
                      <div className="text-xs text-teal-600">TEMP</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inverter Label */}
              <div className="text-center py-2 text-teal-400 font-medium tracking-widest">INVERTER</div>
            </div>
          </motion.div>

          {/* Light Bulb */}
          <motion.div
            className="absolute right-0 bottom-1/2 transform translate-y-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <div className="relative flex flex-col items-center">
              {/* Bulb */}
              <div className="relative">
                <div
                  className={`w-[100px] h-[150px] transition-all duration-700 ${isActive ? "opacity-100" : "opacity-40"}`}
                >
                  {/* Bulb Glass */}
                  <div className="absolute top-0 w-[60px] h-[60px] left-1/2 transform -translate-x-1/2 rounded-full bg-teal-900/30 backdrop-blur-sm border border-teal-800/50"></div>

                  {/* Bulb Inner */}
                  <div
                    className={`absolute top-0 w-[50px] h-[50px] left-1/2 transform -translate-x-1/2 rounded-full transition-all duration-700 ${isActive ? "bg-teal-400/30" : "bg-slate-800/50"}`}
                  ></div>

                  {/* Bulb Filament */}
                  <div
                    className={`absolute top-[25px] w-[30px] h-[30px] left-1/2 transform -translate-x-1/2 transition-all duration-700 ${isActive ? "bg-teal-300/80" : "bg-slate-700/50"} rounded-full flex items-center justify-center`}
                  >
                    <div
                      className={`w-[20px] h-[20px] rounded-full transition-all duration-700 ${isActive ? "bg-teal-200" : "bg-slate-600/50"} flex items-center justify-center`}
                    >
                      <div
                        className={`w-[10px] h-[10px] rounded-full transition-all duration-700 ${isActive ? "bg-white" : "bg-slate-500/50"}`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4 text-teal-400 font-medium">Smart Lighting</div>
            </div>
          </motion.div>

          {/* Energy Flow Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Line from Inverter to Switch */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="25%" 
                y1="50%" 
                x2="50%" 
                y2="50%"
                stroke={isActive ? "#2dd4bf" : "#475569"}
                strokeWidth="2"
                strokeDasharray="6,3"
                className="transition-all duration-700"
              >
                <animate 
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-18"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </line>
            </svg>

            {/* Line from Switch to Light */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="50%" 
                y1="50%" 
                x2="75%" 
                y2="50%"
                stroke={isActive ? "#2dd4bf" : "#475569"}
                strokeWidth="2"
                strokeDasharray="6,3"
                className="transition-all duration-700"
              >
                <animate 
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-18"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="0.2s"
                />
              </line>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
} 