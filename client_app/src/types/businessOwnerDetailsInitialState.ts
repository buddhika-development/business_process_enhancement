
export interface BusinessOwnerDetails {
    ownerName: string;
    ownerInitialName: string;
    ownerNIC: string;
    ownerContact: string;
    ownerFixedContact: string;
    ownerEmail: string;
    ownerAddressLine1: string;
    ownerAddressLine2: string;
    ownerCity: string;
    ownerPostalCode: string;
}

export const businessOwnerDetails:BusinessOwnerDetails = {
    ownerName : '',
    ownerInitialName: '',
    ownerNIC: '',
    ownerContact: '',
    ownerFixedContact: '',
    ownerEmail: '',
    ownerAddressLine1: '',
    ownerAddressLine2: '',
    ownerCity: '',
    ownerPostalCode: '',
}


export interface BusinessOwnerDetailsResponse {
    success : boolean,
    message : string,
    error ?: any,
    data ?: string
}

export const businessOwnerDetailsResponse: BusinessOwnerDetailsResponse = {
    success : false,
    message : ''
}