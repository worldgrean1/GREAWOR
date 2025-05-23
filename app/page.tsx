"use client"

import { useState, useEffect, useRef } from "react"
import { useWindowDimensions } from "@/hooks/useWindowDimensions"
import { useEnergySystemStore } from "@/store/energySystemStore"
import PremiumHeader from "@/components/premium/PremiumHeader"
import PremiumInteractiveDemo from "@/components/premium/PremiumInteractiveDemo"
import PremiumBackground from "@/components/premium/PremiumBackground"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import "@/styles/animations.css"
import dynamic from 'next/dynamic'
import { TypingTextAnimation } from "@/components/animations/text/TypingTextAnimation"
import { logError } from "@/utils/error-logging"

// Dynamically import the GreenPage component with SSR disabled
const GreenPage = dynamic(() => import('@/app/green/page'), { ssr: false })

export default function LandingPage() {
  // Local UI state
  const [showInfoPanel, setShowInfoPanel] = useState(false)
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [prevBulbState, setPrevBulbState] = useState(false)
  const [animationCompleted, setAnimationCompleted] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true)
  const [showEnergyAnimation, setShowEnergyAnimation] = useState(false)
  const [powerFlowToEdge, setPowerFlowToEdge] = useState(false)
  const [showGreenPage, setShowGreenPage] = useState(false)
  const [greenPageLoaded, setGreenPageLoaded] = useState(false)
  const [slideOutActive, setSlideOutActive] = useState(false)

  // Refs for interactive components
  const demoRef = useRef<HTMLDivElement>(null)
  const diagramRef = useRef<HTMLDivElement>(null)
  const featureRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Get window dimensions and scroll state
  const { windowHeight, windowWidth, scrolled } = useWindowDimensions()

  // Get energy system state from store
  const { 
    inverterActive, 
    switchActive, 
    showHeroSection, 
    showTagSection,
    setInverterActive,
    setSwitchActive,
    booting
  } = useEnergySystemStore()

  const cardRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)

  useEffect(() => {
    console.log('LandingPage mounted')
  }, [])

  // Track previous bulb state for animations
  useEffect(() => {
    setPrevBulbState(inverterActive)
  }, [inverterActive])

  // Show Green Page in background when inverter is active
  useEffect(() => {
    if (inverterActive) {
      setShowGreenPage(true)
    } else {
      // If the inverter is turned off, reset the slide-out animation
      setSlideOutActive(false)
      setShowGreenPage(false)
    }
  }, [inverterActive])

  // Cycle through feature buttons when switch is active
  useEffect(() => {
    if (!switchActive) {
      setActiveFeature(null)
      return
    }

    const features = ["solarPower", "energyStorage", "smartGrids", "sustainability", "cleanEnergy"]
    let currentIndex = 0

    const interval = setInterval(() => {
      setActiveFeature(features[currentIndex])
      currentIndex = (currentIndex + 1) % features.length
    }, 3000)

    return () => clearInterval(interval)
  }, [switchActive])

  // Apply global styles
  useEffect(() => {
    if (typeof document !== "undefined") {
      const style = document.createElement("style")
      style.innerHTML = `
      /* Custom styles to modify PremiumInteractiveDemo */
      .components-premium-PremiumInteractiveDemo [class*="Power Flow Label"],
      .power-flow-label {
        display: none !important;
      }
      `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [])

  useEffect(() => {
    function updateSize() {
      if (cardRef.current) {
        setContainerWidth(cardRef.current.offsetWidth)
        setContainerHeight(cardRef.current.offsetHeight)
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Add this effect to reset animationCompleted when bulb state changes
  useEffect(() => {
    // Reset animation completion state when bulb is turned off
    if (!inverterActive) {
      setAnimationCompleted(false)
    }
  }, [inverterActive])

  const router = useRouter()

  // Update switch handler to trigger a normal redirect to the /green page when switch is turned ON
  const handleSwitchChange = (active: boolean) => {
    // If switch is turned ON, redirect to the /green page
    if (active && inverterActive) {
      // Navigate to the green page
      router.push('/green');
    }
  }

  // Load green page in background when inverter is activated - keeping preloading for performance
  useEffect(() => {
    if (inverterActive && !greenPageLoaded) {
      // Preload the green page
      const preloadGreenPage = async () => {
        try {
          await import('./green/page');
        } catch (error) {
          logError('Failed to preload green page', error as Error);
        }
      }
      preloadGreenPage()
    }
  }, [inverterActive, greenPageLoaded])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Premium Background Layer */}
      <motion.div
        className="fixed inset-0"
        style={{ zIndex: 5 }}
        animate={{ 
          opacity: slideOutActive ? 0 : 1 
        }}
        transition={{ duration: 0.6 }}
      >
        <PremiumBackground />
      </motion.div>
      
      {/* Main Content Layer */}
      <motion.div 
        className="relative z-10"
        animate={{ 
          x: slideOutActive ? "-100%" : "0%",
          opacity: slideOutActive ? 0 : 1
        }}
        transition={{ 
          type: "spring", 
          stiffness: 80, 
          damping: 20,
          duration: 0.8 
        }}
      >
        <header className="w-full fixed top-0 left-0 z-30">
          <PremiumHeader scrolled={false} />
        </header>
        <main
          className={
            inverterActive
              ? "flex-1 flex flex-col items-center w-full pt-16 pb-8"
              : "flex-1 flex items-center justify-center w-full min-h-screen"
          }
        >
          <motion.div layout className="w-full flex flex-col items-center">
            {/* Spacer for smooth transition */}
            <motion.div
              layout
              animate={{ height: inverterActive && !booting ? 220 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{ width: '100%' }}
            >
              <AnimatePresence>
                {inverterActive && !booting && (
                  <motion.section
                    key="hero-section"
                    layout
                    className="w-full max-w-4xl mx-auto px-4 sm:px-6 mt-16 pt-12 pb-8 mb-10"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{ position: 'absolute', left: 0, right: 0 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2 flex items-center justify-center"
                      >
                        <TypingTextAnimation
                          text="Intelligent Energy Systems"
                          speed="medium"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-10 h-10 ml-2 text-green-500"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                      </h1>
                      <p
                        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-2"
                      >
                        <span className="text-green-400">
                          <TypingTextAnimation
                            text="At GREAN WORLD"
                            speed="medium"
                          />
                        </span> Energy Technology, we don't just sell solar — we
                        deliver intelligent energy systems built for reliability, efficiency, and a{' '}
                        <span className="text-green-400">sustainable future.</span>
                      </p>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              layout
              ref={cardRef}
              className="w-full max-w-4xl mx-auto p-6 sm:p-10 flex flex-col items-center"
              style={{
                minHeight: 480,
                position: inverterActive ? 'relative' : 'static',
                width: '100%',
                maxWidth: '56rem',
              } as React.CSSProperties}
              animate={{
                y: inverterActive ? 0 : 0,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.5,
              }}
              key={Date.now()}
            >
              {containerWidth > 0 && containerHeight > 0 && (
                <PremiumInteractiveDemo
                  showInfoPanel={false}
                  setShowInfoPanel={() => {}}
                  containerWidth={containerWidth}
                  containerHeight={containerHeight}
                  onSwitchChange={handleSwitchChange}
                />
              )}
            </motion.div>
            {/* Contact Section */}
            <div className="w-full max-w-3xl mx-auto mt-8 mb-6">
              <div className="relative backdrop-blur-sm bg-black/10 border border-teal-900/30 shadow-xl rounded-xl p-4 overflow-hidden">
                {/* Background accent elements */}
                <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-teal-600/10"></div>
                <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-teal-600/10"></div>
                
                {/* Section Header */}
                <h2 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-300 mb-3 drop-shadow-lg tracking-tight text-center">
                  Contact GREAN WORLD
                </h2>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* QR Code Column */}
                  <div className="flex flex-col items-center justify-center mb-2 sm:mb-0">
                  <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-600 to-green-600 rounded-lg blur opacity-40 group-hover:opacity-70 transition duration-1000"></div>
                    <img
                      src="/images/qr-greanworld.png"
                      alt="GREAN WORLD QR Code"
                        className="relative w-24 h-24 rounded-lg shadow-lg group-hover:scale-105 transition-all duration-500"
                        style={{ background: 'white' }}
                      />
                    </div>
                    <span className="block mt-1 text-xs text-teal-300/90 font-medium tracking-wide">
                      <motion.span 
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                      >
                        Scan
                      </motion.span>
                    </span>
                  </div>

                  {/* Contact Information Column */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Phone Number */}
                    <motion.div 
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="p-2 rounded-lg border border-teal-900/30 bg-slate-900/50 backdrop-blur-sm flex items-center gap-2 transition-all hover:border-teal-500/50 hover:shadow-md"
                    >
                      <div className="w-8 h-8 rounded-full bg-teal-900/50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                      <div className="min-w-0">
                        <div className="text-[10px] text-teal-400/80 font-medium uppercase tracking-wider">Phone</div>
                        <div className="text-white text-sm font-mono font-bold truncate">+251 913 330000</div>
                  </div>
                    </motion.div>

                  {/* Email */}
                    <motion.div 
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="p-2 rounded-lg border border-teal-900/30 bg-slate-900/50 backdrop-blur-sm flex items-center gap-2 transition-all hover:border-teal-500/50 hover:shadow-md"
                    >
                      <div className="w-8 h-8 rounded-full bg-teal-900/50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] text-teal-400/80 font-medium uppercase tracking-wider">Email</div>
                        <div className="text-white text-sm font-mono font-bold truncate">info@greanworld.com</div>
                      </div>
                    </motion.div>

                    {/* Location */}
                    <motion.div 
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="p-2 rounded-lg border border-teal-900/30 bg-slate-900/50 backdrop-blur-sm flex items-center gap-2 transition-all hover:border-teal-500/50 hover:shadow-md"
                    >
                      <div className="w-8 h-8 rounded-full bg-teal-900/50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] text-teal-400/80 font-medium uppercase tracking-wider">Address</div>
                        <div className="text-white text-sm font-medium truncate">Addis Ababa, Ethiopia</div>
                      </div>
                    </motion.div>

                    {/* Social Media Links */}
                    <div className="flex items-center justify-around sm:justify-start sm:space-x-3 p-2">
                      <motion.a 
                        href="#" 
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="w-7 h-7 rounded-full bg-teal-900/30 flex items-center justify-center hover:bg-teal-800/50 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-teal-300" viewBox="0 0 16 16">
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                        </svg>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="w-7 h-7 rounded-full bg-teal-900/30 flex items-center justify-center hover:bg-teal-800/50 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-teal-300" viewBox="0 0 16 16">
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                        </svg>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="w-7 h-7 rounded-full bg-teal-900/30 flex items-center justify-center hover:bg-teal-800/50 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-teal-300" viewBox="0 0 16 16">
                          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                        </svg>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="w-7 h-7 rounded-full bg-teal-900/30 flex items-center justify-center hover:bg-teal-800/50 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-teal-300" viewBox="0 0 16 16">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </motion.div>
    </div>
  )
}
