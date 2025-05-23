"use client"

import React, { useState, useEffect, useRef } from 'react';
import { SunMedium, Flame, Battery, Star, Zap, Calculator, BarChart2, ArrowRight, Shield, Leaf } from "lucide-react"
import { motion } from "framer-motion"
import { OptimizedBackground } from '../shared/OptimizedBackground'
import { products, Product } from '../../data/products';

/**
 * Custom hook for typewriter animation effect
 */
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

// Component props type
interface GreenProductsProps {
  noSeam?: boolean;
}

export default function GreenProducts({ noSeam = false }: GreenProductsProps) {
  const heroWords = [
    'Explore Our Products',
    'Clean Energy Solutions',
    'Empowering Communities',
    'Innovative Green Products',
  ];
  const headline = useTypewriter(heroWords);

  // Centralized State for Search, Filter, Sort
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<'popularity' | 'price' | 'newest'>('popularity');
  const collectionRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products
    .filter(p => (category === 'All' || p.category === category.toLowerCase()))
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price') return a.price - b.price;
      if (sort === 'newest') return 0; // Placeholder, add date if available
      return b.rating - a.rating;
    });

  // --- Smooth Scroll to Collection ---
  const handleSearchOrFilter = () => {
    setTimeout(() => {
      if (collectionRef.current) {
        collectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <OptimizedBackground 
      id="green-products" 
      className="flex flex-col items-center py-16 px-2 min-h-[100vh]" 
      withGradient={true}
      noSeam={noSeam}
    >
      {/* Hero Section with Loop Text Animation */}
      <div className="max-w-3xl mx-auto text-center mt-8 mb-16 relative z-10">
        <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-6 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20 shadow-lg">
          Grean World Products
        </div>
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-[#3DD56D] to-[#2bb757] bg-clip-text text-transparent drop-shadow-lg flex items-center justify-center overflow-hidden"
        >
          Find Your Perfect Energy Solution
        </h1>
        <div className="flex flex-col items-center gap-2 mb-6">
          <p className="text-xl md:text-2xl text-slate-200 font-semibold animate-fade-in-up">Browse Our Collection</p>
          <span className="text-base text-slate-400 font-normal">{headline}</span>
        </div>
        <button
          onClick={() => {
            if (collectionRef.current) {
              collectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#3DD56D] to-[#2bb757] text-white font-bold shadow-lg hover:scale-105 hover:shadow-[#3DD56D]/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3DD56D] focus:ring-offset-2 mt-2"
        >
          <ArrowRight className="h-5 w-5" /> Browse Collection
        </button>
        <style jsx>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(0.4,0,0.2,1) both;
          }
        `}</style>
      </div>

      {/* Premium Solar Home System 200W Card */}
      <div className="w-full max-w-[1200px] mx-auto mb-12">
        <div className="w-full h-[675px] bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl shadow-lg overflow-hidden relative" aria-label="Premium card featuring Solar Home System 200W" role="img">
          <div className="flex flex-col h-full relative z-10">
            <div className="flex flex-grow">
              {/* Left: Animated Visual */}
              <div className="w-[45%] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent z-0"></div>
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="relative w-[80%] h-[80%]">
                    {/* Grid pattern background - positioned at the center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-[400px] h-[300px] rounded-xl overflow-hidden shadow-2xl z-0">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3DD56D]/30 to-[#2bb757]/30 opacity-30 blur-sm rounded-xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0c253a] to-[#071221] border border-slate-700/50"></div>
                        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-3">
                          {Array(16).fill(0).map((_, index) => (
                            <div key={index} className="bg-blue-900/70 rounded-sm relative overflow-hidden" style={{backgroundColor: 'rgba(30, 58, 138, 0.7)', opacity: 1}}></div>
                          ))}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-20"></div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-72 h-72 rounded-full bg-green-600/10 animate-pulse"></div>
                      <div className="absolute w-56 h-56 rounded-full bg-green-600/15 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute w-40 h-40 rounded-full bg-green-600/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute w-24 h-24 rounded-full bg-green-600/30 flex items-center justify-center">
                        <BarChart2 className="w-12 h-12 text-white" />
                      </div>
                      {/* SVG lines/dots */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                        <g stroke="rgba(74, 222, 128, 0.3)" fill="none" strokeWidth="1">
                          <path d="M200,100 L100,200 L200,300 L300,200 Z"></path>
                          <path d="M200,100 L300,200"></path>
                          <path d="M100,200 L300,200"></path>
                          <path d="M200,300 L200,100"></path>
                        </g>
                        <g fill="rgba(74, 222, 128, 0.6)">
                          <circle cx="200" cy="100" r="5"></circle>
                          <circle cx="100" cy="200" r="5"></circle>
                          <circle cx="200" cy="300" r="5"></circle>
                          <circle cx="300" cy="200" r="5"></circle>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right: Content */}
              <div className="w-[55%] p-10 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-3 bg-[#3DD56D] text-white">Solar Energy</div>
                    <h3 className="text-3xl font-bold text-gray-300 leading-tight mb-4">Solar Home System 200W</h3>
                    <p className="text-lg text-slate-300">Our flagship solar home system with everything needed to power a small household, including lighting, phone charging, and TV capability.</p>
                  </div>
                  {/* Stats card */}
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 py-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#3DD56D]">200W</div>
                        <div className="text-xs text-slate-400">Panel Power</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#3DD56D]">2 yrs</div>
                        <div className="text-xs text-slate-400">Warranty</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#3DD56D]">ETB 16,499</div>
                        <div className="text-xs text-slate-400">Price</div>
                      </div>
                    </div>
                  </div>
                  {/* Features card */}
                  <div className="bg-slate-900 p-5 rounded-lg border border-slate-800">
                    <h4 className="text-xl font-semibold text-white mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#2bb757]/50 p-2 rounded-full"><SunMedium className="w-5 h-5 text-[#3DD56D]" /></div>
                        <span className="text-white">200W solar panel</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#2bb757]/50 p-2 rounded-full"><Battery className="w-5 h-5 text-[#3DD56D]" /></div>
                        <span className="text-white">Battery backup</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#2bb757]/50 p-2 rounded-full"><Zap className="w-5 h-5 text-[#3DD56D]" /></div>
                        <span className="text-white">LED lights & charging</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#2bb757]/50 p-2 rounded-full"><Star className="w-5 h-5 text-[#3DD56D]" /></div>
                        <span className="text-white">2-year local support</span>
                      </div>
                    </div>
                  </div>
                  {/* Tags & CTA */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex space-x-3">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#3DD56D] text-[#3DD56D]">#SolarHome</div>
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#3DD56D] text-[#3DD56D]">#CleanEnergy</div>
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#3DD56D] text-[#3DD56D]">#OffGrid</div>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#3DD56D] hover:bg-[#2bb757] text-white">See Details <ArrowRight className="ml-1 h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Mirt Stove Deluxe Card */}
      <div className="w-full max-w-[1200px] mx-auto mb-12">
        <div className="w-full h-[627px] bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl shadow-lg overflow-hidden relative" aria-label="LinkedIn modern innovation card featuring Mirt Stove Deluxe" role="img">
          <div className="flex h-full flex-col">
            <div className="flex flex-grow">
              {/* Left: Content */}
              <div className="w-[55%] p-10 flex flex-col justify-between">
                <div className="space-y-8">
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center">
                        <Flame className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Mirt Stove Deluxe</h3>
                        <p className="text-slate-300">Efficient Injera Baking Solution</p>
                      </div>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-2">
                      <Flame className="w-5 h-5 text-blue-400" />
                      <p className="text-sm font-medium text-white">@mirtstove</p>
                    </div>
                  </div>
                  {/* Product Card */}
                  <div className="bg-gradient-to-r from-indigo-600 to-blue-800 text-white p-5 rounded-lg shadow-md">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-2 bg-white/20 backdrop-blur-sm text-white">Clean Cooking</span>
                    <h4 className="text-xl font-semibold mb-2">Efficient, Durable, and Eco-Friendly</h4>
                    <p className="text-base">The enhanced Mirt stove is made from durable sand and cement mortar, designed for Ethiopian households to bake injera efficiently and reduce fuel use.</p>
                  </div>
                  {/* Features & Impact */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <Flame className="w-6 h-6 text-blue-400" />
                        <h5 className="font-semibold text-white">Key Features</h5>
                      </div>
                      <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                        <li>Bakes up to 30 injeras per day</li>
                        <li>Reduces fuel consumption by 50%</li>
                        <li>5+ year lifespan with proper maintenance</li>
                      </ul>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <BarChart2 className="w-6 h-6 text-blue-400" />
                        <h5 className="font-semibold text-white">Environmental Impact</h5>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-indigo-400">50%</div>
                          <div className="text-xs text-slate-400">Fuel savings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-indigo-400">30+</div>
                          <div className="text-xs text-slate-400">Injeras/day</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-indigo-400">5 yrs</div>
                          <div className="text-xs text-slate-400">Lifespan</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-indigo-400">Eco</div>
                          <div className="text-xs text-slate-400">Local materials</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Tags & CTA */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex space-x-3">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-indigo-500 text-indigo-400 bg-transparent">#CleanCooking</span>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-indigo-500 text-indigo-400 bg-transparent">#Injera</span>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-indigo-500 text-indigo-400 bg-transparent">#EcoStove</span>
                    </div>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white">View Details <ArrowRight className="ml-1 h-4 w-4" /></button>
                  </div>
                </div>
              </div>
              {/* Right: Animated Visual */}
              <div className="w-[45%] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-l from-indigo-900/80 to-transparent z-0"></div>
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="relative w-[80%] h-[80%]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-72 h-72 rounded-full bg-indigo-600/20 animate-pulse"></div>
                      <div className="absolute w-56 h-56 rounded-full bg-indigo-600/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute w-40 h-40 rounded-full bg-indigo-600/40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute w-24 h-24 rounded-full bg-indigo-600/50 flex items-center justify-center">
                        <Flame className="w-12 h-12 text-white" />
                      </div>
                      {/* SVG lines/dots */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                        <g stroke="rgba(129, 140, 248, 0.4)" fill="none" strokeWidth="1">
                          <path d="M200,200 L150,150"></path>
                          <path d="M200,200 L250,150"></path>
                          <path d="M200,200 L150,250"></path>
                          <path d="M200,200 L250,250"></path>
                          <path d="M200,200 L120,200"></path>
                          <path d="M200,200 L280,200"></path>
                          <path d="M200,200 L200,120"></path>
                          <path d="M200,200 L200,280"></path>
                        </g>
                        <g fill="rgba(129, 140, 248, 0.8)">
                          <circle cx="150" cy="150" r="5"></circle>
                          <circle cx="250" cy="150" r="5"></circle>
                          <circle cx="150" cy="250" r="5"></circle>
                          <circle cx="250" cy="250" r="5"></circle>
                          <circle cx="120" cy="200" r="5"></circle>
                          <circle cx="280" cy="200" r="5"></circle>
                          <circle cx="200" cy="120" r="5"></circle>
                          <circle cx="200" cy="280" r="5"></circle>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-blue-800 py-3 px-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Find Your Perfect Energy Solution Section */}
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-6 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search mr-2 h-4 w-4">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <span>Discover Your Perfect Match</span>
            </div>
            {/* Animated Section Title */}
            <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#3DD56D] to-white">
              Find Your Perfect Energy Solution
            </h3>
            <div className="max-w-2xl mx-auto">
              <p className="text-slate-300 text-lg">Discover products tailored to your unique needs with our intelligent filtering system, designed to match you with the perfect sustainable energy solution.</p>
            </div>
          </div>
          <div className="p-8 overflow-hidden relative bg-transparent">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative z-10">
              {/* Enhanced Search Bar */}
              <div className="relative w-full md:w-auto md:min-w-[400px] group">
                <input
                  className="flex h-12 border-2 px-4 text-lg rounded-lg shadow focus:ring-2 focus:ring-[#3DD56D] focus:border-[#3DD56D] transition-all duration-300 bg-slate-900 border-slate-700 text-white placeholder:text-slate-400 w-full pr-12"
                  placeholder="Search solar panels, batteries, stoves..."
                  type="text"
                  aria-label="Search products"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSearchOrFilter(); }}
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#3DD56D] hover:bg-[#2bb757] text-white rounded-full p-2 shadow transition" aria-label="Search" onClick={handleSearchOrFilter}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                      </svg>
                    </button>
                  </div>
              {/* Premium Filter Controls */}
              <div className="flex flex-wrap gap-3 w-full md:w-auto mt-4 md:mt-0">
                {['All', 'Solar', 'Stoves', 'Grid', 'Ethanol'].map(cat => (
                  <button
                    key={cat}
                    className={`px-4 py-2 rounded-full border font-semibold focus:outline-none focus:ring-2 transition ${
                      category === cat
                        ? 'bg-[#3DD56D]/20 text-[#3DD56D] border-[#3DD56D]/50'
                        : cat === 'Solar'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-400/30 hover:bg-blue-500/20 focus:ring-blue-400'
                        : cat === 'Stoves'
                        ? 'bg-orange-500/10 text-orange-400 border-orange-400/30 hover:bg-orange-500/20 focus:ring-orange-400'
                        : cat === 'Grid'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-400/30 hover:bg-purple-500/20 focus:ring-purple-400'
                        : cat === 'Ethanol'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-400/30 hover:bg-emerald-500/20 focus:ring-emerald-400'
                        : 'bg-slate-700/10 text-slate-300 border-slate-700/30 hover:bg-slate-700/20 focus:ring-slate-400'
                    }`}
                    onClick={() => { setCategory(cat); handleSearchOrFilter(); }}
                  >
                    {cat}
                    </button>
                ))}
                  </div>
              {/* Sort Dropdown */}
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <select
                  className="h-12 px-4 rounded-lg border border-slate-700 bg-slate-900 text-white focus:ring-2 focus:ring-[#3DD56D] focus:border-[#3DD56D]"
                  value={sort}
                  onChange={e => { setSort(e.target.value); handleSearchOrFilter(); }}
                  aria-label="Sort products"
                >
                  <option value="popularity">Sort by: Popularity</option>
                  <option value="price">Sort by: Price</option>
                  <option value="newest">Sort by: Newest</option>
                </select>
              </div>
            </div>
            {/* CTA Button */}
            <div className="text-center mt-8">
              <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#3DD56D] to-[#2bb757] text-white font-bold text-lg shadow-lg hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-[#3DD56D]">
                Get Personalized Recommendation
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5 ml-2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section ref={collectionRef} className="py-16 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-4 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span>All Products</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#3DD56D] to-white">Browse Our Collection</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">Explore our complete range of sustainable energy solutions designed for Ethiopian communities.</p>
          </div>
          {/* Filter Bar (hidden, now controlled above) */}
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-slate-400 py-12 text-lg">No products found. Try adjusting your search or filters.</div>
            ) : (
              filteredProducts.map((product, idx) => {
                // Example: Make the first product in the filtered list a hero card
                const isHero = idx === 0;
                return (
                  <div key={product.name} className={`group${isHero ? ' hero-card' : ''}`}> 
                    <div
                      className="relative transition-transform hover:scale-105"
                      style={{
                        transformStyle: 'preserve-3d',
                        ...(isHero ? { height: '420px', width: '370px', minWidth: '320px', maxWidth: '100%' } : {})
                      }}
                    >
                <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden h-full hover:border-[#3DD56D]/50 transition-colors duration-300 relative">
                        {product.badge && (
                          <div className="absolute top-4 right-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">{product.badge}</div>
                        )}
                  <div className="h-56 bg-gradient-to-br from-slate-800/70 to-slate-900/70 relative overflow-hidden group-hover:from-slate-800/90 group-hover:to-slate-900/90 transition-colors duration-300">
                    <div className="absolute top-0 left-0 w-full p-4 flex flex-wrap gap-2">
                            {product.tags.map(tag => (
                              <div key={tag} className="text-xs font-bold px-2 py-1 rounded bg-[#3DD56D]/80 text-white">{tag}</div>
                            ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-white group-hover:text-[#3DD56D] transition-colors duration-300">{product.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-slate-300">{product.rating >= 4.5 ? '★★★★★' : '★★★★☆'} ({product.rating})</span>
                      </div>
                    </div>
                          <p className="text-[#3DD56D] font-medium mb-2 text-sm uppercase tracking-wider">{product.category}</p>
                          <p className="text-slate-300 mb-4 line-clamp-2 text-sm">{product.description}</p>
                    <div className="flex justify-between items-center mt-6">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                                <span className="text-white text-2xl font-bold">ETB {product.price.toLocaleString()}</span>
                                {product.oldPrice && <span className="text-slate-400 line-through text-sm">ETB {product.oldPrice.toLocaleString()}</span>}
                        </div>
                              {product.oldPrice && <span className="text-xs text-[#3DD56D]">Save ETB {(product.oldPrice - product.price).toLocaleString()}</span>}
                      </div>
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm h-9 px-3 bg-[#3DD56D] hover:bg-[#2bb757] text-white rounded-full">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                );
              })
            )}
          </div>
          <div className="mt-12 text-center">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:text-accent-foreground shadow-sm h-10 px-4 py-2 rounded-full border-[#3DD56D] text-[#3DD56D] hover:bg-[#3DD56D]/10">
              Load More Products
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Product Comparison Section */}
      <section id="comparison" className="py-16 px-4 sm:px-6 relative">
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute" style={{ width: '189.259px', height: '192.816px', backgroundColor: 'rgb(74, 222, 128)', opacity: 0.05, top: '78.2924%', left: '87.8548%', borderRadius: '43.5384% 29.3128% 40.3582% 42.5212%', filter: 'blur(40px)', transform: 'translateX(9.07221px) translateY(-9.07221px)' }}></div>
          <div className="absolute" style={{ width: '227.021px', height: '261.767px', backgroundColor: 'rgb(74, 222, 128)', opacity: 0.05, top: '39.9809%', left: '38.6442%', borderRadius: '42.3744% 44.5483% 46.2239% 35.2775%', filter: 'blur(40px)', transform: 'translateX(9.07221px) translateY(-9.07221px)' }}></div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-4 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20">
              <Calculator className="mr-2 h-3 w-3" />
              <span>Compare &amp; Choose</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Product Comparison</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">Compare our most popular energy solutions to find the perfect fit for your needs and budget.</p>
          </div>
          <div className="overflow-x-auto mt-6 rounded-xl border border-slate-700/50 shadow-2xl bg-slate-800/40 backdrop-blur-lg">
            <table className="min-w-full text-sm divide-y divide-slate-700/50">
              <thead className="bg-slate-800/80 text-white sticky top-0">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold text-left">Product</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-center">Category</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-left">Features</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-center">Efficiency</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-center">Warranty</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-center">Price</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                <tr className="hover:bg-[#3DD56D]/10 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-500/30 shadow-inner border border-amber-400/30">
                        <Flame className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Basic Stove</div>
                        <div className="text-xs text-slate-400">basic-stove</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-400/30 shadow-sm">stoves</span>
                  </td>
                  <td className="px-6 py-5">
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors"><span className="text-[#3DD56D] mr-2">✓</span><span className="text-slate-300">Energy-efficient</span></li>
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors"><span className="text-[#3DD56D] mr-2">✓</span><span className="text-slate-300">Portable</span></li>
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors"><span className="text-[#3DD56D] mr-2">✓</span><span className="text-slate-300">Easy to use</span></li>
                    </ul>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold text-white">65%</div>
                      <div className="w-16 h-4 bg-slate-700 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#3DD56D]/80 to-[#3DD56D] rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-white font-semibold">1 year</span>
                      <span className="text-xs text-slate-400">Full Coverage</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold text-white">ETB 1,709</div>
                      <div className="text-xs text-[#3DD56D] font-semibold">Best Value</div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md h-9 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-white">Select Plan</button>
                  </td>
                </tr>
                <tr className="hover:bg-[#3DD56D]/10 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500/30 shadow-inner border border-blue-400/30">
                        <SunMedium className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Solar Kit</div>
                        <div className="text-xs text-slate-400">solar-kit</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-400/30 shadow-sm">solar</span>
                  </td>
                  <td className="px-6 py-5">
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors"><span className="text-[#3DD56D] mr-2">✓</span><span className="text-slate-300">Clean energy</span></li>
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors"><span className="text-[#3DD56D] mr-2">✓</span><span className="text-slate-300">Battery backup</span></li>
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors"><span className="text-[#3DD56D] mr-2">✓</span><span className="text-slate-300">Easy installation</span></li>
                    </ul>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold text-white">80%</div>
                      <div className="w-16 h-4 bg-slate-700 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#3DD56D]/80 to-[#3DD56D] rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-white font-semibold">5 years</span>
                      <span className="text-xs text-slate-400">Full Coverage</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold text-white">ETB 11,399</div>
                      <div className="text-xs text-[#3DD56D] font-semibold">Most Popular</div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md h-9 px-4 py-2 rounded-full w-full mt-2 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white">Select Plan</button>
                  </td>
                </tr>
                <tr className="hover:bg-[#3DD56D]/10 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-500/30 shadow-inner border border-purple-400/30">
                        <Zap className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Hybrid System</div>
                        <div className="text-xs text-slate-400">hybrid-system</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-400/30 shadow-sm">grid</span>
                  </td>
                  <td className="px-6 py-5">
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors"><span className="text-[#3DD56D] mr-2">✓</span><span className="text-slate-300">Smart grid integration</span></li>
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors"><span className="text-[#3DD56D] mr-2">✓</span><span className="text-slate-300">Solar + Backup</span></li>
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors"><span className="text-[#3DD56D] mr-2">✓</span><span className="text-slate-300">Remote monitoring</span></li>
                    </ul>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold text-white">95%</div>
                      <div className="w-16 h-4 bg-slate-700 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#3DD56D]/80 to-[#3DD56D] rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-white font-semibold">10 years</span>
                      <span className="text-xs text-slate-400">Full Coverage</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold text-white">ETB 28,499</div>
                      <div className="text-xs text-[#3DD56D] font-semibold">Premium</div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md h-9 px-4 py-2 rounded-full w-full mt-2 bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-400 hover:to-purple-500 text-white">Select Plan</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </OptimizedBackground>
  )
} 