'use server'

import { BusinessSupportDocumentResponse } from "@/types/businessSupportDocumentState";

export const handleBusinessSupportDocumentUpload = async (
    prevState : BusinessSupportDocumentResponse,
    formData: FormData
 ): Promise<BusinessSupportDocumentResponse> => {

    console.log("form data in action", formData);

  return {
    success: true,
    message: 'Documents uploaded successfully',
  }
}