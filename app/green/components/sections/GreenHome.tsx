import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { SunMedium, Leaf, Wind, Zap, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Typewriter animation hook
const useTypewriter = (words: string[], speed = 80, pause = 1200) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), pause);
      return;
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words, speed, pause]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return `${words[index].substring(0, subIndex)}${blink ? '|' : ' '}`;
};

// SVG pattern as a data URI for better performance
const trianglePatternSvg = `
  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,0 L12,24 L24,0 Z" fill="#22c55e" fill-opacity="0.05"/>
  </svg>
`;

const encodedSvg = encodeURIComponent(trianglePatternSvg);
const backgroundPattern = `url("data:image/svg+xml,${encodedSvg}")`;

const GreenHome = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const headline = useTypewriter([
    "Building a Greener Future",
    "Empowering Villages",
    "Sustainable Energy for All"
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

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
  };

  // Background style with both color and pattern
  const backgroundStyle: CSSProperties = {
    backgroundColor: '#eafff2',
    backgroundImage: backgroundPattern,
    backgroundSize: '24px 24px',
    backgroundRepeat: 'repeat',
    position: 'relative',
    zIndex: 10,
    boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.2)', // Adds shadow for depth
    borderTopLeftRadius: '30px',
    borderTopRightRadius: '30px',
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[80px] before:bg-transparent before:-translate-y-full" style={backgroundStyle}>
      <div className="relative z-10">
        <motion.section
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          id="green-home"
          className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden mt-0 min-h-[90vh] flex items-center"
        >
          {/* Remove or tone down dark/blurred blobs and overlays */}
          {/* No extra background blobs for a clean, light look */}
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Hero content with typewriter animation */}
              <motion.div
                variants={itemVariants}
                className="text-left max-w-2xl"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium mb-8 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/30"
                >
              <span className="flex items-center">
                <SunMedium className="mr-2 h-4 w-4" /> Powering a Sustainable Future
              </span>
                </motion.div>
                <motion.h1
                  variants={itemVariants}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight text-green-800"
                >
                  {headline}
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-green-900/80 text-lg md:text-xl mb-12 max-w-xl leading-relaxed"
                >
                  <span className="italic text-[#3DD56D] font-medium">Turning 20 Villages</span> into Green Villages by 2030. Leading Ethiopia's energy transition with <span className="text-green-900 font-medium">sustainable, reliable, and affordable innovations</span>.
                </motion.p>
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-5"
                >
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/solutions"
                  >
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-[#3DD56D] to-[#2bb757] text-white hover:shadow-md hover:shadow-[#3DD56D]/20 hover:translate-y-[-2px] h-12 px-8 text-base rounded-full shadow-lg shadow-green-900/20">
                      <span className="relative z-10 flex items-center text-base">Explore Solutions<span><ArrowRight className="ml-2 h-5 w-5" /></span></span>
                </button>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                  >
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 border-[#3DD56D] text-[#3DD56D] bg-transparent hover:bg-[#3DD56D]/10 hover:shadow-md hover:shadow-[#3DD56D]/10 h-12 px-8 text-base rounded-full">
                  <span className="relative z-10 text-base">Contact Us</span>
                </button>
                  </motion.a>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="mt-14 flex flex-wrap items-center gap-5"
                >
                  <span className="text-sm text-green-900/60">Trusted by:</span>
                  <div className="flex space-x-6 opacity-80">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="h-8 w-20 bg-[#3DD56D]/10 rounded-md flex items-center justify-center shadow"
                    >
                      <SunMedium className="h-5 w-5 text-green-700" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="h-8 w-20 bg-[#3DD56D]/10 rounded-md flex items-center justify-center shadow"
                    >
                      <Leaf className="h-5 w-5 text-green-700" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="h-8 w-20 bg-[#3DD56D]/10 rounded-md flex items-center justify-center shadow"
                    >
                      <Wind className="h-5 w-5 text-green-700" />
                    </motion.div>
            </div>
                </motion.div>
              </motion.div>
              {/* Right: Solar panel card/grid with corner lines (original markup) */}
              <motion.div
                variants={itemVariants}
                className="relative hidden lg:block h-[500px]"
              >
            <div className="absolute inset-0">
              <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-[400px] h-[300px] rounded-xl overflow-hidden shadow-2xl">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3DD56D]/30 to-[#2bb757]/30 opacity-30 blur-sm rounded-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0c253a] to-[#071221] border border-slate-700/50"></div>
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-3">
                    {[...Array(16)].map((_, i) => (
                          <div key={i} className="bg-blue-900/70 rounded-sm relative overflow-hidden" style={{ backgroundColor: 'rgba(30, 58, 138, 0.7)', opacity: 1 }} />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-20"></div>
                </div>
                    {/* Top-right L-angle */}
                <div className="absolute top-0 right-0 w-20 h-20">
                  <div className="absolute w-full h-full border-t-2 border-r-2 border-[#3DD56D]/30 rounded-tr-xl"></div>
                </div>
                    {/* Bottom-left L-angle */}
                <div className="absolute bottom-0 left-0 w-20 h-20">
                  <div className="absolute w-full h-full border-b-2 border-l-2 border-[#3DD56D]/30 rounded-bl-xl"></div>
                </div>
              </div>
                </div>
              </motion.div>
            </div>
          </div>
          {/* Scroll to explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center text-slate-400 text-sm pointer-events-none">
          <span className="mb-2 text-slate-400/70">Scroll to explore</span>
              <motion.svg
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down h-5 w-5 text-[#3DD56D]"
              >
            <path d="m6 9 6 6 6-6"></path>
              </motion.svg>
        </div>
          </motion.div>
        </motion.section>
      </div>
    </section>
  );
};

export default GreenHome; 