import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { TypingTextAnimation } from "../animations/text/TypingTextAnimation"

const EnhancedHomeSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <div>
      <motion.section
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-20 px-4 md:px-8"
      >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-6">
            Powering Tomorrow's Energy
          </h1>
          <div className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-2">
            <span className="text-green-400">
              <TypingTextAnimation text="Leading the charge in sustainable energy solutions for a greener future" />
            </span>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Innovation",
              description: "Cutting-edge technology driving sustainable energy solutions",
              icon: "🚀"
            },
            {
              title: "Sustainability",
              description: "Committed to reducing carbon footprint through green energy",
              icon: "🌱"
            },
            {
              title: "Reliability",
              description: "Dependable energy solutions for homes and businesses",
              icon: "⚡"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
    </div>
  )
}

export default EnhancedHomeSection