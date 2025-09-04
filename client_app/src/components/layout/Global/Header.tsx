import Logo from '@/components/ui/Global/Logo'
import { mainNavigation } from '@/navigation/mainNavigation'
import Link from 'next/link'
import { it } from 'node:test'
import React from 'react'

const Header = () => {
  return (
    <div className='h-[80px] bg-primary text-white'>
        
        <div className='body-content flex items-center justify-between px-4 h-full'>
            <Logo />
            
            {/* main navigations */}
            <div>
                {
                    mainNavigation.map((item, index) => (
                        <Link href={item.href} key={index} className='mx-4 cursor-pointer hover:text-secondary'>
                            {item.name}
                        </Link>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Header