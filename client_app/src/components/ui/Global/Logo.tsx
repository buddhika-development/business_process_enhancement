import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div>
        <Link href={'/'}>
            <h1 className='text-xl font-bold text-secondary'>
                mr.<span className='text-white'>Registar</span>
            </h1>
        </Link>
    </div>
  )
}

export default Logo