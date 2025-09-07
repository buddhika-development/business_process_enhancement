import Title from '@/components/ui/Title/Title'
import React from 'react'

const InstantContactUs = () => {
  return (
    <div className='body-content p-8 space-y-4 bg-white border-[4px] border-dashed border-primary/20 rounded-3xl my-8 relative overflow-hidden'>

        {/* <div className='absolute z-0 bg-primary h-[600px] w-[600px] rounded-full -top-[50px] -right-[200px] opacity-40'></div> */}
        
        <div className='relative z-10 space-y-5'>

            <div>
                <Title>Lets Talk</Title>
                <p className='text-sm opacity-60'>You put the message we will connect with you to help the your journey.</p>
            </div>
            <form action="" className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='input-section'>
                        <label htmlFor="customer-name">Your Name</label>
                        <input type="text" placeholder="Your Name" />
                    </div>
                    <div className='input-section'>
                        <label htmlFor="customer-email">Your Email</label>
                        <input type="email" placeholder="Your Email" />
                    </div>
                </div>
                <div className='input-section'>
                    <label htmlFor="customer-message">Your Message</label>
                    <textarea placeholder="Your Message"></textarea>
                </div>
                <button type="submit" className='btn'>Send Message</button>
            </form>
        </div>
    </div>
  )
}

export default InstantContactUs