'use client'

import { SubmitBusinessOwnerDetails } from '@/actions/BusinessOwnerDetailsFormAction'
import SectionTitle from '@/components/ui/Title/SectionTitle'
import { businessOwnerDetailsResponse } from '@/types/businessOwnerDetailsInitialState'
import React, { useActionState } from 'react'

const BusinessOwnerDetails = () => {

    const [state, action , isPending] = useActionState(SubmitBusinessOwnerDetails, businessOwnerDetailsResponse)
    
  return (
    <div>
        <form action={action} className='flex flex-col gap-8'>
            <div className='form-section'>
                <SectionTitle>Business Owner Details</SectionTitle>
                <div className="input-section">
                    <label htmlFor="ownerName">Full Name</label>
                    <input type="text" name="ownerName" id="ownerName" placeholder="Owner's Full Name" required />
                    {
                        state?.error?.ownerFullName && (
                            <p className="text-sm text-red-500 mt-1">
                                {state.error.ownerFullName}
                            </p>
                        )
                    }
                </div>

                <div className='flex gap-4'>
                    <div className="input-section">
                        <label htmlFor="ownerInitialName">Name with Initials</label>
                        <input type="text" name="ownerInitialName" id="ownerInitialName" placeholder="Name with Initials" required />
                    </div>
                    <div className="input-section">
                        <label htmlFor="ownerNIC">Owner's NIC</label>
                        <input type="text" name="ownerNIC" id="ownerNIC" placeholder="Owner's NIC" required />
                        {
                            state?.error?.ownerNIC && (
                                <p className="text-sm text-red-500 mt-1">
                                    {state.error.ownerNIC}
                                </p>
                            )
                        }
                    </div>
                </div>
                
                
                <div className='flex gap-4'>
                    <div className="input-section">
                        <label htmlFor="ownerContact">Contact Number</label>
                        <input type="text" name="ownerContact" id="ownerContact" placeholder="Contact Number" required />
                    </div>
                    <div className="input-section">
                        <label htmlFor="ownerFixedContact">Fixed Contact Number</label>
                        <input type="text" name="ownerFixedContact" id="ownerFixedContact" placeholder="Fixed Contact Number" />
                    </div>
                </div>

                
                <div className="input-section">
                    <label htmlFor="ownerEmail">Owner's Email</label>
                    <input type="email" name="ownerEmail" id="ownerEmail" placeholder="Owner's Email" required />
                </div>
            </div>

            {/* owner address detalis */}
            <div className='form-section'>
                <SectionTitle>Owner Address Details</SectionTitle>
                <div className="input-section">
                    <label htmlFor="ownerAddressLine1">Address Line 1</label>
                    <input type="text" name="ownerAddressLine1" id="ownerAddressLine1" placeholder="Address Line 1" required />
                </div>
                <div className="input-section">
                    <label htmlFor="ownerAddressLine2">Address Line 2</label>
                    <input type="text" name="ownerAddressLine2" id="ownerAddressLine2" placeholder="Address Line 2" />
                </div>
                <div className='flex gap-4'>
                    <div className="input-section">
                        <label htmlFor="ownerCity">City</label>
                        <input type="text" name="ownerCity" id="ownerCity" placeholder="City" required />
                    </div>
                    <div className="input-section">
                        <label htmlFor="ownerPostalCode">Postal Code</label>
                        <input type="text" name="ownerPostalCode" id="ownerPostalCode" placeholder="Postal Code" required />
                    </div>
                </div>
            </div>
            
            <button className='bg-primary w-40 h-[46px] text-white font-semibold rounded-xl self-end mt-4 cursor-pointer hover:bg-accent duration-300 ' type='submit'>Next</button>
        </form>
    </div>
  )
}

export default BusinessOwnerDetails