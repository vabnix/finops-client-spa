'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, FileTextIcon, UsersIcon, PackageIcon, MessageSquareIcon, SettingsIcon, HelpCircleIcon, LogOutIcon } from 'lucide-react'

const NavItem = ({ href, icon: Icon, children }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link 
      href={href} 
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
        isActive 
          ? "bg-blue-100 text-blue-600" 
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon className="h-5 w-5 mr-3" />
      <span>{children}</span>
    </Link>
  )
}

export default function Header() {
  return (
    <header className="w-64 bg-white h-screen p-4 flex flex-col">
      <div className="mb-8">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="text-xl font-bold">FinOps App</span>
        </Link>
      </div>
      <nav className="space-y-2 flex-1">
        <NavItem href="/" icon={HomeIcon}>Home</NavItem>
        <NavItem href="/profile" icon={UsersIcon}>Clients</NavItem>
        <NavItem href="/check-aws" icon={PackageIcon}>Ask AWS</NavItem>
        <NavItem href="/messages" icon={MessageSquareIcon}>Messages</NavItem>
        <NavItem href="/billing" icon={SettingsIcon}>Billing & Invoices</NavItem>
        <NavItem href="/configuration" icon={HelpCircleIcon}>Settings</NavItem>
      </nav>
      <NavItem href="/logout" icon={LogOutIcon}>Log Out</NavItem>
    </header>
  )
}