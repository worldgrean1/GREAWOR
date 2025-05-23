"use client"

import { useRouter } from "next/navigation"
import { useEnergySystemStore } from "@/store/energySystemStore"
import { useState, useEffect } from "react"
import { 
  Power, 
  Zap, 
  Home, 
  ShoppingBag, 
  Info, 
  MessageSquare, 
  ExternalLink 
} from "lucide-react"

export function NavigationMenu() {
  const router = useRouter()
  const { setInverterActive, setSwitchActive } = useEnergySystemStore()
  const [activeSection, setActiveSection] = useState('green-home')
  const [clickedSection, setClickedSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        'green-intro',
        'green-home',
        'green-about',
        'green-solutions',
        'green-products',
        'green-contact'
      ];
      let currentSection = sectionIds[0];
      let minDistance = Number.POSITIVE_INFINITY;
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePowerOff = () => {
    // Only turn off the switch, leave inverter state unchanged
    setSwitchActive(false)
    
    // Add a small delay to ensure the state is updated before redirecting
    setTimeout(() => {
      router.push('/')
    }, 100)
  }

  const menuItems = [
    { 
      icon: <Zap className="w-[18px] h-[18px]" />,
      label: "Intro",
      href: "#green-intro",
      className: "bg-slate-800/50 text-slate-400 hover:bg-slate-700/80"
    },
    { 
      icon: <Home className="w-[18px] h-[18px]" />,
      label: "Home",
      href: "#green-home",
      className: "bg-slate-800/50 text-slate-400 hover:bg-slate-700/80"
    },
    { 
      icon: <Info className="w-[18px] h-[18px]" />,
      label: "About",
      href: "#green-about",
      className: "bg-slate-800/50 text-slate-400 hover:bg-slate-700/80"
    },
    { 
      icon: <Zap className="w-[18px] h-[18px]" />,
      label: "Solutions",
      href: "#green-solutions",
      className: "bg-slate-800/50 text-slate-400 hover:bg-slate-700/80"
    },
    { 
      icon: <ShoppingBag className="w-[18px] h-[18px]" />,
      label: "Products",
      href: "#green-products",
      className: "bg-slate-800/50 text-slate-400 hover:bg-slate-700/80"
    },
    { 
      icon: <MessageSquare className="w-[18px] h-[18px]" />,
      label: "Contact",
      href: "#green-contact",
      className: "bg-slate-800/50 text-slate-400 hover:bg-slate-700/80"
    }
  ];

  // Coming Soon nav item always at the bottom
  const comingSoonItem = {
    icon: <ExternalLink className="w-[18px] h-[18px]" />,
    label: "Coming Soon",
    href: "/green/sister",
    className: "bg-slate-800/50 text-slate-400 hover:bg-slate-700/80"
  };

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-end">
      <ul className="flex flex-col items-end gap-6">
        {menuItems.map((item, index) => (
          <li key={index} className="relative group">
            <a 
              href={item.href}
              className="flex items-center cursor-pointer"
              onClick={(e) => {
                if (item.href.startsWith('#')) {
                  e.preventDefault();
                  const sectionId = item.href.slice(1);
                  setClickedSection(sectionId);
                  const element = document.getElementById(sectionId);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              <span className="text-white/0 group-hover:text-white/80 text-sm font-medium mr-3 transition-all duration-300 absolute right-full whitespace-nowrap">
                {item.label}
              </span>
              <div className={`
                w-10 h-10 rounded-full 
                flex items-center justify-center 
                transition-all duration-300
                ${item.className}
              `}>
                {item.icon}
              </div>
              {/* Only show border if this nav was last clicked */}
              {item.href.startsWith('#') && clickedSection === item.href.slice(1) && (
                <div className="absolute inset-0 rounded-full border-2 border-[#3DD56D]" />
              )}
            </a>
          </li>
        ))}
        {/* Coming Soon nav item at the bottom */}
        <li className="relative group mt-8">
          <a
            href={comingSoonItem.href}
            className="flex items-center cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-white/0 group-hover:text-white/80 text-sm font-medium mr-3 transition-all duration-300 absolute right-full whitespace-nowrap">
              {comingSoonItem.label}
            </span>
            <div className={`
              w-10 h-10 rounded-full 
              flex items-center justify-center 
              transition-all duration-300
              ${comingSoonItem.className}
            `}>
              {comingSoonItem.icon}
            </div>
          </a>
        </li>

        {/* Power Off Button */}
        <li className="relative group mt-4">
          <button
            onClick={handlePowerOff}
            className="flex items-center cursor-pointer"
          >
            <span className="text-white/0 group-hover:text-white/80 text-sm font-medium mr-3 transition-all duration-300 absolute right-full whitespace-nowrap">
              Power Off
            </span>
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300">
              <Power className="w-[18px] h-[18px]" />
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
} 