// Header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, CloudIcon, CogIcon, UserIcon, CreditCardIcon, LogOutIcon, Menu, BarChart2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, children }) => {
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

interface HeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Header({ isOpen, toggleSidebar }: HeaderProps) {
  const [user] = useState({
    name: "Demo User",
    email: "demo@example.com",
    image: "/Aum_Passport_Photo.jpeg"
  })

  return (
    <header className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md z-20 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="text-xl font-bold">FinOps App</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <Menu />
            </Button>
          </div>
          <nav className="space-y-2">
            <NavItem href="/" icon={HomeIcon}>Dashboard</NavItem>
            <NavItem href="/finops-hub" icon={BarChart2}>FinOps Hub</NavItem>
            <NavItem href="/check-aws" icon={CloudIcon}>Check AWS</NavItem>
            <NavItem href="/configuration" icon={CogIcon}>Configuration</NavItem>
            <NavItem href="/profile" icon={UserIcon}>Profile</NavItem>
            <NavItem href="/billing" icon={CreditCardIcon}>Billing</NavItem>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </div>
                <LogOutIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}