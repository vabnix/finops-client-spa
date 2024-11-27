// components/Footer.tsx
import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white shadow-md mt-auto py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">© 2024 FinOps Genius. All rights reserved.</p>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}