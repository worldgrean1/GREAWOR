import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const EnhancedProductsSection = () => {
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
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  const products = [
    {
      name: "Solar Panel X1",
      description: "High-efficiency monocrystalline solar panels",
      specs: ["400W output", "22% efficiency", "25-year warranty"],
      image: "☀️"
    },
    {
      name: "PowerWall Pro",
      description: "Advanced home battery storage system",
      specs: ["13.5kWh capacity", "90% depth of discharge", "10-year warranty"],
      image: "🔋"
    },
    {
      name: "Smart Inverter",
      description: "Intelligent power conversion system",
      specs: ["98% efficiency", "Smart monitoring", "Grid-tie ready"],
      image: "⚡"
    }
  ]

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
            Our Products
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cutting-edge energy products designed for performance and reliability
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50"
            >
              <div className="p-8">
                <div className="text-6xl mb-6">{product.image}</div>
                <h3 className="text-2xl font-semibold mb-3">{product.name}</h3>
                <p className="text-gray-300 mb-6">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.specs.map((spec, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 * index + 0.1 * idx }}
                      className="flex items-center text-gray-300"
                    >
                      <span className="text-blue-400 mr-2">•</span>
                      {spec}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-lg font-semibold"
                >
                  Learn More
                </motion.button>
              </div>
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
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default EnhancedProductsSection 