'use server'

import { getBusinessDetailsByName } from "@/lib/databaseActions/business";
import { getNICDetailsByNumber } from "@/lib/databaseActions/nic";
import { BusinessDetailsInitialStateResponse } from "@/types/businessDetailsInitialState"

export const submitBusinessDetails = async (
  prevState: BusinessDetailsInitialStateResponse,
  formData: FormData
): Promise<BusinessDetailsInitialStateResponse> => {
  try {

    const businessName = formData.get('businessName');
    const landlordNIC = formData.get('landlordNIC');
    const landloadName = formData.get("landlordName")

    // check business name availability
    const businessNameCheck = await getBusinessDetailsByName(businessName as string);

    if (businessNameCheck != null) {
        return {
            success: false,
            message: 'Business name is already taken',
            error : {
                businessName: 'Business name is already taken'
            }
        };
    }

    // if there have any landload nic value
    // check validity of the landload
    if(landlordNIC && landlordNIC !== '') {
        const landlordNICValidityCheck = await getNICDetailsByNumber(landlordNIC as string);

        if(landlordNICValidityCheck == null) {
            return {
                success: false,
                message: 'Invalid Landlord NIC number',
                error : {
                    landlordNIC: 'Invalid Landlord NIC number'
                }
            };
        }

        
        if(landlordNICValidityCheck.full_name != landloadName){
            console.log(landlordNICValidityCheck.full_name != landloadName)
            return {
                success : false,
                message : "Something went wrong in landload name.",
                error : {
                    landloadName : "Check the landload name again."
                }
            }
        }
    }
    
    return {
        success: true,
        message: 'Business can register. Details are valid',
    }
    
  } catch (error) {
    console.error('Error submitting business details:', error);
    return {
      success: false,
      message: 'Error submitting business details',
    };
  }
};
