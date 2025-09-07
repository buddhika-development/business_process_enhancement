import React from 'react'
import SectionTitle from '../ui/Title/SectionTitle'

const WhyUsCard = ({title, content, icon} : {
    title ?: string,
    content ?: string,
    icon ?: React.ReactNode
}) => {
  return (
    <div className='p-5 border-[2px] border-dashed border-primary/40 rounded-2xl'>

        <div className='flex h-fit items-center gap-3'>
            {
                icon && (
                    <div className='bg-blue-100 p-3 flex items-center justify-center rounded-2xl'>
                        {icon}
                    </div>
                )
            }
            <div className='w-full'>
                <SectionTitle>{title}</SectionTitle>
            </div>
        </div>
        <p className='mt-3 text-sm'>{content}</p>
    </div>
  )
}

export default WhyUsCard