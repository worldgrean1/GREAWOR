"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function SisterCompanyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrollProgress, setScrollProgress] = useState(0)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(progress)
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute("id") || ""
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="sister-scrollbar flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Scroll Progress Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full z-40" style={{width: '18px'}}>
        <div className="relative h-full flex items-center">
          <div className="w-2 mx-auto h-4/5 bg-slate-700/40 rounded-full mt-12 mb-12 overflow-hidden">
            <div style={{height: `${scrollProgress * 100}%`}} className="bg-[#3DD56D] w-full rounded-full transition-all duration-200"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="py-4 px-4 sm:px-6 border-b transition-all duration-500 fixed top-0 left-0 right-0 z-50 border-slate-700/20 bg-slate-900/80 backdrop-blur-md" style={{ opacity: 1, willChange: 'transform, opacity', transform: 'none' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="max-w-7xl mx-auto flex items-center gap-4" style={{height: '72px'}}>
            <div className="flex items-center gap-4">
              <div className="logo-container relative flex-shrink-0" tabIndex={0} style={{height: '66px', width: '170px'}}>
                <div className="logo-glow-effect"></div>
                <Image src="/images/Sister/sister-logo.jpg" alt="Ethio Renewable Energy Solution Logo" width={170} height={66} className="object-contain h-full w-full" />
              </div>
              <div className="flex flex-col justify-center h-full">
                <div className="flex items-center">
                  <span className="text-[#3DD56D] text-xl sm:text-2xl font-bold tracking-wide">ETHIO</span>
                  <span className="text-xl sm:text-2xl font-bold text-gray-200 tracking-wide ml-1">RENEWABLE</span>
                </div>
                <p className="text-xs text-gray-400 tracking-wide">ENERGY SOLUTION PLC</p>
              </div>
            </div>
          </div>
          <button className="md:hidden text-gray-400 hover:text-green-400" tabIndex={0} onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu h-6 w-6">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Removed Mobile Menu */}

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative bg-slate-900 overflow-hidden">
          <div className="relative h-[400px] w-full flex items-center justify-center">
            <Image
              src="/images/Sister/cooking.jpeg"
              alt="Clean cooking products"
              fill
              className="object-cover object-center opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/70 z-10" />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="container px-4 md:px-6 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white animate-fade-in">
                  Sustainable Energy Solutions for Ethiopia
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-in-delay">
                  Empowering Ethiopia with affordable clean energy solutions for homes, businesses, and communities.
                </p>
                <Link href="#contact">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#3DD56D] hover:bg-[#2bb757] text-white">
                    Get in Touch
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
      </section>

      {/* About Section */}
        <section id="about" className="container py-16 px-4 md:px-0">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3DD56D] mb-4">About Us</h2>
            <p className="text-gray-200 text-lg mb-4">
              Ethio Renewable Energy Solution PLC is an Ethiopian company providing sustainable and affordable clean energy solutions. We offer solar and cookstove products including panels, inverters, batteries, backup systems, water heaters, and more. Our services cover installation, consultation, training, and after-sales support to promote energy access and empower communities across Ethiopia.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-gray-400 justify-center mt-2">
              <span className="bg-slate-800 px-2 py-1 rounded">Founded: 2024</span>
              <span className="bg-slate-800 px-2 py-1 rounded">Independent Business</span>
            </div>
        </div>
        </section>

      {/* Services Section */}
        <section id="services" className="container py-16 px-4 md:px-0">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3DD56D] mb-4">Our Services & Solutions</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
          <ServiceItem text="Retail and Distribution of solar energy systems and clean cookstoves" />
          <ServiceItem text="Installation and Maintenance of solar products and energy systems" />
          <ServiceItem text="Consultation on renewable energy solutions and energy efficiency" />
          <ServiceItem text="After-Sales Support including warranty services and technical assistance" />
          <ServiceItem text="Training & Capacity Building for customers, technicians, and partners" />
          <ServiceItem text="Product Customization for households, institutions, and productive use" />
          <ServiceItem text="Energy Access Solutions for off-grid and rural communities" />
          <ServiceItem text="Partnership & Financing Models including Pay-As-You-Go (PAYGO) and microfinance options" />
        </ul>
          </div>
        </section>

        {/* Why Us Section */}
        <section id="why-us" className="container py-16 px-4 md:px-0">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3DD56D] mb-4">Why Choose Us?</h2>
        <ul className="space-y-2">
          <HighlightItem icon="🌍" text="Locally Driven, Impact-Focused: Deep understanding of Ethiopia's energy needs with tailored solutions for both rural and urban communities." />
          <HighlightItem icon="🔋" text="Wide Product Range: From solar panels to cookstoves, backup systems, water heaters, irrigation, and DC appliances – all under one roof." />
          <HighlightItem icon="🛠️" text="End-to-End Services: We provide complete solutions – consultation, installation, training, and long-term after-sales support." />
          <HighlightItem icon="🤝" text="Community Empowerment: Focus on women empowerment, productive use, and clean energy access to uplift livelihoods." />
          <HighlightItem icon="💡" text="Flexible Financing Options: Innovative models like Pay-As-You-Go (PAYGO) and partnerships with microfinance institutions." />
          <HighlightItem icon="🔧" text="Technical Expertise: Skilled professionals with over a decade of experience in renewable energy technologies." />
          <HighlightItem icon="✅" text="Quality & Reliability: Trusted products and services backed by warranty and continuous support." />
        </ul>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="container py-16 px-4 md:px-0">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3DD56D] mb-4">Our Products</h2>
            <p className="text-gray-200 text-lg mb-6">Explore our range of clean energy products designed for Ethiopian homes and businesses.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProductCard
                title="Solar Home System 200W"
                description="Complete Home Energy Solution: 200W solar panel, 4 LED lights, mobile charging, 2-year warranty."
                price="ETB 16,499"
                badge="Bestseller"
              />
              <ProductCard
                title="Mirt Stove Deluxe"
                description="Efficient Injera Baking Solution: Bakes up to 30 injeras/day, reduces fuel by 50%, 5+ year lifespan."
                price="ETB 4,399"
                badge="Popular"
              />
            </div>
          </div>
        </section>

      {/* Contact Section */}
        <section id="contact" className="container py-16 px-4 md:px-0">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3DD56D] mb-4">Contact Us</h2>
            <div className="space-y-1 text-gray-200 text-base mb-4">
          <div><span className="font-semibold">Location:</span> Lemi Kura Sub-City, In front of Police Station, Addis Ababa, Ethiopia</div>
              <div><span className="font-semibold">Phone:</span> <a href="tel:+251985341013" className="text-[#3DD56D] hover:underline">+251-985341013</a></div>
              <div><span className="font-semibold">Email:</span> <a href="mailto:alemks2006@yahoo.com" className="text-[#3DD56D] hover:underline">alemks2006@yahoo.com</a></div>
          <div><span className="font-semibold">Working Hours:</span> Mon–Sat: 9:00 AM – 7:30 PM; Sunday: Closed</div>
          <div><span className="font-semibold">TikTok:</span> Ethio_renewable energy solutions</div>
        </div>
            <Link href="tel:+251985341013">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#3DD56D] hover:bg-[#2bb757] text-white">
                Call Now
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone ml-2 h-4 w-4">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-400 text-sm mt-8 border-t border-slate-700/20 bg-slate-900/60">
        &copy; {new Date().getFullYear()} Ethio Renewable Energy Solution PLC. Powered by GREAN WORLD.
      </footer>

      <style jsx global>{`
        .sister-scrollbar::-webkit-scrollbar {
          width: 12px;
          background: #1e293b;
        }
        .sister-scrollbar::-webkit-scrollbar-thumb {
          background: #3DD56D;
          border-radius: 8px;
          border: 2px solid #1e293b;
        }
        .sister-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2bb757;
        }
        .sister-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3DD56D #1e293b;
        }

        .nav-item {
          position: relative;
          overflow: hidden;
        }
        
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #3DD56D;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        
        .nav-item:hover::after {
          transform: translateX(0);
        }
        
        .nav-item.active::after {
          transform: translateX(0);
        }

        .logo-container {
          position: relative;
          overflow: visible;
        }

        .logo-glow-effect {
          position: absolute;
          inset: -5px;
          background: radial-gradient(circle, rgba(61, 213, 109, 0.4) 0%, rgba(61, 213, 109, 0) 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          border-radius: 50%;
          z-index: -1;
        }

        .logo-container:hover .logo-glow-effect {
          opacity: 1;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.5s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

function ServiceItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-[#3DD56D]/50 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-[#3DD56D] mt-1">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span className="text-gray-200">{text}</span>
    </li>
  )
}

function HighlightItem({ icon, text }: { icon: string; text: string }) {
  return (
    <li className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-[#3DD56D]/50 transition-colors">
      <span className="text-2xl">{icon}</span>
      <span className="text-gray-200">{text}</span>
    </li>
  )
}

function ProductCard({ title, description, price, badge }: { title: string; description: string; price: string; badge: string }) {
  return (
    <div className="flex flex-col p-6 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-[#3DD56D]/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-[#3DD56D]">{title}</h3>
        <span className="px-2 py-1 text-xs font-medium bg-[#3DD56D]/20 text-[#3DD56D] rounded">{badge}</span>
      </div>
      <p className="text-gray-200 mb-4 flex-grow">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-[#3DD56D]">{price}</span>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-3 py-2 bg-[#3DD56D] hover:bg-[#2bb757] text-white">
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  )
} 