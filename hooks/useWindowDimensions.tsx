"use client"

import { useState, useEffect } from "react"

export function useWindowDimensions() {
  const [windowHeight, setWindowHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // Set initial values
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return { windowHeight, windowWidth, scrolled }
}
