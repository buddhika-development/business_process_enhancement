"use client";

import { submitBusinessDetails } from "@/actions/BusinessDetailsFormAction";
import SectionTitle from "@/components/ui/Title/SectionTitle";
import { businessDetailsInitialStateResponse } from "@/types/businessDetailsInitialState";
import React, { useActionState, useState, useEffect, useTransition } from "react";

type BusinessDetailsData = {
  businessName: string;
  businessType: string;
  businessCategory: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  propertyOwned: string;
  landlordNIC?: string;
  landlordContact?: string;
  landlordName?: string;
  businessDescription: string;
};

type Props = {
  onSuccess?: (data: BusinessDetailsData) => void;
  defaultValues?: BusinessDetailsData | null;
};

const BusinessDetailsForm = ({ onSuccess, defaultValues }: Props) => {
  // Form state
  const [formData, setFormData] = useState<BusinessDetailsData>({
    businessName: defaultValues?.businessName || "",
    businessType: defaultValues?.businessType || "",
    businessCategory: defaultValues?.businessCategory || "",
    businessAddress: defaultValues?.businessAddress || "",
    businessCity: defaultValues?.businessCity || "",
    businessState: defaultValues?.businessState || "",
    propertyOwned: defaultValues?.propertyOwned || "",
    landlordNIC: defaultValues?.landlordNIC || "",
    landlordContact: defaultValues?.landlordContact || "",
    landlordName: defaultValues?.landlordName || "",
    businessDescription: defaultValues?.businessDescription || "",
  });

  const [state, action, isPending] = useActionState(
    submitBusinessDetails,
    businessDetailsInitialStateResponse
  );
  
  const [isTransitionPending, startTransition] = useTransition();

  // Update form data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  // Call onSuccess when form submission is successful
  useEffect(() => {
    if (state?.success && onSuccess) {
      onSuccess(formData);
    }
  }, [state?.success, onSuccess, formData]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* business basic details */}
        <div className="form-section">
          <SectionTitle>Business Details</SectionTitle>
          <div className="input-section">
            <label htmlFor="businessName">Business Name</label>
            <input
              type="text"
              name="businessName"
              id="businessName"
              placeholder="Business Name"
              value={formData.businessName}
              onChange={handleInputChange}
              required
            />
            {state?.error?.businessName && (
              <p className="text-sm text-red-500 mt-1">
                {state.error.businessName}
              </p>
            )}
          </div>

          {/* business type details */}
          <div className="flex w-full gap-4">
            {/* business Type */}
            <div className="input-section">
              <label htmlFor="businessType">Type Of Business</label>
              <select 
                name="businessType" 
                id="businessType" 
                value={formData.businessType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="sole-proprietorship">Sole Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="corporation">Corporation</option>
              </select>
            </div>

            {/* business Category */}
            <div className="input-section">
              <label htmlFor="businessCategory">Category Of Business</label>
              <select 
                name="businessCategory" 
                id="businessCategory" 
                value={formData.businessCategory}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="retail">Retail</option>
                <option value="services">Services</option>
                <option value="manufacturing">Manufacturing</option>
              </select>
            </div>
          </div>
        </div>

        {/* business address details */}
        <div className="form-section">
          <SectionTitle>Business Address</SectionTitle>
          <div className="input-section">
            <label htmlFor="businessAddress">Address</label>
            <input
              type="text"
              name="businessAddress"
              id="businessAddress"
              placeholder="Business Address"
              value={formData.businessAddress}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex w-full gap-4">
            <div className="input-section">
              <label htmlFor="businessCity">City</label>
              <input
                type="text"
                name="businessCity"
                id="businessCity"
                placeholder="City"
                value={formData.businessCity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-section">
              <label htmlFor="businessState">State</label>
              <input
                type="text"
                name="businessState"
                id="businessState"
                placeholder="State"
                value={formData.businessState}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* business property details */}
        <div className="form-section">
          <SectionTitle>Business Property Details</SectionTitle>
          <div className="input-section">
            <label htmlFor="propertyOwned">Property Owned</label>
            <select
              name="propertyOwned"
              id="propertyOwned"
              value={formData.propertyOwned}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Option</option>
              <option value="owned">Owned</option>
              <option value="rented">Rented</option>
            </select>
          </div>

          {/* Show landlord details only if property is rented */}
          {formData.propertyOwned === "rented" && (
            <>
              <div className="flex gap-4">
                <div className="input-section">
                  <label htmlFor="landlordNIC">Landlord NIC</label>
                  <input
                    type="text"
                    name="landlordNIC"
                    id="landlordNIC"
                    placeholder="Landlord NIC"
                    value={formData.landlordNIC || ""}
                    onChange={handleInputChange}
                    required
                  />
                  {state?.error?.landlordNIC && (
                    <p className="text-sm text-red-500 mt-1">
                      {state.error.landlordNIC}
                    </p>
                  )}
                </div>
                <div className="input-section">
                  <label htmlFor="landlordContact">Landlord Contact</label>
                  <input
                    type="text"
                    name="landlordContact"
                    id="landlordContact"
                    placeholder="Landlord Contact"
                    value={formData.landlordContact || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="input-section">
                <label htmlFor="landlordName">Landlord Name</label>
                <input
                  type="text"
                  name="landlordName"
                  id="landlordName"
                  placeholder="Landlord Name"
                  value={formData.landlordName || ""}
                  onChange={handleInputChange}
                  required
                />
                {state?.error?.landloadName && (
                  <p className="text-sm text-red-500 mt-1">
                    {state.error.landloadName}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* get more detials about the business */}
        <div className="form-section">
          <SectionTitle>More About Business</SectionTitle>
          <div className="input-section">
            <label htmlFor="businessDescription">Business Description</label>
            <textarea
              name="businessDescription"
              id="businessDescription"
              placeholder="Describe your business..."
              rows={4}
              value={formData.businessDescription}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending || isTransitionPending}
          className="bg-primary text-sm h-[46px] font-semibold text-white px-10 py-2 mt-2 cursor-pointer rounded-xl hover:bg-accent transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {(isPending || isTransitionPending) ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default BusinessDetailsForm;
