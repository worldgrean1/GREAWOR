"use client"

import SmoothScrollContainer from "@/components/premium/SmoothScrollContainer"
import EnhancedHomeSection from "@/components/premium/EnhancedHomeSection"
import EnhancedAboutSection from "@/components/premium/EnhancedAboutSection"
import EnhancedSolutionsSection from "@/components/premium/EnhancedSolutionsSection"
import EnhancedProductsSection from "@/components/premium/EnhancedProductsSection"
import EnhancedContactSection from "@/components/premium/EnhancedContactSection"

export default function EnhancedPage() {
  return (
    <SmoothScrollContainer>
      <div className="snap-start">
        <EnhancedHomeSection />
      </div>
      <div className="snap-start">
        <EnhancedAboutSection />
      </div>
      <div className="snap-start">
        <EnhancedSolutionsSection />
      </div>
      <div className="snap-start">
        <EnhancedProductsSection />
      </div>
      <div className="snap-start">
        <EnhancedContactSection />
      </div>
    </SmoothScrollContainer>
  )
} 