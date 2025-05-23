"use client"

import { motion, useReducedMotion } from "framer-motion"
import { SunMedium, Battery, ClipboardList, GraduationCap, Network, Leaf, ArrowRight, BarChart2, Database, Smartphone, Settings2, Twitter } from "lucide-react"
import { useState, useEffect, memo, useMemo, useRef } from "react"
import { OptimizedBackground } from '../shared/OptimizedBackground'

// Performance monitoring hook with throttling
const useBackgroundPerformance = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let rafId: number
    
    const checkPerformance = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount
        if (fps < 30) {
          setIsLowPerformance(true)
        }
        frameCount = 0
        lastTime = currentTime
      }
      
      if (!isLowPerformance) {
        rafId = requestAnimationFrame(checkPerformance)
      }
    }
    
    rafId = requestAnimationFrame(checkPerformance)
    
    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [isLowPerformance])

  return isLowPerformance
}

// Optimized background pattern component with memoization
const BackgroundPattern = memo(() => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="solutions-pattern" width="100" height="20" patternUnits="userSpaceOnUse">
        <path 
          d="M0,10 C30,15 70,5 100,10" 
          fill="none" 
          stroke="#3DD56D" 
          strokeOpacity="0.1" 
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#solutions-pattern)" />
  </svg>
))

// Optimized background component with conditional rendering
const Background = memo(() => {
  const isLowPerformance = useBackgroundPerformance()
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <div className="fixed inset-0 -z-10">
      {/* Base gradient - always rendered */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-900" />
      
      {/* Pattern overlay - only show if performance is good */}
      {!isLowPerformance && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="absolute inset-0"
        >
          <BackgroundPattern />
        </motion.div>
      )}
      
      {/* Accent gradient - simplified for low performance */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          isLowPerformance ? 'opacity-20' : 'opacity-40'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#3DD56D]/5 to-transparent" />
      </div>
    </div>
  )
})

// Optimized typewriter animation hook
function useTypewriter(words: string[], speed = 70, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (subIndex === words[index].length + 1 && !deleting) {
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words, speed, pause, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const blinkInterval = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkInterval);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return words[0];
  }

  return `${words[index].substring(0, subIndex)}${blink ? '|' : ' '}`;
}

// Memoized solution data
const useSolutionData = () => {
  return useMemo(() => ({
    solutions: [
    {
      icon: <SunMedium className="h-6 w-6" />,
      title: "Solar Panel Services",
      description: "Complete solar energy solutions from specification and design to installation and ongoing support.",
      link: "/solutions/solar-energy",
      bgColor: "bg-[#3DD56D]/10",
      textColor: "text-[#3DD56D]",
      borderColor: "border-[#3DD56D]/20"
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Energy Consultancy",
      description: "Expert guidance to optimize your energy usage and transition to sustainable energy solutions.",
      link: "/solutions/energy-consultancy",
      bgColor: "bg-gradient-to-br from-slate-800 to-slate-900",
      textColor: "text-white",
      borderColor: "border-slate-700/50"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Training Programs",
      description: "Comprehensive training in renewable energy technologies for professionals and communities.",
      link: "/solutions/training",
      bgColor: "bg-transparent",
      textColor: "text-[#0EA5E9]",
      borderColor: "border-[#0EA5E9]/30"
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Energy Hubs Support",
      description: "Community-focused energy centers providing multiple services and infrastructure support.",
      link: "/solutions/energy-hubs",
      bgColor: "bg-transparent",
      textColor: "text-[#8B5CF6]",
      borderColor: "border-none"
    }
    ],
    integratedSolutions: [
    {
      title: "Community Solar Projects",
      description: "Combining solar installation services with energy hub support to create sustainable community energy centers.",
      tags: ["Solar Panel Services", "Energy Hubs Support"],
      icon: <SunMedium className="w-full h-full" />,
      gradient: "from-slate-800 to-slate-900",
      borderColor: "border-slate-700/50",
      hoverBorder: "hover:border-slate-600/60"
    },
    {
      title: "Commercial Energy Transition",
      description: "Comprehensive energy consultancy paired with solar solutions to help businesses reduce costs and carbon footprint.",
      tags: ["Energy Consultancy", "Solar Panel Services"],
      icon: <ClipboardList className="w-full h-full" />,
      gradient: "from-[#3DD56D]/5 to-slate-800/80",
      borderColor: "border-[#3DD56D]/20",
      hoverBorder: "hover:border-[#3DD56D]/40"
    },
    {
      title: "Workforce Development",
      description: "Training programs that prepare local technicians to support the growing network of energy hubs and solar installations.",
      tags: ["Training Programs", "Energy Hubs Support"],
      icon: <GraduationCap className="w-full h-full" />,
      gradient: "from-blue-900/10 to-slate-900",
      borderColor: "border-blue-500/20",
      hoverBorder: "hover:border-blue-500/30"
    },
    {
      title: "Sustainable Campus Initiative",
      description: "Integrated approach combining consultancy, solar implementation, and training for educational institutions.",
      tags: ["Energy Consultancy", "Solar Panel Services", "Training Programs"],
      icon: <Network className="w-full h-full" />,
      gradient: "from-purple-900/10 to-slate-900",
      borderColor: "border-purple-500/20",
      hoverBorder: "hover:border-purple-500/30"
    }
  ]
  }), []);
};

// Optimized animated visual component
const AnimatedVisual = memo(({ icon: Icon }: { icon: React.ElementType }) => {
  const prefersReducedMotion = useReducedMotion();
  const isLowPerformance = useBackgroundPerformance();

  if (prefersReducedMotion || isLowPerformance) {
    return (
      <div className="w-20 h-20 rounded-full bg-[#3DD56D]/40 flex items-center justify-center">
        <Icon className="w-10 h-10 text-white" />
      </div>
    );
  }

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute w-64 h-64 rounded-full bg-[#3DD56D]/10 animate-pulse"></div>
      <div className="absolute w-48 h-48 rounded-full bg-[#3DD56D]/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute w-32 h-32 rounded-full bg-[#3DD56D]/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute w-20 h-20 rounded-full bg-[#3DD56D]/40 flex items-center justify-center">
        <Icon className="w-10 h-10 text-white" />
      </div>
    </div>
  );
});

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

// Component props type
interface GreenSolutionsProps {
  noSeam?: boolean;
}

export default function GreenSolutions({ noSeam = false }: GreenSolutionsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const isLowPerformance = useBackgroundPerformance()
  const prefersReducedMotion = useReducedMotion()
  const { solutions, integratedSolutions } = useSolutionData()
  const { ref: heroCardRef, isInView: heroCardInView } = useScrollAnimation()

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const headline = useTypewriter([
    "Empowering Ethiopia with Sustainable Energy Solutions",
    "Innovative Green Technology for a Better Tomorrow",
    "Building a Sustainable Energy Future Together",
    "Smart Energy Solutions for Modern Ethiopia"
  ])

  return (
    <OptimizedBackground 
      id="green-solutions" 
      className="relative flex flex-col items-center justify-center px-4 sm:px-6 py-24" 
      withGradient={true}
      noSeam={noSeam}
    >
      {/* Content with proper z-index */}
      <div className="relative z-10">
      {/* Hero Section with Loop Text Animation */}
        <div className="max-w-3xl mx-auto text-center mt-8 mb-16">
        <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-6 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20 shadow-lg tracking-wide">
          <span className="font-bold">GREAN WORLD</span> Solutions
        </div>
        <h1
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-[#3DD56D] to-[#2bb757] bg-clip-text text-transparent drop-shadow-lg min-h-[3.5em] flex items-center justify-center overflow-hidden line-clamp-2"
        >
          {headline}
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">Comprehensive, innovative, and sustainable energy services for communities and businesses across Ethiopia.</p>
      </div>

      {/* Main Card - Green Solutions Hero */}
        <motion.div
          ref={heroCardRef}
          initial={{ x: -100, opacity: 0 }}
          animate={heroCardInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 20, duration: 0.8 }}
          className="relative w-full max-w-[1200px] mx-auto rounded-xl shadow-2xl overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 mb-16 z-10"
        >
        {/* Card pattern overlay */}
        <div className="absolute inset-0 opacity-20 z-0 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="wave-pattern" width="100" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 C30,15 70,5 100,10 L100,0 L0,0 Z" fill="#4ade80" fillOpacity="0.2"></path>
              </pattern>
            <rect width="100%" height="100%" fill="url(#wave-pattern)" />
            </svg>
        </div>
        <div className="flex flex-col h-full">
          {/* Header Row */}
          <div className="p-8 flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                <SunMedium className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide"><span className="font-bold">GREAN WORLD</span> Energy</h3>
                <p className="text-sm text-slate-300">Clean Energy Solutions</p>
              </div>
            </div>
              <div className="bg-slate-800/80 rounded-lg px-3 py-1.5 flex items-center space-x-2">
              <Twitter className="w-4 h-4 text-green-400" />
              <p className="text-sm font-medium text-white">@greansolutions</p>
            </div>
          </div>
          {/* Hero/Headline */}
          <div className="flex-grow flex flex-col md:flex-row items-center justify-center p-8 gap-8">
            {/* Left: Headline and description */}
            <div className="max-w-xl text-center md:text-left mb-8 md:mb-0 flex-1">
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-3 bg-[#3DD56D] text-white">Green Solutions</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Green Solutions Platform Accelerates Clean Energy Adoption</h2>
              <p className="text-lg text-slate-300 mb-6">Modernize your community or business with our streamlined approach to sustainable energy that delivers results in weeks, not months.</p>
              {/* Stats card */}
                <div className="bg-slate-800/60 p-4 rounded-lg border border-[#3DD56D]/30 py-4 mb-4 shadow-lg">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#3DD56D]">60%</div>
                    <div className="text-xs text-slate-300">Energy savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#3DD56D]">40%</div>
                    <div className="text-xs text-slate-300">Cost reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#3DD56D]">3 weeks</div>
                    <div className="text-xs text-slate-300">Avg. implementation</div>
                  </div>
                </div>
              </div>
              {/* Key Solutions card */}
                <div className="bg-gradient-to-r from-[#3DD56D]/20 to-slate-900/80 p-5 rounded-lg mb-4 shadow-lg border border-[#3DD56D]/30">
                <h4 className="text-xl font-semibold text-white mb-3">Key Solutions:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#3DD56D]/20 p-2 rounded-full"><SunMedium className="w-5 h-5 text-[#3DD56D]" /></div>
                    <span className="text-white">Solar energy</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#3DD56D]/20 p-2 rounded-full"><Database className="w-5 h-5 text-[#3DD56D]" /></div>
                    <span className="text-white">Energy analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#3DD56D]/20 p-2 rounded-full"><Smartphone className="w-5 h-5 text-[#3DD56D]" /></div>
                    <span className="text-white">Mobile monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#3DD56D]/20 p-2 rounded-full"><Settings2 className="w-5 h-5 text-[#3DD56D]" /></div>
                    <span className="text-white">Automation</span>
                  </div>
                </div>
              </div>
              {/* Tags and CTA */}
              <div className="flex items-center justify-between mb-8 mt-4">
                <div className="flex space-x-3">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#3DD56D] text-[#3DD56D]">#GreenEnergy</div>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#3DD56D] text-[#3DD56D]">#SustainableTech</div>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#3DD56D] text-[#3DD56D]">#SmartSolutions</div>
                </div>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-gradient-to-r from-[#3DD56D] to-[#2bb757] hover:from-[#2bb757] hover:to-[#3DD56D] text-white relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    See Case Studies
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300"></span>
                </button>
              </div>
            </div>
            {/* Right: Animated Visual */}
            <div className="flex-1 flex items-center justify-center relative min-h-[300px] md:min-h-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3DD56D]/80 to-transparent z-0"></div>
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="relative w-[80%] h-[80%]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-72 h-72 rounded-full bg-[#3DD56D]/20 animate-pulse"></div>
                      <div className="absolute w-56 h-56 rounded-full bg-[#3DD56D]/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute w-40 h-40 rounded-full bg-[#3DD56D]/40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute w-24 h-24 rounded-full bg-[#3DD56D]/50 flex items-center justify-center">
                        <BarChart2 className="w-12 h-12 text-white" />
                      </div>
                      {/* SVG lines/dots */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                        <g stroke="rgba(61, 213, 109, 0.4)" fill="none" strokeWidth="1">
                          <path d="M200,100 L100,200 L200,300 L300,200 Z"></path>
                          <path d="M200,100 L300,200"></path>
                          <path d="M100,200 L300,200"></path>
                          <path d="M200,300 L200,100"></path>
                        </g>
                        <g fill="rgba(61, 213, 109, 0.8)">
                          <circle cx="200" cy="100" r="5"></circle>
                          <circle cx="100" cy="200" r="5"></circle>
                          <circle cx="200" cy="300" r="5"></circle>
                          <circle cx="300" cy="200" r="5"></circle>
                        </g>
                      </svg>
                    </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom green glow */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-800 py-3 px-8"></div>
        </div>
      </motion.div>

        {/* Solutions Section */}
      <div className="relative pt-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="solutions-container">
              {/* Services Section */}
            <section className="flex flex-col items-center py-16 px-4 sm:px-6">
              <div className="w-full max-w-[1200px]">
                <div className="w-full h-[630px] bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl shadow-lg overflow-hidden relative">
                  {/* Leaf SVG pattern overlay */}
                  <div className="absolute inset-0 opacity-20 z-0 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="leaf-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M25,5 C15,5 5,15 5,25 C5,35 15,45 25,45 C35,45 45,35 45,25 C45,15 35,5 25,5 Z M25,40 C17.5,40 10,32.5 10,25 C10,17.5 17.5,10 25,10 C32.5,10 40,17.5 40,25 C40,32.5 32.5,40 25,40 Z" fill="#4ade80" fillOpacity="0.2"></path>
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
                    </svg>
                  </div>
                  <div className="flex h-full flex-col">
                    <div className="flex flex-grow">
                      {/* Left: Content */}
                      <div className="w-[55%] p-8 flex flex-col justify-between">
                        <div className="space-y-6">
                          {/* Header Row */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                                <Leaf className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-white">Grean World Energy</h3>
                                <p className="text-sm text-slate-300">Sustainable Energy Solutions for Ethiopia</p>
                              </div>
                            </div>
                              <div className="bg-slate-800/80 rounded-lg px-3 py-1.5 flex items-center space-x-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook w-4 h-4 text-green-400"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                              <p className="text-sm font-medium text-white">Green Innovation Hub</p>
                      </div>
                    </div>
                          {/* Product Card */}
                          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-4 rounded-lg shadow-md">
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-2 bg-white/20 backdrop-blur-sm text-white">Sustainable Product</span>
                            <h4 className="text-lg font-semibold mb-2">Sustainable Solutions for a Better World</h4>
                            <p className="text-sm">Our new sustainable product line uses 100% recycled materials and biodegradable packaging to minimize environmental impact while maximizing performance.</p>
                          </div>
                          {/* Features & Impact */}
                          <div className="grid grid-cols-2 gap-4">
                              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                              <div className="flex items-center space-x-2 mb-2">
                                <Leaf className="w-5 h-5 text-green-400" />
                                <h5 className="font-semibold text-white text-sm">Eco Features</h5>
                              </div>
                              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                                <li>10Wp-350Wp solar home systems</li>
                                <li>Lighting, phone charging, TV support</li>
                                <li>Professional installation included</li>
                                <li>Local maintenance & training</li>
                              </ul>
                            </div>
                              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                              <div className="flex items-center space-x-2 mb-2">
                                <BarChart2 className="w-5 h-5 text-green-400" />
                                <h5 className="font-semibold text-white text-sm">Environmental Impact</h5>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-center">
                                  <div className="text-xl font-bold text-green-400">270k+</div>
                                  <div className="text-xs text-slate-400">Systems deployed</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xl font-bold text-green-400">500+</div>
                                  <div className="text-xs text-slate-400">Villages reached</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xl font-bold text-green-400">200+</div>
                                  <div className="text-xs text-slate-400">Women entrepreneurs</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xl font-bold text-green-400">30k tons</div>
                                  <div className="text-xs text-slate-400">CO₂ reduction</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Tags & CTA */}
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex space-x-2">
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-green-500 text-green-400 bg-transparent">#Sustainable</span>
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-green-500 text-green-400 bg-transparent">#EcoFriendly</span>
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-green-500 text-green-400 bg-transparent">#ZeroWaste</span>
                            </div>
                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs py-1.5">
                                  Learn More
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right ml-1 h-3 w-3"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Right: Animated Visual */}
                      <div className="w-[45%] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-l from-green-900/80 to-transparent z-0"></div>
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                          <div className="relative w-[80%] h-[80%]">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-64 h-64 rounded-full bg-green-600/20 animate-pulse"></div>
                              <div className="absolute w-48 h-48 rounded-full bg-green-600/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                              <div className="absolute w-32 h-32 rounded-full bg-green-600/40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                              <div className="absolute w-20 h-20 rounded-full bg-green-600/50 flex items-center justify-center">
                                <Leaf className="w-10 h-10 text-white" />
                              </div>
                              {/* SVG lines/dots */}
                              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                                <g stroke="rgba(74, 222, 128, 0.4)" fill="none" strokeWidth="1">
                                  <path d="M200,200 L150,150"></path>
                                  <path d="M200,200 L250,150"></path>
                                  <path d="M200,200 L150,250"></path>
                                  <path d="M200,200 L250,250"></path>
                                  <path d="M200,200 L120,200"></path>
                                  <path d="M200,200 L280,200"></path>
                                  <path d="M200,200 L200,120"></path>
                                  <path d="M200,200 L200,280"></path>
                                </g>
                                <g fill="rgba(74, 222, 128, 0.8)">
                                  <circle cx="150" cy="150" r="4"></circle>
                                  <circle cx="250" cy="150" r="4"></circle>
                                  <circle cx="150" cy="250" r="4"></circle>
                                  <circle cx="250" cy="250" r="4"></circle>
                                  <circle cx="120" cy="200" r="4"></circle>
                                  <circle cx="280" cy="200" r="4"></circle>
                                  <circle cx="200" cy="120" r="4"></circle>
                                  <circle cx="200" cy="280" r="4"></circle>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Bottom green glow */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-800 py-3 px-8"></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Integrated Solutions Section */}
              <section className="py-20 px-4 sm:px-6 relative">
                <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                  <div className="absolute" style={{ width: "243.182px", height: "280.239px", backgroundColor: "rgb(74, 222, 128)", opacity: 0.03, top: "58.3409%", left: "46.0397%", borderRadius: "44.1908% 47.1356% 37.1614% 30.2878%", filter: "blur(40px)", transform: "translateX(-29.2576px) translateY(29.2576px)" }}></div>
                  <div className="absolute" style={{ width: "121.191px", height: "116.561px", backgroundColor: "rgb(74, 222, 128)", opacity: 0.03, top: "91.0865%", left: "78.6277%", borderRadius: "39.5749% 39.6281% 42.8859% 42.5174%", filter: "blur(40px)", transform: "translateX(-29.2576px) translateY(29.2576px)" }}></div>
                  <div className="absolute" style={{ width: "208.123px", height: "191.825px", backgroundColor: "rgb(74, 222, 128)", opacity: 0.03, top: "77.4025%", left: "54.8049%", borderRadius: "52.6957% 30.0313% 36.5763% 40.8419%", filter: "blur(40px)", transform: "translateX(-29.2576px) translateY(29.2576px)" }}></div>
                </div>

                <div className="max-w-7xl mx-auto">
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="text-center mb-16"
                  >
                    <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-4 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20">
                      Complete Solutions
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                      <span className="bg-gradient-to-r from-white to-[#3DD56D] bg-clip-text text-transparent">
                        Integrated Service Approach
                      </span>
                    </h2>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                      Our services work together seamlessly to provide comprehensive energy solutions tailored to your specific needs.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Premium Card for the first solution */}
                  <motion.div
                    key={integratedSolutions[0].title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
                    className="col-span-1 md:col-span-2 relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-[#3DD56D]/20"
                    style={{ minHeight: '420px' }}
                  >
                    {/* SVG Leaf Pattern Overlay */}
                    <div className="absolute inset-0 opacity-20 z-0 pointer-events-none">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="leaf-pattern-premium" width="50" height="50" patternUnits="userSpaceOnUse">
                          <path d="M25,5 C15,5 5,15 5,25 C5,35 15,45 25,45 C35,45 45,35 45,25 C45,15 35,5 25,5 Z M25,40 C17.5,40 10,32.5 10,25 C10,17.5 17.5,10 25,10 C32.5,10 40,17.5 40,25 C40,32.5 32.5,40 25,40 Z" fill="#4ade80" fillOpacity="0.2"></path>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#leaf-pattern-premium)" />
                      </svg>
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row h-full">
                      {/* Left: Content */}
                      <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {integratedSolutions[0].tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="text-sm border border-[#3DD56D] text-[#3DD56D] px-3 py-1 rounded-full bg-transparent">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-3xl font-bold mb-3 text-white">
                            {integratedSolutions[0].title}
                          </h3>
                          <p className="text-slate-300 leading-relaxed mb-6">
                            {integratedSolutions[0].description}
                          </p>
                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 bg-[#3DD56D] hover:bg-[#2bb757] text-white">
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      {/* Right: Animated Visual */}
                      <div className="w-full md:w-1/2 flex items-center justify-center relative">
                        <div className="relative w-64 h-64 flex items-center justify-center">
                          <div className="absolute w-64 h-64 rounded-full bg-[#3DD56D]/10 animate-pulse"></div>
                          <div className="absolute w-48 h-48 rounded-full bg-[#3DD56D]/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                          <div className="absolute w-32 h-32 rounded-full bg-[#3DD56D]/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                          <div className="absolute w-20 h-20 rounded-full bg-[#3DD56D]/40 flex items-center justify-center">
                            {integratedSolutions[0].icon}
                          </div>
                          {/* SVG lines/dots */}
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                            <g stroke="rgba(74, 222, 128, 0.4)" fill="none" strokeWidth="1">
                              <path d="M200,200 L150,150"></path>
                              <path d="M200,200 L250,150"></path>
                              <path d="M200,200 L150,250"></path>
                              <path d="M200,200 L250,250"></path>
                              <path d="M200,200 L120,200"></path>
                              <path d="M200,200 L280,200"></path>
                              <path d="M200,200 L200,120"></path>
                              <path d="M200,200 L200,280"></path>
                            </g>
                            <g fill="rgba(74, 222, 128, 0.8)">
                              <circle cx="150" cy="150" r="4"></circle>
                              <circle cx="250" cy="150" r="4"></circle>
                              <circle cx="150" cy="250" r="4"></circle>
                              <circle cx="250" cy="250" r="4"></circle>
                              <circle cx="120" cy="200" r="4"></circle>
                              <circle cx="280" cy="200" r="4"></circle>
                              <circle cx="200" cy="120" r="4"></circle>
                              <circle cx="200" cy="280" r="4"></circle>
                            </g>
                          </svg>
                        </div>
                      </div>
                      {/* Bottom green glow */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-800 py-3 px-8"></div>
                    </div>
                  </motion.div>
                  {/* Render the rest of the integratedSolutions as before, skipping the first */}
                  {integratedSolutions.slice(1).map((solution, index) => (
                      <motion.div
                        key={solution.title}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`rounded-xl overflow-hidden relative group bg-gradient-to-br ${solution.gradient} border ${solution.borderColor} ${solution.hoverBorder}`}
                      >
                        <div className="relative z-10 p-8">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {solution.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="text-sm bg-[#3DD56D]/10 text-[#3DD56D] px-3 py-1 rounded-full border border-[#3DD56D]/20">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#3DD56D] transition-colors duration-300">
                            {solution.title}
                          </h3>
                          <p className="text-slate-300 leading-relaxed">
                            {solution.description}
                          </p>
                          <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-300 text-[#3DD56D]">
                            {solution.icon}
                          </div>
                          <div className="absolute left-[30px] top-[30px]">
                            <div className="w-2 h-2 rounded-full bg-[#3DD56D]" style={{ transform: "scale(1.49997)" }}></div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="mt-12 text-center"
                  >
                    <a href="/contact">
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm h-10 bg-[#3DD56D] hover:bg-[#2bb757] text-white px-6 py-2 rounded-full group relative overflow-hidden">
                        <span className="relative z-10 flex items-center">
                          Learn More About Our Integrated Approach
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#3DD56D] to-[#2bb757] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                      </button>
                    </a>
                  </motion.div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </OptimizedBackground>
  )
} 