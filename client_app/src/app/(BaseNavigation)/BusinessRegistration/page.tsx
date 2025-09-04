import BusinessDetailsForm from '@/components/layout/BusinessRegistration/BusinessDetailsForm'
import Title from '@/components/ui/Title/Title'
import React from 'react'

const page = () => {
  return (
    <div className='body-content py-10'>
      <Title className='mb-10'>
        Let's <span className='highlited-text'>Register</span> Your Business
      </Title>
      <BusinessDetailsForm />
    </div>
  )
}

export default page