"use client"

import { useEffect, type MutableRefObject } from "react"
import { SunMedium, Battery, Zap, Leaf, Wind } from "lucide-react"

interface FeatureButtonsProps {
  switchActive: boolean
  activeFeature: string | null
  setActiveFeature: (feature: string | null) => void
  featureRefs: MutableRefObject<{ [key: string]: HTMLDivElement | null }>
}

export default function FeatureButtons({
  switchActive,
  activeFeature,
  setActiveFeature,
  featureRefs,
}: FeatureButtonsProps) {
  // Feature buttons data
  const featureButtons = [
    {
      id: "solarPower",
      icon: <SunMedium className="h-5 w-5" />,
      text: "Solar Power",
    },
    {
      id: "energyStorage",
      icon: <Battery className="h-5 w-5" />,
      text: "Energy Storage",
    },
    {
      id: "smartGrids",
      icon: <Zap className="h-5 w-5" />,
      text: "Smart Grids",
    },
    {
      id: "sustainability",
      icon: <Leaf className="h-5 w-5" />,
      text: "Sustainability",
    },
    {
      id: "cleanEnergy",
      icon: <Wind className="h-5 w-5" />,
      text: "Clean Energy",
    },
  ]

  // Create energy flow particles for feature buttons
  useEffect(() => {
    if (!switchActive || !activeFeature || !featureRefs.current[activeFeature]) return

    const buttonElement = featureRefs.current[activeFeature]
    if (!buttonElement) return

    const createEnergyParticle = () => {
      const particle = document.createElement("div")
      particle.classList.add("energy-particle")
      particle.style.pointerEvents = "none"

      const rect = buttonElement.getBoundingClientRect()

      // Random position along the button
      const startX = Math.random() * rect.width
      const startY = Math.random() * rect.height

      particle.style.left = `${startX}px`
      particle.style.top = `${startY}px`
      particle.style.setProperty("--x-offset", `${Math.random() * 20 - 10}px`)

      // Random size
      const size = Math.random() * 2 + 1
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random opacity
      particle.style.opacity = (Math.random() * 0.5 + 0.5).toString()

      buttonElement.appendChild(particle)

      // Animate the particle
      const animation = particle.animate(
        [
          { opacity: 1, transform: "translateY(0) translateX(0)" },
          { opacity: 0, transform: `translateY(-${rect.height}px) translateX(${Math.random() * 20 - 10}px)` },
        ],
        {
          duration: Math.random() * 1000 + 500,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
      )

      animation.onfinish = () => {
        particle.remove()
      }
    }

    const particleInterval = setInterval(createEnergyParticle, 50)

    return () => {
      clearInterval(particleInterval)
      if (buttonElement) {
        const particles = buttonElement.querySelectorAll(".energy-particle")
        particles.forEach((p) => p.remove())
      }
    }
  }, [switchActive, activeFeature, featureRefs])

  return (
    <section className="py-3 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          {featureButtons.map((button) => (
            <div
              key={button.id}
              ref={(el) => { featureRefs.current[button.id] = el; }}
              className={`relative overflow-hidden rounded-full border border-green-500 px-4 py-2 flex items-center gap-2 ${
                activeFeature === button.id && switchActive
                  ? "bg-green-500/20"
                  : "bg-transparent hover:bg-green-500/10"
              }`}
              onClick={() => switchActive && setActiveFeature(button.id)}
            >
              <span className="text-green-400">
                {button.icon}
              </span>
              <span
                className={`text-sm font-medium ${
                  activeFeature === button.id && switchActive ? "text-white" : "text-green-400"
                }`}
              >
                {button.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
