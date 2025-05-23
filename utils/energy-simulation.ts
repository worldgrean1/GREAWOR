/**
 * Energy System Simulation
 *
 * This module provides a clean implementation of the energy system simulation
 * that can be integrated with existing UI components without affecting their appearance.
 */

import { create } from "zustand"

// Define the energy system state interface
export interface EnergySystemState {
  // Component states
  inverterActive: boolean
  switchActive: boolean
  bulbActive: boolean
  wordActive: boolean
  prevBulbActive: boolean

  // Animation and metrics
  animationPhase: number
  energySaved: number
  co2Reduced: number

  // State update functions
  setInverterActive: (active: boolean) => void
  setSwitchActive: (active: boolean) => void
  setBulbActive: (active: boolean) => void
  setWordActive: (active: boolean) => void
  setAnimationPhase: (phase: number) => void
  incrementEnergySaved: () => void
  incrementCo2Reduced: () => void

  // Utility functions
  activateFullSystem: () => void
  deactivateFullSystem: () => void
  toggleInverter: () => void
  toggleSwitch: () => void
}

// Create the energy system store
export const useEnergySystemStore = create<EnergySystemState>((set, get) => ({
  // Initial states
  inverterActive: false,
  switchActive: false,
  bulbActive: false,
  wordActive: false,
  prevBulbActive: false,
  animationPhase: 0,
  energySaved: 0,
  co2Reduced: 0,

  // Core state update functions
  setInverterActive: (active) =>
    set((state) => {
      // If turning off the inverter, turn off all other components
      if (!active) {
        return {
          inverterActive: false,
          switchActive: false,
          bulbActive: false,
          wordActive: false,
          prevBulbActive: state.bulbActive,
          animationPhase: 0,
          energySaved: state.energySaved,
          co2Reduced: state.co2Reduced,
        }
      }
      return {
        ...state,
        inverterActive: active,
        animationPhase: 1,
      }
    }),

  setSwitchActive: (active) =>
    set((state) => {
      // Only allow switch activation if inverter is on
      if (!state.inverterActive) return state

      // Store previous bulb state
      const prevBulbActive = state.bulbActive

      if (active) {
        // When switch is activated, only update switch state
        // The component will handle the cascading effects
        return {
          ...state,
          switchActive: active,
          prevBulbActive,
        }
      } else {
        // When switch is deactivated, turn off bulb and word immediately
        return {
          ...state,
          switchActive: false,
          bulbActive: false,
          wordActive: false,
          prevBulbActive,
        }
      }
    }),

  setBulbActive: (active) =>
    set((state) => ({
      ...state,
      bulbActive: active,
      prevBulbActive: state.bulbActive,
    })),

  setWordActive: (active) =>
    set((state) => ({
      ...state,
      wordActive: active,
    })),

  setAnimationPhase: (phase) =>
    set((state) => ({
      ...state,
      animationPhase: phase,
    })),

  incrementEnergySaved: () =>
    set((state) => ({
      ...state,
      energySaved: state.energySaved + Math.random() * 0.05,
    })),

  incrementCo2Reduced: () =>
    set((state) => ({
      ...state,
      co2Reduced: state.co2Reduced + Math.random() * 0.02,
    })),

  // Utility functions for easier control
  activateFullSystem: () => {
    const { setInverterActive, setSwitchActive, setBulbActive, setWordActive } = get()
    setInverterActive(true)
    setTimeout(() => {
      setSwitchActive(true)
      setTimeout(() => {
        setBulbActive(true)
        setTimeout(() => {
          setWordActive(true)
        }, 300)
      }, 200)
    }, 500)
  },

  deactivateFullSystem: () => {
    const { setInverterActive } = get()
    setInverterActive(false)
  },

  toggleInverter: () => {
    const { inverterActive, setInverterActive } = get()
    setInverterActive(!inverterActive)
  },

  toggleSwitch: () => {
    const { switchActive, setSwitchActive } = get()
    setSwitchActive(!switchActive)
  },
}))

/**
 * Energy System Controller
 *
 * This class provides a more object-oriented approach to controlling
 * the energy system simulation.
 */
export class EnergySystemController {
  private store = useEnergySystemStore

  // Get current state
  get state() {
    return this.store.getState()
  }

  // Component activation methods
  activateInverter() {
    this.store.getState().setInverterActive(true)
    return this
  }

  deactivateInverter() {
    this.store.getState().setInverterActive(false)
    return this
  }

  activateSwitch() {
    this.store.getState().setSwitchActive(true)
    return this
  }

  deactivateSwitch() {
    this.store.getState().setSwitchActive(false)
    return this
  }

  activateBulb() {
    this.store.getState().setBulbActive(true)
    return this
  }

  deactivateBulb() {
    this.store.getState().setBulbActive(false)
    return this
  }

  activateWord() {
    this.store.getState().setWordActive(true)
    return this
  }

  deactivateWord() {
    this.store.getState().setWordActive(false)
    return this
  }

  // Full system control
  activateFullSystem() {
    this.store.getState().activateFullSystem()
    return this
  }

  deactivateFullSystem() {
    this.store.getState().deactivateFullSystem()
    return this
  }

  // Metrics
  startMetricsTracking(intervalMs = 1000) {
    const { incrementEnergySaved, incrementCo2Reduced } = this.store.getState()

    const intervalId = setInterval(() => {
      if (this.state.inverterActive) {
        incrementEnergySaved()
        incrementCo2Reduced()
      }
    }, intervalMs)

    return () => clearInterval(intervalId) // Return cleanup function
  }
}

// Create a singleton instance for easy import
export const energySystem = new EnergySystemController()
