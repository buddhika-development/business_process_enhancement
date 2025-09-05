import BusinessDetailsForm from '@/components/layout/BusinessRegistration/BusinessDetailsForm'
import BusinessOwnerDetails from '@/components/layout/BusinessRegistration/BusinessOwnerDetails'
import SupportedDocumentUploadForm from '@/components/layout/BusinessRegistration/SupportedDocumentUploadForm'
import Title from '@/components/ui/Title/Title'
import React from 'react'

const page = () => {
  return (
    <div className='body-content py-10'>
      <Title className='mb-10'>
        Let's <span className='highlited-text'>Register</span> Your Business
      </Title>
      {/* <BusinessDetailsForm /> */}
      {/* <BusinessOwnerDetails /> */}
      <SupportedDocumentUploadForm />
    </div>
  )
}

export default page