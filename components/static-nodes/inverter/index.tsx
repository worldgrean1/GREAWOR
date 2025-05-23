"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { StaticInverterNodeProps, InverterState } from "./types"

import { InverterDisplay } from "./InverterDisplay"
import { InverterStatus } from "./InverterStatus"
import { InverterSimulation } from "./InverterSimulation"

export default function StaticInverterNode({
  position,
  inverterOn,
  onInverterChange,
  gridConnected: initialGridConnected = false,
  solarConnected: initialSolarConnected = false,
  batteryConnected: initialBatteryConnected = false,
  loadPercentage: initialLoadPercentage = 0,
  efficiency: initialEfficiency = 97,
  inputVoltage: initialInputVoltage = 48,
  outputVoltage: initialOutputVoltage = 230,
  frequency: initialFrequency = 50,
  batteryLevel: initialBatteryLevel = 80,
  batteryCharging: initialBatteryCharging = false,
  totalEnergyGenerated: initialTotalEnergyGenerated = 23.5,
  temperature: initialTemperature = 45,
  fanSpeed: initialFanSpeed = 40,
  mode: initialMode = "normal",
  scale = 0.35,
}: StaticInverterNodeProps) {
  // State management
  const [state, setState] = useState<InverterState>({
    gridConnected: initialGridConnected,
    solarConnected: initialSolarConnected,
    batteryConnected: initialBatteryConnected,
    temperature: initialTemperature,
    loadPercentage: initialLoadPercentage,
    efficiency: initialEfficiency,
    inputVoltage: initialInputVoltage,
    outputVoltage: initialOutputVoltage,
    inputFrequency: 0,
    outputFrequency: initialFrequency,
    batteryLevel: initialBatteryLevel,
    batteryCharging: initialBatteryCharging,
    totalEnergyGenerated: initialTotalEnergyGenerated,
    fanSpeed: initialFanSpeed,
    mode: initialMode,
    selectedMode: initialMode === "normal" ? 0 : initialMode === "pv" ? 1 : 2,
    faultCondition: false,
    screenActive: false,
    configMode: false,
    displayOption: 0,
    screenBrightness: 1,
    bootupPhase: 3,
    hovered: false,
    showActivatePrompt: !inverterOn,
  })

  const nodeRef = useRef<HTMLDivElement>(null)
  const connectionPointRef = useRef<HTMLDivElement>(null)

  // Calculate dimensions
  const inverterWidth = 400 * scale
  const inverterHeight = 590 * scale
  const connectionPointSize = scale * 12
  const connectionPointBottom = scale * 2

  // Handle inverter toggle
  const toggleInverter = useCallback(() => {
    const newState = !inverterOn
    onInverterChange(newState)

    if (newState) {
      if (!state.screenActive) {
        setState(prev => ({
          ...prev,
          screenActive: true,
          bootupPhase: 1,
        }))

        setTimeout(() => setState(prev => ({
          ...prev,
          screenBrightness: 0.3
        })), 200)

        setTimeout(() => setState(prev => ({
          ...prev,
          bootupPhase: 2,
          screenBrightness: 0.6
        })), 800)

        setTimeout(() => setState(prev => ({
          ...prev,
          bootupPhase: 3,
          screenBrightness: 1
        })), 1500)
      }

      // Power on sequence
      setTimeout(() => setState(prev => ({
        ...prev,
        loadPercentage: initialLoadPercentage || 0
      })), 500)

      setTimeout(() => setState(prev => ({
        ...prev,
        fanSpeed: 20
      })), 1000)

      setTimeout(() => setState(prev => ({
        ...prev,
        outputFrequency: initialFrequency || 50
      })), 1500)

      // Set connections based on mode
      if (state.mode === "pv") {
        setState(prev => ({
          ...prev,
          solarConnected: true,
          batteryConnected: true,
          gridConnected: false
        }))
      } else if (state.mode === "normal") {
        setState(prev => ({
          ...prev,
          gridConnected: true,
          solarConnected: false
        }))
      } else if (state.mode === "battery") {
        setState(prev => ({
          ...prev,
          batteryConnected: true,
          gridConnected: false,
          solarConnected: false
        }))
      }
    } else {
      // Power off sequence
      setState(prev => ({
        ...prev,
        loadPercentage: 0,
        fanSpeed: 0,
        outputFrequency: 0,
        inputFrequency: 0,
        screenActive: false,
        screenBrightness: 0
      }))
    }
  }, [inverterOn, initialLoadPercentage, initialFrequency, onInverterChange, state.mode, state.screenActive])

  // Handle mode change
  const changeMode = useCallback(() => {
    const modes = ["normal", "pv", "battery"] as const
    const newModeIndex = (state.selectedMode + 1) % 3
    setState(prev => ({
      ...prev,
      selectedMode: newModeIndex,
      mode: modes[newModeIndex]
    }))
  }, [state.selectedMode])

  // Handle display option change
  const changeDisplayOption = useCallback(() => {
    setState(prev => ({
      ...prev,
      displayOption: (prev.displayOption + 1) % 3 // Example: 3 display options
    }))
  }, [])

  // Add effect to update connection states when inverterOn or mode changes
  useEffect(() => {
    if (!inverterOn) {
      setState(prev => ({
        ...prev,
        gridConnected: false,
        solarConnected: false,
        batteryConnected: false,
      }))
    } else {
      if (state.mode === "pv") {
        setState(prev => ({
          ...prev,
          solarConnected: true,
          batteryConnected: true,
          gridConnected: false,
        }))
      } else if (state.mode === "normal") {
        setState(prev => ({
          ...prev,
          gridConnected: true,
          solarConnected: false,
          batteryConnected: false,
        }))
      } else if (state.mode === "battery") {
        setState(prev => ({
          ...prev,
          batteryConnected: true,
          gridConnected: false,
          solarConnected: false,
        }))
      }
    }
  }, [inverterOn, state.mode])

  return (
    <div
      ref={nodeRef}
      data-node-id="inverter"
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%)`,
        width: `${inverterWidth}px`,
        height: `${inverterHeight}px`,
        maxHeight: "100%",
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          overflow: "visible",
          zIndex: 1,
        }}
        onMouseEnter={() => setState(prev => ({ ...prev, hovered: true }))}
        onMouseLeave={() => setState(prev => ({ ...prev, hovered: false }))}
      >


        <InverterDisplay
          state={state}
          inverterOn={inverterOn}
          scale={scale}
          onInverterChange={onInverterChange}
          onCycleMode={changeMode}
          onCycleDisplayOption={changeDisplayOption}
        />

        {/* <InverterStatus
          solarConnected={state.solarConnected}
          gridConnected={state.gridConnected}
          batteryConnected={state.batteryConnected}
          faultCondition={state.faultCondition}
          mode={state.mode}
        /> */}

        <InverterSimulation
          inverterOn={inverterOn}
          state={state}
          setState={setState}
        />

        {/* Connection point */}
        <div
          ref={connectionPointRef}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: `${connectionPointSize}px`,
            height: `${connectionPointSize}px`,
            bottom: `${connectionPointBottom}px`,
            background: "#1e293b",
            borderRadius: "50%",
            border: "2px solid #0f172a",
          }}
        />
      </motion.div>
    </div>
  )
}