'use client'

import { SubmitBusinessOwnerDetails } from '@/actions/BusinessOwnerDetailsFormAction'
import SectionTitle from '@/components/ui/Title/SectionTitle'
import { businessOwnerDetailsResponse } from '@/types/businessOwnerDetailsInitialState'
import React, { useActionState, useEffect, useState, useTransition } from 'react'

type BusinessOwnerDetailsData = {
  ownerName: string;
  ownerInitialName: string;
  ownerNIC: string;
  ownerContact: string;
  ownerFixedContact?: string;
  ownerEmail: string;
  ownerAddressLine1: string;
  ownerAddressLine2?: string;
  ownerCity: string;
  ownerPostalCode: string;
};

type Props = {
  onSubmit?: (data: BusinessOwnerDetailsData) => void;
  defaultValues?: BusinessOwnerDetailsData | null;
  onBack?: () => void;
};

const BusinessOwnerDetails = ({ onSubmit, defaultValues, onBack }: Props) => {
    // Form state
    const [formData, setFormData] = useState<BusinessOwnerDetailsData>({
        ownerName: defaultValues?.ownerName || "",
        ownerInitialName: defaultValues?.ownerInitialName || "",
        ownerNIC: defaultValues?.ownerNIC || "",
        ownerContact: defaultValues?.ownerContact || "",
        ownerFixedContact: defaultValues?.ownerFixedContact || "",
        ownerEmail: defaultValues?.ownerEmail || "",
        ownerAddressLine1: defaultValues?.ownerAddressLine1 || "",
        ownerAddressLine2: defaultValues?.ownerAddressLine2 || "",
        ownerCity: defaultValues?.ownerCity || "",
        ownerPostalCode: defaultValues?.ownerPostalCode || "",
    });

    const [state, action , isPending] = useActionState(SubmitBusinessOwnerDetails, businessOwnerDetailsResponse)
    const [isTransitionPending, startTransition] = useTransition();

    // Update form data
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Create FormData object
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) formDataObj.append(key, value);
        });

        // Call the server action inside startTransition
        startTransition(() => {
            action(formDataObj);
        });
    };

    // Call onSubmit when form submission is successful
    useEffect(() => {
        if (state?.success && onSubmit) {
            onSubmit(formData);
        }
    }, [state?.success, onSubmit, formData]);
    
  return (
    <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='form-section'>
                <SectionTitle>Business Owner Details</SectionTitle>
                <div className="input-section">
                    <label htmlFor="ownerName">Full Name</label>
                    <input 
                        type="text" 
                        name="ownerName" 
                        id="ownerName" 
                        placeholder="Owner's Full Name" 
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        required 
                    />
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
                        <input 
                            type="text" 
                            name="ownerInitialName" 
                            id="ownerInitialName" 
                            placeholder="Name with Initials" 
                            value={formData.ownerInitialName}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                    <div className="input-section">
                        <label htmlFor="ownerNIC">Owner's NIC</label>
                        <input 
                            type="text" 
                            name="ownerNIC" 
                            id="ownerNIC" 
                            placeholder="Owner's NIC" 
                            value={formData.ownerNIC}
                            onChange={handleInputChange}
                            required 
                        />
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
                        <input 
                            type="text" 
                            name="ownerContact" 
                            id="ownerContact" 
                            placeholder="Contact Number" 
                            value={formData.ownerContact}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                    <div className="input-section">
                        <label htmlFor="ownerFixedContact">Fixed Contact Number</label>
                        <input 
                            type="text" 
                            name="ownerFixedContact" 
                            id="ownerFixedContact" 
                            placeholder="Fixed Contact Number" 
                            value={formData.ownerFixedContact || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                
                <div className="input-section">
                    <label htmlFor="ownerEmail">Owner's Email</label>
                    <input 
                        type="email" 
                        name="ownerEmail" 
                        id="ownerEmail" 
                        placeholder="Owner's Email" 
                        value={formData.ownerEmail}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
            </div>

            {/* owner address detalis */}
            <div className='form-section'>
                <SectionTitle>Owner Address Details</SectionTitle>
                <div className="input-section">
                    <label htmlFor="ownerAddressLine1">Address Line 1</label>
                    <input 
                        type="text" 
                        name="ownerAddressLine1" 
                        id="ownerAddressLine1" 
                        placeholder="Address Line 1" 
                        value={formData.ownerAddressLine1}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div className="input-section">
                    <label htmlFor="ownerAddressLine2">Address Line 2</label>
                    <input 
                        type="text" 
                        name="ownerAddressLine2" 
                        id="ownerAddressLine2" 
                        placeholder="Address Line 2" 
                        value={formData.ownerAddressLine2 || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='flex gap-4'>
                    <div className="input-section">
                        <label htmlFor="ownerCity">City</label>
                        <input 
                            type="text" 
                            name="ownerCity" 
                            id="ownerCity" 
                            placeholder="City" 
                            value={formData.ownerCity}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                    <div className="input-section">
                        <label htmlFor="ownerPostalCode">Postal Code</label>
                        <input 
                            type="text" 
                            name="ownerPostalCode" 
                            id="ownerPostalCode" 
                            placeholder="Postal Code" 
                            value={formData.ownerPostalCode}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                </div>
            </div>
            
            <div className="flex gap-4 justify-end">
                {onBack && (
                    <button 
                        type="button"
                        onClick={onBack}
                        className='bg-gray-500 w-40 h-[46px] text-white font-semibold rounded-xl mt-4 cursor-pointer hover:bg-gray-600 duration-300'
                    >
                        Back
                    </button>
                )}
                <button 
                    className='bg-primary w-40 h-[46px] text-white font-semibold rounded-xl mt-4 cursor-pointer hover:bg-accent duration-300 disabled:opacity-50 disabled:cursor-not-allowed' 
                    type='submit'
                    disabled={isPending || isTransitionPending}
                >
                    {(isPending || isTransitionPending) ? 'Submitting...' : 'Next'}
                </button>
            </div>
        </form>
    </div>
  )
}

export default BusinessOwnerDetails