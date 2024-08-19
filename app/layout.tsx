// app/layout.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const publicPaths = ['/login', '/register', '/reset-password']

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)

    if (!token && !publicPaths.includes(pathname)) {
      router.push('/login')
    }
  }, [pathname, router])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (!isAuthenticated && publicPaths.includes(pathname)) {
    return (
      <html lang="en">
        <body className="flex flex-col min-h-screen bg-gray-100">
          <main className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-md">
              {children}
            </div>
          </main>
          <Footer />
        </body>
      </html>
    )
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