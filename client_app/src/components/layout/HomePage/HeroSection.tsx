import Logo from '@/components/ui/Global/Logo'
import LargeTitle from '@/components/ui/Title/LargeTitle'
import Title from '@/components/ui/Title/Title'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
    <div className='mt-12 body-content h-full lg:h-[calc(100vh-120px)] flex flex-col items-center justify-center'>

        <div className='w-full px-5 md:w-10/12 lg:w-8/12 mx-auto flex h-fit flex-col items-center justify-center space-y-4'>
            <LargeTitle className='text-center'>Get your <span className='text-primary'>business registered</span> and compliant with <span className='text-primary'>speed and confidence.</span></LargeTitle>
            <p className='text-sm md:text-md text-center w-10/12'>We simplify business registration, handling the legal steps quickly so you can start operating with confidence.</p>

            <Link href="/BusinessRegistration" className='btn'>Register Your Business</Link>
        </div>
        
        <Image 
            src={"/hero-background-image.jpg"}
            width={1200}
            height={400}
            alt='hero image'
            className='w-full h-[350px] object-cover object-bottom mt-8 rounded-lg'
        />

    </div>
  )
}

export default HeroSection