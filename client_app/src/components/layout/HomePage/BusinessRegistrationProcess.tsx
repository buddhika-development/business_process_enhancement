import Title from '@/components/ui/Title/Title'
import React from 'react'
import Card from '../Card'
import { Key } from 'lucide-react';
import { FileCheck } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import { ClipboardCheck } from 'lucide-react';


const BusinessRegistrationProcess = () => {
  return (
    <div className='body-content mt-16'>

        <div className='space-y-4'>
            <Title>How Registration process flows</Title>
            <p className='text-sm'>We register your business without any hassle. There we use some kind of authentic process for make your business documents and everything secure under the rules of business registration.We register your business with ease, taking the hassle out of the process. Every step is handled through a secure and authentic system designed to protect your documents and keep everything in line with official regulations. From preparing paperwork to ensuring compliance, we make sure your business is legalized smoothly and with complete confidence.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
            <Card 
                icon = {<Key />}
                title='Personal Validity'
                content='We check the business registration authenticity. Business name and the person authenticity for security and the easy registration without getting huge time.'
            />
            <Card 
                icon = {<FileCheck />}
                title='Realtime Document Validation'
                content='You can check the validity of the your documents without waiting large amount of time.'
            />
            <Card 
                icon = {<ShieldCheck />}
                title='Governer Document Verification'
                content='We check the business registration authenticity. Business name and the person authenticity for security and the easy registration without getting huge time.'
            />
            <Card 
                icon = {<ClipboardCheck />}
                title='Confirm Business Registration'
                content='We check the business registration authenticity. Business name and the person authenticity for security and the easy registration without getting huge time.'
            />
        </div>
        
    </div>
  )
}

export default BusinessRegistrationProcess