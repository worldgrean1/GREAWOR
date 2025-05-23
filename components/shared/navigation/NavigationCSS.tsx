"use client"

export function NavigationCSS() {
  return (
    <style jsx global>{`
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
        background-color: #4ade80;
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
        background: radial-gradient(circle, rgba(74, 222, 128, 0.4) 0%, rgba(74, 222, 128, 0) 70%);
        opacity: 0;
        transition: opacity 0.5s ease;
        border-radius: 50%;
        z-index: -1;
      }

      .logo-container:hover .logo-glow-effect {
        opacity: 1;
      }
    `}</style>
  )
} 