
export type BusinessDetailsInitialState = {
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    businessAddress: string;
    businessCity: string;
    businessState: string;
    businessZip: string;
    propertyOwned: string;
    landlordName?: string;
    landlordNIC?: string;
    landlordContact?: string;
    businessDescription: string;
};

export const businessDetailsInitialState: BusinessDetailsInitialState = {
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
    businessCity: '',
    businessState: '',
    businessZip: '',
    propertyOwned: '',
    landlordName: '',
    landlordNIC: '',
    landlordContact: '',
    businessDescription: '',
};

export type BusinessDetailsInitialStateResponse = {
    success: boolean;
    message: string;
    data?: BusinessDetailsInitialState;
    error?: any;
};

export const businessDetailsInitialStateResponse: BusinessDetailsInitialStateResponse = {
    success: false,
    message: '',
    data: undefined,
};