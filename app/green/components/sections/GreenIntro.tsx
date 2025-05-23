"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Phone, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GreenBackgroundAnimation } from "@/components/animations/background/GreenBackgroundAnimation"
import { AnimatedBlobBackground } from "@/components/animations/background/AnimatedBlobBackground"
import { TypingTextAnimation } from "@/components/animations/text/TypingTextAnimation"
import { motion, useReducedMotion } from "framer-motion"
import Image from 'next/image'

export default function GreenIntro() {
  const [splineLoaded, setSplineLoaded] = useState(false)
  const [greanWorldVisible, setGreanWorldVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [onContentReady, setOnContentReady] = useState<() => void | undefined>()
  const prefersReducedMotion = useReducedMotion();

  // Detect client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Simulate loading progress - moved to useEffect to prevent hydration mismatch
    if (prefersReducedMotion) {
      setLoadingProgress(100);
      setLoadingComplete(true);
      return;
    }
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  useEffect(() => {
    // If loading progress is complete, wait a moment then transition out the overlay
    if (loadingProgress === 100) {
      if (prefersReducedMotion) {
        setLoadingComplete(true);
        return;
      }
      const timer = setTimeout(() => {
        setLoadingComplete(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [loadingProgress, prefersReducedMotion])

  useEffect(() => {
    // If Spline is loaded, then show content after a short delay
    if (splineLoaded) {
      const contentTimer = setTimeout(() => {
        setContentVisible(true)
      }, 500)
      
      return () => clearTimeout(contentTimer)
    }
  }, [splineLoaded])

  useEffect(() => {
    // Only show GREAN WORLD text after content is visible
    if (contentVisible) {
    const textTimer = setTimeout(() => {
      setGreanWorldVisible(true)
      }, 500)
      
      return () => clearTimeout(textTimer)
    }
  }, [contentVisible])

  // Animation variants for the loading elements
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const hexagonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  // Track loading and content visibility state without console logs
  useEffect(() => {
    if (contentVisible && loadingComplete) {
      // Content is ready and visible - trigger any necessary actions
      onContentReady?.();
    }
  }, [contentVisible, loadingComplete, onContentReady]);

  return (
    <section
      id="green-intro"
      className="relative h-screen w-full overflow-hidden mb-0 pb-10"
      style={{ 
        background: "#000000",
        transition: "background 0.5s ease-in-out",
        position: "relative",
        zIndex: 1
      }}
    >
      {/* Loading Overlay - only covers background, not whole viewport, and skips if reduced motion */}
      {!loadingComplete && !prefersReducedMotion && (
        <motion.div 
          className="absolute inset-0 z-10 bg-black/80 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: loadingComplete ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ pointerEvents: loadingComplete ? "none" : "auto" }}
        >
          {/* SVG Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-40">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <defs>
                <pattern
                  id="grid-pattern"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#3DD56D"
                    strokeWidth="0.8"
                    opacity="0.5"
                  />
                </pattern>
                
                <pattern
                  id="hex-pattern"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(30)"
                >
                  <polygon
                    points="30,0 55,15 55,45 30,60 5,45 5,15"
                    fill="none"
                    stroke="#3DD56D"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                </pattern>
                
                <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="#3DD56D" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {/* Base grid pattern */}
              <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-pattern)" />
              
              {/* Hexagon overlay pattern */}
              <rect x="0" y="0" width="100%" height="100%" fill="url(#hex-pattern)" />
              
              {/* Center glow effect */}
              <circle cx="50%" cy="50%" r="40%" fill="url(#glow)" />
              
              {/* Energy lines - only render on client side */}
              {isClient && (
                <g className="energy-lines">
                  {[...Array(12)].map((_, i) => {
                    // Pre-calculate coordinates with fixed precision to avoid hydration mismatch
                    const angle = i * Math.PI / 6;
                    const endX = (50 + 45 * Math.cos(angle)).toFixed(6);
                    const endY = (50 + 45 * Math.sin(angle)).toFixed(6);
                    
                    return (
                      <motion.line
                        key={`line-${i}`}
                        x1="50%"
                        y1="50%"
                        x2={`${endX}%`}
                        y2={`${endY}%`}
                        stroke="#3DD56D"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: [0, 1, 0],
                          opacity: [0, 0.9, 0]
                        }}
                        transition={{
                          duration: 4,
                          delay: i * 0.3,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      />
                    );
                  })}
                </g>
              )}
            </svg>
          </div>
          {/* GREAN WORLD Logo and Title */}
          <div className="relative z-10 flex flex-col items-center justify-center mb-8">
            <div className="w-24 h-24 mb-4 flex items-center justify-center">
              <Image
                src="/images/grean-logo-icon.png"
                alt="GREAN WORLD Logo"
                width={96}
                height={96}
                className="object-contain logo-spin"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#ffffff] via-[#3DD56D] to-[#2bb757] bg-clip-text text-transparent text-center drop-shadow-glow mb-2">
              GREAN WORLD
            </h1>
            <p className="text-lg text-[#3DD56D] font-medium text-center mb-2">Loading sustainable energy solutions...</p>
          </div>
          {/* Loading Progress Bar */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-[#3DD56D] to-[#2bb757]" style={{ width: `${loadingProgress}%`, transition: 'width 0.3s' }} />
            </div>
            <span className="text-[#3DD56D] text-sm font-medium">Loading... {loadingProgress}%</span>
          </div>
        </motion.div>
      )}
      {/* Main Content - always rendered, but secondary elements animate in after loadingComplete */}
      <div className={`relative z-20 transition-opacity duration-700 ${loadingComplete || prefersReducedMotion ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Spline 3D Background - Only element shown by default */}
        <div style={{ 
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          transition: 'opacity 0.5s ease-in-out',
          opacity: loadingComplete ? 1 : 0,
        }}>
          <iframe 
            src='https://my.spline.design/lightningbulb-y5xHAcgz5Y5XycvkpgJ9zO94/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            title="Spline Lightning Bulb"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              background: "transparent",
              zIndex: 2
            }}
            onLoad={() => setSplineLoaded(true)}
          />
        </div>

        {/* Background animations with controlled opacity and positioning */}
        <div 
          className="absolute inset-0 z-5"
          style={{
            opacity: splineLoaded && loadingComplete ? 0.5 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <GreenBackgroundAnimation intensity="low" />
        </div>
        
        <div 
          className="absolute inset-0 z-1"
          style={{
            opacity: splineLoaded && loadingComplete ? 0.3 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <AnimatedBlobBackground />
        </div>

        {/* Energy Pattern Overlay */}
        <motion.div
          className="absolute inset-0"
          style={{ 
            zIndex: 20,
            pointerEvents: 'none',
            mixBlendMode: 'overlay'
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: splineLoaded && loadingComplete ? 0.7 : 0 
          }}
          transition={{ duration: 1.2 }}
        >
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            style={{ filter: 'drop-shadow(0 0 15px rgba(61, 213, 109, 0.3))' }}
          >
            <defs>
              {/* Circuit Pattern */}
              <pattern
                id="green-circuit-pattern"
                x="0"
                y="0"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <path
                  d="M5,25 L20,25 M30,25 L45,25 M25,5 L25,20 M25,30 L25,45"
                  stroke="#3DD56D"
                  strokeWidth="1.2"
                  fill="none"
                  strokeOpacity="0.8"
                />
                <circle cx="25" cy="25" r="2" fill="#3DD56D" fillOpacity="0.6" />
                <circle cx="25" cy="25" r="1" fill="#3DD56D" fillOpacity="0.8" />
              </pattern>

              {/* Energy Wave Pattern */}
              <pattern
                id="green-wave-pattern"
                x="0"
                y="0"
                width="100"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,25 Q25,10 50,25 T100,25"
                  stroke="#3DD56D"
                  strokeWidth="1"
                  fill="none"
                  strokeOpacity="0.6"
                  strokeDasharray="2,4"
                />
              </pattern>

              {/* Radial Gradient for Energy Points */}
              <radialGradient id="green-energy-point" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3DD56D" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3DD56D" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Base Layer - Circuit Pattern */}
            <rect width="100%" height="100%" fill="url(#green-circuit-pattern)" />
            
            {/* Middle Layer - Wave Pattern */}
            <rect width="100%" height="100%" fill="url(#green-wave-pattern)" opacity="0.5" />
            
            {/* Energy Points */}
            <g className="energy-points">
              {[...Array(8)].map((_, i) => {
                const x = 15 + (i * 70);
                const y = 30 + (i % 2) * 40;
                return (
                  <motion.circle
                    key={`energy-point-${i}`}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="15"
                    fill="url(#green-energy-point)"
                    initial={{ opacity: 0.3 }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                );
              })}
            </g>
          </svg>
        </motion.div>
        
        {/* QR Code and Contact Overlay - only visible after content loads */}
        {contentVisible && loadingComplete && (
        <div 
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 40,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            padding: '8px 12px',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
              pointerEvents: 'none',
              opacity: 0,
              animation: 'fadeIn 0.5s forwards',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Phone size={14} className="text-[#2bb757]" />
            <span style={{
              color: '#2bb757',
              fontSize: '14px',
              fontWeight: 600,
              pointerEvents: 'auto'
            }}>
              (+251) 913 330000
            </span>
          </div>
          <div style={{
            width: '2px',
            height: '20px',
            background: 'rgba(43, 183, 87, 0.2)',
            margin: '0 4px'
          }} />
          <img 
            src="/images/qr-greanworld.png"
            alt="GREAN WORLD QR"
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'contain'
            }}
          />
        </div>
        )}

        {/* Main content with fade-in effect - only visible after content is enabled */}
        {contentVisible && loadingComplete && (
          <div 
            className="relative z-30 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pointer-events-none"
            style={{
              opacity: 0,
              animation: 'fadeIn 0.8s forwards',
            }}
          >
              <div className="text-center max-w-4xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium mb-6 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/30 shadow-lg backdrop-blur-sm"
                >
                  <span className="mr-2 opacity-70">✦</span>
                  Welcome to
                  <span className="ml-2 opacity-70">✦</span>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-10 leading-tight text-gray-200 flex items-center justify-center overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="relative">
                    <TypingTextAnimation
                      key={`grean-world-${contentVisible}-${loadingComplete}`}
                      text="GREAN WORLD"
                      speed="medium"
                      className="bg-gradient-to-r from-gray-200 via-[#3DD56D] to-[#2bb757] bg-clip-text text-transparent inline-block tracking-tight drop-shadow-sm"
                    />
                    <motion.div 
                      className="absolute -inset-1 blur-lg bg-gradient-to-r from-[#3DD56D]/10 to-[#2bb757]/5 rounded-full z-[-1]" 
                      animate={{ 
                        opacity: [0.3, 0.7, 0.3], 
                        scale: [1, 1.05, 1] 
                      }}
                      transition={{ duration: 6, repeat: Infinity }}
                    />
                  </div>
                </motion.h1>
                
                <motion.div 
                  className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <div className="relative inline-block">
                    <TypingTextAnimation
                      key={`typing-animation-${contentVisible}-${loadingComplete}`}
                      text="Empowering Ethiopia's energy transition with sustainable solutions"
                      speed="medium"
                      className="font-medium tracking-wide text-[#0B5E2B]"
                    />
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#3DD56D]/40 to-transparent"
                      initial={{ width: "0%", x: "-50%" }}
                      animate={{ width: "100%", x: "0%" }}
                      transition={{ delay: 3, duration: 1.5 }}
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center pointer-events-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3DD56D] to-[#2bb757] rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-500"></div>
                    <Button
                      size="lg"
                      className="relative bg-gradient-to-br from-[#3DD56D] to-[#2bb757] hover:from-[#2bb757] hover:to-[#3DD56D] text-black font-bold px-10 py-7 rounded-full transition-all duration-300 shadow-xl shadow-[#3DD56D]/20"
                    >
                      <span className="drop-shadow-sm">Explore Solutions</span>
                      <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3DD56D]/20 to-[#2bb757]/20 rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-500"></div>
                    <Button
                      size="lg"
                      variant="outline"
                      className="relative border-[#3DD56D] text-[#3DD56D] hover:bg-[#3DD56D]/10 font-bold px-10 py-7 rounded-full transition-all duration-300 shadow-xl backdrop-blur-sm"
                    >
                      <span className="relative">
                        Contact Us
                        <motion.span
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#3DD56D] to-transparent"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        @keyframes logo-spin-keyframes {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .logo-spin {
          animation: logo-spin-keyframes 3s linear infinite;
        }

        .drop-shadow-glow {
          filter: drop-shadow(0 0 4px rgba(61, 213, 109, 0.8));
        }
      `}</style>
    </section>
  )
} 