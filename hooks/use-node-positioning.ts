"use client"

import { useState, useEffect, useCallback, useMemo } from "react"

// Fixed positions for nodes in a 1920x1080 viewport
const FIXED_NODE_POSITIONS = {
  inverter: { x: 288, y: 540 }, // 15% of width, 50% of height
  switch: { x: 960, y: 540 }, // 50% of width, 50% of height
  bulb: { x: 1344, y: 540 }, // 70% of width, 50% of height
  greenWord: { x: 1632, y: 540 }, // 85% of width, 50% of height
  droplet: { x: 1920, y: 540 }, // 100% of width, 50% of height
} as const

interface NodePosition {
  x: number
  y: number
}

interface UseNodePositioningResult {
  inverterPosition: NodePosition
  switchPosition: NodePosition
  bulbPosition: NodePosition
  greenWordPosition: NodePosition
  dropletPosition: NodePosition
  containerSize: { width: number; height: number }
}

/**
 * Custom hook to manage node positioning
 * @param containerRef Reference to the container element
 * @returns Object containing calculated positions for all nodes
 */
export function useNodePositioning(containerRef: React.RefObject<HTMLDivElement>): UseNodePositioningResult {
  const [containerSize, setContainerSize] = useState({ width: 1920, height: 1080 })

  // Memoize the scale calculation function
  const calculateScaledPosition = useCallback(
    (position: NodePosition, size: { width: number; height: number }) => ({
      x: (position.x / 1920) * size.width,
      y: (position.y / 1080) * size.height,
    }),
    []
  )

  // Memoize the container size getter
  const getContainerSize = useCallback(() => {
    if (containerRef.current) {
      return {
        width: containerRef.current.clientWidth || window.innerWidth,
        height: containerRef.current.clientHeight || window.innerHeight,
      }
    }
    return { width: window.innerWidth, height: window.innerHeight }
  }, [containerRef])

  // Memoize scaled positions
  const scaledPositions = useMemo(() => {
    return {
      inverterPosition: calculateScaledPosition(FIXED_NODE_POSITIONS.inverter, containerSize),
      switchPosition: calculateScaledPosition(FIXED_NODE_POSITIONS.switch, containerSize),
      bulbPosition: calculateScaledPosition(FIXED_NODE_POSITIONS.bulb, containerSize),
      greenWordPosition: calculateScaledPosition(FIXED_NODE_POSITIONS.greenWord, containerSize),
      dropletPosition: calculateScaledPosition(FIXED_NODE_POSITIONS.droplet, containerSize),
    }
  }, [containerSize, calculateScaledPosition])

  // Update container size on mount and resize
  useEffect(() => {
    const updatePositions = () => {
      setContainerSize(getContainerSize())
    }

    // Initial calculation
    updatePositions()

    // Use ResizeObserver for more efficient resize handling
    const resizeObserver = new ResizeObserver(updatePositions)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Fallback to window resize for older browsers
    window.addEventListener("resize", updatePositions)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updatePositions)
    }
  }, [containerRef, getContainerSize])

  return {
    ...scaledPositions,
    containerSize,
  }
}
