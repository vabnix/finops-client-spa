'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const publicPaths = ['/login', '/register', '/reset-password']

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      setIsAuthenticated(!!token)
      setIsLoading(false)

      if (!token && !publicPaths.includes(pathname)) {
        router.push('/login')
      }
    }

    checkAuth()
  }, [pathname, router])

  if (isLoading) {
    return <div>Loading...</div> // Or a proper loading spinner
  }

  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    return null // This will prevent the children from rendering
  }

  return <>{children}</>
}

export default AuthWrapper