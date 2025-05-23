"use client"

import { motion } from "framer-motion"
import { memo } from "react"
import { Lightbulb, Users, CheckCircle, Handshake } from "lucide-react"

const ImpactSection = memo(() => {
  return (
    <>
      {/* Distribution Model Section */}
      <div className="w-full max-w-6xl mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7 }} 
          className="text-3xl md:text-4xl font-bold mb-8 text-white text-center"
        >
          Our Distribution Model
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7 }} 
            className="bg-slate-900/80 border border-[#3DD56D]/20 rounded-xl shadow-lg p-8 flex flex-col"
          >
            <h3 className="text-2xl font-semibold text-[#3DD56D] mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" /> Village-Level Energy Entrepreneurs
            </h3>
            <p className="text-slate-300">
              We use a <span className="font-bold text-white">Village-Level Energy Entrepreneurs Distribution Model</span> to overcome rural infrastructure and distribution challenges. This approach ensures last-mile access and empowers local entrepreneurs—primarily women—while building sustainable energy ecosystems in communities across Ethiopia.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7 }} 
            className="bg-slate-900/80 border border-[#3DD56D]/20 rounded-xl shadow-lg p-8 flex flex-col"
          >
            <h3 className="text-2xl font-semibold text-[#3DD56D] mb-4 flex items-center gap-2">
              <Handshake className="w-6 h-6" /> Community-Centered Approach
            </h3>
            <p className="text-slate-300">
              By working directly with local entrepreneurs, we create jobs, build capacity, and ensure that our energy solutions are tailored to the specific needs of each community we serve.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="w-full max-w-6xl mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7 }} 
          className="text-3xl md:text-4xl font-bold mb-8 text-white text-center"
        >
          Our Impact
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="bg-slate-900/80 border border-[#3DD56D]/20 rounded-xl shadow-lg p-8 flex flex-col items-center text-center"
          >
            <Lightbulb className="w-10 h-10 text-[#3DD56D] mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
            <p className="text-slate-300">We develop custom energy solutions tailored to the unique needs of rural communities.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.1 }} 
            className="bg-slate-900/80 border border-[#3DD56D]/20 rounded-xl shadow-lg p-8 flex flex-col items-center text-center"
          >
            <Users className="w-10 h-10 text-[#3DD56D] mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Community</h3>
            <p className="text-slate-300">We empower local entrepreneurs and create sustainable social impact through energy access.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            className="bg-slate-900/80 border border-[#3DD56D]/20 rounded-xl shadow-lg p-8 flex flex-col items-center text-center"
          >
            <CheckCircle className="w-10 h-10 text-[#3DD56D] mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Reliability</h3>
            <p className="text-slate-300">Our systems are built to provide consistent, dependable power for years to come.</p>
          </motion.div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="w-full max-w-6xl mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7 }} 
          className="text-3xl md:text-4xl font-bold mb-8 text-white text-center"
        >
          Our Vision
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7 }} 
            className="bg-slate-900/80 border border-[#3DD56D]/20 rounded-xl shadow-lg p-8 flex flex-col"
          >
            <h3 className="text-2xl font-semibold text-[#3DD56D] mb-4">Short-Term Plans</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 mt-1"><div className="w-4 h-4 rounded-full bg-[#3DD56D]"></div></div>
                <p className="text-slate-300">Strengthen local market linkages to improve distribution efficiency</p>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1"><div className="w-4 h-4 rounded-full bg-[#3DD56D]"></div></div>
                <p className="text-slate-300">Enhance database and communication systems for better service delivery</p>
              </li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7 }} 
            className="bg-slate-900/80 border border-[#3DD56D]/20 rounded-xl shadow-lg p-8 flex flex-col"
          >
            <h3 className="text-2xl font-semibold text-[#3DD56D] mb-4">Long-Term Vision</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 mt-1"><div className="w-4 h-4 rounded-full bg-[#3DD56D]"></div></div>
                <p className="text-slate-300">Expand to 20+ regions and reach 1 million people by 2030</p>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1"><div className="w-4 h-4 rounded-full bg-[#3DD56D]"></div></div>
                <p className="text-slate-300">Lead innovation in off-grid and microgrid energy solutions</p>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </>
  )
})

ImpactSection.displayName = 'ImpactSection'

export default ImpactSection 