"use client"

import React from 'react'
import { motion } from 'framer-motion'

export default function PremiumBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900"></div>
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.5" fill="#94a3b8"></circle>
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots-pattern)"></rect>
        </svg>
      </div>
      
      {/* Right side decorative elements - visible on larger screens */}
      <div className="absolute right-0 top-0 w-2/5 h-full opacity-70 hidden lg:block overflow-hidden">
        {/* Teal gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-teal-900/80 to-transparent"></div>
        
        {/* Animated pulsing circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[80%] h-[80%]">
            <motion.div 
              className="absolute w-64 h-64 rounded-full bg-teal-600/20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute w-48 h-48 rounded-full bg-teal-600/30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          <motion.div
              className="absolute w-32 h-32 rounded-full bg-teal-600/40"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <div className="absolute w-20 h-20 rounded-full bg-teal-600/50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
              <g stroke="rgba(45, 212, 191, 0.4)" fill="none" strokeWidth="1">
                <path d="M200,200 L150,150"></path>
                <path d="M200,200 L250,150"></path>
                <path d="M200,200 L150,250"></path>
                <path d="M200,200 L250,250"></path>
                <path d="M200,200 L120,200"></path>
                <path d="M200,200 L280,200"></path>
                <path d="M200,200 L200,120"></path>
                <path d="M200,200 L200,280"></path>
              </g>
              <g fill="rgba(45, 212, 191, 0.8)">
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
      
      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-teal-600 to-teal-800"></div>
    </div>
  )
}
