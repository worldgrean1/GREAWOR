"use client"

/**
 * Energy Simulation Hook
 *
 * This hook provides a convenient way to use the energy system simulation
 * in React components with automatic cleanup and timing effects.
 */

import { useEffect, useCallback } from "react"
import { useEnergySystemStore, EnergySystemController } from "../utils/energy-simulation"

interface UseEnergySimulationOptions {
  autoCleanup?: boolean
  trackMetrics?: boolean
  metricsInterval?: number
  enableCascadingEffects?: boolean
}

export function useEnergySimulation(options: UseEnergySimulationOptions = {}) {
  const { autoCleanup = true, trackMetrics = true, metricsInterval = 1000, enableCascadingEffects = true } = options

  // Get state and actions from the store
  const {
    inverterActive,
    switchActive,
    bulbActive,
    wordActive,
    prevBulbActive,
    animationPhase,
    energySaved,
    co2Reduced,
    setInverterActive,
    setSwitchActive,
    setBulbActive,
    setWordActive,
    incrementEnergySaved,
    incrementCo2Reduced,
  } = useEnergySystemStore()

  // Handle inverter activation
  const handleInverterChange = useCallback(
    (active: boolean) => {
      setInverterActive(active)
    },
    [setInverterActive],
  )

  // Handle switch activation with cascading effects
  const handleSwitchChange = useCallback(
    (active: boolean) => {
      setSwitchActive(active)

      // Implement cascading effects if enabled
      if (enableCascadingEffects) {
        if (active && inverterActive) {
          // Add a slight delay before turning on the bulb
          setTimeout(() => {
            setBulbActive(true)

            // Add a slight delay before illuminating the word
            setTimeout(() => {
              setWordActive(true)
            }, 300)
          }, 200)
        } else {
          // When switch is deactivated, turn off bulb and word
          setBulbActive(false)
          setWordActive(false)
        }
      }
    },
    [inverterActive, setBulbActive, setSwitchActive, setWordActive, enableCascadingEffects],
  )

  // Create controller instance for more complex operations
  const controller = new EnergySystemController()

  // Set up metrics tracking if enabled
  useEffect(() => {
    if (trackMetrics) {
      const cleanup = controller.startMetricsTracking(metricsInterval)
      return cleanup
    }
  }, [trackMetrics, metricsInterval, controller])

  // Clean up on unmount if autoCleanup is enabled
  useEffect(() => {
    if (autoCleanup) {
      return () => {
        // Reset system state when component unmounts
        setInverterActive(false)
      }
    }
  }, [autoCleanup, setInverterActive])

  // Return all the state and handlers
  return {
    // State
    inverterActive,
    switchActive,
    bulbActive,
    wordActive,
    prevBulbActive,
    animationPhase,
    energySaved,
    co2Reduced,

    // Handlers
    handleInverterChange,
    handleSwitchChange,
    setBulbActive,
    setWordActive,

    // Direct access to controller for advanced usage
    controller,

    // Utility functions
    activateFullSystem: controller.activateFullSystem.bind(controller),
    deactivateFullSystem: controller.deactivateFullSystem.bind(controller),
  }
}
