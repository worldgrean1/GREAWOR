"use client"

import { motion } from "framer-motion"
import { InverterState } from "./types"
import { useEnergySystemStore } from "@/store/energySystemStore"

interface InverterDisplayProps {
  state: InverterState
  inverterOn: boolean
  scale: number
  onInverterChange: (on: boolean) => void
  onCycleMode: () => void
  onCycleDisplayOption: () => void
}

export function InverterDisplay({ state, inverterOn, scale, onInverterChange, onCycleMode, onCycleDisplayOption }: InverterDisplayProps) {
  const formatNumber = (num: number, digits: number) => {
    return num.toString().padStart(digits, "0")
  }

  // Use global booting state from store
  const { booting, setBooting } = useEnergySystemStore()

  const handleConf = () => {
    onCycleMode()
  }
  const handleSelect = () => {
    onCycleDisplayOption()
  }
  const handleStop = () => {
    onInverterChange(false)
  }
  const handleStart = () => {
    setBooting(true)
    setTimeout(() => {
      setBooting(false)
      onInverterChange(true)
    }, 2000)
  }

  return (
    <motion.div
      className="relative"
      style={{
        width: "400px",
        height: "590px",
        background: "linear-gradient(145deg, rgb(217 218 222), rgb(150 156 167))",
        borderRadius: "15px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.3), 0 6px 6px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)",
        border: "1px solid rgb(107 112 131)",
      }}
      animate={{
        boxShadow: inverterOn
          ? "0 10px 25px rgba(0,0,0,0.3), 0 6px 6px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1), 0 0 15px rgba(74, 222, 128, 0.3)"
          : "0 10px 20px rgba(0,0,0,0.3), 0 6px 6px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)",
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Top mounting bracket */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "300px",
          height: "20px",
          background: "#0f172a",
          borderRadius: "5px 5px 0 0",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 40px",
        }}
      >
        {/* Mounting holes */}
        <div className="w-4 h-8 bg-gray-700 rounded-full" style={{ transform: "translateY(-4px)" }}></div>
        <div className="w-4 h-8 bg-gray-700 rounded-full" style={{ transform: "translateY(-4px)" }}></div>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: "#0f172a",
          borderRadius: "0 0 15px 15px",
          clipPath: "polygon(0 40%, 100% 40%, 100% 100%, 0 100%)",
        }}
      ></div>

      {/* Control panel */}
      <div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
        style={{
          width: "280px",
          height: "400px",
          background: "#0f172a",
          borderRadius: "15px",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "none",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
        }}
      >
        {/* Status indicators row (icons) */}
        <div className="w-full flex justify-between mb-4">
          {/* Grid/AC LED */}
          <div style={{
            backgroundColor: state.gridConnected ? "#22c55e" : "#1e293b",
            opacity: state.gridConnected ? 1 : 0.3,
            boxShadow: state.gridConnected ? "0 0 8px #22c55e" : "none"
          }} className="w-6 h-6 rounded-full flex items-center justify-center relative">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="6" y="8" width="12" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"></rect><line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5"></line><line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5"></line><line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5"></line><line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5"></line></svg>
          </div>
          {/* PV/Solar LED */}
          <div style={{
            backgroundColor: state.solarConnected ? "#fde047" : "#1e293b",
            opacity: state.solarConnected ? 1 : 0.3,
            boxShadow: state.solarConnected ? "0 0 8px #fde047" : "none"
          }} className="w-6 h-6 rounded-full flex items-center justify-center relative">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19" stroke="currentColor" strokeWidth="1.5"></path><path d="M12 5V19" stroke="currentColor" strokeWidth="1.5"></path><path d="M5 19L19 5" stroke="currentColor" strokeWidth="1.5"></path></svg>
          </div>
          {/* Battery LED */}
          <div style={{
            backgroundColor: state.batteryConnected ? "#38bdf8" : "#1e293b",
            opacity: state.batteryConnected ? 1 : 0.3,
            boxShadow: state.batteryConnected ? "0 0 8px #38bdf8" : "none"
          }} className="w-6 h-6 rounded-full flex items-center justify-center relative">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="6" y="7" width="12" height="10" stroke="currentColor" strokeWidth="1.5" fill="none"></rect><line x1="10" y1="4" x2="10" y2="7" stroke="currentColor" strokeWidth="1.5"></line><line x1="14" y1="4" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5"></line><line x1="9" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.5"></line><line x1="9" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="1.5"></line></svg>
          </div>
          {/* Fault/Warning LED */}
          <div style={{
            backgroundColor: state.faultCondition ? "#ef4444" : "#1e293b",
            opacity: state.faultCondition ? 1 : 0.3,
            boxShadow: state.faultCondition ? "0 0 8px #ef4444" : "none"
          }} className="w-6 h-6 rounded-full flex items-center justify-center relative">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 4L22 20H2L12 4Z" stroke="currentColor" strokeWidth="1.5" fill="none"></path><line x1="12" y1="10" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5"></line><line x1="12" y1="16" x2="12" y2="18" stroke="currentColor" strokeWidth="1.5"></line></svg>
          </div>
        </div>
        {/* LCD screen area */}
        <div
          className="w-full h-[280px] mb-4 p-2 relative overflow-hidden lcd-screen flex flex-col items-center justify-center"
          style={{
            background: inverterOn ? "#052e16" : "#000",
            borderRadius: "5px",
            border: "none",
            opacity: inverterOn ? 1 : 0.5,
            filter: inverterOn ? "brightness(100%)" : "brightness(30%)",
            visibility: "visible",
            boxShadow: inverterOn ? "0 0 10px rgba(0,255,128,0.2) inset" : "none",
            color: "#10b981",
            fontFamily: 'monospace',
          }}
        >
          {booting ? (
            <div className="flex flex-col items-center justify-center w-full h-full animate-pulse">
              <div className="text-emerald-300 text-base mb-6 font-bold" style={{ textShadow: '0 0 8px #10b981, 0 0 2px #fff' }}>POWER INITIALIZING</div>
              <div className="w-4/5 h-2 bg-emerald-800 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-emerald-400 animate-pulse" style={{ width: "100%", boxShadow: '0 0 8px #10b981' }}></div>
              </div>
              <div className="text-[11px] text-emerald-200 mt-2 font-mono" style={{ textShadow: '0 0 4px #10b981' }}>SYSTEM BOOT SEQUENCE</div>
              <div className="absolute bottom-8 left-0 right-0 text-[10px] text-emerald-200 font-mono opacity-90" style={{ textShadow: '0 0 4px #10b981' }}>
                <div className="flex flex-col items-center">
                  <div>CHECKING HARDWARE...</div>
                  <div className="mt-1">LOADING FIRMWARE v3.2.1</div>
                  <div className="mt-1">INITIALIZING POWER MODULES</div>
                </div>
              </div>
            </div>
          ) : inverterOn ? (
            <div className="flex flex-col h-full w-full text-emerald-400 relative">
              {/* Top mode icons/labels */}
              <div className="w-full flex justify-between mb-2">
                <div className="text-xs flex flex-col items-center text-emerald-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"></circle><path d="M8 13C8.5 15 10 16 12 16C14 16 15.5 15 16 13" stroke="currentColor" strokeWidth="1.5"></path><circle cx="9" cy="9" r="1.5" fill="currentColor"></circle><circle cx="15" cy="9" r="1.5" fill="currentColor"></circle></svg>
                  <span className="text-[10px]">Normal</span>
                </div>
                <div className="text-xs flex flex-col items-center text-emerald-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="6" y="8" width="12" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"></rect><line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5"></line><line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5"></line><line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5"></line><line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5"></line></svg>
                  <span className="text-[10px]">PV Mode</span>
                </div>
                <div className="text-xs flex flex-col items-center text-emerald-700">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="8" y="6" width="8" height="12" stroke="currentColor" strokeWidth="1.5" fill="none"></rect><line x1="10" y1="4" x2="10" y2="6" stroke="currentColor" strokeWidth="1.5"></line><line x1="14" y1="4" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5"></line><line x1="10" y1="9" x2="14" y2="9" stroke="currentColor" strokeWidth="1.5"></line></svg>
                  <span className="text-[10px]">Batt. Mode</span>
                </div>
              </div>
              {/* Two-column grid for data */}
              <div className="grid grid-cols-2 gap-1 flex-1">
                <div className="flex flex-col justify-between">
                  <div className="mb-1">
                    <div className="text-xs flex items-center">AC INPUT</div>
                    <div className="flex items-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-emerald-400 mr-1"><path d="M12 3L12 7M12 7L9 7M12 7L15 7" stroke="currentColor" strokeWidth="1.5"></path><path d="M5 21L19 21" stroke="currentColor" strokeWidth="1.5"></path><path d="M5 7L7 7M17 7L19 7" stroke="currentColor" strokeWidth="1.5"></path><path d="M7 7L7 16M17 7L17 16" stroke="currentColor" strokeWidth="1.5"></path><path d="M7 11L17 11" stroke="currentColor" strokeWidth="1.5"></path></svg><div className="text-2xl font-digital">00<span className="text-xs ml-1">Hz</span></div></div>
                  </div>
                  <div className="mb-1">
                    <div className="text-xs flex items-center">TOTAL ENERGY</div>
                    <div className="text-2xl font-digital">{formatNumber(Math.floor(state.totalEnergyGenerated * 100), 5)}<span className="text-xs ml-1">kWh</span></div>
                  </div>
                  <div className="mb-1">
                    <div className="text-xs flex items-center">PV INPUT</div>
                    <div className="flex items-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-emerald-400 mr-1"><rect x="6" y="8" width="12" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"></rect><line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5"></line><line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5"></line><line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5"></line><line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5"></line></svg><div className="text-2xl font-digital">48<span className="text-xs ml-1">Vdc</span></div></div>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="mb-1">
                    <div className="text-xs flex items-center">AC OUTPUT</div>
                    <div className="text-2xl font-digital">50<span className="text-xs ml-1">Hz</span></div>
                  </div>
                  <div className="mb-1">
                    <div className="text-xs">LOAD CAP</div>
                    <div className="text-2xl font-digital">{formatNumber(state.loadPercentage, 3)}<span className="text-xs ml-1">%</span></div>
                  </div>
                  <div className="mb-1">
                    <div className="text-xs flex items-center">BATT CAP</div>
                    <div className="text-2xl font-digital">{formatNumber(state.batteryLevel, 3)}<span className="text-xs ml-1">%</span></div>
                  </div>
                </div>
              </div>
              {/* Bottom status bar */}
              <div className="mt-auto mb-1 border-t border-emerald-900/50 pt-1 text-[10px] flex justify-between">
                <div>TEMP: {formatNumber(state.temperature, 2)}°C</div>
                <div>FAN: {formatNumber(state.fanSpeed, 3)}%</div>
                <div>GRID MODE</div>
              </div>
              {/* Decorative SVG (optional) */}
              <div className="h-8 flex-shrink-0"></div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-700">OFF</div>
            )}
        </div>
        {/* Control buttons row */}
        <div className="w-full flex justify-between mt-4">
          {/* CONF Button */}
          <div className="flex flex-col items-center">
            <button tabIndex={0} className="w-12 h-12 relative focus:outline-none" onClick={handleConf}>
              <div style={{
                backgroundColor: "#1e293b",
                border: "2px solid #3b82f6", // blue
                boxShadow: "0 0 8px #3b82f6, 0 1px 1px #fff1 inset"
              }} className="w-10 h-10 mx-auto rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 6L8 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </button>
            <span className="text-xs text-blue-400 mt-1">CONF</span>
          </div>
          {/* SELECT Button */}
          <div className="flex flex-col items-center">
            <button tabIndex={0} className="w-12 h-12 relative focus:outline-none" onClick={handleSelect}>
              <div style={{
                backgroundColor: "#1e293b",
                border: "2px solid #14b8a6", // teal
                boxShadow: "0 0 8px #14b8a6, 0 1px 1px #fff1 inset"
              }} className="w-10 h-10 mx-auto rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
          </button>
            <span className="text-xs text-teal-400 mt-1">SELECT</span>
          </div>
          {/* STOP Button */}
          <div className="flex flex-col items-center">
            <button tabIndex={0} className="w-12 h-12 relative focus:outline-none" onClick={handleStop}>
              <div style={{
                backgroundColor: "#1e293b",
                border: "2px solid #ef4444", // red
                boxShadow: "0 0 10px #ef4444, 0 1px 1px #fff1 inset",
                transform: "translateY(1px)"
              }} className="w-10 h-10 mx-auto rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
          </button>
            <span className="text-xs mt-1 text-red-400 font-medium">STOP</span>
          </div>
          {/* START Button */}
          <div className="flex flex-col items-center relative">
            {/* Floating info message with arrow, only when inverter is OFF */}
            {!inverterOn && (
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 animate-bounce">
                <div className="bg-emerald-700 text-white text-xs px-3 py-2 rounded shadow-lg mb-1 font-semibold">
                  Click <span className="font-bold">START</span> to begin the simulation
                </div>
                {/* Arrow SVG */}
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 0V18" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M8 10L16 18L24 10" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
            )}
            <button className="w-12 h-12 relative focus:outline-none" tabIndex={0} style={{ transform: "none" }} onClick={handleStart}>
              <div style={{
                backgroundColor: "#1e293b",
                border: "2px solid #22c55e", // green
                boxShadow: "0 0 10px #22c55e, 0 1px 1px #fff1 inset, 0 0 10px #10b98155 inset",
                transform: "translateY(0)"
              }} className="w-10 h-10 mx-auto rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
          </button>
            <span className="text-xs mt-1 text-emerald-400 font-medium">START</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 