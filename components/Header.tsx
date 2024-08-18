import Link from 'next/link'
import { HomeIcon, CloudIcon, CogIcon, UserIcon } from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold text-blue-600">AWS Checker</Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600">
                  <HomeIcon className="h-5 w-5 mr-1" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/check-aws" className="flex items-center text-gray-600 hover:text-blue-600">
                  <CloudIcon className="h-5 w-5 mr-1" />
                  Check AWS
                </Link>
              </li>
              <li>
                <Link href="/configuration" className="flex items-center text-gray-600 hover:text-blue-600">
                  <CogIcon className="h-5 w-5 mr-1" />
                  Configuration
                </Link>
              </li>
              <li>
                <Link href="/profile" className="flex items-center text-gray-600 hover:text-blue-600">
                  <UserIcon className="h-5 w-5 mr-1" />
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}