import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const EnhancedSolutionsSection = () => {
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
    hidden: { y: 50, opacity: 0 },
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

  const solutions = [
    {
      title: "Solar Power Systems",
      description: "High-efficiency solar panels with smart monitoring",
      icon: "☀️",
      features: ["Smart monitoring", "High efficiency", "Easy installation"]
    },
    {
      title: "Energy Storage",
      description: "Advanced battery systems for reliable power backup",
      icon: "🔋",
      features: ["Long lifespan", "Fast charging", "Smart management"]
    },
    {
      title: "Smart Grid Solutions",
      description: "Intelligent grid management for optimal energy distribution",
      icon: "⚡",
      features: ["Real-time monitoring", "Load balancing", "Predictive maintenance"]
    }
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-20 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-6">
            Our Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive energy solutions for a sustainable future
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50"
            >
              <div className="text-5xl mb-6">{solution.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{solution.title}</h3>
              <p className="text-gray-300 mb-6">{solution.description}</p>
              <ul className="space-y-2">
                {solution.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * index + 0.1 * idx }}
                    className="flex items-center text-gray-300"
                  >
                    <span className="text-green-400 mr-2">✓</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg"
          >
            Explore All Solutions
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default EnhancedSolutionsSection 