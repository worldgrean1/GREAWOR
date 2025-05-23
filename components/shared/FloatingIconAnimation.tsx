import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FloatingIconAnimationProps {
  icon: ReactNode;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

export default function FloatingIconAnimation({ 
  icon, 
  position 
}: FloatingIconAnimationProps) {
  return (
    <motion.div
      className="absolute z-10"
      style={{
        ...position,
      }}
      animate={{
        y: [0, -15, 0],
        opacity: [0.7, 1, 0.7],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
      }}
    >
      <div className="flex items-center justify-center w-12 h-12 bg-[#3DD56D]/20 backdrop-blur-sm rounded-full border border-[#3DD56D]/30 text-[#3DD56D] shadow-lg shadow-[#3DD56D]/10">
        {icon}
      </div>
    </motion.div>
  );
} 