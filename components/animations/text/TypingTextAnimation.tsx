"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

type TypingTextAnimationProps = {
  text: string
  speed?: "slow" | "medium" | "fast"
  className?: string
  restartOnVisible?: boolean
}

export function TypingTextAnimation({
  text,
  speed = "medium",
  className = "",
  restartOnVisible = true,
}: TypingTextAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const textRef = useRef(text)
  const animationComplete = useRef(false)
  const elementRef = useRef<HTMLDivElement>(null)

  // Determine typing speed
  const typingSpeed = {
    slow: 100,
    medium: 50,
    fast: 30,
  }[speed]

  // Setup intersection observer to detect when component is visible
  useEffect(() => {
    if (!restartOnVisible || !elementRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
        
        // If element becomes visible and animation is complete, restart it
        if (entry.isIntersecting && animationComplete.current) {
          setDisplayText("");
          setCurrentIndex(0);
          animationComplete.current = false;
        }
      },
      {
        threshold: 0.1, // 10% of the element is visible
        rootMargin: "0px",
      }
    );
    
    observer.observe(elementRef.current);
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [restartOnVisible]);

  // Reset animation when text prop changes
  useEffect(() => {
    if (textRef.current !== text) {
      // Text prop has changed, reset animation
      textRef.current = text;
      setDisplayText("");
      setCurrentIndex(0);
      animationComplete.current = false;
    }
  }, [text]);

  // Handle typing animation
  useEffect(() => {
    // Don't run animation if text is empty or already complete
    if (!text || animationComplete.current || !isVisible) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length) {
      animationComplete.current = true;
    }
  }, [currentIndex, text, typingSpeed, isVisible]);

  // Force remount when speed changes to restart animation
  const speedKey = `${speed}-${text}`;

  return (
    <motion.span
      ref={elementRef}
      key={speedKey}
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
      <motion.span
        className="inline-block w-1 h-4 bg-green-400 ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </motion.span>
  );
}