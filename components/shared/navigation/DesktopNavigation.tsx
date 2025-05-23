"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navItems } from "./NavigationItems"

interface DesktopNavigationProps {
  activeNavItem: string | null;
  onNavigate?: (path: string) => void;
}

export function DesktopNavigation({ activeNavItem, onNavigate }: DesktopNavigationProps) {
  
  // Wrapper to handle navigation via link or callback
  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };
  
  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:block"
      >
        <ul className="flex gap-6 lg:gap-8 flex-col">
          {navItems.map((item, index) => (
            <React.Fragment key={item.name}>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="relative group"
              >
                {onNavigate ? (
                  <motion.div
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`cursor-pointer nav-item rounded-lg px-4 py-2 shadow-md bg-slate-900/80 border border-slate-700/40 transition-all duration-300 ${activeNavItem === item.href ? "bg-green-500/20 border-green-400 text-green-400" : "hover:bg-slate-800/80 hover:border-green-400"}`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <motion.div
                      className="flex items-center gap-1.5 relative"
                      initial={false}
                      animate={
                        activeNavItem === item.href
                          ? {
                              color: "#4ade80",
                              textShadow: "0 0 8px rgba(74, 222, 128, 0.5)",
                            }
                          : { color: "#f8fafc", textShadow: "none" }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.name}</span>
                      {item.submenu && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-1"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      )}
                      {/* Animated underline indicator */}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-green-500"
                        initial={{ width: 0 }}
                        animate={{
                          width: activeNavItem === item.href ? "100%" : 0,
                          opacity: activeNavItem === item.href ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>
                ) : (
                  <Link href={item.href}>
                    <motion.div
                      className={`cursor-pointer nav-item rounded-lg px-4 py-2 shadow-md bg-slate-900/80 border border-slate-700/40 transition-all duration-300 ${activeNavItem === item.href ? "bg-green-500/20 border-green-400 text-green-400" : "hover:bg-slate-800/80 hover:border-green-400"}`}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <motion.div
                        className="flex items-center gap-1.5 relative"
                        initial={false}
                        animate={
                          activeNavItem === item.href
                            ? {
                                color: "#4ade80",
                                textShadow: "0 0 8px rgba(74, 222, 128, 0.5)",
                              }
                            : { color: "#f8fafc", textShadow: "none" }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.name}</span>
                        {item.submenu && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-1"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        )}
                        {/* Animated underline indicator */}
                        <motion.div
                          className="absolute -bottom-1 left-0 h-0.5 bg-green-500"
                          initial={{ width: 0 }}
                          animate={{
                            width: activeNavItem === item.href ? "100%" : 0,
                            opacity: activeNavItem === item.href ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </motion.div>
                  </Link>
                )}
                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-2 bg-slate-800/95 rounded-md shadow-xl border border-slate-700/50">
                      {item.submenu.map((subItem) => (
                        onNavigate ? (
                          <div 
                            key={subItem.name} 
                            onClick={(e) => handleNavClick(e, subItem.href)}
                            className="block px-4 py-2 text-sm text-slate-300 hover:bg-green-500/10 hover:text-[#3DD56D] rounded-md transition-all duration-200 cursor-pointer"
                          >
                            {subItem.name}
                          </div>
                        ) : (
                          <Link key={subItem.name} href={subItem.href}>
                            <div className="block px-4 py-2 text-sm text-slate-300 hover:bg-green-500/10 hover:text-[#3DD56D] rounded-md transition-all duration-200">
                              {subItem.name}
                            </div>
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </motion.li>
            </React.Fragment>
          ))}
        </ul>
      </motion.nav>

      <motion.div
        className="hidden md:flex items-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {onNavigate ? (
          <Button 
            onClick={(e) => e.preventDefault()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Coming Soon
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Coming Soon
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </motion.div>
    </>
  )
} 