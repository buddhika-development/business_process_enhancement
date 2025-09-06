"use client";

import { handleBusinessSupportDocumentUpload } from "@/actions/BusinessSupportDocumentForm";
import SectionTitle from "@/components/ui/Title/SectionTitle";
import { businessSupportDocumentResponse } from "@/types/businessSupportDocumentState";
import React, { useActionState } from "react";

const SupportedDocumentUploadForm = () => {
  // These are just for showing selected file names, not for uploading
  const [ownerNICName, setOwnerNICName] = React.useState<string>("");
  const [gnCertificateName, setGnCertificateName] = React.useState<string>("");
  const [affidavitName, setAffidavitName] = React.useState<string>("");
  const [propertyOwnershipName, setPropertyOwnershipName] = React.useState<string>("");

  const [state, action, isPending] = useActionState(
    handleBusinessSupportDocumentUpload,
    businessSupportDocumentResponse
  );

  return (
    <div>
      <form action={action} className="flex flex-col gap-8">
        <div className="form-section">
          <SectionTitle>Upload Owner NIC</SectionTitle>
          <div className="form-section">
            <label
              htmlFor="ownerNIC"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors"
            >
              <span className="mb-2 text-gray-600 font-semibold flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-upload-cloud"
                >
                  <polyline points="16 16 12 12 8 16"></polyline>
                  <line x1="12" y1="12" x2="12" y2="21"></line>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                  <polyline points="16 16 12 12 8 16"></polyline>
                </svg>
                Upload Owner NIC
              </span>
              <input
                id="ownerNIC"
                name="ownerNIC"
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setOwnerNICName(e.target.files?.[0]?.name ?? "")}
              />
              <span className="text-sm text-gray-400">
                PDF, JPG, or PNG. Max 10MB.
              </span>
              {ownerNICName && (
                <span className="text-sm text-primary mt-2">
                  {ownerNICName}
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="form-section">
          <SectionTitle>Upload Gramasewaka Certificate</SectionTitle>
          <div className="form-section">
            <label
              htmlFor="gnCertificate"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors"
            >
              <span className="mb-2 text-gray-600 font-semibold flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-upload-cloud"
                >
                  <polyline points="16 16 12 12 8 16"></polyline>
                  <line x1="12" y1="12" x2="12" y2="21"></line>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                  <polyline points="16 16 12 12 8 16"></polyline>
                </svg>
                Upload GNCertificate
              </span>
              <input
                id="gnCertificate"
                name="gnCertificate"
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setGnCertificateName(e.target.files?.[0]?.name ?? "")}
              />
              <span className="text-sm text-gray-400">
                PDF, JPG, or PNG. Max 10MB.
              </span>
              {gnCertificateName && (
                <span className="text-sm text-primary mt-2">
                  {gnCertificateName}
                </span>
              )}
            </label>

            {
              state?.error?.gramasewalaCertificate?.message && (
                <div>
                  <p className="text-sm text-red-500">{state.error.gramasewalaCertificate.message}</p>
                </div>
              )
            }
          </div>
        </div>

        <div className="form-section">
          <SectionTitle>Upload Affidavit</SectionTitle>
          <div className="form-section">
            <label
              htmlFor="affidavit"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors"
            >
              <span className="mb-2 text-gray-600 font-semibold flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-upload-cloud"
                >
                  <polyline points="16 16 12 12 8 16"></polyline>
                  <line x1="12" y1="12" x2="12" y2="21"></line>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                  <polyline points="16 16 12 12 8 16"></polyline>
                </svg>
                Upload Affidavit
              </span>
              <input
                id="affidavit"
                name="affidavit"
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setAffidavitName(e.target.files?.[0]?.name ?? "")}
              />
              <span className="text-sm text-gray-400">
                PDF, JPG, or PNG. Max 10MB.
              </span>
              {affidavitName && (
                <span className="text-sm text-primary mt-2">
                  {affidavitName}
                </span>
              )}
            </label>

            {
              state?.error?.affidavit?.message && (
                <div>
                  <p className="text-sm text-red-500">{state.error.affidavit.message}</p>
                </div>
              )
            }
          </div>
        </div>

        <div className="form-section">
          <SectionTitle>Upload Property Ownership Documents</SectionTitle>
          <div className="form-section">
            <label
              htmlFor="propertyOwnership"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors"
            >
              <span className="mb-2 text-gray-600 font-semibold flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-upload-cloud"
                >
                  <polyline points="16 16 12 12 8 16"></polyline>
                  <line x1="12" y1="12" x2="12" y2="21"></line>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                  <polyline points="16 16 12 12 8 16"></polyline>
                </svg>
                Upload Property Ownership Documents
              </span>
              <input
                id="propertyOwnership"
                name="propertyOwnership"
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setPropertyOwnershipName(e.target.files?.[0]?.name ?? "")}
              />
              <span className="text-sm text-gray-400">
                PDF, JPG, or PNG. Max 10MB.
              </span>
              {propertyOwnershipName && (
                <span className="text-sm text-primary mt-2">
                  {propertyOwnershipName}
                </span>
              )}
            </label>
            {
              state?.error?.propertyOwnership?.message && (
                <div>
                  <p className="text-sm text-red-500">{state.error.propertyOwnership.message}</p>
                </div>
              )
            }
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-primary text-sm h-[46px] font-semibold text-white px-10 py-2 mt-2 cursor-pointer rounded-xl hover:bg-accent transition"
          >
              {isPending ? "Uploading..." : "Submit Documents"}
          </button>
        </div>
      </form>
      
      {/* Display success/error messages */}
      {state?.success && state?.message && (
        <div className="text-center mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {typeof state.message === 'string' ? state.message : 'Upload successful'}
        </div>
      )}
      
      {state?.success === false && state?.message && (
        <div className="text-center text-sm mt-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded">
          {typeof state.message === 'string' ? state.message : 'Upload failed'}
        </div>
      )}
    </div>
  );
};

export default SupportedDocumentUploadForm;