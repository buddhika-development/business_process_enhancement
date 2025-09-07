import InstantContactUs from '@/components/layout/Global/InstantContactUs'
import WhyUs from '@/components/layout/HomePage/WhyUs'
import LargeTitle from '@/components/ui/Title/LargeTitle'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className="mt-16 body-content">
        <div className="w-full px-5 md:w-10/12 lg:w-10/12 mx-auto flex h-fit flex-col items-center justify-center space-y-4">
          <LargeTitle className="text-center">
            We’d Love to Hear from You and Answer <span className="text-primary">Your Questions</span>
          </LargeTitle>
          <p className="text-sm md:text-md text-center w-10/12">Have a question or need support? Our team is here to help. Reach out to us anytime and we’ll respond as quickly as possible.</p>
        </div>

        <Image
          src={"/about-us-background.jpg"}
          width={1200}
          height={400}
          alt="hero image"
          className="w-full h-[350px] object-cover object-center mt-8 rounded-lg"
        />

      </div>

      <div className="mb-16">
        <InstantContactUs />
      </div>
    </div>
  )
}

export default page