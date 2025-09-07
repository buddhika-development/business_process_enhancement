'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/ui/Global/Logo'
import { mainNavigation } from '@/navigation/mainNavigation'

const Header = () => {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="h-[80px] bg-primary text-white relative z-50">
      <div className="body-content flex items-center justify-between px-4 h-full relative">
        <Logo />

        {/* Desktop navigation */}
        <nav className="hidden md:flex h-full items-center relative">
          {mainNavigation.map((item, index) => {
            const active = isActive(item.href)
            return (
              <div key={index} className="relative flex flex-col items-center mx-4">
                <Link
                  href={item.href}
                  className="cursor-pointer hover:text-secondary transition-colors relative"
                >
                  {item.name}
                  {/* underline */}
                  <span
                    className={`absolute -bottom-[18px] left-0 h-[3px] bg-secondary rounded transition-transform duration-300 origin-left
                    ${active ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'}`}
                  ></span>
                </Link>
              </div>
            )
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-secondary"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden absolute left-0 right-0 top-[80px] bg-primary/95 backdrop-blur-sm border-t border-white/10 shadow-lg">
          <nav className="flex flex-col py-2">
            {mainNavigation.map((item, index) => {
              const active = isActive(item.href)
              return (
                <Link
                  href={item.href}
                  key={index}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 relative group"
                >
                  <span className={active ? 'text-secondary' : 'hover:text-secondary'}>
                    {item.name}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-[3px] bg-secondary rounded transition-transform duration-300 origin-left
                    ${active ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'}`}
                  ></span>
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
