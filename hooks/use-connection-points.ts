"use client"

import { useEffect, useState } from "react"

// This hook helps track and manage connection points in the DOM
export function useConnectionPoints() {
  const [connectionPoints, setConnectionPoints] = useState<Record<string, { x: number; y: number }>>({})

  // Find all connection points in the DOM and store their positions
  const updateConnectionPoints = () => {
    const points: Record<string, { x: number; y: number }> = {}
    const elements = document.querySelectorAll('[data-connection-point="true"]')

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      const id = element.getAttribute("data-handle-id") || ""

      if (id) {
        points[id] = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }
      }
    })

    setConnectionPoints(points)
  }

  // Update connection points on mount and window resize
  useEffect(() => {
    updateConnectionPoints()

    // Update on resize to ensure positions are accurate
    window.addEventListener("resize", updateConnectionPoints)

    // Update periodically to catch any dynamic changes
    const interval = setInterval(updateConnectionPoints, 1000)

    return () => {
      window.removeEventListener("resize", updateConnectionPoints)
      clearInterval(interval)
    }
  }, [])

  return {
    connectionPoints,
    updateConnectionPoints,
    setConnectionPoints, // Add this line to export the setter function
  }
}
