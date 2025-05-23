"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TypingTextAnimation } from "@/components/animations/text/TypingTextAnimation"

export default function AnimationTestPage() {
  const [version, setVersion] = useState(0)
  const [speed, setSpeed] = useState<"slow" | "medium" | "fast">("medium")
  const [visible, setVisible] = useState(true)

  // Force remount by updating version
  const restartAnimation = () => {
    setVersion(prev => prev + 1)
  }

  // Toggle animation visibility
  const toggleVisibility = () => {
    setVisible(prev => !prev)
  }

  // Change animation speed
  const cycleSpeed = () => {
    setSpeed(prev => {
      switch (prev) {
        case "slow": return "medium"
        case "medium": return "fast"
        case "fast": return "slow"
        default: return "medium"
      }
    })
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-12">Animation Testing Page</h1>
      
      <div className="flex flex-col items-center gap-8 max-w-2xl">
        {/* Test 1: Basic Animation */}
        <div className="w-full p-6 bg-slate-800 rounded-lg">
          <h2 className="text-xl text-white mb-4">Basic Animation:</h2>
          <div className="h-16 flex items-center">
            <TypingTextAnimation 
              key={`basic-${version}`}
              text="This is a basic typing animation test"
              speed={speed}
              className="text-xl text-green-400"
            />
          </div>
        </div>
        
        {/* Test 2: Toggling Visibility */}
        <div className="w-full p-6 bg-slate-800 rounded-lg">
          <h2 className="text-xl text-white mb-4">Visibility Toggle Test:</h2>
          <div className="h-16 flex items-center">
            {visible && (
              <TypingTextAnimation
                key={`visibility-${version}`}
                text="This text should restart when it becomes visible again"
                speed={speed}
                className="text-xl text-blue-400"
              />
            )}
          </div>
        </div>
        
        {/* Test 3: GREANWORLD Logo Style */}
        <div className="w-full p-6 bg-slate-800 rounded-lg">
          <h2 className="text-xl text-white mb-4">Hero Text Style:</h2>
          <div className="text-center my-6">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-6 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20">
              Welcome to
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-200 to-gray-200/80 bg-clip-text text-transparent inline-block">
                GREAN
              </span>{" "}
              <span className="bg-gradient-to-r from-[#3DD56D] to-[#2bb757] bg-clip-text text-transparent inline-block">
                WORLD
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              <TypingTextAnimation
                key={`hero-${version}`}
                text="Empowering Ethiopia's energy transition with sustainable solutions"
                speed={speed}
              />
            </p>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex gap-4 mt-8">
          <Button onClick={restartAnimation} className="bg-blue-600 hover:bg-blue-700">
            Restart Animation
          </Button>
          <Button onClick={toggleVisibility} className="bg-purple-600 hover:bg-purple-700">
            {visible ? "Hide" : "Show"} Text
          </Button>
          <Button onClick={cycleSpeed} className="bg-green-600 hover:bg-green-700">
            Speed: {speed}
          </Button>
        </div>
        
        {/* Debug Info */}
        <div className="text-gray-400 text-sm">
          <p>Version: {version}</p>
          <p>Speed: {speed}</p>
          <p>Visible: {visible.toString()}</p>
        </div>
      </div>
    </div>
  )
}