'use server'

import { getNICDetailsByNumber } from "@/lib/databaseActions/nic";
import { BusinessOwnerDetailsResponse } from "@/types/businessOwnerDetailsInitialState";

export const SubmitBusinessOwnerDetails = async(
    prevState : BusinessOwnerDetailsResponse,
    formData : FormData
) : Promise<BusinessOwnerDetailsResponse> => {

    const ownerFullName = formData.get("ownerName")
    const ownerNIC = formData.get("ownerNIC")

    console.log(ownerFullName, ownerNIC)

    if(ownerFullName && ownerFullName !== '' && ownerNIC && ownerNIC !== '' ){
        const validateTheNIC = await getNICDetailsByNumber(ownerNIC as string);

        if (!validateTheNIC || validateTheNIC.error) {
            return {
                success: false,
                message: "Invalid NIC number or NIC details not found.",
                error: {
                    ownerNIC : "Invalid NIC number or NIC details not found."
                }
            };
        }
        
        if (validateTheNIC.full_name !== ownerFullName) {
            return {
                success : false,
                message : "Check submited data again.",
                error : {
                    ownerFullName : "Something issue in owner full name."
                }
            }
        }
    }

    console.log("valid entry")
    
    return {
        success : true,
        message : 'Business is ready to submit data.'
    }
    
}