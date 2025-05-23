"use client"

import { useEffect, useRef } from 'react'

interface SplineViewerProps {
  url: string
  className?: string
  height?: string | number
  width?: string | number
}

export default function SplineViewer({ url, className = '', height = '100%', width = '100%' }: SplineViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create script element for Spline viewer
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.96/build/spline-viewer.js'
    script.async = true

    // Create style element to hide the Spline logo and attribution
    const style = document.createElement('style')
    style.textContent = `
      #logo {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      a[href*="spline.design"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      spline-viewer::part(attribution),
      spline-viewer::part(logo),
      spline-viewer::shadow div[slot="attribution"],
      spline-viewer div[slot="attribution"],
      spline-viewer button[aria-label*="Spline"],
      .spline-viewer-attribution,
      .spline-watermark,
      :host([attribution="true"]),
      div[class*="attribution"],
      button[class*="attribution"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      spline-viewer::part(loading-overlay),
      spline-viewer::shadow div[slot="loading-overlay"],
      spline-viewer div[slot="loading-overlay"],
      div[class*="loading-overlay"],
      div[class*="loadingOverlay"],
      spline-viewer .loading-overlay,
      .spline-loading-overlay {
        background: transparent !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        filter: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }
      .spline-spinner,
      spline-viewer::part(spinner),
      div[class*="spinner"] {
        opacity: 0 !important;
        visibility: hidden !important;
        display: none !important;
      }
    `;

    // Create spline-viewer element
    const splineElement = document.createElement('spline-viewer')
    splineElement.setAttribute('hint', '')
    splineElement.setAttribute('loading-anim-type', 'none')
    splineElement.setAttribute('url', url)
    // Explicitly turn off attribution if possible
    splineElement.setAttribute('attribution', 'false')
    
    // Add fallback image
    const fallbackImg = document.createElement('img')
    fallbackImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAaCAYAAADWm14/AAANoklEQVR4AQCBAH7/AMWxhgXFsYYCxbGGAMWxhgDFsYYAxbGGAMWxhgDFsYYAxbGGAMWxhgDFsYYMxbGGG8WxhivFsYY5xbGGRcWxhkzFsYZPxbGGTcWxhkbFsYY7xbGGLcWxhh/FsYYQxbGGBMWxhgDFsYYAxbGGAMWxhgDFsYYAxbGGAMWxhgDFsYYAAIEAfv8AxbGGBsWxhgTFsYYAxbGGAMWxhgDFsYYAxbGGAMWxhgDFsYYAxbGGA8WxhhHFsYYgxbGGMMWxhj/FsYZKxbGGUsWxhlXFsYZSxbGGS8WxhkDFsYYyxbGGI8WxhhXFsYYIxbGGAMWxhgDFsYYAxbGGAMWxhgDFsYYAxbGGAMWxhgAAgQB+/wDFsYYIxbGGBsWxhgLFsYYAxbGGAMWxhgDFsYYAxbGGAMWxhgDFsYYKxbGGGcWxhinFsYY5xbGGSMWxhlTFsYZcxbGGX8Wxhl3FsYZVxbGGSsWxhjzFsYYtxbGGHsWxhhDFsYYGxbGGAMWxhgDFsYYAxbGGAMWxhgDFsYYAxbGGAACBAH7/AMWxhgvFsYYJxbGGBcWxhgDFsYYAxbGGAMWxhgDFsYYAxbGGCMWxhhTFsYYkxbGGNcWxhkbFsYZWxbGGYsWxhmvFsYZuxbGGa8WxhmTFsYZYxbGGScWxhjnFsYYqxbGGHMWxhhDFsYYIxbGGAsWxhgDFsYYAxbGGAMWxhgHFsYYCAIEAfv8AxbGGDcWxhgvFsYYIxbGGBMWxhgHFsYYAxbGGAsWxhgjFsYYSxbGGIMWxhjHFsYZDxbGGVcWxhmbFsYZzxbGGfMWxhn/FsYZ8xbGGdMWxhmjFsYZZxbGGSMWxhjjFsYYpxbGGHMWxhhPFsYYNxbGGCcWxhgjFsYYIxbGGCcWxhgoAgQB+/wDFsYYPxbGGDcWxhgvFsYYIxbGGBMWxhgfFsYYKxbGGEcWxhh3FsYYsxbGGPsWxhlLFsYZlxbGGd8WxhoXFsYaOxbGGkcWxho7FsYaGxbGGecWxhmnFsYZYxbGGRsWxhjbFsYYoxbGGHsWxhhfFsYYSxbGGEMWxhhDFsYYQxbGGEQCBAH7/AMWxhhDFsYYPxbGGDcWxhgvFsYYKxbGGDMWxhhHFsYYaxbGGJ8WxhjjFsYZLxbGGYMWxhnXFsYaHxbGGlsWxhp/FsYajxbGGoMWxhpfFsYaKxbGGecWxhmbFsYZTxbGGQsWxhjPFsYYoxbGGH8WxhhrFsYYYxbGGF8WxhhbFsYYXAIEAfv8AxbGGEMWxhg/FsYYOxbGGDcWxhg3FsYYQxbGGF8WxhiHFsYYwxbGGQsWxhlfFsYZuxbGGg8WxhpfFsYamxbGGr8WxhrPFsYawxbGGpsWxhpjFsYaHxbGGc8Wxhl/FsYZNxbGGPcWxhjDFsYYmxbGGIMWxhh3FsYYbxbGGGsWxhhoAgQB+/wDFsYYOxbGGDsWxhg3FsYYNxbGGD8WxhhPFsYYbxbGGJ8WxhjfFsYZLxbGGYcWxhnnFsYaPxbGGo8WxhrPFsYa9xbGGwMWxhr3FsYazxbGGpMWxhpLFsYZ9xbGGaMWxhlTFsYZDxbGGNcWxhivFsYYkxbGGH8Wxhh3FsYYcxbGGHACBAH7/AMWxhgzFsYYMxbGGDMWxhg3FsYYPxbGGFMWxhh7FsYYrxbGGPMWxhlHFsYZpxbGGgcWxhpnFsYatxbGGvcWxhsfFsYbKxbGGx8WxhrzFsYatxbGGmcWxhoTFsYZuxbGGWcWxhkfFsYY4xbGGLcWxhiXFsYYgxbGGHcWxhhzFsYYbAIEAfv8AxbGGCsWxhgrFsYYKxbGGC8Wxhg/FsYYVxbGGH8Wxhi3FsYZAxbGGVsWxhm7FsYaHxbGGn8WxhrTFsYbExbGGzsWxhtHFsYbNxbGGwsWxhrLFsYaexbGGh8WxhnDFsYZbxbGGSMWxhjjFsYYsxbGGJMWxhh7FsYYbxbGGGcWxhhkAgQB+/wDFsYYIxbGGCMWxhgjFsYYKxbGGDsWxhhXFsYYfxbGGLsWxhkHFsYZYxbGGcMWxhorFsYaixbGGt8WxhsfFsYbRxbGG1MWxhs/FsYbExbGGs8Wxhp7FsYaHxbGGcMWxhlrFsYZGxbGGNsWxhirFsYYhxbGGG8WxhhfFsYYWxbGGFQCBAH7/AMWxhgbFsYYGxbGGB8WxhgjFsYYNxbGGFMWxhh/FsYYuxbGGQcWxhljFsYZxxbGGisWxhqLFsYa3xbGGx8WxhtHFsYbTxbGGzsWxhsPFsYaxxbGGnMWxhoXFsYZtxbGGVsWxhkPFsYYyxbGGJsWxhh3FsYYXxbGGE8WxhhHFsYYRAIEAfv8AxbGGBcWxhgXFsYYFxbGGB8WxhgvFsYYTxbGGHcWxhi3FsYZAxbGGVsWxhm/FsYaIxbGGoMWxhrTFsYbExbGGzcWxhs/FsYbKxbGGvsWxhqzFsYaXxbGGf8WxhmjFsYZRxbGGPcWxhi3FsYYhxbGGGMWxhhLFsYYPxbGGDcWxhgwAgQB+/wDFsYYExbGGBMWxhgXFsYYHxbGGCsWxhhHFsYYcxbGGKsWxhj3FsYZTxbGGa8WxhoPFsYabxbGGr8Wxhr7FsYbGxbGGyMWxhsLFsYa2xbGGpcWxho/FsYZ4xbGGYcWxhkrFsYY3xbGGJ8WxhhvFsYYTxbGGDcWxhgrFsYYJxbGGCACBAH7/AMWxhgXFsYYExbGGBcWxhgbFsYYJxbGGEMWxhhnFsYYnxbGGOcWxhk7FsYZlxbGGfcWxhpPFsYamxbGGtcWxhr3FsYa+xbGGuMWxhqzFsYabxbGGhsWxhm/FsYZYxbGGQ8WxhjDFsYYhxbGGFsWxhg7FsYYJxbGGB8WxhgXFsYYFAIEAfv8AxbGGBcWxhgXFsYYFxbGGBcWxhgjFsYYNxbGGFsWxhiPFsYYzxbGGR8Wxhl3FsYZ0xbGGicWxhpzFsYapxbGGscWxhrLFsYasxbGGoMWxho/FsYZ6xbGGZMWxhk7FsYY6xbGGKMWxhhrFsYYQxbGGCcWxhgXFsYYDxbGGA8WxhgIAgQB+/wDFsYYFxbGGBcWxhgTFsYYExbGGBsWxhgrFsYYSxbGGHcWxhi3FsYY/xbGGVMWxhmnFsYZ9xbGGj8WxhpvFsYaixbGGo8Wxhp3FsYaRxbGGgcWxhm3FsYZYxbGGQ8WxhjDFsYYfxbGGE8WxhgrFsYYExbGGAcWxhgDFsYYAxbGGAMWxhgA...
    fallbackImg.alt = 'Spline preview'
    fallbackImg.style.width = '100%'
    fallbackImg.style.height = '100%'
    
    splineElement.appendChild(fallbackImg)

    // Clear container and add new elements
    if (containerRef.current) {
      containerRef.current.innerHTML = ''
      containerRef.current.appendChild(style)
      containerRef.current.appendChild(script)
      containerRef.current.appendChild(splineElement)
    }

    // Add event listener to detect and remove attribution elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Target various possible elements that might be the attribution
          const attributionElements = document.querySelectorAll(`
            #logo, 
            a[href*="spline.design"],
            [aria-label*="Spline"],
            [class*="attribution"],
            [class*="watermark"],
            div[slot="attribution"],
            button[slot="attribution"]
          `);
          
          attributionElements.forEach(element => {
            if (element instanceof HTMLElement) {
              element.style.display = 'none';
              element.style.opacity = '0';
              element.style.visibility = 'hidden';
              element.style.pointerEvents = 'none';
              
              // If it's a button or link, disable it
              if (element instanceof HTMLButtonElement) {
                element.disabled = true;
                element.setAttribute('aria-hidden', 'true');
              } else if (element instanceof HTMLAnchorElement) {
                element.setAttribute('aria-hidden', 'true');
                element.style.pointerEvents = 'none';
              }
              
              // Try to remove it from the DOM if possible
              try {
                element.remove();
              } catch (e) {
                // Silently fail if we can't remove it
              }
            }
          });

          // Also try to access shadow DOM if available
          try {
            const splineElement = document.querySelector('spline-viewer');
            if (splineElement && splineElement.shadowRoot) {
              const shadowLogo = splineElement.shadowRoot.querySelector('[class*="attribution"], [class*="watermark"], #logo');
              if (shadowLogo instanceof HTMLElement) {
                shadowLogo.style.display = 'none';
              }
            }
          } catch (e) {
            // Shadow DOM access might fail, silently continue
          }
        }
      });
    });

    // Start observing the container for changes
    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true });
      
      // Also observe the entire document body since some elements might be injected outside our container
      observer.observe(document.body, { childList: true, subtree: true });
    }

    // Also directly try to hide after a short delay to catch elements added after initial load
    setTimeout(() => {
      const attributionElements = document.querySelectorAll(`
        #logo, 
        a[href*="spline.design"],
        [aria-label*="Spline"],
        [class*="attribution"],
        [class*="watermark"],
        div[slot="attribution"],
        button[slot="attribution"]
      `);
      
      attributionElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.display = 'none';
        }
      });
    }, 1000);

    // Cleanup function
    return () => {
      observer.disconnect();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    }
  }, [url])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ 
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Overlay div to block any remaining attribution elements */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '180px',
          height: '40px',
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      />
    </div>
  )
} 