// Define fixed positions for all nodes in the application
// These coordinates are based on a 1920x1080 reference viewport
// The actual rendering will scale these positions proportionally

export interface NodePosition {
  x: number
  y: number
}

export interface NodePositions {
  inverter: NodePosition
  switch: NodePosition
  bulb: NodePosition
  greenWord: NodePosition
  droplet: NodePosition // Central droplet element
}

// Fixed positions based on the provided design
export const FIXED_NODE_POSITIONS: NodePositions = {
  inverter: {
    x: 440, // Position matching #CleanEnergy hashtag (left-most hashtag)
    y: 830, // Bottom area where hashtags are located
  },
  switch: {
    x: 975, // Right side position
    y: 595, // Bottom area position
  },
  bulb: {
    x: 780, // Right of center
    y: 245, // Near the top
  },
  greenWord: {
    x: 920, // Top right area
    y: 155, // Near the top
  },
  droplet: {
    x: 615, // Center of page
    y: 635, // Middle-bottom area
  },
}

// Reference viewport dimensions
export const REFERENCE_VIEWPORT = {
  width: 1920,
  height: 1080,
}

/**
 * Calculates the scaled position based on current viewport dimensions
 * @param position Original fixed position
 * @param currentViewport Current viewport dimensions
 * @returns Scaled position that maintains the same relative position
 */
export function calculateScaledPosition(
  position: NodePosition,
  currentViewport: { width: number; height: number },
): NodePosition {
  const widthRatio = currentViewport.width / REFERENCE_VIEWPORT.width
  const heightRatio = currentViewport.height / REFERENCE_VIEWPORT.height

  return {
    x: position.x * widthRatio,
    y: position.y * heightRatio,
  }
}
