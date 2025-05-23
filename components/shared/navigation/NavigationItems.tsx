"use client"

import { SunMedium, Leaf, Zap, Battery, Wind, Lightbulb } from "lucide-react"

// Define navigation items that can be used in both mobile and desktop navigation
export const navItems = [
  { name: "Home", icon: <SunMedium size={12} className="text-green-400" />, href: "/home" },
  { name: "Green Home", icon: <Lightbulb size={12} className="text-green-400" />, href: "/green_home" },
  { name: "About", icon: <Leaf size={12} className="text-green-400" />, href: "/about" },
  {
    name: "Solutions",
    icon: <Zap size={12} className="text-green-400" />,
    href: "/solutions",
    submenu: [
      { name: "Solar Energy", href: "/solutions/solar-energy" },
      { name: "Energy Storage", href: "/solutions/energy-storage" },
      { name: "Biomass", href: "/solutions/biomass" },
      { name: "Training", href: "/solutions/training" },
    ],
  },
  { name: "Products", icon: <Battery size={12} className="text-green-400" />, href: "/products" },
  { name: "Contact", icon: <Wind size={12} className="text-green-400" />, href: "/contact" },
] 