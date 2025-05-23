"use client"

import { motion } from "framer-motion"
import { Phone, MessageSquare, MapPin, Send, Users, Mail, SunMedium, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { OptimizedBackground } from '../shared/OptimizedBackground'

// Component props type
interface GreenContactProps {
  noSeam?: boolean;
}

export default function GreenContact({ noSeam = false }: GreenContactProps) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Typewriter animation for hero headline
  function useTypewriter(words: string[], speed = 70, pause = 1200) {
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
  }

  const contactHeroWords = [
    "We'd Love to Hear From You",
    'Contact Our Team',
    "Let's Connect",
    'Your Clean Energy Partner',
  ];
  const contactHeadline = useTypewriter(contactHeroWords);

  return (
    <OptimizedBackground 
      id="green-contact" 
      className="py-12 px-4 sm:px-6 overflow-hidden" 
      withGradient={true}
      noSeam={noSeam}
    >
      {/* Contact Hero Section */}
      <div className="w-full flex flex-col items-center justify-center py-20 mb-8">
        <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-6 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20 shadow-lg">
          <Mail className="mr-2 h-5 w-5" /> Contact
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-[#3DD56D] to-[#2bb757] bg-clip-text text-transparent drop-shadow-lg min-h-[3.5em] flex items-center justify-center overflow-hidden line-clamp-2">{contactHeadline}</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto text-center mb-8">Our team is ready to answer your questions, provide support, or help you get started with clean energy solutions. Reach out and let's connect!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact-form">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-lg font-bold px-8 py-3 bg-gradient-to-r from-[#3DD56D] to-[#22c55e] text-white shadow-lg hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-[#3DD56D]">
              <Send className="mr-2 h-5 w-5" /> Send a Message
            </button>
          </a>
          <a href="tel:+251913330000">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-lg font-bold px-8 py-3 border-2 border-[#3DD56D] text-[#3DD56D] bg-slate-900/40 shadow hover:bg-[#3DD56D]/10 transition focus:outline-none focus:ring-2 focus:ring-[#3DD56D]">
              <Phone className="mr-2 h-5 w-5" /> Call Us
            </button>
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl py-4 px-4 shadow-xl border border-slate-700/50 overflow-hidden relative group">
            {/* Animated Borders */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3DD56D]/30 to-transparent" style={{ transform: 'translateX(30.45%)' }}></div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3DD56D]/20 to-transparent" style={{ transform: 'translateX(-30.45%)' }}></div>
            </div>
            <div className="absolute -top-2 -left-2 w-16 h-16 overflow-hidden">
              <div className="absolute top-0 left-0 w-[1px] h-16 bg-[#3DD56D]/30"></div>
              <div className="absolute top-0 left-0 w-16 h-[1px] bg-[#3DD56D]/30"></div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 overflow-hidden">
              <div className="absolute bottom-0 right-0 w-[1px] h-16 bg-[#3DD56D]/30"></div>
              <div className="absolute bottom-0 right-0 w-16 h-[1px] bg-[#3DD56D]/30"></div>
            </div>
            <div className="relative">
              <div className="flex items-center mb-4">
                <span className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-[#3DD56D]/15 text-[#3DD56D] border border-[#3DD56D]/30 mr-3">
                  <Mail className="h-5 w-5 mr-2" /> Get in Touch
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Contact Us</h2>
              <p className="text-slate-300 text-lg mb-6">Fill out the form below and our team will get back to you within 24 hours.</p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-medium text-sm text-slate-300" htmlFor="name">Full Name</label>
                    <div className="relative group">
                      <input className="flex w-full border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD56D] focus:border-[#3DD56D] md:text-sm bg-slate-800/50 border-slate-700/50 focus:border-[#3DD56D]/50 focus:ring-[#3DD56D]/30 transition-all duration-300 h-12 pl-10 rounded-lg" id="name" placeholder="Your name" required name="name" />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-[#3DD56D] transition-colors">
                        <Users className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-medium text-sm text-slate-300" htmlFor="email">Email Address</label>
                    <div className="relative group">
                      <input className="flex w-full border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD56D] focus:border-[#3DD56D] md:text-sm bg-slate-800/50 border-slate-700/50 focus:border-[#3DD56D]/50 focus:ring-[#3DD56D]/30 transition-all duration-300 h-12 pl-10 rounded-lg" id="email" placeholder="Your email" required type="email" name="email" />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-[#3DD56D] transition-colors">
                        <Mail className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-medium text-sm text-slate-300" htmlFor="phone">Phone Number</label>
                    <div className="relative group">
                      <input className="flex w-full border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD56D] focus:border-[#3DD56D] md:text-sm bg-slate-800/50 border-slate-700/50 focus:border-[#3DD56D]/50 focus:ring-[#3DD56D]/30 transition-all duration-300 h-12 pl-10 rounded-lg" id="phone" placeholder="Your phone (optional)" name="phone" />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-[#3DD56D] transition-colors">
                        <Phone className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-medium text-sm text-slate-300" htmlFor="subject">Subject</label>
                    <div className="relative group">
                      <input className="flex w-full border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD56D] focus:border-[#3DD56D] md:text-sm bg-slate-800/50 border-slate-700/50 focus:border-[#3DD56D]/50 focus:ring-[#3DD56D]/30 transition-all duration-300 h-12 pl-10 rounded-lg" id="subject" placeholder="How can we help?" required name="subject" />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-[#3DD56D] transition-colors">
                        <SunMedium className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-medium text-sm text-slate-300" htmlFor="interest">I'm interested in</label>
                  <div className="relative">
                    <button type="button" className="flex items-center justify-between border px-3 py-2 text-sm ring-offset-background placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-full bg-slate-800/50 border-slate-700/50 focus:border-[#3DD56D]/50 focus:ring-[#3DD56D]/30 transition-all duration-300 h-12 rounded-lg text-slate-300">
                      <span style={{ pointerEvents: 'none' }}>Select an option</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </button>
                    <select aria-hidden="true" tabIndex={-1} className="absolute w-1 h-1 p-0 m-[-1px] overflow-hidden clip-rect-0 whitespace-nowrap border-0">
                      <option value="solar">Solar Energy Products</option>
                      <option value="stoves">Clean Cooking Stoves</option>
                      <option value="consulting">Energy Consulting</option>
                      <option value="distribution">Distribution Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-medium text-sm text-slate-300" htmlFor="message">Your Message</label>
                  <div className="relative group">
                    <textarea className="flex w-full border px-3 py-2 text-base ring-offset-background text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD56D] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-slate-800/50 border-slate-700/50 focus:border-[#3DD56D]/50 focus:ring-[#3DD56D]/30 transition-all duration-300 min-h-[120px] pl-10 pt-3 rounded-lg" id="message" name="message" placeholder="Tell us more about your needs..." required></textarea>
                    <div className="absolute left-3 top-3 text-slate-400 group-focus-within:text-[#3DD56D] transition-colors">
                      <Send className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-lg font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD56D] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 px-4 py-2 bg-gradient-to-r from-[#3DD56D] to-[#22c55e] hover:from-[#22c55e] hover:to-[#3DD56D] text-white w-full group relative overflow-hidden rounded-full h-14 shadow-xl shadow-[#22c55e]/10" type="submit">
                    <span className="relative z-10 flex items-center justify-center text-base font-medium">Send Message<span className="ml-2"><Send className="h-4 w-4" /></span></span>
                    <span className="absolute inset-0 bg-[#2bb757]" style={{ transform: 'translateX(-100%)' }}></span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-8 shadow-xl border border-slate-700/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#3DD56D]/20 rotate-45 transform origin-bottom-left"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center text-white">
                  <MapPin className="h-5 w-5 mr-2 text-[#3DD56D]" /> Contact Information
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="bg-slate-800/50 p-3 rounded-lg mr-4 mt-1 shadow-inner">
                      <MapPin className="h-5 w-5 text-[#3DD56D]" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Location</p>
                      <p className="text-slate-300 mt-1">Kirkos Sub City Wereda 02</p>
                      <p className="text-slate-400 text-sm">Deberezeit road, Sierra Leone street</p>
                      <p className="text-slate-400 text-sm">Tegene Building (Global Hotel), 6th floor</p>
                      <p className="text-slate-400 text-sm">Addis Ababa, Ethiopia</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-slate-800/50 p-3 rounded-lg mr-4 mt-1 shadow-inner">
                      <Mail className="h-5 w-5 text-[#3DD56D]" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Email Us</p>
                      <p className="text-slate-300 mt-1 group-hover:text-[#3DD56D] transition-colors">
                        <a href="mailto:info@greanworld.com" className="hover:text-[#3DD56D] transition-colors border-b border-dashed border-slate-600 hover:border-[#3DD56D]">info@greanworld.com</a>
                      </p>
                      <p className="text-slate-400 text-sm">We'll respond within 24 hours</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-slate-800/50 p-3 rounded-lg mr-4 mt-1 shadow-inner">
                      <Phone className="h-5 w-5 text-[#3DD56D]" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Call Us</p>
                      <p className="text-slate-300 mt-1 group-hover:text-[#3DD56D] transition-colors">
                        <a href="tel:+251913330000" className="hover:text-[#3DD56D] transition-colors border-b border-dashed border-slate-600 hover:border-[#3DD56D]">(+251) 913 330000</a>
                      </p>
                      <p className="text-slate-400 text-sm">Mon-Fri from 8am to 5pm</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 shadow-xl border border-slate-700/50 relative overflow-hidden h-[300px]">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900/80"></div>
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-8">
                  {Array.from({ length: 96 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-slate-700/20"></div>
                  ))}
                </div>
                <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ opacity: 0.2 }}>
                  <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] rounded-full border border-[#3DD56D]/30">
                    <div className="absolute top-[30%] left-[40%] w-[40%] h-[40%] border-t border-l border-[#3DD56D]/30 rounded-tl-full"></div>
                    <div className="absolute top-[20%] left-[20%] w-[30%] h-[2px] bg-[#3DD56D]/30"></div>
                    <div className="absolute top-[50%] left-[10%] w-[80%] h-[2px] bg-[#3DD56D]/30"></div>
                    <div className="absolute top-[70%] left-[30%] w-[40%] h-[2px] bg-[#3DD56D]/30"></div>
                  </div>
                  <div className="absolute top-[35%] left-[45%] w-4 h-4 rounded-full border border-[#3DD56D]/40"></div>
                  <div className="absolute top-[45%] left-[55%] w-3 h-3 rounded-full border border-[#3DD56D]/40"></div>
                  <div className="absolute top-[55%] left-[42%] w-3 h-3 rounded-full border border-[#3DD56D]/40"></div>
                </div>
                <div className="absolute top-[45%] left-[53%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="map-pulse w-8 h-8 rounded-full bg-[#3DD56D]/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm"></div>
                  <div className="w-12 h-12 rounded-full bg-[#3DD56D]/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping-slow"></div>
                  <div className="map-pin w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-[#3DD56D] w-6 h-6 rounded-full flex items-center justify-center shadow-lg shadow-[#3DD56D]/30">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-slate-800/90 backdrop-blur-sm px-3 py-2 rounded-md text-xs text-white border border-slate-700/50 shadow-md font-medium">Kirkos, Addis Ababa, Ethiopia</div>
              <div className="absolute bottom-3 left-3 bg-slate-800/90 backdrop-blur-sm px-3 py-2 rounded-md text-xs text-white border border-slate-700/50 shadow-md font-medium">8.993458, 38.759742</div>
              <div className="absolute top-3 right-3 flex flex-col space-y-1">
                <button className="w-6 h-6 bg-slate-800/90 border border-slate-700/50 rounded flex items-center justify-center text-slate-300 text-xs">+</button>
                <button className="w-6 h-6 bg-slate-800/90 border border-slate-700/50 rounded flex items-center justify-center text-slate-300 text-xs">-</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OptimizedBackground>
  )
} 