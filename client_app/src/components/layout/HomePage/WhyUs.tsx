import SecondaryTitle from '@/components/ui/Title/SecondaryTitle'
import SectionTitle from '@/components/ui/Title/SectionTitle'
import Title from '@/components/ui/Title/Title'
import React from 'react'
import WhyUsCard from '../WhyUsCard'
import { Timer } from 'lucide-react';
import { FileX2 } from 'lucide-react';
import { DoorClosed } from 'lucide-react';


const WhyUs = () => {
  return (
    <div className='body-content '>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 py-8'>
            <Title>We build <span className='text-primary'>trust and security</span> in your registration process</Title>
            <p>Start your venture on the right foundation with quick, hassle-free business legalization. We handle the paperwork, guide you through every step, and deliver official approval faster. No confusing processes, no unnecessary delays—just a clear path to compliance. Focus on growing your business while we take care of the legal side.</p>
        </div>

        <div>
            <SecondaryTitle>Why you should choose us</SecondaryTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
                <WhyUsCard 
                    icon = {<Timer />}
                    title='Fast Registration Process'
                    content='We solve your business registration process easy and instant.'
                />
                <WhyUsCard 
                    icon = {<FileX2 />}
                    title='Less Painpoints With Ton of Documents'
                    content='We simplify your business registration process by handling all the paperwork and reducing the hassle.'
                />
                <WhyUsCard 
                    icon = {<DoorClosed />}
                    title='Stay Home and get registration into hand'
                    content='We solve your business registration process easy and instant.'
                />
            </div>
        </div>
        
    </div>
  )
}

export default WhyUs