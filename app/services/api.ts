'use client'

import { useState, useEffect } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api'

let api: any = null

const initApi = async () => {
  if (typeof window !== 'undefined') {
    const axios = (await import('axios')).default
    api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    api.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers['x-auth-token'] = token
        }
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )
  }
}

export const useApi = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    initApi().then(() => setIsReady(true))
  }, [])

  return { isReady, api }
}

export const login = async (email: string, password: string) => {
  await initApi()
  return api.post('/login', { email, password })
}

export const register = async (name: string, email: string, password: string) => {
  await initApi()
  return api.post('/register', { name, email, password })
}

export const getCurrentUser = async () => {
  await initApi()
  return api.get('/users/me')
}
// Add more API calls as needed

export default api;