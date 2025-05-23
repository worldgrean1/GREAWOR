"use client"

import { Shield, Users, Clock, Target, TrendingUp, Globe, Award, Handshake, Lightbulb, CheckCircle } from "lucide-react"
import { motion, useReducedMotion, HTMLMotionProps, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef, useMemo, memo } from "react"
import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'
import type { CSSProperties } from 'react'
import { OptimizedBackground, cardPatternStyle } from '../shared/OptimizedBackground'

// Type declarations for lazy-loaded components
interface ImpactSectionProps {}

// Performance monitoring hook
const usePerformanceMonitor = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let lowPerformanceCount = 0
    
    const checkPerformance = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount
        if (fps < 30) {
          lowPerformanceCount++
          if (lowPerformanceCount >= 3) {
            setIsLowPerformance(true)
          }
        } else {
          lowPerformanceCount = 0
        }
        frameCount = 0
        lastTime = currentTime
      }
      
      if (!isLowPerformance) {
        requestAnimationFrame(checkPerformance)
      }
    }
    
    checkPerformance()
  }, [isLowPerformance])

  return isLowPerformance
}

// Optimized typewriter hook
function useTypewriter(words: string[], speed = 70, pause = 1200) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [blink, setBlink] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), pause)
      return
    }
    if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1))
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [subIndex, index, deleting, words, speed, pause, isVisible])

  useEffect(() => {
    if (!isVisible) return
    const blinkInterval = setInterval(() => setBlink((v) => !v), 500)
    return () => clearInterval(blinkInterval)
  }, [isVisible])

  return { text: `${words[index].substring(0, subIndex)}${blink ? '|' : ' '}`, ref }
}

// SVG pattern as a data URI for better performance
const trianglePatternSvg = `
  <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,0 L20,40 L40,0 Z" fill="#3DD56D" fill-opacity="0.08"/>
  </svg>
`;

const encodedSvg = encodeURIComponent(trianglePatternSvg);
const backgroundPattern = `url("data:image/svg+xml,${encodedSvg}")`;

// Card-specific pattern with smaller triangles for the About card
const cardPatternSvg = `
  <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,0 L15,30 L30,0 Z" fill="#3DD56D" fill-opacity="0.05"/>
  </svg>
`;

const encodedCardSvg = encodeURIComponent(cardPatternSvg);
const cardBackgroundPattern = `url("data:image/svg+xml,${encodedCardSvg}")`;

interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode
  delay?: number
}

const AnimatedCard = memo(({ children, delay = 0, ...props }: AnimatedCardProps) => {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: prefersReducedMotion ? 0 : 0.7,
        delay: prefersReducedMotion ? 0 : delay 
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
})

// Component props type
interface GreenAboutProps {
  noSeam?: boolean;
}

// Lazy loaded components
const ImpactSection = dynamic<ImpactSectionProps>(() => import('./ImpactSection'), {
  loading: () => <div className="w-full h-64 bg-slate-900/80 animate-pulse rounded-lg" />
})

// Add a custom hook for controlling scroll animations
function useScrollAnimation() {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when visibility changes
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return { ref, isInView }
}

export default function GreenAbout({ noSeam = false }: GreenAboutProps) {
  const isLowPerformance = usePerformanceMonitor()
  const prefersReducedMotion = useReducedMotion()
  
  const aboutHeroWords = useMemo(() => [
    "Empowering Ethiopia's Energy Transition",
    'Sustainable Energy for All',
    'Community-Driven Innovation',
    'Clean Power, Bright Future',
  ], [])

  const { text: aboutHeadline, ref: headlineRef } = useTypewriter(aboutHeroWords)

  // Optimize animations based on performance
  const animationConfig = useMemo(() => ({
    duration: isLowPerformance || prefersReducedMotion ? 0 : 0.7,
    delay: isLowPerformance || prefersReducedMotion ? 0 : 0.1
  }), [isLowPerformance, prefersReducedMotion])

  const { ref: aboutCardRef, isInView: aboutCardInView } = useScrollAnimation()

  return (
    <OptimizedBackground 
      id="green-about" 
      className="flex flex-col items-center py-16 px-2 min-h-[100vh]" 
      withGradient={true}
      noSeam={noSeam}
    >
      {/* Hero Section */}
      <div className="relative z-20 flex flex-col items-center justify-center mb-12 mt-2 text-center">
        <h1 
          ref={headlineRef}
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#3DD56D] to-[#2bb757] bg-clip-text text-transparent drop-shadow-lg mb-4 min-h-[3.5em] flex items-center justify-center overflow-hidden line-clamp-2"
        >
          {aboutHeadline}
        </h1>
        <p className="text-lg md:text-2xl text-slate-200 font-medium max-w-2xl mx-auto">
          Clean, accessible, and sustainable energy for all communities.
        </p>
      </div>

      {/* Main Content Card */}
      <motion.div
        ref={aboutCardRef}
        initial={{ x: -100, opacity: 0 }}
        animate={aboutCardInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 20, duration: 0.8 }}
        className="relative w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden border border-slate-800 mb-16 bg-slate-900/60 z-10"
      >
        {/* Card background pattern */}
        <div style={cardPatternStyle} />
        <div className="flex flex-col lg:flex-row h-full relative z-10">
          {/* Left column: Content */}
          <div className="w-full lg:w-[55%] p-10 flex flex-col justify-between">
            <div className="space-y-8">
              {/* Header */}
              <AnimatedCard delay={0.1} className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-[#3DD56D] flex items-center justify-center shadow-lg">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">About Grean World</h3>
                    <p className="text-slate-300 font-medium">Sustainable Energy Initiative</p>
                  </div>
                </div>
                <div className="bg-slate-800/80 rounded-lg px-4 py-2 flex items-center space-x-2 border border-slate-700/60 shadow">
                  <div className="w-5 h-5 text-[#3DD56D]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-white">@greanworld</p>
                </div>
              </AnimatedCard>

              {/* Mission Card */}
              <AnimatedCard delay={0.2} className="bg-gradient-to-r from-[#3DD56D] to-[#2bb757] text-white p-6 rounded-xl shadow-lg border border-white/10">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold mb-2 bg-white/20 text-white">Our Mission</span>
                <h4 className="text-xl font-bold mb-2 tracking-tight">Empowering Ethiopia's Energy Transition</h4>
                <p className="text-base font-medium">Founded in 2016, Grean World leads the way in providing clean, accessible, and sustainable energy to rural and peri-urban communities through innovation and community-driven solutions.</p>
              </AnimatedCard>

              {/* Features & Impact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatedCard delay={0.3} className="bg-slate-800/60 p-5 rounded-lg border border-slate-700/70 shadow">
                  <div className="flex items-center space-x-3 mb-2">
                    <Users className="w-6 h-6 text-[#3DD56D]" />
                    <h5 className="font-semibold text-white">Key Features</h5>
                  </div>
                  <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside font-medium">
                    <li>Village-level energy entrepreneurs</li>
                    <li>Community-centered approach</li>
                    <li>Scalable, modular solutions</li>
                    <li>Empowering local women</li>
                  </ul>
                </AnimatedCard>

                <AnimatedCard delay={0.4} className="bg-slate-800/60 p-5 rounded-lg border border-slate-700/70 shadow">
                  <div className="flex items-center space-x-3 mb-2">
                    <Target className="w-6 h-6 text-[#3DD56D]" />
                    <h5 className="font-semibold text-white">Impact</h5>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center">
                      <div className="text-2xl font-extrabold text-[#3DD56D]">100K+</div>
                      <div className="text-xs text-slate-400 font-medium">People Impacted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-extrabold text-[#3DD56D]">10+</div>
                      <div className="text-xs text-slate-400 font-medium">Countries Reached</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-extrabold text-[#3DD56D]">7</div>
                      <div className="text-xs text-slate-400 font-medium">Years of Impact</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-extrabold text-[#3DD56D]">98%</div>
                      <div className="text-xs text-slate-400 font-medium">System Reliability</div>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </div>

          {/* Right column: Visual/graphic */}
          <div className="w-full lg:w-[45%] relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-l from-[#3DD56D]/80 to-transparent z-0"></div>
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="relative w-[80%] h-[80%]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 rounded-full bg-[#3DD56D]/20 animate-pulse"></div>
                  <div className="absolute w-56 h-56 rounded-full bg-[#3DD56D]/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute w-40 h-40 rounded-full bg-[#3DD56D]/40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute w-24 h-24 rounded-full bg-[#3DD56D]/50 flex items-center justify-center shadow-lg">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
                </motion.div>

      {/* Lazy loaded sections */}
      <ImpactSection />
    </OptimizedBackground>
  )
} 