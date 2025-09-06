'use server';

import { BusinessSupportDocumentResponse } from '@/types/businessSupportDocumentState';

export const handleBusinessSupportDocumentUpload = async (
  prevState: BusinessSupportDocumentResponse,
  formData: FormData
): Promise<BusinessSupportDocumentResponse> => {

  
  const gramasewakCertificate = formData.get('gnCertificate') as File | null;
  const ownershipDocument = formData.get('propertyOwnership') as File | null;
  const affidavitDocument = formData.get('affidavit') as File | null;

  if (!gramasewakCertificate) {
    return {
      success: false,
      message: 'No file was uploaded',
    };
  }

  try {
    const uploadForm = new FormData();
    uploadForm.append(
      'gnc',
      new Blob([await gramasewakCertificate.arrayBuffer()], { type: gramasewakCertificate.type }),
      gramasewakCertificate.name || 'gn_certificate.pdf'
    );

    const ownershipForm = new FormData();
    if (ownershipDocument) {
      ownershipForm.append(
        'lease',
        new Blob([await ownershipDocument.arrayBuffer()], { type: ownershipDocument.type }),
        ownershipDocument.name || 'ownership.pdf'
      );
    }

    const affidavitForm = new FormData();
    if (affidavitDocument) {
      affidavitForm.append(
        'affidavit',
        new Blob([await affidavitDocument.arrayBuffer()], { type: affidavitDocument.type }),
        affidavitDocument.name || 'affidavit.pdf'
      );
    }

    const gnResponse = await fetch('http://127.0.0.1:8000/api/document-validate/gnc', {
      method: 'POST',
      body: uploadForm ,
    });

    const ownershipResponse = await fetch('http://127.0.0.1:8000/api/document-validate/lease', {
      method: 'POST',
      body: ownershipForm,
    });

    const affidavitResponse = await fetch('http://127.0.0.1:8000/api/document-validate/affidavit', {
      method: 'POST',
      body: affidavitForm,
    });

    const gn_result = await gnResponse.json();
    const ownership_result = await ownershipResponse.json();
    const affidavit_result = await affidavitResponse.json();

    const result = {
      gramasewalaCertificate: gn_result,
      propertyOwnership: ownership_result,
      affidavit: affidavit_result,
    }

    const lastResponse: { [key: string]: any } = {};

    // console out the result
    // console.log(result);
    
    const gn_certificate_validity = result.gramasewalaCertificate.document_validity
    const property_ownership_validity = result.propertyOwnership.document_validity
    const affidavit_validity = result.affidavit.document_validity


    // console out the validity of the documents
    // console.log(gn_certificate_validity, property_ownership_validity, affidavit_validity);

    if(!gn_certificate_validity || !property_ownership_validity || !affidavit_validity){

      if(!gn_certificate_validity){
        lastResponse['gramasewalaCertificate'] = {
          success: false,
          message: result.gramasewalaCertificate.error || 'Invalid GN Certificate',
        }
      }

      if(!property_ownership_validity){
        lastResponse['propertyOwnership'] = {
          success: false,
          message: result.propertyOwnership.error || 'Invalid Property Ownership Document',
        }
      }

      if(!affidavit_validity){
        lastResponse['affidavit'] = {
          success: false,
          message: result.affidavit.error || 'Invalid Affidavit Document',
        }
      }
      
      console.log(lastResponse);
      return {
        success: false,
        message: 'One or more documents are invalid',
        error: lastResponse
      }
    }

    return {
      success: true,
      message: `Successfully processed the documents`,
    };

  } catch (error) {
    console.error('Upload failed:', error);
    return {
      success: false,
      message: 'An error occurred during upload',
    };
  }
};
