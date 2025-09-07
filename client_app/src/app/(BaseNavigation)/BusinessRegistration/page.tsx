'use client';

import BusinessDetailsForm from "@/components/layout/BusinessRegistration/BusinessDetailsForm";
import BusinessOwnerDetails from "@/components/layout/BusinessRegistration/BusinessOwnerDetails";
import SupportedDocumentUploadForm from "@/components/layout/BusinessRegistration/SupportedDocumentUploadForm";
import Title from "@/components/ui/Title/Title";
import { createBusinessDetails } from "@/lib/databaseActions/business";
import { createBusinessOwnerDetails } from "@/lib/databaseActions/businessOwner";
import React, { useState } from "react";

// Types for form data
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

type SupportedDocumentsData = {
  ownerNIC: File | null;
  gnCertificate: File | null;
  affidavit: File | null;
  propertyOwnership: File | null;
};

const MultiStepBusinessRegistration = () => {
  const [step, setStep] = useState(1);
  
  // Store data for each step
  const [businessDetails, setBusinessDetails] = useState<BusinessDetailsData | null>(null);
  const [ownerDetails, setOwnerDetails] = useState<BusinessOwnerDetailsData | null>(null);
  const [documents, setDocuments] = useState<SupportedDocumentsData | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Step 1: Business Details Form - show BusinessOwnerDetails after success
  const handleBusinessDetailsSuccess = (data: BusinessDetailsData) => {
    setBusinessDetails(data);
    setStep(2);
  };

  // Step 2: Owner Details Form
  const handleOwnerDetailsSubmit = (data: BusinessOwnerDetailsData) => {
    setOwnerDetails(data);
    setStep(3);
  };

  // Step 3: Documents Form
  const handleDocumentsSubmit = (data: SupportedDocumentsData) => {
    setDocuments(data);
    setStep(4);
  };

  const dataInsertionAction = async () => {
    setIsLoading(true)
    const createdBusiness = await createBusinessDetails(businessDetails);
    const createdBusinessOwnerDetails = await createBusinessOwnerDetails(ownerDetails);

    // send email for the applicant
    
    
    setIsLoading(false)
  }

  return (
    <div className="body-content py-10">
      <Title className="mb-10">
        Let's <span className="highlited-text">Register</span> Your Business
      </Title>

      {/* Step 1: Business Details Form */}
      {step === 1 && (
        <BusinessDetailsForm 
          onSuccess={handleBusinessDetailsSuccess} 
          defaultValues={businessDetails}
        />
      )}

      {/* Step 2: Business Owner Details Form */}
      {step === 2 && (
        <BusinessOwnerDetails 
          onSubmit={handleOwnerDetailsSubmit}
          defaultValues={ownerDetails}
          onBack={() => setStep(1)}
        />
      )}

      {/* Step 3: Supported Documents Upload Form */}
      {step === 3 && (
        <SupportedDocumentUploadForm 
          onSubmit={handleDocumentsSubmit}
          defaultValues={documents}
          onBack={() => setStep(2)}
        />
      )}

      {/* Step 4: Success Message with Summary */}
      {step === 4 && (
        <div className="mt-10">
          <div className="text-left mb-8">
            <h2 className="text-2xl font-bold text-primary">Business Registration Submitted Successfully!</h2>
            <p className="mt-2 text-sm">Thank you for submitting your business registration details. Here's a summary of your application:</p>
          </div>

          {/* Business Details Summary */}
          {businessDetails && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Business Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Business Name:</p>
                  <p className="text-gray-700">{businessDetails.businessName}</p>
                </div>
                <div>
                  <p className="font-medium">Business Type:</p>
                  <p className="text-gray-700">{businessDetails.businessType}</p>
                </div>
                <div>
                  <p className="font-medium">Business Category:</p>
                  <p className="text-gray-700">{businessDetails.businessCategory}</p>
                </div>
                <div>
                  <p className="font-medium">Property Status:</p>
                  <p className="text-gray-700">{businessDetails.propertyOwned}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="font-medium">Business Address:</p>
                  <p className="text-gray-700">{businessDetails.businessAddress}, {businessDetails.businessCity}, {businessDetails.businessState}</p>
                </div>
                {businessDetails.propertyOwned === 'rented' && businessDetails.landlordName && (
                  <>
                    <div>
                      <p className="font-medium">Landlord Name:</p>
                      <p className="text-gray-700">{businessDetails.landlordName}</p>
                    </div>
                    <div>
                      <p className="font-medium">Landlord NIC:</p>
                      <p className="text-gray-700">{businessDetails.landlordNIC}</p>
                    </div>
                    <div>
                      <p className="font-medium">Landlord Contact:</p>
                      <p className="text-gray-700">{businessDetails.landlordContact}</p>
                    </div>
                  </>
                )}
                <div className="md:col-span-2">
                  <p className="font-medium">Business Description:</p>
                  <p className="text-gray-700">{businessDetails.businessDescription}</p>
                </div>
              </div>
            </div>
          )}

          {/* Owner Details Summary */}
          {ownerDetails && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Owner Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Full Name:</p>
                  <p className="text-gray-700">{ownerDetails.ownerName}</p>
                </div>
                <div>
                  <p className="font-medium">Name with Initials:</p>
                  <p className="text-gray-700">{ownerDetails.ownerInitialName}</p>
                </div>
                <div>
                  <p className="font-medium">NIC Number:</p>
                  <p className="text-gray-700">{ownerDetails.ownerNIC}</p>
                </div>
                <div>
                  <p className="font-medium">Contact Number:</p>
                  <p className="text-gray-700">{ownerDetails.ownerContact}</p>
                </div>
                {ownerDetails.ownerFixedContact && (
                  <div>
                    <p className="font-medium">Fixed Contact:</p>
                    <p className="text-gray-700">{ownerDetails.ownerFixedContact}</p>
                  </div>
                )}
                <div>
                  <p className="font-medium">Email:</p>
                  <p className="text-gray-700">{ownerDetails.ownerEmail}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="font-medium">Address:</p>
                  <p className="text-gray-700">
                    {ownerDetails.ownerAddressLine1}
                    {ownerDetails.ownerAddressLine2 && `, ${ownerDetails.ownerAddressLine2}`}
                    , {ownerDetails.ownerCity} - {ownerDetails.ownerPostalCode}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Documents Summary */}
          {documents && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Submitted Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Owner NIC:</p>
                  <p className="text-gray-700">{documents.ownerNIC ? '✓ Uploaded' : '✗ Not uploaded'}</p>
                </div>
                <div>
                  <p className="font-medium">Gramasewaka Certificate:</p>
                  <p className="text-gray-700">{documents.gnCertificate ? '✓ Uploaded' : '✗ Not uploaded'}</p>
                </div>
                <div>
                  <p className="font-medium">Affidavit:</p>
                  <p className="text-gray-700">{documents.affidavit ? '✓ Uploaded' : '✗ Not uploaded'}</p>
                </div>
                <div>
                  <p className="font-medium">Property Ownership Documents:</p>
                  <p className="text-gray-700">{documents.propertyOwnership ? '✓ Uploaded' : '✗ Not uploaded'}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              className="btn"
              onClick={dataInsertionAction}
            >
              {
                isLoading ? "Processing" : "Confirm Registration"
              }
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepBusinessRegistration;