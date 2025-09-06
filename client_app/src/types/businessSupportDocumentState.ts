
export type BusinessSupportDocumentState = {
  ownerNIC: File | null;
  propertyOwnership: File | null;
  affidavit: File | null;
  gramasewakaCertificate: File | null;
};


// Initial state for the business support document form
export const initialBusinessSupportDocumentState: BusinessSupportDocumentState = {
  ownerNIC: null,
  propertyOwnership: null,
  affidavit: null,
  gramasewakaCertificate: null,
};


export type BusinessSupportDocumentResponse = {
  success: boolean;
  message: string;
  data?: any;
  error?: any 
};

export const businessSupportDocumentResponse: BusinessSupportDocumentResponse = {
  success: false,
  message: '',
};