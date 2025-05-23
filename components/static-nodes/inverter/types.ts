export interface StaticInverterNodeProps {
  position: { x: number; y: number }
  inverterOn: boolean
  onInverterChange: (value: boolean) => void
  gridConnected?: boolean
  solarConnected?: boolean
  batteryConnected?: boolean
  loadPercentage?: number
  efficiency?: number
  inputVoltage?: number
  outputVoltage?: number
  frequency?: number
  batteryLevel?: number
  batteryCharging?: boolean
  totalEnergyGenerated?: number
  temperature?: number
  fanSpeed?: number
  mode?: "normal" | "pv" | "battery"
  scale?: number
}

export type InverterMode = "normal" | "pv" | "battery"

export interface InverterState {
  gridConnected: boolean
  solarConnected: boolean
  batteryConnected: boolean
  temperature: number
  loadPercentage: number
  efficiency: number
  inputVoltage: number
  outputVoltage: number
  inputFrequency: number
  outputFrequency: number
  batteryLevel: number
  batteryCharging: boolean
  totalEnergyGenerated: number
  fanSpeed: number
  mode: InverterMode
  selectedMode: number
  faultCondition: boolean
  screenActive: boolean
  configMode: boolean
  displayOption: number
  screenBrightness: number
  bootupPhase: number
  hovered: boolean
  showActivatePrompt: boolean
} 