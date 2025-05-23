import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const EnhancedAboutSection = () => {
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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-20 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500 mb-6">
            Our Story
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pioneering sustainable energy solutions since 2010
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
            >
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-300">
                To accelerate the world's transition to sustainable energy through innovative solutions
                that make clean power accessible to everyone.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
            >
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-300">
                A world powered by 100% renewable energy, where sustainable solutions
                drive economic growth and environmental preservation.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-green-500/20 p-1"
            >
              <div className="w-full h-full bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-6">🌍</div>
                  <h3 className="text-2xl font-semibold mb-4">Global Impact</h3>
                  <p className="text-gray-300">
                    Serving communities worldwide with sustainable energy solutions
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default EnhancedAboutSection 