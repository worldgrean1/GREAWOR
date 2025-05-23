import { motion, useScroll, useSpring } from "framer-motion"
import { ReactNode } from "react"

interface SmoothScrollContainerProps {
  children: ReactNode
}

const SmoothScrollContainer = ({ children }: SmoothScrollContainerProps) => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="relative" style={{ overflow: 'hidden' }}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 origin-left z-50"
        style={{ scaleX }}
      />
      <div 
        className="h-screen overflow-y-auto" 
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {children}
      </div>
    </div>
  )
}

export default SmoothScrollContainer 