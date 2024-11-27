'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <html lang="en">
      <body className="app-layout">
        <Header isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex flex-col flex-1 ${isSidebarOpen ? 'main-content-sidebar-open' : ''}`}>
          <main className="app-main flex-grow">
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}