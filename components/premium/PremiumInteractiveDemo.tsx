"use client"

import { useEffect, useRef } from "react"
import { useEnergySystemStore } from "@/store/energySystemStore"
import StaticSwitchNode from "@/components/static-nodes/static-switch-node"
import StaticInverterNode from "@/components/static-nodes/inverter"
import PowerFlowAnimation from "@/components/animations/power-flow-animation"
import { useRouter } from "next/navigation"

interface PremiumInteractiveDemoProps {
  showInfoPanel: boolean
  setShowInfoPanel: (show: boolean) => void
  containerWidth: number
  containerHeight: number
  showEnergyAnimation?: boolean
  setShowEnergyAnimation?: (show: boolean) => void
  onSwitchChange?: (active: boolean) => void
}

export default function PremiumInteractiveDemo({
  showInfoPanel,
  setShowInfoPanel,
  containerWidth,
  containerHeight,
  onSwitchChange,
}: PremiumInteractiveDemoProps) {
  const demoRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const {
    inverterActive,
    switchActive,
    setInverterActive,
    setSwitchActive,
  } = useEnergySystemStore()

  // Calculate component positions
  const getComponentPositions = () => {
    // Use a larger scale for better visibility
    const scale = Math.max(0.7, Math.min(containerWidth / 1200, containerHeight / 800))

    // Center the components in the container
    const centerX = containerWidth / 2
    const centerY = containerHeight / 2

    // Position components with proper spacing from center
    const inverterX = centerX - (containerWidth * 0.35) // Move inverter further left
    const switchX = centerX + (containerWidth * 0.25)   // Move switch right of center
    const inverterY = centerY - (containerHeight * 0.40) // Move inverter up even more
    const powerFlowY = centerY                          // Keep power flow at center
    const switchY = centerY                             // Keep switch at center

    return {
      inverterPosition: { x: inverterX, y: inverterY },
      switchPosition: { x: switchX, y: switchY },
      powerFlowStart: { x: inverterX, y: powerFlowY },
      powerFlowEnd: { x: switchX, y: powerFlowY },
      scale,
    }
  }

  const {
    inverterPosition,
    switchPosition,
    powerFlowStart,
    powerFlowEnd,
    scale,
  } = getComponentPositions()

  // Handle inverter activation
  const handleInverterChange = (active: boolean) => {
    setInverterActive(active)
  }

  // Handle switch activation
  const handleSwitchChange = (active: boolean) => {
    setSwitchActive(active)
    if (onSwitchChange) {
      onSwitchChange(active)
    }
  }

  return (
    <div
      ref={demoRef}
      className="relative flex items-center justify-center"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '480px',
        margin: '0 auto',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      {/* Power Flow Animation */}
      <PowerFlowAnimation
        inverterOn={inverterActive}
        inverterPosition={powerFlowStart}
        switchPosition={powerFlowEnd}
        scale={scale}
      />

      {/* Inverter Component */}
      <div
        className="absolute"
        style={{
          left: `${inverterPosition.x}px`,
          top: `${inverterPosition.y}px`,
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        <StaticInverterNode
          position={{ x: 0, y: 0 }}
          inverterOn={inverterActive}
          onInverterChange={handleInverterChange}
          scale={scale}
          key={inverterActive ? 'on' : 'off'}
        />
      </div>

      {/* Switch Component */}
      <div
        className="absolute"
        style={{
          left: `${switchPosition.x}px`,
          top: `${switchPosition.y}px`,
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        <StaticSwitchNode
          position={{ x: 0, y: 0 }}
          switchOn={switchActive}
          onSwitchChange={handleSwitchChange}
          scale={scale * 2}
        />
      </div>
    </div>
  )
}
