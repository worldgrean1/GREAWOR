"use client"

import React from "react"
import dynamic from 'next/dynamic'

const MainLayoutWrapper = dynamic(() => import('@/components/layout/MainLayoutWrapper'), {
  ssr: true
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayoutWrapper>
      {children}
    </MainLayoutWrapper>
  )
} 