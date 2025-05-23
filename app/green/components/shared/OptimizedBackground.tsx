"use client"

import React, { useMemo } from 'react'
import type { CSSProperties, ReactNode } from 'react'

// SVG pattern as a data URI for better performance
const trianglePatternSvg = `
  <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,0 L20,40 L40,0 Z" fill="#3DD56D" fill-opacity="0.08"/>
  </svg>
`;

const encodedSvg = encodeURIComponent(trianglePatternSvg);
const backgroundPattern = `url("data:image/svg+xml,${encodedSvg}")`;

interface OptimizedBackgroundProps {
  children: ReactNode;
  withGradient?: boolean;
  className?: string;
  id?: string;
  noSeam?: boolean; // Add option to disable the seam for first/last sections
}

export function OptimizedBackground({ 
  children, 
  withGradient = true,
  className = "",
  id,
  noSeam = false
}: OptimizedBackgroundProps) {
  // Background styles with optimizations
  const backgroundStyle = useMemo<CSSProperties>(() => ({
    background: 'linear-gradient(to bottom right, #0a0d19, #111827)',
    position: 'relative',
    willChange: 'transform', // Hint for browser optimization
    transform: 'translateZ(0)', // Hardware acceleration
    borderTop: noSeam ? 'none' : '1px solid rgba(61, 213, 109, 0.08)', // Subtle seam connector
  }), [noSeam]);

  // Pattern background style
  const patternStyle = useMemo<CSSProperties>(() => ({
    position: 'absolute',
    inset: 0,
    opacity: 0.15,
    pointerEvents: 'none',
    backgroundImage: backgroundPattern,
    backgroundSize: '40px 40px',
    backgroundRepeat: 'repeat',
    zIndex: 0,
    willChange: 'opacity', // Optimize for opacity transitions
  }), []);

  // Gradient overlay style
  const gradientOverlayStyle = useMemo<CSSProperties>(() => ({
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    background: 'linear-gradient(to left, rgba(61, 213, 109, 0.6), transparent)',
    zIndex: 0,
    pointerEvents: 'none',
    transform: 'translateZ(0)', // Hardware acceleration
  }), []);

  // Section connection element - subtle line to make the transitions visible
  const connectionStyle = useMemo<CSSProperties>(() => ({
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '60%', 
    height: '2px',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(to right, transparent, rgba(61, 213, 109, 0.2), transparent)',
    zIndex: 5
  }), []);

  return (
    <section 
      id={id}
      className={`relative w-full ${className}`}
      style={backgroundStyle}
    >
      {/* Pattern overlay - CSS optimized */}
      <div style={patternStyle} />

      {/* Green gradient overlay - CSS optimized */}
      {withGradient && <div style={gradientOverlayStyle} className="lg:w-1/2 w-2/3" />}

      {/* Connection point - only shown if not the first section */}
      {!noSeam && <div style={connectionStyle} />}

      {children}
    </section>
  );
}

// Card-specific pattern with smaller triangles for cards
const cardPatternSvg = `
  <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,0 L15,30 L30,0 Z" fill="#3DD56D" fill-opacity="0.05"/>
  </svg>
`;

const encodedCardSvg = encodeURIComponent(cardPatternSvg);
export const cardBackgroundPattern = `url("data:image/svg+xml,${encodedCardSvg}")`;

export const cardPatternStyle: CSSProperties = {
  backgroundImage: cardBackgroundPattern,
  backgroundSize: '30px 30px',
  backgroundRepeat: 'repeat',
  opacity: 0.1,
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  pointerEvents: 'none'
}; 