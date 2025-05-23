"use client"

import { create } from "zustand"

interface EnergySystemState {
  // Component states
  inverterActive: boolean
  switchActive: boolean
  showHeroSection: boolean
  showTagSection: boolean
  booting: boolean

  // Animation and metrics
  animationPhase: number
  energySaved: number
  co2Reduced: number

  // State update functions
  setInverterActive: (active: boolean) => void
  setSwitchActive: (active: boolean) => void
  setShowHeroSection: (show: boolean) => void
  setShowTagSection: (show: boolean) => void
  setAnimationPhase: (phase: number) => void
  incrementEnergySaved: () => void
  incrementCo2Reduced: () => void
  setBooting: (booting: boolean) => void

  // Utility functions
  activateFullSystem: () => void
  deactivateFullSystem: () => void
}

export const useEnergySystemStore = create<EnergySystemState>((set, get) => ({
  // Initial states
  inverterActive: false,
  switchActive: false,
  showHeroSection: true,
  showTagSection: true,
  booting: false,
  animationPhase: 0,
  energySaved: 0,
  co2Reduced: 0,

  // Core state update functions
  setInverterActive: (active) =>
    set((state) => ({
      ...state,
      inverterActive: active,
      switchActive: active ? state.switchActive : false,
      showHeroSection: active,
      showTagSection: active,
      animationPhase: active ? 1 : 0, // Animation phase depends only on inverter state
    })),

  setSwitchActive: (active) =>
    set((state) => {
      // Only allow switch activation if inverter is active
      if (!state.inverterActive) {
        return state
      }
      // Maintain animation phase regardless of switch state
      return {
        ...state,
        switchActive: active
      }
    }),

  setShowHeroSection: (show) =>
    set((state) => ({
      ...state,
      showHeroSection: show,
    })),

  setShowTagSection: (show) =>
    set((state) => ({
      ...state,
      showTagSection: show,
    })),

  setAnimationPhase: (phase) => set((state) => ({ ...state, animationPhase: phase })),

  incrementEnergySaved: () =>
    set((state) => ({ ...state, energySaved: state.energySaved + 0.05 })),

  incrementCo2Reduced: () =>
    set((state) => ({ ...state, co2Reduced: state.co2Reduced + 0.02 })),

  setBooting: (booting) => set((state) => ({ ...state, booting })),

  // Utility functions
  activateFullSystem: () =>
    set((state) => ({
      ...state,
      inverterActive: true,
      switchActive: true,
      showHeroSection: true,
      showTagSection: true,
      animationPhase: 1,
    })),

  deactivateFullSystem: () =>
    set((state) => ({
      ...state,
      inverterActive: false,
      switchActive: false,
      showHeroSection: false,
      showTagSection: false,
      animationPhase: 0,
    })),
}))
