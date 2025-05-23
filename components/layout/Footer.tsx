"use client"

import Image from "next/image"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#0a1628] py-3 px-4 sm:px-6 border-t border-slate-700/20 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side - Copyright */}
        <div className="text-slate-400 text-sm">
          © {new Date().getFullYear()} <span className="text-[#3DD56D]">GREAN</span> WORLD
        </div>

        {/* Center - Logo and tagline */}
        <div className="hidden md:flex items-center gap-2">
          <div className="relative w-6 h-6">
            <Image
              src="/images/grean-logo-icon.png"
              alt="GREAN WORLD Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="text-sm text-slate-300">
            <span className="text-[#3DD56D]">#</span>PoweringDignity
          </span>
        </div>

        {/* Right side - Social icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-slate-400 hover:text-[#3DD56D] transition-colors" aria-label="Facebook">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="#" className="text-slate-400 hover:text-[#3DD56D] transition-colors" aria-label="Twitter">
            <Twitter className="h-4 w-4" />
          </a>
          <a href="#" className="text-slate-400 hover:text-[#3DD56D] transition-colors" aria-label="Instagram">
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
